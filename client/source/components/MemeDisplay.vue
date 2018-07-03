<template>
    <div class="column is-9">
        <center>
            <img :src="memeUrl">
        </center>
    </div>
</template>

<script>
export default {
    props: ['memeUrl']
};
</script>

<style scoped>
div {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ccc;
    height: 100vh;
}

img {
    max-width: 100%;
    max-height: 80vh;
}
</style>
