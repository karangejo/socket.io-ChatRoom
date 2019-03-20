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
      <div className="container" style={{width:'100%'}}>
      <nav>
         <div class="nav-wrapper" style={{backgroundColor:'#2d4059'}}>
           <a href="#" class="brand-logo" style={{color:'#f07b3f'}}>Chat Room</a>
         </div>
       </nav>
      <ul className="collection">
        {this.state.messages.map((item) => (
          <li className="collection-item" key={item}>{item}</li>
       ))}
      </ul>
      <div style={{position:'fixed',left:0,bottom:0,right:0,backgroundColor:'#ffd460'}}>
      <form style={{margin:20}} className="message" onSubmit={this.submitMessage} >
        <input type="text" name="message" value={this.state.message} onChange={event => this.setState({message: event.target.value})}/>
        <button className="waves-effect wave-light btn" type="submit" name="button" style={{position:'fixed',right:10,backgroundColor:'#f07b3f'}}>Message</button>
      </form>
      </div>
   </div>
    );
  }
}

export default App;
