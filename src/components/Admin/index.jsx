import React, { Component } from "react";
import { db, storageRef } from "../../config/firebase";

class Admin extends Component {
  state = {
    sounds: [],
    isLoading: true,
  };
  componentDidMount() {
    db.collection("sounds")
      .get()
      .then((snapShot) => {
        const sounds = [];
        snapShot.forEach((doc) => {
          const sound = doc.data();
          sound.id = doc.id;
          sounds.push(sound);
        });
        sounds.sort((a, b) => a.alphabet - b.alphabet);
        this.setState({ sounds, isLoading: false });
        return sounds;
      })
      .then((sounds) => {
        const alphabets = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
        ];
        if (sounds.length < alphabets.length) {
          alphabets.forEach((alphabet) => {
            storageRef
              .child(`audio/${alphabet}.mp3`)
              .getDownloadURL()
              .then((sound) => {
                const soundObj = { alphabet, sound };
                db.collection("sounds")
                  .add(soundObj)
                  .then(() => sounds.push(soundObj));
                this.setState({ sounds, isLoading: false });
              });
          });
        }
      });
  }
  showSounds = () => {
    return this.state.sounds.map((el, i) => {
      return (
        <div
          className=""
          key={i}
          style={{ width: `max-content`, margin: `0 auto` }}
        >
          <span style={{ display: `inline-block`, width: `30px` }}>
            {" "}
            {el.alphabet}{" "}
          </span>
          <input
            id={`file-${i}`}
            ref={`file-${i}`}
            accept="audio/*"
            style={{
              display: `inline-block`,
              width: `90px`,
              marginRight: `20px`,
            }}
            type="file"
          />
          <label
            htmlFor={`file-${i}`}
            style={{ display: `inline-block`, marginRight: `50px` }}
          >
            {" "}
            Choose File{" "}
          </label>
          <input
            style={{ display: `inline-block`, width: `950px` }}
            type="text"
            ref={`input-${i}`}
            value={el.sound}
            readOnly
          />
          <button onClick={() => this.handleUpdate(el.alphabet, i, el.id)}>
            Update
          </button>
          <audio src={el.sound} controls></audio>
        </div>
      );
    });
  };
  handleUpdate = (alphabet, index, id) => {
    const file = this.refs[`file-${index}`].files[0];
    if (file) {
      this.setState({ isLoading: true });
      storageRef
        .child(`audio/${alphabet}.mp3`)
        .put(file)
        .then((snapShot) => {
          snapShot.ref.getDownloadURL().then((sound) => {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              var blob = xhr.response;
            };
            xhr.open("GET", sound);
            xhr.send();
            db.collection("sounds")
              .doc(id)
              .update({ sound })
              .then(() => {
                this.refs[`input-${index}`].value = sound;
                const sounds = this.state.sounds;
                sounds[index].sound = sound;
                this.setState({ sounds, isLoading: false });
              });
          });
        });
    }
  };
  render() {
    return (
      <div>
        <h1>All Sounds</h1>
        {this.state.isLoading ? (
          <div className="loader_wrapper">
            <div className="loader"></div>
          </div>
        ) : (
          this.showSounds()
        )}
      </div>
    );
  }
}

export default Admin;
