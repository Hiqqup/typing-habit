<template>
    <div class="leaderboardName">
    <p>Leaderboard Name: </p>
    <input v-model="leaderBoardName"  type="text" placeholder="Your Leaderboard Name ">
    <button @click="saveLeaderBoardName">Save</button>
    </div>

</template>
<style scoped>

:root{
    /*colors*/
    --logo-color: #42b883;
    --title-active-color: #e5e2cb;
    --navbar-icon-color: #8e8e8e;
    --untyped-text-color: #c8c8c8;
    --background-color: #323437;
    --wrongly-typed-color: #be4147;
}
    
p{
    font-size: 20px;
    margin: 0;
}
.leaderboardName{
    display: flex;
    gap: 20px;
    align-items:  center;
}
.leaderboardName > input:focus{
    outline: var(--untyped-text-color) 1px solid;
}
.leaderboardName > input{
    background-color: var(--background-color);
    font-family: "Roboto Mono";
    width: 250px;
    font-size: 16px;
    padding: 4px px;
}

.leaderboardName > button,
.leaderboardName > input{
    font-size: 16px;
    border: var(--navbar-icon-color) 2px solid;
    border-radius: 5px;
    padding: 4px 2px;
    color: var(--untyped-text-color)
}
.leaderboardName > button:active{
    border: var(--untyped-text-color) 2px solid;
    transform: translateY(1px);
    
}
.leaderboardName > button{
    background-color: var(--background-color);
    font-family: "Roboto Mono";
}
    
</style>
<script lang="ts">
    export default{
        data(){
            return{
                leaderBoardName: "",
            };
        },
        methods:{
            saveLeaderBoardName(){
                localStorage.setItem("leaderBoardName",this.leaderBoardName);
            }
        },
        mounted(){
            let lbn = localStorage.getItem("leaderBoardName");
            this.leaderBoardName =  lbn!== null? lbn:"";
        }
    }
</script>