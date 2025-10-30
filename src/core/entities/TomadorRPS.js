import ValidationException from "../exceptions/ValidationException";
export default class TomadorRPS {
    constructor(data) {
        this.CPFCNPJTomador = data.CPFCNPJTomador;
        this.InscricaoMunicipalTomador = data.InscricaoMunicipalTomador || "0";
        this.RazaoSocialTomador = data.RazaoSocialTomador;
        this.EnderecoTomador = data.EnderecoTomador;
    }
    validate() {
        if (!this.CPFCNPJTomador.CPF && !this.CPFCNPJTomador.CNPJ) {
            throw new ValidationException("É obrigatório informar CPF ou CNPJ no CPFCNPJTomador");
        }
        if (!this.RazaoSocialTomador) {
            throw new ValidationException("RazaoSocialTomador é obrigatório no TomadorRPS");
        }
        this.EnderecoTomador.validate();
    }
}
//# sourceMappingURL=TomadorRPS.js.map