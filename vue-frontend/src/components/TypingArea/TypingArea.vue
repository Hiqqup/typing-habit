<script lang="ts" setup>
import TypingField, { type ResultParameters } from './TypingField/TypingField.vue';
import ResultScreen from './ResultScreen.vue';
</script>
<template>

<TypingField  v-show="showTypingField" ref="typing_field" @showResults="showResults"></TypingField>

<ResultScreen v-show="!showTypingField" ref="result_screen"  ></ResultScreen>

<svg @click="reset()" class="reload greyIcon" :height="reloadIconSize" viewBox="0 -960 960 960" :width="reloadIconSize"  >
    <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
</svg>
</template>
<style scoped>
</style>
<script lang="ts">
    export default 
    {
        data(){
            return{
                showTypingField: true,
                reloadIconSize: 42,
                results: "",
            }
        },
        methods:{
            reset(){
                this.showTypingField = true;
                 (this.$refs.typing_field as  InstanceType<typeof TypingField>).reset()               
            },
            showResults(parameters: ResultParameters){
                this.showTypingField = false;
                (this.$refs.result_screen as  InstanceType<typeof ResultScreen>).showResults(parameters);
            }
        }
    };
</script>
