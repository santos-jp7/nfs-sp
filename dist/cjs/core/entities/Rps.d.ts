import * as Tipos from "./Tipos";
import TomadorRPS from "./TomadorRPS";
import ChaveRPS from "./ChaveRPS";
import { INfsConfigData } from "../interfaces/INfsConfigData";
export default class Rps {
    xmlns?: string;
    Assinatura?: string;
    ChaveRPS: ChaveRPS;
    TipoRPS?: Tipos.TipoRPS;
    DataEmissao?: string;
    StatusRPS?: Tipos.StatusRPS;
    TributacaoRPS?: Tipos.TipoTributacaoRPS;
    ValorServicos: number;
    ValorDeducoes?: number;
    CodigoServico?: string;
    AliquotaServicos?: number;
    ISSRetido?: boolean;
    TomadorRPS: TomadorRPS;
    Discriminacao: string;
    constructor(data: Omit<Rps, "validate" | "merge">);
    validate(): void;
    merge(data: Partial<INfsConfigData>): void;
}
//# sourceMappingURL=Rps.d.ts.map