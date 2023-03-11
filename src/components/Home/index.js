import {Component} from 'react'

import Header from '../Header'

import QuestionBox from '../QuestionBox'

import './index.css'

class Home extends Component {
  state = {questionList: []}

  onClickStartAssignment = () => {
    const questionsList = JSON.parse(localStorage.getItem('questions'))
    this.setState(prevState => ({
      questionList: [...prevState.questionList, ...questionsList],
    }))
  }

  render() {
    const {questionList} = this.state

    return (
      <>
        <Header />
        <div className="home-container">
          <h1>Answer the Questions</h1>
          <button
            className="start-button"
            onClick={this.onClickStartAssignment}
            type="button"
          >
            Start Assignment
          </button>
          <div className="assignment-box">
            <ul>
              {questionList.map(eachQuestion => (
                <QuestionBox details={eachQuestion} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Home
