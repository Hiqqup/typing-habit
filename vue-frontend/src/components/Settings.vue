<template>
    <div class="leaderboardName">
    <p>Leaderboard Name: </p>
    <input v-model="leaderBoardName"  type="text" placeholder="Your Leaderboard Name ">
    <button @click="saveLeaderBoardName">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>
    </button>
    </div>

</template>
<style scoped>

    
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
    border-radius: 5px;
    padding: 4px 2px;
    color: var(--untyped-text-color);
    fill: var(--untyped-text-color);
    background-color: var(--darker-background-color) ;
    border: none;
}
.leaderboardName > button:hover{
    color: var(--background-color);
    fill: var(--background-color);
    background-color: var(--untyped-text-color);
}
.leaderboardName > button:active{
    color: var(--untyped-text-color);
    fill: var(--untyped-text-color);
    background-color: var(--navbar-icon-color);
}
.leaderboardName > button{
    font-family: "Roboto Mono";
    padding:  2px 8px;
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