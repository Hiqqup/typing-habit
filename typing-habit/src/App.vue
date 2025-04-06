    <script setup lang="ts">
  import Ping from "./components/Ping.vue";
</script>
<template>

  <Ping></Ping>
  <span v-html="typedSpans" ></span>
    <span class="cursor">|</span>
    <span class="untyped">{{ quote }}</span>
    <div>{{ debug }}</div>
</template>

<script lang="ts">
  type TypedOutLetter  ={
    letter: string,
    correct: boolean
  };

  import { defineComponent } from 'vue';
  export default defineComponent({
    name: "App",
    mounted() {
      document.addEventListener("keydown", this.handleKeyDown );
    },
    unmounted() {
      document.removeEventListener("keydown", this.handleKeyDown );
    },
    data(){
      return{
        quote: "There is nothing permanent except change",
        typed: [] as Array<TypedOutLetter>,
        wronglyTyped: "",
        typedSpans:"",
        debug: "",
      }
    },
    methods:{



      matchQuote(letter: string){
        if(letter === this.quote.charAt(0)){
          this.quote = this.quote.substring(1);
          this.typed.push({letter, correct: true});
        }
        //else if(letter!== " "){ }
        else {
          letter =this.quote.charAt(0)
          this.typed.push({letter, correct: false});
          this.quote = this.quote.substring(1);
        }
      },
      getTypedSpans(){
        let res = "";
        this.typed.forEach(tol => {
          res+=`<span class="${tol.correct? "typed" : "wronglyTyped"}">${tol.letter}</span>`;
        });
        return res;
      },
      handleBackspace(){
        const lastTypedLetter = this.typed[this.typed.length-1].letter;
        if (lastTypedLetter == " ") return;
        this.typed.pop();
        this.quote = lastTypedLetter + this.quote;
      },
      handleKeyDown(e: Event){
          if (e instanceof KeyboardEvent){
            if(e.key.length === 1) this.matchQuote(e.key);
            else if(e.key == "Backspace") this.handleBackspace();
            this.typedSpans = this.getTypedSpans();
        }

      },
    }
  });
</script>
