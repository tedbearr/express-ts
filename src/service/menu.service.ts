import * as repository from "../repository/menu.repository";
import build from "../helper/response.helper";
import { Request } from "express";
import moment from "moment";

const All = async () => {
  let response;
  try {
    let get = await repository.All();
    let menuList = [];
    let menuObj = {};

    for (let a of get) {
      if (a.path_url != "#" && a.menu_parent_id == 0) {
        menuObj = {
          title: a.name,
          icon: a.icon,
          path: a.path_url,
          key: a.id,
        };
        menuList.push(menuObj);
      } else {
        if (a.path_url == "#") {
          let menuChild = await repository.getChild(a.id);
          menuObj = {
            title: a.name,
            icon: a.icon,
            path: a.path_url,
            key: a.id,
            children: menuChild,
          };
          menuList.push(menuObj);
        }
      }
    }

    response = build.response("00", "success", menuList);
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, []);
  }

  return response;
};

const Find = async (req: Request) => {
  let response;
  try {
    let { id } = req.params;
    let data = await repository.Find(parseInt(id));
    response = build.response("00", "success", data);
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

const Insert = async (req: Request) => {
  let response;
  try {
    let { title, icon, path, menu_parent_id } = req.body;
    let code = await generateCode();

    let data = {
      code: code,
      name: title,
      icon: icon,
      path_url: path,
      menu_parent_id: menu_parent_id,
      status_id: 1,
    };

    await repository.Insert(data);
    response = build.response("00", "success", {});
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

const Update = async (req: Request) => {
  let response;
  try {
    let { id } = req.params;
    let { title, icon, path, menu_parent_id } = req.body;

    let data = {
      name: title,
      icon: icon,
      path: path,
      menu_parent_id: menu_parent_id,
      updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    await repository.Update(parseInt(id), data);
    response = build.response("00", "success", {});
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

const Delete = async (req: Request) => {
  let response;
  try {
    let { id } = req.params;
    let { deleted_at } = req.body;

    let data = {
      deleted_at: deleted_at,
    };

    await repository.Delete(parseInt(id), data);
    response = build.response("00", "success", {});
  } catch (error) {
    response = build.response("500", `${(error as Error).message}`, {});
  }

  return response;
};

const generateCode = async () => {
  let data = await repository.All();
  let count = data.length + 1;
  let code = "M" + count.toString().padStart(2, "0");

  return code;
};

export { All, Find, Insert, Update, Delete };
