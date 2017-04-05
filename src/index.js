(function(__global, __navigator){
	'use strict';

	/**
	 *
	 * @constructor
	 */
	function StatSenderAPI(){}

	/**
	 *
	 * @param data
	 * @returns {*}
	 */
	StatSenderAPI.getFormData = function(data) {
		var formData = false;
		//var FormData = typeof self == 'object' ? self.FormData : window.FormData;

		if (typeof __global.FormData === 'undefined') {
			console.error('FormData class not found in scope');
			return false;
		}

		if (data instanceof __global.FormData) return data;

		formData = new FormData();
		try {
			formData.append('data', JSON.stringify(data));
		} catch (c) {
			console.error('JSON stringify not allowed to object ' + data);
			return false;
		}

		return formData;
	};

	/**
	 *
	 * @param backendUri
	 * @param formData
	 * @returns {*}
	 */
	StatSenderAPI.sendByBeacon = function(backendUri, formData) {
		if (typeof __navigator === 'undefined' || !('sendBeacon' in __navigator)) {
			return false;
		}
		console.log(formData.get('data'));
		return __navigator.sendBeacon(backendUri, formData);
	};

	/**
	 *
	 * @param formData
	 * @returns {*}
	 */
	StatSenderAPI.sendByFetch = function(formData) {
		if (typeof __global.fetch === 'undefined') return false;
		var fetchPromise = fetch(backendUri, {
			method: 'POST',
			cache: 'no-cache',
			body: formData
		});
		// todo: capture excpetion from here
		return fetchPromise;
	};

	/**
	 *
	 * @param backendUri
	 * @param formData
	 * @returns {XMLHttpRequest}
	 */
	StatSenderAPI.sendByXhr = function(backendUri, formData) {
		var xhr = new __global.XMLHttpRequest();
		xhr.open('POST', backendUri, true);
		xhr.send(formData);
		// todo: capture excpetion from here
		return xhr;
	};

	/**
	 * Пробрасываем в глобальный скоуп
	 */
	if (typeof __global.send2server === 'undefined'
		|| (typeof __global.send2server != 'undefined' && __global.send2server !== send2server))
	{
		__global.send2server = send2server;
		//for (var f in StatSenderAPI) __global[f] = (StatSenderAPI)[f];
		__global.HttpTransport = StatSenderAPI;
	}

	/**
	 *
	 * @param backendUri
	 * @param data
	 * @returns {boolean}
	 */
	function send2server(backendUri, data) {
		var formData = StatSenderAPI.getFormData(data);
		var sended = StatSenderAPI.sendByBeacon(backendUri, formData);

		if (sended === false) {
			sended = StatSenderAPI.sendByFetch(backendUri, formData);
		}

		if (sended === false) {
			sended = StatSenderAPI.sendByXhr(backendUri, formData);
		}

		// Если вернули false, значит у нас проблемы, хьюстон
		return sended;
	}

})(
	typeof window !== 'undefined'
		? window
		: typeof WorkerGlobalScope !== 'undefined'
		? self
		: typeof global !== 'undefined'
			? global
			: Function('return this;')(),
	typeof navigator !== 'undefined'
		? navigator
		: {}
);

//EOF//