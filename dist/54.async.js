webpackJsonp([54],{819:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=a(7),u=n(r),s=a(131),o=n(s),c=a(319),i=a(332);e.default={namespace:"login",state:{status:void 0},effects:{login:o.default.mark(function t(e,a){var n,r=e.payload,u=a.call,s=a.put;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s({type:"changeSubmitting",payload:!0});case 2:return t.next=4,u(i.fakeAccountLogin,r);case 4:return n=t.sent,t.next=7,s({type:"changeLoginStatus",payload:n});case 7:if("ok"!==n.status){t.next=10;break}return t.next=10,s(c.routerRedux.push("/"));case 10:case"end":return t.stop()}},t,this)}),logout:o.default.mark(function t(e,a){var n,r=a.put;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r({type:"changeLoginStatus",payload:{status:!1}});case 2:return t.next=4,call(i.logout,payload);case 4:if(n=t.sent,!0===n.status||!1===n.status){t.next=8;break}return message.error(n.message||trans("global.systemError","\u7cfb\u7edf\u8d85\u65f6\uff0c\u7a0d\u540e\u91cd\u8bd5\uff01")),t.abrupt("return");case 8:n.status&&window.location.reload();case 9:case"end":return t.stop()}},t,this)})},reducers:{changeLoginStatus:function(t,e){var a=e.payload;return(0,u.default)({},t,{status:a.status,type:a.type,submitting:!1})},changeSubmitting:function(t,e){var a=e.payload;return(0,u.default)({},t,{submitting:a})}}},t.exports=e.default}});