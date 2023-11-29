import * as zod from "zod";

const insertValidation = zod.object({
  body: zod.object({
    code: zod.string({
      required_error: "code is required",
      invalid_type_error: "code must be string",
    }),
    name: zod.string({
      required_error: "name is required",
      invalid_type_error: "name must be string",
    }),
    description: zod.string({
      required_error: "description is required",
      invalid_type_error: "description must be string",
    }),
  }),
});

const updateValidation = zod.object({
  body: zod.object({
    code: zod.string({
      required_error: "code is required",
      invalid_type_error: "code must be string",
    }),
    name: zod.string({
      required_error: "name is required",
      invalid_type_error: "name must be string",
    }),
    description: zod.string({
      required_error: "description is required",
      invalid_type_error: "description must be string",
    }),
  }),
});

const deleteValidation = zod.object({
  body: zod.object({
    deleted_at: zod.date({
      required_error: "deleted_at is required",
      invalid_type_error: "deleted_at must be date",
    }),
  }),
});

export { insertValidation, updateValidation, deleteValidation };
