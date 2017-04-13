import '../style/commes.css';
import '../style/style.scss';
import '../../../src/js/global';
import '../../../src/js/drawtable';
import '../style/normalize.css';
import '../style/talk.scss';
import talkObj from './talk.js';
let saveBtn = document.getElementById('saveBtn');
talkObj.listen(); // 监听聊天的所有
saveBtn.addEventListener('click',talkObj.btnHanfler,false);// 监听按钮点击事件