import PedidoEnvioLoteRPS from "../../core/entities/PedidoEnvioLoteRPS";
import { INfsConfigData } from "../../core/interfaces/INfsConfigData";
import { IXmlTransformer } from "../../core/interfaces/IXmlTransformer";
export default class XmlTransformer implements IXmlTransformer {
    private pathXMls;
    constructor(config: INfsConfigData);
    transform(pedidoEnvioLoteRPS: PedidoEnvioLoteRPS): string;
}
//# sourceMappingURL=XmlTransformer.d.ts.map