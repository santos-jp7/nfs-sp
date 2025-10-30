import { ISpNfeService } from "../../core/interfaces/ISpNfeService";
import { INfsConfigData } from "../../core/interfaces/INfsConfigData";
export default class SpNfsService implements ISpNfeService {
    config: INfsConfigData;
    private pfx;
    private passphrase;
    private endpointUrl;
    private httpsAgent;
    private headers;
    constructor(config: INfsConfigData);
    emitirLoteRPS(xml: string): Promise<any>;
}
//# sourceMappingURL=SpNfsService.d.ts.map