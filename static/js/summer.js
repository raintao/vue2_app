/*
 * Summer JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: gct@yonyou.com
 * Version: 0.3.0.20161118.1 526
 */
 (function(global, factory){
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }
}(window,function(window,noGlobal){
    var $s = {};
    var s = {$:$s};
    if ( typeof define === "function" && define.amd ) {
        define( "summer", [], function() {
            return s;
        });
    }
    window.$summer = $s;
    window.summer = s;
    return s;
}))


// JavaScript Base Type Extra API
;(function(){
    /**
    * 删除左右两端的空格
    */
    String.prototype.trim=function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    /**
    * 删除左边的空格
    */
    String.prototype.ltrim=function(){
        return this.replace(/(^\s*)/g, "");
    }
    /**
    * 删除右边的空格
    */
    String.prototype.rtrim=function(){
        return this.replace(/(\s*$)/g, "");
    }
    String.prototype.isNullOrEmpty=function(){
        if(typeof this == "undefined" || this === null){
            return true;
        }
        if(typeof this == "string" && this == ""){
            return true;
        }
        return false;
    }

    //给Number类型增加一个add方法，使用时直接用 .add 即可完成加法计算。
    Number.prototype.add = function (arg) {
        var accAdd = function(arg1, arg2){
            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m) / m;
        };

        return accAdd(arg, this);
    };

    //给Number类型增加一个sub方法，，使用时直接用 .sub 即可完成减法计算。
    Number.prototype.sub = function (arg) {
        return this.add(this, -arg);
    };

    //给Number类型增加一个mul方法，使用时直接用 .mul 即可完成乘法计算。
    Number.prototype.mul = function (arg) {
        var accMul = function (arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            }
            catch (e) {
            }
            try {
                m += s2.split(".")[1].length;
            }
            catch (e) {
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        };

        return accMul(arg, this);
    };

    //给Number类型增加一个div方法，，使用时直接用 .div 即可完成除法计算。
    Number.prototype.div = function (arg) {
        var accDiv = function(arg1,arg2){
            var t1 = 0, t2 = 0, r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
            }
            try {
                t2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
            }
            if (Math) {
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * pow(10, t2 - t1);
            }
        };
        return accDiv(this, arg);
    };

    Array.prototype.remove = function(i){
        if(isNaN(i) || i < 0 || i >= this.length){
            return this;
        }
        this.splice(i,1);
        return this;
    }
    Array.prototype.remove2 = function(i){
        if(isNaN(i))
            return this;
        if(i < 0 || i >= this.length)
            return this;
        else
            return this.slice(0,i).concat(this.slice(i+1,this.length));
    }
    Array.prototype.remove3 = function(dx){
        if(isNaN(dx) || dx > this.length){
            return false;
        }
        for(var i=0,n=0;i<this.length;i++){
            if(this[i]!=this[dx]){
                this[n++]=this[i];
            }
        }
        this.length-=1;
    }
    Array.prototype.insert = function (i, item){
      return this.splice(i, 0, item);
    }
    Date.prototype.format = function(format){
        // (new Date()).format("yyyy-MM-dd hh:mm:ss")
        var o = {
            "M+" : this.getMonth()+1, //month 
            "d+" : this.getDate(), //day 
            "h+" : this.getHours(), //hour 
            "m+" : this.getMinutes(), //minute 
            "s+" : this.getSeconds(), //second 
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
            "S" : this.getMilliseconds() //millisecond 
        }

        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        return format;
    }
})();

// $summer  API
;(function(){
    var u = window.$summer || {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    u.os = (function(env){
        var browser={
            info:function(){
                var ua = navigator.userAgent, app = navigator.appVersion;
                return { //移动终端浏览器版本信息
                    //trident: ua.indexOf('Trident') > -1, //IE内核
                    //presto: ua.indexOf('Presto') > -1, //opera内核
                    webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    //gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: ua.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                    iPad: ua.indexOf('iPad') > -1, //是否iPad
                    //webApp: ua.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
					platform: navigator.platform
                };
            }(),
            lang:(navigator.browserLanguage || navigator.language).toLowerCase()
        };
		if(browser.info.platform.toLowerCase().indexOf("win")>=0){
			return "pc"
		}else if(browser.info.android){
            return "android";
        }else if(browser.info.ios || browser.info.iPhone || browser.info.iPad){
            return "ios";
        }else{
			return "";
		}
    })(u);
    u.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    }
    u.isFunction = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
    u.isEmptyObject = function(obj){
        if(JSON.stringify(obj) === '{}'){
            return true;
        }
        return false;
    };
    u.alert = function(msg){
        try{
            if(typeof msg == "string"){
                alert(msg);
            }else if(typeof msg == "object"){
                alert(u.jsonToStr(msg));
            }else{
                alert(msg);
            }
        }catch(e){
            alert(msg);
        }
    };
    //获取随机的唯一id，随机不重复，长度固定
    u.UUID = function(len){
        len = len || 6;
        len = parseInt(len,10);
        len = isNaN(len)?6:len;
        var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ';
        var seedLen = seed.length - 1;
        var uid = '';
        while(len--){
            uid += seed[Math.round(Math.random()*seedLen)]
        }
        return uid;
    };
	
	u.isJSONObject = function (obj) {
		return Object.prototype.toString.call(obj) === '[object Object]';;
	}	
	u.isJSONArray = function (obj) {   
	  return Object.prototype.toString.call(obj) === '[object Array]';    
	}
	u.isFunction = function (obj) {   
	  return Object.prototype.toString.call(obj) === '[object Function]';    
	}
	//是否为空字符串
	u.isEmpty = function(obj){
		if(obj == undefined || obj == null || (obj.toString && obj.toString() == "")){
			return true;
		}
		return false;
	}
    u.check = function(obj,paramNameArray,msg){
        for(var i=0,len=paramNameArray.length;i<len;i++){
            if(obj[paramNameArray[i]] == undefined || obj[paramNameArray[i]] == null){
                var str = "参数["+paramNameArray[i]+"]不能为空";
                alert(msg ? msg + str : str);
                return false;
            }       
        }
        return true;
    }
    u.checkIfExist = function(obj,paramNameArray,msg){
        for(var i=0,len=paramNameArray.length;i<len;i++){
            var key = paramNameArray[i];
            if(key in obj && $summer.isEmpty(obj[key])){
                var str = "参数["+paramNameArray[i]+"]不能为空";
                alert(msg ? msg + str : str);
                return false;
            }           
        }
        return true;
    }
    u.isNamespace = function(ns){
        if(typeof ns == "undefined" || ns === null){
            return false;
        }
        if(typeof ns == "string" && ns == ""){
            return false;
        }
        
        if (ns.indexOf(".") < 0 || ns.substring(0,1)=="." || ns.substring(ns.length-1)==".") {
            alert("包名非法，不包含.或以.开始结束");
            return false;
        }

        var nameArr = ns.split(".");
        for (var i=0, len=nameArr.length; i<len; i++) {
            var name = nameArr[i];
            if (name == "") {
                alert("非法的包名中连续含有两个.");
                return false;
            }else{
                var pattern = /^[a-z]+([a-zA-Z_][a-zA-Z_0-9]*)*$/;
                if(!pattern.test(name)){
                    alert("非法的包名");
                    return false
                }
            }
        }
        return true;
    }
    window.$isJSONObject = u.isJSONObject;
    window.$isJSONArray = u.isJSONArray;
    window.$isFunction = u.isFunction;
    window.$isEmpty = u.isEmpty;
    window.$summer = window.$summer || u;
})();

/*
 * Summer JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: gct@yonyou.com go
 * Version: 3.0.0.20160823.2047
 */
