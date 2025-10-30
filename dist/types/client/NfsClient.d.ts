import Rps from "../core/entities/Rps";
import { INfsConfigData } from "../core/interfaces/INfsConfigData";
import EmitirLoteRPSUseCase from "../core/use-cases/EmitirLoteRPSUseCase";
import { IRetornoEnvioLoteRPS } from "../core/interfaces/IXmlResponse";
export default class NfsClient {
    config: INfsConfigData;
    emitirLoteRPSUseCase: EmitirLoteRPSUseCase;
    private rpsSigner;
    private xmlTransformer;
    private xmlSignature;
    private spNfsService;
    private xmlResponse;
    constructor(config: INfsConfigData);
    emitirLoteRPS(rpsList: Rps[] | Rps): Promise<IRetornoEnvioLoteRPS>;
}
//# sourceMappingURL=NfsClient.d.ts.map