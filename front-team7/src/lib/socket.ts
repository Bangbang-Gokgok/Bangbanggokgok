import { io } from 'socket.io-client';

interface SocketProps {
  myUserId: string;
  feedId: string;
  index?: number;
}

let URL = '';

if (process.env.NODE_ENV !== 'development') {
  URL = 'http://kdt-sw2-seoul-team07.elicecoding.com:5000';
} else {
  URL = 'http://localhost:5030';
}

export let socket = io(URL, { transports: ['websocket'] });

export const initSocketConnection = () => {
  if (socket.connected) return;
  socket.connect();
};

// 이벤트 명을 지정하고 데이터를 보냄
export const sendSocketMessage = (body: SocketProps) => {
  if (socket == null || socket.connected === false) {
    initSocketConnection();
  }
  const { myUserId, feedId, index } = body;
  socket.emit('likeRequest', myUserId, feedId, index);
};

export const socketInfoReceived = (cb) => {
  if (socket.hasListeners('likeResponse')) {
    socket.off('likeResponse');
  }
  socket.on('likeResponse', cb);
};

// 소켓 연결을 끊음
export const disconnectSocket = () => {
  if (socket == null || socket.connected === false) {
    return;
  }
  socket.disconnect();
};
