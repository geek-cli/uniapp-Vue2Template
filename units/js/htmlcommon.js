export default {
	showHtml(str) {
		return str
			.replace(str ? /&(?!#?\w+;)/g : /&/g, '&amp;')
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, "\"")
			.replace(/&#39;/g, "\'")
			.replace(/&amp;nbsp;/g, '\u3000')
	},
	showToast(title) {
		uni.showToast({
			title: title,
			icon: "none"
		})
	}
}
