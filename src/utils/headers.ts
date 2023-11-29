import { currentTime } from "./time";


const generateResponseHeaders = (data: any) => {
  const created_at = currentTime();

  return {
    created_at,
    data
  }
}

export {generateResponseHeaders}