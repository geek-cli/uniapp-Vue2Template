<template>
	<view class="btn" :style="{
		width,
		height,
		borderRadius: isRadius ? '44rpx' : ''
	}" @click="trigger" :class="type">
		{{text}}
	</view>
</template>

<script>
	export default {
		name:"btn",
		props: {
			text: {
				default: ""
			},
			height: {
				default: "88rpx"
			},
			width: {
				default: "690rpx"
			},
			isRadius: {
				default: true
			},
			// 可选值为common1、common2、common3
			type: {
				default: "common1"
			},
			// 是否使用节流或防抖
			limit: {
				// 默认不适用
				default: ''
			}
		},
		data() {
			return {
				// 定时器
				timer: null,
				// 开始的时间
				prev: 0
			};
		},
		methods: {
			// 防抖
			debounce(fn, wait){
				if(this.timer !== null) clearTimeout(timer);
				this.timer = setTimeout(fn, wait);
			},
			// 节流
			throttle(fn, wait){
				var now = Date.now();
				if (now - this.prev >= wait) {
					this.prev = Date.now();
					fn();
				}
			},
			// 触发点击按钮事件
			trigger(){
				if(!this.limit) {
					this.$emit("click", {})
				} else {
					switch(this.limit) {
						case "debounce":
							this.debounce(()=>this.$emit("click"), 2000);
							break;
						case "throttle":
							this.throttle(()=>this.$emit("click"), 2000);
							break;
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.btn {
		font-size: 28rpx;
		font-weight: 500;
		text-align: center;
		margin: 0 auto;
		box-sizing: border-box;
		line-height: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		&.common1 {
			background: linear-gradient(80deg, #EE7457 0%, #F02F00 100%);
			color: #FFFFFF;
		}
		&.common2 {
			color: #666666;
			background: #fff;
		}
		&.common3 {
			background: #FFFFFF;
			border: 1rpx solid @common;
			border-radius: 34rpx;
			color: @common;
		}
	}
</style>