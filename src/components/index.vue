<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback" class="contain">
            <!-- slides -->
            <swiper-slide class="inner">
                <child>
                    <p class="title">something must be learned</p>
                    <li slot="item" slot-scope="props">
                        {{props.index + 1}} {{props.text}}
                    </li>
                </child>
                 <div>
                123123
                <input type="file">
            </div>
            </swiper-slide>
            <swiper-slide class="inner">I'm Slide 2</swiper-slide>
            <swiper-slide class="inner">I'm Slide 3</swiper-slide>
            <swiper-slide class="inner">I'm Slide 4</swiper-slide>
            <!-- Optional controls -->
        </swiper>
    </div>
</template>

<script type="text/ecmascript-6">
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import child from './slot/child.vue'
	export default {
		data() {
			return {
				swiperOption:{
					direction : 'vertical',
                }
			}
		},
        methods: {
	        callback () {

            }
        },
        components: {
			child
        }
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "./../assets/scss/base";
    .inner {
        height: 100vh;
        width: 100vw;
    }
    .title{
        line-height: 70px/$ppr;
        text-align: center;
        background: #903;
        color: white;
    }
</style>