<template>
	<view class="tabbar" @click="selectTab">
		<view class="content">
			<view class="tabbar-item" v-for="(item, index) in tabbar" :key="index"
				:style="{width: `${750/tabbar.length}rpx`}">
				<view :data-id="item.id">
					<view class="img relative" :data-id="item.id">
						<image v-if="currentId === item.id " :src="item.iconAct" mode="aspectFit" :data-id="item.id">
						</image>
						<image v-else :src="item.icon" mode="aspectFit" :data-id="item.id"></image>
					</view>
					<view :data-id="item.id" :class="currentId === item.id ? 'act' : ''">{{item.text}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		router
	} from '@/router.js'
	export default {
		name: "tabbar",
		props: {
			currentId: {
				default: ""
			}
		},
		data() {
			return {
				tabbar: [{
						text: '首页',
						icon: '',
						iconAct: '', 
						to: '/pages/home/home',
						id: "home"
					},
					{
						text: '我的',
						icon: '',
						iconAct: '', 
						to: '/pages/personal/personal',
						id: "personal"
					}
				],
			};
		},
		methods: {
			// 切换底部导航栏选中项
			selectTab(e) {
				let data = e.target.dataset;
				// 判断id是否存在
				if (data.id) {
					// 如果点击的是还是当前tabbar则不跳转
					if (this.currentId === data.id) return;
					// 如果是个人中心 且 未登录则跳转至登录页
					if (!uni.getStorageSync('user') || !uni.getStorageSync('token')) {
						return router.push({
							name: 'login'
						})
					}
					// 找到本次点击的选中项
					let item = this.tabbar.filter(item => item.id === data.id)[0];
					uni.reLaunch({
						url: item.to
					});
				}
			}
		}
	}
</script>

<style lang="less">
	.tabbar {
		height: 98rpx;
		height: calc(98rpx + constant(safe-area-inset-bottom));
		height: calc(98rpx + env(safe-area-inset-bottom));
		bottom: calc(98rpx + 20rpx);
		padding-bottom: calc(98rpx + constant(safe-area-inset-bottom) + 20rpx);
		padding-bottom: calc(98rpx + env(safe-area-inset-bottom) + 20rpx);

		.content {
			width: 100%;
			position: fixed;
			display: flex;
			bottom: 0;
			left: 0;
			justify-content: center;
			background-color: #fff;
			box-shadow: 0px -2px 12px 0px rgba(0, 0, 0, 0.08);
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
		}

		.tabbar-item {
			display: flex;
			justify-content: center;

			&:nth-child(4) {
				>view {
					image {
						position: relative;
						left: -6rpx;
					}
				}
			}

			>view {
				image {
					width: 60rpx;
					height: 60rpx;
				}

				color: rgba(51, 51, 51, 1);
				font-size: 24rpx;
				padding: 15rpx 0;
				text-align: center;
				font-weight: 500;
			}

			.act {
				color: rgba(222, 0, 0, 1);
			}
		}
	}
</style>
