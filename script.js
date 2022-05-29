const TrackContainer=document.querySelector(".TrackContainer");
const audio=document.querySelector(".audio");
const TimeContainer=document.querySelector(".TimeContainer")
const start=document.querySelector(".start")
const stop=document.querySelector(".stop")
const previous=document.querySelector(".previous")
const next=document.querySelector(".next")

const Tracks=[
    {MusicTrack:"music/Track1.mp3" , Title:"Lay Phyu --- Pyan Kya Soe A Chit Lay"},
    {MusicTrack:"music/Track2.mp3" , Title:"Myo Gyi --- Tha Sein Ta Yout Par"},
    {MusicTrack:"music/Track3.mp3" , Title:"Myo Gyi --- Ka Di Par Lan Kwal"}
]
let PlayingIndex=false;
let PlayingMusicIndex=0;

for(let i=0;i<Tracks.length;i++){
    const ContainerTrack=document.createElement("div")
    ContainerTrack.classList.add("DIVV");
    ContainerTrack.append((i+1)+". "+Tracks[i].Title)
    TrackContainer.append(ContainerTrack)
    ContainerTrack.addEventListener("click",() => {
        const KeepTrack=Tracks[i].MusicTrack;
        audio.src=KeepTrack;
        audio.play()
        PlayingIndex=true;
        PlayingMusicIndex=i;
        ChangingButton()
    })
}
let musicduration="00:00"
audio.addEventListener("loadeddata",() => {
    const duration=Math.floor(audio.duration);
    musicduration=Calculation(duration)
})

audio.addEventListener("timeupdate",() => {
    const currentTime=Math.floor(audio.currentTime);
    let musiccurrent=Calculation(currentTime);
    TimeContainer.textContent=musiccurrent+"/"+musicduration
})

const Calculation=(Total) => {
    const Min=Math.floor(Total/60)
    const Sec=Total%60
    const Minute=Min>10? Min: "0"+Min;
    const Second=Sec>10? Sec: "0"+Sec;
    return Minute+":"+Second;
}

start.addEventListener("click",() => {
    const durationmusic=Math.floor(audio.currentTime);
    PlayingIndex=true
    if(durationmusic===0){
        const startMusic=Tracks[0].MusicTrack;
        audio.src=startMusic;
        audio.play();
        ChangingButton()
    }
    else{
        audio.play();
        ChangingButton()
    }
})

const ChangingButton=() => {
    if(PlayingIndex){
        start.style.display="none"
        stop.style.display="inline"
    }else{
        start.style.display="inline"
        stop.style.display="none"
    }
}

stop.addEventListener("click",() => {
    audio.pause();
    PlayingIndex=false;
    ChangingButton()
})

previous.addEventListener("click",() => {
    if(PlayingMusicIndex===0){
        return;
    }
    PlayingMusicIndex-=1
    const PreviousMusic=Tracks[PlayingMusicIndex].MusicTrack;
    audio.src=PreviousMusic;
    audio.play()
})

next.addEventListener("click",() => {
    if(PlayingMusicIndex===Tracks.length-1){
        return
    }
    PlayingMusicIndex+=1
    const NextMusic=Tracks[PlayingMusicIndex].MusicTrack;
    audio.src=NextMusic;
    audio.play()
})