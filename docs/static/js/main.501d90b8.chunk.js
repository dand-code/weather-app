(this["webpackJsonpweather-aplication"]=this["webpackJsonpweather-aplication"]||[]).push([[0],{21:function(e,a,t){},41:function(e,a,t){},42:function(e,a,t){},44:function(e,a,t){"use strict";t.r(a);var s=t(2),n=t.n(s),c=t(14),i=t.n(c),r=(t(21),t(4)),l=t.n(r),d=t(15),o=t(5),j=t(16),h=t.n(j),m=(t(41),t(42),t(0));var b=function(){var e=Object(s.useState)(!1),a=Object(o.a)(e,2),t=a[0],n=a[1],c=Object(s.useState)(!1),i=Object(o.a)(c,2),r=i[0],j=i[1];Object(s.useEffect)((function(){navigator.geolocation.getCurrentPosition((function(e){console.log(e.coords.latitude,e.coords.longitude),b(e.coords.latitude,e.coords.longitude),n(!0)}))}),[]);var b=function(){var e=Object(d.a)(l.a.mark((function e(a,t){var s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get("https://api.openweathermap.org/data/2.5/weather",{params:{lat:a,lon:t,appid:"a1ef9cde27b16473c17b639a11f5ef65",lang:"en",units:"metric"}});case 2:s=e.sent,console.log(s.data),j(s.data);case 5:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}();return!1===t?Object(m.jsx)("div",{className:"page page-loading",children:Object(m.jsx)("h2",{className:"page-loading_title",children:"You need habilit the browser location"})}):!1===r?Object(m.jsx)("div",{className:"page page-loading",children:Object(m.jsx)("h2",{className:"page-loading_title",children:"Load the weather..."})}):Object(m.jsxs)("div",{className:"page sun",children:[Object(m.jsx)("div",{className:"page-status"}),Object(m.jsx)("header",{className:"header",children:Object(m.jsx)("h1",{children:"The weather in your location"})}),Object(m.jsxs)("main",{className:"main",children:[Object(m.jsxs)("ul",{className:"main-list",children:[Object(m.jsxs)("li",{children:["Today: ",Object(m.jsx)("span",{className:"main-list_data",children:r.weather[0].description})]}),Object(m.jsxs)("li",{children:["Feels Like:",Object(m.jsxs)("span",{className:"main-list_data",children:[r.main.feels_like,"\xb0"]})]}),Object(m.jsxs)("li",{children:["Actual temperature: ",Object(m.jsxs)("span",{className:"main-list_data",children:[r.main.temp,"\xb0"]})]}),Object(m.jsxs)("li",{children:["Max temperature: ",Object(m.jsxs)("span",{className:"main-list_data",children:[r.main.temp_max,"\xb0"]})]}),Object(m.jsxs)("li",{children:["Min Temperature: ",Object(m.jsxs)("span",{className:"main-list_data",children:[r.main.temp_min,"\xb0"]})]}),Object(m.jsxs)("li",{children:["Pressure: ",Object(m.jsxs)("span",{className:"main-list_data",children:[r.main.pressure," hpa"]})]}),Object(m.jsxs)("li",{children:["Air humidity: ",Object(m.jsxs)("span",{className:"main-list_data",children:[r.main.humidity,"%"]})]})]}),Object(m.jsx)("button",{className:"main-btn",onClick:function(){window.location.reload()},children:"How's the weather now?"})]}),Object(m.jsx)("footer",{className:"footer",children:Object(m.jsxs)("p",{children:["Made with ",Object(m.jsx)("i",{className:"fa fa-heart","aria-hidden":"true"})," by ",Object(m.jsx)("a",{href:"https://github.com/dand-code",target:"_blank",rel:"noreferrer",children:"dand-code"})]})})]})};i.a.render(Object(m.jsx)(n.a.StrictMode,{children:Object(m.jsx)(b,{})}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.501d90b8.chunk.js.map