import { Express } from "express";
import { topicRouter } from "./topic.route";
const clientRoute = (app:Express):void => {

  app.use("/topics",topicRouter);

};
export default clientRoute;