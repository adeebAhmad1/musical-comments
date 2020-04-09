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
      let soundSelected = Array.from(document.querySelectorAll(`audio[data-text="${e.key}"]`));
      soundSelected = soundSelected.filter(el=> !el.dataset.isPlaying );
      if(soundSelected.length > 0){
        soundSelected[0].play();
        soundSelected[0].dataset.isPlaying = true;
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
