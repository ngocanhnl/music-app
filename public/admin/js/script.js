//Upload IMAGE
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
   
    uploadImageInput.addEventListener("change",(e)=>{
        if (e.target.files.length) {
            const image = URL.createObjectURL(e.target.files[0]);
            
            uploadImagePreview.src = image;
          }
    })
}

// END Upload IMAGE
//Upload AUDIO
const uploadAudio = document.querySelector("[upload-audio]")
console.log(uploadAudio)
if(uploadAudio){
    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
    const uploadAudioPreview = uploadAudio.querySelector("[upload-audio-play]");
   
    uploadAudioInput.addEventListener("change",(e)=>{
        if (e.target.files.length) {
            const audio = URL.createObjectURL(e.target.files[0]);
            
            uploadAudioPreview.src = audio;
            uploadAudioPreview.play();
          }
    })
}

// END Upload AUDIO