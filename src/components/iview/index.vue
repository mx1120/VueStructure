<template>
    <div>
        <!--区间条-->
        <Slider v-model="value" range></Slider>

        <Progress :percent="25"></Progress>
        <Progress :percent="45" status="active"></Progress>
        <Progress :percent="65" status="wrong"></Progress>
        <Progress :percent="100"></Progress>
        <Progress :percent="25" hide-info></Progress>
        <p>你好</p>
    </div>

</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				value: [20, 50]
            }
		},
		created() {
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../assets/scss/base";
    p{
        font-size: 36px/$ppr;
    }
</style>