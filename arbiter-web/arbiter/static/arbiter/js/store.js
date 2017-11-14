//vuex：管理各个公用变量的store

//vuex用户模块：管理登陆的用户数据
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
//vuex用例模块：管理当前项目的所有用例
const caseModule = {
    state: {allCases: null, packageList: null, caseList: null, currentPyPath: null},
    mutations: {
        setAllCases(state, allCases) {
            state.allCases = allCases;
        },
    },
    getters: {
        getAllCases: state => {
            return state.allCases
        }
    }
    // actions: { ... }
};

//store：所有vuex模块的集合
const store = new Vuex.Store({
    modules: {
        user: userModule,
        case: caseModule
    }
});