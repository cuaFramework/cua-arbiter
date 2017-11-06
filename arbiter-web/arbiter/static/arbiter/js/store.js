const userModule = {
    state: {
        username: null,
        avatarPicPath: null,
        nickName: null,
        role: null,
        email: null,
        searchHistory: null,
        settings: {}
    },
    mutations: {
        setusername(state, username) {
            state.username = username;
        }
    },
    actions: {
        setAvatarPicPath(state, avatarPicPath) {
            state.avatarPicPath = avatarPicPath;
        }
    },
    getters: {
        username: state => {
            return state.username
        }
    }
};

const caseModule = {
    // state: { ... },
    // mutations: { ... },
    // actions: { ... }
};

const store = new Vuex.Store({
    modules: {
        user: userModule,
        case: caseModule
    }
});