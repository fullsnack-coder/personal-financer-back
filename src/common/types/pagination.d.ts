export type PaginatedResult<T> = {
  data: T;
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};
