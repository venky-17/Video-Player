
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const  progress = player.querySelector(".progress")
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector(".toggle")
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const replayBtn = document.querySelector('.replayBtn')
const fullScreenBtn = document.querySelector('.fullScreen')


function togglePlay(){
    if(video.paused){
        video.play()
    }else{
        video.pause();
    }
}
// function updateButton(){
//    const icon = this.paused ? '►' : '❚ ❚';
//    toggle.textContent = icon;
//    console.log(icon);
// }

function updateButton(){
    if(video.paused){
        toggle.textContent = '►'
    }
    else{
        toggle.textContent= '❚ ❚'
    }
}

function skip(){
  const skipStamp = this.dataset.skip;
 
  const skipvalue = video.currentTime += parseFloat(skipStamp)
console.log(skipvalue);
}

function handleRangeUpdate(){
  video[this.name] = this.value;

    
}
function handleProgress(){ 
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis =`${percent}%`
}

function updateProgressBar(e){
    const skipTime = (e.offsetX / progress.offsetWidth)* video.duration;
    video.currentTime = skipTime;


}

function replayVideo(){
    video.currentTime = 0;
}

function getFullScreen(){
    video.classList.add('fullscreen')
}
function exitFullScreen(){
    video.classList.remove('fullscreen')
}

video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)
video.addEventListener('click', updateButton)
toggle.addEventListener('click', updateButton)
video.addEventListener('timeupdate', handleProgress)
replayBtn.addEventListener('click', replayVideo)
fullScreenBtn.addEventListener('click', getFullScreen)
player.addEventListener('dblclick',getFullScreen)
player.addEventListener('dblclick', exitFullScreen)


skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate) )
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate) )

let mousedown = false;

progress.addEventListener('click', updateProgressBar)

progress.addEventListener('mousemove',(e) => mousedown && updateProgressBar(e) )
progress.addEventListener('mousedown',() => mousedown=true)

progress.addEventListener('mouseup',() => mousedown=false) 
