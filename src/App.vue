<template>
    <div class="container-fluid">
        <div class="row" id="__main-row">
            <app-header v-if="!login"></app-header>
            <main class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <app-alerts></app-alerts>
                <router-view />
            </main>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Alerts from '@/components/Alerts.vue';

export default {
    data: function () {
        return {
            login: false
        };
    },

    computed: {
        auth() {
            return this.$store.state.auth.user;
        }
    },

    watch: {
        $route() {
            this.$store.commit('alert/reset');
            this.testLogin();
        }
    },

    components: {
        'app-header': Header,
        'app-alerts': Alerts
    },

    methods: {
        async testLogin() {
            if (this.$route.path == '/login') this.login = true;
            else this.login = false;
        }
    }
};
</script>

<style>
@import './assets/css/main.css';
</style>
