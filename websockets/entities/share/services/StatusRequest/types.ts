export interface StatusI {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  requestId: string;
}

export interface StatusActionI {
  status: boolean;
  requestId: string;
}
