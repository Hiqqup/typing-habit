<template>
    <div class="typing-field">
  <span v-html="typedSpans" ></span>
    <span class="cursor">|</span>
    <span class="untyped">{{ quote }}</span>
    <div>{{ results }}</div>
        </div>
</template>


<style>
main{
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 30px;
    margin: 0 100px;
    text-align: left;
}
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
  type TypedOutLetter  ={
    letter: string,
    correct: boolean
  };

  import axios from 'axios';
  export default {
    name: "TyingField",
    mounted() {
      this.getQuote();
      document.addEventListener("keydown", this.handleKeyDown );
    },
    unmounted() {
      document.removeEventListener("keydown", this.handleKeyDown );
    },
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
      getQuote() {
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

      },
      showResults(){
        this.results = "by " + this.author;
        this.typed.push({letter: " ", correct: true});
      },
      matchQuote(letter: string){
        if(letter === this.quote.charAt(0)){
          this.quote = this.quote.substring(1);
          this.typed.push({letter, correct: true});
          if(this.quote.length == 0) this.showResults();
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
  };
</script>
