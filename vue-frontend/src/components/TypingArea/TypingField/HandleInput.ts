import type TypingField from "./TypingField.vue";
import { setTyping, unsetTyping } from "./ChangeTypingState";
  type TypedOutLetter  ={
    letter: string,
    correct: boolean
  };
//functions that do not access the component
function setTypingState(str: string){
  if(str.length === 1){
    setTyping();
  }else if(str == "Escape"){
    unsetTyping();
  }
}
function preventDefaults(e:KeyboardEvent){
    if(e.key == "Backspace"|| e.key == "'"){
      e.preventDefault();
    }
}
function  getTypedSpans(typed:Array<TypedOutLetter>){
    let res = "";
    typed.forEach(tol => {
      res+=`<span class="${tol.correct? "typed" : "wronglyTyped"}">${tol.letter}</span>`;
    });
    return res;
}

// functions that alter the component (notice this type )
function handleBackspace(this: InstanceType<typeof TypingField>){
    const lastTypedLetter = this.typed[this.typed.length-1].letter;
    const correct = this.typed[this.typed.length-1].correct
    if (lastTypedLetter == " " && correct) return;
    this.typed.pop();
    this.quote = lastTypedLetter + this.quote;
}

function handleKeyDown(this: InstanceType<typeof TypingField>, e: Event,){
      if (e instanceof KeyboardEvent){
        setTypingState(e.key);
        preventDefaults(e);
        if(e.key.length === 1) {
          this.matchQuote(e.key);
        }
        else if(e.key == "Backspace") handleBackspace.call(this);
        this.typedSpans = getTypedSpans(this.typed);
    }

}
export {handleKeyDown,  };
export type{TypedOutLetter};