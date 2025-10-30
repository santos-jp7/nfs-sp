import { NfsConfig } from "../infra/config/NfsConfig";
import EmitirLoteRPSUseCase from "../core/use-cases/EmitirLoteRPSUseCase";
import RPSSigner from "../infra/crypto/RPSSigner";
import XmlSignature from "../infra/crypto/XmlSignature";
import XmlTransformer from "../infra/services/XmlTransformer";
import SpNfsService from "../infra/services/SpNfsService";
import XmlResponse from "../infra/services/XmlResponse";
export default class NfsClient {
    constructor(config) {
        this.config = new NfsConfig(config);
        this.rpsSigner = new RPSSigner(this.config);
        this.xmlTransformer = new XmlTransformer(this.config);
        this.xmlSignature = new XmlSignature(this.config);
        this.spNfsService = new SpNfsService(this.config);
        this.xmlResponse = new XmlResponse(this.config);
        this.emitirLoteRPSUseCase = new EmitirLoteRPSUseCase(this.config, this.rpsSigner, this.xmlTransformer, this.xmlSignature, this.spNfsService, this.xmlResponse);
    }
    async emitirLoteRPS(rpsList) {
        return this.emitirLoteRPSUseCase.execute(rpsList);
    }
}
//# sourceMappingURL=NfsClient.js.map