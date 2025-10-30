"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CabecalhoPedidoEnvioLoteRPS_1 = __importDefault(require("./CabecalhoPedidoEnvioLoteRPS"));
class PedidoEnvioLoteRPS {
    constructor(data) {
        this.xmlns = "http://www.prefeitura.sp.gov.br/nfe";
        this.xmlnsTipos = "http://www.prefeitura.sp.gov.br/nfe/tipos";
        this.xmlnsDs = "http://www.w3.org/2000/09/xmldsig#";
        this.Cabecalho = data.Cabecalho || new CabecalhoPedidoEnvioLoteRPS_1.default();
        this.RPS = data.RPS;
    }
    validate() {
        this.Cabecalho.validate();
        this.RPS.forEach((rps) => rps.validate());
    }
    merge(data) {
        this.Cabecalho.merge(data);
        this.RPS.forEach((rps) => rps.merge(data));
    }
}
exports.default = PedidoEnvioLoteRPS;
//# sourceMappingURL=PedidoEnvioLoteRPS.js.map