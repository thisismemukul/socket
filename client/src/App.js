import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

const socket = io.connect('http://localhost:5000');
const userName = nanoid(4);
const time = new Date().toLocaleTimeString();
const App = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('chat', { message,userName,time });
    setMessage('');
  };
  useEffect(() => {
    socket.on('chat', (payload) => {
      setChat([...chat, payload]);
    })
  })

  return (
    <div className="App">
      <header className="App-header">
          {chat.map((payload, index) => {
            return (
              <code key={index}>{payload.message}- <span>Id: {payload.userName}</span> <span className='time'>{payload.time}</span> </code>
            )
          })}
        <form onSubmit={sendChat}>
          <input type="text" name='chat' placeholder='send message' value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className="App-link">
            Send
          </button>
        </form>
      </header>
    </div>
  )
}

export default App