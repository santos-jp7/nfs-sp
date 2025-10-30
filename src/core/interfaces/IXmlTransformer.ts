import PedidoEnvioLoteRPS from "../entities/PedidoEnvioLoteRPS";

export interface IXmlTransformer {
  transform(pedidoEnvioLoteRPS: PedidoEnvioLoteRPS): string;
}
