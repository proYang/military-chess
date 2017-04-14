'use strict';

import Base from './base.js';

let socketId = 0;
let users = {};
let rooms = [
  { roomId: 0, users: [] },
  { roomId: 1, users: [] },
  { roomId: 2, users: [] },
  { roomId: 3, users: [] },
  { roomId: 4, users: [] },
  { roomId: 5, users: [] },
  { roomId: 6, users: [] },
  { roomId: 7, users: [] },
  { roomId: 8, users: [] },
  { roomId: 9, users: [] }
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
    this.emit('roomstatus', rooms);
  }

  closeAction(self) {
    let socket = self.http.socket;
    let roomId = socket.roomId;
    // remove the userName from global userNames list
    if (socket.userName) {
      // let users = rooms[roomId].users;
      let index = undefined;
      rooms[roomId].users.forEach(function (item, i) {
        if (item.userId == socket.socketId) {
          index = i
        }
      });
      if (index !== undefined) {
        rooms[roomId].users.splice(index, 1)
        --numUsers;
        console.log('\nsomeone leaveRoom');
        console.log('{' + socket.userName, socket.roomId + '}');
      }

      // 广播房间状态
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
    if (rooms[data.roomId].users.length < 2) {
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
    // 聊天
    let socket = self.http.socket;
    let roomId = socket.roomId;
    console.log(socket.userName + ' in ' + socket.roomId + self.http.data)
    socket.broadcast.to(socket.roomId).emit('chat', {
      userName: socket.userName,
      message: self.http.data
    });
  }

  chessAction(self) {
    // 同步棋子相关
    let socket = self.http.socket;
    let roomId = socket.roomId;
    console.log(socket.userName + ' chess ' + socket.roomId + self.http.data)
    socket.broadcast.to(socket.roomId).emit('chess', self.http.data);
  }

  surrenderAction(self) {
    // var data = {
    //   type: 'fail',
    //   data: {},
    //   msg: '对方选择投降'
    // }
    // 求和
    let socket = self.http.socket
    let roomId = socket.roomId;
    let data = self.http.data
    if (data.type == 'fail') {
      // 选择投降
      console.log(socket.userName + 'surrender ' + socket.roomId)
      // 通知房间其他用户赢了
      socket.broadcast.to(socket.roomId).emit('surrender', { type: 'win' });
      // 清人
      rooms[roomId].users = []
    }
  }

  negotiationAction(self) {
    let socket = self.http.socket
    let roomId = socket.roomId;
    let data = self.http.data
    if (data.type == 'leave') {
      // 请求求和
      console.log(socket.userName + 'negotiationAction ' + socket.roomId)
      // 通知房间其他用户求和
      socket.broadcast.to(socket.roomId).emit('negotiation', { type: 'confirm' });
      
    } else if(data.type == 'success') {
      // 通知房间所有用户求和成功
      console.log(socket.userName + 'negotiationActionSuccess ' + socket.roomId)
      socket.broadcast.in(socket.roomId).emit('negotiation', { type: 'success' });
      // 清人
      rooms[roomId].users = []
    } else if(data.type == 'fail') {
      // 通知房间所有用户求和失败
      console.log(socket.userName + 'negotiationActionFail ' + socket.roomId)
      socket.broadcast.in(socket.roomId).emit('negotiation', { type: 'fail' });
    }
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