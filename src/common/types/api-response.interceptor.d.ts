export interface APIResponse<T = any, M = Record<string, any>> {
  ok: boolean;
  data: T;
  meta?: M;
}
