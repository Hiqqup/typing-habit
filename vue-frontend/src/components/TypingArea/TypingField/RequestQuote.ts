import axios from 'axios';
//import type TypingField from "./TypingField.vue";
function getQuote(this: any/*InstanceType<typeof TypingField>*/) {
//const path = 'http://localhost:5000/ping';
const path = 'https://hiqqup.pythonanywhere.com/ping';
axios.get(path)
  .then((res) => {
    this.quote = res.data.quote;
    this.author = res.data.author
  })
  .catch((error) => {

    console.error(error);
  });

}
export {getQuote};