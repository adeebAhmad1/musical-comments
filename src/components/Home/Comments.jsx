import React, { Component } from "react";
import { DataContext } from "../../context/DataContext";

class Comments extends Component {
  static contextType = DataContext;
  state = {
    comment: "",
    previousKey: null
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onKeyDown = (e) => {
    if (e.key) {
      let { key }= e;
      if(key === "/") key = "aa";
      if(key === " ") key = "bb";
      if(key === "\\") key= "cc";
      if(key === ">" )  key = "dd";
      if(key === "<" )  key = "ee";
      if(key === "?" )  key = "ff";
      if(key === "\"" )  key = "hh";
      if(key === "|" )  key = "ii";
      if(key === ":" )  key = "jj";
      if(key === "*" )  key = "kk";
      let soundSelected = Array.from(document.querySelectorAll(`audio[data-text="${key.toLowerCase()}"]`));
      soundSelected = soundSelected.filter(el=> el.dataset.isplaying === "false" );
      if(soundSelected.length > 0){
        soundSelected.forEach(el=>el.onended = ()=> el.dataset.isplaying = false)
        soundSelected[0].play();
        soundSelected[0].dataset.isplaying = true;
      }
    }
  };
  render() {
    return this.context.isLoading ? (
      ""
    ) : (
      <div className="comments">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.context.addNewComment(this.state.comment);
            this.setState({comment: ""});
          }}
        >
          <textarea
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
            onKeyDown={this.onKeyDown}
            required
            cols="70"
            rows="5"
            placeholder="Write a comment.."
          ></textarea>
          <button>Comment</button>
        </form>
      </div>
    );
  }
}

export default Comments;
