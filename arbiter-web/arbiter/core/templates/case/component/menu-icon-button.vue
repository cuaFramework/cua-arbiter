{% verbatim %}
<template id="menuIconButton">
    <div id="menu-icon-button">
        <mu-icon-button icon="apps" slot="right" ref="appIcon" @click="appMenuToggle"></mu-icon-button>
        <mu-popover v-if="usernameAbbreviation!=null" :anchor-origin='{"vertical":"bottom","horizontal":"middle"}'
                    :target-origin='{"vertical":"top","horizontal":"middle"}' :trigger="appMenuTrigger"
                    :open="appMenuOpen" @close="appMenuHandleClose">
            <mu-menu>
                <mu-menu-item href="/arbiter/wholog/index.html" title="日志查询" left-icon="history"></mu-menu-item>
            </mu-menu>
        </mu-popover>

    </div>
</template>
{% endverbatim %}