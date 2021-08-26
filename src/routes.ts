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
routes.post(
  "/comedouros",
  upload.single("image"),
  CollectPointsController.create
);

routes.post("/sessions", AuthenticatedUserController.execute);

routes.get("/dashboard", UserAdminController.show);
routes.delete("/dashboard/:id", UserAdminController.deleteFeeder);

routes.get("/dashboard/pendentes", UserAdminController.showPending);
routes.patch("/dashboard/pendentes/:id", UserAdminController.validateFeeder);
routes.delete("/dashboard/pendentes/:id", UserAdminController.deleteFeeder);

export default routes;
