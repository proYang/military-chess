/**
 * Created by puhongru on 2017/4/13.
 */
const socket = io('http://chess.slane.cn/');
const rooms = document.getElementById('rooms');
let checkedRoom;
const nameInput = document.getElementById('login-name-input');
const loginBtn = document.getElementById('login-submit');

// 得到当前所有房间的状态
socket.on('roomstatus', function(data){
    rooms.innerHTML = '';
    for(let i = 0; i < data.length; i++){
        roomLi(rooms,data[i].roomId+1,data[i].users.length);
    }
});

// 添加room的dom树
function roomLi(el,roomId,personNum) {
    let li = document.createElement('li');
    li.className = 'chess-room';
    let state;
    if(personNum < 2){
        state = '未满';
    }else{
        state = '已满';
    }
    li.innerHTML = '房间号：<span>' + roomId + '</span>, <span>' + personNum + '</span>人，' + state;
    el.appendChild(li);
}

// 监听房间号选择事件
rooms.addEventListener('click',function(e){
    for(let i = 0; i < rooms.childNodes.length; i++){
        delClassName(rooms.childNodes[i],'chess-room-active');
    }
    if(e.target && e.target.nodeName.toUpperCase() === 'LI'){
        if(getPersonNum(e.target) >= 2){
            alert('房间已满，请重新选择！');
        }else{
            checkedRoom = getRoomId(e.target);
            console.log(checkedRoom);
            if(e.target.className.indexOf('chess-room-active') === -1){
                e.target.className = e.target.className + ' chess-room-active';
            }
        }
    }
});

// 得到选择的房间号
function getRoomId(el){
    return el.getElementsByTagName('span')[0].innerHTML;
}

// 得到选择房间的人数
function getPersonNum(el){
    return el.getElementsByTagName('span')[1].innerHTML;
}

// 得到用户昵称
function getUserName(el) {
    return el.value;
}

// 点击进入游戏监听事件
loginBtn.addEventListener('click',() => {
    let name = getUserName(nameInput);
    let data = {
        userName: name,
        roomId: checkedRoom - 1
    };
    //console.log(data);
    socket.emit('joinroom', data);
});

// 删除元素的className
function delClassName(el, name){
    el.className = el.className.replace(name, '');
}

// 设置要加入的房间Id及用户名
// var data = {
//     userName: 'client1',
//     roomId: 2
// };
//var data;

//socket.emit('joinroom', data);