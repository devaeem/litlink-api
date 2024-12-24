export interface PaginationResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

