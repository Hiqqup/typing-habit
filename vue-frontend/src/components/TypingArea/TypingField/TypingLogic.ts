import type TypingField from "./TypingField.vue";


function checkFirstTimeStamp(this: InstanceType<typeof TypingField>){
  if(this.resultParameters.timeStamps.length === 0){//fist time stampt
    addTimestamp.call(this);
  }
}
function addTimestamp(this: InstanceType<typeof TypingField>){
  this.resultParameters.timeStamps.push( (new Date()).getTime());
}

function matchQuote(this: InstanceType<typeof TypingField>, letter: string){
  checkFirstTimeStamp.call(this);
  if(letter === this.quote.charAt(0)){
    this.quote = this.quote.substring(1);
    this.typed.push({letter, correct: true});
    if(letter === " ") addTimestamp.call(this);
    if(this.quote.length == 0) this.showResults();
  }
  else {
    letter =this.quote.charAt(0)
    this.typed.push({letter, correct: false});
    this.quote = this.quote.substring(1);
  }
}
export {matchQuote};