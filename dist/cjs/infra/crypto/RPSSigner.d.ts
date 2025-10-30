import Rps from "../../core/entities/Rps";
import { INfsConfigData } from "../../core/interfaces/INfsConfigData";
import { IRpsSigner } from "../../core/interfaces/ISigner";
export default class RPSSigner implements IRpsSigner {
    config: INfsConfigData;
    private pfx;
    private passphrase;
    private pkcs12;
    private bags;
    private keyObj;
    constructor(config: INfsConfigData);
    private add;
    sign(rps: Rps): void;
}
//# sourceMappingURL=RPSSigner.d.ts.map