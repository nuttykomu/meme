<template>
    <div class="column is-9">
        <img :src="memeUrl">
    </div>
</template>

<script>
export default {
    props: ['memeUrl']
};
</script>

<style scoped>
div {
    margin: 20px;
}
</style>
