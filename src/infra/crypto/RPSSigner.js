import * as forge from "node-forge";
import fs from "fs";
import ValidationException from "../../core/exceptions/ValidationException";
export default class RPSSigner {
    constructor(config) {
        if (!config.certificatePath || !config.certificatePassword) {
            throw new ValidationException("Certificado digital e senha são obrigatórios para assinatura do RPS.");
        }
        this.config = config;
        this.pfx = fs.readFileSync(config.certificatePath);
        this.passphrase = config.certificatePassword;
        this.pkcs12 = forge.pkcs12.pkcs12FromAsn1(forge.asn1.fromDer(this.pfx.toString("binary")), this.passphrase);
        this.bags = this.pkcs12.getBags({
            bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
        })[forge.pki.oids.pkcs8ShroudedKeyBag];
        if (!this.bags || this.bags.length === 0) {
            throw new ValidationException("Nenhuma chave privada encontrada no certificado digital.");
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
            throw new ValidationException(`Comprimento excede 86 caracteres após inserir "${desc}": ${len}`);
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
            throw new ValidationException(`Comprimento final da string de assinatura do RPS inválido: ${strAssinatura.length}`);
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
//# sourceMappingURL=RPSSigner.js.map