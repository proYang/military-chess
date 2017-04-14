let talkContent = document.getElementById('talkContent'),
	sendInput = document.getElementById('sendInput'),
	saveBtn = document.getElementById('saveBtn'), 
	realSendContent = document.getElementById('realSendContent'),
	faceEmoji = document.getElementById('faceEmoji'),
	defalutSelectContent = document.getElementById('defalutSelectContent'),
	showDefaultContent = document.getElementById('showDefaultContent'),
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
	if(/<div>/.test(realSendContent.innerHTML)) {
		realSendContent.innerHTML = '';
	}
	let val = realSendContent.innerHTML;
	if(val === '') { 	
		// alert('please input content');
		return;
	}
	createContentNode(val);
	socket.emit(CHAT, val);
	realSendContent.innerHTML = '';
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
	if(ev.keyCode === 13) {
		console.log(111);
		btnHanfler();
		return ;
	}
	realSendContent.innerHTML = '';
}
function toggleDefaultContent() {
	let ifShow = defalutSelectContent.style.display === 'block';
	defalutSelectContent.style.display = ifShow ? 'none' : 'block';
	showDefaultContent.className = !ifShow ? 'hide-default_content':'show-default_content' ;
}

function defaultContent(ev) {
	if(ev.target.nodeName !== 'LI') return;
	let val = ev.target.innerHTML;
	createContentNode(val);
	socket.emit(CHAT, val);
}	

function selectEmoji (ev) {
	if(ev.target.nodeName !== 'IMG') return;
	let emojiSrc = ev.target.src;
	// sendInput.value+=`<img src="${emojiSrc}">`;
	realSendContent.innerHTML+=`<img src="${emojiSrc}">`;
}
function focusInputContent() {
	console.log(666);
	defalutSelectContent.style.display = 'none';
	showDefaultContent.className = 'hide-default_content';
}
function listen() {
	saveBtn.addEventListener('click',btnHanfler,false);// 监听按钮点击
	faceEmoji.addEventListener('click',selectEmoji,false);// 监听点击表情的事件
	defalutSelectContent.addEventListener('click',defaultContent,false);// 默认选中文字的事件
	showDefaultContent.addEventListener('click',toggleDefaultContent,false);
	let data = getNickAndID();  // 得到这个房间的用户和ID
	socket.emit(JOINROOM, data); // 向房间里的其他人物发送信息
	socket.on(CHAT, updateList); // 得到别人的发送来的消息，更新DOM
	realSendContent.addEventListener('keydown',sendDateByEnter,false);
	realSendContent.addEventListener('focus',focusInputContent,false);
}

module.exports = {
	listen
}