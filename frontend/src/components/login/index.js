import React from "react"

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      errors: {}
    }
  }

  handleFormSubmit = event => {
    event.preventDefault()
    console.log("Login form submitted")

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    }
    fetch("http://localhost:8080/login", payload)
      .then(response => response.json())
      .then(json => {
        if (json.errors) {
          this.setState({
            errors: json.errors
          })
        } else {
          this.props.onLoginSuccess(json)
        }
      })
      .catch(err => {
        console.error("Promise rejected", err)
      })
  }

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Username
            <span>{this.state.errors.username}</span>
            <input
              onChange={this.handleUsernameChange}
              value={this.state.username}
              type="text" />
          </label>

          <label>
            Password
            <input
              onChange={this.handlePasswordChange}
              value={this.state.password}
              type="password" />
          </label>

          <button>Log in</button>
        </form>
      </div>
    )
  }

}
