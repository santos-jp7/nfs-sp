import * as Tipos from "./Tipos";
import EnderecoTomador from "./EnderecoTomador";

import ValidationException from "../exceptions/ValidationException";

export default class TomadorRPS {
  public CPFCNPJTomador: Tipos.CpfCnpj;
  public InscricaoMunicipalTomador?: string;
  public RazaoSocialTomador: string;
  public EnderecoTomador: EnderecoTomador;

  constructor(data: Omit<TomadorRPS, "validate" | "merge">) {
    this.CPFCNPJTomador = data.CPFCNPJTomador;
    this.InscricaoMunicipalTomador = data.InscricaoMunicipalTomador || "0";
    this.RazaoSocialTomador = data.RazaoSocialTomador;
    this.EnderecoTomador = data.EnderecoTomador;
  }

  public validate(): void {
    if (!this.CPFCNPJTomador.CPF && !this.CPFCNPJTomador.CNPJ) {
      throw new ValidationException(
        "É obrigatório informar CPF ou CNPJ no CPFCNPJTomador"
      );
    }

    if (!this.RazaoSocialTomador) {
      throw new ValidationException(
        "RazaoSocialTomador é obrigatório no TomadorRPS"
      );
    }

    this.EnderecoTomador.validate();
  }
}
