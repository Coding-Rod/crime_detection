"use strict";(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[560],{52766:(t,n,e)=>{e.d(n,{Z:()=>r});e(57658);var o=e(97993),u=function(){localStorage.getItem("token")||o.Z.push({name:"Login"})};const r=u},8560:(t,n,e)=>{e.r(n),e.d(n,{default:()=>w});e(68309);var o=e(73396),u=e(87139),r=(0,o._)("h1",null,"Notifications",-1);function a(t,n,e,a,i,c){var l=(0,o.up)("CCol"),f=(0,o.up)("CRow"),s=(0,o.up)("CTableHeaderCell"),d=(0,o.up)("CTableRow"),m=(0,o.up)("CTableHead"),_=(0,o.up)("CIcon"),w=(0,o.up)("CTableDataCell"),p=(0,o.up)("CButton"),g=(0,o.up)("CTableBody"),k=(0,o.up)("CTable"),h=(0,o.up)("CContainer");return(0,o.wg)(),(0,o.j4)(h,null,{default:(0,o.w5)((function(){return[(0,o.Wm)(f,null,{default:(0,o.w5)((function(){return[(0,o.Wm)(l,null,{default:(0,o.w5)((function(){return[r]})),_:1})]})),_:1}),(0,o.Wm)(k,null,{default:(0,o.w5)((function(){return[(0,o.Wm)(m,null,{default:(0,o.w5)((function(){return[(0,o.Wm)(d,{color:"dark"},{default:(0,o.w5)((function(){return[(0,o.Wm)(s,{scope:"col"},{default:(0,o.w5)((function(){return[(0,o.Uk)("#")]})),_:1}),(0,o.Wm)(s,{scope:"col"},{default:(0,o.w5)((function(){return[(0,o.Uk)("Message")]})),_:1}),(0,o.Wm)(s,{scope:"col"},{default:(0,o.w5)((function(){return[(0,o.Uk)("Owner")]})),_:1}),(0,o.Wm)(s,{scope:"col"},{default:(0,o.w5)((function(){return[(0,o.Uk)("Date")]})),_:1})]})),_:1})]})),_:1}),(0,o.Wm)(g,null,{default:(0,o.w5)((function(){return[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(c.format_date_notification,(function(t,n){return(0,o.wg)(),(0,o.j4)(d,{key:n,color:i.colors[t.type-1]},{default:(0,o.w5)((function(){return[(0,o.Wm)(s,{scope:"row"},{default:(0,o.w5)((function(){return[(0,o.Uk)((0,u.zw)(n+1),1)]})),_:2},1024),(0,o.Wm)(w,null,{default:(0,o.w5)((function(){return[(0,o.Wm)(_,{icon:i.icons[t.type-1],size:"lg"},null,8,["icon"]),(0,o.Uk)(" "+(0,u.zw)(t.message),1)]})),_:2},1024),(0,o.Wm)(w,null,{default:(0,o.w5)((function(){return[(0,o.Uk)((0,u.zw)(t.name),1)]})),_:2},1024),(0,o.Wm)(w,null,{default:(0,o.w5)((function(){return[(0,o.Uk)((0,u.zw)(t.created_at),1)]})),_:2},1024)]})),_:2},1032,["color"])})),128)),i.more?((0,o.wg)(),(0,o.j4)(d,{key:0,color:"light"},{default:(0,o.w5)((function(){return[(0,o.Wm)(w,{colspan:"3",class:"text-center"},{default:(0,o.w5)((function(){return[(0,o.Wm)(p,{onClick:n[0]||(n[0]=function(t){return i.offset+=10}),color:"link",style:{"text-decoration":"none"}},{default:(0,o.w5)((function(){return[(0,o.Uk)(" Load more ")]})),_:1})]})),_:1})]})),_:1})):(0,o.kq)("",!0)]})),_:1})]})),_:1})]})),_:1})}var i=e(50124),c=e(48534),l=e(95082),f=(e(21249),e(83710),e(92222),e(52766)),s=e(44161);const d={data:function(){return{notifications:[],offset:0,more:!0,colors:["primary","secondary","danger"],icons:["cil-memory","cil-user","cil-warning","cil-laptop"]}},computed:{format_date_notification:function(){return this.notifications.map((function(t){return(0,l.Z)((0,l.Z)({},t),{},{created_at:new Date(t.created_at).toLocaleString("en-US",{month:"long",day:"numeric",hour:"numeric",minute:"numeric"})})}))}},watch:{offset:function(){this.getNotifications()}},methods:{getNotifications:function(){var t=this;return(0,c.Z)((0,i.Z)().mark((function n(){return(0,i.Z)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:s.Z.get(t.$store.state.API_URL+"/notifications?types=1,2,3&limit=11&offset="+t.offset,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((function(n){t.more=n.data.length>10,t.more&&n.data.pop(),t.notifications=t.notifications.concat(n.data)}))["catch"]((function(t){console.log(t)}));case 1:case"end":return n.stop()}}),n)})))()}},beforeMount:function(){(0,f.Z)()},mounted:function(){this.getNotifications()}};var m=e(40089);const _=(0,m.Z)(d,[["render",a]]),w=_}}]);
//# sourceMappingURL=560.de42e605.js.map