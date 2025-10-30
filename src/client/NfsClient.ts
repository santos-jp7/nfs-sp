import Rps from "../core/entities/Rps";

import { NfsConfig } from "../infra/config/NfsConfig";

import { INfsConfigData } from "../core/interfaces/INfsConfigData";

import EmitirLoteRPSUseCase from "../core/use-cases/EmitirLoteRPSUseCase";

import RPSSigner from "../infra/crypto/RPSSigner";
import XmlSignature from "../infra/crypto/XmlSignature";

import XmlTransformer from "../infra/services/XmlTransformer";
import SpNfsService from "../infra/services/SpNfsService";
import XmlResponse from "../infra/services/XmlResponse";

import { IRetornoEnvioLoteRPS } from "../core/interfaces/IXmlResponse";

export default class NfsClient {
  public config: INfsConfigData;
  public emitirLoteRPSUseCase: EmitirLoteRPSUseCase;

  private rpsSigner: RPSSigner;
  private xmlTransformer: XmlTransformer;
  private xmlSignature: XmlSignature;
  private spNfsService: SpNfsService;
  private xmlResponse: XmlResponse;

  constructor(config: INfsConfigData) {
    this.config = new NfsConfig(config);

    this.rpsSigner = new RPSSigner(this.config);
    this.xmlTransformer = new XmlTransformer(this.config);
    this.xmlSignature = new XmlSignature(this.config);
    this.spNfsService = new SpNfsService(this.config);
    this.xmlResponse = new XmlResponse(this.config);

    this.emitirLoteRPSUseCase = new EmitirLoteRPSUseCase(
      this.config,
      this.rpsSigner,
      this.xmlTransformer,
      this.xmlSignature,
      this.spNfsService,
      this.xmlResponse
    );
  }

  public async emitirLoteRPS(
    rpsList: Rps[] | Rps
  ): Promise<IRetornoEnvioLoteRPS> {
    return this.emitirLoteRPSUseCase.execute(rpsList);
  }
}
