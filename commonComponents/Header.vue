<template>
	<view class="Header-box">
		<view class="header-fixed-box" :style="{
                background: noBg ? noBg : '',
            }">
			<view class="header-main-box">
				<view v-if="!noLeft" @click="headerLeftClick" class="header-left-box header-operation">
					<slot name="left"></slot>
					<view class="defaultLeft" v-if="!customLeft">
						<image v-if="whiteback" class="header-left-back" mode="widthFix"
							src="../static/icon-back-white.png" />
						<image v-else class="header-left-back" mode="widthFix" src="../static/blackLeft.png" />
					</view>
				</view>
				<view class="header-title" :style="{color:titlecolor?titlecolor:' #333333'}">{{ pageTitle }}
				</view>
				<view @click="headerRightClick" :style="{paddingRight: rightPadding ? rightPadding : '',color: rightColor ? rightColor + '!important' : ''}" class="header-right-box header-operation">
					{{ rightText }}
					<slot name="right"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			// 右侧文字
			rightText: {
				default: "",
			},
			// 是否有背景色
			noBg: {
				default: false,
			},
			//是否有标题颜色
			titlecolor: {
				default: false,
			},
			//是否有白色左侧箭头
			whiteback: {
				default: false,
			},
			// 是否没有返回
			noLeft: {
				default: false,
			},
			notitle: {
				default: false,
			},
			// 右侧padding
			rightPadding: {
				default: false
			},
			// 右侧颜色
			rightColor:{
				default: false
			},
			// 是否有左侧返回事件
			leftClick: {
				default: false
			},
			customLeft: {
				default: false
			}
		},
		data() {
			return {
				pageTitle: ""
			};
		},
		created() {
			// 获取当前页面路由标题
			if (this.notitle) {
				this.pageTitle = this.notitle
			} else {
				this.pageTitle = this.$Route.style.navigationBarTitleText;
			}
		},
		methods: {
			headerRightClick() {
				// 组件绑定click事件
				this.$emit("rightClick");
			},
			// 返回事件
			headerLeftClick() {
				this.leftClick ? this.$emit("leftClick") : uni.navigateBack({});
			},

			// 更换标题
			changeTitle(title) {
				this.pageTitle = title;
			},
		}
	};
</script>

<style lang="less" scoped>
	.Header-box {
		position: relative;
		padding-bottom: @headerheight;
		padding-bottom: calc(constant(safe-area-inset-top) + @headerheight);
		padding-bottom: calc(env(safe-area-inset-top) + @headerheight);

		.header-fixed-box {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: @headerheight;
			height: calc(constant(safe-area-inset-top) + @headerheight);
			height: calc(env(safe-area-inset-top) + @headerheight);
			z-index: 9;
			background: rgba(255, 255, 255, 0);
			background-color: #f5f5f5;

			.header-main-box {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				text-align: center;
				height: calc(@headerheight - constant(safe-area-inset-top));
				height: calc(@headerheight - env(safe-area-inset-top));
				height: @headerheight;
				color: white;

				.header-title {
					color: #fff;
					width: 70%;
					height: 100%;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
				}

				.header-operation {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					width: 12%;
					position: absolute;
					bottom: 0;
					white-space: nowrap;
					color: #333 !important;

					.header-left-back {
						width: 33rpx;
					}

					&.header-left-box {
						left: 0;
					}

					&.header-right-box {
						right: 0;
						width: auto;
					}
				}
			}
		}
	}
</style>
