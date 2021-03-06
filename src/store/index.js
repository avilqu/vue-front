import { createStore } from 'vuex';

import { auth } from '@/store/modules/auth.js';
import { alert } from '@/store/modules/alert.js';

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: { auth, alert }
});
