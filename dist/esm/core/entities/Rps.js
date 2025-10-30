"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class Rps {
    constructor(data) {
        this.xmlns = "";
        this.Assinatura = data.Assinatura || undefined;
        this.ChaveRPS = data.ChaveRPS;
        this.TipoRPS = data.TipoRPS || "RPS";
        this.DataEmissao = data.DataEmissao || (0, moment_1.default)().format("YYYY-MM-DD");
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
    validate() {
        this.ChaveRPS.validate();
        if (!this.ValorServicos || this.ValorServicos === 0) {
            throw new ValidationException_1.default("ValorServicos é obrigatório");
        }
        if (!this.CodigoServico) {
            throw new ValidationException_1.default("CodigoServico é obrigatório");
        }
        this.TomadorRPS.validate();
        if (!this.Discriminacao) {
            throw new ValidationException_1.default("Discriminacao é obrigatório");
        }
    }
    merge(data) {
        this.ChaveRPS.merge(data);
        if (!this.CodigoServico)
            this.CodigoServico = data.codigoServicoPadrao;
    }
}
exports.default = Rps;
//# sourceMappingURL=Rps.js.map