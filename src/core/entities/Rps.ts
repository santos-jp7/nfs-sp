import moment from "moment";

import * as Tipos from "./Tipos";
import TomadorRPS from "./TomadorRPS";
import ChaveRPS from "./ChaveRPS";

import { INfsConfigData } from "../interfaces/INfsConfigData";

import ValidationException from "../exceptions/ValidationException";

export default class Rps {
  public xmlns?: string = "";

  public Assinatura?: string;
  public ChaveRPS: ChaveRPS;
  public TipoRPS?: Tipos.TipoRPS;
  public DataEmissao?: string;
  public StatusRPS?: Tipos.StatusRPS;
  public TributacaoRPS?: Tipos.TipoTributacaoRPS;
  public ValorServicos: number;
  public ValorDeducoes?: number;
  public CodigoServico?: string;
  public AliquotaServicos?: number;
  public ISSRetido?: boolean;
  public TomadorRPS: TomadorRPS;
  public Discriminacao: string;

  constructor(data: Omit<Rps, "validate" | "merge">) {
    this.Assinatura = data.Assinatura || undefined;
    this.ChaveRPS = data.ChaveRPS;
    this.TipoRPS = data.TipoRPS || "RPS";
    this.DataEmissao = data.DataEmissao || moment().format("YYYY-MM-DD");
    this.StatusRPS = data.StatusRPS || "N";
    this.TributacaoRPS = data.TributacaoRPS || "T";
    this.ValorServicos = data.ValorServicos;
    this.ValorDeducoes = data.ValorDeducoes || 0;
    this.CodigoServico = data.CodigoServico;
    this.AliquotaServicos = data.AliquotaServicos || 0;
    this.ISSRetido = data.ISSRetido || false;
    this.TomadorRPS = data.TomadorRPS;
    this.Discriminacao = data.Discriminacao;

    if (!this.TomadorRPS.EnderecoTomador.ComplementoEndereco)
      this.TomadorRPS.EnderecoTomador.ComplementoEndereco = "";
  }

  public validate(): void {
    this.ChaveRPS.validate();

    if (!this.ValorServicos || this.ValorServicos === 0) {
      throw new ValidationException("ValorServicos é obrigatório");
    }

    if (!this.CodigoServico) {
      throw new ValidationException("CodigoServico é obrigatório");
    }

    this.TomadorRPS.validate();

    if (!this.Discriminacao) {
      throw new ValidationException("Discriminacao é obrigatório");
    }
  }

  public merge(data: Partial<INfsConfigData>): void {
    this.ChaveRPS.merge(data);

    if (!this.CodigoServico) this.CodigoServico = data.codigoServicoPadrao;
  }
}
