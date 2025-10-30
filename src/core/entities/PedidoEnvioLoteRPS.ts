import { INfsConfigData } from "../interfaces/INfsConfigData";

import CabecalhoPedidoEnvioLoteRPS from "./CabecalhoPedidoEnvioLoteRPS";
import Rps from "./Rps";

export default class PedidoEnvioLoteRPS {
  public xmlns?: string = "http://www.prefeitura.sp.gov.br/nfe";
  public xmlnsTipos?: string = "http://www.prefeitura.sp.gov.br/nfe/tipos";
  public xmlnsDs?: string = "http://www.w3.org/2000/09/xmldsig#";

  public Cabecalho: CabecalhoPedidoEnvioLoteRPS;
  public RPS: Rps[];

  constructor(
    data: Omit<
      PedidoEnvioLoteRPS,
      "xmlns" | "xmlnsTipos" | "xmlnsDs" | "validate" | "merge"
    >
  ) {
    this.Cabecalho = data.Cabecalho || new CabecalhoPedidoEnvioLoteRPS();
    this.RPS = data.RPS;
  }

  public validate(): void {
    this.Cabecalho.validate();
    this.RPS.forEach((rps) => rps.validate());
  }

  public merge(data: Partial<INfsConfigData>): void {
    this.Cabecalho.merge(data);
    this.RPS.forEach((rps) => rps.merge(data));
  }
}
