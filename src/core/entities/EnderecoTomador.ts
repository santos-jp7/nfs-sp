import ValidationException from "../exceptions/ValidationException";

export default class EnderecoTomador {
  /** Tipo do logradouro do tomador
   * Valores válidos:
   * AC - Acesso
   * AL - Alameda
   * AV - Avenida
   * BC - Beco
   * CM - Caminho
   * CMP - Caminho particular
   * CP - Caminho de pedestre
   * CV - Complexo Viário
   * EL - Espaço livre
   * EPL -  Esplanada
   * ES - Estrada
   * ESC - Escadaria
   * ESP - Estrada particular
   * EST - estacionamento
   * GL - Galeria
   * JD - Jardim
   * LD - Ladeira
   * LG - Largo
   * PA - Passarela
   * PC - Praça
   * PCR - Praça de retorno
   * PP - Passagem de pedestres
   * PQ - Parque
   * PS - Passagem
   * PSP - Passagem particular
   * PSS - Passagem subterrânea
   * PT - Pátio
   * PTE - Ponte
   * PTL – Pontilhão
   * R - Rua
   * RP - Rua particular
   * RPJ - Rua projetada
   * RV – Rodovia
   * SV – Servidão
   * TN – Túnel
   * TPJ - Travessa Projetada
   * TV - Travessa
   * TVP - Travessa particular
   * VCP - Via de circulação de pedestres
   * VD - Viaduto
   * VE - Viela
   * VEL - Via elevada
   * VEP - Viela particular
   * VER - Vereda
   * VES - Viela Sanitária
   * VIA - Via
   * VL - Vila
   * VLP - Vila particular
   * VP - Via de pedestre
   * @external https://metadados.geosampa.prefeitura.sp.gov.br/geonetwork/intranet/api/records/620ed7e9-c4f7-4111-a268-346514a2b135/attachments/Categoria%20tipo%20de%20logradouro.xls
   */
  public TipoLogradouro:
    | "AC"
    | "AL"
    | "AV"
    | "BC"
    | "CM"
    | "CMP"
    | "CP"
    | "CV"
    | "EL"
    | "EPL"
    | "ES"
    | "ESC"
    | "ESP"
    | "EST"
    | "GL"
    | "JD"
    | "LD"
    | "LG"
    | "PA"
    | "PC"
    | "PCR"
    | "PP"
    | "PQ"
    | "PS"
    | "PSP"
    | "PSS"
    | "PT"
    | "PTE"
    | "PTL"
    | "R"
    | "RP"
    | "RPJ"
    | "RV"
    | "SV"
    | "TN"
    | "TPJ"
    | "TV"
    | "TVP"
    | "VCP"
    | "VD"
    | "VE"
    | "VEL"
    | "VEP"
    | "VER"
    | "VES"
    | "VIA"
    | "VL"
    | "VLP"
    | "VP";
  public Logradouro: string;
  public NumeroEndereco: string;
  public ComplementoEndereco?: string;
  public Bairro: string;

  /** Cidade do tomador
   * Codigo do IBGE da cidade do tomador
   */
  public Cidade: string;
  public UF: string;
  public CEP: string;

  constructor(data: Omit<EnderecoTomador, "validate" | "merge">) {
    this.TipoLogradouro = data.TipoLogradouro;
    this.Logradouro = data.Logradouro;
    this.NumeroEndereco = data.NumeroEndereco;
    this.ComplementoEndereco = data.ComplementoEndereco || "";
    this.Bairro = data.Bairro;
    this.Cidade = data.Cidade;
    this.UF = data.UF;
    this.CEP = data.CEP;
  }

  public validate(): void {
    if (!this.TipoLogradouro) {
      throw new ValidationException(
        "TipoLogradouro é obrigatório no EnderecoTomador"
      );
    }

    if (!this.Logradouro) {
      throw new ValidationException(
        "Logradouro é obrigatório no EnderecoTomador"
      );
    }

    if (!this.NumeroEndereco) {
      throw new ValidationException(
        "NumeroEndereco é obrigatório no EnderecoTomador"
      );
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
