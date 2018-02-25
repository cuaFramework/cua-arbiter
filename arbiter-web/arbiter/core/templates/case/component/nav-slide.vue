{% verbatim %}
<template id="arbiterNavSlide">
    <div id="nav-slide">
        <mu-drawer :overlay="true" :z-depth="0" :open="open" :docked="docked" @close="toggle()">

            <mu-appbar title="Arbiter" :z-depth="2">
                <mu-icon-button icon="settings" slot="right" @click="openImportDialog"></mu-icon-button>
                <mu-icon-button icon="playlist_play" slot="right" @click="openImportDialog"></mu-icon-button>

            </mu-appbar>

            <mu-list :value="value" @change="handleChange">
                <div v-for="(v, k) in modelList" :key="k">
                    <mu-list-item :title="k" :value="k" toggle-nested :open="false" @click='loadCasePaper(k)'>
                        <mu-icon slot="left" value="wb_cloudy"></mu-icon>
                        <mu-list-item slot="nested" :value="k+kx" :title="kx" v-for="(vx, kx) in v"
                                      v-if="(typeof vx)==='object'" :key="kx"
                                      @click="loadCasePaper(k+'.'+kx)" inset>
                            <mu-icon slot="left" value="looks"></mu-icon>
                            <mu-list-item slot="nested" :value="k+kx+ky" :title="ky" v-for="(vy, ky) in vx"
                                          v-if="(typeof vy)==='object'" :key="ky"
                                          @click="loadCasePaper(k+'.'+kx+'.'+ky)" inset>
                                <mu-icon slot="left" value="wb_sunny"></mu-icon>
                            </mu-list-item>
                        </mu-list-item>
                    </mu-list-item>
                </div>
            </mu-list>
        </mu-drawer>
        <mu-dialog :open="dialog" title="项目管理" @close="closeImportDialog">
            <mu-text-field style="width: 600px;" v-if="gitCloneStatus == 'finish'" icon="link" v-model="gitInfo.url"
                           label="git仓库的URL（例：https://github.com/shimine/cua-caseobjdemo.git）"
                           label-float></mu-text-field>
            <mu-text-field v-if="gitCloneStatus == 'finish'" icon="account_circle" v-model="gitInfo.git_username"
                           label="git有权限的用户名"
                           label-float></mu-text-field>
            <mu-text-field v-if="gitCloneStatus == 'finish'" icon="vpn_key" v-model="gitInfo.git_password"
                           label="git用户名的密码"
                           label-float></mu-text-field>
            <mu-flat-button v-if="gitCloneStatus == 'finish'" slot="actions" @click="closeImportDialog" primary
                            label="取消"></mu-flat-button>
            <mu-flat-button v-if="gitCloneStatus == 'finish'" slot="actions" @click="cloneCaseObj" primary
                            label="导入"></mu-flat-button>
            <mu-linear-progress v-if="gitCloneStatus == 'running'" :size="10" color="blue"></mu-linear-progress>
        </mu-dialog>
    </div>
</template>
{% endverbatim %}