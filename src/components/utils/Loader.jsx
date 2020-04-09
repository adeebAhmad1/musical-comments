import React from 'react';

const Loader = (props) => {
  setTimeout(() =>{
    if(props.adminPage) props.history.push("/login")
  }, 6999);
  return (
    <div className="loader_wrapper" style={{height: `100vh`}}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;