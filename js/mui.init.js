/**
 * mui.init
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.global = $.options = {
		gestureConfig: {
			tap: true,
			doubletap: false,
			longtap: false,
			hold: false,
			flick: true,
			swipe: true,
			drag: true,
			pinch: false
		}
	};
	/**
	 *
	 * @param {type} options
	 * @returns {undefined}
	 */
	$.initGlobal = function(options) {
		$.options = $.extend(true, $.global, options);
		return this;
	};
	var inits = {};

	/**
	 * 单页配置 初始化
	 * @param {object} options
	 */
	$.init = function(options) {
		$.options = $.extend(true, $.global, options || {});
		$.ready(function() {
			$.doAction('inits', function(index, init) {
				var isInit = !!(!inits[init.name] || init.repeat);
				if (isInit) {
					init.handle.call($);
					inits[init.name] = true;
				}
			});
		});
		return this;
	};

	/**
	 * 增加初始化执行流程
	 * @param {function} init
	 */
	$.addInit = function(init) {
		return $.addAction('inits', init);
	};
	$(function() {
		var classList = document.body.classList;
		var os = [];
		if ($.os.ios) {
			os.push({
				os: 'ios',
				version: $.os.version
			});
			classList.add($.className('ios'));
		} else if ($.os.android) {
			os.push({
				os: 'android',
				version: $.os.version
			});
			classList.add($.className('android'));
		}
		if ($.os.wechat) {
			os.push({
				os: 'wechat',
				version: $.os.wechat.version
			});
			classList.add($.className('wechat'));
		}
		if (os.length) {
			$.each(os, function(index, osObj) {
				var version = '';
				var classArray = [];
				if (osObj.version) {
					$.each(osObj.version.split('.'), function(i, v) {
						version = version + (version ? '-' : '') + v;
						classList.add($.className(osObj.os + '-' + version));
					});
				}
			});
		}
	});
})(mui);