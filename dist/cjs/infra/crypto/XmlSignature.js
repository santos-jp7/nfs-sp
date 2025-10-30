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
const xml_crypto_1 = require("xml-crypto");
const ValidationException_1 = __importDefault(require("../../core/exceptions/ValidationException"));
class XmlSignature {
    constructor(config) {
        if (!config.certificatePath || !config.certificatePassword) {
            throw new ValidationException_1.default("Certificado digital e senha são obrigatórios para assinatura do RPS.");
        }
        this.config = config;
        this.pfx = fs_1.default.readFileSync(config.certificatePath);
        this.passphrase = config.certificatePassword;
        this.p12Asn1 = forge.asn1.fromDer(this.pfx.toString("binary"));
        this.p12 = forge.pkcs12.pkcs12FromAsn1(this.p12Asn1, this.passphrase);
        this.bagsPrivate = this.p12.getBags({
            bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
        })[forge.pki.oids.pkcs8ShroudedKeyBag];
        if (!this.bagsPrivate || this.bagsPrivate.length === 0) {
            throw new ValidationException_1.default("Nenhuma chave privada encontrada no certificado digital.");
        }
        let privKey = undefined;
        privKey = this.bagsPrivate[0].key;
        if (!privKey) {
            throw new ValidationException_1.default("Chave privada não pôde ser extraída do certificado digital.");
        }
        this.privateKey = forge.pki.privateKeyToPem(privKey);
        this.bagsPublic = this.p12.getBags({
            bagType: forge.pki.oids.certBag,
        });
        const certKey = this.bagsPublic[forge.pki.oids.certBag][0].cert;
        this.publicKey = Buffer.from(forge.pki.certificateToPem(certKey)).toString("base64");
        this.publicKeyBuffer = Buffer.from(forge.pki.certificateToPem(certKey));
        this.sig = new xml_crypto_1.SignedXml("", {
            canonicalizationAlgorithm: "http://www.w3.org/2001/10/xml-exc-c14n#",
            signatureAlgorithm: "http://www.w3.org/2000/09/xmldsig#rsa-sha1",
        });
        this.sig.signingKey = this.privateKey;
        this.sig.keyInfoProvider = {
            getKeyInfo: () => {
                const cleanCert = this.publicKey
                    .replace(/-----BEGIN CERTIFICATE-----/, "")
                    .replace(/-----END CERTIFICATE-----/, "")
                    .replace(/\r?\n|\r/g, "");
                return `
      <X509Data>
        <X509Certificate>${cleanCert}</X509Certificate>
      </X509Data>`;
            },
            getKey: () => {
                return this.publicKeyBuffer;
            },
        };
    }
    sign(xmlPath, reference) {
        const xml = fs_1.default.readFileSync(xmlPath, "utf-8");
        this.sig.addReference("//*[local-name(.)='" + reference + "']", [
            "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
            "http://www.w3.org/2001/10/xml-exc-c14n#",
        ], "http://www.w3.org/2000/09/xmldsig#sha1", "", "", "", true);
        this.sig.computeSignature(xml.toString());
        let signedXml = this.sig.getSignedXml();
        signedXml = signedXml.replace(/<ds:/g, "<");
        signedXml = signedXml.replace(/<\/ds:/g, "</");
        signedXml = signedXml.replace(/ds:/g, "");
        fs_1.default.writeFileSync(xmlPath, signedXml, { encoding: "utf-8" });
        if (this.config.debug) {
            console.log("XML assinado:\n", signedXml);
        }
    }
}
exports.default = XmlSignature;
//# sourceMappingURL=XmlSignature.js.map