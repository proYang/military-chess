'use strict';

import Base from './base.js';

let socketId = 0;
let users = {};
let rooms = [
    {roomId:0,users:[]},
    {roomId:1,users:[]},
    {roomId:2,users:[]},
    {roomId:3,users:[]},
    {roomId:4,users:[]},
    {roomId:5,users:[]},
    {roomId:6,users:[]},
    {roomId:7,users:[]},
    {roomId:8,users:[]},
    {roomId:9,users:[]}
  ];
let numUsers = 0;

// function getRoomStatus() {
//   // 获取房间状态
//   let data = Object.assign({}, rooms)
//   for (let key in data) {
//     data[key] = data[key].length;
//   }
//   return data
// }

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    //auto render template file index_index.html
    return this.display();
  }
  openAction(self) {
    let socket = self.http.socket;
    // 初次连接，返回房间状态
    // this.emit('roomstatus', getRoomStatus());
  }

  closeAction(self) {
    let socket = self.http.socket;
    let roomId = socket.roomId;
    // remove the userName from global userNames list
    if (socket.userName) {
      let users = rooms[roomId].users;
      let index = undefined;
      users.forEach(function (item, i) {
        if (item.userId == socket.userId) {
          index = i
        }
      });
      if (index) {
        users.splice(index, 1)
        console.log(users)
        --numUsers;
      }

      // 广播房间状态
      console.log('\nsomeone leaveRoom');
      console.log('{' + socket.userName, socket.roomId + '}');
      console.log(rooms);
      this.broadcast('roomstatus', rooms, true);
    }
  }

  joinroomAction(self) {
    let socket = self.http.socket;
    let data = self.http.data;
    socket.socketId = ++socketId;
    socket.userName = data.userName;
    socket.roomId = data.roomId;
    let user = {
      userId: socket.socketId,
      userName: data.userName,
    }
    // 加入房间
    socket.join(socket.roomId);
    console.log(socket.userName + ' join index:' + socket.roomId)
    if(rooms[data.roomId].users.length < 2) {
      // 设置为玩家
      rooms[data.roomId].users.push(user);
      ++numUsers;
      // 广播房间状态
      console.log('\nsomeone joinRoom');
      console.log(rooms);
      this.broadcast('roomstatus', rooms, true);
    }
  }

  chatAction(self) {
    let socket = self.http.socket;
    console.log(socket.userName + ' in ' + socket.roomId + self.http.data)
    socket.broadcast.to(socket.roomId).emit('chat', {
      userName: socket.userName,
      message: self.http.data
    });
  }

  chessAction(self) {
    let socket = self.http.socket;
    console.log(socket.userName + ' in ' + socket.roomId + self.http.data)
    socket.broadcast.to(socket.roomId).emit('chess', {
      userName: socket.userName,
      message: self.http.data
    });
  }
  // typingAction(self) {
  //   let socket = self.http.socket;
  //   this.broadcast('typing', {
  //     userName: socket.userName
  //   });
  // }
  // stoptypingAction(self) {
  //   let socket = self.http.socket;
  //   this.broadcast('stoptyping', {
  //     userName: socket.userName
  //   });
  // }
  // groupAction(self) {
  //   let socket = self.http.socket;
  //   let group = self.http.data
  //   console.log(socket.userName + 'join' + group + '\n')
  //   socket.join(group);
  // }
}