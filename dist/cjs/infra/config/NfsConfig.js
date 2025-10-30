"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NfsConfig = void 0;
const path_1 = __importDefault(require("path"));
class NfsConfig {
    constructor(data) {
        if (!data.baseUrl)
            this.baseUrl = "https://nfe.prefeitura.sp.gov.br";
        else
            this.baseUrl = data.baseUrl;
        if (!data.timeout)
            this.timeout = 15000;
        else
            this.timeout = data.timeout;
        if (!data.pathXMls)
            this.pathXMls = path_1.default.resolve(process.cwd(), "xmls");
        else
            this.pathXMls = data.pathXMls;
        if (!data.debug)
            this.debug = false;
        else
            this.debug = data.debug;
        if (!data.cnpjPrestador ||
            !data.certificatePath ||
            !data.inscricaoPrestador) {
            throw new Error("NfsConfig: URL, CNPJ, Inscrição do Prestador e caminho do certificado são obrigatórios.");
        }
        this.cnpjPrestador = data.cnpjPrestador;
        this.inscricaoPrestador = data.inscricaoPrestador;
        this.codigoServicoPadrao = data.codigoServicoPadrao;
        this.certificatePath = data.certificatePath;
        this.certificatePassword = data.certificatePassword;
    }
}
exports.NfsConfig = NfsConfig;
//# sourceMappingURL=NfsConfig.js.map