let path = require('path');
let vars = path.resolve(__dirname, 'components/css/layout.less')
const TransformPages = require('uni-read-pages')
const tfPages = new TransformPages({
	includes: ['meta', 'path', 'aliasPath', 'style', 'name']
})
module.exports = {
	css: {
		loaderOptions: {
			less: {
				globalVars: {
					"hack": `true; @import "${vars}"`
				}
			}
		}
	},
	configureWebpack: {
		plugins: [
			new tfPages.webpack.DefinePlugin({
				ROUTES: JSON.stringify(tfPages.routes)
			})
		]
	}
}