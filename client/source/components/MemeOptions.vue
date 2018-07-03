<template>
    <aside class="column">
        <form
            enctype="multipart/form-data"
            @submit.prevent="generateMeme">

            <meme-logo></meme-logo>
            <br>

            Upload Image:<br>
            <input
                type="file"
                ref="image"
                @change="updateImage">
            <br><br>

            Top Text:<br>
            <textarea
                v-model="topText">
            </textarea><br>

            Bottom Text:<br>
            <textarea
                v-model="bottomText">
            </textarea><br><br>

            Font Size:<br>
            <input
                type="range"
                min="1"
                max="100"
                value="32"
                v-model="options['font-size']">
            <span>{{ options['font-size'] + ' px' }}</span>
            <br>

            Stroke Width:<br>
            <input
                type="range"
                min="0"
                max="10"
                value="2"
                v-model="options['stroke-width']">
            <span>{{ options['stroke-width'] + ' px' }}</span>
            <br>

            Padding:<br>
            <input
                type="range"
                min="0"
                max="100"
                value="0"
                v-model="options.padding">
            <span>{{ options.padding + ' px' }}</span>
            <br><br>

            Border:
            <input
                type="checkbox"
                v-model="options.border">
            <br><br>

            <button>Generate Meme</button>
        </form>
    </aside>
</template>

<script>
import Axios from 'axios';
import MemeLogo from './MemeLogo';

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
    },
    components: {
        'meme-logo': MemeLogo
    }
};
</script>

<style scoped>
aside {
    color: white;
    font-family: 'Nunito', sans-serif;
    font-size: 1em;
    background-color: #013243;
    width: 100%;
    height: 100vh;
}

form {
    margin: 10%;
}

span {
    position: relative;
    top: -5px;
    font-size: 0.8em;
}

textarea {
    width: 100%;
    height: 60px;
    resize: none;
    padding: 10px;
}

input[type="range"] {
    -webkit-appearance: none;
    width: 80%;
    height: 20px;
    background: linear-gradient(to right, #C5EFF7 0%, #C5EFF7 100%);
    background-size: 100% 10px;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    outline: none;
}

input[type="range"]:first-of-type {
    margin-top: 30px;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: #E4F1FE;
    position: relative;
    z-index: 3;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.3);
}

input[type="range"]::-webkit-slider-thumb:after {
    content: " ";
    width: 100%;
    height: 10px;
    position: absolute;
    z-index: 1;
    right: 20px;
    top: 5px;
    background: #E4F1FE;
    background: linear-gradient(to right, #f088fc 1%, #AC6CFF 70%);
}

button {
    width: 100%;
    outline: none;
    align-self: center;
    padding: 10px;
    font-size: 20px;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    font-weight: 600;
    background: #E4F1FE;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
}

input[type="checkbox"] {
    position: relative;
    top: 5px;
    left: 10px;
    -moz-appearance: none;
    -webkit-appearance: none;
    -o-appearance: none;
    position: relative;
    height: 20px;
    width: 40px;
    box-shadow: inset -20px 0px 0px 1px rgba(192, 192, 192, 0.5);
    background-color: white;
    border: 1px solid rgba(192, 192, 192, 1);
    outline: none;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    border: 1px solid #333;
}

input[type="checkbox"]:checked {
    box-shadow: inset 20px 0px 0px 1px rgba(33, 150, 243, 0.5);
    border: 1px solid #333;
}

input[type="checkbox"]::-ms-check {
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    opacity: 0;
}
</style>
