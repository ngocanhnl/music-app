import {Router } from "express";
import * as controller from "../../controller/admin/topics.controller";
const router: Router = Router();

router.get("/",controller.topics);

export const topicsRouter: Router = router;