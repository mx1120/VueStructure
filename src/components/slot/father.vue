<template>
    <div>
        <child>
            <h1 slot="header">header</h1>
            <p>匿名槽点</p>
            <li
                slot="item"
                slot-scope="props"
                class="son">
                {{ props.text }}
                <span>{{ props.info }}</span>
            </li>
        </child>

    </div>
</template>

<script type="text/ecmascript-6">
    import child from './child.vue'
	export default {
		data() {
			return {}
		},
		created() {
		},
        components: {
			child
        }
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>