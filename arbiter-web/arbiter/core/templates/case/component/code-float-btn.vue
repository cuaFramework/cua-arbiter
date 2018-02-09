{% verbatim %}
<template id="codeFloatBtn">
    <div id="code-float-btn" v-if="modalShow">
        <div style=" position: relative;z-index: 1; float: right;bottom: 80px;right: 60px;"
             @mouseover="onMouseEnterCodeFAB()" @mouseout="onMouseleaveCodeFAB()">
            <mu-float-button style="background-color:#bf360c" @click="edit()" :icon="editIcon"
                             class="demo-float-button"></mu-float-button>
        </div>
        <div>
            <mu-dialog :open="saveDialog" title="保存中">
                <mu-linear-progress v-if="saveStatus == 'running'" :size="10"
                                    color="blue"></mu-linear-progress>
            </mu-dialog>
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