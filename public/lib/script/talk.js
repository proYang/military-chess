let talkContent = document.getElementById('talkContent'),
	sendInput = document.getElementById('sendInput');

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
	createContentNode (val);
	// 通过localstroge得到用户id
	// alert(54);
	// TODO 发送websocket
	// 监看
}

module.exports = {
	btnHanfler
}