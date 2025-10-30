"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class TomadorRPS {
    constructor(data) {
        this.CPFCNPJTomador = data.CPFCNPJTomador;
        this.InscricaoMunicipalTomador = data.InscricaoMunicipalTomador || "0";
        this.RazaoSocialTomador = data.RazaoSocialTomador;
        this.EnderecoTomador = data.EnderecoTomador;
    }
    validate() {
        if (!this.CPFCNPJTomador.CPF && !this.CPFCNPJTomador.CNPJ) {
            throw new ValidationException_1.default("É obrigatório informar CPF ou CNPJ no CPFCNPJTomador");
        }
        if (!this.RazaoSocialTomador) {
            throw new ValidationException_1.default("RazaoSocialTomador é obrigatório no TomadorRPS");
        }
        this.EnderecoTomador.validate();
    }
}
exports.default = TomadorRPS;
//# sourceMappingURL=TomadorRPS.js.map