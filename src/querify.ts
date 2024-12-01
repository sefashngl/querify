import insert from "./extensions/insert";
import select from "./extensions/select";
import update from "./extensions/update";

export const querify = {
  from: select,
  insert,
  update,
};
