{% verbatim %}
<template id="casePaper">
    <div id="case-paper">
            <div>
                 <div  v-for="(value, key) in caseMap">
                <div>
                    <div class="flex-between"><b title="查看/编辑" class="grey-text paper-pyname"
                                                 @click="showcode(key,value)">{{
                        key }}</b>
                        <mu-icon-button icon="delete" icon-class="red-icon"></mu-icon-button>
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
    </div>
</template>
{% endverbatim %}