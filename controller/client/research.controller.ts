
import { Request, Response, Router } from "express";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { convertToSlug } from "../../helpers/converToSlug.helper";


//[GET]/search/:type
export const result = async(req:Request, res:Response)=>{
    const type = req.params.type;
    const keyword:string = `${req.query.keyword}`;
    let newSongs = [];
    if(keyword){
        const keywordRegex = new RegExp(keyword,"i");
        //Tạo chuỗi slug để tìm kiếm
        const stringSlug:string = convertToSlug(keyword);
        const stringSlugRegex = new RegExp(stringSlug,"i");
        const songs = await Song.find({
            $or:[
                {title: keywordRegex},
                {slug: stringSlugRegex}
            ]
            
        });
        for(const song of songs){
            const infoSinger = await Singer.findOne({
                _id: song.singerId
            });
            // song["infoSinger"] = infoSinger;
            newSongs.push({
                id: song.id,
                title: song.title,
                avatar: song.avatar,
                like: song.like,
                slug: song.slug,
                infoSinger:{
                    fullName: infoSinger.fullName
                }
            })
        }
        // newSongs = songs;
    }


    switch (type) {
        case "result":
            res.render("client/pages/search/result",{
                pageTitle: "Search",
                keyword: keyword,
                songs: newSongs
            })
            break;
        case "suggest":
            res.json({
                code: 200,
                message: " Success",
                songs: newSongs
            })
            break;
        default:
            break;
    }


    
}

