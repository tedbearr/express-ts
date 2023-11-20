import * as repository from "../repository/global-parameter.respository";

const All = async () => {
  try {
    return await repository.All();
  } catch (error) {
    throw error;
  }
};

export { All };
