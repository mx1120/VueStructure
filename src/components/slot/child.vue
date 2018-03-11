<template>
    <div>
        <div class="header">
            <slot name="header"></slot>
        </div>
        <slot>father has nothing props</slot>
        <ul>
            <slot name="item"
                  v-for="item in items"
                  :text="item.text"
                  :info="item.info"
            >
                <!-- 这里写入备用内容 -->
            </slot>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				items: [
                    {"text":1, "info": 'm'},
                    {"text":2, "info": 'm'},
                    {"text":3, "info": 'm'},
                    {"text":4, "info": 'm'},
                    {"text":5, "info": 'm'},
                    {"text":6, "info": 'm'},
                    {"text":7, "info": 'm'},
                    {"text":8, "info": 'm'},
                    {"text":9, "info": 'm'}
                ]
            }
		},
		created() {
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header {
    color: blue;
}
</style>