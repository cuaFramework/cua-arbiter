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
                                              primary/>
                        </mu-flexbox-item>
                    </mu-flexbox>
                </div>
            </div>
        </div><!-- query end-->
        <!--log-table begin-->
        <div class="log-table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="任务名" fixed>
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="queryDetailData(scope.row.log_id)" type="text">
                            {{ scope.row.task_name }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="case_name" label="用例路径" width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="author" label="执行人" width="100"></el-table-column>
                <el-table-column prop="run_time" label="运行时间"></el-table-column>
                <el-table-column prop="result" label="结果">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.result.indexOf('FAILED') !== -1 ? 'danger' : 'success'"
                                close-transition>{{scope.row.result}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                >重新运行
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                               >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div> <!-- table end-->
        <!--运行详情记录-->
        <div>
            <mu-dialog dialog-class="log-dialog" :open="logDialog.switch" @close="closeDialog" title="运行记录"
                       scrollable>
                <p v-for="item, index in logDialog.menus" :key="index">{{ item }}</p>
                <mu-flat-button primary label="关闭" @click="closeDialog" slot="actions"/>
            </mu-dialog>
        </div>
        <div>
            <mu-popup position="top" :overlay="false" popup-class="login-popup-top" :open="loginPopup">
                请登录再操作
            </mu-popup>
        </div>
    </div><!--log-app end-->

</template>
{% endverbatim %}