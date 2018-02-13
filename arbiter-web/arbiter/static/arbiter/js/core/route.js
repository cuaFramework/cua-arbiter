const router = new VueRouter({
    mode: 'history',
    base: "arbiter",
    routes: [
        {path: '/'},
        {
            path: '/:casemodel',
            name: 'casepath',
            components: {paper: CasePaper,},
            props: {paper: true,}
        },
        {
            path: '/:casemodel/:pyname',
            name: 'casepathpy',
            components: {paper: CasePaper, codefab: CodeFloatBtn},
            props: {paper: true, codefab: true}
        },

    ]
});