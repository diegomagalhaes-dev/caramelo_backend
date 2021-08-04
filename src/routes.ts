import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import CollectPointsController from "./controllers/CollectPointsController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/comedouros", CollectPointsController.index);
routes.get("/comedouros/:id", CollectPointsController.show);
routes.post("/comedouros", upload.single('image'), CollectPointsController.create);

export default routes;