;(function(w){
    w.$summer = w.$summer || {};
    w.summer = w.summer || {};
    w.api = w.summer;
    (function(){
    	var url;
        if(document.location.href.indexOf("http")==0){
			
			var strFullPath = window.document.location.href;
			var strPath = window.document.location.pathname;
			var pos = strFullPath.indexOf(strPath);
			var prePath = strFullPath.substring(0, pos); //domain name
			var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1); //site name
            w.__$_CORDOVA_PATH = w.__$_CORDOVA_PATH || (prePath + postPath);
            if($summer.os == "android"){
                alert("android");
                url = w.__$_CORDOVA_PATH + "/cordova/android/cordova.js";
            }else if($summer.os == "ios"){
                alert("ios");
                url = w.__$_CORDOVA_PATH + "/cordova/ios/cordova.js";
            }else{
                alert("请在移动设备上访问")
                //url = path + "ios/cordova.js";
            }
        
        }else{
            url = document.location.pathname.split("www")[0]+"www/cordova.js";
        }
        var _script;
        var _script = document.createElement('script');
        _script.id = "cordova_js";
        _script.type = 'text/javascript';
        _script.charset = 'utf-8';
        _script.async = true;
        _script.src = url;
        _script.onload = function (e) {
            w.$summer["cordova"] = w.cordova;
            w.summer["cordova"] = w.cordova;

            document.addEventListener('deviceready', function(){
                //1、先通过cdv来获取页面参数
                summer.winParam(function(ret){
					//希望返回
					var ctx = {
						systemType:"android",//"ios"
						systemVersion:7,// ios--> 7    android-->21
						iOS7StatusBarAppearance:true,//false
						fullScreen:true,
						pageParam:{param0:123,param1:"abc"},
						screenWidth:"",
						screenHeight:"",
						
						winId:"",
						winWidth:"",
						winHeight:"",
						
						frameId:"",
						frameWidth:"",
						frameHeight:"",
						
						appParam:"",
					}
                    //alert(typeof ret)// --> object

                    if(typeof ret == "string"){
                        ret = $summer.strToJson(ret);

                    }
                    //alert($summer.jsonToStr(ret));
                    summer['pageParam'] = ret;//原生数据都放在summer对象上
                    //alert($summer.jsonToStr(summer.pageParam));
                    summer.showWin({});
                    if(typeof summerready == "function")
                        summerready();
                    if(typeof summerReady == "function")
                        summerReady();  

                });         
            }, false);

        };
        if(navigator.platform.toLowerCase().indexOf("win")<0){
        	try{
//            document.currentScript.parentNode.insertBefore(_script, document.currentScript);
	            fs = document.getElementsByTagName('script')[0];
	            fs.parentNode.insertBefore(_script, fs);
        	}catch(e){
        		console.log(e)
        	}
        }else{
        	
        }
    })();
    
    if(navigator.platform.toLowerCase().indexOf("win")>-1){
    	//alert("DOMContentLoaded")
    	document.addEventListener('DOMContentLoaded',function(){
    		if(typeof summerready == "function")
                summerready();
            if(typeof summerReady == "function")
                summerReady();  
    	},false);
    }
    
    w.summer.require = function(mdlName){
        if(window.$summer["cordova"] != window.cordova){
           alert("---------warnning : init cordova is too late!")
           window.$summer["cordova"] = window.cordova;
           window.summer["cordova"] = window.cordova;
        }
        if(mdlName == "cordova"){
           return window.summer["cordova"];
        }else{
           return window.summer["cordova"].require(mdlName);
        }
	};
	w.summer.canrequire = function(){
        if(navigator.platform.toLowerCase().indexOf("win")>-1){
			return false;
		}
		return true;
	};
   
	w.$summer.require = w.summer.require;
})(window);


//HTML DOM API by gct
;(function(window){
    var u = window.$summer || {};
    u.isElement = function(obj){
        return !!(obj && obj.nodeType == 1);
    };
    u.addEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$summer.addEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if(el.addEventListener) {
            el.addEventListener(name, fn, useCapture);
        }
    };
    u.rmEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$summer.rmEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.removeEventListener) {
            el.removeEventListener(name, fn, useCapture);
        }
    };
    u.one = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.one Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        var that = this;
        var cb = function(){
            fn && fn();
            that.rmEvt(el, name, cb, useCapture);
        };
        that.addEvt(el, name, cb, useCapture);
    };
    u.dom = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelector){
                return document.querySelector(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelector){
                return el.querySelector(selector);
            }
        }
    };
    u.domAll = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelectorAll){
                return document.querySelectorAll(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelectorAll){
                return el.querySelectorAll(selector);
            }
        }
    };
    u.byId = function(id){
        return document.getElementById(id);
    };
    u.first = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$summer.first Function need el param, el param must be DOM Element');
                return;
            }
            return el.children[0];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':first-child');
        }
    };
    u.last = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$summer.last Function need el param, el param must be DOM Element');
                return;
            }
            var children = el.children;
            return children[children.length - 1];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':last-child');
        }
    };
    u.eq = function(el, index){
        return this.dom(el, ':nth-child('+ index +')');
    };
    u.not = function(el, selector){
        return this.domAll(el, ':not('+ selector +')');
    };
    u.prev = function(el){
        if(!u.isElement(el)){
            console.warn('$api.prev Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.previousSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.previousSibling;
            return node;
        }
    };
    u.next = function(el){
        if(!u.isElement(el)){
            console.warn('$api.next Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.nextSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.nextSibling;
            return node;
        }
    };
    u.closest = function(el, selector){
        if(!u.isElement(el)){
            console.warn('$api.closest Function need el param, el param must be DOM Element');
            return;
        }
        var doms, targetDom;
        var isSame = function(doms, el){
            var i = 0, len = doms.length;
            for(i; i<len; i++){
                if(doms[i].isEqualNode(el)){
                    return doms[i];
                }
            }
            return false;
        };
        var traversal = function(el, selector){
            doms = u.domAll(el.parentNode, selector);
            targetDom = isSame(doms, el);
            while(!targetDom){
                el = el.parentNode;
                if(el != null && el.nodeType == el.DOCUMENT_NODE){
                    return false;
                }
                traversal(el, selector);
            }

            return targetDom;
        };

        return traversal(el, selector);
    };
    u.contains = function(parent,el){
        var mark = false;
        if(el === parent){
            mark = true;
            return mark;
        }else{
            do{
                el = el.parentNode;
                if(el === parent){
                    mark = true;
                    return mark;
                }
            }while(el === document.body || el === document.documentElement);

            return mark;
        }
        
    };
    u.remove = function(el){
        if(el && el.parentNode){
            el.parentNode.removeChild(el);
        }
    };
    u.attr = function(el, name, value){
        if(!u.isElement(el)){
            console.warn('$api.attr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length == 2){
            return el.getAttribute(name);
        }else if(arguments.length == 3){
            el.setAttribute(name, value);
            return el;
        }
    };
    u.removeAttr = function(el, name){
        if(!u.isElement(el)){
            console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            el.removeAttribute(name);
        }
    };
    u.hasCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
            return;
        }
        if(el.className.indexOf(cls) > -1){
            return true;
        }else{
            return false;
        }
    };
    u.addCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.addCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.add(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls +' '+ cls;
            el.className = newCls;
        }
        return el;
    };
    u.removeCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.remove(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls.replace(cls, '');
            el.className = newCls;
        }
        return el;
    };
    u.toggleCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
            return;
        }
       if('classList' in el){
            el.classList.toggle(cls);
        }else{
            if(u.hasCls(el, cls)){
                u.addCls(el, cls);
            }else{
                u.removeCls(el, cls);
            }
        }
        return el;
    };
    u.val = function(el, val){
        if(!u.isElement(el)){
            console.warn('$api.val Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            switch(el.tagName){
                case 'SELECT':
                    var value = el.options[el.selectedIndex].value;
                    return value;
                    break;
                case 'INPUT':
                    return el.value;
                    break;
                case 'TEXTAREA':
                    return el.value;
                    break;
            }
        }
        if(arguments.length === 2){
            switch(el.tagName){
                case 'SELECT':
                    el.options[el.selectedIndex].value = val;
                    return el;
                    break;
                case 'INPUT':
                    el.value = val;
                    return el;
                    break;
                case 'TEXTAREA':
                    el.value = val;
                    return el;
                    break;
            }
        }
        
    };
    u.prepend = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.prepend Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    u.append = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.append Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    u.before = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.before Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    u.after = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.after Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    u.html = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.html Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.innerHTML;
        }else if(arguments.length === 2){
            el.innerHTML = html;
            return el;
        }
    };
    u.text = function(el, txt){
        if(!u.isElement(el)){
            console.warn('$api.text Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.textContent;
        }else if(arguments.length === 2){
            el.textContent = txt;
            return el;
        }
    };
    u.offset = function(el){
        if(!u.isElement(el)){
            console.warn('$api.offset Function need el param, el param must be DOM Element');
            return;
        }
        var sl, st;
        if(document.documentElement){
            sl = document.documentElement.scrollLeft;
            st = document.documentElement.scrollTop;
        }else{
            sl = document.body.scrollLeft;
            st = document.body.scrollTop;
        }
        var rect = el.getBoundingClientRect();
        return {
            l: rect.left + sl,
            t: rect.top + st,
            w: el.offsetWidth,
            h: el.offsetHeight
        };
    };
    u.css = function(el, css){
        if(!u.isElement(el)){
            console.warn('$api.css Function need el param, el param must be DOM Element');
            return;
        }
        if(typeof css == 'string' && css.indexOf(':') > 0){
            el.style && (el.style.cssText += ';' + css);
        }
    };
    u.cssVal = function(el, prop){
        if(!u.isElement(el)){
            console.warn('$api.cssVal Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            var computedStyle = window.getComputedStyle(el, null);
            return computedStyle.getPropertyValue(prop);
        }
    };
    u.jsonToStr = function(json){
        if(typeof json === 'object'){
            return JSON && JSON.stringify(json);
        }else{
			alert("$summer.jsonToStr's parameter is not a json, it's typeof is " + typeof json);
		}
    };
    u.strToJson = function(str){
        if(typeof str === 'string'){
            return JSON && JSON.parse(str);
        }else{
            alert("$summer.strToJson's parameter is not a string, it's typeof is " + typeof str);
        }
    };
    //gct api
    u.winWidth = function(){
        return document.documentElement.offsetWidth || document.body.offsetWidth;
    };
    //gct api
    u.winHeight = function(){
        return document.documentElement.offsetHeight || document.body.offsetHeight;
    };
    /******************** HTML API END ********************/

   
    /******************** Native API BEGIN ********************/
	//20160810
	
    u.fixStatusBar = function(el){
        if(!u.isElement(el)){
            alert('$summer.fixStatusBar Function need el param, el param must be DOM Element');
			return;
        }
        // var strDM = api.systemType;
        // if (strDM == 'ios') {
        //     var strSV = api.systemVersion;
        //     var numSV = parseInt(strSV,10);
        //     var fullScreen = api.fullScreen;
        //     var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
        //     if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
        //         el.style.paddingTop = '20px';
        //     }
        // }
        
		var sysInfo=summer.getSysInfo();
        var strST=sysInfo.systemType;
        var strSV = sysInfo.systemVersion;
        var fullScreen = sysInfo.fullScreen;
        var statusBarAppearance = sysInfo.statusBarAppearance;
        var statusBarHeight = sysInfo.statusBarHeight;
        if((strST == "ios" && fullScreen && statusBarAppearance=='1') || strST == "pc"){        
                el.style.paddingTop = '20px';
                $(el).children().css("top","20px");
        }else if(strST == "android" && fullScreen && statusBarAppearance){
                el.style.paddingTop = statusBarHeight+'px';
                $(el).children().css("top",statusBarHeight+'px');
        }
    };
   
    u.post = function(/*url,data,fnSuc,dataType*/){
        // var argsToJson = parseArguments.apply(null, arguments);
        // var json = {};
        // var fnSuc = argsToJson.fnSuc;
        // argsToJson.url && (json.url = argsToJson.url);
        // argsToJson.data && (json.data = argsToJson.data);
        // if(argsToJson.dataType){
        //     var type = argsToJson.dataType.toLowerCase();
        //     if (type == 'text'||type == 'json') {
        //         json.dataType = type;
        //     }
        // }else{
        //     json.dataType = 'json';
        // }
        // json.method = 'post';
        // api.ajax(json,
        //     function(ret,err){
        //         if (ret) {
        //             fnSuc && fnSuc(ret);
        //         }
        //     }
        // );
    };
    u.get = function(/*url,fnSuc,dataType*/){
        // var argsToJson = parseArguments.apply(null, arguments);
        // var json = {};
        // var fnSuc = argsToJson.fnSuc;
        // argsToJson.url && (json.url = argsToJson.url);
        // //argsToJson.data && (json.data = argsToJson.data);
        // if(argsToJson.dataType){
        //     var type = argsToJson.dataType.toLowerCase();
        //     if (type == 'text'||type == 'json') {
        //         json.dataType = type;
        //     }
        // }else{
        //     json.dataType = 'text';
        // }
        // json.method = 'get';
        // api.ajax(json,
        //     function(ret,err){
        //         if (ret) {
        //             fnSuc && fnSuc(ret);
        //         }
        //     }
        // );
    };
	
    window.$summer = window.$summer || u;
    window.$api = window.$summer;
})(window);

