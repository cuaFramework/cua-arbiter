const router = new VueRouter({
    mode: 'history',
    base: "/arbiter/wholog/",
    routes: [

        {
            path: '/index',
            name:'index',
            components: {rootView:historyLog},
        },
         {
            path: '/historyLog',
             name:'historyLog',
            components: {mainView:historyLog},
        },
         {
            path: '/statisticLog',
             name:'statisticLog',
            components: {mainView:statisticLog},
        },

    ]
});