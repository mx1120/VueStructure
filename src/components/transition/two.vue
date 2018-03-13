<template>
    <div class="main">
        <div @click="next">
            NEXT
        </div>
        <div @click="back">
            BACK
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {}
		},
		methods: {
			next() {
				this.$router.push('/trans_three')
			},
			back() {
				this.$router.go(-1)
			}
		},
		created() {
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../assets/scss/base";
    .main {
        height: 100vh;
        width: 100vw;
        background: #599;
    }
</style>