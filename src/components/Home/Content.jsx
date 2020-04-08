import React, { Component } from 'react'
import { DataContext } from '../../context/DataContext'

class Content extends Component {
  static contextType = DataContext
  render () {
    return (
      this.context.isLoading ? <div className="loader_wrapper" style={{height: `100vh`}}>
      <div className="loader"></div>
    </div> : <div style={{width: `70%`,margin: `10px auto`}}>
      {this.context.showComments()}
    </div>
    )
  }
}

export default Content