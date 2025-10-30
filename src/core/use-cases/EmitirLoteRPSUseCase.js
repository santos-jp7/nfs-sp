import moment from "moment";
import fs from "fs";
import PedidoEnvioLoteRPS from "../entities/PedidoEnvioLoteRPS";
import CabecalhoPedidoEnvioLoteRPS from "../entities/CabecalhoPedidoEnvioLoteRPS";
import ValidationException from "../exceptions/ValidationException";
export default class EmitirLoteRPSUseCase {
    constructor(config, rpsSigner, xmlTransformer, xmlSignature, spNfeService, xmlResponse) {
        this.config = config;
        this.rpsSigner = rpsSigner;
        this.xmlTransformer = xmlTransformer;
        this.xmlSignature = xmlSignature;
        this.spNfeService = spNfeService;
        this.xmlResponse = xmlResponse;
    }
    async execute(rps) {
        const rpsArray = Array.isArray(rps) ? rps : [rps];
        if (rpsArray.length > 1)
            throw new ValidationException("A emissão de lote com múltiplos RPS ainda não é suportada.");
        // Cria estrutura do PedidoEnvioLoteRPS
        const emissionMoments = rpsArray
            .map((item) => {
            if (!item || !item.DataEmissao)
                return null;
            const m = moment(item.DataEmissao);
            return m.isValid() ? m : null;
        })
            .filter((m) => m !== null);
        const dtInicio = emissionMoments.length
            ? moment.min(...emissionMoments).format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD");
        const dtFim = emissionMoments.length
            ? moment.max(...emissionMoments).format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD");
        const pedidoEnvioLoteRPS = new PedidoEnvioLoteRPS({
            Cabecalho: new CabecalhoPedidoEnvioLoteRPS({
                CPFCNPJRemetente: {
                    CNPJ: this.config.cnpjPrestador.CNPJ || undefined,
                    CPF: this.config.cnpjPrestador.CPF || undefined,
                },
                dtInicio,
                dtFim,
                QtdRPS: rpsArray.length,
                ValorTotalServicos: rpsArray.reduce((acc, r) => acc + (r.ValorServicos || 0), 0),
                ValorTotalDeducoes: rpsArray.reduce((acc, r) => acc + (r.ValorDeducoes || 0), 0),
            }),
            RPS: rpsArray,
        });
        pedidoEnvioLoteRPS.merge(this.config);
        pedidoEnvioLoteRPS.validate();
        // Assina os RPS
        rpsArray.forEach((rps) => {
            this.rpsSigner.sign(rps);
        });
        // Gera o XML - Não assinado
        const xmlFilePath = this.xmlTransformer.transform(pedidoEnvioLoteRPS);
        // Assina o XML
        this.xmlSignature.sign(xmlFilePath, "PedidoEnvioLoteRPS");
        // Lê o XML assinado
        const xmlSignedBuffer = fs.readFileSync(xmlFilePath, "utf-8");
        // Envia o XML assinado para o serviço da SP
        const response = await this.spNfeService.emitirLoteRPS(xmlSignedBuffer);
        // Processa a resposta (a implementação pode variar conforme o serviço)
        const data = await this.xmlResponse.processPedidoEnvioLoteRPS(response);
        if (data.Erro)
            throw new Error(JSON.stringify(data.Erro));
        return data;
    }
}
//# sourceMappingURL=EmitirLoteRPSUseCase.js.map