<template>
 <div class="main">
     <div @click="next">
         NEXT
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
				this.$router.push('/trans_two')
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
        background: #903;
    }
</style>