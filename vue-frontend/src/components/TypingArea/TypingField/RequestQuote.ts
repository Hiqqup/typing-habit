import axios from 'axios';
import { baseUrl } from '@/components/BaseUrl';
function getQuote(this: any/*InstanceType<typeof TypingField>*/) {
  const path = baseUrl+"getQuote";
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