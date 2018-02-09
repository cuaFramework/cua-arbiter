{% verbatim %}
<template id="arbiterNavSlide">
    <div id="nav-slide">
        <mu-drawer :overlay="true" :z-depth="0" :open="open" :docked="docked" @close="toggle()">
            <mu-appbar title="Arbiter" :z-depth="2"></mu-appbar>
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
    </div>
</template>
{% endverbatim %}