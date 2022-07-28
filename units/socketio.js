import io from 'socket.io-client-uni-app';



const socketio = {
	init: () => {
		console.log('进来了')
		const socket = io.connect('https://www.thefreeservices.com', {
			path: '/socketio',
			debug: true
		});

		var disconnectCount = 0
		if (socket.connected) {
			socket.on('connect', function () {
				console.log('连接了');
				// 1小时后自动下线
				setTimeout(() => {
					if (socket.connected) {
						socket.disconnect()
					}
				}, 60 * 60e3);
				console.debug('connected');
			});
		}

		socket.on('disconnect', function (data) {
			disconnectCount++
			// console.log('disconnect', data);
			// 掉线了, 10秒后重连
			if (disconnectCount < 10) { // 掉线太多次, 不连了
				setTimeout(() => {
					if (!socket.connected) {
						socket.connect()
					}
				}, 10e3);
			}

		});
		socket.on('error', function (err) {
			console.log('error', err);
		});

		socket.on('msg', function (data) {
			// 数据
			// console.log('msg-socketio', data);
			try {
				if (data.ch) {
					getApp().globalData.socketio.subListeners[data.ch].listener(data);
				} else if (data.rep) {
					getApp().globalData.socketio.reqListeners[data.rep].listener(data);
				}
			} catch (error) {

			}
		});

		getApp().globalData.socketio = socket
		getApp().globalData.socketio.subListeners = {}
		getApp().globalData.socketio.reqListeners = {}
		// return socket
	},
	sub: (actions, listener) => { // 订阅
		console.log(actions,'actions'); 
		// 已经订阅的，只更新listener方法， 不再重新订阅
		if (getApp().globalData.socketio.subListeners[actions.sub]) {
			getApp().globalData.socketio.subListeners[actions.sub].listener = function (data) {
				this.data = data
				if (!this.lastTime || (new Date()).getTime() >= this.lastTime) {
					this.lastTime = (new Date()).getTime() + 300
					setTimeout(() => {
						listener(this.data)
					}, 300)
				}
			}
		} else {
			getApp().globalData.socketio.subListeners[actions.sub] = {}
			getApp().globalData.socketio.subListeners[actions.sub].listener = function (data) {
				this.data = data
				if (!this.lastTime || (new Date()).getTime() >= this.lastTime) {
					this.lastTime = (new Date()).getTime() + 300
					setTimeout(() => {
						listener(this.data)
					}, 300)
				}
			}
			actions.id = new Date().getTime() + '' + Math.round(Math.random() * 1000)
			// console.log('sub', actions.sub)
			getApp().globalData.socketio.emit('sub', actions)
		}
	},
	req: (actions, listener) => { // 一次获取
	console.log(actions,'actions2');
		getApp().globalData.socketio.reqListeners[actions.req] = {};
		getApp().globalData.socketio.reqListeners[actions.req].listener = listener
		actions.id = new Date().getTime() + '' + Math.round(Math.random() * 1000)
		// console.log('req', actions.req)
		getApp().globalData.socketio.emit('req', actions)
	},
	leave: () => { // 一次获取
		getApp().globalData.socketio.emit('leave', getApp().globalData.socketio.subListeners)
		getApp().globalData.socketio.subListeners = {}
	},
	disconnect: () => {
		getApp().globalData.socketio.disconnect()
	}

}

export default socketio;