export default {
  on: true, //是否开启 WebSocket
  type: "socket.io",
  allow_origin: "",
  sub_protocal: "",
  adapter: undefined,
  path: "", //url path for websocket
  messages: {
    open: 'home/index/open',
    close: 'home/index/close',
    joinroom: 'home/index/joinroom',
    chat: 'home/index/chat',
    chess: 'home/index/chess',
    surrender: 'home/index/surrender',
    negotiation: 'home/index/negotiation'
  }
};