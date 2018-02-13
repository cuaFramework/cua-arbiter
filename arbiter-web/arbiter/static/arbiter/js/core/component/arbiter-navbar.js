//顶部bar组件
const ArbiterNavbar = {
    template: '#arbiterNavbar',
    store,
    computed: {
        usernameAbbreviation() {
            if (!!this.username()) {
                return this.username().substr(0, 2)
            }
            else
                return null;
        }
    },
    data: function () {
        return {
            message: {
                href: 'login',
            },
            sliderIsOpen: true,
        }
    },
    mounted() {
        this.refreshJwtToken();
        getRes("/arbiter/getUserDetail", null, this.jwtHeader()).then(
            json => {
                let storage = window.localStorage;
                storage["username"] = json["username"];
                storage["role"] = json["role"];
                // this.$store.commit('setusername', json["username"]);
                this.setusername(json["username"]);

            }
        ).catch((err) => {
            console.log("请求错误:" + err);
        });
    },
    methods: {
        ...Vuex.mapMutations(['setusername', 'refreshJwtToken',]),
        ...Vuex.mapGetters(['username', 'jwtHeader']),
        toggleSlide() {
            this.sliderIsOpen = !this.sliderIsOpen;
            Event.$emit('toggle-slide');
        }
    },
    components: {        //要把组件写入到components里面，如果没有放的话在切换的时候就会找不到 组件
        'userAvatar': userAvatar,
        'menuIconButton': menuIconButton,
    }

};