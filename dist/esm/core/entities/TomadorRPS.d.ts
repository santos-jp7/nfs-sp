import * as Tipos from "./Tipos";
import EnderecoTomador from "./EnderecoTomador";
export default class TomadorRPS {
    CPFCNPJTomador: Tipos.CpfCnpj;
    InscricaoMunicipalTomador?: string;
    RazaoSocialTomador: string;
    EnderecoTomador: EnderecoTomador;
    constructor(data: Omit<TomadorRPS, "validate" | "merge">);
    validate(): void;
}
//# sourceMappingURL=TomadorRPS.d.ts.map