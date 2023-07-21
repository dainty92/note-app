import { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketConnection = ({ onDataUpdate }) => {
  useEffect(() => {
    const socket = io('http://localhost:3000');

    // Listen for data updates from the server
    socket.on('dataUpdate', (updatedData) => {
      onDataUpdate(updatedData);
    });

    return () => {
      socket.disconnect();
    };
  }, [onDataUpdate]);

  return null;
};

export default WebSocketConnection;
