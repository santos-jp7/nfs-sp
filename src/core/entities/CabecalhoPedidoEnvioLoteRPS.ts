import moment from "moment";

import * as Tipos from "./Tipos";

import { INfsConfigData } from "../interfaces/INfsConfigData";

import ValidationException from "../exceptions/ValidationException";

export default class CabecalhoPedidoEnvioLoteRPS {
  public xmlns?: string = "";
  public Versao?: string = "1";

  public CPFCNPJRemetente?: Tipos.CpfCnpj;
  public transacao?: boolean;
  public dtInicio?: string;
  public dtFim?: string;
  public QtdRPS?: number;
  public ValorTotalServicos?: number;
  public ValorTotalDeducoes?: number;

  constructor(
    data?: Omit<
      CabecalhoPedidoEnvioLoteRPS,
      "xmlns" | "Versao" | "validate" | "merge"
    >
  ) {
    this.CPFCNPJRemetente = data?.CPFCNPJRemetente;
    this.transacao = data?.transacao || true;
    this.dtInicio = data?.dtInicio;
    this.dtFim = data?.dtFim;
    this.QtdRPS = data?.QtdRPS;
    this.ValorTotalServicos = data?.ValorTotalServicos;
    this.ValorTotalDeducoes = data?.ValorTotalDeducoes;
  }

  public validate(): void {
    if (!this.CPFCNPJRemetente) {
      throw new ValidationException("CPFCNPJRemetente é obrigatório");
    }

    if (!this.dtInicio) {
      throw new ValidationException("dtInicio é obrigatório");
    }

    if (!this.dtFim) {
      throw new ValidationException("dtFim é obrigatório");
    }

    if (!this.QtdRPS || this.QtdRPS === 0) {
      throw new ValidationException("QtdRPS é obrigatório");
    }

    if (!this.ValorTotalServicos && this.ValorTotalServicos !== 0) {
      throw new ValidationException("ValorTotalServicos é obrigatório");
    }

    if (!this.ValorTotalDeducoes && this.ValorTotalDeducoes !== 0) {
      throw new ValidationException("ValorTotalDeducoes é obrigatório");
    }
  }

  public merge(data: Partial<INfsConfigData>): void {
    if (!this.CPFCNPJRemetente) {
      this.CPFCNPJRemetente = data.cnpjPrestador;
    }
  }
}
