<template>
    <div class="typing-field">
  <span v-html="typedSpans" ></span>
    <span class="cursor">|</span>
    <span class="untyped">{{ quote }}</span>
    <div>{{ results }}</div>
        </div>
</template>


<style > /*scoped -- i would like this to be scoped*/
.typed{
    color: var(--navbar-icon-color);
}

.wronglyTyped{
    color: var(--wrongly-typed-color);
}
.cursor{
    color: var(--logo-color);
    position:absolute;
    transform:translateX(-50%) translateY(-5%);
}
</style>
<script lang="ts">

import { handleBackspace, handleKeyDown, type TypedOutLetter } from './HandleInput';
import { getQuote } from './RequestQuote';
import { matchQuote } from './TypingLogic';

  export default {
    name: "TyingField",
    data(){
      return{
        author: "",
        quote: "",
        typed: [] as Array<TypedOutLetter>,
        wronglyTyped: "",
        typedSpans:"",
        results: "",
      }
    },
    methods:{
      showResults(){
        this.results = "by " + this.author;
        this.typed.push({letter: " ", correct: true});
      },
      getQuote,
      matchQuote,
      handleKeyDown,
      handleBackspace,
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
