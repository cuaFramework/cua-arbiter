{% verbatim %}
<template id="arbiterHeader">
    <div id="arbiter-header" :class="{ 'slider-open': sliderIsOpen}">
        <mu-dialog dialog-class="login-dialog" :open="loginDialog.switch" @close="closeLoginDialog">
            <mu-text-field icon="account_circle" class="username" name="username" v-model="loginDialog.username"
                           label="用户名"
                           label-float></mu-text-field>
            <mu-text-field icon="vpn_key" name="username" v-model="loginDialog.password" label="密码" type="password"
                           label-float></mu-text-field>
            <mu-raised-button @click="submit" class="demo-raised-button login-dialog-btn" name="login-dialog-btn"
                              label="登录"
                              primary></mu-raised-button>
        </mu-dialog>
        <mu-appbar :z-depth="2">
            <mu-icon-button icon="extension" @click="toggleSlide()" slot="left"></mu-icon-button>
            <h2 slot="left">日志查询</h2>
            <mu-icon-button v-if="usernameAbbreviation!=null" tooltip="消息" tooltip-position="bottom-right" icon="chat"
                            slot="right"></mu-icon-button>
            <menu-icon-button slot="right" :username-abbreviation="usernameAbbreviation"></menu-icon-button>
            <user-avatar slot="right" v-if="usernameAbbreviation!=null"
                         :username-abbreviation="usernameAbbreviation"></user-avatar>
            <mu-flat-button v-if="usernameAbbreviation==null" @click="toLogin" label="登陆" icon="account_circle"
                            class="demo-flat-button" color="lime700" slot="right"></mu-flat-button>
        </mu-appbar>

    </div>
</template>
{% endverbatim %}