{% verbatim %}
<template id="caseFloatBtn">
    <div id="case-float-btn" v-if="modalShow">
        <div style="z-index: 1;position: fixed; bottom: 15px; right: 45px;"
             @mouseover="onMouseEnterCodeFAB()" @mouseout="onMouseleaveCodeFAB()">
            <mu-float-button id="log" @click="log()" icon="message" secondary mini
                             class="demo-float-button" v-show="seen"
                             style="bottom: 6px; right: 3px;"></mu-float-button>
            <mu-float-button id="edit" @click="add()" icon="add" class="demo-float-button"></mu-float-button>
        </div>
        <div>
            <mu-dialog dialog-class="log-dialog" :open="logDialog" @close="closeLogDialog" title="运行日志"
                       scrollable>
                <p v-for="log, index in logContent" :key="index">{{ log }}</p>
                <mu-flat-button primary label="清空" @click="cleanLog" slot="actions"></mu-flat-button>
                <mu-flat-button primary label="关闭" @click="closeLogDialog"
                                slot="actions"></mu-flat-button>
            </mu-dialog>
        </div>
    </div>
</template>
{% endverbatim %}