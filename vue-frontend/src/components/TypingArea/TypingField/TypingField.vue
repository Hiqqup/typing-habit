<template>
    <div class="typing-field">
  <span v-html="typedSpans" ></span>
    <span class="cursor">|</span>
    <span class="untyped">{{ quote }}</span>
        </div>
</template>


<style > /*scoped -- i would like this to be scoped*/
.typed{
    color: var(--navbar-icon-color);
}

.wronglyTyped{
    color: var(--wrongly-typed-color);
    text-decoration: underline;
}
.cursor{
    color: var(--logo-color);
    position:absolute;
    transform:translateX(-50%) translateY(-5%);
}
</style>
<script lang="ts">

import { unsetTyping } from './ChangeTypingState';
import { handleKeyDown, type TypedOutLetter } from './HandleInput';
import { getQuote } from './RequestQuote';
import { matchQuote } from './TypingLogic';

  function getInitialData(){
   return{
        quote: "",
        typed: [] as Array<TypedOutLetter>,
        typedSpans:"",
        
        resultParameters:{
          originalQuote: "",
          timeStamps: [] as Array<number>,
          author: "",
          correctlyTypedWordCount: 0,
        }
      }
  }

  export type ResultParameters = ReturnType<typeof getInitialData>["resultParameters"];

  export default {
    name: "TyingField",
    data(){
      return getInitialData();
     },
    methods:{
      reset(){
        Object.assign(this.$data, getInitialData());
        this.getQuote();
      },
      showResults(){
        this.resultParameters.timeStamps.push((new Date()).getTime());
        unsetTyping();
        this.$emit("showResults", this.resultParameters);
      },
      getQuote,
      matchQuote,
      handleKeyDown,
      
    },
    mounted() {
      this.getQuote();
      document.addEventListener("keydown", this.handleKeyDown );
    },
    unmounted() {
      document.removeEventListener("keydown", this.handleKeyDown );
    },
  };
</script>
