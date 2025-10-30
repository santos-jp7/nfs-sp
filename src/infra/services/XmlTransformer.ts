import fs from "fs";
import xml2js from "xml2js";

import PedidoEnvioLoteRPS from "../../core/entities/PedidoEnvioLoteRPS";

import { INfsConfigData } from "../../core/interfaces/INfsConfigData";
import { IXmlTransformer } from "../../core/interfaces/IXmlTransformer";

export default class XmlTransformer implements IXmlTransformer {
  private pathXMls: string;

  constructor(config: INfsConfigData) {
    this.pathXMls = config.pathXMls;
  }

  public transform(pedidoEnvioLoteRPS: PedidoEnvioLoteRPS) {
    // Implementação da transformação para XML
    // prettier-ignore
    const xmlContent = 
`<PedidoEnvioLoteRPS xmlns="${pedidoEnvioLoteRPS.xmlns}" xmlns:tipos="${pedidoEnvioLoteRPS.xmlnsTipos}" xmlns:ds="${pedidoEnvioLoteRPS.xmlnsDs}">
<Cabecalho xmlns="${pedidoEnvioLoteRPS.Cabecalho.xmlns}" Versao="${pedidoEnvioLoteRPS.Cabecalho.Versao}">
<CPFCNPJRemetente>
${pedidoEnvioLoteRPS.Cabecalho?.CPFCNPJRemetente?.CNPJ ? `<CNPJ>${pedidoEnvioLoteRPS.Cabecalho?.CPFCNPJRemetente?.CNPJ}</CNPJ>` : `<CPF>${pedidoEnvioLoteRPS.Cabecalho?.CPFCNPJRemetente?.CPF}</CPF>`}
</CPFCNPJRemetente>
<transacao>${pedidoEnvioLoteRPS.Cabecalho.transacao}</transacao>
<dtInicio>${pedidoEnvioLoteRPS.Cabecalho.dtInicio}</dtInicio>
<dtFim>${pedidoEnvioLoteRPS.Cabecalho.dtFim}</dtFim>
<QtdRPS>${pedidoEnvioLoteRPS.Cabecalho.QtdRPS}</QtdRPS>
<ValorTotalServicos>${pedidoEnvioLoteRPS.Cabecalho.ValorTotalServicos}</ValorTotalServicos>
<ValorTotalDeducoes>${pedidoEnvioLoteRPS.Cabecalho.ValorTotalDeducoes}</ValorTotalDeducoes>
</Cabecalho>
${pedidoEnvioLoteRPS.RPS.map((rps) => `<RPS xmlns="${rps.xmlns}">
<Assinatura>${rps.Assinatura}</Assinatura>
<ChaveRPS>
<InscricaoPrestador>${rps.ChaveRPS.InscricaoPrestador}</InscricaoPrestador>
<SerieRPS>${rps.ChaveRPS.SerieRPS}</SerieRPS>
<NumeroRPS>${rps.ChaveRPS.NumeroRPS}</NumeroRPS>
</ChaveRPS>
<TipoRPS>${rps.TipoRPS}</TipoRPS>
<DataEmissao>${rps.DataEmissao}</DataEmissao>
<StatusRPS>${rps.StatusRPS}</StatusRPS>
<TributacaoRPS>${rps.TributacaoRPS}</TributacaoRPS>
<ValorServicos>${rps.ValorServicos}</ValorServicos>
<ValorDeducoes>${rps.ValorDeducoes}</ValorDeducoes>
<CodigoServico>${rps.CodigoServico}</CodigoServico>
<AliquotaServicos>${rps.AliquotaServicos}</AliquotaServicos>
<ISSRetido>${rps.ISSRetido}</ISSRetido>
<CPFCNPJTomador>
${rps.TomadorRPS?.CPFCNPJTomador?.CNPJ ? `<CNPJ>${rps.TomadorRPS?.CPFCNPJTomador?.CNPJ}</CNPJ>` : `<CPF>${rps.TomadorRPS?.CPFCNPJTomador?.CPF}</CPF>`}
</CPFCNPJTomador>
<InscricaoMunicipalTomador>${rps.TomadorRPS.InscricaoMunicipalTomador}</InscricaoMunicipalTomador>
<RazaoSocialTomador>${rps.TomadorRPS.RazaoSocialTomador}</RazaoSocialTomador>
<EnderecoTomador>
<TipoLogradouro>${rps.TomadorRPS.EnderecoTomador.TipoLogradouro}</TipoLogradouro>
<Logradouro>${rps.TomadorRPS.EnderecoTomador.Logradouro}</Logradouro>
<NumeroEndereco>${rps.TomadorRPS.EnderecoTomador.NumeroEndereco}</NumeroEndereco>
<ComplementoEndereco>${rps.TomadorRPS.EnderecoTomador.ComplementoEndereco}</ComplementoEndereco>
<Bairro>${rps.TomadorRPS.EnderecoTomador.Bairro}</Bairro>
<Cidade>${rps.TomadorRPS.EnderecoTomador.Cidade}</Cidade>
<UF>${rps.TomadorRPS.EnderecoTomador.UF}</UF>
<CEP>${rps.TomadorRPS.EnderecoTomador.CEP}</CEP>
</EnderecoTomador>
<Discriminacao>${rps.Discriminacao}</Discriminacao>
</RPS>`).join("")}
</PedidoEnvioLoteRPS>`;

    const filePath = `${
      this.pathXMls
    }/PedidoEnvioLoteRPS_${pedidoEnvioLoteRPS.RPS.map(
      (rps) => rps.ChaveRPS.NumeroRPS
    ).join("_")}_${Date.now()}.xml`;
    fs.writeFileSync(filePath, xmlContent);
    return filePath;
  }
}
