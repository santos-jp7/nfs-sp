🇧🇷 nf-e-sp-sdk: SDK para Nota Fiscal Eletrônica Paulistana (PMSP)✨ Sobre a SDKA nf-e-sp-sdk é uma biblioteca moderna e robusta, desenvolvida em TypeScript, que abstrai toda a complexidade da comunicação com o Web Service da Prefeitura de São Paulo (PMSP) para a emissão e gestão de Notas Fiscais de Serviço Eletrônicas (NFS-e).Nosso principal objetivo é eliminar a dor de cabeça de lidar diretamente com a montagem de envelopes SOAP, assinaturas XMLDSig e certificados digitais (.PFX), permitindo que você se concentre apenas nas regras de negócio da sua aplicação.🚀 Recursos PrincipaisAssinatura Digital Integrada: Lida automaticamente com a leitura e aplicação da Assinatura Digital W3C (XMLDSig) usando certificados .PFX (A1).Abstração de SOAP/XML: Você trabalha com objetos JavaScript/TypeScript simples (Entidades), e a SDK cuida da serialização e desserialização para o formato XML exigido pela PMSP.Arquitetura Limpa (Clean Architecture): Estruturada em camadas (Core, Infra, Client), garantindo que as regras de negócio sejam isoladas, testáveis e independentes da tecnologia (XML/SOAP).Suporte Dual-Build: Geração de código otimizado tanto para CommonJS (CJS) quanto para Módulos ECMAScript (ESM).Tipagem Forte: Totalmente desenvolvida em TypeScript, garantindo segurança e autocompletar em todas as chamadas de serviço e entidades.💡 Como UsarInstalaçãonpm install nf-e-sp-sdk

# ou

yarn add nf-e-sp-sdk
Exemplo Rápido de EmissãoCom a SDK, a emissão de um RPS é reduzida a um fluxo simples de três passos:import { NfeClient, Rps } from 'nf-e-sp-sdk';

// 1. Configuração (Dados do Prestador e Credenciais)
const configData = {
ambiente: 'homologacao',
baseUrl: '[https://nfe.prefeitura.sp.gov.br/ws/nfse.asmx](https://nfe.prefeitura.sp.gov.br/ws/nfse.asmx)',
cnpjPrestador: '58942500000122',
inscricaoMunicipal: '9876543',
certificatePath: '/caminho/para/seu/certificado.pfx', // Path para o arquivo PFX
certificatePassword: 'sua-senha-segura',
};

// 2. Inicialização da Fachada (Cria e injeta as dependências internas)
const client = new NfeClient(configData);

// 3. Montagem da Entidade de Domínio (RPS)
const rpsPayload = new Rps({
// ... dados simplificados do Tomador e Serviço (sem XML!)
numeroRps: 1001,
serie: 'A',
servico: {
codigo: '01.07', // Exemplo: Suporte técnico em informática
descricao: 'Manutenção de software.',
valorServico: 1500.00,
aliquotaIss: 0.02,
valorIss: 30.00
},
tomador: {
identificacao: { CNPJ: '99887766000155' },
razaoSocial: 'Empresa Teste LTDA',
// ...
}
});

// 4. Execução do Caso de Uso (Emite o lote e retorna a Nota Fiscal)
try {
const notaFiscal = await client.emitirNfe(rpsPayload);

    console.log(`NF-e emitida com sucesso! Protocolo: ${notaFiscal.protocolo}`);
    console.log(`Número da NF-e: ${notaFiscal.numeroNfe}`);

} catch (error) {
console.error('Erro na emissão:', error);
}
🛠️ Estrutura do Projeto (Clean Architecture)A SDK foi desenvolvida seguindo o padrão Clean Architecture, o que garante a separação de responsabilidades:src/core: Contém as Entidades (Rps, NotaFiscal), as Interfaces/Contratos (ISigner, IServiceProvider) e os Casos de Uso (EmitirLoteRPSUseCase). Esta camada é o coração do negócio, agnóstica a XML.src/infra: Contém os Adaptadores (CertificateSigner, SpNfeService) que implementam as interfaces do Core e se conectam com o mundo externo (XML, SOAP, Certificados).src/client: A Fachada (NfeClient) que expõe métodos públicos para o usuário e coordena a Injeção de Dependência.🤝 ContribuiçãoContribuições são bem-vindas! Se você encontrou um bug ou tem sugestões para novos casos de uso (Consulta de Lote, Cancelamento, etc.), por favor, abra uma Issue ou um Pull Request.LicençaEste projeto está sob a licença MIT.
