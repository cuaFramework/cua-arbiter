{% verbatim %}
<template id="arbiterNavbar">
    <div id="arbiter-navbar" :class="{ 'slider-open': sliderIsOpen}">
        <mu-appbar :z-depth="2">
            <mu-icon-button icon="menu" slot="left" @click="toggleSlide()"></mu-icon-button>
            <h2 slot="left">用例管理</h2>
            <mu-text-field icon="search" class="appbar-search-field" hint-text="搜索"></mu-text-field>
            <mu-icon-button v-if="usernameAbbreviation!=null" tooltip="消息" tooltip-position="bottom-right" icon="chat"
                            slot="right"></mu-icon-button>
            <menu-icon-button slot="right" :username-abbreviation="usernameAbbreviation"></menu-icon-button>
            <user-avatar slot="right" v-if="usernameAbbreviation!=null"
                         :username-abbreviation="usernameAbbreviation"></user-avatar>
            <mu-flat-button v-if="usernameAbbreviation==null" href="/arbiter/login" label="登陆" icon="account_circle"
                            class="demo-flat-button" color="lime700" slot="right"></mu-flat-button>
        </mu-appbar>

    </div>
</template>
{% endverbatim %}