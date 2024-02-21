import { Request, Response, Router } from "express";
import Topic from "../../model/topic.model";



//[GET]/admin/topics
export const topics = async(req:Request, res:Response)=>{
    const topics = await Topic.find({
        deleted: false
    })
    res.render("admin/pages/topics/index",{
        pageTitle: "Chu de",
        topics: topics
    });
}