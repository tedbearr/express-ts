import { Knex, knex } from "knex";
import {
  updateInterface,
  allGlobalParameter,
} from "../dto/global-parameter.dto";

declare module "knex/types/tables" {
  interface Tables {
    global_parameter: allGlobalParameter;
    // global_parameter_composite: Knex.CompositeTableType<
    //   allGlobalParameter,
    //   Pick<allGlobalParameter, "code"> &
    //     Partial<Pick<allGlobalParameter, "created_at" | "updated_at">>,
    //   Partial<Omit<allGlobalParameter, "id">>
    // >;
  }
}
