<template>
    <div>top 10:</div>
    <table v-html="tableHtml">
    </table>
</template>
<style scoped> 
table{
   border-spacing: 0;   border-collapse: collapse;    
}
table:deep(tr > td){
    padding: 8px 42px;
    font-size: 24px;
}
table:deep(tr:nth-child(1)>td){
    font-size: 16px;
    color: var(--navbar-icon-color)
}
table:deep(tr:nth-child(even)){
    background-color: var(--darker-background-color) ;
}
</style>
<script lang="ts">
import axios, { Axios } from 'axios';
import { baseUrl } from '@/components/BaseUrl';
export default{
    data(){
        return {
            tableHtml:"",
            serverResponse:""
        }
    },
    mounted(){
        this.requestData();
    },
    methods:{
        requestData(){
            axios.get(baseUrl+"getLeaderboard")
              .then((res) => {
                this.generateTableHtml(res.data)
              })
              .catch((error) => {

                console.error(error);
              });
        },
        generateTableHtml(lbArray: any){
           let ret = ""; 
           lbArray.unshift(["name", "wpm"]);
           for(const entry of lbArray){
            ret+= `
                <tr>
                    <td>${entry[0]}</td>
                    <td>${entry[1]}</td>
                </tr>
            `;
           }
           this.tableHtml = ret;
        }

    }
}
    


</script>