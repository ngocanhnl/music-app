import { Express } from "express";
import { dashboardRouter } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicsRouter } from "./topics.route";
import { songsRouter } from "./songs.route";
import { uploadRouter } from "./upload.route";

const adminRoute = (app:Express):void => {
    const PATH_ADMIN = `/${systemConfig.prefix_admin}`
    app.use(`${PATH_ADMIN}/dashboard`,dashboardRouter);
    app.use(`${PATH_ADMIN}/topics`,topicsRouter);
    app.use(`${PATH_ADMIN}/songs`,songsRouter);
    app.use(`${PATH_ADMIN}/upload`,uploadRouter);

  

};
export default adminRoute;