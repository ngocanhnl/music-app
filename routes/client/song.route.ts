import {Router } from "express";
import * as controller from "../../controller/client/song.controller";
const router: Router = Router();

router.get("/:slugTopic",controller.list);

router.get("/detail/:slugSong",controller.detail);

router.patch("/like/:typeLike/:songId",controller.like);

router.patch("/favourite/:typeFavourite/:songId",controller.favourite);

router.patch("/listen/:songId",controller.listen);

export const songRouter: Router = router;