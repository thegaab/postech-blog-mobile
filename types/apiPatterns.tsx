export interface SuccessResponse<T> {
  status: number;
  data: T;
}

export interface FailedResponse {
  error: number;
  message: string;
}

export interface InterfaceList<T> {
  data: T[];
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}
