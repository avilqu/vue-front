<template>
    <div class="col-sm-12">
        <h1>Profile</h1>
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