//summerBridge 3.0.0.20161031
+function(w,s){
	/*  加上如下注释代码，ios无法再声明summerBridge
	if(typeof summerBridge == "undefined"){
		summerBridge = {
			callSync:function(){
				alert("请将执行的逻辑放入summerready中");
			}
		}
	}
	*/
	//1、兼容Android
    if(w.adrinvoker) alert(w.adrinvoker);
    var adrinvoker = {};
    if(w.adrinvoker && w.adrinvoker.call2) alert(w.adrinvoker.call2);

	//Asynchronous call run as corodva bridge
    adrinvoker.call = function(srvName, strJson){
		try{
			if(navigator.platform.toLowerCase().indexOf("win")>=0){
				alert("执行"+srvName+"完毕\n参数是："+strJson);
				return;
			}
			
			strJson = strJson || '{}';
			try{
				var plug = summer.require('summer-plugin-service.XService');
				plug.call(srvName,$summer.strToJson(strJson));
			}catch(e){
				if($summer.__debug)
					alert("Excp6.1: 异步调用summer-plugin-service.XService异常:" + e);
				return;
			}
		}catch(e){
			alert("Excp6: 异步调用adrinvoker.call异常:" + e);
		}
    }

	//Synchronous call as summer bridge
    adrinvoker.call2 = function(srvName, strJson){
		try{
			if(navigator.platform.toLowerCase().indexOf("win")>=0){
				alert("执行"+srvName+"完毕\n参数是："+strJson);
				return;
			}
			if(typeof summerBridge != "undefined"){
				try{
					return summerBridge.callSync(srvName,strJson);
				}catch(e){
					alert("Excp7.1: summerBridge.callSync异常:" + e);
				}
			}else{
				alert("summerBridge is not defined by native successfully!");
			}
		}catch(e){
			alert("Excp7: 同步调用adrinvoker.call2异常:" + e);
		}
    }
    w.adrinvoker = adrinvoker;
	
	//2、兼容ios
	//ios Synchronous
	if(typeof CurrentEnvironment != "undefined"){
		if($summer.os == "ios"){
			CurrentEnvironment.DeviceType = CurrentEnvironment.DeviceIOS;
		}else if($summer.os == "android"){
			CurrentEnvironment.DeviceType = CurrentEnvironment.DeviceAndroid;
		}else{}
	}
	if(typeof UM_callNativeService == "undefined"){
		var UM_callNativeService = function(serviceType,strParams){//同步调用，和安卓统一接口
			return adrinvoker.call2(serviceType,strParams);
		}
	}else{
		alert("UM_callNativeService is exist! fatal error!");
		alert(UM_callNativeService);
	}
	w.UM_callNativeService = UM_callNativeService;
	
	//ios Asynchronous
	if(typeof UM_callNativeServiceNoraml == "undefined"){
		var UM_callNativeServiceNoraml = function(serviceType,strParams){//异步调用，和安卓统一接口
			return adrinvoker.call(serviceType,strParams);
		}
	}else{
		alert("UM_callNativeServiceNoraml is exist! fatal error!");
		alert(UM_callNativeServiceNoraml);
	}
	w.UM_callNativeServiceNoraml = UM_callNativeServiceNoraml;	

	//3、
	s.callSync = function(serivceName, strJson){
		var strParam = strJson;
		if(typeof strJson == "object"){
			strParam = JSON.stringify(strJson);
		}else if(typeof strJson != "string"){
			strParam = strJson.toString();
		}
		try{
			return summerBridge.callSync(serivceName, strParam);
		}catch(e){
			if($summer.os == "pc"){
				return strJson;
			}
			alert(e);
		}
	}
	//20160815
	s.callCordova = function(cordovaPlugName, plugFnName, json, successFn, errFn){
		if(this.canrequire() && !this.__debug){
            var plug = this.cordova.require(cordovaPlugName);
			if(plug[plugFnName]){
				plug[plugFnName](json, successFn, errFn);
			}else{
				alert("the cordova plug["+cordovaPlugName+"]'s method[" + plugFnName + "] not implementation");
			}
		}else{
			console.log("the cordova plug["+cordovaPlugName+"]'s method[" + plugFnName + "] executed!");
		}
	}
	
}(window,summer);

