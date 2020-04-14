
import React, {useContext} from 'react';
import Content from './Content';
import { Link } from "react-router-dom"
import { DataContext } from '../../context/DataContext';
import Comments from './Comments';


const Home = () => {
  const context = useContext(DataContext)
  const showAudio = () =>context.sounds.map((el) =><audio key={el.alphabet} data-isplaying="false" data-text={el.alphabet} preload="true" src={el.sound}></audio>);
  return (
    <div className="home">
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        {showAudio()}
        <Comments />
        <Content />
        <Link to="/login"> Admin Login </Link>
      </div>
  );
};

export default Home;