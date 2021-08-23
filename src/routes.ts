import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import CollectPointsController from "./controllers/CollectPointsController";
import UserAdminController from "./controllers/UserAdminController";
import CreateUserController from "./controllers/CreateUserController";
import AuthenticatedUserController from "./controllers/AuthenticatedUserController";
import ensureAuthenticated from "./middlewares/ensureAuthenticated";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/comedouros", CollectPointsController.index);
routes.get("/comedouros/:id", CollectPointsController.show);
routes.patch(
  "/comedouros",
  ensureAuthenticated,
  UserAdminController.validateFeeder
);
routes.delete("/comedouros", UserAdminController.deleteFeeder);
routes.post("/sessions", AuthenticatedUserController.execute);

routes.post(
  "/comedouros",
  upload.single("image"),
  CollectPointsController.create
);

export default routes;
