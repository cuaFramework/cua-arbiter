{% verbatim %}
<template id="statisticLog">
    <div id="statistic-log" :class="{ 'slider-open': slideOpen}">
        <div id="search_content">
            <mu-text-field icon="search" label="输入查询的接口" v-model="api_name" label-float
                           v-on:keyup.enter.native="search"></mu-text-field>
            <mu-flat-button label="查询" class="demo-flat-button" icon="search" v-on:click="queryData"
                            primary></mu-flat-button>
        </div>
        <div id="result">
            <div id="result-content">
                <div id="main-chart">
                </div>
            </div>
            <!--运行详情记录-->
            <div>
                <mu-dialog dialog-class="log-dialog" :open="logDialog.switch" @close="closeDialog" title="详细运行记录"
                           scrollable>
                    <p v-for="item, index in logDialog.menus" :key="index">{{ item }}</p>
                    <mu-flat-button primary label="关闭" @click="closeDialog" slot="actions"/>
                </mu-dialog>
            </div>
        </div>
    </div><!--app end-->
</template>
{% endverbatim %}