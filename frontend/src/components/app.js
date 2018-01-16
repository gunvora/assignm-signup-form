import React from "react"
import Login from "./login"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      accessToken: "",
      userId: ""
    }
  }

  handleLoginSuccess = user => {
    this.setState({
      accessToken: user.accessToken,
      userId: user._id
    })
  }

  isLoggedIn = () => (
    this.state.accessToken && this.state.userId
  )

  render() {
    return (
      <div>
        {this.isLoggedIn()
          ? <h1>Welcome!</h1>
          : <Login onLoginSuccess={this.handleLoginSuccess} />}
      </div>
    )
  }

}

export default App
