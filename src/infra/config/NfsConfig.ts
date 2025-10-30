import path from "path";

import { INfsConfigData } from "../../core/interfaces/INfsConfigData";
import { CpfCnpj } from "../../core/entities/Tipos";

export class NfsConfig implements INfsConfigData {
  baseUrl?: string | undefined;
  timeout?: number | undefined;
  cnpjPrestador: CpfCnpj;
  inscricaoPrestador: string;
  codigoServicoPadrao: string;
  certificatePath: string;
  certificatePassword: string;
  pathXMls?: any;
  debug?: boolean | undefined;

  constructor(data: INfsConfigData) {
    if (!data.baseUrl) this.baseUrl = "https://nfe.prefeitura.sp.gov.br";
    else this.baseUrl = data.baseUrl;

    if (!data.timeout) this.timeout = 15000;
    else this.timeout = data.timeout;

    if (!data.pathXMls) this.pathXMls = path.resolve(process.cwd(), "xmls");
    else this.pathXMls = data.pathXMls;

    if (!data.debug) this.debug = false;
    else this.debug = data.debug;

    if (
      !data.cnpjPrestador ||
      !data.certificatePath ||
      !data.inscricaoPrestador
    ) {
      throw new Error(
        "NfsConfig: URL, CNPJ, Inscrição do Prestador e caminho do certificado são obrigatórios."
      );
    }

    this.cnpjPrestador = data.cnpjPrestador;
    this.inscricaoPrestador = data.inscricaoPrestador;
    this.codigoServicoPadrao = data.codigoServicoPadrao;
    this.certificatePath = data.certificatePath;
    this.certificatePassword = data.certificatePassword;
  }
}
