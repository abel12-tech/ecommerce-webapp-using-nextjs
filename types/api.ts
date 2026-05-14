export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  limit: number;
};