import {Router } from "express";
import * as controller from "../../controller/admin/songs.controller";
import multer from "multer"
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware"
const router: Router = Router();

const upload = multer();

router.get("/",controller.songs);
router.get("/create",controller.create);
router.post("/create",upload.fields([
                            {name:"avatar",maxCount:1},
                            {name:"audio",maxCount:1}
                      ]),
                      uploadCloud.uploadFields,
                      controller.createPost);
router.get("/edit/:songId",controller.edit);
router.patch("/edit/:songId",upload.fields([
                            {name:"avatar",maxCount:1},
                            {name:"audio",maxCount:1}
                      ]),
                      uploadCloud.uploadFields,
                      controller.editPatch);

export const songsRouter: Router = router;