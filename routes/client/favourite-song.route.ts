import {Router } from "express";
import * as controller from "../../controller/client/favourite-song.controller";
const router: Router = Router();

router.get("/",controller.index);

export const favouriteSongRouter: Router = router;