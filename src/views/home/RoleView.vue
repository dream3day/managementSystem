<template>
    {{obj1.fullName()}}
</template>

<script setup lang="ts">
    import { ref,reactive } from "vue";
    const OnOff=ref(false)
    class Man{
        name={
            fristName:'zhang',
            lastName:'san'
        };
        fullName(){
            return this.name.fristName+this.name.lastName
        }
    }
    const obj1=new Man()
    const obj2=obj1
    obj2.name.fristName='li'
</script>

<style scoped>
</style>