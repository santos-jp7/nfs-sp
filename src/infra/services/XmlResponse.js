import xml2js from "xml2js";
export default class XmlResponse {
    constructor(config) {
        this.pathXMls = config.pathXMls;
    }
    async processPedidoEnvioLoteRPS(response) {
        const parser = new xml2js.Parser({ explicitArray: false });
        const all = await parser.parseStringPromise(response);
        const retorno = all["soap:Envelope"]["soap:Body"]["EnvioLoteRPSResponse"]["RetornoXML"];
        const retornoParsed = await parser.parseStringPromise(retorno);
        return retornoParsed["RetornoEnvioLoteRPS"];
    }
}
//# sourceMappingURL=XmlResponse.js.map