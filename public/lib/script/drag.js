let chessEls = document.getElementsByClassName('chesspiece');
let dragEl;



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

export function setDrop(){
  let hovers = document.getElementsByClassName('hover');
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

}



for (let chessEl of chessEls) {
    setDrag(chessEl);
}
