"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class CabecalhoPedidoEnvioLoteRPS {
    constructor(data) {
        this.xmlns = "";
        this.Versao = "1";
        this.CPFCNPJRemetente = data?.CPFCNPJRemetente;
        this.transacao = data?.transacao || true;
        this.dtInicio = data?.dtInicio;
        this.dtFim = data?.dtFim;
        this.QtdRPS = data?.QtdRPS;
        this.ValorTotalServicos = data?.ValorTotalServicos;
        this.ValorTotalDeducoes = data?.ValorTotalDeducoes;
    }
    validate() {
        if (!this.CPFCNPJRemetente) {
            throw new ValidationException_1.default("CPFCNPJRemetente é obrigatório");
        }
        if (!this.dtInicio) {
            throw new ValidationException_1.default("dtInicio é obrigatório");
        }
        if (!this.dtFim) {
            throw new ValidationException_1.default("dtFim é obrigatório");
        }
        if (!this.QtdRPS || this.QtdRPS === 0) {
            throw new ValidationException_1.default("QtdRPS é obrigatório");
        }
        if (!this.ValorTotalServicos && this.ValorTotalServicos !== 0) {
            throw new ValidationException_1.default("ValorTotalServicos é obrigatório");
        }
        if (!this.ValorTotalDeducoes && this.ValorTotalDeducoes !== 0) {
            throw new ValidationException_1.default("ValorTotalDeducoes é obrigatório");
        }
    }
    merge(data) {
        if (!this.CPFCNPJRemetente) {
            this.CPFCNPJRemetente = data.cnpjPrestador;
        }
    }
}
exports.default = CabecalhoPedidoEnvioLoteRPS;
//# sourceMappingURL=CabecalhoPedidoEnvioLoteRPS.js.map