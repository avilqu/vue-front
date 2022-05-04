<template>
    <div class="col-sm-12">
        <h3>Oops... We couldn't find what you're looking for.</h3>
        <br />
    </div>
</template>

<script>
export default {
    computed: {
        auth() {
            return this.$store.state.auth.user;
        }
    }
};
</script>

<style></style>
