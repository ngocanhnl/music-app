import { Request, Response, Router } from "express";
import Topic from "../../model/topic.model";



//[GET]/topics
export const topics = async(req:Request, res:Response)=>{
    const topics = await Topic.find({
        deleted: false
    });
    console.log(topics);
    res.render("client/pages/topics/index",{
        pageTitle: "CHu de bai hat"
    });
}

