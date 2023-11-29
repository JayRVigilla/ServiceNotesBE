export interface RequestError extends Error{
  status: number;
  message: string;
  stack: string
}