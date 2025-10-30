import ValidationException from "../exceptions/ValidationException";
export default class EnderecoTomador {
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
            throw new ValidationException("TipoLogradouro é obrigatório no EnderecoTomador");
        }
        if (!this.Logradouro) {
            throw new ValidationException("Logradouro é obrigatório no EnderecoTomador");
        }
        if (!this.NumeroEndereco) {
            throw new ValidationException("NumeroEndereco é obrigatório no EnderecoTomador");
        }
        if (!this.Bairro) {
            throw new ValidationException("Bairro é obrigatório no EnderecoTomador");
        }
        if (!this.Cidade) {
            throw new ValidationException("Cidade é obrigatório no EnderecoTomador");
        }
        if (!this.UF) {
            throw new ValidationException("Estado é obrigatório no EnderecoTomador");
        }
        if (!this.CEP) {
            throw new ValidationException("CEP é obrigatório no EnderecoTomador");
        }
    }
}
//# sourceMappingURL=EnderecoTomador.js.map