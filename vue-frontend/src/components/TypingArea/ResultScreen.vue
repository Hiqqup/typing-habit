<template>
    <div class="allResults">
        <div class="upperResults">
            <div class="dataPair">
                <p class="label">WPM</p>
                <p class="data">{{ wpm }}</p>
            </div>
            <div class="canvasContainer">
                <canvas id="resultChart" style=" width:100%;max-width:1400px;max-height:350px;"></canvas> 
            </div>
        </div>
        <div class="lowerResults">
            <div class="dataPair">
                <p class="label">AUTHOR</p>
                <p class="data">{{ author }}</p>
            </div>

        </div>
    </div>

</template>

<style scoped>
.lowerResults > div > .data{
    font-size: 20px
}
.lowerResults > div > .label{
    font-size: 16px
}
.canvasContainer{
    flex: 5;
    min-height: 350px;
}
.upperResults{
    display:flex;
    gap: 40px
}
.dataPair{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.label{
    margin: 0;
    color: var(--navbar-icon-color);
    font-size: 16px
}
.data{
    margin: 0;
    font-size: 48px;
    color: var(--logo-color);
}
.allResults{
    width: 100%;
};
</style>
<script lang="ts">
import { displayResultChart } from './ResultChart';
import type { ResultParameters } from './TypingField/TypingField.vue';

    export default{
        props: ["resultParameters"],
        data(){
            return{
                results: "",
                wpm: 0,
                author: "",
            };
        },
        methods:{
            showResults(parameters: ResultParameters){
                const wordCount = parameters.originalQuote.split(" ").length;
                const time = parameters.timeStamps[parameters.timeStamps.length -1] - parameters.timeStamps[0] 
                const wpm = wordCount/(time/60000)
                this.wpm = Math.round(wpm);
                parameters.wordCount = wordCount;
                this.author = parameters.author;
                displayResultChart(parameters);
            }    
        }
    };
</script>