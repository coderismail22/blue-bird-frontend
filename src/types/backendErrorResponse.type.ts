export type ErrorSource = {
  path: string;
  message: string;
};

export type BackendErrorResponse = {
  err: {
    statusCode: number;
  };
  errorSources?: ErrorSource[];
  message: string;
  stack?: string;
  success: boolean;
};
