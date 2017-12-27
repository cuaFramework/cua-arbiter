const router = new VueRouter({
    mode: 'history',
    base: "/arbiter/wholog/",
    routes: [
            //
         {
            path: '/api-count',
            components: {apiCountApp:ApiCountApp},
        },
        {
            path: '/api-count.html',
            redirect:'api-count'
        },


    ]
});