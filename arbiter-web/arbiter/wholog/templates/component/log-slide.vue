{% verbatim %}
<template id="logSlide">
    <div id="log-slide">
        <mu-drawer :overlay="true" :z-depth="0" :open="open" :docked="docked" @close="toggle()">
            <mu-appbar title="Arbiter" :z-depth="2"></mu-appbar>
            <mu-list value="日志" @change="handleChange" :router="true">
                    <mu-list-item title="日志" value="日志" toggle-nested :open="false" >
                        <mu-icon slot="left" value="wb_cloudy"></mu-icon>
                        <mu-list-item slot="nested" value="历史日志"  title="历史日志" v-on:click="routerToHistoryLog" inset>
                            <mu-icon slot="left" value="looks"></mu-icon>
                        </mu-list-item>

                        <mu-list-item slot="nested" value="统计图表"  title="统计图表" v-on:click="routerToLogCount" inset>
                            <mu-icon slot="left" value="books"></mu-icon>

                        </mu-list-item>
                    </mu-list-item>
            </mu-list>
        </mu-drawer>
        <router-view></router-view>
    </div>
</template>
{% endverbatim %}