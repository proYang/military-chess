let talkContent = document.getElementById('talkContent'),
	sendInput = document.getElementById('sendInput'),
	saveBtn = document.getElementById('saveBtn'),
	socket = io('http://chess.slane.cn/');
const JOINROOM = 'joinroom',      // 加入房间的事件
	CHAT = 'chat';              // 聊天的事件
function createContentNode (val) {
	let newNode = document.createElement('div'),
		nodeNick = document.createElement('span'),
		nodeContent = document.createElement('span');
	newNode.className = 'talk-text';
	nodeNick.className = 'nick';
	nodeNick.innerHTML ='nick';
	nodeContent.innerHTML = ' : &nbsp;'+ val ;
	newNode.appendChild(nodeNick);
	newNode.appendChild(nodeContent);
	talkContent.appendChild(newNode);
}

function btnHanfler() {
	let val = sendInput.value;
	if(!val) {
		alert('please input content');
		return;
	}
	createContentNode(val);
	socket.emit(CHAT, val);
	sendInput.value = '';
	// 通过localstroge得到用户id
	let storage = window.localStorage;
	let nick = storage.getItem('nick'),
		userID = storage.getItem('user_id');
	console.log(nick,userID);
	// TODO 发送websocket
	// 监看
}

function linsenRoomStatus(data) {

}

function getNickAndID(){
	let storage = window.localStorage;
	return {
		userName:storage.nick,
		roomId:storage.user_id
	}
}
function updateList(res) {
	let msg = res.message;
	createContentNode(msg);
}
function sendDateByEnter(ev) {
	if(ev.keyCode !== 13) return ;
	btnHanfler();
}
function listen() {
	saveBtn.addEventListener('click',btnHanfler,false);// 监听按钮点击
	let data = getNickAndID();  // 得到这个房间的用户和ID
	socket.emit(JOINROOM, data); // 向房间里的其他人物发送信息
	socket.on(CHAT, updateList); // 得到别人的发送来的消息，更新DOM
	sendInput.addEventListener('keydown',sendDateByEnter,false);
}

module.exports = {
	listen
}