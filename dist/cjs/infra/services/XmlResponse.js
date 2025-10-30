"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xml2js_1 = __importDefault(require("xml2js"));
class XmlResponse {
    constructor(config) {
        this.pathXMls = config.pathXMls;
    }
    async processPedidoEnvioLoteRPS(response) {
        const parser = new xml2js_1.default.Parser({ explicitArray: false });
        const all = await parser.parseStringPromise(response);
        const retorno = all["soap:Envelope"]["soap:Body"]["EnvioLoteRPSResponse"]["RetornoXML"];
        const retornoParsed = await parser.parseStringPromise(retorno);
        return retornoParsed["RetornoEnvioLoteRPS"];
    }
}
exports.default = XmlResponse;
//# sourceMappingURL=XmlResponse.js.map