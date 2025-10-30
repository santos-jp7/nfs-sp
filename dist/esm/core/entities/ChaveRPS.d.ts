import { INfsConfigData } from "../interfaces/INfsConfigData";
export default class ChaveRPS {
    InscricaoPrestador?: string;
    SerieRPS: string;
    NumeroRPS: string;
    constructor(data: Omit<ChaveRPS, "validate" | "merge">);
    validate(): void;
    merge(data: Partial<INfsConfigData>): void;
}
//# sourceMappingURL=ChaveRPS.d.ts.map