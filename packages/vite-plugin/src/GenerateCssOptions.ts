export interface GenerateCssFileConfig {
  fileName: string;
  source: string | Record<string, unknown>;
}

export type GenerateCssOptions =
  | GenerateCssFileConfig
  | GenerateCssFileConfig[];
