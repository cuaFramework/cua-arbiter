let app = new Vue({
    router,
    el: '#app', store,
    data: {},

    /*组件集合*/
    components: {
        'ArbiterHeader': ArbiterHeader,
        'historyLog': historyLog,
        'logSlide': logSlide,
         'CaseFloatBtn': CaseFloatBtn,
    },
});