//summer API
+function(w,s){
	if(!s){
		s = {};
		w.summer = s;
	}
    s.window = {
        openFrame : function(json, successFn, errFn){
            json["animation"] = json["animation"] || {};
            json["pageParam"] = json["pageParam"] || {};

    		if(json["rect"] && !json["position"]){
    			json["position"] = {};
    			json["position"].left = json["rect"].x;
    			json["position"].top = json["rect"].y;
    			json["position"].width = json["rect"].w;
    			json["position"].height = json["rect"].h;

    		}
    		
    		/*
    		if(json["position"].width=="auto"){
    		    json["position"].width = $summer.offset(document.getElementsByTagName("body")[0]).w;
    		}
    		if(json["position"].height=="auto"){
    		    json["position"].height = $summer.offset(document.getElementsByTagName("body")[0]).h;
    		}
    		*/

    		if(json["name"] && !json["id"]){
    			json["id"] = json["name"];
    		}
//            if(json["url"]){
//                var url = json["url"];
//                var idx = url.indexOf("www/html/");
//                if(idx < 0){
//                    if(url.indexOf("html/")==0){
//                        json["url"] = "www/" + json["url"];
//                    }else{
//                        json["url"] = "www/html/" + json["url"];
//                    }
//                }
//            }
			if(json["alert"]){
				$summer.alert(json);
				delete json["alert"];
			}
			return s.callCordova('summer-plugin-frame.XFrame','openFrame',json, successFn, errFn);
        },
        closeFrame : function(json, successFn, errFn){
			return s.callCordova('summer-plugin-frame.XFrame','closeFrame',json, successFn, errFn);
        },
        openFrameGroup : function(json, successFn, errFn){
			return s.callCordova('summer-plugin-frame.XFrame', 'openFrameGroup', json, successFn, errFn);
		},
		closeFrameGroup : function(json, successFn, errFn){
			return s.callCordova('summer-plugin-frame.XFrame', 'closeFrameGroup', json, successFn, errFn);
		},
		setFrameGroupAttr : function(json, successFn, errFn){
			return s.callCordova('summer-plugin-frame.XFrame', 'setFrameGroupAttr', json, successFn, errFn);
		},
		setFrameGroupIndex : function(json, successFn, errFn){
			return s.callCordova('summer-plugin-frame.XFrame', 'setFrameGroupIndex', json, successFn, errFn);
		},
        openWin : function(json, successFn, errFn){
        	if(!json["animation"]){
        		json["animation"]={
				    type:"push", 
				    subType:"from_right", 
				    duration:300 
				}
        	}
			return s.callCordova('summer-plugin-frame.XFrame', 'openWin', json, successFn, errFn);
        },
        createWin : function(json, successFn, errFn){
			return s.callCordova('summer-plugin-frame.XFrame', 'createWin', json, successFn, errFn);
        },
        showWin : function(json, successFn, errFn){
			return s.callCordova('summer-plugin-frame.XFrame', 'showWin', json, successFn, errFn);
        },
        closeWin : function(json, successFn, errFn){
			//support closeWin('xxx') and closeWin({id:'xxx'})
			if(typeof json == "string"){
				json = {"id" : json};
			}else if(typeof json == "undefined"){
				json = {};
			}				
			return s.callCordova('summer-plugin-frame.XFrame', 'closeWin', json, successFn, errFn);
		},
		closeToWin : function(json, successFn, errFn){
			//support closeWin('xxx') and closeWin({id:'xxx'})
			if(typeof json == "string"){
				json = {"id" : json};
			}else if(typeof json == "undefined"){
				json = {};
			}				
			return s.callCordova('summer-plugin-frame.XFrame', 'closeToWin', json, successFn, errFn);
		},
		getSysInfo : function(json, successFn, errFn){
			//support closeWin('xxx') and closeWin({id:'xxx'})
			if(typeof json == "string"){
				json = alert("parameter json is required json object type, but is string type");
			}
			var param = json || {
				systemType:"android",//"ios"
				systemVersion:7,// ios--> 7    android-->21
				statusBarAppearance : true,//false
				fullScreen : true,
				pageParam : {param0:123,param1:"abc"},
				screenWidth:"",
				screenHeight:"",
				winId:"",
				winWidth:"",
				winHeight:"",				
				frameId:"",
				frameWidth:"",
				frameHeight:"",
				statusBarHeight:"",
				statusBarStyle:"",
				appParam:"",
			};
			return JSON.parse(s.callSync('SummerDevice.getSysInfo', param));
			
		},
        setFrameAttr : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').setFrameAttr(json, successFn, errFn);
        },
        winParam : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').winParam(json, successFn, errFn);
        },
        frameParam : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').frameParam(json, successFn, errFn);
        },
        setRefreshHeaderInfo : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').setRefreshHeaderInfo(json, successFn, errFn);
        },
        refreshHeaderLoadDone : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').refreshHeaderLoadDone(json, successFn, errFn);
        },
        setRefreshFooterInfo : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').setRefreshFooterInfo(json, successFn, errFn);
        },
        refreshFooterLoadDone : function(json, successFn, errFn){
			if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').refreshFooterLoadDone(json, successFn, errFn);
        }
    };
 
 
    //核心API直接通过 summer.xxx()访问
    s.openFrame = s.window.openFrame;
    s.closeFrame = s.window.closeFrame;
    s.openWin = s.window.openWin;
    s.createWin = s.window.createWin;
    s.showWin = s.window.showWin;
    s.closeWin = s.window.closeWin;
	s.closeToWin = s.window.closeToWin;
	s.getSysInfo = s.window.getSysInfo;

    s.winParam = s.window.winParam;
    s.frameParam = s.window.frameParam;
    s.setFrameAttr = s.window.setFrameAttr;

    s.setRefreshHeaderInfo = s.window.setRefreshHeaderInfo;
    s.refreshHeaderLoadDone = s.window.refreshHeaderLoadDone;
    s.setRefreshFooterInfo = s.window.setRefreshFooterInfo;
    s.refreshFooterLoadDone = s.window.refreshFooterLoadDone;

    s.openFrameGroup = s.window.openFrameGroup;
    s.closeFrameGroup = s.window.closeFrameGroup;
    s.setFrameGroupAttr = s.window.setFrameGroupAttr;
    s.setFrameGroupIndex = s.window.setFrameGroupIndex;

    s.showProgress = function(json){
		if(!s.canrequire()) return;
    	var invoker = summer.require('summer-plugin-service.XService');
    	json = json || {};
        invoker.call("UMJS.showLoadingBar",json);
    };
    s.hideProgress = function(json){
		if(!s.canrequire()) return;
    	var invoker = summer.require('summer-plugin-service.XService');
    	json = json || {};
        invoker.call("UMJS.hideLoadingBar",json);
    };
    s.toast = function(json){
		if(!s.canrequire()) return;
    	var invoker = summer.require('summer-plugin-service.XService');
    	json = json || {};
        invoker.call("UMJS.toast",json);
    };
    //upload方法
    s.upload = function(json,sFn,eFn,headers){		
    	var fileURL = json.fileURL,
    		type = json.type,
			params = json.params;
	    var options = new FileUploadOptions();
	    options.fileKey="file";
	    options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
	    options.mimeType = type;

	    options.params = params;
	    options.httpMethod = "POST"; 
	    options.headers = headers || {};

	    var ft = new FileTransfer();
	    var SERVER = json.SERVER;
	    ft.upload(fileURL, encodeURI(SERVER), sFn, eFn, options);
    };
    s.eval = function(script){
    	var t = setTimeout("try{eval(" + script + ")}catch(e){alert(e)}", 10);
    };
	//仅支持当前Win中的 各个frame和当前win之间的相互执行脚本
	s.execScript = function(json){
		/*{
			winId:'xxx',
			frameId:'yyy',
			script:'do()'
		}*/
		if(typeof json == "object"){
			//json.execFn = "summer.eval"
			if(json.script){
				json.script = "try{"+json.script+"}catch(e){alert(e)}";
			}else{
				alert("the parameter script of the execScript function is " + json.script);
			}
		}
		if(s.canrequire()){
            //return s.require('summer-plugin-frame.XFrame').execScript(json,null,null);
			return this.callCordova('summer-plugin-frame.XFrame','execScript',json, null, null);
		}
    };
	
	//持久化本地存储	
	var umStorage = function(type){
		type = type || "localStorage";
		if(type == "localStorage"){
			if(!window.localStorage){
		        alert('your device do not support the localStorage');
				return;
		    }
			return window.localStorage;
		}else if(type == "sessionStorage"){
			if(!window.sessionStorage){
		        alert('your device do not support the sessionStorage');
				return;
		    }
			return window.sessionStorage;
		}else if(type == "application"){
			return {
				setItem : function(key, value){
					var json = {
						key: key,
						value: value
					};
					return s.callSync("SummerStorage.writeApplicationContext", JSON.stringify(json));
				},
				getItem : function(key){
					var json = {
						key: key
					};
					return s.callSync("SummerStorage.readApplicationContext", JSON.stringify(json));
				}				
			};
		}else if(type == "configure"){
			return {
				setItem : function(key, value){
					var json = {
						key: key,
						value: typeof value == "string" ? value : JSON.stringify(value)
					};
					return s.callSync("SummerStorage.writeConfigure", JSON.stringify(json));
				},
				getItem : function(key){
					var json = {
						key: key
					};
					return s.callSync("SummerStorage.readConfigure", JSON.stringify(json));
				}				
			};
		}else if(type == "window"){
			return {
				setItem : function(key, value){
					var json = {
						key: key,
						value: typeof value == "string" ? value : JSON.stringify(value)
					};
					return s.callSync("SummerStorage.writeWindowContext", JSON.stringify(json));
				},
				getItem : function(key){
					var json = {
						key: key
					};
					return s.callSync("SummerStorage.readWindowContext", JSON.stringify(json));
				}				
			};
		}
    };
	s.setStorage = function(key, value, storageType){
		var v = value;
		if(storageType != "configure"){
			//storageType == "configure" 是为原生提供的配置，callAction时原生读取，所以不能obj- str-处理
			if(typeof v == 'object'){
				v = JSON.stringify(v);
				v = 'obj-'+ v;
			}else{
				v = 'str-'+ v;
			}
		}
		var ls = umStorage(storageType);
		if(ls){
			ls.setItem(key, v);
		}
    };
	s.getStorage = function(key, storageType){
        var ls = umStorage(storageType);
        if(ls){
            var v = ls.getItem(key);
            if(!v){return;}
            if(storageType != "configure"){
	            if(v.indexOf('obj-') === 0){
	                v = v.slice(4);
	                return JSON.parse(v);
	            }else if(v.indexOf('str-') === 0){
	                return v.slice(4);
	            }else{
	            	return v;
	            }
        	}else{
            	return v;
            }
        }
    };
	
	s.setAppStorage = function(key, value){
        return s.setStorage(key, value, "application");
    };
	s.getAppStorage = function(key){
        return s.getStorage(key, "application");
    };
	/*
	s.writeConfig = function(key, value){
        return s.setStorage(key, value, "configure");
    };
	s.readConfig = function(key){
        return s.getStorage(key, "configure");
    };
	*/
	s.setWindowStorage = function(key, value){
        return s.setStorage(key, value, "window");
    };
	s.getWindowStorage = function(key){
        return s.getStorage(key, "window");
    };
	
    s.rmStorage = function(key){
        var ls = umStorage();
        if(ls && key){
            ls.removeItem(key);
        }
    };
    s.clearStorage = function(){
        var ls = umStorage();
        if(ls){
            ls.clear();
        }
    };
	
	s.sysInfo = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XService').sysInfo(json, successFn, errFn);
	};
	s.addEventListener = function(json, successFn, errFn){
		if(s.canrequire())
            return s.cordova.require('summer-plugin-frame.XFrame').addEventListener(json, successFn, errFn);
	};
	
	//app upgrade API
	s.getAppVersion = function(json){
		return s.callSync('XUpgrade.getAppVersion', json || {});
	};
	s.upgradeApp = function(json, successFn, errFn){
		return s.callCordova('summer-plugin-core.XUpgrade', 'upgradeApp', json, successFn, errFn);
	};
	s.getVersion = function(json){
		var ver = s.callSync('XUpgrade.getVersion', json || {});
		if(typeof ver == "string"){
			return JSON.parse(ver);
		}else{
			alert("getVersion' return value is not string!")
			return ver;
		}
	}
	s.upgrade = function(json, successFn, errFn){
		return s.callCordova('summer-plugin-core.XUpgrade', 'upgrade', json, successFn, errFn);
	};
	//退出
	s.exitApp = function(json, successFn, errFn){
		return s.callCordova('summer-plugin-core.XUpgrade', 'exitApp', json || {}, successFn, errFn);
	};
	
}(window,summer);

