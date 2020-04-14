import React, { Component } from "react";
import { DataContext } from "../../context/DataContext";
import Loader from "../utils/Loader";

class Content extends Component {
  static contextType = DataContext;
  state = {
    soundPlaying: false,
    popNum: 0
  };
  showComments = () => {
    const { context, listen, state } = this;
    return context.comments.map((el, i) => {
      const { title, delayTimes, playingTimes, name } = el;
      return (
        <div key={i} style={{border: `2px solid #999`,padding: `10px`,margin: `10px`}}>
          <span> {title} </span>
          {state.soundPlaying 
          ? ("") 
          : (<button onClick={(e) => listen(title.split(""), delayTimes, playingTimes)}>
              Listen
            </button>)
          }
          <p>posted by {name} </p>
        </div>
      );
    });
  };
  listen = (letters, delayTimes, playingTimes) => {
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
      delayTimes[0] = 0;
      sounds.forEach((el, i) => {
        const playingSum = playingTimes[i-1] ? playingTimes.slice(0, i).reduce((a, b) => a + b) : 0
        const delaySum = delayTimes[i-1] ? delayTimes.slice(0, i).reduce((a, b) => a + b) : 0;
        setTimeout(() => {
          let soundSelected = Array.from(document.querySelectorAll(`audio[data-text="${el.toLowerCase()}"]`));
          soundSelected.forEach((el) => ["ended", "pause"].forEach((event) =>el.addEventListener(event, () =>el.dataset.isplaying = "false")));
          soundSelected = soundSelected.filter(el => el.dataset.isplaying === "false");
          soundSelected[0].dataset.isplaying = "true";
          if (soundSelected.length > 0) {
            soundSelected[0].play();
            soundSelected[0].onended = ()=> sounds.length - 1 === i ? this.setState({ soundPlaying: false }) : ""
          }
          console.log(delaySum+playingSum)
        }, (delaySum+playingSum));
      });
    }
  };
  
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
