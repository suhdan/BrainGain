const React = require('react');

const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;

const LoginForm = React.createClass({
  getInitialState(){
    return { username: "", password: "", errors: [] };
  },

  componentDidMount(){
    SessionStore.addListener(this.handleLoggedChange);
    ErrorStore.addListener(this.handleErrorChange);
  },

  handleLoggedChange(){
    if (SessionStore.isUserLoggedIn()){
      hashHistory.push("/");
    }
  },

  handleErrorChange(){
    this.setState({
      errors: ErrorStore.errors("login")
    });
  },

  updateUsername(e){
    this.setState({
      username: e.target.value
    });
  },

  updatePassword(e){
    this.setState({
      password: e.target.value
    });
  },

  handleSubmit(event) {
    event.preventDefault();
    SessionActions.logIn({
      username: this.state.username,
      password: this.state.password
    });
  },

  handleLeen(event){
    event.preventDefault();
    SessionActions.logIn({
      username: "LeanOnBeanshin",
      password: "dandan"
    });
  },

  render() {
    let errorList = [];
    if (this.state.errors) {
      errorList = this.state.errors.map( (error, index) => {
        return <p key={index}>{error}</p>;
      })
    }
    return(
      <div className="auth-page">
        <article className="auth-form-article">
          <h2>Login</h2>
          {errorList}
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              onChange={this.updateUsername}/>
            <input
              type="password"
              placeholder="Password"
              onChange={this.updatePassword}/>
            <hr></hr>
            <input type="submit" value="Log In"/>
          </form>
          <Link to="/users/new">Sign Up</Link>
          <a onClick={this.handleLeen}>Log In as Leen</a>
        </article>
        <div className="cf">
          <a href="#" className="image1" />
          <a href="#" className="image2" />
          <a href="#" className="image3" />
          <a href="#" className="image4" />
        </div>
      </div>
    );
  }
});

module.exports = LoginForm;
