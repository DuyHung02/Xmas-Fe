import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { io, Socket } from 'socket.io-client';
import { SocketProvider } from './utils/context/socket.context';

function App() {
  const socket: Socket = io('http://localhost:8000');

  return (
    <SocketProvider socket={socket}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
