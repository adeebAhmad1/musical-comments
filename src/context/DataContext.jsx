import React, { Component, createContext } from "react";
import { db } from "../config/firebase";
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
  showAudio = ()=> this.state.sounds.map(el=> <audio key={ el.alphabet } data-isplaying={false} data-text={el.alphabet} preload="true" style={{display:`none`}} src={el.sound}></audio>)
  render() {
    return (
      <DataContext.Provider
        value={{
          ...this.state,
          addNewComment: this.addNewComment,
          showComments: this.showComments,
        }}
      >
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.showAudio()}
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
export { DataContext };
export default DataContextProvider;
