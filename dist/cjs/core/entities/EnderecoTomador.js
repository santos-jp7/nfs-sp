"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class EnderecoTomador {
    constructor(data) {
        this.TipoLogradouro = data.TipoLogradouro;
        this.Logradouro = data.Logradouro;
        this.NumeroEndereco = data.NumeroEndereco;
        this.ComplementoEndereco = data.ComplementoEndereco || "";
        this.Bairro = data.Bairro;
        this.Cidade = data.Cidade;
        this.UF = data.UF;
        this.CEP = data.CEP;
    }
    validate() {
        if (!this.TipoLogradouro) {
            throw new ValidationException_1.default("TipoLogradouro é obrigatório no EnderecoTomador");
        }
        if (!this.Logradouro) {
            throw new ValidationException_1.default("Logradouro é obrigatório no EnderecoTomador");
        }
        if (!this.NumeroEndereco) {
            throw new ValidationException_1.default("NumeroEndereco é obrigatório no EnderecoTomador");
        }
        if (!this.Bairro) {
            throw new ValidationException_1.default("Bairro é obrigatório no EnderecoTomador");
        }
        if (!this.Cidade) {
            throw new ValidationException_1.default("Cidade é obrigatório no EnderecoTomador");
        }
        if (!this.UF) {
            throw new ValidationException_1.default("Estado é obrigatório no EnderecoTomador");
        }
        if (!this.CEP) {
            throw new ValidationException_1.default("CEP é obrigatório no EnderecoTomador");
        }
    }
}
exports.default = EnderecoTomador;
//# sourceMappingURL=EnderecoTomador.js.map