<template>
    <aside class="column is-4">
        <form
            enctype="multipart/form-data"
            @submit.prevent="generateMeme">

            Meme Image:<br>
            <input
                type="file"
                ref="image"
                @change="updateImage">
            <br>

            Top Text:<br>
            <textarea
                v-model="topText">
            </textarea><br>

            Bottom Text:<br>
            <textarea
                v-model="bottomText">
            </textarea><br>

            Font Size:<br>
            <input
                type="range"
                min="1"
                max="100"
                value="32"
                class="slider"
                v-model="options['font-size']">
            <br>

            Stroke Width:<br>
            <input
                type="range"
                min="0"
                max="10"
                value="2"
                class="slider"
                v-model="options['stroke-width']">
            <br>

            Padding:<br>
            <input
                type="range"
                min="0"
                max="100"
                value="0"
                class="slider"
                v-model="options.padding">
            <br>

            Border:
            <input
                type="checkbox"
                v-model="options.border">
            <br>

            <button>Generate Meme</button>
        </form>
    </aside>
</template>

<script>
import Axios from 'axios';

export default {
    data () {
        return {
            topText: '',
            bottomText: '',
            options: {
                'image': null,
                'font-size': 32,
                'stroke-width': 0,
                'padding': 0,
                'border': true
            }
        };
    },
    methods: {
        updateImage () {
            // Update image property.
            this.options.image = this.$refs.image.files[0];

            // Preview the image in the MemeDisplay component.
            const url = URL.createObjectURL(this.options.image);
            this.$emit('generate', url);
        },
        generateMeme () {
            // Escape new lines.
            this.options['top-text'] = this.topText.replace(/\n/g, '\\n');
            this.options['bottom-text'] = this.bottomText.replace(/\n/g, '\\n');

            // Construct request payload.
            const payload = new FormData();
            Object.entries(this.options).forEach(
                ([key, value]) => payload.append(key, value)
            );

            // Set HTTP headers.
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            // Generate the meme.
            Axios.post('/generate', payload, config)
                .then(response => {
                    // Emit image URL to parent component.
                    this.$emit('generate', response.data);
                })
                .catch(error => {
                    // Output error message.
                    console.log(error);
                });
        }
    }
};
</script>

<style scoped>
form {
    margin: 20px;
}
</style>
