(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},38:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(13),c=n.n(r),u=n(14),i=n(3),l=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return o.a.createElement("div",null,e.content,o.a.createElement("button",{onClick:n},a))},m=n(2),f=n.n(m),p=function(){return f.a.get("/api/notes")},s=function(t){return f.a.post("/api/notes",t)},d=function(t,e){return f.a.put("".concat("/api/notes","/").concat(t),e)},b=function(t){var e=Object(a.useState)([]),n=Object(i.a)(e,2),r=n[0],c=n[1],m=Object(a.useState)(""),f=Object(i.a)(m,2),b=f[0],v=f[1],E=Object(a.useState)(!0),g=Object(i.a)(E,2),O=g[0],h=g[1];Object(a.useEffect)(function(){p().then(function(t){c(t.data)})},[]);var j=O?r:r.filter(function(t){return t.important});return o.a.createElement("div",null,o.a.createElement("h1",null,"Notes"),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){return h(!O)}},"show ",O?"important":"all")),o.a.createElement("ul",null,j.map(function(t){return o.a.createElement(l,{key:t.id,note:t,toggleImportance:function(){return function(t){var e=r.find(function(e){return e.id===t}),n=Object(u.a)({},e,{important:!e.important});d(t,n).then(function(e){c(r.map(function(n){return n.id!==t?n:e.data}))})}(t.id)}})})),o.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:b,date:(new Date).toISOString(),important:Math.random()>.5};s(e).then(function(t){c(r.concat(t.data)),v("")})}},o.a.createElement("input",{value:b,onChange:function(t){console.log(t.target.value),v(t.target.value)}}),o.a.createElement("button",{type:"submit"},"save")))};c.a.render(o.a.createElement(b,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.36ce624a.chunk.js.map