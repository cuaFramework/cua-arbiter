const router = new VueRouter({
    mode: 'history',
    base: "/arbiter/wholog/",
    routes: [

        {
            path: '/index',
            name:'',
            components: {historyLog:historyLog},
        },
         {
            path: '/historyLog',
             name:'historyLog',
            components: {historyLog:historyLog},
        },
         {
            path: '/logCount',
             name:'logCount',
            components: {historyLog:logCount},
        },

    ]
});