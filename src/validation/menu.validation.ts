import * as zod from "zod";

const insertValidation = zod.object({
  body: zod.object({
    title: zod.string({
      required_error: "title is required",
      invalid_type_error: "title must be string",
    }),
    menu_parent_id: zod.number({
      required_error: "menu_parent_id is required",
      invalid_type_error: "menu_parent_id must be string",
    }),
    path: zod.string({
      required_error: "path is required",
      invalid_type_error: "path must be string",
    }),
  }),
});

const updateValidation = zod.object({
  body: zod.object({
    title: zod.string({
      required_error: "title is required",
      invalid_type_error: "title must be string",
    }),
    menu_parent_id: zod.number({
      required_error: "menu_parent_id is required",
      invalid_type_error: "menu_parent_id must be string",
    }),
    path: zod.string({
      required_error: "path is required",
      invalid_type_error: "path must be string",
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
