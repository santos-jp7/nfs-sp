import Rps from "../entities/Rps";
import { INfsConfigData } from "../interfaces/INfsConfigData";
import { IRpsSigner, IXmlSignature } from "../interfaces/ISigner";
import { IXmlTransformer } from "../interfaces/IXmlTransformer";
import { ISpNfeService } from "../interfaces/ISpNfeService";
import { IXmlResponse } from "../interfaces/IXmlResponse";
export default class EmitirLoteRPSUseCase {
    config: INfsConfigData;
    private rpsSigner;
    private xmlTransformer;
    private xmlSignature;
    private spNfeService;
    private xmlResponse;
    constructor(config: INfsConfigData, rpsSigner: IRpsSigner, xmlTransformer: IXmlTransformer, xmlSignature: IXmlSignature, spNfeService: ISpNfeService, xmlResponse: IXmlResponse);
    execute(rps: Rps[] | Rps): Promise<any>;
}
//# sourceMappingURL=EmitirLoteRPSUseCase.d.ts.map