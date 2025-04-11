import axios from 'axios';
//import type TypingField from "./TypingField.vue";
function getQuote(this: any/*InstanceType<typeof TypingField>*/) {
//const path = 'http://localhost:5000/ping';
const path = 'https://hiqqup.pythonanywhere.com/ping';
axios.get(path)
  .then((res) => {
    this.quote = res.data.quote;
    this.resultParameters.author = res.data.author
    this.resultParameters.originalQuote = this.quote;
    //this.quote="ea"
  })
  .catch((error) => {

    console.error(error);
  });

}
export {getQuote};