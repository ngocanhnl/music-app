import { Request, Response, Router } from "express";
import Topic from "../../model/topic.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import FavouriteSong from "../../model/favourite-song.model";



//[GET]/songs/:slugTopic
export const list = async(req:Request, res:Response)=>{
    const slugTopic = req.params.slugTopic;
    const topic = await Topic.findOne({
        slug: slugTopic,
        deleted: false,
        status: "active"
    })
    const songs = await Song.find({
        topicId: topic.id,
        deleted:false,
        status: "active"
    }).select("avatar slug title singerId like")
    for(const song of songs){
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active"
        });
        song["infoSinger"] = infoSinger;
    }
    // console.log(songs);
    res.render("client/pages/songs/list",{
        pageTitle: "Danh sach bai hat",
        songs: songs
    });
}

//[GET]/songs/detail/:slugSong
export const detail = async(req:Request, res:Response)=>{
    const slug:String = req.params.slugSong;
    const song = await Song.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    })
    const singer = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
        status: "active"
    }).select("fullName");
    const topic = await Topic.findOne({
        _id: song.topicId,
        deleted: false,
        status: "active"
    }).select("title")
    const favouriteSong = await FavouriteSong.findOne({
        songId: song.id
    });
    song["isFavouriteSong"] = favouriteSong ? true:false
    // console.log(topic)
    res.render("client/pages/songs/detail",{
        pageTitle: "Danh sach bai hat",
        song: song,
        topic: topic,
        singer: singer
        
    });
}

//[PATCH]/songs/like/:typeLike/:songId
export const like = async(req:Request, res:Response)=>{
    const songId:String = req.params.songId;
    console.log(songId);
    const song = await Song.findOne({
        _id: songId,
        deleted: false,
        status: "active"
    });
    const typeLike = req.params.typeLike;
    const newLike = typeLike=="like"?song.like+1:song.like-1;
    await Song.updateOne({
        _id: songId
    },{
        like: newLike
    });
    res.json({
        code: 200,
        message: "Success",
        like: newLike
    })

}

//[PATCH]/songs/favourite/:typeFavourite/:songId
export const favourite = async(req:Request, res:Response)=>{
    const songId = req.params.songId;
    const typeFavourite = req.params.typeFavourite;
    console.log(songId);
    console.log(typeFavourite);
    switch (typeFavourite) {
        case "favourite":
            const exits = await FavouriteSong.findOne({
                songId: songId
            });
            console.log(exits);
            if(!exits){
                const record = new FavouriteSong({
                    songId: songId
                });
                await record.save();
            }
            break;
        case "unfavourite":
            await FavouriteSong.deleteOne({
                songId: songId
            })
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Success"
    })
}
//[PATCH]/songs/listen/:songId
export const listen = async(req:Request, res:Response)=>{
    const songId = req.params.songId;
    const song = await Song.findOne({
        _id: songId
    });
    const newListen = song.listen + 1;
    await Song.updateOne({
        _id: song.id
    },{
        listen: newListen
    });
    const newSong = await Song.findOne({
        _id: song.id
    });
    res.json({
        code: 200,
        message: "Success add listen",
        song: newSong
    })
}
