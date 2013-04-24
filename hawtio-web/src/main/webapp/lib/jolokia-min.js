(function(){var e=function(e){function s(i){if(!(this instanceof arguments.callee))return new s(i);this.CLIENT_VERSION="1.1.1";var u=[],a={},f=!1;typeof i=="string"&&(i={url:i}),e.extend(a,t,i),this.request=function(t,i){var o=e.extend({},a,i);w(o.url,"No URL given");var u={};e.each(["username","password","timeout"],function(e,t){o[t]&&(u[t]=o[t])}),u.username!=="undefined"&&u.password!=="undefined"&&(u.beforeSend=function(e){var t=u.username+":"+u.password;e.setRequestHeader("Authorization","Basic "+btoa(t))}),h(t,o)==="post"?(e.extend(u,r),u.data=JSON.stringify(t),u.url=v(o.url)):(e.extend(u,n),u.dataType=o.jsonp?"jsonp":"json",u.url=o.url+"/"+d(t)),u.url=p(u.url,o),o.ajaxError&&(u.error=o.ajaxError);if(o.success){var f=c(o.success),l=c(o.error);return u.success=function(t){var n=e.isArray(t)?t:[t];for(var r=0;r<n.length;r++){var i=n[r];s.isError(i)?l(i,r):f(i,r)}},e.ajax(u),null}if(o.jsonp)throw Error("JSONP is not supported for synchronous requests");u.async=!1;var m=e.ajax(u);return b(m)?e.parseJSON(m.responseText):null},this.register=function(){if(arguments.length<2)throw"At a least one request must be provided";var t=arguments[0],n=Array.prototype.slice.call(arguments,1),r;if(typeof t=="object"){if(t.success&&t.error)r={success:t.success,error:t.error};else{if(!t.callback)throw"Either 'callback' or ('success' and 'error') callback must be provided when registering a Jolokia job";r={callback:t.callback}}r=e.extend(r,{config:t.config,onlyIfModified:t.onlyIfModified})}else{if(typeof t!="function")throw"First argument must be either a callback func or an object with 'success' and 'error' attributes";r={success:null,error:null,callback:t}}if(!n)throw"No requests given";r.requests=n;var i=u.length;return u[i]=r,i},this.unregister=function(e){e<u.length&&(u[e]=undefined)},this.jobs=function(){var e=[],t=u.length;for(var n=0;n<t;n++)u[n]&&e.push(n);return e},this.start=function(e){e=e||a.fetchInterval||3e4;if(f){if(e===a.fetchInterval)return;this.stop()}a.fetchInterval=e,this.timerId=setInterval(o(this,u),e),f=!0},this.stop=function(){if(!f&&this.timerId!=undefined)return;clearInterval(this.timerId),this.timerId=null,f=!1},this.isRunning=function(){return f}}function o(e,t){return function(){var n=[],r=[],i,s,o=t.length,c=[];for(i=0;i<o;i++){var h=t[i];if(!h)continue;var p=h.requests.length;if(h.success){var d=l(h,i),v=f(h,i);for(s=0;s<p;s++)c.push(u(h,s)),r.push(d),n.push(v)}else{var m=a(h,e);for(s=0;s<p-1;s++)c.push(u(h,s)),r.push(m.cb),n.push(m.cb);c.push(u(h,p-1)),r.push(m.lcb),n.push(m.lcb)}}var g={success:function(t,n){return r[n].apply(e,[t,n])},error:function(t,r){return n[r].apply(e,[t,r])}};return e.request(c,g)}}function u(t,n){var r=t.requests[n],i=t.config||{},s=t.onlyIfModified&&t.lastModified?{ifModifiedSince:t.lastModified}:{};return r.config=e.extend({},i,r.config,s),r}function a(e,t){function s(e,t){if(e.status!=304){if(i==0||e.timestamp<i)i=e.timestamp;n.push(e)}}var n=[],r=e.callback,i=0;return{cb:s,lcb:function(o,u){s(o),n.length>0&&(e.lastModified=i,r.apply(t,n))}}}function f(e,t){var n=e.error;return function(e,r){if(e.status==304)return;n&&n(e,t,r)}}function l(e,t){var n=e.success;return function(r,i){n&&(e.onlyIfModified&&(e.lastModified=r.timestamp),n(r,t,i))}}function c(t){if(t==null)return function(e){console.warn("Ignoring response "+JSON.stringify(e))};if(t==="ignore")return function(){};var n=e.isArray(t)?t:[t];return function(e,t){n[t%n.length](e,t)}}function h(t,n){var r=n&&n.method?n.method.toLowerCase():null,i;if(r){if(r==="get"){if(e.isArray(t))throw new Error("Cannot use GET with bulk requests");if(t.type.toLowerCase()==="read"&&e.isArray(t.attribute))throw new Error("Cannot use GET for read with multiple attributes");if(t.target)throw new Error("Cannot use GET request with proxy mode");if(t.config)throw new Error("Cannot use GET with request specific config")}i=r}else i=e.isArray(t)||t.config||t.type.toLowerCase()==="read"&&e.isArray(t.attribute)||t.target?"post":"get";if(n.jsonp&&i==="post")throw new Error("Can not use JSONP with POST requests");return i}function p(t,n){var r=t.indexOf("?")>0?"&":"?";return e.each(i,function(e,i){n[i]!=null&&(t+=r+i+"="+n[i],r="&")}),t}function d(t){var n=t.type;w(n,"No request type given for building a GET request"),n=n.toLowerCase();var r=m[n];w(r,"Unknown request type "+n);var i=r(t),o=i.parts||{},u=n;return e.each(o,function(e,t){u+="/"+s.escape(t)}),i.path&&(u+=(i.path[0]=="/"?"":"/")+i.path),u}function v(e){return e.replace(/\/*$/,"/")}function g(t){if(t==null)return"[null]";if(e.isArray(t)){var n="";for(var r=0;r<t.length;r++)n+=t==null?"[null]":y(t[r]),r<t.length-1&&(n+=",");return n}return y(t)}function y(e){return typeof e=="string"&&e.length==0?'""':e.toString()}function b(e){try{return!e.status&&location.protocol==="file:"||e.status>=200&&e.status<300||e.status===304||e.status===1223}catch(t){}return!1}function w(e,t){if(e==null)throw new Error(t)}var t={type:"POST",jsonp:!1},n={type:"GET"},r={type:"POST",processData:!1,dataType:"json",contentType:"text/json"},i=["maxDepth","maxCollectionSize","maxObjects","ignoreErrors","canonicalNaming","serializeException","includeStackTrace","ifModifiedSince"],m={read:function(e){return e.attribute==null?{parts:[e.mbean]}:{parts:[e.mbean,e.attribute],path:e.path}},write:function(e){return{parts:[e.mbean,e.attribute,g(e.value)],path:e.path}},exec:function(t){var n=[t.mbean,t.operation];return t.arguments&&t.arguments.length>0&&e.each(t.arguments,function(e,t){n.push(g(t))}),{parts:n}},version:function(){return{}},search:function(e){return{parts:[e.mbean]}},list:function(e){return{path:e.path}}};return s.prototype.escape=s.escape=function(e){return encodeURIComponent(e.replace(/!/g,"!!").replace(/\//g,"!/"))},s.prototype.isError=s.isError=function(e){return e.status==null||e.status!=200},s};(function(e,t){typeof define=="function"&&define.amd?define(["jquery"],t):e.Jolokia=t(e.jQuery)})(this,function(t){return e(t)})})();