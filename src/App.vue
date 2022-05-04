<template>
    <div class="container-fluid">
        <!-- <div class="row" id="__main-row" v-if="auth"> -->
        <div class="row" id="__main-row">
            <app-header></app-header>
            <!-- <app-menu></app-menu> -->
            <main class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <app-alerts></app-alerts>
                <router-view />
            </main>
        </div>
        <!-- <div id="__main-row" v-else>
            <main>
                <app-alerts></app-alerts>
                <router-view />
            </main>
        </div> -->
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Alerts from '@/components/Alerts.vue';
// import Menu from '@/components/Menu.vue';

export default {
    computed: {
        auth() {
            return this.$store.state.auth.user;
        }
    },

    watch: {
        $route() {
            this.$store.commit('alert/reset');
        }
    },

    components: {
        'app-header': Header,
        'app-alerts': Alerts
        // 'app-menu': Menu
    }
};
</script>

<style>
/* @import '/assets/css/main.css'; */
html,
body {
    height: 100%;
}

body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
}

.container-fluid {
    margin-top: 55px;
}

#__main-row {
    height: 100%;
}

main {
    padding-top: 30px;
    padding-bottom: 50px;
}

.__link {
    color: #00bc8c;
    cursor: pointer;
}

.__secondary {
    color: #666 !important;
}
</style>
