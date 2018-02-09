{% verbatim %}
<template id="userAvatar">
    <div id="user-avatar">
        <mu-avatar v-if="usernameAbbreviation!=null" background-color="lime700" ref="UserAvatar" color="black"
                   :size="40" slot="right" @click="userMenuToggle">{{ usernameAbbreviation }}
        </mu-avatar>
        <mu-popover v-if="usernameAbbreviation!=null" :anchor-origin='{"vertical":"bottom","horizontal":"middle"}'
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
    </div>
</template>
{% endverbatim %}
