import request from './request'
import config from './config'

export default {
	// 获取版本号
	fetchVersion: (params, opt) => {
		return request.bgPost(config.api.serviceUrl + '/get_android_version_number', opt, params, false)
	},
	// 下载链接
	downUrl: (params, opt) => {
		return request.bgPost(config.api.serviceUrl + '/get_app_download_url', opt, params, false)
	},
	// 首页专题商品
	getProjectList: (params, opt) => {
		return request.bgPost(config.api.serviceUrl + '/get_project_list', opt, params, false)
	},
	// 首页专题下商品
	getProjectProductList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/get_project_product_list', opt, params, false)
	},
	// 首页搜索
	searchProductListByKey: (params, opt) => {
		return request.post(config.api.apiUrl + '/search_product_list_by_key', opt, params)
	},
	// 登录
	login: (params, opt) => {
		return request.post(config.api.apiUrl + '/login', opt, params, false)
	},
	// 获取养老中心-商品详情
	goodsDetail: (params, opt) => {
		return request.post(config.api.serviceUrl + '/goods_detail', opt, params, false)
	},
	// 获取搜索历史
	getUserSearchHistoryList: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/get_user_search_history_list', opt, params)
	},
	
	// 首页金刚区
	getAricleList: (params, opt) => {
		return request.bgPost(config.api.serviceUrl + '/get_aricle_list', opt, params, false)
	},
	// 首页轮播图
	getAdList: (params, opt) => {
		return request.bgPost(config.api.serviceUrl + '/get_ad_list', opt, params, false)
	},
	// 养老中心分类
	productCategory: (params, opt) => {
		return request.post(config.api.serviceUrl + '/product_category', opt, params, false)
	},
	// 养老中心分类下商品
	categoryProducts: (params, opt) => {
		return request.post(config.api.serviceUrl + '/category_products', opt, params, false)
	},
	// 购买商品（单件）
	buyProductByDetail: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/buy_product_by_detail', opt, params)
	},
	// 积分支付
	shopIntegralPay: (params, opt) => {
		return request.post(config.api.apiUrl + '/shop_integral/pay', opt, params)
	},
	// 验证支付密码
	checkPayPassword: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/check_pay_password', opt, params)
	},
	// 获取用户信息
	userInfo: (params, opt) => {
		return request.get(config.api.apiUrl + '/detail', opt, params)
	}, 
	// 静态获取用户信息
	bgUserInfo: (params, opt) => {
		return request.bgGET(config.api.apiUrl + '/detail', opt, params)
	}, 
	// 订单列表
	orderList: (params, opt) => {
		return request.post(config.api.apiUrl + '/order_list', opt, params)
	}, 
	// 添加购物车
	addShopingCart: (params, opt) => {
		return request.post(config.api.apiUrl + '/add_shopping_cart', opt, params)
	}, 
	
	// 购物车列表
	shoppingCartList: (params, opt) => {
		return request.post(config.api.apiUrl + '/shopping_cart_list', opt, params)
	}, 
	// 删除购物车列表
	batchDeleteShoppingCate: (params, opt) => {
		return request.post(config.api.apiUrl + '/batch_delete_shopping_cate', opt, params)
	},
	// 编辑购物车
	changeCartsNumberByInput: (params, opt) => {
		return request.post(config.api.apiUrl + '/change_carts_number_by_input', opt, params)
	},
	// sku商品详情
	skuDetail: (params, opt) => {
		return request.post(config.api.serviceUrl + '/sku_detail', opt, params)
	},
	// 购物车结算商品信息获取接口
	cartListInfo: (params, opt) => {
		return request.post(config.api.apiUrl + '/cart_list_info', opt, params)
	}, 
	// 多商品获取订单信息
	buyProductByCart: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/buy_product_by_cart', opt, params)
	}, 
	// 获取收货地址列表
	getAddressList: (params, opt) => {
		return request.post(config.api.apiUrl + '/get_address_list', opt, params)
	}, 
	getAddressListBG: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/get_address_list', opt, params)
	},
	// 获取省列表
	get_province_list: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/get_province_list', opt, params)
	}, 
	// 获取市列表
	get_city_area_list: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/get_city_area_list', opt, params)
	},
	// 添加地址
	addAddress: (params, opt) => {
		return request.post(config.api.apiUrl + '/add_address', opt, params)
	},
	// 获取收货地址详情
	address_detail: (params, opt) => {
		return request.post(config.api.apiUrl + '/address_detail', opt, params)
	},
	address_detailBG: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/address_detail', opt, params)
	},
	// 编辑收货地址有加载状态
	editUserAddress: (params, opt) => {
		return request.post(config.api.apiUrl + '/edit_user_address', opt, params)
	},
	// 删除收货地址
	deleteAddress: (params, opt) => {
		return request.post(config.api.apiUrl + '/delete_address', opt, params)
	},
	// 获取收货默认地址
	getDefaultAddress: (params, opt) => {
		return request.post(config.api.apiUrl + '/get_default_address', opt, params)
	},
	
	// 短信验证码
	mobileCode: (params, opt) => {
		return request.post(config.api.serviceUrl + '/user/mobile_code', opt, params)
	},
	// 不带token短信验证码
	mobileCodeNo: (params, opt) => {
		return request.post(config.api.serviceUrl + '/mobile_code', opt, params, false)
	},
	// 修改登录密码
	changePassword: (params, opt) => {
		return request.post(config.api.apiUrl + '/change_password', opt, params)
	},
	// 修改支付免密
	modifyPayPassword: (params, opt) => {
		return request.post(config.api.apiUrl + '/modify_pay_password', opt, params)
	},
	// 验证验证码是否正确
	checkCode: (params, opt) => {
		return request.post(config.api.apiUrl + '/check_code', opt, params)
	},
	// 绑定手机号
	bindMobile: (params, opt) => {
		return request.post(config.api.apiUrl + '/bind_mobile', opt, params)
	},
	// 获取版本号
	getAndroidVersionNumber: (params, opt) => {
		return request.post(config.api.apiUrl + '/get_android_version_number', opt, params)
	},
	// 获取用户建议列表
	getUserProposalList: (params, opt) => {
		return request.post(config.api.apiUrl + '/get_user_proposal_list', opt, params)
	},
	// 发送用户建议
	sendUserProposal: (params, opt) => {
		return request.post(config.api.apiUrl + '/send_user_proposal', opt, params)
	},
	// 优享积分列表
	integralLogList: (params, opt) => {
		return request.post(config.api.apiUrl + '/integral_log_list', opt, params)
	},
	// 福利金列表
	welfareBalanceLogList: (params, opt) => {
		return request.post(config.api.apiUrl + '/welfare_balance_log_list', opt, params)
	},
	// 购物卷列表
	getUserCouponList: (params, opt) => {
		return request.post(config.api.apiUrl + '/vip/get_user_coupon_list', opt, params)
	},
	// 获取订单列表
	getLowerOrderList: (params, opt) => {
		return request.post(config.api.apiUrl + '/get_lower_order_list', opt, params)
	},
	// 数据管理
	getLowerUserList: (params, opt) => {
		return request.post(config.api.apiUrl + '/get_lower_user_list', opt, params)
	},
	// 财务管理数据
	oldFundInfo: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/old_fund_info', opt, params)
	},
	// 获取积分明细
	oldBalanceList: (params, opt) => {
		return request.post(config.api.apiUrl + '/old_balance_list', opt, params)
	},
	// 获取奖励金额明细
	kangyangFundList: (params, opt) => {
		return request.post(config.api.apiUrl + '/kangyang_fund_list', opt, params)
	},
	// 获取待支付新的订单号
	orderPayBefore: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/order_pay_before', opt, params)
	},
	// 取消订单
	cancelOrder: (params, opt) => {
		return request.post(config.api.apiUrl + '/cancel_order', opt, params)
	},
	
	// 订单退款
	cancelProductOrder: (params, opt) => {
		return request.post(config.api.apiUrl + '/cancel_product_order', opt, params)
	},
	// 确认收货
	sureOrder: (params, opt) => {
		return request.post(config.api.apiUrl + '/sure_order', opt, params)
	},
	// 订单详情
	orderDetail: (params, opt) => {
		return request.post(config.api.apiUrl + '/order_detail', opt, params)
	},
	// 售后订单列表
	refoundList: (params, opt) => {
		return request.post(config.api.apiUrl + '/refound_list', opt, params)
	},
	// 商品退换货
	orderRefunds: (params, opt) => {
		return request.post(config.api.apiUrl + '/order_refunds', opt, params)
	},
	// 上传图片
	uploadPic: (file, type, opt) => {
		return request.postFile(config.api.uploadUrl + '?type=' + type, file, opt, false)
	},
	// 判断用户是否有权限进行核销
	userIsCanWriteOff: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/user_is_can_write_off', opt, params)
	},
	// 首页专区图标
	indexRegionList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/index_region_list', opt, params, false)
	},
	// 首页专题列表
	indexProjectList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/index_project_list', opt, params, false)
	},
	// 首页专题商品
	zhProjectProductList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/zh_project_product_list', opt, params, false)
	},
	// 智慧康养购物车
	zhShoppingCartList: (params, opt) => {
		return request.post(config.api.apiUrl + '/zh_shopping_cart_list', opt, params)
	},
	
	// 清空搜索历史
	delUserSearchHistoryList: (params, opt) => {
		return request.post(config.api.apiUrl + '/del_user_search_history_list', opt, params)
	},
	// 售后详情
	refoundInfo: (params, opt) => {
		return request.post(config.api.apiUrl + '/refound_info', opt, params)
	},
	// 获取物流公司列表
	expressCompanyList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/express_company_list', opt, params, false)
	},
	// 提交退款/退货信息
	upRefoundStatus: (params, opt) => {
		return request.post(config.api.apiUrl + '/up_refound_status', opt, params)
	},
	// 注册接口
	register: (params, opt) => {
		return request.post(config.api.serviceUrl + '/register', opt, params, false)
	},
	// 检查销售人员
	checkSaleUserMobile: (params, opt) => {
		return request.post(config.api.apiUrl + '/check_sale_user_mobile', opt, params)
	},
	// 检查用户是否绑定了销售关系
	checkUserBindMobile: (params, opt) => {
		return request.post(config.api.apiUrl + '/check_user_bind_mobile', opt, params)
	},
	
	// 销售绑定
	saleBind: (params, opt) => {
		return request.post(config.api.apiUrl + '/sale_bind', opt, params)
	},
	// 联营管理
	doShopPool: (params, opt) => {
		return request.post(config.api.apiUrl + '/do_shop_pool', opt, params)
	},
	// 实名认证
	userCertification: (params, opt) => {
		return request.post(config.api.apiUrl + '/user_certification', opt, params)
	},
	// 检测手机号是否可以联营
	checkMobileIsEntityShop: (params, opt) => {
		return request.post(config.api.apiUrl + '/check_mobile_is_entity_shop', opt, params)
	},
	// 获取用户实名认证信息
	getUserCertificationInfo: (params, opt) => {
		return request.post(config.api.apiUrl + '/get_user_certification_info', opt, params)
	},
	// 用户联营和解除联营申请记录
	fetch_user_apply_info: (params, opt) => {
		return request.post(config.api.apiUrl + '/fetch_user_apply_info', opt, params)
	},
	// 联营解绑
	userDismissEntity: (params, opt) => {
		return request.post(config.api.apiUrl + '/user_dismiss_entity', opt, params)
	},
	// 智慧康养搜索
	zhShopSearch: (params, opt) => {
		return request.post(config.api.apiUrl + '/zh_shop_search', opt, params)
	},
	// 智慧康养搜索历史
	getUserSearchHistoryList: (params, opt) => {
		return request.post(config.api.apiUrl + '/get_user_search_history_list', opt, params)
	},
	// 核销订单详情（扫码进入）
	writeOffOrderInfo: (params, opt) => {
		return request.post(config.api.apiUrl + '/write_off_order_info', opt, params)
	},
	// 订单核销
	orderWirteOff: (params, opt) => {
		return request.post(config.api.apiUrl + '/order_wirte_off', opt, params)
	},
	// 核销订单
	userWriteOffOrderList: (params, opt) => {
		return request.post(config.api.apiUrl + '/user_write_off_order_list', opt, params)
	},
	
	// 消息
	messageList: (params, opt) => {
		return request.post(config.api.apiUrl + '/message_list', opt, params)
	},
	// 重新获取token
	fetchJhUserToken: (params, opt) => {
		return request.post(config.api.apiUrl + '/fetch_jh_user_token', opt, params)
	},
	// 文章详情
	articleDetail: (params, opt) => {
		return request.post(config.api.serviceUrl + '/article_detail', opt, params)
	},
	
	// 换货发货后的确认收货
	sureReturnOrder: (params, opt) => {
		return request.post(config.api.apiUrl + '/sure_return_order', opt, params)
	},
	
	// 用户绑定银行卡
	userBindWithdrawAccount: (params, opt) => {
		return request.post(config.api.apiUrl + '/user_bind_withdraw_account', opt, params)
	},
	// 获取客服联系方式
	customerMobile: (params, opt) => {
		return request.post(config.api.apiUrl + '/customer_mobile', opt, params)
	},
	// 核销订单退款
	writeOffOrderRefund: (params, opt) => {
		return request.post(config.api.apiUrl + '/write_off_order_refund', opt, params)
	},
	// 用户协议
	user_agreement: (params, opt) => {
		return request.post(config.api.apiUrl + '/user_agreement', opt, params, false)
	},
	// 用户隐私政策
	privacy: (params, opt) => {
		return request.post(config.api.apiUrl + '/privacy', opt, params)
	},
	
	// 获取热门搜索词汇
	getTopSearchList: (params, opt) => {
		return request.post(config.api.serviceUrl + '/get_top_search_list', opt, params)
	},
	// 购买优享会员
	getConfig: (params, opt) => {
		return request.post(config.api.apiUrl + '/vip/get_config', opt, params)
	},
	// 筛选业绩
	shopAchieveLogs: (params, opt) => {
		return request.post(config.api.apiUrl + '/shop_achieve_logs', opt, params)
	},
	// 转增积分
	userTeamTransfer: (params, opt) => {
		return request.post(config.api.apiUrl + '/user_team_transfer', opt, params)
	},
	// 获取转赠的手机号
	fetchUserKangyangshop: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/fetch_user_kangyangshop', opt, params)
	},
	// 转增积分记录
	userTeamTransferLogs: (params, opt) => {
		return request.bgPost(config.api.apiUrl + '/user_team_transfer_logs', opt, params)
	},
	// 积分提现
	jhUserBalanceWithdraw: (params, opt) => {
		return request.post(config.api.apiUrl + '/jh_user_balance_withdraw', opt, params)
	},
	
	// 找回密码
	recoverPassword: (params, opt) => {
		return request.post(config.api.apiUrl + '/recover_password', opt, params, false)
	},
	// 提现记录
	jhUserWithdrawLogs: (params, opt) => {
        return request.post(config.api.apiUrl + '/jh_user_withdraw_logs', opt, params)
    },
	
	// 微信支付接口
	appWechatPay: (params, opt) => {
        return request.post(config.api.apiUrl + '/app_wechat_pay', opt, params)
    },
	// 养老支付宝支付接口
	yaolaoAlipayPay: (params, opt) => {
	    return request.post(config.api.apiUrl + '/alipay/pay/yaolao_alipay_pay', opt, params)
	},
	// 智慧支付宝支付接口
	shangchengAlipayPay: (params, opt) => {
	    return request.post(config.api.apiUrl + '/alipay/pay/shangcheng_alipay_pay', opt, params)
	},
	// 用户拒绝定位时调起ip地址获取位置
	fetchUserIpLocation: (params, opt) => {
	    return request.post(config.api.apiUrl + '/fetch_user_ip_location', opt, params, false)
	},
	// 优享会员购买
	renewVIP: (params, opt) => {
	    return request.post(config.api.apiUrl + '/vip/renew_vip', opt, params)
	},
	// 修改核销员
	userChangeWriteOffUser: (params, opt) => {
	    return request.post(config.api.apiUrl + '/user_change_write_off_user', opt, params)
	},
	// 获取各种订单数量
	shopOrderCount: (params, opt) => {
	    return request.post(config.api.apiUrl + '/shop_order_count', opt, params)
	},
	// 获取各种订单数量
	shopOrderCountBG: (params, opt) => {
	    return request.bgPost(config.api.apiUrl + '/shop_order_count', opt, params)
	},
	// 消息推送接口
	messagePopup: (params, opt) => {
	    return request.bgPost(config.api.apiUrl + '/message_popup', opt, params)
	},
	// 获取未读消息数量数据
	userIsRed: (params, opt) => {
	    return request.bgPost(config.api.apiUrl + '/user_is_read', opt, params)
	},
	// 销售处理
	doUserBindSale: (params, opt) => {
	    return request.post(config.api.apiUrl + '/do_user_bind_sale', opt, params)
	},
	// 频道列表
	getChannelsList: (params, opt) => {
	    return request.bgPost(config.api.serviceUrl + '/get_channels_list', opt, params, false)
	},
	// 获取购物车物品数量
	shoppingCartCount: (params, opt) => {
	    return request.bgPost(config.api.apiUrl + '/shopping_cart_count', opt, params)
	},
	// 消息详情
	messageInfo: (params, opt) => {
	    return request.bgPost(config.api.apiUrl + '/message_info', opt, params)
	},
	// 同意联营
	shopAgreeShopPool: (params, opt) => {
	    return request.bgPost(config.api.apiUrl + '/shop_agree_shop_pool', opt, params)
	},
	// 拒绝联营
	shopRefuseShopPool: (params, opt) => {
	    return request.bgPost(config.api.apiUrl + '/shop_refuse_shop_pool', opt, params)
	},
	// 同意解绑联营
	shopAgreeDismissEntity: (params, opt) => {
	    return request.bgPost(config.api.apiUrl + '/shop_agree_dismiss_entity', opt, params)
	},
	// 拒绝解绑联营
	shopRefuseDismissEntity: (params, opt) => {
	    return request.bgPost(config.api.apiUrl + '/shop_refuse_dismiss_entity', opt, params)
	},
	// 获取服务类商品详情
	fetchGoodsDetai: (params, opt) => {
	    return request.bgPost(config.api.serviceUrl + '/fetch_goods_detail', opt, params, false)
	},
	// 获取商家信息
	serviceGoodsIInfo: (params, opt) => {
	    return request.post(config.api.serviceUrl + '/service_goods_info', opt, params, false)
	},
	// 获取市区详情（字母排序）
	fetchCityAndArea: (params, opt) => {
	    return request.bgPost(config.api.apiUrl + '/fetch_city_and_area', opt, params, false)
	},
	// 获取用户定位所在市id
	fetchUserCityId: (params, opt) => {
	    return request.post(config.api.apiUrl + '/fetch_user_city_id', opt, params, false)
	},
	// 获取区县
	fetchAreaCityName: (params, opt) => {
	    return request.bgPost(config.api.apiUrl + '/fetch_area_city_name', opt, params, false)
	},
	// 获取栏目分类
	indexColumn: (params, opt) => {
	    return request.post(config.api.serviceUrl + '/index_column', opt, params, false)
	},
	// 二级频道
	getLevelList: (params, opt) => {
	    return request.post(config.api.serviceUrl + '/get_level_list', opt, params, false)
	},
	// 返回上级频道
	returnLevelList: (params, opt) => {
	    return request.post(config.api.serviceUrl + '/return_level_list', opt, params, false)
	},
	// 修改用户名
	updateName: (params, opt) => {
	    return request.post(config.api.apiUrl + '/update_name', opt, params)
	},
	// 获取推荐城市
	fetchRecommendCity: (params, opt) => {
	    return request.post(config.api.apiUrl + '/fetch_recommend_city', opt, params, false)
	},
	// 筛选下面的市区
	searchCityAreaName: (params, opt) => {
	    return request.post(config.api.apiUrl + '/search_city_area_name', opt, params, false)
	},
	// 搜索数据
	fetchCityAndAreaList: (params, opt) => {
	    return request.post(config.api.apiUrl + '/fetch_city_and_area_list ', opt, params, false)
	},
	
	// 获取预约商品列表
	fetchAppointGoods: (params, opt) => {
	    return request.post(config.api.serviceUrl + '/fetch_appoint_goods ', opt, params, false)
	},
	// 预约商品详情列表
	pointGoodsDetail: (params, opt) => {
	    return request.post(config.api.serviceUrl + '/point_goods_detail ', opt, params, false)
	},
	// 预约商品的省
	fetchAppointProvince: (params, opt) => {
	    return request.bgPost(config.api.serviceUrl + '/fetch_appoint_province ', opt, params, false)
	},
	// 预约商品的省
	fetchAppointProvince: (params, opt) => {
	    return request.bgPost(config.api.serviceUrl + '/fetch_appoint_province ', opt, params, false)
	},
	// 预约商品的市区
	fetchAppointCityArea: (params, opt) => {
	    return request.bgPost(config.api.serviceUrl + '/fetch_appoint_city_area ', opt, params, false)
	},
	// 预约商品 用户定位位置范围内的商家
	fetchShopByUserLocation: (params, opt) => {
	    return request.post(config.api.serviceUrl + '/fetch_shop_by_user_location ', opt, params, false)
	},
	// 用户预约商品接口
	userAppointGoods: (params, opt) => {
	    return request.post(config.api.apiUrl + '/user_appoint_goods ', opt, params)
	},
	// 用户是否可以购买预约商品接口
	userCanBuyProduct: (params, opt) => {
	    return request.post(config.api.apiUrl + '/user_can_buy_product ', opt, params)
	},
	// 用户预约商品记录
	userAppointLogs: (params, opt) => {
	    return request.post(config.api.apiUrl + '/user_appoint_logs ', opt, params)
	},
	// 商家预约商品记录
	shopProductAppointLogs: (params, opt) => {
	    return request.post(config.api.apiUrl + '/shop_product_appoint_logs ', opt, params)
	},
	
	// 预约详情
	fetchAppointDetail: (params, opt) => {
	    return request.post(config.api.apiUrl + '/fetch_appoint_detail ', opt, params)
	},
	// 商家审核预约单
	shopExamineAppoint: (params, opt) => {
	    return request.post(config.api.apiUrl + '/shop_examine_appoint ', opt, params)
	},
	// 搜索预约商品
	userSearchAppointGoods: (params, opt) => {
	    return request.post(config.api.serviceUrl + '/user_search_appoint_goods ', opt, params, true)
	},
}