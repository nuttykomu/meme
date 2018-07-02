<template>
    <section class="columns">
        <meme-options @generate="updateUrl"></meme-options>
        <meme-display :meme-url="memeUrl"></meme-display>
    </section>
</template>

<script>
import MemeDisplay from './MemeDisplay';
import MemeOptions from './MemeOptions';

export default {
    data () {
        return {
            'memeUrl': ''
        };
    },
    methods: {
        updateUrl (url) {
            this.memeUrl = url;
        }
    },
    components: {
        'meme-display': MemeDisplay,
        'meme-options': MemeOptions
    }
};
</script>
