/*
 * 1、引入脚本
 * 2、运行Ykdc.findCookie(e) 来运行你要查找的cookiename，e为必填参数，类型为string，如果找不到则在本地新建一个cookie，name = e value = null
 * 3、调用Ykdc.findCookie(e).setCookie(key,value) 方法来设置你要存入的值，key为选填参数 类型为 String，value为必填参数，类型可以为String Object，当value为 null时，清空此cookie对应的所有值
 * 4、调用Ykdc.findCookie(e).removeCookie(key) key为选填参数 类型为字符串 如果不填则同setCookie(null) 清空所有值，如果指定要删除的key 会对已有cookie进行比对，如没有则不做动作，如有则对相应值进行删除
 */
(function(window){
	var A = function(e){
		if(!e) throw "please input selecter param";
		A.prototype.Init.prototype = A.prototype;
		return new A.prototype.Init(e);
	};
	A.prototype = {
		Init: function(e, context){
			context = context || this;
			this[0] = {};
			this[0]._cookieName = e;
			this.getCookie(e);
			switch(this[0]._cookieValue){
				case undefined:
					// _cookieName 都匹配不到情况下，创建一个同名cookie name 值为null
					console.log('%cthere is no cookie name is \"' + e + '\" %cand system will create a cookie named \"' + e + '\",is default value is \"null\"', 'color:red','color:gray');
					this.setCookie(null); 
				break;
			}
			return this;
		},
		_decodeURIComponent: function(str){
			this[1] = decodeURIComponent(str);
			return this;
		},
		queryString: function() {
			if(this.constructor !== Object) throw "the param type must be Object"; // 处理类型必须为Object，否则抛错;
			var _queryString = '';
			for(var x in this) {
				if(this.hasOwnProperty(x)) {
					_queryString += encodeURIComponent(x + "=" + this[x] + ";");
				}
			}
			return _queryString.substring(0, _queryString.length - 3);
		},
		isEmptyObject: function(Obj){
		  for (var x in Obj){
        return false;
      }
      return true;
		},
		removeCookie: function(key) {
			var _str = '';
			if(!key || !this[0]._cookieValue || this[0]._cookieValue.constructor === String && key === this[0]._cookieValue){
				this.setCookie.call(this, null);
			}else{
				// this[0]._cookieValue.constructor === Object run that wat
				delete this[0]._cookieValue[key];
				if(this[0]._cookieValue.constructor === Object && this.isEmptyObject(this[0]._cookieValue)){
          this.setCookie(null);
        }else{
          this.setCookie(this[0]._cookieValue);
        }
			}
		},
		setCookie: function(key, value) {
			if(key === undefined) throw "please input the cookie name which you want to get"; // key 为必填参数，否则抛错
			var _str = '';
			if(!value){ // 如果只有一个参数
				value = key;
				if(value === null){ // 参数为 null 时
					this[0]._cookieValue = _str = null;
				}else if(value.constructor === String){ // 参数类型为 String
					this[3] = this[0]._cookieValue; // 转存在这里再说吧，没想好放哪里
					this[0]._cookieValue = _str = encodeURIComponent(value);
				}else if(value.constructor === Object){ // 参数类型为 Object
			    if(this[0]._cookieValue === null || this[0]._cookieValue.constructor !== Object){ // 如果原来创建的对象 cookie 值为一个对象
            this[3] = this[0]._cookieValue; // 转存在这里再说吧，没想好放哪里
            this[0]._cookieValue = {}; // 覆盖原来任何值，新建一个存储对象
          }
          for(var _key in value){
            this[0]._cookieValue[_key] = value[_key];
          }
          _str = this.queryString.call(this[0]._cookieValue);
			  }

			}else{
				if(this[0]._cookieValue.constructor !== Object){ // 如果原来创建的对象 cookie 值为一个对象
					this[3] = this[0]._cookieValue; // 转存在这里再说吧，没想好放哪里
					this[0]._cookieValue = {}; // 覆盖原来任何值，新建一个存储对象
				}
				this[0]._cookieValue[key] = value;
				_str = this.queryString.call(this[0]._cookieValue);
			}
			document.cookie = this[0]._cookieName + '=' + _str + ';path=/';
		},
		getCookie: function(name) {
			if(!name) throw "please input the cookie name which you want to get"; // name 为必填参数，否则抛错
			var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"),
					arr = document.cookie.match(reg);
			if(arr) {
				if(arr[2] !== 'null'){
					// 匹配到cookie name 且值不为 null
					// 函数写法
					this[0]._cookieValue = this.toObject(decodeURIComponent(arr[2]));
					// 链式
//					this[0]._cookieValue = this._decodeURIComponent(arr[2]).toObject();
				}else{
					// 匹配到cookie name 且值为 null
					this[0]._cookieValue = null;
				}
			}else {
				// 没有匹配到 返回 undefined
				this[0]._cookieValue = undefined;
			}
			return this;
		},
		toObject: function(str) {
			var searchHash = str ? str.split(';') : this[1].split(';'), 
					ret;
			if(searchHash.length > 1){
				// 如果截取数组长度超过 1 则返回一个对象
				ret = {};
				for(var i = 0, len = searchHash.length; i < len; i++) {
					var pair = searchHash[i];
					if((pair = pair.split('='))[0]) {
						var key = decodeURIComponent(pair.shift());
						var value = pair.length > 1 ? pair.join('=') : pair[0];
						if(value != undefined) {
							value = decodeURIComponent(value);
						}
						if(key in ret) {
							if(ret[key].constructor != Array) {
								ret[key] = [ret[key]];
							}
							ret[key].push(value);
						} else {
							ret[key] = value;
						}
					}
				}
			}else{
				// 如果截取数组长度小于1 则返回字符串
				ret = searchHash.join();
			}
			return ret;
		}
	};
	window.Ykdc = {};
	return window.Ykdc.findCookie = A;
})(this);