<template>
    <nav class="navbar navbar-dark bg-dark mb-4 fixed-top shadow">
        <router-link tag="a" :to="'/'" class="navbar-brand">
            <img class="mb-4" src="./../assets/logo.png" />
        </router-link>

        <div v-if="auth" class="dropdown ml-auto">
            <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-once
            >
                {{ auth.name }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <router-link
                    tag="a"
                    :to="'/user/' + auth._id"
                    class="dropdown-item"
                >
                    Profile
                </router-link>
                <a class="dropdown-item" @click="logout()"> Logout </a>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        auth() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        async logout() {
            this.$store.dispatch('auth/logout');
        }
    }
};
</script>

<style>
@import './../assets/css/header.css';
</style>
