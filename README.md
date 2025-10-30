# nfs-sp

![NPM](https://img.shields.io/npm/v/nfs-sp)
![license](https://img.shields.io/npm/l/nfs-sp)
![Build](https://img.shields.io/github/actions/workflow/status/your-github-username/nfs-sp/main.yml)

> **⚠️ Atenção:** Este projeto está em fase inicial de desenvolvimento e testes. Use com cautela em produção.

SDK para Nota Fiscal Eletrônica Paulistana (PMSP).

✨ Sobre a SDK
A nfs-sp é uma biblioteca moderna e robusta, desenvolvida em TypeScript, que abstrai toda a complexidade da comunicação com o Web Service da Prefeitura de São Paulo (PMSP) para a emissão e gestão de Notas Fiscais de Serviço Eletrônicas (NFS-e).

Nosso principal objetivo é eliminar a dor de cabeça de lidar diretamente com a montagem de envelopes SOAP, assinaturas XMLDSig e certificados digitais (.PFX), permitindo que você se concentre apenas nas regras de negócio da sua aplicação.

🚀 Recursos Principais
Assinatura Digital Integrada: Lida automaticamente com a leitura e aplicação da Assinatura Digital W3C (XMLDSig) usando certificados .PFX (A1).
Abstração de SOAP/XML: Você trabalha com objetos JavaScript/TypeScript simples (Entidades), e a SDK cuida da serialização e desserialização para o formato XML exigido pela PMSP.
Arquitetura Limpa (Clean Architecture): Estruturada em camadas (Core, Infra, Client), garantindo que as regras de negócio sejam isoladas, testáveis e independentes da tecnologia (XML/SOAP).
Suporte Dual-Build: Geração de código otimizado tanto para CommonJS (CJS) quanto para Módulos ECMAScript (ESM).
Tipagem Forte: Totalmente desenvolvida em TypeScript, garantindo segurança e autocompletar em todas as chamadas de serviço e entidades.

💡 Como Usar
Instalação

```bash
npm install nfs-sp
```

ou

```bash
yarn add nfs-sp
```

### Exemplos de Emissão

**Exemplo em TypeScript (ESM - `test.ts`)**

```typescript
import nfsSp, { RPS, ChaveRPS, EnderecoTomador, TomadorRPS } from "nfs-sp";

const client = new nfsSp({
  cnpjPrestador: { CNPJ: "12345678000199" },
  inscricaoPrestador: "12345678",
  codigoServicoPadrao: "02668",
  certificatePath: "./certificado.pfx",
  certificatePassword: "SENHA_DO_CERTIFICADO",
  debug: true, // (opcional) ativa logs de depuração
});

async function emitirLoteRPS() {
  const rps1 = new RPS({
    ChaveRPS: new ChaveRPS({
      SerieRPS: "11",
      NumeroRPS: "11", // Deve ser único para cada RPS emitido
    }),
    ValorServicos: 0.01,

    TomadorRPS: new TomadorRPS({
      CPFCNPJTomador: {
        CNPJ: "12345678000199",
      },
      RazaoSocialTomador: "Empresa de Teste LTDA",
      EnderecoTomador: new EnderecoTomador({
        Logradouro: "Avenida Teste",
        NumeroEndereco: "10",
        Bairro: "Centro",
        Cidade: "3550308", // Código IBGE de São Paulo
        UF: "SP",
        CEP: "01001000",
        TipoLogradouro: "AV",
      }),
    }),
    Discriminacao: "Emissao de RPS de teste via NFS-SP",
  });

  const data = await client.emitirLoteRPS(rps1);

  console.log(
    "Nota emitida com sucesso:",
    `https://nfe.prefeitura.sp.gov.br/contribuinte/notaprint.aspx?inscricao=${data.ChaveNFeRPS?.ChaveRPS.InscricaoPrestador}&nf=${data.ChaveNFeRPS?.ChaveNFe.NumeroNFe}&verificacao=${data.ChaveNFeRPS?.ChaveNFe.CodigoVerificacao}`
  );
}

emitirLoteRPS().catch((error) => {
  console.error("Erro ao emitir lote RPS:", error);
});
```

**Exemplo em JavaScript (CJS - `test.js`)**

```javascript
const {
  default: nfsSp,
  ChaveRPS,
  EnderecoTomador,
  RPS,
  TomadorRPS,
} = require("nfs-sp");

const client = new nfsSp({
  cnpjPrestador: { CNPJ: "12345678000199" },
  inscricaoPrestador: "12345678",
  codigoServicoPadrao: "02668",
  certificatePath: "./certificado.pfx",
  certificatePassword: "SENHA_DO_CERTIFICADO",
  debug: true, // (opcional) ativa logs de depuração
});

async function emitirLoteRPS() {
  const rps1 = new RPS({
    ChaveRPS: new ChaveRPS({
      SerieRPS: "11",
      NumeroRPS: "11", // Deve ser único para cada RPS emitido
    }),
    ValorServicos: 0.01,

    TomadorRPS: new TomadorRPS({
      CPFCNPJTomador: {
        CNPJ: "12345678000199",
      },
      RazaoSocialTomador: "Empresa de Teste LTDA",
      EnderecoTomador: new EnderecoTomador({
        Logradouro: "Avenida Teste",
        NumeroEndereco: "10",
        Bairro: "Centro",
        Cidade: "3550308", // Código IBGE de São Paulo
        UF: "SP",
        CEP: "01001000",
        TipoLogradouro: "AV",
      }),
    }),
    Discriminacao: "Emissao de RPS de teste via NFS-SP",
  });

  const data = await client.emitirLoteRPS(rps1);

  console.log(
    "Nota emitida com sucesso:",
    `https://nfe.prefeitura.sp.gov.br/contribuinte/notaprint.aspx?inscricao=${data.ChaveNFeRPS?.ChaveRPS.InscricaoPrestador}&nf=${data.ChaveNFeRPS?.ChaveNFe.NumeroNFe}&verificacao=${data.ChaveNFeRPS?.ChaveNFe.CodigoVerificacao}`
  );
}

emitirLoteRPS().catch((error) => {
  console.error("Erro ao emitir lote RPS:", error);
});
```

### Executando os Exemplos

Para executar os exemplos fornecidos, você pode usar `ts-node` para o arquivo TypeScript ou `node` para o arquivo JavaScript.

**Para o exemplo em TypeScript (`test.ts`):**

1. Certifique-se de ter o `ts-node` instalado:

   ```bash
   npm install -g ts-node
   ```

2. Execute o arquivo:
   ```bash
   ts-node test.ts
   ```

**Para o exemplo em JavaScript (`test.js`):**

```bash
node test.js
```

Lembre-se de substituir os dados de exemplo (CNPJ, Inscrição Municipal, caminho do certificado e senha) pelos seus dados reais nos arquivos `test.ts` ou `test.js` antes de executar.

🛠️ Estrutura do Projeto (Clean Architecture)
A SDK foi desenvolvida seguindo o padrão Clean Architecture, o que garante a separação de responsabilidades:

- **src/core:** Contém as Entidades (Rps, NotaFiscal), as Interfaces/Contratos (ISigner, IServiceProvider) e os Casos de Uso (EmitirLoteRPSUseCase). Esta camada é o coração do negócio, agnóstica a XML.
- **src/infra:** Contém os Adaptadores (CertificateSigner, SpNfeService) que implementam as interfaces do Core e se conectam com o mundo externo (XML, SOAP, Certificados).
- **src/client:** A Fachada (NfeClient) que expõe métodos públicos para o usuário e coordena a Injeção de Dependência.

🤝 Contribuição
Contribuições são bem-vindas! Se você encontrou um bug ou tem sugestões para novos casos de uso (Consulta de Lote, Cancelamento, etc.), por favor, abra uma Issue ou um Pull Request.

Licença
Este projeto está sob a licença MIT.
