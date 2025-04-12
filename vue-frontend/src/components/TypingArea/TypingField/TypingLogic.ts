import type TypingField from "./TypingField.vue";


function checkFirstTimeStamp(this: InstanceType<typeof TypingField>){
  if(this.resultParameters.timeStamps.length === 0){//fist time stampt
    addTimestamp.call(this);
  }
}
function addTimestamp(this: InstanceType<typeof TypingField>){
  this.resultParameters.timeStamps.push( (new Date()).getTime());
}
function handleCorrectSpace(this: InstanceType<typeof TypingField>){
  let wordCorrect = true;
  for(let i = this.typed.length - 2; i>=0; i--){
    if(!this.typed[i].correct){ 
      wordCorrect = false;
      break;
    }
    if(this.typed[i].correct && this.typed[i].letter===" "){break;}
  }
  if(wordCorrect){
    this.typed[this.typed.length-1].cantDelete = true;
    this.resultParameters.correctlyTypedWordCount++;
    addTimestamp.call(this);
  }
}

function matchQuote(this: InstanceType<typeof TypingField>, letter: string){
  checkFirstTimeStamp.call(this);
  if(letter === this.quote.charAt(0)){
    this.quote = this.quote.substring(1);
    this.typed.push({letter, correct: true, cantDelete:false});
    if(letter === " ") handleCorrectSpace.call(this);
    if(this.quote.length == 0) this.showResults();
  }
  else {
    letter =this.quote.charAt(0)
    this.typed.push({letter, correct: false, cantDelete: false});
    this.quote = this.quote.substring(1);
  }
}
export {matchQuote};