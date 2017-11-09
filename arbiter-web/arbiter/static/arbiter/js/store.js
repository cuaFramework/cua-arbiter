const userModule = {
    state: {
        username: null,
        jwtToken: null,
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
        },
        refreshJwtToken(state,) {
            state.jwtToken = window.localStorage["token"];
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
        },
        jwtHeader: state => {
            return 'JWT ' + state.jwtToken
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