//summer native service v3.0.2016092011

+function(w,s){
	w.$__cbm = [];
	if(!s){
		s = {};
		w.summer = s;
	}
	//----------------------------------------------------------------------
	s.UMService = {
		call:function(serviceType, jsonArgs, isSync){
			try{
				jsonArgs = jsonArgs || {};
				var serviceparams = "";
				if(typeof jsonArgs == "string"){
					var json = $summer.strToJson(jsonArgs);
					if(typeof json == "string"){
						//转json后仍然为string，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
						alert("调用服务[" + serviceType + "]时参数不是一个有效的json字符串。参数是" + jsonArgs);
						return;
					}
					serviceparams = $summer.jsonToStr(json);
					if(typeof serviceparams == "object"){
						//转json后仍然为string，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
						alert("调用服务[" + serviceType + "]时传递的参数不能标准化为json字符串，请检查参数格式。参数是" + jsonArgs);
						return;
					}
				}else if(typeof jsonArgs == "object"){//标准参数走这里
					if(jsonArgs["callback"] && $summer.isFunction(jsonArgs["callback"]) && !jsonArgs["__keepCallback"]){
						try{
							//1、 callback:function(){}
							var newCallBackScript = "fun" + $summer.UUID(8, 16) + "()";//anonymous method
							while($__cbm[newCallBackScript]){
								newCallBackScript =  "fun" + $summer.UUID(8, 16) + "()";//anonymous method
							}
							$__cbm[newCallBackScript] = jsonArgs["callback"];//callback can be global or local, so define a reference function in $__cbm

							//
							window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))] = function (sender, args){
								try{
									//alert(typeof sender);
									//alert(typeof args);
									//$alert(sender);
									//$alert(args);
									if(args == undefined)
										args = sender;
									var _func = $__cbm[newCallBackScript];
									_func(sender, args);
								}catch(e){
									alert(e);
								}finally{
									delete $__cbm[newCallBackScript];
									delete window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))];
									//alert("del ok");
									//alert(typeof $__cbm[newCallBackScript]);
									//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
								}
							}
							jsonArgs["callback"] = newCallBackScript;
						}catch(e){
							alert("Excp1: callback为function时，准备callback阶段异常:" + e);
						}
					}else if(jsonArgs["callback"] && typeof(jsonArgs["callback"]) == "string" && !jsonArgs["__keepCallback"]){
						try{
							//2、 callback:"mycallback()"
							try{
								var cbName = jsonArgs["callback"].substring(0, jsonArgs["callback"].indexOf("("));
								var callbackFn = eval(cbName);
								if(typeof callbackFn != "function"){
									alert(cbName + " is not a global function, callback function must be a global function!");
									return;
								}
							}catch(e){
								alert("Excp2.1: 检查callback是否是全局可执行方法异常,callback参数为" + jsonArgs["callback"]);
							}
							
							try{
								var newCallBackScript = "fun" + $summer.UUID(8, 16) + "()";//anonymous method
								while(window[newCallBackScript]){
									newCallBackScript =  "fun" + $summer.UUID(8, 16) + "()";//anonymous method
								}
								//
								window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))] = function (sender, args){
									try{
										//alert(typeof sender);
										//alert(typeof args);
										//$alert(sender);
										//$alert(args);
										if(args == undefined)
											args = sender;
										callbackFn(sender, args);
									}catch(e){
										alert(e);
									}finally{
										delete window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))];
										//alert("del ok");
										//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
									}
								}
								jsonArgs["callback"] = newCallBackScript;
							}catch(e){
								alert("Excp2.2: 接管callback阶段异常:" + e);
							}
						}catch(e){
							alert("Excp2: callback为string时，准备callback阶段异常:" + e);
						}
					}
					
					
					try{
						s.UMService.callBackProxy(jsonArgs , "error");
					}catch(e){
						alert("Excp3: callback为string时，准备callback阶段异常:" + e);
					}
					
					
					
					try{
						serviceparams = $summer.jsonToStr(jsonArgs);
						if(typeof serviceparams == "object"){
							//转string后仍然为json，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
							alert("调用服务[" + serviceType + "]时传递的参数不能标准化为json字符串，请检查参数格式" + jsonArgs);
							return;
						}
					}catch(e){
						alert("Excp4: 校验jsonArgs是否可jsonToStr时异常:" + e);
					}
				}else{
					alert("调用$service.call("+serviceType+", jsonArgs, "+isSync+")时不合法,参数jsonArgs类型为"+typeof jsonArgs);
					return;
				}

				if(isSync){
					try{
						return adrinvoker.call2(serviceType,serviceparams);//call2是同步调用
					}catch(e){
						alert("Excp5.1: 同步调用adrinvoker.call2异常:" + e);
					}
				}else{
					try{
						//默认异步执行
						return adrinvoker.call(serviceType,serviceparams);//call是异步调用 默认异步
					}catch(e){
						alert("Excp5.2: 异步调用adrinvoker.call异常:" + e);
					}
				}
			}catch(e){
				var info="";
				if(isSync)
					info = "调用$service.call(\""+serviceType+"\", jsonArgs, "+isSync+")时发生异常,请检查!";
				else
					info = "调用$service.call(\""+serviceType+"\", jsonArgs)时发生异常,请检查!";
				console.log(info);
				alert(info+", 更多请使用chrome inspect调试查看console日志;\n错误堆栈信息e为:\n" + e);
				alert(info+", 更多请使用chrome inspect调试查看console日志;\n错误堆栈信息e.stack为:\n" + e.stack);
				
				var e_info = "typeof jsonArgs为" + typeof jsonArgs + "\n";
				if(typeof jsonArgs == "object"){
					e_info += "jsonArgs的值为"+ JSON.stringify(jsonArgs) + "\n";				
				}else{
					e_info += "jsonArgs的值为"+ jsonArgs + "\n";
				}
				alert(e_info);
			}
		},
		callBackProxy : function(jsonArgs, callback_KEY){
			if(jsonArgs[callback_KEY] && typeof(jsonArgs[callback_KEY])=="function"){
				// callback:function(){}
				var newCallBackFnName = callback_KEY + $summer.UUID(8, 16);//anonymous method
				while($__cbm[newCallBackFnName]){
					newCallBackFnName =  callback_KEY + $summer.UUID(8, 16);//anonymous method
				}
				$__cbm[newCallBackFnName] = jsonArgs[callback_KEY];//callback can be global or local, so define a reference function in $__cbm

				//
				window[newCallBackFnName] = function (sender, args){
					try{
						//alert(typeof sender);
						//alert(typeof args);
						//$alert(sender);
						//$alert(args);
						if(args == undefined)
							args = sender;
						var _func = jsonArgs[callback_KEY];
						_func(sender, args);
					}catch(e){
						alert(e);
					}finally{
						delete $__cbm[newCallBackFnName];
						delete window[newCallBackFnName];
						//alert("del ok");
						//alert(typeof $__cbm[newCallBackScript]);
						//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
					}
				}
				jsonArgs[callback_KEY] = newCallBackFnName + "()";
			}else if(jsonArgs[callback_KEY] && typeof(jsonArgs[callback_KEY]) == "string"){
				// callback:"mycallback()"
				var cbName = jsonArgs[callback_KEY].substring(0, jsonArgs[callback_KEY].indexOf("("));
				var callbackFn = eval(cbName);
				if(typeof callbackFn != "function"){
					alert(cbName + " is not a global function, callback function must be a global function!");
					return;
				}

				var newCallBackFnName = callback_KEY + $summer.UUID(8, 16);//anonymous method
				while(window[newCallBackFnName]){
					newCallBackFnName =  callback_KEY + $summer.UUID(8, 16);//anonymous method
				}
				//
				window[newCallBackFnName] = function (sender, args){
					try{
						//alert(typeof sender);
						//alert(typeof args);
						//$alert(sender);
						//$alert(args);
						if(args == undefined)
							args = sender;
						callbackFn(sender, args);
					}catch(e){
						alert(e);
					}finally{
						delete window[newCallBackFnName];
						//alert("del ok");
						//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
					}
				}
				jsonArgs[callback_KEY] = newCallBackFnName + "()";
			}
		},
		openHTTPS:function(json){
			/*	参数：
			"ishttps" : "true"//是否开启https传输
			 */
			if($summer.isJSONObject(json)){
				if(!json.ishttps){
					alert("请输入true或者false");
					return;
				}
				return s.callService("UMService.openHTTPS", json, false);
			}else{
				alert("参数不是有效的JSONObject");
			}
		},
		
		writeConfig: function(key, val){
			//1、准备参数
			var args = {};
			if(arguments.length == 1 && typeof arguments[0] == "object"){
				args = key;
			}else if(arguments.length == 2){
				args[key] = val;
			}else{
				alert("writeConfig时,参数不合法");
				return;
			}
			//2、调用服务
			return s.callService("UMService.writeConfigure", args, false);
		},
		readConfig: function(name){
			//1、准备参数
			var args = {};
			if(typeof name == "string")
				args[name] = name;	
			else{
				alert("readConfig时，不支持参数[name]的参数类型为" + typeof name);
				return;
			}
			//2、调用服务
			return s.callService("UMService.readConfigure", args, false);
		},
		
		callAction : function(controllerName, actionName, params, isDataCollect, callbackActionID, contextmapping, customArgs){
			if(arguments.length == 1 && typeof arguments[0] == "object"){
				var args = {};
				/*
				 args  = {
				 viewid:"xxx.xxx.xx",
				 action:"methodName",
				 params:{a:1,b:2},
				 //isDataCollect:true,
				 autoDataBinding:true,//请求回来会是否进行数据绑定
				 contextmapping:"fieldPath",//将返回结果映射到指定的Context字段上，默认为替换整个Context
				 callback:"actionid",
				 error:"errorActionId"//失败回调的ActionId
				 }
				 */
				args = controllerName;
				var sysParam = {
					viewid:"xxx.xxx.xx",
					action:"methodName",
					//"params" : {a:1,b:2},//自定义参数
					//isDataCollect:true,
					autoDataBinding:true,//请求回来会是否进行数据绑定
					contextmapping:"fieldPath",//将返回结果映射到指定的Context字段上，默认为替换整个Context
					callback:"actionid",
					error:"errorActionId"//失败回调的ActionId
				};
				for(key in args){
					if(!sysParam.hasOwnProperty(key) && typeof args[key] == "string"){
						args[key] = $summer.strToJson(args[key]);
					}
				}
				return s.callService("UMService.callAction", args, false);
			}else{
				var args = {};
				args["viewid"] = controllerName;
				args["action"] = actionName;
				args["params"] = params;
				args["isDataCollect"] = isDataCollect;
				args["callback"] = callbackActionID;
				args["contextmapping"] = contextmapping;
				if(customArgs){//处理自定义参数，用于该服务的参数扩展
					for(key in customArgs){
						args[key] = customArgs[key];
					}
				}
				//$service.call("UMService.callAction","{callback:'myback', contextmapping:'data'，viewid:'"+controllerName+"',isDataCollect:'false',params:{demo:'demo'},action:'needPwd'}");
				return s.callService("UMService.callAction", args);
			}
		},
		get: function (json) {
			/*	参数：
			 url : 请求的ID
			 callback : 用于绑定webview的字段名
			 */
			if($summer.isJSONObject(json)){
				if(!json.url){
					alert("请输入请求的url");
					return;
				}
				return s.callService("UMService.get", json, false);
			}else{
				alert("参数不是有效的JSONObject");
			}
		},
		post: function (json) {
			/*	参数：
			 url : "http://academy.yonyou.com/api/loginLx.ashx",//请求的url,
			 data: {key:"6480-4230-27FD-8AA0",user:"apitest",pwd:"123456"},
			 callback : "mycallback()"
			 */
			if($summer.isJSONObject(json)){
				if(!json.url){
					alert("请输入请求的url");
					return;
				}
				return s.callService("UMService.post", json, false);
			}else{
				alert("参数不是有效的JSONObject");
			}
		}
	};//s.service end

	///////////////////////////////////////////////////////////////////////////////////////////
	//summser.UMDevie.writeFile()
	//summer.camera.open() --->summer.openCamera()
	s.UMDevice = {
		_deviceInfo_Screen :null,
		getTimeZoneID : function(){
			return	s.callService("UMDevice.getTimeZoneID", "", true);
		} ,
		getTimeZoneDisplayName : function(){
			return	s.callService("UMDevice.getTimeZoneDisplayName", {}, true); //无参调用统一使用{}
		},
		openAddressBook: function () {
			return s.callService("UMDevice.openAddressBook",{});

		},
		getInternalMemoryInfo: function () {
			return s.callService("UMDevice.getInternalMemoryInfo",{},true);
		},
		getExternalStorageInfo: function () {
			return s.callService("UMDevice.getExternalStorageInfo",{},true);
		},
		getMemoryInfo: function () {
			return s.callService("UMDevice.getMemoryInfo",{},true);
		},
		openWebView: function (args) {
			if(!$summer.isJSONObject(args)){
				alert("调用gotoMapView服务时，参数不是一个有效的JSONObject");
			}
			/*
			 var args = {url:"http://www.baidu.com"};
			 */
			return s.callService("UMDevice.openWebView", args);
		},
		screenShot: function (args) {

			return s.callService("UMDevice.screenshot",args,true);
		},
		notify: function (args) {
			/*var params = {
			 "sendTime" : "2015-02-03 13:54:30",
			 "sendBody" : "您设置了消息提醒事件",
			 "icon": "app.png"
			 };*/
			s.callService("UMService.localNotification", args);
		},
		getDeviceInfo: function (jsonArgs) {
			var result = "";
			if(jsonArgs){
				result = s.callService("UMDevice.getDeviceInfo", $summer.jsonToStr(jsonArgs), false);
			}else{
				result = s.callService("UMDevice.getDeviceInfo", "", true);
			}
			return JSON.parse(result);
		},
		getScreenWidth: function () {
			if(!this._deviceInfo_Screen){
				var strd_info = this.getDeviceInfo();
				var info = $summer.strToJson(strd_info);
				this._deviceInfo_Screen = info.screen;
			}
			if(this._deviceInfo_Screen){
				return this._deviceInfo_Screen.width;
			}else{
				alert("未能获取到该设备的屏幕信息");
			}
		},
		getScreenHeight: function () {
			if(!this._deviceInfo_Screen){
				var strd_info = this.getDeviceInfo();
				var info = $summer.strToJson(strd_info);
				this._deviceInfo_Screen = info.screen;
			}
			if(this._deviceInfo_Screen){
				return this._deviceInfo_Screen.height;
			}else{
				alert("未能获取到该设备的屏幕信息");
			}
		},
		getScreenDensity: function () {
			if(!this._deviceInfo_Screen){
				var strd_info = this.getDeviceInfo();
				var info = $summer.strToJson(strd_info);
				this._deviceInfo_Screen = info.screen;
			}
			if(this._deviceInfo_Screen){
				return this._deviceInfo_Screen.density;
			}else{
				alert("未能获取到该设备的屏幕信息");
			}
		},
		currentOrientation: function () {
			return s.callService("UMDevice.currentOrientation", {}, true);
		},
		capturePhoto: function (args) {
			if(!$summer.isJSONObject(args)){
				alert("调用capturePhoto服务时，参数不是一个有效的JSONObject");
			}
			s.callService("UMDevice.capturePhoto", args);
		},
		getAlbumPath: function (args) {
			return s.callService("UMDevice.getAlbumPath", typeof args == "undefined" ? {} : args, true);
		},
		getAppAlbumPath: function (jsonArgs) {
			if(jsonArgs){
				if(!$summer.isJSONObject(jsonArgs)){
					alert("调用 getAppAlbumPath 服务时，参数不是一个有效的JSONObject");
					return;
				}
			}else{
				jsonArgs = {};
			}
			return s.callService("UMDevice.getAppAlbumPath", jsonArgs, true);
		},
		getContacts: function () {
			return s.callService("UMDevice.getContactPerson", {}, true);
		},
		saveContact: function (args) {
			if(!$summer.isJSONObject(args)){
				alert("调用saveContact服务时，参数不是一个有效的JSONObject");
			}
			s.callService("UMDevice.saveContact", args);
		},
		popupKeyboard : function(){
			return s.callService("UMDevice.popupKeyboard",{},true);
		}
	};
	s.UMFile = {
		remove : function(args){
			return s.callService("UMFile.remove", args, false);//默认异步
		},
		exists : function(args){
			return s.callService("UMFile.exists", args, true);
		},
		download : function(jsonArgs){
			if($summer.isEmpty(jsonArgs.url)){
				alert("参数url不能为空");
			}
			if($summer.isEmpty(jsonArgs.filename)){
				alert("参数filename不能为空");
			}
			if($summer.isEmpty(jsonArgs.locate)){
				alert("参数locate不能为空");
			}
			if($summer.isEmpty(jsonArgs.override)){
				alert("参数override不能为空");
			}
			if($summer.isEmpty(jsonArgs.callback)){
				alert("参数callback不能为空 ");
			}
			jsonArgs["__keepCallback"] = true;
			return s.callService("UMFile.download", jsonArgs);//默认异步
		},
		open : function(args){
			if(!$summer.isJSONObject(args)){
				alert("调用$file.open方法时，参数不是一个有效的JSONObject");
			}
			return s.callService("UMDevice.openFile", args, false);//调用的是UMDevice的方法
		},
		getFileInfo : function(args){
			var json = args;
			if(typeof args == "string"){
				json = {"path" : args};
			}
			return s.callService("UMFile.getFileInfo",json, true);
		},
		openFileSelector : function(args){
			return s.callService("UMFile.openFileSelector", args);
		}

	};
	s.UMTel = {
		call: function (tel) {
			if($summer.os=='android' || $summer.os=='ios') {
				s.callService("UMDevice.callPhone", '{"tel":"'+tel+'"}');
			}else{
				alert("Not implementate UMP$Services$Telephone$call in $summer.os == " + $summer.os);
			}
		},
		sendMsg: function (tel, body) {
			if(arguments.length == 1 && $summer.isJSONObject(arguments[0])){
				var args = tel;
				if($summer.os=='android' || $summer.os=='ios') {
					return s.callService("UMDevice.sendMsg", args);
				}
			}else{
				if( $summer.os=='android' || $summer.os=='ios') {
					//$service.call("UMDevice.sendMessage", "{recevie:'"+tel+"',message:'"+body+"'}");
					s.callService("UMDevice.sendMsg", "{tel:'"+tel+"',body:'"+body+"'}");
				}
			}
		},
		sendMail: function (receive, title, content) {
			var args = {};
			if(arguments.length == 1 && $summer.isJSONObject(arguments[0])){
				args = receive;
			}else{
				args["receive"] = receive;
				args["title"] = title;
				args["content"] = content;
			}
			return s.callService("UMDevice.sendMail", args);
		}

	};
	s.UMCamera={
		open: function (args) {
			if($summer.checkIfExist(args, ["bindfield","callback","compressionRatio"]))
				return s.callService("UMDevice.openCamera",args,false);
		},
		openPhotoAlbum: function (json) {
			if(!json) return;
			var args = {};
			if(json.bindfield)
				args["bindfield"] = json["bindfield"];
			if(json.callback)
				args["callback"] = json["callback"];
			if(json.compressionRatio)
				args["compressionRatio"] = json["compressionRatio"];
			return s.callService("UMDevice.openPhotoAlbum", args, false)//异步调用服务
		}
	}
	s.UMScanner={
		open: function (jsonArgs) {
			var result = "";
			if(jsonArgs){
				if(jsonArgs["frameclose"] == null){
					jsonArgs["frameclose"] =  "true";//默认扫描后关闭
				}
				result = s.callService("UMDevice.captureTwodcode", jsonArgs, false);
			}else{
				result = s.callService("UMDevice.captureTwodcode", "", true);
			}
		},
		generateQRCode: function (jsonArgs) {
			//twocode-size  //二维码大小，默认180*180，二维码为正方形
			//twocode-content  //二维码内容，字符串
			if($summer.isJSONObject(jsonArgs)){
				if(typeof jsonArgs["size"] != "undefined"){
					jsonArgs["twocode-size"] =  jsonArgs["size"];
				}
				if(typeof jsonArgs["content"] != "undefined"){
					jsonArgs["twocode-content"] =  jsonArgs["content"];
				}
				if(typeof jsonArgs["twocode-size"] == "undefined"){
					jsonArgs["twocode-size"] =  "180";
				}
				if(typeof jsonArgs["twocode-content"] == "undefined"){
					alert("参数twocode-content不能为空，此参数用来标识扫描二维码后的返回值");
					return;
				}
			}else{
				alert("generateQRCode方法的参数不是一个有效的JSONObject!");
				return;
			}

			return s.callService("UMDevice.createTwocodeImage", jsonArgs, true);
		},
	};
	s.UMNet={
		available: function () {
			var result = false;
			if($summer.os=='android' || $summer.os=='ios'){
				result = s.callService("UMNetwork.isAvailable", {}, true);
			}
			if(result != null && result.toString().toLowerCase() == "true"){
				return true;
			}else{
				return false;
			}
		},
		getNetworkInfo: function () {
			var result = s.callService("UMNetwork.getNetworkInfo", {}, true);//同步
			if(typeof result == "String"){
				return $summer.strToJson(result);
			}else{
				return result;
			}
		}
	};
	s.UMSqlite={
		openDB:function(args){
			if($summer.isJSONObject(args) && !$summer.isEmpty(args["db"])){
				return s.callService(this.UMSQLite_openDB, args, false);
			}else{
				alert("参数不是一个有效的JSONObject，请使用openDB({...})形式的API");
			}
		},
		execSql: function (args) {
			if($summer.isJSONObject(args)){
				if($summer.isEmpty(args["db"])){
					alert("请输入参数db");
					return;
				}
				if($summer.isEmpty(args["sql"])){
					alert("请输入参数sql");
					return;
				}
				return s.callService("UMSQLite.execSql", args, true);
			}else{
				alert("参数不是一个有效的JSONObject，请使用execSql({...})形式的API");
			}
		},
		//查询记录并分页返回
		//参数db：必选 数据库名字
		//参数sql：必选   查询sql语句
		//参数startIndex： 可选  起始记录数索引 默认0
		//参数endIndex：  可选  结束记录索引（含） 默认9
		query: function (args) {
			/*
			 $sqlite.query({
			 "db" : dbname,
			 "sql" : sql,
			 "startIndex" : 0,   //从第几条记录开始
			 "endIndex" : 9   //到第几条记录结束(含)
			 });
			 */
			if($summer.isJSONObject(args)){
				/*
				 if($isEmpty(args["startIndex"])){
				 args["startIndex"] = 0;
				 }
				 if($isEmpty(args["endIndex"])){
				 args["endIndex"] = 9;
				 }
				 */
				return s.callService("UMSQLite.query", args, true);
			}else{
				alert("参数不是一个有效的JSONObject，请使用query({...})形式的API");
			}
		},
		//查询返回指定页面的数据
		//参数db：必选 数据库名字
		//参数sql：必选   查询sql语句
		//参数pagesize：  可选  每页记录数 默认10
		//参数pageIndex： 可选  指定页码 默认0
		queryByPage: function (args) {
			/*
			 $sqlite.queryByPage({
			 "db" : dbName,
			 "sql" : sql,
			 "pageSize" : pageSize,   //pageIndex=页号，从0开始
			 "pageIndex" : pageNo //pageSize=每页的记录数，从1开始
			 })
			 */
			if($summer.isJSONObject(args)){
				if($summer.isEmpty(args["pageSize"])){
					args["pageSize"] = 10;
				}
				if($summer.isEmpty(args["pageIndex"])){
					args["pageIndex"] = 0;
				}
				return s.callService("UMSQLite.queryByPage", args, true);
			}else{
				alert("参数不是一个有效的JSONObject，请使用queryByPage({...})形式的API");
			}
		},
		exist: function (args) {
			if($summer.isJSONObject(args)){
				if($summer.isEmpty(args["db"])){
					alert("请输入参数db");
					return;
				}
				return s.callService("UMSQLite.exist", args, true);
			}else{
				alert("参数不是一个有效的JSONObject，请使用exist({...})形式的API");
			}
		}
	};
	s.UMCache={
		writeFile : function(filePath, content){
			var args = {};
			if(filePath)
				args["path"] = filePath;
			if(content)
				args["content"] = content;
			return s.callService("UMFile.write", args, false);
		},
		readFile : function(filePath){
			var strContent = "";
			var args ={};
			if(filePath)
				args["path"] = filePath;
			strContent = s.callService("UMFile.read", args, true);

			//苹果安卓统一返回处理结果
			if(strContent && strContent != ""){
				try{
					/*  取出缓存的值不再强行转化为json，按照绝大多数平台通常的处理方式，缓存取出来后必要时需自行类型转化
					 obj = $stringToJSON(strContent);
					 return obj;
					 */
					return strContent;
				}catch(e){
					return strContent;
				}
			}else{
				return null;
			}
		}
	}
	/*service*/
	s.openHTTPS = s.UMService.openHTTPS;
	s.callService = s.UMService.call;
	s.callAction = s.UMService.callAction;
	s.writeConfig = s.UMService.writeConfig;
	s.readConfig = s.UMService.readConfig;

	/*device*/
	s.getTimeZoneID = s.UMDevice.getTimeZoneID;
	s.getTimeZoneDisplayName = s.UMDevice.getTimeZoneDisplayName;
	s.openAddressBook= s.UMDevice.openAddressBook;
	s.getInternalMemoryInfo = s.UMDevice.getInternalMemoryInfo;
	s.getExternalStorageInfo = s.UMDevice.getExternalStorageInfo;
	s.getMemoryInfo = s.UMDevice.getMemoryInfo;
	s.openWebView = s.UMDevice.openWebView;
	s.screenShot = s.UMDevice.screenShot;
	s.notify = s.UMDevice.notify;
	s.getDeviceInfo = s.UMDevice.getDeviceInfo;
	s.getScreenWidth = s.UMDevice.getScreenWidth;
	s.getScreenHeight = s.UMDevice.getScreenHeight;
	s.getScreenDensity = s.UMDevice.getScreenDensity;
	s.currentOrientation = s.UMDevice.currentOrientation;
	s.capturePhoto = s.UMDevice.capturePhoto;
	s.getAlbumPath = s.UMDevice.getAlbumPath;
	s.getAppAlbumPath = s.UMDevice.getAppAlbumPath;
	s.getContacts = s.UMDevice.getContacts;
	s.saveContact = s.UMDevice.saveContact;
	s.popupKeyboard = s.UMDevice.popupKeyboard;
	//
	s.removeFile = s.UMFile.remove;
 	s.exists = s.UMFile.exists;
 	s.download = s.UMFile.download;
 	s.openFile = s.UMFile.open;
 	s.getFileInfo = s.UMFile.getFileInfo;
 	s.openFileSelector = s.UMFile.openFileSelector;
	/*tel*/
	s.callPhone= s.UMTel.call;
	s.sendMsg= s.UMTel.sendMsg;
	s.sendMail= s.UMTel.sendMail;
	/*cache*/
	s.writeFile = s.UMCache.writeFile;
	s.readFile = s.UMCache.readFile;
	/*camera*/
	s.openCamera= s.UMCamera.open;
	s.openPhotoAlbum = s.UMCamera.openPhotoAlbum;
	/*scanner*/
	s.openScanner= s.UMScanner.open;
	s.generateQRCode= s.UMScanner.generateQRCode;
	/*net*/
	s.netAvailable= s.UMNet.available;
	s.getNetworkInfo= s.UMNet.getNetworkInfo;

	s.ajax=function(json, successFn, errFn){
		if(json.type == "get"){
			return cordovaHTTP.get(json.url || "", json.param || {}, json.header || {}, successFn, errFn);
		}else if(json.type == "post"){
			return cordovaHTTP.post(json.url || "", json.param || {}, json.header || {}, successFn, errFn);
		}
	};
	s.get=function(url, param, header, successFn, errFn){
		return cordovaHTTP.get(url || "", param || {}, header || {}, successFn, errFn);
	};
	s.post=function(url, param, header, successFn, errFn){
		return cordovaHTTP.post(url || "", param || {}, header || {}, successFn, errFn);
	};
	s.getLocation=function(successFn, errFn){
		return navigator.geolocation.getCurrentPosition(successFn, errFn);
	};

}(window,summer);

