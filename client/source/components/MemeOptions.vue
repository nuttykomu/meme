<template>
    <aside class="column is-3">
        <form>
            Meme Image:<br>
            <input type="file"><br>
            Top Text:<br>
            <textarea></textarea><br>
            Bottom Text:<br>
            <textarea></textarea><br>
            Font Size:<br>
            <input type="range" min="1" max="100" value="32" class="slider"><br>
            Stroke Width:<br>
            <input type="range" min="0" max="10" value="2" class="slider"><br>
            Padding:<br>
            <input type="range" min="0" max="100" value="0" class="slider"><br>
            Border:
            <input type="checkbox"><br>
            <button>Generate Meme</button>
        </form>
    </aside>
</template>

<script>
</script>

<style scoped>
form {
    margin: 20px;
}
</style>

