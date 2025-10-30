import ValidationException from "../exceptions/ValidationException";
export default class CabecalhoPedidoEnvioLoteRPS {
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
    merge(data) {
        if (!this.CPFCNPJRemetente) {
            this.CPFCNPJRemetente = data.cnpjPrestador;
        }
    }
}
//# sourceMappingURL=CabecalhoPedidoEnvioLoteRPS.js.map