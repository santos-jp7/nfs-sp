import CabecalhoPedidoEnvioLoteRPS from "./CabecalhoPedidoEnvioLoteRPS";
export default class PedidoEnvioLoteRPS {
    constructor(data) {
        this.xmlns = "http://www.prefeitura.sp.gov.br/nfe";
        this.xmlnsTipos = "http://www.prefeitura.sp.gov.br/nfe/tipos";
        this.xmlnsDs = "http://www.w3.org/2000/09/xmldsig#";
        this.Cabecalho = data.Cabecalho || new CabecalhoPedidoEnvioLoteRPS();
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
//# sourceMappingURL=PedidoEnvioLoteRPS.js.map