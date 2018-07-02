<template>
    <div id="app">
        <header-section></header-section>
        <meme-maker></meme-maker>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import MemeMaker from './components/MemeMaker.vue';

export default {
    name: 'app',
    data () {
        return {
            message: 'Hello world from メ²！'
        }
    },
    components: {
        "header-section": Header,
        "meme-maker": MemeMaker
    }
};
</script>

<style>
@import '../node_modules/bulma/css/bulma.css';
</style>
