<template>
    <div class="main">
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
        background: #890;
    }
</style>