import axios from "axios";
import { baseUrl } from "@/components/BaseUrl";

function submitResults(wpm: number){
    let lbName = localStorage.getItem("leaderBoardName");
    if(lbName === null ) {
        console.log("invalid name")
        return;
    }
    axios.post(baseUrl +'submitResults', {
    lbName,
    wpm
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
export {submitResults};