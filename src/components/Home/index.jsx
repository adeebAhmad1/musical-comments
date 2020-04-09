import React from 'react';
import Comments from './Comments';
import Content from './Content';
import { Link } from "react-router-dom"
const Home = () => {
  return (
    <div>
      <Comments />
      <Content />
      <Link to="/login"> Admin Login </Link>
    </div>
  );
};

export default Home;