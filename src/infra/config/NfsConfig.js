import path from "path";
export class NfsConfig {
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
            this.pathXMls = path.resolve(process.cwd(), "xmls");
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
//# sourceMappingURL=NfsConfig.js.map