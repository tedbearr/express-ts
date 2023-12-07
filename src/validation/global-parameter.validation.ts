import * as zod from "zod";

/**
 * @openapi
 * components:
 *    schemas:
 *      CreateGlobalParameter:
 *        type: object
 *        properties:
 *          code:
 *            type: string
 *            default: qwqwqwqww
 *    
 */
const insertValidation = zod.object({
  body: zod.object({
    code: zod.string({ required_error: "code is required" }),
  }),
});

const updateValidation = zod.object({
  params: zod.object({
    id: zod.number({ required_error: "params id is required" }),
  }),
});

export { insertValidation, updateValidation };
