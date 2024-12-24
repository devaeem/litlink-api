export interface GetAllRequestDto {
 page: number;
 limit: number;
 populate?: string[] | undefined;
}

export interface PaginatedResponse<T> {
 rows: T[];
 page: number;
 limit: number;
 total: number;
 pageCount: number;
 hasNextPage: boolean;
 hasPreviousPage: boolean;
 previousPage: number;
 nextPage: number;
}

export interface GetAllResponseDto<T> {
  data: PaginatedResponse<T>;
}
