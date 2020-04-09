import React, { Component } from 'react'
import { DataContext } from '../../context/DataContext'
import Loader from '../utils/Loader';

class Content extends Component {
  static contextType = DataContext;
  state= {
    soundPlaying: false
  }
  showComments = () => {
    return this.context.comments.map((el, i) => {
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
          const alphabet = this.context.sounds.find(sound=> sound.alphabet.toLowerCase() === el.toLowerCase());
          if(alphabet){
            return alphabet
          } 
        }
      );
      sounds.forEach((el, i) => {
        let soundSelected = Array.from(document.querySelectorAll(`audio[data-text=${el.alphabet}]`));
        soundSelected = soundSelected.filter(el=> el.dataset.isplaying === "false" );
        if (i === 0) {
          soundSelected[0].play();
          soundSelected[0].dataset.isplaying = "abc";
          if(sounds.length - 1 === i)this.setState({soundPlaying: false})
        } else {
          if(soundSelected.length > 0){
          soundSelected[0].dataset.isplaying = "abc";
          setTimeout(() => {
              soundSelected[0].play();
              if(sounds.length - 1 === i)this.setState({soundPlaying: false})
            }, i * 900);
          }
        }
      });
    } else{
      alert("Already Playing a sound")
    }
  };
  
  render () {
    return (
      this.context.isLoading ? <Loader /> : <div style={{width: `70%`,margin: `10px auto`}}>
      {this.showComments()}
    </div>
    )
  }
}

export default Content