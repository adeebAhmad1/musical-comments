import React, { Component } from "react";
import { Howl } from "howler";
import { DataContext } from "../../context/DataContext";

class Comments extends Component {
  static contextType = DataContext;
  state = {
    sounds: [],
    comment: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onKeyDown = (e) => {
    if (e.key) {
      let sound = null
      const soundSelected = this.context.sounds.find(
        (sound) => sound.alphabet === e.key
      );
      console.log(soundSelected)
      if(soundSelected) sound = soundSelected.sound
      if (sound) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
          console.log(blob);
        };
        xhr.open("GET", sound);
        xhr.send();
        console.log(sound);
        new Howl({ src: [sound] }).play();
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
