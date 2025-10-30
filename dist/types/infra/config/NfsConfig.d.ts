import { INfsConfigData } from "../../core/interfaces/INfsConfigData";
import { CpfCnpj } from "../../core/entities/Tipos";
export declare class NfsConfig implements INfsConfigData {
    baseUrl?: string | undefined;
    timeout?: number | undefined;
    cnpjPrestador: CpfCnpj;
    inscricaoPrestador: string;
    codigoServicoPadrao: string;
    certificatePath: string;
    certificatePassword: string;
    pathXMls?: any;
    debug?: boolean | undefined;
    constructor(data: INfsConfigData);
}
//# sourceMappingURL=NfsConfig.d.ts.map