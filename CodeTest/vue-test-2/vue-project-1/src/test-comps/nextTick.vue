<template>
    <div id="counter">{{ count }}</div>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {
                count: 2,
            }
        },
        mounted() {
            this.count = 100;
            console.log(document.getElementById('counter').innerHTML);
            // this.$nextTick(() => {
            //     console.log(document.getElementById('counter').innerHTML);
            // })
        }
    }
</script>

<style lang="scss" scoped>

</style>