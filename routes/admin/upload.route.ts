import {Router } from "express";
import * as controller from "../../controller/admin/upload.controller";
const router: Router = Router();
import multer from "multer"
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware"

const upload = multer();
router.post("/",upload.single("file"),
                uploadCloud.uploadSingle,
                controller.index);

export const uploadRouter: Router = router;