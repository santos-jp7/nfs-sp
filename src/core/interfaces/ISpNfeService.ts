import { INfsConfigData } from "./INfsConfigData";

export interface ISpNfeService {
  config: INfsConfigData;

  emitirLoteRPS(xml: string): Promise<any>;
}
