let chessEls = document.getElementsByClassName('chesspiece');
let dragEl;
var hovers = document.getElementsByClassName('hover');
for(var hover of hovers) {
    hover.ondragover = function (ev){
        console.log(3);
        ev.preventDefault();
        return true;
    };
    hover.ondrop = function (ev) {
        console.log(dragEl);
        let chessItem = document.createElement('div');
        chessItem.className = 'chesspiece' + ' ' + 'chesspiece-blue' + ' ' + 'chesspiece-table';
        if(dragEl){
            chessItem.innerHTML = dragEl.innerHTML;
            dragEl.parentNode.removeChild(dragEl);
        }
        this.appendChild(chessItem);

    }
}


for (let chessEl of chessEls) {

    chessEl.ondragstart = function(ev){
        ev.dataTransfer.effectAllowed = 'move';
        dragEl = ev.target;
    };
    chessEl.ondragend = function (ev){
        dragEl = null;
        return false;
    }
}
