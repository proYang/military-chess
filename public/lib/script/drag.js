let chessEls = document.getElementsByClassName('chesspiece');
let dragEl;
let hovers = document.getElementsByClassName('hover');


function setDrag(chessEl) {
    chessEl.ondragstart = function(ev){
        ev.dataTransfer.effectAllowed = 'move';
        dragEl = ev.target;
    };
    chessEl.ondragend = function (ev){
        dragEl = null;
        return false;
    }
}

for(var hover of hovers) {
    hover.ondragover = function (ev){
        ev.preventDefault();
        return true;
    };
    hover.ondrop = function (ev) {
        console.log(dragEl);
        let chessItem = document.createElement('div');
        chessItem.className = 'chesspiece' + ' ' + 'chesspiece-blue' + ' ' + 'chesspiece-table';
        chessItem.setAttribute('draggable','true');
        setDrag(chessItem);
        if(dragEl){
            chessItem.innerHTML = dragEl.innerHTML;
            dragEl.parentNode.removeChild(dragEl);
        }
        this.appendChild(chessItem);

    }
}


for (let chessEl of chessEls) {
    setDrag(chessEl);
}
