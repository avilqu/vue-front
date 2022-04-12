<template>
    <div class="col-sm-12">
        <div class="__auth-card card text-center">
            <div class="card-header">
                <ul
                    class="nav nav-tabs nav-justified md-tabs indigo"
                    role="tablist"
                >
                    <!-- Login tab intro -->
                    <li class="nav-item">
                        <a
                            class="nav-link active"
                            data-toggle="tab"
                            href="#__login"
                            role="tab"
                            aria-controls="__login"
                            aria-selected="true"
                            >Login</a
                        >
                    </li>

                    <!-- Register tab intro -->
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            data-toggle="tab"
                            href="#__register"
                            role="tab"
                            aria-controls="__register"
                            aria-selected="false"
                            >Register</a
                        >
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content">
                    <!-- Login tab -->
                    <div
                        class="tab-pane fade show active"
                        id="__login"
                        role="tabpanel"
                    >
                        <div v-if="!showResetForm">
                            <h5 class="card-title mb-3">
                                <strong>Login</strong>
                            </h5>
                            <form>
                                <label for="inputEmail" class="sr-only"
                                    >Email address</label
                                >
                                <input
                                    type="email"
                                    id="inputEmail"
                                    class="form-control bg-dark text-light mb-2"
                                    placeholder="Email address"
                                    :class="{
                                        __invalid: !validation.login.email
                                    }"
                                    autofocus
                                    v-model="formData.login.email"
                                />
                                <label for="inputPassword" class="sr-only"
                                    >Password</label
                                >
                                <input
                                    type="password"
                                    id="inputPassword"
                                    class="form-control bg-dark text-light"
                                    placeholder="Password"
                                    :class="{
                                        __invalid: !validation.login.password
                                    }"
                                    v-model="formData.login.password"
                                />
                                <p
                                    class="__link __secondary mt-2 mb-2 text-muted text-right small"
                                    @click="
                                        showResetForm = true;
                                        title = 'Reset your password';
                                    "
                                >
                                    Forgot your password?
                                </p>
                                <br />
                                <button
                                    type="submit"
                                    class="btn btn-outline-success btn-block"
                                    @click.prevent="login()"
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                        <div v-else>
                            <h5 class="card-title mb-3">
                                <strong>Reset your password</strong>
                            </h5>
                            <p class="mb-3 text-center text-muted">
                                You will receive a secure link to reset your
                                password.
                            </p>
                            <form>
                                <input
                                    type="email"
                                    id="emailReset"
                                    class="form-control bg-dark text-light mb-3"
                                    :class="{
                                        __invalid: !validation.passwordReset
                                            .email
                                    }"
                                    placeholder="Email address"
                                    autofocus
                                    v-model="formData.passwordReset.email"
                                />
                                <button
                                    type="submit"
                                    class="btn btn-outline-success btn-block"
                                    @click.prevent="requestResetToken()"
                                >
                                    Send
                                </button>
                            </form>
                            <p
                                class="__link mt-3 mb-3 text-muted"
                                @click="
                                    showResetForm = false;
                                    title = 'Login';
                                "
                            >
                                Back to login
                            </p>
                        </div>
                    </div>

                    <!-- Register tab -->
                    <div class="tab-pane fade" id="__register" role="tabpanel">
                        <h5 class="card-title mb-3">
                            <strong>Create an account</strong>
                        </h5>
                        <form>
                            <label for="inputName" class="sr-only">Name</label>
                            <input
                                type="text"
                                id="userName"
                                class="form-control bg-dark text-light mb-2"
                                :class="{
                                    __invalid: !validation.register.name
                                }"
                                placeholder="Name"
                                autofocus
                                v-model="formData.register.name"
                            />
                            <label for="inputEmail" class="sr-only"
                                >Email</label
                            >
                            <input
                                type="text"
                                id="email"
                                class="form-control bg-dark text-light mb-2"
                                :class="{
                                    __invalid: !validation.register.email
                                }"
                                placeholder="Email address"
                                v-model="formData.register.email"
                            />
                            <label for="inputPassword" class="sr-only"
                                >Confirm password</label
                            >
                            <input
                                type="password"
                                id="password"
                                class="form-control bg-dark text-light mb-2"
                                :class="{
                                    __invalid: !validation.register.password
                                }"
                                placeholder="Password"
                                v-model="formData.register.password"
                            />
                            <label for="inputPassword" class="sr-only"
                                >Password</label
                            >
                            <input
                                type="password"
                                id="confirmation"
                                class="form-control bg-dark text-light"
                                :class="{
                                    __invalid: !validation.register.confirmation
                                }"
                                placeholder="Confirm password"
                                v-model="formData.register.confirmation"
                            />
                            <br />
                            <button
                                type="submit"
                                class="btn btn-outline-success btn-block"
                                @click.prevent="createUser()"
                            >
                                Create user
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="__auth-card mt-3 card text-center">
            <h5 class="card-title mt-3 mb-3">
                <strong>Social login</strong>
            </h5>
            <p class="mb-3 text-center text-muted">
                Or simply login with your social media account.
            </p>
            <div class="card-body">
                <button
                    class="btn btn-danger btn-block"
                    @click.prevent="oAuthLogin('google')"
                >
                    Sign in with Google
                </button>
                <button
                    class="btn btn-primary btn-block"
                    @click.prevent="oAuthLogin('facebook')"
                >
                    Sign in with Facebook
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from '@/services/apiClient.js';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
    setup(props, root) {
        const store = useStore();
        const route = useRoute();

        let formData = ref({
            login: {
                email: '',
                password: ''
            },
            passwordReset: {
                email: ''
            },
            register: {
                name: '',
                email: '',
                password: '',
                confirmation: ''
            }
        });

        let validation = ref({
            login: {
                email: true,
                password: true
            },
            passwordReset: {
                email: true
            },
            register: {
                name: true,
                email: true,
                password: true,
                confirmation: true
            }
        });

        let showResetForm = ref(false);

        const loginValidation = () => {
            let status = true;
            if (!formData.value.login.email) {
                status = false;
                validation.value.login.email = false;
            }
            if (!formData.value.login.password) {
                status = false;
                validation.value.login.password = false;
            }
            return status;
        };

        const passwordResetValidation = () => {
            let status = true;
            validation.value.passwordReset.email = true;
            if (!formData.value.passwordReset.email) {
                status = false;
                validation.value.passwordReset.email = false;
            }
            return status;
        };

        const registerValidation = () => {
            let status = true;
            validation.value.register.name = true;
            validation.value.register.email = true;
            validation.value.register.password = true;
            validation.value.register.confirmation = true;
            if (!formData.value.register.name) {
                status = false;
                validation.value.register.name = false;
            }
            if (!formData.value.register.email) {
                status = false;
                validation.value.register.email = false;
            }
            if (
                formData.value.register.password &&
                formData.value.register.password.length < 6
            ) {
                status = false;
                validation.value.register.password = false;
            }
            if (
                formData.value.register.password !==
                formData.value.register.confirmation
            ) {
                status = false;
                validation.value.register.confirmation = false;
            }
            return status;
        };

        const login = () => {
            if (loginValidation()) {
                store.dispatch('auth/login', {
                    email: formData.value.login.email,
                    password: formData.value.login.password
                });
            }
        };

        const oAuthLogin = (strategy) => {
            window.location.href = `/api/login/${strategy}`;
        };

        const createUser = async () => {
            if (registerValidation()) {
                await apiClient.createUser(formData.value.register);
            }
        };

        const requestResetToken = async () => {
            if (passwordResetValidation()) {
                await apiClient.requestResetToken({
                    email: formData.value.passwordReset.email
                });
            }
        };

        if (root.attrs.auth) {
            store.dispatch('auth/auth');
        }

        if (root.attrs.verify) {
            apiClient.verify(route.params.id, route.params.token);
        }

        return {
            formData,
            validation,
            showResetForm,
            login,
            oAuthLogin,
            createUser,
            requestResetToken
        };
    }
};
</script>

<style scoped>
@import '../assets/css/login.css';
@import '../assets/css/main.css';
</style>
