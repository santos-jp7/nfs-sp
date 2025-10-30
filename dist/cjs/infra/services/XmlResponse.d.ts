import { IXmlResponse } from "../../core/interfaces/IXmlResponse";
import { INfsConfigData } from "../../core/interfaces/INfsConfigData";
export default class XmlResponse implements IXmlResponse {
    pathXMls: string;
    constructor(config: INfsConfigData);
    processPedidoEnvioLoteRPS(response: string): Promise<any>;
}
//# sourceMappingURL=XmlResponse.d.ts.map