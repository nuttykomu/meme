<template>
    <aside class="column is-3">
        <form
            enctype="multipart/form-data"
            @submit.prevent="generateMeme"
        >

            Meme Image:<br>
            <input
                type="file"
                ref="image"
                @change="updateImage"
            ><br>

            Top Text:<br>
            <textarea
                v-model="options['top-text']"
            ></textarea><br>

            Bottom Text:<br>
            <textarea
                v-model="options['bottom-text']"
            ></textarea><br>

            Font Size:<br>
            <input
                type="range"
                min="1"
                max="100"
                value="32"
                class="slider"
                v-model="options['font-size']"
            ><br>

            Stroke Width:<br>
            <input
                type="range"
                min="0"
                max="10"
                value="2"
                class="slider"
                v-model="options['stroke-width']"
            ><br>

            Padding:<br>
            <input
                type="range"
                min="0"
                max="100"
                value="0"
                class="slider"
                v-model="options.padding"
            ><br>

            Border:
            <input
                type="checkbox"
                v-model="options.border"
            ><br>

            <button>Generate Meme</button>
        </form>
    </aside>
</template>

<script>
export default {
    data () {
        return {
            options: {
                'image': null,
                'top-text': '',
                'bottom-text': '',
                'font-size': 32,
                'stroke-width': 0,
                'padding': 0,
                'border': true
            }
        };
    },
    methods: {
        updateImage () {
            this.options.image = this.$refs.image.files[0];
        },
        generateMeme () {
            console.log(this.options);
        }
    }
};
</script>

<style scoped>
form {
    margin: 20px;
}
</style>
