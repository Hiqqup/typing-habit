import { Chart, type Color } from 'chart.js/auto';
import type { ResultParameters } from './TypingField/TypingField.vue';


const LOGO_COLOR = "#42b883";
const ICON_COLOR = "#8e8e8e";
const UNTYPED_COLOR = "#c8c8c8";
const DIV_MINUTE = 60000;
function addAlpha(color:Color, opacity :number) {
    // coerce values so it is between 0 and 1.
    var _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}
function getRawWpms(ts: Array<number>){
  let res =[];
  for(let i = 1 ; i < ts.length;i++){
    res.push( 1/(( ts[i] - ts[i-1])/DIV_MINUTE));
  }
  return res;
}
function getTotalWpms(ts: Array<number>){
  let res =[];
  for(let i = 1 ; i < ts.length;i++){
    res.push( i/(( ts[i] - ts[0])/DIV_MINUTE));
  }
  return res;
}
function getXValues(wordCount:number){
  let res = [1];
  for(let i=2 ;i< wordCount;i++) res.push(i)
  res.push(wordCount);
  return res;
}
function displayResultChart(parameters:ResultParameters){
    const xValues = getXValues(parameters.wordCount);
    Chart.defaults.font = {
        family: 'Roboto Mono',
        size: 14,
    };
    Chart.defaults.color = UNTYPED_COLOR;
    return new Chart("resultChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          data: getTotalWpms(parameters.timeStamps),
          borderColor: LOGO_COLOR ,
          fill: false
        },{
          data: getRawWpms(parameters.timeStamps),
          borderColor: ICON_COLOR,
          fill: true,
          backgroundColor: addAlpha(ICON_COLOR, 0.1)
        },]
      },
      options: {
        elements: {
            line: {
              tension: 0.2
            }
        },
        plugins:{
          legend:{
            display: false,
          }
        }
      }
    });
}
export {displayResultChart};