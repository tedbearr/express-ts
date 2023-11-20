interface Response {
  code: string;
  message: string;
  data: any;
}

const response = (code: string, message: string, data: any): Response => {
  return {
    code: code,
    message: message,
    data: data,
  } as Response;
};

export = { response };
