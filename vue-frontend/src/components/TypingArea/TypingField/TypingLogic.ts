import type TypingField from "./TypingField.vue";

function matchQuote(this: InstanceType<typeof TypingField>, letter: string){
  if(letter === this.quote.charAt(0)){
    this.quote = this.quote.substring(1);
    this.typed.push({letter, correct: true});
    if(this.quote.length == 0) this.showResults();
  }
  else {
    letter =this.quote.charAt(0)
    this.typed.push({letter, correct: false});
    this.quote = this.quote.substring(1);
  }
}
export {matchQuote};