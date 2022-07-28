<template>
	<view class="commonBox">
		<uni-popup ref="popup" type="center" :maskClick="isMaskClose">
			<view class="popup">
				<slot></slot>
				<view v-if="title" class="title">
					{{title}}
				</view>
				<view class="content" v-if="content">
					{{content}}
				</view>
				<view class="btns">
					<view class="cancel" @click="$emit('cancel')">{{cancel}}</view>
					<view class="confirm" @click="$emit('confirm')">{{confirm}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"commonBox",
		props: {
			title: {
				default:""
			},
			cancel: {
				default: "取消"
			},
			confirm: {
				default: "确认"
			},
			content: {
				default: ""
			},
			isMaskClose: {
				default: true
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			}
		}
	}
</script>

<style lang="less" scoped>
	.commonBox {
		position: fixed;
		z-index: 999;
		.popup {
			width: 590rpx;
			background-color: #fff;
			padding: 59rpx 50rpx 40rpx;
			border-radius: 10rpx;
			.title, .content {
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
				text-align: center;
				line-height: 50rpx;
			}
			.btns {
				margin-top: 39rpx;
				display: flex;
				>view {
					width: 230rpx;
					height: 76rpx;
					border-radius: 38rpx;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 76rpx;
					text-align: center;
				}
				.cancel {
					margin-right: 30rpx;
					color: #333333;
					background: #F0F0F0;
				}
				.confirm {
					color: #fff;
					background: linear-gradient(90deg, #3F63F5 0%, #3699FF 100%);
				}
			}
		}
	}
</style>
