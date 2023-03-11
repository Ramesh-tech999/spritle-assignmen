import {Component} from 'react'

import Header from '../Header'

import './index.css'

class MasterPage extends Component {
  state = {questionsList: [], question: ''}

  onChangeInputElm = event => {
    this.setState({question: event.target.value})
  }

  addQuestionFunction = () => {
    const {question} = this.state
    this.setState(prevState => ({
      questionsList: [...prevState.questionsList, question],
      question: '',
    }))
  }

  saveButtonFunction = () => {
    const {questionsList} = this.state
    localStorage.setItem('questions', JSON.stringify(questionsList))
  }

  render() {
    const {questionsList, question} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <h1>Create Question</h1>
          <input
            value={question}
            onChange={this.onChangeInputElm}
            className="input-elm"
            type="text"
            placeholder="Enter Question"
          />

          <button
            type="button"
            className="add-button"
            onClick={this.addQuestionFunction}
          >
            Add
          </button>
          <ul>
            {questionsList.map(eachElm => (
              <p>{eachElm}</p>
            ))}
          </ul>
          <button
            type="button"
            className="save-button"
            onClick={this.saveButtonFunction}
          >
            Save
          </button>
        </div>
      </>
    )
  }
}

export default MasterPage
