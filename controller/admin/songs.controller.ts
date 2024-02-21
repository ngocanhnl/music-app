import { Request, Response, Router } from "express";
import Topic from "../../model/topic.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/config";



//[GET]/admin/songs
export const songs = async(req:Request, res:Response)=>{
    const songs = await Song.find({
        deleted: false
    });
    res.render("admin/pages/songs/index",{
        pageTitle: "Bai hat",
        songs: songs
    });
}

//[GET]/admin/songs/create
export const create = async(req:Request, res:Response)=>{
    const topics = await Topic.find({
        deleted: false
    })
    const singers = await Singer.find({
        deleted: false
    })
    res.render("admin/pages/songs/create",{
        pageTitle: "Tao moi bai hat",
        topics: topics,
        singers: singers
    });
}

//[POST]/admin/songs/create
export const createPost = async(req:Request, res:Response)=>{
    let avatar = "";
    if(req.body.avatar){
        avatar = req.body.avatar[0]
    }
    let audio = "";
    if(req.body.audio){
        audio = req.body.audio[0]
    }
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        avatar: avatar ,
        audio: audio,
        status: req.body.status,
        lyrics: req.body.lyrics
    };
    const song = new Song(dataSong);
    await song.save();
    console.log(req.body);
    // res.redirect(`${systemConfig.prefix_admin}/songs`)
    res.redirect(`/${systemConfig.prefix_admin}/songs`)
}

//[GET]/admin/songs/edit/:songId
export const edit = async(req:Request, res:Response)=>{
    const songId = req.params.songId;
    const song = await Song.findOne({
        _id: songId,
        deleted: false
    });
    const singers = await Singer.find({
        deleted: false
    });
    const topics = await Topic.find({
        deleted: false
    })

    res.render("admin/pages/songs/edit",{
        pageTitle: "Tao moi bai hat",
        topics: topics,
        singers: singers,
        song: song
    });


}

//[PATCH]/admin/songs/edit/:songId
export const editPatch = async(req:Request, res:Response)=>{
    const id = req.params.songId;
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics
    };
    
    if(req.body.avatar){
        dataSong['avatar'] = req.body.avatar[0]
    }
    if(req.body.audio){
        dataSong['audio'] = req.body.audio[0]
    }
    await Song.updateOne({
        _id: id
    },dataSong)
    // console.log(req.body);
    // res.redirect(`${systemConfig.prefix_admin}/songs`)
    res.redirect(`back`)
}