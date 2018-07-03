<template>
    <div id="app">
        <meme-maker></meme-maker>
    </div>
</template>

<script>
import MemeMaker from './components/MemeMaker.vue';

export default {
    name: 'app',
    data () {
        return {
            message: 'Hello world from メ²！'
        }
    },
    components: {
        "meme-maker": MemeMaker
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito');
@import '../node_modules/bulma/css/bulma.css';

html, body {
    height: 100%;
}
</style>
