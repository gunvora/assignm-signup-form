import React from "react"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: ""
    }
  }


  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8082/users", {
      method: "POST",
      headers: {
        Accept: "application/json, textplain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.status === 201) {
        this.setState({
          username: "",
          email: "",
          password: ""
        })
      }
    }).catch(err => {
      // api down? request failed?
      console.log("Error!", err)
    })
  }

    handleUsername = event => {
      this.setState({
        username: event.target.value
      })
    }

    handleEmail = event => {
      this.setState({
        email: event.target.value
      })
    }

    handlePassword = event => {
      this.setState({
        password: event.target.value
      })
    }

    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit} >
            <div>
              <label>
                <h3>Username:</h3>
                <input
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.handleUsername} />
              </label>
              <label>
                <h3>Email:</h3>
                <input
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleEmail} />
              </label>
              <label>
                <h3>Password:</h3>
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePassword} />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }

}

export default App
