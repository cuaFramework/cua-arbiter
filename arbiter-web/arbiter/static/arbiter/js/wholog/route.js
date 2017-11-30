const router = new VueRouter({
    mode: 'history',
    base: "/arbiter/wholog/",
    routes: [
        {
            path: '/index.html',
            components: {logApp:LogApp,},
        },

    ]
});