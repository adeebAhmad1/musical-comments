import React, { Component } from "react";
import { DataContext } from "../../context/DataContext";
import Loader from "../utils/Loader";

class Content extends Component {
  static contextType = DataContext;
  state = {
    soundPlaying: false
  };
  showComments = () => {
    const {context,listen,state} = this
    return context.comments.map((el, i) => {
      const { title , delayTimes , playingTimes} = el;
      return (
        <div key={i}>
          <span> {title} </span>
          {state.soundPlaying 
          ? ""
          :<button onClick={(e)=>listen(title.split(""),delayTimes,playingTimes)}>Listen</button>}
        </div>
      );
    });
  };
  listen = (letters,delayTimes,playingTimes) => {
    if (!this.state.soundPlaying) {
      this.setState({ soundPlaying: true });
      const sounds = letters.map((el) => {
        const alphabet = this.context.sounds.find((sound) => {
          if (el === "/") el = "aa";
          if (el === " ") el = "bb";
          if (el === "\\") el = "cc";
          if (el === ">") el = "dd";
          if (el === "<") el = "ee";
          if (el === "?") el = "ff";
          if (el === '"') el = "hh";
          if (el === "|") el = "ii";
          if (el === ":") el = "jj";
          if (el === "*") el = "kk";
          return sound.alphabet.toLowerCase() === el.toLowerCase();
        });
        return alphabet.alphabet;
      });
      this.playing(sounds,playingTimes,0,delayTimes)
      // sounds.forEach((el, i) => {
      //     setTimeout(() => {
      //       let soundSelected = Array.from(document.querySelectorAll(`audio[data-text="${el.alphabet.toLowerCase()}"]`));
      //       ["ended","paused"].forEach(event=>soundSelected.forEach(el=>el.addEventListener(event,()=>this.stopPlaying(el))))
      //       soundSelected = soundSelected.filter((el) => el.dataset.isplaying === "false");
      //       soundSelected[0].dataset.isplaying = "true";
      //       if (soundSelected.length > 0) {
      //         soundSelected[0].play();
      //         setTimeout(()=>soundSelected[0].pause(),playingTimes[i]+(playingTimes[i-1] || 0));
      //         console.log((delayTimes[i] || 0)+(playingTimes[i-1] || 0))
      //         if (sounds.length - 1 === i) this.setState({ soundPlaying: false })
      //       }
      //     }, (delayTimes[i] || 0));
      // });
    }
  };
  playing = (words,playingTimes,i,delayTimes)=>{
    // playingTimes.splice(0,i+1);
    // delayTimes.splice(0,i+1);
    const playingSum = playingTimes.slice(0,i+1).reduce((a,b)=> a+b)
    const delaySum = delayTimes.slice(0,i+1).reduce((a,b)=> a+b)
    let soundSelected = Array.from(document.querySelectorAll(`audio[data-text="${words[i].toLowerCase()}"]`));
    ["ended","pause"].forEach(event=>soundSelected.forEach(el=>el.addEventListener(event,()=>this.stopPlaying(el))))
    soundSelected = soundSelected.filter((el) => el.dataset.isplaying === "false");
    soundSelected[0].play();
    soundSelected[0].dataset.isplaying = "true";
    
    console.log(soundSelected.map((el) => el.dataset.isplaying))
    setTimeout(() =>{
      soundSelected[0].dataset.isplaying = "false";
      soundSelected[0].pause();
      if(words.length -1 > i) {
        setTimeout(() => {
          this.playing(words,playingTimes,i+1,delayTimes);
        },delaySum);
      }else if (words.length - 1 === i) this.setState({ soundPlaying: false })
    }, playingSum);
    soundSelected[0].onpause = ()=>{
      // alert('msg');
    }
  }
  stopPlaying = (el)=>{
    el.dataset.isplaying = "false";
    console.log("aabbcc")
  }
  render() {
    return this.context.isLoading ? (
      <Loader />
    ) : (
      <div style={{ width: `70%`, margin: `10px auto` }}>
        {this.showComments()}
      </div>
    );
  }
}

export default Content;



/*


soundSelected[0].play();
setTimeout(()=>soundSelected[0].pause(),playingTimes[i])

*/