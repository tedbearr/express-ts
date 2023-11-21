import * as zod from "zod";

const loginValidation = zod.object({
  body: zod.object({
    username: zod
      .string({
        required_error: "username is required",
        invalid_type_error: "username must be string",
      })
      .min(1),
    password: zod
      .string({
        required_error: "password is required",
        invalid_type_error: "password must be string",
      })
      .min(1),
  }),
});

export { loginValidation };
