import { INfsConfigData } from "./INfsConfigData";
import Rps from "../entities/Rps";
export interface IRpsSigner {
    config: INfsConfigData;
    sign(rps: Rps): void;
}
export interface IXmlSignature {
    config: INfsConfigData;
    sign(xml: string, reference: string): void;
}
//# sourceMappingURL=ISigner.d.ts.map