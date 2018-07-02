<template>
    <section class="columns">
        <meme-options></meme-options>
        <meme-display></meme-display>
    </section>
</template>

<script>
import MemeDisplay from './MemeDisplay';
import MemeOptions from './MemeOptions';

export default {
    components: {
        'meme-display': MemeDisplay,
        'meme-options': MemeOptions
    }
};
</script>
