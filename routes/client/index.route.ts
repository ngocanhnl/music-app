import { Express } from "express";
import { topicRouter } from "./topic.route";
import { songRouter } from "./song.route";
import { favouriteSongRouter } from "./favourite-song.route";
import { researchRouter } from "./research.route";
const clientRoute = (app:Express):void => {

  app.use("/topics",topicRouter);

  app.use("/songs",songRouter);

  app.use("/favourite-songs",favouriteSongRouter);

  app.use("/search",researchRouter);

};
export default clientRoute;