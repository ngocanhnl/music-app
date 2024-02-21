import {Router } from "express";
import * as controller from "../../controller/client/research.controller";
const router: Router = Router();

router.get("/:type",controller.result);




export const researchRouter: Router = router;