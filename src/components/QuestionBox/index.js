import {Component} from 'react'

import './index.css'

class QuestionBox extends Component {
  render() {
    const {details} = this.props
    return (
      <div>
        <div className="question-container">
          <h1>{details}</h1>
          <input type="text" className="input-box-ans" placeholder="ans" />
          <button type="button" className="save-button-box">
            Save
          </button>
        </div>
      </div>
    )
  }
}

export default QuestionBox
