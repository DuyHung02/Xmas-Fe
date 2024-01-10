import React, { createContext, useContext, FC, ReactNode } from 'react';
import { Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket;
  children: ReactNode;
}

const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketProvider: FC<SocketContextProps> = ({
  socket,
  children,
}) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export const useSocket = (): Socket => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};
