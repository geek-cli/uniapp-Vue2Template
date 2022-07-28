<template>
    <view class="NoData-box">
        <image
            class="no-data-img"
            src="../static/noData.png"
            mode="widthFix"
        />
        <view class="no-data-tip t-w center relative">{{ noDataTip }}</view>
    </view>
</template>

<script>
export default {
    components: {},
    props: {
        noDataTip: {
            default: "这里什么都没有 去别处看看吧",
        },
    },
    data() {
        return {};
    },
    created() {},
    methods: {},
};
</script>

<style lang="less" scoped>
.NoData-box {
    text-align: center;
	position: absolute;
	left: 55%;
	top: 35%;
	transform: translate(-50%);
    .no-data-img {
        display: block;
        margin: 0 auto;
        width: 248rpx;
		height: 248rpx;
    }
    .no-data-tip {
		min-width: 180rpx;
        font-size: 24rpx;
        font-weight: 500;
        color: #999999;
		line-height: 40rpx;
		margin-top: 20rpx;
		left: -20rpx;
    }
}
</style>