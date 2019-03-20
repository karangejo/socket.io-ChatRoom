import React, { Component } from 'react';
import openSocket from 'socket.io-client';

// Open the socket and listen to the URL
const socket = openSocket( 'http://localhost:8000');

class App extends Component {


  componentDidMount(){
    // Listen for a postMessage and modify state to display the new message to the screen
    socket.on('postMessage',(message) => {
      //console.log('Message from Server: ', message);
      // add the new message to state variable
      const newMessageArray = this.state.messages.concat(message);
      this.setState({messages:newMessageArray});
      //console.log('messages from state :', this.state.messages);
    });

  }

  //initialize state
  state = {
    messages: [],
    message: ''
  };



  submitMessage = (event) => {
    event.preventDefault();
    //console.log(event);
    //console.log(this.state.message);
    // emit a newMessage and send this user's message to the central server
    socket.emit('newMessage', this.state.message);
    // reset the local state variable in order to store the next message
    this.setState({message:''});
  }



  render() {
    return (
      <div>
      <ul>
        {this.state.messages.map((item) => (
          <li key={item}>{item}</li>
       ))}
      </ul>
      <form className="message" onSubmit={this.submitMessage}>
        <input type="text" name="message" value={this.state.message} onChange={event => this.setState({message: event.target.value})}/>
        <button type="submit" name="button">Message</button>
      </form>
   </div>
    );
  }
}

export default App;
