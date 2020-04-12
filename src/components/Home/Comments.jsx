import React, { Component } from "react";
import { DataContext } from "../../context/DataContext";

class Comments extends Component {
  static contextType = DataContext;
  state = {
    isOk: true,
    down: 0,
    startingTime: [],
    endingTime: [],
    playingTimes: [],
    delayTimes: [],
  };
  onKeyUp = (e) => {

    if (e.which === 8) return e.preventDefault();
    if (e.target.value.length < 100) {
      const { startingTime, endingTime, playingTimes } = this.state;
      this.setState({ down: 0, endingTime: [...endingTime, Date.now()] });
      playingTimes.push(Date.now() - startingTime[startingTime.length - 1]);
      this.setState({ playingTimes });
      console.log(playingTimes);
    }
  };
  onKeyDown = (e) => {
    const { down, startingTime, endingTime, isOk, delayTimes } = this.state;
    if (e.which === 8) return e.preventDefault();
    if (down === 0) {
      if (isOk) {
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
      }
    } else e.preventDefault();
  };
  render() {
    const { onChange, onKeyDown, context, state, onKeyUp, refs } = this;
    return context.isLoading ? (
      ""
    ) : (
      <div className="comments">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            context.addNewComment(refs.comment.value,state.delayTimes,state.playingTimes);
            refs.comment.value = "";
          }}
        >
          <textarea
            name="comment"
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
            maxLength="100"
          ></textarea>
          <button>Comment</button>
        </form>
      </div>
    );
  }
}

export default Comments;
