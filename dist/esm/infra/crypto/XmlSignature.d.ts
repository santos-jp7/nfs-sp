import { INfsConfigData } from "../../core/interfaces/INfsConfigData";
import { IXmlSignature } from "../../core/interfaces/ISigner";
export default class XmlSignature implements IXmlSignature {
    config: INfsConfigData;
    private pfx;
    private passphrase;
    private p12Asn1;
    private p12;
    private bagsPrivate;
    private bagsPublic;
    private publicKey;
    private privateKey;
    private publicKeyBuffer;
    private sig;
    constructor(config: INfsConfigData);
    sign(xmlPath: string, reference: string): void;
}
//# sourceMappingURL=XmlSignature.d.ts.map