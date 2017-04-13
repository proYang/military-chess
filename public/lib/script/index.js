import '../style/normalize.css';
import '../style/talk.scss';
import talkObj from './talk.js';
let saveBtn = document.getElementById('saveBtn');

saveBtn.addEventListener('click',talkObj.btnHanfler,false);