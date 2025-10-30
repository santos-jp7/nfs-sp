// src/core/entities/Tipos.ts

/**
 * Representa a estrutura padrão CPF/CNPJ exigida pela PMSP.
 * Apenas um dos campos deve ser preenchido.
 */
export type CpfCnpj = { CPF?: string; CNPJ?: string };

/** Tipo referente aos possíveis tipos de RPS.
 * - "RPS": Recibo Provisório de Serviços.
 * - "RPS-M": Recibo Provisório de Serviços proveniente de Nota Fiscal Conjugada (Mista).
 * - "RPS-C": Cupom.
 * @default "RPS"
 */
export type TipoRPS = "RPS" | "RPS-M" | "RPS-C";

/** Tipo referente aos possíveis status de RPS.
 * - "N": Normal.
 * - "C": Cancelada.
 * - "E": Extraviada.
 * @default "N"
 */
export type StatusRPS = "N" | "C" | "E";

/** * Tipo referente aos modos de tributação da NFe.
 * - "T": Tributação no municipio de São Paulo.
 * - "F": Tributação fora do municipio de São Paulo.
 * - "I": Isento.
 * - "J": ISS Suspenso por Decisão Judicial.
 * @default "T"
 */
export type TipoTributacaoRPS = "T" | "F" | "I" | "J";
