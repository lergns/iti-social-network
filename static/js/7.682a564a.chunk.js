(this["webpackJsonpsamurai-path-ts"]=this["webpackJsonpsamurai-path-ts"]||[]).push([[7],{227:function(e,r,t){e.exports={formControl:"formControls_formControl__3RMTF",error:"formControls_error__2-i41",formLevelError:"formControls_formLevelError__1uTkE"}},229:function(e,r,t){"use strict";t.d(r,"b",(function(){return c})),t.d(r,"a",(function(){return o}));var n,c=function(e){return e?null:"Field is required"},o=(n=100,function(e){return e.length<=n?null:"Max length is ".concat(n," symbols")})},230:function(e,r,t){"use strict";t.d(r,"b",(function(){return u})),t.d(r,"a",(function(){return b}));var n=t(3),c=t(226),o=t(0),i=t.n(o),a=t(227),s=t.n(a),j=t(2),l=i.a.memo((function(e){var r=e.meta,t=e.children,n=r.touched&&r.error;return Object(j.jsxs)("div",{className:s.a.formControl+" "+(n?s.a.error:""),children:[Object(j.jsx)("div",{children:t}),Object(j.jsx)("div",{children:n&&Object(j.jsx)("span",{children:r.error})})]})})),u=i.a.memo((function(e){e.children;var r=e.input,t=(e.meta,Object(c.a)(e,["children","input","meta"]));return Object(j.jsx)(l,Object(n.a)(Object(n.a)({},e),{},{children:Object(j.jsx)("textarea",Object(n.a)(Object(n.a)({},r),t))}))})),b=i.a.memo((function(e){e.children;var r=e.input,t=(e.meta,Object(c.a)(e,["children","input","meta"]));return Object(j.jsx)(l,Object(n.a)(Object(n.a)({},e),{},{children:Object(j.jsx)("input",Object(n.a)(Object(n.a)({},r),t))}))}))},302:function(e,r,t){"use strict";t.r(r);var n=t(0),c=t.n(n),o=t(107),i=t(108),a=t(230),s=t(229),j=t(227),l=t.n(j),u=t(2),b=c.a.memo((function(e){var r=e.handleSubmit,t=e.error;return Object(u.jsxs)("form",{onSubmit:r,children:[Object(u.jsx)("div",{children:Object(u.jsx)(o.a,{component:a.a,name:"email",placeholder:"Email",validate:[s.b]})}),Object(u.jsx)("div",{children:Object(u.jsx)(o.a,{component:a.a,name:"password",type:"password",placeholder:"Password",validate:[s.b]})}),Object(u.jsxs)("div",{children:[Object(u.jsx)(o.a,{component:a.a,name:"rememberMe",type:"checkbox"}),"Remember me"]}),t&&Object(u.jsx)("div",{className:l.a.formLevelError,children:t}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{children:"Log in"})})]})})),m=Object(i.a)({form:"loginForm"})(b),d=t(6),h=c.a.memo((function(e){var r=e.login;return e.isAuth?Object(u.jsx)(d.a,{to:"/profile"}):Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Log in"}),Object(u.jsx)(m,{onSubmit:function(e){return r(e.email,e.password,e.rememberMe)}})]})})),O=t(21),f=t(24),x=t(50),p=Object(O.b)((function(e){return{isAuth:Object(x.b)(e)}}),{login:f.c})(h);r.default=p}}]);
//# sourceMappingURL=7.682a564a.chunk.js.map