"use strict";(self.webpackChunk_minimal_minimal_kit_react=self.webpackChunk_minimal_minimal_kit_react||[]).push([[685],{57685:function(e,r,n){n.r(r),n.d(r,{default:function(){return S}});var t=n(17592),i=n(70178),o=n(61113),c=n(57829),a=n(90891),d=n(33896),s=n(71361),u=n(1413),l=n(74165),f=n(15861),m=n(28089),h=n(58908),x=n(97890),p=n(47313),v=n(75627),Z=n(1432),g=n(35898),j=n(49914),b=n(15480),y=n(51406),q=n(48175),C=n(94290),_=n(46417);function k(){var e=(0,x.s0)(),r=(0,h.Ds)().enqueueSnackbar,n=m.Ry().shape({code1:m.Z_().required("Code is required"),code2:m.Z_().required("Code is required"),code3:m.Z_().required("Code is required"),code4:m.Z_().required("Code is required"),code5:m.Z_().required("Code is required"),code6:m.Z_().required("Code is required")}),t=(0,v.cI)({mode:"all",resolver:(0,Z.X)(n),defaultValues:{code1:"",code2:"",code3:"",code4:"",code5:"",code6:""}}),i=t.watch,o=t.control,c=t.setValue,a=t.handleSubmit,d=t.formState,s=d.isSubmitting,k=d.errors,w=i();(0,p.useEffect)((function(){var e=document.querySelector("input.field-code");return null===e||void 0===e||e.addEventListener("paste",S),function(){null===e||void 0===e||e.removeEventListener("paste",S)}}),[]);var S=function(e){var r=e.clipboardData.getData("text");r=r.split(""),[].forEach.call(document.querySelectorAll(".field-code"),(function(e,n){e.value=r[n];var t="code".concat(n+1);c(t,r[n])})),e.preventDefault()},D=function(){var n=(0,f.Z)((0,l.Z)().mark((function n(t){return(0,l.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,new Promise((function(e){return setTimeout(e,500)}));case 3:console.log("data",Object.values(t).join("")),r("Verify success!"),e(q.vB.root,{replace:!0}),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),console.error(n.t0);case 11:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(e){return n.apply(this,arguments)}}();return(0,_.jsx)(C.RV,{methods:t,onSubmit:a(D),children:(0,_.jsxs)(g.Z,{spacing:3,children:[(0,_.jsx)(g.Z,{direction:"row",spacing:2,justifyContent:"center",children:Object.keys(w).map((function(e,r){return(0,_.jsx)(v.Qr,{name:"code".concat(r+1),control:o,render:function(e){var n=e.field,t=e.fieldState.error;return(0,_.jsx)(j.Z,(0,u.Z)((0,u.Z)({},n),{},{error:!!t,autoFocus:0===r,placeholder:"-",onChange:function(e){return function(e,r){var n=e.target,t=n.maxLength,i=n.value,o=n.name.replace("code",""),c=Number(o);if(i.length>=t&&c<6){var a=document.querySelector("input[name=code".concat(c+1,"]"));null!==a&&a.focus()}r(e)}(e,n.onChange)},inputProps:{className:"field-code",maxLength:1,sx:{p:0,textAlign:"center",width:{xs:36,sm:56},height:{xs:36,sm:56}}}}))}},e)}))}),(!!k.code1||!!k.code2||!!k.code3||!!k.code4||!!k.code5||!!k.code6)&&(0,_.jsx)(b.Z,{error:!0,sx:{px:2},children:"Code is required"}),(0,_.jsx)(y.Z,{fullWidth:!0,size:"large",type:"submit",variant:"contained",loading:s,sx:{mt:3},children:"Verify"})]})})}var w=(0,t.ZP)("div")((function(e){return{maxWidth:480,margin:"auto",minHeight:"100vh",display:"flex",justifyContent:"center",flexDirection:"column",padding:e.theme.spacing(12,0)}}));function S(){return(0,_.jsxs)(s.Z,{title:"Verify Code",children:[(0,_.jsx)(d.Z,{}),(0,_.jsx)(i.Z,{children:(0,_.jsxs)(w,{sx:{textAlign:"center"},children:[(0,_.jsx)(o.Z,{variant:"h3",paragraph:!0,children:"Please check your email!"}),(0,_.jsx)(o.Z,{sx:{color:"text.secondary"},children:"We have emailed a 6-digit confirmation code to acb@domain, please enter the code in below box to verify your email."}),(0,_.jsx)(c.Z,{sx:{mt:5,mb:3},children:(0,_.jsx)(k,{})}),(0,_.jsxs)(o.Z,{variant:"body2",children:["Don\u2019t have a code? \xa0",(0,_.jsx)(a.Z,{variant:"subtitle2",onClick:function(){},children:"Resend code"})]})]})})]})}}}]);