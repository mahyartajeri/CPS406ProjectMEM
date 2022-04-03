import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Link } from 'react-router-dom';

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '',second: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSecond = this.handleSecond.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSecond(event) {
        this.setState({second: event.target.value});
      }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value +" "+this.state.second);
      event.preventDefault();
    }
  
    render() {
      return (
        <body>
          <div>
       
              <h1>Ryerson Table Tennis</h1>
              <p></p>
              <form onSubmit={this.handleSubmit}>
                <label>
                Username: 
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <br></br>
                <br></br>
                <label>
                  Password:
                  <input type="text" value={this.state.second} onChange={this.handleSecond} />
                </label>
                <br></br>
                <br></br>
                <input type="submit" value="Log In" />
                <br></br>
                <br></br>
              </form>
          </div>
        </body>
      );
    }
  }
  ReactDOM.render(<NameForm />, document.getElementById('root'))