import { INfsConfigData } from "../interfaces/INfsConfigData";
import CabecalhoPedidoEnvioLoteRPS from "./CabecalhoPedidoEnvioLoteRPS";
import Rps from "./Rps";
export default class PedidoEnvioLoteRPS {
    xmlns?: string;
    xmlnsTipos?: string;
    xmlnsDs?: string;
    Cabecalho: CabecalhoPedidoEnvioLoteRPS;
    RPS: Rps[];
    constructor(data: Omit<PedidoEnvioLoteRPS, "xmlns" | "xmlnsTipos" | "xmlnsDs" | "validate" | "merge">);
    validate(): void;
    merge(data: Partial<INfsConfigData>): void;
}
//# sourceMappingURL=PedidoEnvioLoteRPS.d.ts.map