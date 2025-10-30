import * as Tipos from "../entities/Tipos";

export interface INfsConfigData {
  /**
   * Base URL da API NFS-e (ex: https://nfe.prefeitura.sp.gov.br)
   * @default "https://nfe.prefeitura.sp.gov.br"
   */
  baseUrl?: string;

  /** Tempo limite para requisições em milissegundos
   * @default 15000
   */
  timeout?: number;

  /**
   * CNPJ do prestador de serviços
   */
  cnpjPrestador: Tipos.CpfCnpj;

  /**
   * Inscrição do prestador de serviços
   */
  inscricaoPrestador: Required<string>;

  /**
   * Código do serviço padrão
   * @external https://blog.quantosobra.com.br/tabela-iss-sp-2019/
   */
  codigoServicoPadrao: string;

  /** Caminho do arquivo do certificado digital (.pfx ou .p12) */
  certificatePath: string;
  /** Senha do certificado digital */
  certificatePassword: string;

  /** Diretório onde os arquivos XML serão armazenados
   * @default path.resolve(process.cwd(), "xmls")
   */
  pathXMls?: any;

  /** Habilitar logs de depuração
   * @default false
   */
  debug?: boolean;
}
