<div id="arbiterNavbar" :class="{ 'slider-open': sliderIsOpen}">
    <mu-appbar :z-depth="2">
        <mu-icon-button icon="menu" slot="left" @click="toggleSlide()"></mu-icon-button>
        <h2 slot="left">用例管理</h2>
        <mu-text-field icon="search" class="appbar-search-field" hint-text="搜索"></mu-text-field>

        <mu-icon-button v-if="message.username!=null" tooltip="消息" tooltip-position="bottom-right" icon="chat"
                        slot="right"></mu-icon-button>
        <mu-icon-button icon="apps" slot="right" ref="appIcon" @click="appMenuToggle"></mu-icon-button>
        <mu-popover v-if="message.username!=null" :anchor-origin='{"vertical":"bottom","horizontal":"middle"}'
                    :target-origin='{"vertical":"top","horizontal":"middle"}' :trigger="appMenuTrigger"
                    :open="appMenuOpen" @close="appMenuHandleClose">
            <mu-menu>
                <mu-menu-item title="用例导入" left-icon="add"
                              @click="openImportDialog"></mu-menu-item>
                <mu-menu-item title="用例管理" left-icon="mode_edit"></mu-menu-item>
                <mu-menu-item href="./wholog" title="日志查询" left-icon="history"></mu-menu-item>
            </mu-menu>
        </mu-popover>
        <mu-avatar v-if="message.username!=null" background-color="lime700" ref="UserAvatar" color="black"
                   :size="40" slot="right" @click="userMenuToggle">{{message.username.substr(0, 2)}}
        </mu-avatar>
        <mu-popover v-if="message.username!=null" :anchor-origin='{"vertical":"bottom","horizontal":"middle"}'
                    :target-origin='{"vertical":"top","horizontal":"middle"}' :trigger="userMenuTrigger"
                    :open="userMenuOpen" @close="userMenuHandleClose">
            <mu-menu>
                <mu-menu-item title="设置" left-icon="settings"></mu-menu-item>
                <mu-menu-item title="帮助" left-icon="help_outline"></mu-menu-item>
                <mu-divider></mu-divider>
                <mu-menu-item title="退出"
                              @click="logout()" left-icon="power_settings_new"></mu-menu-item>
            </mu-menu>
        </mu-popover>
        <mu-flat-button v-if="message.username==null" href="/arbiter/login" label="登陆" icon="account_circle"
                        class="demo-flat-button" color="lime700" slot="right"></mu-flat-button>
    </mu-appbar>
    <mu-dialog :open="dialog" title="用例导入" @close="closeImportDialog">
        <mu-text-field v-if="gitCloneStatus == 'finish'" icon="link" v-model="gitUrlPrefix"
                       label="git仓库的URL（例：https://github.com/shimine/cua-caseobjdemo.git）" :width="100"
                       label-float></mu-text-field>
        <mu-flat-button v-if="gitCloneStatus == 'finish'" slot="actions" @click="closeImportDialog" primary
                        label="取消"></mu-flat-button>
        <mu-flat-button v-if="gitCloneStatus == 'finish'" slot="actions" @click="cloneCaseObj" primary
                        label="导入"></mu-flat-button>
        <mu-linear-progress v-if="gitCloneStatus == 'running'" :size="10" color="blue"></mu-linear-progress>
    </mu-dialog>
</div>