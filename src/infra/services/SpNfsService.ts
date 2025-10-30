import fs from "fs";
import https from "https";
import axios from "axios";

import { ISpNfeService } from "../../core/interfaces/ISpNfeService";
import { INfsConfigData } from "../../core/interfaces/INfsConfigData";

import ValidationException from "../../core/exceptions/ValidationException";

export default class SpNfsService implements ISpNfeService {
  public config: INfsConfigData;

  private pfx: Buffer;
  private passphrase: string;

  private endpointUrl: string;

  private httpsAgent: https.Agent;

  private headers: { [key: string]: string } = {
    "Content-Type": "text/xml; charset=utf-8",
    Accept: "text/xml",
    "User-Agent": "NodeJS NFS-SP Client",
  };

  constructor(config: INfsConfigData) {
    if (!config.certificatePath || !config.certificatePassword) {
      throw new ValidationException(
        "Certificado digital e senha são obrigatórios para assinatura do RPS."
      );
    }

    this.config = config;

    this.pfx = fs.readFileSync(config.certificatePath);
    this.passphrase = config.certificatePassword;

    this.endpointUrl = config.baseUrl + "/ws/lotenfe.asmx?WSDL";

    this.httpsAgent = new https.Agent({
      pfx: this.pfx,
      passphrase: this.passphrase,
      rejectUnauthorized: true,
    });
  }

  public async emitirLoteRPS(xml: string): Promise<any> {
    const headers = {
      ...this.headers,
      SOAPAction: "http://www.prefeitura.sp.gov.br/nfe/ws/envioLoteRPS",
    };

    if (this.config.debug) console.log(`Dados enviados: ${xml.toString()}`);

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

    const { data } = await axios.post(this.endpointUrl, soapEnvelope, {
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
