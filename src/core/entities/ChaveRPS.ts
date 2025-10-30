import { INfsConfigData } from "../interfaces/INfsConfigData";

import ValidationException from "../exceptions/ValidationException";

export default class ChaveRPS {
  public InscricaoPrestador?: string;
  public SerieRPS: string;
  public NumeroRPS: string;

  constructor(data: Omit<ChaveRPS, "validate" | "merge">) {
    this.InscricaoPrestador = data.InscricaoPrestador;
    this.SerieRPS = data.SerieRPS;
    this.NumeroRPS = data.NumeroRPS;
  }

  public validate(): void {
    if (!this.InscricaoPrestador) {
      throw new ValidationException(
        "InscricaoPrestador é obrigatório na ChaveRPS"
      );
    }

    if (!this.SerieRPS) {
      throw new ValidationException("SerieRPS é obrigatório na ChaveRPS");
    }

    if (!this.NumeroRPS) {
      throw new ValidationException("NumeroRPS é obrigatório na ChaveRPS");
    }
  }

  public merge(data: Partial<INfsConfigData>): void {
    if (!this.InscricaoPrestador) {
      this.InscricaoPrestador = data.inscricaoPrestador;
    }
  }
}
