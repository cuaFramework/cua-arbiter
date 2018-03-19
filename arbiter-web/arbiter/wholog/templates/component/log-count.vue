{% verbatim %}
<template id="logCount">
    <div id="log-count" :class="{ 'slider-open': slideOpen}">
        <p>test</p>
        <div class="query">
            <div class="query-content">
                <div class="flex-query">
                    <mu-flexbox class="mt8" orient="vertical">
                        <mu-flexbox-item order="0">

                            <mu-date-picker mode="landscape" v-model="startDate" hint-text="请选择开始日期"
                            ></mu-date-picker>
                            <mu-time-picker mode="landscape" v-model="startTime" :auto-ok="false" hint-text="请选择开始时间"
                                            container="inline" format="24hr"></mu-time-picker>

                            <mu-date-picker mode="landscape" v-model="endDate" hint-text="请选择结束日期"
                            ></mu-date-picker>
                            <mu-time-picker mode="landscape" v-model="endTime" :auto-ok="false" hint-text="请选择结束时间"
                                            container="inline" format="24hr"></mu-time-picker>
                            <br/>
                        </mu-flexbox-item>
                        <mu-flexbox-item order="2" class="query-button">
                            <mu-raised-button background-color="#6495ED" label="查询" icon="search" @click="queryData"
                                              primary></mu-raised-button>
                        </mu-flexbox-item>
                    </mu-flexbox>
                </div>
            </div>
        </div><!-- query end-->
    </div><!--app end-->
</template>
{% endverbatim %}