export interface IRetornoEnvioLoteRPS {
    Erro?: string;
    Sucesso?: boolean;
    Mensagem?: string;
    Cabecalho?: {
        InformacoesLote: {
            NumeroLote: number;
            QtdNotasProcessadas: number;
        };
    };
    Alerta?: {
        Codigo: number;
        Descricao: string;
    };
    ChaveNFeRPS?: {
        ChaveNFe: {
            NumeroNFe: number;
            CodigoVerificacao: string;
        };
        ChaveRPS: {
            SerieRPS: string;
            NumeroRPS: string;
            InscricaoPrestador: string;
        };
    };
}
export interface IXmlResponse {
    processPedidoEnvioLoteRPS(response: string): Promise<IRetornoEnvioLoteRPS>;
}
//# sourceMappingURL=IXmlResponse.d.ts.map