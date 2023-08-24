import { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketConnection = ({ onDataUpdate }) => {
  useEffect(() => {
    const socket = io('https://note-app-fcnj.onrender.com');

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
