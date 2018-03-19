let app = new Vue({
    router,
    el: '#app', store,
    data: {},

    /*组件集合*/
    components: {
        'ArbiterHeader': ArbiterHeader,
        'historyLog': historyLog,
        'logCount':logCount,
        'logSlide': logSlide,
         'CaseFloatBtn': CaseFloatBtn,

    },
});