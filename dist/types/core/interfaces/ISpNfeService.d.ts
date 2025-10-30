import { INfsConfigData } from "./INfsConfigData";
export interface ISpNfeService {
    config: INfsConfigData;
    emitirLoteRPS(xml: string): Promise<any>;
}
//# sourceMappingURL=ISpNfeService.d.ts.map