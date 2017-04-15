/**
 * Created by puhongru on 2017/4/13.
 */

import {drawtable} from '../../../src/js/drawtable';
console.log(drawtable);
const socket = io('http://chess.slane.cn/');
const rooms = document.getElementById('rooms');
let checkedRoom;
const nameInput = document.getElementById('login-name-input');
const loginBtn = document.getElementById('login-submit');
const game = document.getElementById('game');
const loginPage = document.getElementById('login');

game.style.display = 'none';

// 得到当前所有房间的状态
socket.on('roomstatus', function(data){
    console.log(data);
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
    e.preventDefault();
    for(let i = 0; i < rooms.childNodes.length; i++){
        delClassName(rooms.childNodes[i],'chess-room-active');
    }
    if(e.target && e.target.nodeName.toUpperCase() === 'LI'){
        if(getPersonNum(e.target) >= 2){
            alert('房间已满，请重新选择！');
        }else{
            if(e.target.className.indexOf('chess-room-active') === -1){
                e.target.className = e.target.className + ' chess-room-active';
            }
            checkedRoom = getRoomId(e.target);
            console.log(checkedRoom);
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

//debugger;
// 点击进入游戏监听事件
loginBtn.addEventListener('click',(e) => {
    e.stopPropagation();
    e.preventDefault();
    let name = getUserName(nameInput);
    window.localStorage.setItem('nick', name)
    window.localStorage.setItem('user_id', checkedRoom - 1)
    let data = {
        userName: name,
        roomId: checkedRoom - 1
    };
    game.style.display = 'block';
    loginPage.style.display = 'none';
    // 初始化canvas
    let canvas = document.getElementById('chess-table');
    let {width, height} = document.getElementById('table').getBoundingClientRect();
    canvas.width = 2 * width;
    canvas.height = 2 * height;
    console.log(width, height);
    Object.assign(canvas.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(0.5)',
    });
    drawtable(canvas, width, height);
    console.log(111);
    socket.emit('joinroom', data);
});

// 删除元素的className
function delClassName(el, name){
    el.className = el.className.replace(name, '');
}