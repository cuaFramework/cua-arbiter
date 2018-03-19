{% verbatim %}
<template id="historyLog">
    <div id="history-log" :class="{ 'slider-open': slideOpen}">
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
        <!--log-table begin-->
        <div class="log-table">
            <el-table size="mini" :data="tableData" :default-sort="{prop: 'run_time', order: 'descending'}"
                      style="width: 100%" height="67vh">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="log-table-expand">
                            <el-form-item label="执行 ID">
                                <span>{{ props.row.log_id }}</span>
                            </el-form-item>
                            <el-form-item label="用例集">
                                <span>{{ props.row.case_name }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="任务名" width="200" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="queryDetailData(scope.row.log_id)" type="text">
                            {{ scope.row.task_name }}
                        </el-button>
                    </template>

                </el-table-column>
                <el-table-column prop="num" label="用例数" show-overflow-tooltip></el-table-column>
                <el-table-column prop="duration" label="耗时（秒）" show-overflow-tooltip></el-table-column>
                <el-table-column prop="author" label="执行人"></el-table-column>
                <el-table-column prop="run_time" label="运行时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="result" label="结果"
                                 :filters="[{ text: '失败', value: 'FAILED' }, { text: '成功', value: 'OK' }]"
                                 :filter-method="filterTag"
                                 filter-placement="bottom-start">
                    <template slot-scope="scope">
                        <div >
                            <mu-icon title="成功" v-if="scope.row.result==='OK'" value="done" color="green"></mu-icon>
                            <mu-icon title="失败" v-if="scope.row.result!=='OK'" value="error" color="red"></mu-icon>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="200">
                    <template slot-scope="scope">
                        <mu-icon-button title="重新执行" icon="replay" @click="run(scope.row.case_name,scope.row.task_name)" icon-class="blue-icon"></mu-icon-button>
                        <mu-icon-button title="删除" icon="delete" @click="deleteLog(scope.row.log_id)" ></mu-icon-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <span class="el-pagination__total">共 {{tableTotal}} 条</span>
            </div>
        </div> <!-- table end-->
        <!--运行详情记录-->
        <div>
            <mu-dialog dialog-class="log-dialog" :open="logDialog.switch" @close="closeDialog" title="运行记录"
                       scrollable>
                <p v-for="item, index in logDialog.menus" :key="index">{{ item }}</p>
                <mu-flat-button primary label="关闭" @click="closeDialog" slot="actions"></mu-flat-button>
            </mu-dialog>
        </div>
        <div>
            <mu-popup position="top" :overlay="false" popup-class="login-popup-top" :open="loginPopup">
                请登录再操作
            </mu-popup>
        </div>
    </div><!--history-log-app end-->
</template>
{% endverbatim %}