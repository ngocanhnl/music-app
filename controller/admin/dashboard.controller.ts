import { Request, Response, Router } from "express";



//[GET]/admin/dashboard
export const dashboard = async(req:Request, res:Response)=>{
    res.render("admin/pages/dashboard/index");
}