<template>
    <div>
        this is my resume
        <p class="test">1123213144</p>
        <loading></loading>
    </div>
</template>

<script type="text/ecmascript-6">
    import  * as types from 'vuex'
	export default {
		data() {
			return {
				country: "M78"
			}
		},
        methods: {
            ...types.mapActions({
            	'Direction': 'COUNT_DIRECTION'
            })
        },
		created() {
            this.Direction({'direction': 'forward'})
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "./../assets/scss/base";
</style>