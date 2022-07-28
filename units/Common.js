import api from "@/units/servers/api";
import config from './servers/config';
import i18n from '@/i18n/index.js'

export default {
	// 上传图片
	upChooseImage(callBack, fileType = 'image', count = 1) {
		if (!uni.getStorageSync('QNToken')) {
			// 无七牛Token
			api.qiniuToken('', {
				success: (data) => {
					uni.setStorageSync('QNToken', data.upToken);
					this.upChooseImage(callBack, fileType, count)
				}
			})
			return
		}
		// 指定可上传的类型
		let upFileTypeObj = {
			image: {
				tip: '无指定类型',
			},
			avatar: {
				tip: '头像'
			},
			idCard: {
				tip: '身份证'
			},
			userNft: {
				tip: '自定义NFT'
			}
		}
	
		// 未指定类型时的警告
		if (!upFileTypeObj[fileType]) {
			console.warn('警告：文件类型未定义，若无类型指定可忽略');
			console.warn('警告：文件类型未定义，若无类型指定可忽略');
			console.warn('警告：文件类型未定义，若无类型指定可忽略');
			console.warn('警告：文件类型未定义，若无类型指定可忽略');
			console.warn('警告：文件类型未定义，若无类型指定可忽略');
		}
		// 获取时间戳,对应的文件夹名称
		var nowDate = new Date();
		var nowDateText = nowDate.getFullYear().toString() + (nowDate.getMonth() + 1).toString() + nowDate.getDate()
			.toString();
		uni.chooseImage({
			count,
			sourceType: ['album', 'camera'],
			success(res) {
				if (res.tempFilePaths.length > 0) {
					let imgList = [];
					for (let index = 0; index < res.tempFilePaths.length; index++) {
						// 截取文件名后缀
						var suffix = res.tempFiles[index].name.split('.').pop().toLowerCase();
						// 上传七牛
						uni.uploadFile({
							url: 'http://upload-z1.qiniup.com',
							filePath: res.tempFilePaths[index],
							formData: {
								// 文件名
								'key': fileType + '/' + nowDateText + '/' + new Date().getTime() + Math
									.floor(Math.random() * 100 + 1) + '.' + suffix,
								'token': uni.getStorageSync('QNToken')
							},
							success: (data) => {
								data = JSON.parse(data.data)
								// 拼接文件名
								imgList.push('https://jushashucang.dns.sdyddm.cn/' + data.key)
								if (imgList.length == res.tempFilePaths.length) {
									callBack && callBack(imgList)
								}
							}
						})
					}
				}
			},
			fail: err => {
				console.log(err);
			}
		});
	},

	// 获取个人信息
	getUserInfo(success) {
		api.getUserInfo().then((data)=>{
			uni.setStorageSync('user', data.user);
			success(data.user)
		});
	},

	// 页面跳转
	commonJump(path, clear = false) {
		if (!path) {
			console.warn('请检查跳转地址，跳转地址为空')
			return
		}
		if (clear) {
			uni.reLaunch({
				url: path,
			});
		} else {
			uni.navigateTo({
				url: path,
			});
		}
	},

	// 页面弹出框
	commonToast(title, type = 'none', callback) {
		var toastDuration = 1000
		var toastParams = {
			title: title,
			duration: toastDuration,
			icon: type
		}
		uni.showToast(toastParams);
		if (callback) {
			setTimeout(() => {
				callback()
			}, toastDuration);
		}
	},

	// 页面弹出模态框
	commonMoadl(params) {
		uni.showModal({
			title: params.title, // 提示标题
			content: params.content, // 提示内容
			showCancel: params.showCancel, // 是否显示取消按钮
			cancelText: params.cancelText, // 取消文字按钮
			confirmText: params.confirmText, // 确认按钮文字
			confirmColor: params.confirmColor, // 确认文字颜色
			success: (res) => {
				if (res.confirm) {
					params.success && params.success()
				} else if (res.cancel) {
					params.cancel && params.cancel()
				}
			},
		});
	},

	// 复制
	copy(obj, callback) {
		uni.setClipboardData({
		    data: obj.value,
		    success: ()=>{
		        uni.showToast({
		        	icon: "none",
					title: obj.alertText ? obj.alertText : "复制成功",
					mask: true,
					duration: 800,
					success: res=>{
						callback && callback(res)
					}
		        })
		    }
		});
	},
	// 表单验证方法
	// 该方法验证失误会返回一个fasle
	// 成功之后则会返回一个 key: value的形式 会去除其他的验证
	// 如有不需要验证的属性，则该属性不写成key: {}, 而是key:value
	formValidation(reg) {
		let copy = JSON.parse(JSON.stringify(reg));
		for(var key in copy) {
			if(Object.prototype.toString.call(copy[key]) == '[object Object]' && !copy[key].value) {
				// 如果遇到未通过验证的值则返回false
				Common.commonToast(copy[key].error);
				return false;
			}
		}
		// 通过全部验证后 去除验证仅保留值
		for(var key in copy) {
			if(Object.prototype.toString.call(copy[key]) == '[object Object]') {
				copy[key] = copy[key].value;
			}
		}
		return copy
	},
	
	// 保留小数
	keepDecimals(number, length = 4) {
		return (number * 1).toFixed(length);
	},
	
	// 语言切换
	Language(lang){
		// 切换语言标识
		i18n.locale = lang;
		uni.setStorageSync('lang', lang);
	},
	
	// 毫秒转换为年月日
	millisecondToDate(millisecond) {
		// timeStr是毫秒值
		let time = new Date(millisecond);
		// 获取年份
		var year = time.getFullYear();
		//获取月份，获取的月份比实际小1，所以需要+1
		var month = String(time.getMonth() + 1).padStart(2, 0);
		//获取日
		var date = String(time.getDate()).padStart(2, 0);
		//获取时
		var hours = String(time.getHours()).padStart(2, 0);
		//获取分
		var minutes = String(time.getMinutes()).padStart(2, 0);
		//获取秒
		var seconds = String(time.getSeconds()).padStart(2, 0);
		//组合格式为年-月-日 时：分：秒（2022-6-6 12:12:12）
		return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
	},
};