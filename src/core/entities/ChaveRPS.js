import ValidationException from "../exceptions/ValidationException";
export default class ChaveRPS {
    constructor(data) {
        this.InscricaoPrestador = data.InscricaoPrestador;
        this.SerieRPS = data.SerieRPS;
        this.NumeroRPS = data.NumeroRPS;
    }
    validate() {
        if (!this.InscricaoPrestador) {
            throw new ValidationException("InscricaoPrestador é obrigatório na ChaveRPS");
        }
        if (!this.SerieRPS) {
            throw new ValidationException("SerieRPS é obrigatório na ChaveRPS");
        }
        if (!this.NumeroRPS) {
            throw new ValidationException("NumeroRPS é obrigatório na ChaveRPS");
        }
    }
    merge(data) {
        if (!this.InscricaoPrestador) {
            this.InscricaoPrestador = data.inscricaoPrestador;
        }
    }
}
//# sourceMappingURL=ChaveRPS.js.map