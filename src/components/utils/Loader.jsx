import React, { Component } from 'react'

class Loader extends Component {
  UNSAFE_componentWillReceiveProps(props){
    if(props.adminPage) setTimeout(() =>{
      props.history.push("/login");
    }, 7000);
  }
  render () {
    return (
      <div className="loader_wrapper" style={{height: `100vh`}}>
        <div className="loader"></div>
      </div>
    )
  }
}

export default Loader