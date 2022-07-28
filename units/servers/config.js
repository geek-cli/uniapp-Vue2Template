if (process.env.NODE_ENV === 'development') {
	// 开发环境
	var host = ''
	
} else {
	// 生产环境
	var host = ''
}
if (host.charAt(host.length - 1) ==  '/') {
    host = host.substr(0, host.length - 1)
}
// #ifdef H5
host = ''
// #endif  
var imgHost = host
export default {
	api: {
		apiUrl: host + '/api/user',
		serviceUrl: host + '/api',
		uploadUrl: host + "/api/upload/image",
		uploadVideo: host + "/api/upload/video"
	},
	imgHost
}
