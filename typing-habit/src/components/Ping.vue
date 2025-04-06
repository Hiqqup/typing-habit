<template>
    <div>{{ msg }}</div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
      import axios from 'axios';
    export default defineComponent({
        name: "ping",
        data(){
            return{
                msg: "",
            }
        },
        mounted() {
          this.getMessage();
        },
        methods:{
                
              getMessage() {
                const path = 'http://localhost:5000/ping';
                //const path = 'https://hiqqup.pythonanywhere.com/ping';
                axios.get(path)
                  .then((res) => {
                    this.msg = res.data;
                  })
                  .catch((error) => {

                    console.error(error);
                  });
              },
        }
    })
</script>