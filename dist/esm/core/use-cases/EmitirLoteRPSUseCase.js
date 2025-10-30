"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const PedidoEnvioLoteRPS_1 = __importDefault(require("../entities/PedidoEnvioLoteRPS"));
const CabecalhoPedidoEnvioLoteRPS_1 = __importDefault(require("../entities/CabecalhoPedidoEnvioLoteRPS"));
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
class EmitirLoteRPSUseCase {
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
            throw new ValidationException_1.default("A emissão de lote com múltiplos RPS ainda não é suportada.");
        // Cria estrutura do PedidoEnvioLoteRPS
        const emissionMoments = rpsArray
            .map((item) => {
            if (!item || !item.DataEmissao)
                return null;
            const m = (0, moment_1.default)(item.DataEmissao);
            return m.isValid() ? m : null;
        })
            .filter((m) => m !== null);
        const dtInicio = emissionMoments.length
            ? moment_1.default.min(...emissionMoments).format("YYYY-MM-DD")
            : (0, moment_1.default)().format("YYYY-MM-DD");
        const dtFim = emissionMoments.length
            ? moment_1.default.max(...emissionMoments).format("YYYY-MM-DD")
            : (0, moment_1.default)().format("YYYY-MM-DD");
        const pedidoEnvioLoteRPS = new PedidoEnvioLoteRPS_1.default({
            Cabecalho: new CabecalhoPedidoEnvioLoteRPS_1.default({
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
        const xmlSignedBuffer = fs_1.default.readFileSync(xmlFilePath, "utf-8");
        // Envia o XML assinado para o serviço da SP
        const response = await this.spNfeService.emitirLoteRPS(xmlSignedBuffer);
        // Processa a resposta (a implementação pode variar conforme o serviço)
        const data = await this.xmlResponse.processPedidoEnvioLoteRPS(response);
        if (data.Erro)
            throw new Error(JSON.stringify(data.Erro));
        return data;
    }
}
exports.default = EmitirLoteRPSUseCase;
//# sourceMappingURL=EmitirLoteRPSUseCase.js.map