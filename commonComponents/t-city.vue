<template>
	<view class="container">
		<!-- 城市搜索 -->
		<view class="city-search-wrap" v-if="isReach">
			<view class="search">
				<button class="r-cancel" open-type="navigateBack" delta="1" @click="()=>{
					isReach = false;
					searchChange('');
				}">
					取消
				</button>
				<view class="l-search">
					<text class="iconfont icon-search"></text>
					 <tk-input ref="searchInput" placeholder="切换城市/区县请在此搜索" placeholder_style="color:#8E8F97" :value="inputValue" class="input-search" @input="searchChange" :inputStyle="{
						 height: '60rpx',
						 boxSizing: 'border-box',
						 textAlign: 'center'
					 }" />
					<text class="clear-input iconfont icon-icon-test" v-if="isClearBtn" @click="inputValue = ''"></text>
				</view>
				<button class="searchBtn" @click="search">
					搜索
				</button>
			</view>
			<!-- 搜索列表  -->
			<view class="reach-content" v-show="inputValue">
				<block v-show="searchData.length">
					<view class="li borderBottom" v-for="item in searchData" :key="item.id" @click="selectSearchList(item)">{{ item.name }}</view>
				</block>
				<view class="has-no-data" v-show="hasNoData">
					<view class="nodata">
						您搜索的区域暂无商户
					</view>
					<view class="block">
						<view class="area borderBottom list-item" id="area">
							<view class="title-wrapp">
								<view class="title">
									<text class="l">
										已有店铺城市列表
									</text>
								</view>
							</view>
							<view class="ul">
								<template v-for="(item, index) in recommendCity">
									<view>
										<view class="li oneEllipsis" v-for="(city, key) of item.area" @click="selectSearchList({id: key, name: city})">
											{{city}}
										</view>
									</view>
								</template>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 城市列表 -->
		<view v-show="!isReach">
			<view class="top-search">
				<image src="../static/selectAddressClose.png" mode="" class="close" @click="close"></image>
				<button class="item" @click="isReach = true">
					<text class="iconfont icon-search"></text>
					<text>切换城市/区县请在此搜索</text>
				</button>
			</view>
			<scroll-view class="scroll-view" scroll-y scroll-with-animation enable-back-to-top="true" :scroll-into-view="toIndex"
			 @scroll="scrollHandle">
				<view class="block">
					<!-- 当前城市 -->
					<view class="area borderBottom list-item" id="area">
						<view class="title-wrapp">
							<view class="title">
								<text class="l">
									当前：
									<text>{{ userSelectArea ? userSelectArea.name : UserLocation ? UserLocation.address.city : '定位失败，请前往授权' }}</text>
								</text>
								<!-- <text class="r" :class="{ isHide: isToggle }" @click="isToggle = !isToggle" v-if="regionList.length">
									切换区县
									<image src="../static/address/btmArrow.png"></image>
								</text> -->
							</view>
						</view>
						<view class="ul" v-if="!UserLocation && !userSelectArea">
							<view class="li oneEllipsis" hover-class="hover" @click="$Common.openLocationSet()">
								授权
							</view>
						</view>
						<!-- <view class="ul" v-else-if="isToggle">
							<view class="li oneEllipsis" hover-class="hover" :class="{ active: areaName == item.name }" v-for="item in regionList"
							 :key="item.areaId" @click="selectRegion(item)">
								{{ item.name }}
							</view>
						</view> -->
					</view>
				</view>
				<!-- 定位/热门 -->
				<!-- <view class="center" v-if="UserLocation || areaRecentVisitTo"> -->
					<!-- 定位/最近访问 -->
					<!-- <view class="area list-item" id="positioning">
						<view class="title-wrapp">
							<view class="title">
								<text class="l">定位/最近访问</text>
							</view>
						</view>
						<view class="ul">
							<view class="li positioning" hover-class="hover" v-if="UserLocation" @click="selectSuccess({name: UserLocation.address.city, id: UserLocation.id})">
								<image src="../static/addressAct.png" mode=""></image>
								{{UserLocation.address.city}}
							</view>
							<view class="li positioning" hover-class="hover" v-for="item in areaRecentVisitTo" @click="selectSuccess(item)">
								{{item.name}}
							</view>
						</view>
					</view> -->
				<!-- </view> -->
				
				<!-- 暂无列表数据 -->
				<view class="nodata" v-if="!regionList.length && cities && cities.length">
					当前定位内暂无店铺
				</view>
				
				<!-- 城市列表  -->
				<view class="city-list">
					<view class="recommendedTitle" v-if="!regionList.length && cities && cities.length">
						已有店铺城市列表
					</view>
					<template v-for="(item, index) in cities">
						<view class="list list-item" :key="index" :id="item.initials">
							<view class="title">{{ item.initials }}</view>
							<view class="item borderBottom" hover-class="hover" v-for="(innerItem, key) of item.area" :key="key" @click="!regionList.length ? selectSearchList({name: innerItem, id: key}) : selectCity({name: innerItem, id: key})">
								{{ innerItem }}
							</view>
						</view>
					</template>
				</view>
			</scroll-view>

			<!-- 字母列表 -->
			<view class="alphabet" @touchstart="touchStart" @touchend="touchEnd" @touchmove.stop="touchMove">
				<view v-for="(item, index) in cities" :key="index" @touchstart="getLetter" @touchend="setLetter" :id="item.initials">
					<view class="item" :class="{ active: currentLetter == cities.initials }">
						{{ item.initials == "area" ? "区县" : item.initials }}
					</view>
				</view>
			</view>
		</view>
	
		<!-- 市下面的区县 -->
		<uni-popup ref="cityPopup" type="center" :mask-click="false">
			<view class="cityPopup relative" @touchmove.stop>
				<view class="title">
					选择区域
				</view>
				<!-- 关闭按钮 -->
				<image @click="$refs.cityPopup.close()" class="close absolute" src="/static/confirmOrder/close.png" mode=""></image>
				<view class="area borderBottom list-item" id="area">
					<view class="ul">
						<view class="li oneEllipsis" v-for="(city, key) of city_area" @click="selectRegion(city)">
							{{city.name}}
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import City from "@/static/city.json";
	export default {
		props: {
			// 用户定位
			userLocation: {
				default: null
			},
			// 用户选择区域
			userSelectArea: {
				default: null
			},
			// 商品id
			baseProductId: {
				default: null
			}
		},
		data() {
			return {
				isIPX: null,
				regionId: null, //区域ID
				isToggle: true,
				isReach: false,
				inputValue: "",
				searchData: [], //搜索的数据
				isClearBtn: false,
				letterList: City.data.alphabet, // 字母列表
				regionList: [], //区域列表,
				cityId: null, //城市ID
				cityName: null, //城市名
				areaName: null, //区域名,
				areaId: null, // 区域id
				cities: null, //城市列表
				toIndex: "", //跳转的索引的字母
				tipsLetter: "", //滑动显示字母
				timer: null,
				hasNoData: false,
				searchFocus: false,
				letterDetails: [],
				currentLetter: "A", //默认选择A
				UserLocation: null, // 用户定位信息
				areaRecentVisitTo: [], // 最近访问
				originRegionList: [],
				city_area: [], // 城市下的区域，搜索时使用，因为这是明总的需求，所以没有为啥
				recommendCity: null, // 推荐列表
				searchDataList: null, // 搜索数据列表
			};
		},
		watch: {
			isReach(val) {
				if(val)  {
					setTimeout(()=>{
						this.searchInputFocus();
					}, 300)
				}
			},
			userLocation() {
				this.UserLocation = this.userLocation;
			},
			UserLocation() {
				if(this.UserLocation && !this.userSelectArea) {
					this.$api.fetchUserCityId({city_name: this.UserLocation.address.city}, {
						success: res=>{
							this.UserLocation.id = res.city_id;
							this.getfetchAreaCityName(res.city_id);
						}
					})
				}
			}
		},
		created() {
			//真实数据请求...
			this.UserLocation = this.userLocation;
			// 获取区县
			if(this.userSelectArea) {
				this.getfetchAreaCityName(this.userSelectArea.id);
			}
			// if(!this.userSelectArea && !this.UserLocation) {
			// 	// 获取地址列表
			// 	this.getFetchCityAndArea();
			// }
			// 获取最近访问
			this.areaRecentVisitTo = uni.getStorageSync("areaRecentVisitTo");
		},
		methods: {
			// 关闭
			close() {
				uni.navigateBack();
			},
			//列表滚动，和右边字母表对应
			scrollHandle(e) {
					let view = uni.createSelectorQuery().in(this).selectAll(".list-item");
					view.boundingClientRect(d => {
						let top = d[0].top;
						d.forEach(item => {
							item.top = item.top - top;
							item.bottom = item.bottom - top;
							this.letterDetails.push({
								id: item.id,
								top: item.top,
								bottom: item.bottom
							});
						});
					}).exec();

					const scrollTop = e.detail.scrollTop;
					this.letterDetails.some(item => {
						if (scrollTop >= item.top && scrollTop <= item.bottom - 20) {
							this.currentLetter = item.id;
							//当前固定用的是粘性定位，如果不用粘性定位，在这里设置
							return true;
						}
					});
			},

			// 输入搜索内容时
			searchChange(value) {
				this.inputValue = value;
				this.searchData = null;
				this.hasNoData = false;
			},
			
			// 搜索框选中
			searchInputFocus() {
				this.$refs.searchInput.focus();
				this.$refs.searchInput.showKeyboard();
			},
			
			// 搜索
			search() {
				this.isClearBtn = this.inputValue ? true : false;
				
				if (this.timer) {
					clearTimeout(this.timer);
				}
				
				if (!this.inputValue) {
					this.searchData = [];
					return;
				}
				this.timer = setTimeout(() => {
					const result = [];
					if(this.searchDataList) {
						// 遍历筛选符合要求得数据
						this.searchDataList.forEach((item, index) => {
							for(var key in item.area) {
								if ( item.area[key].includes(this.inputValue) ) {
									result.push({
										id: key,
										name: item.area[key]
									});
								}
							}
						})
					}
					this.searchData = result;
					if (this.searchData.length === 0) {
						this.hasNoData = true;
						// 如果推荐城市列表还未获取过则获取，获取过则不再获取
						!this.recommendCity && this.getFetchRecommendCity();
					} else {
						this.hasNoData = false;
					}
				}, 500);
			},

			//搜索结果列表数据
			citySearchList(item) {
				console.log('选择的城市：', item)
				// 选择完成
				this.selectSuccess({id: item.id, name: item.name});
			},

			// 选择城市
			selectCity(item) {
				console.log('选择的城市：', item)
				// 记录本次选中的城市
				this.selectSuccess({id: item.id, name: item.name});
			},
			
			//区域选择
			selectRegion(item) {
				console.log('选择的区域是：', item);
				// 记录本次选中的城市
				this.selectSuccess({id: item.id, name: item.name});
			},

			//触发开始
			touchStart(e) {
				// console.log(e);
			},
			//移动时
			touchMove(e) {
				uni.vibrateShort();
				let y = e.touches[0].clientY;
				let offsettop = e.currentTarget.offsetTop;

				//判断选择区域,只在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 15); //右边每个字母元素的高度
					let letter = this.alphabet[num];
					this.tipsLetter = letter;

					let curentLetter = this.letterTransform(letter);
					uni.showToast({
						title: curentLetter,
						icon: "none",
						duration: 1000
					});
				}
			},
			//触发结束
			touchEnd() {
				this.toIndex = this.tipsLetter;
			},
			//移动开始获取字母，并放大提示
			getLetter(e) {
				let {
					id
				} = e.currentTarget;
				uni.vibrateShort();
				this.tipsLetter = id;
				let curentLetter = this.letterTransform(id);
				uni.showToast({
					title: curentLetter,
					icon: "none",
					duration: 1000
				});
			},
			//移动结束设置字母，赋值到toIndex
			setLetter() {
				this.toIndex = this.tipsLetter;
			},

			//提示字母转换
			letterTransform(letter) {
				let str = "";
				if (letter == "area") {
					str = "区县";
				} else if (letter == "hot") {
					str = "热门";
				} else {
					str = letter;
				}

				return str;
			},
			// 获取市区详情
			getFetchCityAndArea(isRecommended) {
				uni.showLoading({
					mask: true
				});
				let api = isRecommended ? "fetchRecommendCity" : "fetchCityAndAreaList";
				this.$api[api]({base_product_id: this.baseProductId, city_id: this.UserLocation.id}, {
					success: res=>{
						this.originRegionList = res[isRecommended ? 'list' : 'data'];
						// 如果为推荐列表则搜索数据 直接等于推荐列表 否则获取搜索列表数据
						if(isRecommended) {
							this.searchDataList = this.originRegionList
						} else {
							this.$api.fetchCityAndArea({base_product_id: this.baseProductId}, {
								success: res=>{
									this.searchDataList = res.data;
								}
							})
						}
						
						setTimeout(()=>{
							this.cities = [];
							let num = 0; // 目前渲染的下标
							let timer = setInterval(()=>{
								// 将本次的数据插到字母表中指定的位置
								this.originRegionList.forEach((item, index)=>{
									if(this.originRegionList[num].initials == item.initials) {
										// 如果本此插入的列表和字母表中列表字母对应上且当前位置没有数据则插入 这样可以防止数据被覆盖
										this.cities[index] = this.originRegionList[num];
										this.$forceUpdate();
										num++;
										if(num >= this.originRegionList.length) {
											clearInterval(timer);
										}
									}
								})
								
							}, 500)
							uni.hideLoading();
						}, 200)
					}
				})
			},
			// 获取区县
			getfetchAreaCityName(area_id) {
				this.$api.fetchAreaCityName({area_id, base_product_id: this.baseProductId}, {
					success: res=>{
						this.regionList = res.list;
						this.regionList.forEach((item, index)=>{
							if(item.id == area_id) {
								this.areaId = item.id;
								this.areaName = item.name;
							}
						})
						// 获取地址列表
						this.getFetchCityAndArea(!this.regionList.length ? true : false);
					}
				})
			},
			// 选择完成
			selectSuccess(info) {
				// 储存用户选择城市
				uni.setStorageSync("userSelectArea", info);
				// 记录用户最近访问
				let areaRecentVisitTo = uni.getStorageSync("areaRecentVisitTo");
				if(areaRecentVisitTo) {
					// 如果本次访问出现在最近访问记录中则删除对应的记录
					areaRecentVisitTo.forEach((item, index)=>{
						item.id == info.id ? areaRecentVisitTo.splice(index, 1) : ''
					})
					// 将本次访问的城市记录在最开始的位置
					areaRecentVisitTo.unshift(info);
					// 只取前三个
					areaRecentVisitTo = areaRecentVisitTo.slice(0, 3);
					// 保存
					uni.setStorageSync("areaRecentVisitTo", areaRecentVisitTo);
				}else {
					uni.setStorageSync("areaRecentVisitTo", [info])
				}
				uni.navigateBack();
			},
			
			// 选中搜索列表数据
			selectSearchList(area) {
				// 点击搜索数据时查看当前是区还是市
				this.$api.searchCityAreaName({area_id: area.id, base_product_id: this.baseProductId}, {
					success: res=>{
						// 如果市 展示市下面的区
						if(res.list) {
							this.city_area = res.list;
							this.$refs.cityPopup.open();
						} else { // 如果区县直接选中
							this.citySearchList(area)
						}
					}
				})
			},
			
			// 获取推荐城市列表
			getFetchRecommendCity() {
				this.$api.fetchRecommendCity({base_product_id: this.baseProductId}, {
					success: res=>{
						this.recommendCity = res.list;
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.borderBottom {
		position: relative;
	}
	.uni-popup.center {
		background-color: #fff;
	}
	.city-search-wrap {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #fff;

		.search {
			width: 100%;
			height: 60rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #222;
			padding: 0 30rpx;
			box-sizing: border-box;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 1;
			background: #fff;
			padding-top: 19rpx;

			.l-search {
				flex: 1;
				background: #f4f5f9;
				border-radius: 50rpx;
				position: relative;
				
				.icon-search {
					font-size: 26rpx;
					position: absolute;
					left: 30rpx;
					top: 50%;
					transform: translateY(-50%);
					color: #8e8f97;
					font-weight: 700;
				}

				.clear-input {
					font-size: 30rpx;
					position: absolute;
					right: 10rpx;
					top: 50%;
					transform: translateY(-50%);
					padding: 10rpx;
					color: #8e8f97;
				}
			}

			.r-cancel, .searchBtn{
				
				padding-right: 30rpx;
				padding: 0;
				font-size: 30rpx;
				background: transparent;
				&::after {
					border: none;
				}
			}
			.r-cancel {
				margin-right: 28rpx;
			}
			.searchBtn {
				margin-left: 28rpx;
			}
		}
	}

	.reach-content {
		padding-top: 60rpx;

		.li {
			font-size: 32rpx;
			color: #333;
			padding: 20rpx 0;
			position: relative;
		}
	}

	.block {
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	
	.center {
		background-color: #f5f5f5;
		padding: 30rpx 30rpx 0;
		.title-wrapp {
			background-color: #f5f5f5 !important;
		}
		.li {
			background-color: #fff !important;
		}
	}

	.borderBottom {
		position: relative;
	}

	.top-search {
		line-height: 60rpx;
		padding: 19rpx 30rpx 0;
		box-sizing: border-box;
		margin: 0 0 50rpx;
		display: flex;
		align-items: center;
		.close {
			width: 34rpx;
			height: 34rpx;
		}
		.item {
			width: 626rpx;
			height: 66rpx;
			background: #EEEEEE;
			border-radius: 50rpx;
			font-size: 24rpx;
			color: #8e8f97;
			&::after {
				border: none;
			}
			text {
				padding-left: 20rpx;
				color: #c1c2cd;
			}

			.icon-search {
				font-size: 26rpx;
				color: #8e8f97;
				font-weight: 700;
			}
		}
	}

	.scroll-view {
		width: 100%;
		height: calc(100vh - 80rpx);
		box-sizing: border-box;
		.nodata {
			color: #a5a5a5;
			margin-left: 26rpx;
			margin-bottom: 20rpx;
			font-size: 36rpx;
		}
	}

	.area {
		padding-bottom: 40rpx;
		.title-wrapp {
			// position: sticky;
			top: 0;
			left: 0;
			background: #fff;
		}

		.title {
			width: 100%;
			box-sizing: border-box;
			font-size: 40rpx;
			font-weight: 500;
			color: #222;
			font-size: 30rpx;
			font-weight: 500;
			margin-bottom: 14rpx;
			display: inline-flex;
			justify-content: space-between;
			align-items: center;
			
			.l {
				font-size: 30rpx;
				font-weight: bold;
				color: #333333;
			}
			
			.r {
				display: inline-block;
				align-items: center;
				font-size: 26rpx;
				font-weight: 500;
				color: #999999;
				image {
					width: 24rpx;
					height: 24rpx;
					position: relative;
					top: 4rpx;
					margin-left: 10rpx;
				}
			}
		}

		.ul {
			display: flex;
			flex-wrap: wrap;

			.li {
				width: 202rpx;
				padding: 0 10rpx;
				box-sizing: border-box;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 26rpx;
				color: #222;
				border-radius: 10rpx;
				margin: 20rpx 20rpx 0 0;
				background: #f5f5f5;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				&.positioning  {
					display: flex;
					align-items: center;
					justify-content: center;
					image {
						width: 38rpx;
						height: 38rpx;
						margin-right: 11rpx;
					}
				}
				&.oneEllipsis {
					&.active {
						font-weight: 500;
						background: #3F63F5;
						color: #fff;
					}
					&.hover {
						background: #3F63F5;
						color: #fff;
					}
				}
			}
		}
	}

	.city-list {
		width:100%;
		padding-bottom: 50rpx;
		.recommendedTitle {
			font-size: 35rpx;
			font-weight: 500;
			color: #333333;
			margin-bottom: 20rpx;
			margin-left: 27rpx;
		}
		.title {
			height: 60rpx;
			line-height: 60rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #272636;
			background: #f4f5f9;
			// margin-bottom: 20rpx;
			padding-left: 30rpx;
			position: sticky;
			top: 0;
			left: 0;
			z-index: 2;
		}

		.item {
			padding: 24rpx 0 24rpx 30rpx;
			color: #333;
			font-size: 32rpx;
			font-weight: 500;

			&::after {
				left: 30rpx;
				width: calc(100% - 30rpx);
				background: #d2d2d2;
			}
		}

		.hover {
			background: #f4f5f9;

			&::after {
				background: #f4f5f9;
			}
		}
	}

	.alphabet {
		position: fixed;
		right: 0;
		bottom: 20%;
		width: calc(750rpx - 680rpx);
		text-align: center;
		font-size: 20rpx;
		font-weight: 700;
		color: #8e8f97;
		z-index: 10;
		.item {
			height: 15px;
			line-height: 15px;
		}

		.active {
			color: #222;
		}
	}

	.has-no-data {
		.block {
			padding: 0;
		}
		.nodata {
			font-size: 40rpx;
			text-align: center;
			color: #8e8f97;
			margin: 50rpx 0;
		}
	}
	.cityPopup {
		width: 700rpx;
		height: 50vh;
		border-radius: 20rpx;
		background-color: #fff;
		padding: 30rpx;
		.title {
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			text-align: center;
			margin-bottom: 10rpx;
		}
		.close {
			width: 40rpx;
			height: 40rpx;
			right: 30rpx;
			top: 30rpx;
		}
		.area {
			padding-bottom: 0;
		}
		.ul {
			height: calc(50vh - 120rpx) !important;
			overflow: auto;
			.li {
				background-color: #f5f5f5 !important;
				margin: 20rpx 15rpx 0 0 !important;
				&:nth-child(3n + 3) {
					margin-right: 0 !important;
				}
			}
		}
	}
</style>