(function(w,s,$s,prefix){
	//构建函数,用作实例化
    s.umRef = function(){}
    //储值对象，用作判断重复性
    var refManager = {
        refs : {},
        exec : function(id, data){
            this.refs[id].callback(data);
            delete this.refs[id]; 
        }
    }
    //summer追加的方法，用作公用    
    s.openRef = function(json,fn){
        var ref = new s.umRef();
        var info = s.getSysInfo();
        ref.param = {
            ref_id : "Fn" + $s.UUID(),//Fn_CA12BA
            ref_winId : info.winId,
            ref_frameId : info.frameId,
            ref_callBack : prefix + ".refCallBack"
        }
        ref.callback = fn;
        refManager.refs[ref.param.ref_id] = ref;
        json.pageParam = json.pageParam || {};
        json.pageParam["refParam"] = ref.param;
        s.openWin(json);
    }
    // summer的回调方法，用作下个页面的调用
    s.refCallBack = function (id,data){
        refManager.exec(id,data);
    }
    
    s.comleteRef = function(json){
        var str = json;
        if(typeof json == "object"){
            str = JSON.stringify(json);
        }else if(typeof json == "string"){
            str = "'" + json + "'";
        }
        var param = {};
        param.um_refId = s.pageParam.refParam.ref_id;
        param.um_winId = s.pageParam.refParam.ref_winId;
        param.um_frameId = s.pageParam.refParam.ref_frameId;
        param.um_callBack = s.pageParam.refParam.ref_callBack;// summer.refcallBack({})
        s.execScript({
            winId : param.um_winId,
            frameId : param.um_frameId,
            script :  param.um_callBack + "('"+param.um_refId+"',"+str+");"//  xxx({z:1})  xxx(zzzz)
        });
        s.closeWin();
    }
})(window,summer,$summer,"summer")

