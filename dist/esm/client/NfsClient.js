"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NfsConfig_1 = require("../infra/config/NfsConfig");
const EmitirLoteRPSUseCase_1 = __importDefault(require("../core/use-cases/EmitirLoteRPSUseCase"));
const RPSSigner_1 = __importDefault(require("../infra/crypto/RPSSigner"));
const XmlSignature_1 = __importDefault(require("../infra/crypto/XmlSignature"));
const XmlTransformer_1 = __importDefault(require("../infra/services/XmlTransformer"));
const SpNfsService_1 = __importDefault(require("../infra/services/SpNfsService"));
const XmlResponse_1 = __importDefault(require("../infra/services/XmlResponse"));
class NfsClient {
    constructor(config) {
        this.config = new NfsConfig_1.NfsConfig(config);
        this.rpsSigner = new RPSSigner_1.default(this.config);
        this.xmlTransformer = new XmlTransformer_1.default(this.config);
        this.xmlSignature = new XmlSignature_1.default(this.config);
        this.spNfsService = new SpNfsService_1.default(this.config);
        this.xmlResponse = new XmlResponse_1.default(this.config);
        this.emitirLoteRPSUseCase = new EmitirLoteRPSUseCase_1.default(this.config, this.rpsSigner, this.xmlTransformer, this.xmlSignature, this.spNfsService, this.xmlResponse);
    }
    async emitirLoteRPS(rpsList) {
        return this.emitirLoteRPSUseCase.execute(rpsList);
    }
}
exports.default = NfsClient;
//# sourceMappingURL=NfsClient.js.map