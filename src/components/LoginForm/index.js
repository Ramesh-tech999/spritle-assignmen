import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    listItems: [],
    userName: '',
    password: '',
    confirmPassword: '',
    errorMsgPassword: false,
    userType: 'Student',
    loginName: '',
    loginPassword: '',
    loginUserType: 'Student',
  }

  onSubmitSignInForm = event => {
    event.preventDefault()
    const {userName, password, confirmPassword, userType} = this.state

    const randomNum = Math.ceil(Math.random() * 10000)

    const newUser = {
      id: randomNum,
      userName,
      password,
      userType,
    }

    if (password !== confirmPassword) {
      this.setState({errorMsgPassword: true})
    } else {
      this.setState(preValue => ({
        listItems: [...preValue.listItems, newUser],
        userName: '',
        password: '',
        confirmPassword: '',
        errorMsgPassword: false,
      }))
      alert('you have registered successfully.')
    }
  }

  onSubmitSuccessStudent = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitSuccessMaster = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/master-page')
  }

  onSubmitLogInForm = event => {
    event.preventDefault()

    const {loginName, loginPassword, loginUserType} = this.state

    const listItemsDetails = JSON.parse(localStorage.getItem('listItems'))

    const studentList = listItemsDetails.filter(
      eachItem => eachItem.userType === 'Student',
    )

    const masterList = listItemsDetails.filter(
      eachItem => eachItem.userType === 'Master',
    )

    if (loginUserType === 'Student') {
      for (let i = 0; i < studentList.length; i += 1) {
        if (
          studentList[i].userName === loginName &&
          studentList[i].password === loginPassword
        ) {
          const jwtToken = JSON.parse(localStorage.getItem(studentList[i].id))
          this.onSubmitSuccessStudent(jwtToken)
        }
      }
    } else if (loginUserType === 'Master') {
      for (let i = 0; i < masterList.length; i += 1) {
        if (
          masterList[i].userName === loginName &&
          masterList[i].password === loginPassword
        ) {
          const jwtToken = JSON.parse(localStorage.getItem(masterList[i].id))
          this.onSubmitSuccessMaster(jwtToken)
        }
      }
    }
  }

  onChangeName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  onChangeUserType = event => {
    this.setState({userType: event.target.value})
  }

  onChangeLoginName = event => {
    this.setState({loginName: event.target.value})
  }

  onChangeLoginPassword = event => {
    this.setState({loginPassword: event.target.value})
  }

  onChangeUserLoginType = event => {
    this.setState({loginUserType: event.target.value})
  }

  render() {
    const {
      listItems,
      userName,
      password,
      confirmPassword,
      errorMsgPassword,
      loginName,
      loginPassword,
    } = this.state

    localStorage.setItem('listItems', JSON.stringify(listItems))

    return (
      <div className="bg-container">
        <form className="form-container" onSubmit={this.onSubmitSignInForm}>
          <h1 className="heading">Sign IN</h1>
          <input
            value={userName}
            onChange={this.onChangeName}
            type="text"
            className="input-elm"
            placeholder="User Name"
          />
          <input
            type="password"
            value={password}
            onChange={this.onChangePassword}
            className="input-elm"
            placeholder="Password"
          />
          <input
            value={confirmPassword}
            onChange={this.onChangeConfirmPassword}
            type="password"
            className="input-elm"
            placeholder="Confirm Password"
          />
          {errorMsgPassword && (
            <p className="errorMsg">*Please enter same passwords</p>
          )}
          <select className="input-elm" onChange={this.onChangeUserType}>
            <option>Student</option>
            <option>Master</option>
          </select>
          <button type="submit" className="button-elm">
            Sign IN
          </button>
        </form>
        <form className="form-container" onSubmit={this.onSubmitLogInForm}>
          <h1 className="heading">Log IN</h1>
          <input
            type="text"
            value={loginName}
            onChange={this.onChangeLoginName}
            className="input-elm"
            placeholder="User Name"
          />
          <input
            type="password"
            value={loginPassword}
            onChange={this.onChangeLoginPassword}
            className="input-elm"
            placeholder="Password"
          />
          <select className="input-elm" onChange={this.onChangeUserLoginType}>
            <option>Student</option>
            <option>Master</option>
          </select>

          <button type="submit" className="button-elm">
            Log IN
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
