import React, { Component } from "react";
import { DataContext } from "../../context/DataContext";

class Comments extends Component {
  static contextType = DataContext;
  state = {
    down: 0,
    startingTime: [],
    endingTime: [],
    playingTimes: [],
    delayTimes: [],
    isOk: true
  };
  onKeyUp = (e) => {
    if (e.which === 8) return e.preventDefault();
    const { startingTime, endingTime, playingTimes, isOk } = this.state;
    if(isOk){
      if (e.target.value.length < 100) {
        this.setState({ down: 0, endingTime: [...endingTime, Date.now()] });
        playingTimes.push(Date.now() - startingTime[startingTime.length - 1]);
        this.setState({ playingTimes });
      }
    }
  };
  onKeyDown = (e) => {
    const { down, startingTime, endingTime, delayTimes,isOk } = this.state;
    if (e.which === 8) return e.preventDefault();
    if(isOk){
      if (down === 0) {
        this.setState({ startingTime: [...startingTime, Date.now()], down: 1 });
        delayTimes.push(Date.now() - endingTime[endingTime.length - 1]);
        this.setState({ delayTimes });
        if (e.target.value.length < 100) {
          if (e.key) {
            let { key } = e;
            if (key === "/") key = "aa";
            if (key === " ") key = "bb";
            if (key === "\\") key = "cc";
            if (key === ">") key = "dd";
            if (key === "<") key = "ee";
            if (key === "?") key = "ff";
            if (key === '"') key = "hh";
            if (key === "|") key = "ii";
            if (key === ":") key = "jj";
            if (key === "*") key = "kk";
            let soundSelected = Array.from(
              document.querySelectorAll(
                `audio[data-text="${key.toLowerCase()}"]`
              )
            );
            soundSelected = soundSelected.filter(
              (el) => el.dataset.isplaying === "false"
            );
            if (soundSelected.length > 0) {
              soundSelected.forEach(
                (el) => (el.onended = () => (el.dataset.isplaying = false))
              );
              soundSelected[0].play();
              soundSelected[0].dataset.isplaying = true;
            }
          }
      }
    } else e.preventDefault();
    }
  };
  onReset = ()=>{
    this.refs.comment.value = "";
    clearTimeout(window.timeOut)
    this.setState({startingTime: [], delayTimes: [],endingTime: [],playingTimes: [],isOk: true})
  }
  onFocus = ()=>window.timeOut = setTimeout(() => this.setState({isOk: false}), 40000);
  render() {
    const { onChange, onKeyDown, context, state, onKeyUp, refs,onFocus,onReset } = this;
    return context.isLoading ? (
      ""
    ) : (
      <div className="comments">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            context.addNewComment(refs.comment.value,state.delayTimes,state.playingTimes);
            this.setState({startingTime: [], delayTimes: [],endingTime: [],playingTimes: [],isOk: true})
            refs.comment.value = "";
          }}
        >
          <textarea
            name="comment"
            onFocus={onFocus}
            value={state.comment}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            ref="comment"
            onSelect={(e) => e.target.selectionStart = e.target.selectionEnd}
            required
            cols="70"
            rows="5"
            placeholder="Write a comment.."
            maxLength={this.state.isOk ? "100" : this.refs.comment.value.length}
          ></textarea>
          <button>Comment</button>
        </form>
          <button onClick={onReset}>Restart</button>
      </div>
    );
  }
}

export default Comments;
