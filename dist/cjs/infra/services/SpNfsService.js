"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const axios_1 = __importDefault(require("axios"));
const ValidationException_1 = __importDefault(require("../../core/exceptions/ValidationException"));
class SpNfsService {
    constructor(config) {
        this.headers = {
            "Content-Type": "text/xml; charset=utf-8",
            Accept: "text/xml",
            "User-Agent": "NodeJS NFS-SP Client",
        };
        if (!config.certificatePath || !config.certificatePassword) {
            throw new ValidationException_1.default("Certificado digital e senha são obrigatórios para assinatura do RPS.");
        }
        this.config = config;
        this.pfx = fs_1.default.readFileSync(config.certificatePath);
        this.passphrase = config.certificatePassword;
        this.endpointUrl = config.baseUrl + "/ws/lotenfe.asmx?WSDL";
        this.httpsAgent = new https_1.default.Agent({
            pfx: this.pfx,
            passphrase: this.passphrase,
            rejectUnauthorized: true,
        });
    }
    async emitirLoteRPS(xml) {
        const headers = {
            ...this.headers,
            SOAPAction: "http://www.prefeitura.sp.gov.br/nfe/ws/envioLoteRPS",
        };
        if (this.config.debug)
            console.log(`Dados enviados: ${xml.toString()}`);
        //replace <, >, /, & in xml
        const escapedXml = xml
            .toString()
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        const soapEnvelope = `
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope
	xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<soap:Body>
		<EnvioLoteRPSRequest xmlns="http://www.prefeitura.sp.gov.br/nfe">
			<VersaoSchema>1</VersaoSchema>
                <MensagemXML>
                    ${escapedXml}
                </MensagemXML>
			</EnvioLoteRPSRequest>
	</soap:Body>
</soap:Envelope>
`.trim();
        const { data } = await axios_1.default.post(this.endpointUrl, soapEnvelope, {
            httpsAgent: this.httpsAgent,
            headers: headers,
            timeout: this.config.timeout || 15000,
        });
        if (this.config.debug) {
            console.log(`Emissão de Lote RPS enviado com sucesso.`);
            console.log(`Resposta recebida: ${data}`);
        }
        return data;
    }
}
exports.default = SpNfsService;
//# sourceMappingURL=SpNfsService.js.map