export type ResponseDto<T> = {
  data: T;
  error: boolean;
  message?: string;
};
