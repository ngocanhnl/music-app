import { Request, Response, Router } from "express";
import FavouriteSong from "../../model/favourite-song.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";




//[GET]/songs/favourite-songs
export const index = async(req:Request, res:Response)=>{
    const favouriteSongs = await FavouriteSong.find({
        deleted: false
    })
    for(const song of favouriteSongs){
        const infoSong = await Song.findOne({
            _id: song.songId,
            deleted: false
        });
        song["infoSong"] = infoSong;
        const infoSinger = await Singer.findOne({
            _id: infoSong.singerId,
            deleted: false
        });
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/favourite-songs/index.pug",{
        pageTitle: "Bài hát yêu thích",
        favoriteSongs: favouriteSongs
    })
}