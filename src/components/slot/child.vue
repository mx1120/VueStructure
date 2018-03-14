<template>
    <div>
        <div class="header">
            <slot name="header"></slot>
        </div>
        <!-- 这里写入备用内容 当父元素的没有任何内容发布的时候就是用匿名槽点中的内容-->
        <slot>father has nothing props</slot>
        <ul>
            <slot name="item"
                  v-for="item,index in items"
                  :text="item.text"
                  :info="item.info"
                  :index="index"
            >
            </slot>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				items: [
                    {"text":'vue', "info": 'm'},
                    {"text":'vuex', "info": 'm'},
                    {"text":'Eventbus', "info": 'm'},
                    {"text":'react', "info": 'm'},
                    {"text":'react-native', "info": 'm'},
                    {"text":'ng', "info": 'm'},
                    {"text":'go', "info": 'm'},
                    {"text":'python', "info": 'm'},
                    {"text":'java', "info": 'm'}
                ]
            }
		},
		created() {
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../assets/scss/base";
.header {
    color: blue;
}
</style>