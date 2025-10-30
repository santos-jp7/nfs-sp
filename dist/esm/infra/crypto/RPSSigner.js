"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forge = __importStar(require("node-forge"));
const fs_1 = __importDefault(require("fs"));
const ValidationException_1 = __importDefault(require("../../core/exceptions/ValidationException"));
class RPSSigner {
    constructor(config) {
        if (!config.certificatePath || !config.certificatePassword) {
            throw new ValidationException_1.default("Certificado digital e senha são obrigatórios para assinatura do RPS.");
        }
        this.config = config;
        this.pfx = fs_1.default.readFileSync(config.certificatePath);
        this.passphrase = config.certificatePassword;
        this.pkcs12 = forge.pkcs12.pkcs12FromAsn1(forge.asn1.fromDer(this.pfx.toString("binary")), this.passphrase);
        this.bags = this.pkcs12.getBags({
            bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
        })[forge.pki.oids.pkcs8ShroudedKeyBag];
        if (!this.bags || this.bags.length === 0) {
            throw new ValidationException_1.default("Nenhuma chave privada encontrada no certificado digital.");
        }
        this.keyObj = this.bags[0].key;
    }
    add(strAssinatura, segment, desc) {
        strAssinatura += segment;
        const len = strAssinatura.length;
        if (this.config.debug) {
            console.log(`${desc}: +${segment.length} chars -> comprimento atual: ${len} (restam ${86 - len})`);
        }
        if (len > 86) {
            throw new ValidationException_1.default(`Comprimento excede 86 caracteres após inserir "${desc}": ${len}`);
        }
        return strAssinatura;
    }
    sign(rps) {
        let strAssinatura = "";
        strAssinatura = this.add(strAssinatura, this.config.inscricaoPrestador, "CCM");
        strAssinatura = this.add(strAssinatura, rps.ChaveRPS.SerieRPS.padEnd(5), "Série");
        strAssinatura = this.add(strAssinatura, rps.ChaveRPS.NumeroRPS.padStart(12, "0"), "Número RPS");
        strAssinatura = this.add(strAssinatura, rps.DataEmissao?.replaceAll("-", "") || "", "Data emissão");
        strAssinatura = this.add(strAssinatura, rps.TributacaoRPS || "", "Tipo Tributação");
        strAssinatura = this.add(strAssinatura, rps.StatusRPS || "", "Status RPS");
        strAssinatura = this.add(strAssinatura, rps.ISSRetido ? "S" : "N", "ISS Retido");
        strAssinatura = this.add(strAssinatura, String(rps.ValorServicos)
            .replaceAll(".", "")
            .replaceAll(",", "")
            .padStart(15, "0"), "Valor Serviços");
        strAssinatura = this.add(strAssinatura, String(rps.ValorDeducoes)
            .replaceAll(".", "")
            .replaceAll(",", "")
            .padStart(15, "0"), "Valor Deduções");
        strAssinatura = this.add(strAssinatura, String(rps.CodigoServico).padStart(5, "0"), "Código do serviço");
        strAssinatura = this.add(strAssinatura, rps.TomadorRPS.CPFCNPJTomador.CPF ? "1" : "2", "Identificador pessoa");
        strAssinatura = this.add(strAssinatura, String(rps.TomadorRPS.CPFCNPJTomador.CPF || rps.TomadorRPS.CPFCNPJTomador.CNPJ).padStart(14, "0"), "CPF/CNPJ do tomador");
        if (strAssinatura.length !== 86) {
            throw new ValidationException_1.default(`Comprimento final da string de assinatura do RPS inválido: ${strAssinatura.length}`);
        }
        if (this.config.debug) {
            console.log("String para assinatura do RPS:", strAssinatura);
        }
        //Assina a string
        const md = forge.md.sha1.create();
        md.update(strAssinatura, "utf8");
        const signature = this.keyObj.sign(md);
        // Converte a assinatura para Base64
        const signatureBase64 = forge.util.encode64(signature);
        if (this.config.debug) {
            console.log("Assinatura gerada (Base64):", signatureBase64);
        }
        rps.Assinatura = signatureBase64 + "aaaaaaa";
    }
}
exports.default = RPSSigner;
//# sourceMappingURL=RPSSigner.js.map