//summer debug
+function(w,s){
	w.$summer.__debug = false;
}(window,summer);

/*
 * Summer JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: qhb@yonyou.com go
 * Version: 3.0.0.20170214.2047
 */
(function(global, factory){
    if ( typeof module === "object" && typeof module.exports === "object" ) {
     
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }
}(window,function(window,noGlobal){
    var e = {};
    window.emm = e;
    return emm;
}))


+function(w,e,s){
    if(!e){
        e={};
        w.emm=e;
    }

    e.writeConfig = function(json,successFn,errFn){
        s.callService("UMEMMService.writeConfig", json, false)

    };
    e.autofind = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.autofind', json, false);
    };
    e.registerDevice = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.registerDevice', json, false);
    };
    e.login = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.login', json, false);
    };
    e.logout = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.logout', json, false);
    };
    e.getUserInfo = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getUserInfo', json, false);
    };  
    e.modifyPassword = function(json,successFn,errFn){  
        json["callback"]=successFn;
        json["error"]=errFn;    
        return  s.callService('UMEMMService.modifyPassword', json, false);
    };
    e.modifyAvatar = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.modifyAvatar', json, false);
    };
    e.getApps = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getApps', json, false);
    };
    e.getDocs = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getDocs', json, false);
    };
    e.startStrategy = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.startStrategy', json, false);
    };
    e.stopStrategy = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.stopStrategy', json, false);
    };
    e.feedback = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.feedback', json, false);
    }
}(window,emm,summer);