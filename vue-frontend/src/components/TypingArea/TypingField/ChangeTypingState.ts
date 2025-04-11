function setProperties(p:Array<string>,){
  const root: HTMLElement | null = document.querySelector(':root');
  if(!root)return;
  root.style.setProperty('--icon-visibility', p[0]);
  root.style.setProperty('--actual-title-color',p[1] );
}

function setTyping(){
  setProperties(["hidden",'var(--navbar-icon-color)']);
}

function unsetTyping(){
  setProperties(['visible','var(--title-active-color)'])
}

export {unsetTyping, setTyping};