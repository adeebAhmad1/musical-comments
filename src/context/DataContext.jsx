import React, { Component, createContext } from "react";
import { db } from "../config/firebase";
import { Howl, Howler } from "howler";
const DataContext = createContext();
class DataContextProvider extends Component {
  state = {
    comments: [],
    isLoading: true,
    soundPlaying: false,
    sounds: []
  };
  getSounds = ()=>{
    db.collection("sounds")
      .get()
      .then((snapShot) => {
        const sounds = [];
        snapShot.forEach((doc) => {
          const comment = doc.data();
          comment.id = doc.id;
          sounds.push(comment);
        });
        this.getComments();
        this.setState({ sounds });
      });
  }
  componentDidMount() {
    this.getSounds();
  }
  getComments = () => {
    db.collection("comments")
      .get()
      .then((snapShot) => {
        const comments = [];
        snapShot.forEach((doc) => {
          const comment = doc.data();
          comment.id = doc.id;
          comments.push(comment);
        });
        this.setState({ comments, isLoading: false });
      });
  };
  addNewComment = (title) => {
    this.setState({ isLoading: true });
    db.collection("comments")
      .add({ title })
      .then(() => {
        this.getComments();
      });
  };
  showComments = () => {
    return this.state.comments.map((el, i) => {
      return (
        <div className="" key={i}>
          <span> {el.title} </span>
          <button data-text={el.title} onClick={this.listen}>
            Listen
          </button>
        </div>
      );
    });
  };
  listen = (e) => {
    const letters = e.target.dataset.text.split("");
    if (!this.state.soundPlaying) {
      this.setState({ soundPlaying: true });
      const sounds = letters.map(
        (el) =>{
          const alphabet = this.state.sounds.find(sound=> sound.alphabet === el)
          if(alphabet){
            return new Howl({ src: [`/sounds/${el}.mp3`] })
          }
        }
      );
      sounds.forEach((el, i) => {
        if (i === 0) {
          el.play();
        } else {
          setTimeout(() => {
            el.play();
            if (sounds.length - 1 === i) this.setState({ soundPlaying: false });
          }, i * 900);
        }
      });
    } else{
      alert("Already Playing a sound")
    }
  };

  render() {
    return (
      <DataContext.Provider
        value={{
          ...this.state,
          addNewComment: this.addNewComment,
          showComments: this.showComments,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
export { DataContext };
export default DataContextProvider;
