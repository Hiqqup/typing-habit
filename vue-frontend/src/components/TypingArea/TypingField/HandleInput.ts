import type TypingField from "./TypingField.vue";
  type TypedOutLetter  ={
    letter: string,
    correct: boolean
  };
//functions that do not access the component
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

// functions that alter the component (notice this type any)
function handleBackspace(this: InstanceType<typeof TypingField>){
    const lastTypedLetter = this.typed[this.typed.length-1].letter;
    if (lastTypedLetter == " ") return;
    this.typed.pop();
    this.quote = lastTypedLetter + this.quote;
}
function handleKeyDown(this: InstanceType<typeof TypingField>, e: Event,){
      if (e instanceof KeyboardEvent){
        preventDefaults(e);
        if(e.key.length === 1) this.matchQuote(e.key);
        else if(e.key == "Backspace") this.handleBackspace();
        this.typedSpans = getTypedSpans(this.typed);
    }

}
export {handleKeyDown, handleBackspace};
export type{TypedOutLetter};