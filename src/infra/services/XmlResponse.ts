import xml2js from "xml2js";

import { IXmlResponse } from "../../core/interfaces/IXmlResponse";
import { INfsConfigData } from "../../core/interfaces/INfsConfigData";

export default class XmlResponse implements IXmlResponse {
  public pathXMls: string;

  constructor(config: INfsConfigData) {
    this.pathXMls = config.pathXMls;
  }

  public async processPedidoEnvioLoteRPS(response: string): Promise<any> {
    const parser = new xml2js.Parser({ explicitArray: false });
    const all = await parser.parseStringPromise(response);

    const retorno =
      all["soap:Envelope"]["soap:Body"]["EnvioLoteRPSResponse"]["RetornoXML"];

    const retornoParsed = await parser.parseStringPromise(retorno);

    return retornoParsed["RetornoEnvioLoteRPS"];
  }
}
