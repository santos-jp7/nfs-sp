import * as forge from "node-forge";
import fs from "fs";
import { SignedXml } from "xml-crypto";

import { INfsConfigData } from "../../core/interfaces/INfsConfigData";
import { IXmlSignature } from "../../core/interfaces/ISigner";

import ValidationException from "../../core/exceptions/ValidationException";

export default class XmlSignature implements IXmlSignature {
  public config: INfsConfigData;

  private pfx: Buffer;
  private passphrase: string;

  private p12Asn1: forge.asn1.Asn1;
  private p12: forge.pkcs12.Pkcs12Pfx;

  private bagsPrivate: any;
  private bagsPublic: any;

  private publicKey: string;
  private privateKey: forge.pki.PEM;
  private publicKeyBuffer: Buffer;

  private sig: SignedXml;

  constructor(config: INfsConfigData) {
    if (!config.certificatePath || !config.certificatePassword) {
      throw new ValidationException(
        "Certificado digital e senha são obrigatórios para assinatura do RPS."
      );
    }

    this.config = config;

    this.pfx = fs.readFileSync(config.certificatePath);
    this.passphrase = config.certificatePassword;

    this.p12Asn1 = forge.asn1.fromDer(this.pfx.toString("binary"));
    this.p12 = forge.pkcs12.pkcs12FromAsn1(this.p12Asn1, this.passphrase);

    this.bagsPrivate = this.p12.getBags({
      bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
    })[forge.pki.oids.pkcs8ShroudedKeyBag];

    if (!this.bagsPrivate || this.bagsPrivate.length === 0) {
      throw new ValidationException(
        "Nenhuma chave privada encontrada no certificado digital."
      );
    }

    let privKey: forge.pki.PrivateKey | undefined = undefined;

    privKey = this.bagsPrivate[0].key;

    if (!privKey) {
      throw new ValidationException(
        "Chave privada não pôde ser extraída do certificado digital."
      );
    }

    this.privateKey = forge.pki.privateKeyToPem(privKey);

    this.bagsPublic = this.p12.getBags({
      bagType: forge.pki.oids.certBag,
    });

    const certKey = this.bagsPublic[forge.pki.oids.certBag][0].cert;

    this.publicKey = Buffer.from(forge.pki.certificateToPem(certKey)).toString(
      "base64"
    );

    this.publicKeyBuffer = Buffer.from(forge.pki.certificateToPem(certKey));

    this.sig = new SignedXml("", {
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

  sign(xmlPath: string, reference: string): void {
    const xml = fs.readFileSync(xmlPath, "utf-8");

    this.sig.addReference(
      "//*[local-name(.)='" + reference + "']",
      [
        "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
        "http://www.w3.org/2001/10/xml-exc-c14n#",
      ],
      "http://www.w3.org/2000/09/xmldsig#sha1",
      "",
      "",
      "",
      true
    );

    this.sig.computeSignature(xml.toString());

    let signedXml = this.sig.getSignedXml();

    signedXml = signedXml.replace(/<ds:/g, "<");
    signedXml = signedXml.replace(/<\/ds:/g, "</");
    signedXml = signedXml.replace(/ds:/g, "");

    fs.writeFileSync(xmlPath, signedXml, { encoding: "utf-8" });

    if (this.config.debug) {
      console.log("XML assinado:\n", signedXml);
    }
  }
}
