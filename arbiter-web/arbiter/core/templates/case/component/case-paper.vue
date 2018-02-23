{% verbatim %}
<template id="casePaper">
    <div id="case-paper" :class="{ 'slider-open': slideOpen}">
        <div>
            <div v-for="(value, key) in caseMap">
                <div>
                    <div class="flex-between">
                        <div style="display: flex;align-items: center;">
                            <b title="查看/编辑" class="grey-text paper-pyname" @click="showcode(key,value)">{{ key }}</b>
                            <mu-icon-button icon="content_copy" icon-class="blue-icon"
                                            @click="openCopyDialog(value)"></mu-icon-button>
                        </div>
                        <mu-icon-button icon="delete"
                                        @click="openDeleteDialog(value)"></mu-icon-button>
                    </div>
                </div>
                <div v-if="pyname===key">
                    <mu-paper class="long-large-paper" :z-depth="2" :key="key">
                        <code-paper :pypathx="value"></code-paper>
                        <code-float-btn :casemodel="casemodel" :pypath="value"></code-float-btn>
                    </mu-paper>
                </div>
                <div v-else v-for="(v, k) in value">
                    <mu-paper class="long-little-paper" :z-depth="1" :key="key">
                        <div class="flex-between"><i class="brown800-text paper-casename">{{ v }}</i>
                            <mu-icon-button icon="play_arrow" icon-class="green-icon"
                                            @click="run(k,v)"></mu-icon-button>
                        </div>
                    </mu-paper>
                </div>
            </div>
        </div>
        <div>
            <mu-dialog :open="copyDialog" :title="'复制'+fileInfo.oldName" @close="closeCopyDialog">
                <mu-text-field v-if="copyStatus == 'finish'" style="width: 600px;" icon="link"
                               v-model="fileInfo.newName"
                               label="新文件名路径"
                               label-float></mu-text-field>
                <mu-flat-button v-if="copyStatus == 'finish'" slot="actions" @click="closeCopyDialog" primary
                                label="取消"></mu-flat-button>
                <mu-flat-button v-if="copyStatus == 'finish'" slot="actions" @click="copyFile" primary
                                label="确定"></mu-flat-button>
                <mu-linear-progress v-if="copyStatus == 'running'" :size="10" color="blue"></mu-linear-progress>
            </mu-dialog>
        </div>
        <div>
            <mu-dialog :open="deleteDialog" :title="'删除'+deleteFilePath" @close="closeDeleteDialog">
                <mu-flat-button v-if="deleteStatus == 'finish'" slot="actions" @click="closeDeleteDialog" primary
                                label="取消"></mu-flat-button>
                <mu-flat-button v-if="deleteStatus == 'finish'" slot="actions" @click="deleteFile" primary
                                label="确定"></mu-flat-button>
                <mu-linear-progress v-if="deleteStatus == 'running'" :size="10" color="blue"></mu-linear-progress>
            </mu-dialog>
        </div>
    </div>

</template>
{% endverbatim %}