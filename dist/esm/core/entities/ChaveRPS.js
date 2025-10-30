"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class ChaveRPS {
    constructor(data) {
        this.InscricaoPrestador = data.InscricaoPrestador;
        this.SerieRPS = data.SerieRPS;
        this.NumeroRPS = data.NumeroRPS;
    }
    validate() {
        if (!this.InscricaoPrestador) {
            throw new ValidationException_1.default("InscricaoPrestador é obrigatório na ChaveRPS");
        }
        if (!this.SerieRPS) {
            throw new ValidationException_1.default("SerieRPS é obrigatório na ChaveRPS");
        }
        if (!this.NumeroRPS) {
            throw new ValidationException_1.default("NumeroRPS é obrigatório na ChaveRPS");
        }
    }
    merge(data) {
        if (!this.InscricaoPrestador) {
            this.InscricaoPrestador = data.inscricaoPrestador;
        }
    }
}
exports.default = ChaveRPS;
//# sourceMappingURL=ChaveRPS.js.map