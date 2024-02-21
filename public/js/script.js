//AP player
const aplayer = document.querySelector("#aplayer");
if(aplayer){
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);
    const ap = new APlayer({
        container: aplayer,
        lrcType: 1,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar,
            lrc: dataSong.lyrics
        }],
        autoplay: true,
        volume: 0.9
    });
    const avatar = document.querySelector(".inner-avatar");

    ap.on('play', function () {
        avatar.style.animationPlayState = "running";
    });
    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused";
    });
    // Lượt nghe
    ap.on('ended', function () {
        const link = `/songs/listen/${dataSong._id}`;
        const option ={
            method: "PATCH"
        }
        fetch(link,option)
            .then(res=>res.json())
            .then(data=>{
                const boxListen = document.querySelector(".inner-listen");
                if(boxListen){
                    console.log(data)
                    const span = boxListen.querySelector("span");
                    span.innerHTML = `${data.song.listen} lượt nghe`
                }
                
            })
    });
    // End Lượt nghe
}
// End AP player
//Thích
const likeButton = document.querySelector("[button-like]");

if(likeButton){
    likeButton.addEventListener("click",()=>{
        const songId = likeButton.getAttribute("button-like");
        const isActive = likeButton.classList.contains("active");
        const typeLike = isActive ? "dislike":"like";
        console.log(songId)
        const link = `/songs/like/${typeLike}/${songId}`;
        const option ={
            method: "PATCH"
        }
        fetch(link,option)
            .then(res=>res.json())
            .then(data=>{
                if(data.code==200){
                    const span = likeButton.querySelector("span");
                    span.innerHTML = `${data.like} thích`;
                    likeButton.classList.toggle("active");
                }
                
            })
    })
}
// End thích

//Favourite
const listFavouriteButton = document.querySelectorAll("[button-favourite]");
if(listFavouriteButton.length > 0){
    listFavouriteButton.forEach(favouriteButton=>{
        favouriteButton.addEventListener("click",()=>{
            const songId = favouriteButton.getAttribute("button-favourite");
            const isActive = favouriteButton.classList.contains("active");
            const typeLike = isActive ? "unfavourite":"favourite";
            console.log(songId)
            const link = `/songs/favourite/${typeLike}/${songId}`;
            const option ={
                method: "PATCH"
            }
            fetch(link,option)
                .then(res=>res.json())
                .then(data=>{
                    if(data.code==200){
                        favouriteButton.classList.toggle("active");
                    }
                    
                })
        })
    })
    
}
//End Favourite

//Suggest sesrch
const boxSearch = document.querySelector(".box-search");
console.log(boxSearch)
if(boxSearch){
    const boxSuggest = boxSearch.querySelector(".inner-suggest");
    const input = boxSearch.querySelector("input[name='keyword']");
    console.log(input)
    input.addEventListener("keyup", () => {
        const keyword = input.value;
        const link = `/search/suggest?keyword=${keyword}`;
        fetch(link)
            .then(res=>res.json())
            .then(data=>{
                if(data.songs.length > 0){
                    boxSuggest.classList.add("show");
                    const htmls = data.songs.map(song=>{
                        return `
                        <a class="inner-item" href="/songs/detail/${song.slug}">
                            <div class="inner-image"><img src="${song.avatar}" /></div>
                            <div class="inner-info">
                                <div class="inner-title">${song.title}</div>
                                <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}</div>
                            </div>
                        </a>
                    `
                    });
                    const listBox = boxSuggest.querySelector(".inner-list");
                    listBox.innerHTML = htmls.join("");
                    
                }
                else{
                    boxSuggest.classList.remove("show");
                }
                
                    
            })
    })
}
//End Suggest sesrch
