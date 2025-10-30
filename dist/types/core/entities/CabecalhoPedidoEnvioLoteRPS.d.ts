import * as Tipos from "./Tipos";
import { INfsConfigData } from "../interfaces/INfsConfigData";
export default class CabecalhoPedidoEnvioLoteRPS {
    xmlns?: string;
    Versao?: string;
    CPFCNPJRemetente?: Tipos.CpfCnpj;
    transacao?: boolean;
    dtInicio?: string;
    dtFim?: string;
    QtdRPS?: number;
    ValorTotalServicos?: number;
    ValorTotalDeducoes?: number;
    constructor(data?: Omit<CabecalhoPedidoEnvioLoteRPS, "xmlns" | "Versao" | "validate" | "merge">);
    validate(): void;
    merge(data: Partial<INfsConfigData>): void;
}
//# sourceMappingURL=CabecalhoPedidoEnvioLoteRPS.d.ts.map