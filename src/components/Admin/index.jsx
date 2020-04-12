import React, { Component } from "react";
import { db, storageRef } from "../../config/firebase";
import Loader from "../utils/Loader";
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"
class Admin extends Component {
  static contextType = AuthContext
  state = {
    sounds: [],
    isLoading: true
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
        sounds.sort( (a, b)=> {
          let alphabetA = a.alphabet
          if(alphabetA === "aa") alphabetA =  "/"
          if(alphabetA === "bb") alphabetA =  " "
          if(alphabetA === "cc")  alphabetA = "\\"
          if(alphabetA === "dd")  alphabetA = ">";
          if(alphabetA === "ee")  alphabetA = "<";
          if(alphabetA === "ff")  alphabetA = "?";
          if(alphabetA === "hh")  alphabetA = "\"";
          if(alphabetA === "ii")  alphabetA = "|";
          if(alphabetA === "jj")  alphabetA = ":";
          if(alphabetA === "kk")  alphabetA = "*";
          let alphabetB = b.alphabet
          if(alphabetB === "aa") alphabetB =  "/"
          if(alphabetB === "bb") alphabetB =  " "
          if(alphabetB === "cc")  alphabetB = "\\"
          if(alphabetB === "dd")  alphabetB = ">";
          if(alphabetB === "ee")  alphabetB = "<";
          if(alphabetB === "ff")  alphabetB = "?";
          if(alphabetB === "hh")  alphabetB = "\"";
          if(alphabetB === "ii")  alphabetB = "|";
          if(alphabetB === "jj")  alphabetB = ":";
          if(alphabetB === "kk")  alphabetB = "*";
            if (alphabetA < alphabetB) {
                return -1;
            }
            if (alphabetB > alphabetA) {
                return 1;
            }
            return 0;
        });
        console.log(sounds)
        this.setState({ sounds, isLoading: false });
        return sounds;
      })
      .then((sounds) => {
        let alphabets = [
          "a","b","c","d","e","f","g",
          "h","i","j","k","l","m","n",
          "o","p","q","r","s","t","u",
          "v","w","x","y","z","1","2",
          "3","4","5","6","7","8","9",
          "0",".",",","`",";","[","]",
          "-","=","'","ñ","aa","bb","cc",
          "~", "!", "@", "#", "$", "%", "^", "&", "(", ")", "_", "+", "{", "}",
          "dd","ee","ff","hh","ii","jj","kk"
        ];
        if (sounds.length < alphabets.length) {
          alphabets = alphabets.filter(el=>{
            const remaining = sounds.find(sound=> sound.alphabet === el);
            return remaining ? false : true
          })
          alphabets.forEach((alphabet) => {
            storageRef
              .child(`audio/${alphabet}.mp3`)
              .getDownloadURL()
              .then((sound) => {
                const soundObj = { alphabet, sound };
                db.collection("sounds")
                  .add(soundObj)
                  .then(() => sounds.push(soundObj)).then(()=>{
                    this.setState({ sounds: sounds.sort(), isLoading: false });
                  });
              });
          });
        }
      });
  }
  showSounds = () => {

    return this.state.sounds.map((el, i) => {
      let { alphabet } = el;
      if(alphabet === "aa") alphabet =  "/"
      if(alphabet === "bb") alphabet =  "SpaceBar"
      if(alphabet === "cc")  alphabet = "\\"
      if(alphabet === "dd")  alphabet = ">";
      if(alphabet === "ee")  alphabet = "<";
      if(alphabet === "ff")  alphabet = "?";
      if(alphabet === "hh")  alphabet = "\"";
      if(alphabet === "ii")  alphabet = "|";
      if(alphabet === "jj")  alphabet = ":";
      if(alphabet === "kk")  alphabet = "*";
      return (
        <div
          className=""
          key={i}
          style={{ width: `max-content`, margin: `0 auto` }}
        >
          <span style={{ display: `inline-block`, width: `30px` }}>
            {" "}
            {alphabet}{" "}
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
            
            db.collection("sounds")
              .doc(id)
              .update({ sound })
              .then(() => {
                const sounds = this.state.sounds;
                sounds[index].sound = sound;
                this.setState({ sounds, isLoading: false });
                return true;
              })
              .then(() => (this.refs[`input-${index}`].value = sound));
          });
        });
    }
  };
  render() {
    return this.context.isAuth ? (
      <div>
        <h1>All Sounds</h1>
        <Link to="/">Go back</Link>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          this.showSounds()
        )}
      </div>
    ) : (
      <Loader adminPage={this.context.isAuth} history={this.props.history} />
    );
  }
}

export default Admin;
