import { Router } from "express";
import pingController from "../../controllers/ping/pingController.js";

const pingRouter = Router();

pingRouter.get("/", pingController);

export default pingRouter;
