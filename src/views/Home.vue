<template>
    <div class="col-sm-12">
        <h1 v-if="auth">Welcome, {{ auth.name }}</h1>
        <h1 v-else>Welcome</h1>
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
