"use strict";(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[678],{52766:(t,n,e)=>{e.d(n,{Z:()=>u});e(57658);var a=e(97993),r=function(){localStorage.getItem("token")||a.Z.push({name:"Login"})};const u=r},13678:(t,n,e)=>{e.r(n),e.d(n,{default:()=>k});e(68309),e(74916),e(64765),e(26699),e(32023);var a=e(73396),r=e(87139),u=function(t){return(0,a.dD)("data-v-71a7815e"),t=t(),(0,a.Cn)(),t},o=u((function(){return(0,a._)("h1",null,"Contacts",-1)})),c={class:"mb-0"},s={class:"mb-0"},i={class:"user_avatar"},l={class:"user_info"};function d(t,n,e,u,d,f){var m=(0,a.up)("CCol"),_=(0,a.up)("CRow"),w=(0,a.up)("CIcon"),h=(0,a.up)("CButton"),p=(0,a.up)("CContainerFluid"),g=(0,a.up)("CListGroupItem"),k=(0,a.up)("CListGroup"),C=(0,a.up)("CFormInput"),v=(0,a.up)("CInputGroupText"),W=(0,a.up)("CInputGroup"),x=(0,a.up)("CCardHeader"),Z=(0,a.up)("CCardText"),y=(0,a.up)("CCardTitle"),I=(0,a.up)("CCardBody"),b=(0,a.up)("CCard"),U=(0,a.up)("CContainer"),z=(0,a.up)("CToastHeader"),A=(0,a.up)("CToastBody"),B=(0,a.up)("CToast"),L=(0,a.up)("CToaster");return(0,a.wg)(),(0,a.iD)("div",null,[o,(0,a.Wm)(U,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(_,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(m,{xs:"12",md:"4"},{default:(0,a.w5)((function(){return[(0,a.Wm)(k,null,{default:(0,a.w5)((function(){return[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(f.sorted_contacts,(function(t){return(0,a.wg)(),(0,a.j4)(g,{key:t.id},{default:(0,a.w5)((function(){return[(0,a.Wm)(p,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(_,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(m,{md:"10",xs:"8",class:"d-flex align-items-center justify-content-start",height:"100%"},{default:(0,a.w5)((function(){return[(0,a.Wm)(_,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(m,null,{default:(0,a.w5)((function(){return[(0,a._)("h5",c,(0,r.zw)(t.name),1),(0,a._)("p",s,"@"+(0,r.zw)(t.username),1)]})),_:2},1024)]})),_:2},1024)]})),_:2},1024),(0,a.Wm)(m,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(h,{class:"float-end",color:"primary",size:"sm",onClick:function(n){return f.remove_contact(t.id)}},{default:(0,a.w5)((function(){return[(0,a.Wm)(w,{name:"cil-trash",class:"text-white"})]})),_:2},1032,["onClick"])]})),_:2},1024)]})),_:2},1024)]})),_:2},1024)]})),_:2},1024)})),128))]})),_:1})]})),_:1}),(0,a.Wm)(m,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(b,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(x,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(W,{class:"mb-3"},{default:(0,a.w5)((function(){return[(0,a.Wm)(C,{placeholder:"Enter a username or email of your emergency contact","aria-label":"Recipient's username","aria-describedby":"basic-addon2",type:"search",modelValue:d.search_text,"onUpdate:modelValue":n[0]||(n[0]=function(t){return d.search_text=t})},null,8,["modelValue"]),(0,a.Wm)(v,{id:"basic-addon2"},{default:(0,a.w5)((function(){return[(0,a.Wm)(h,{onClick:f.search},{default:(0,a.w5)((function(){return[(0,a.Wm)(w,{name:"cil-magnifying-glass"})]})),_:1},8,["onClick"])]})),_:1})]})),_:1})]})),_:1}),d.found_contact?((0,a.wg)(),(0,a.j4)(I,{key:0,class:"user_card"},{default:(0,a.w5)((function(){return[(0,a._)("div",i,[(0,a.Wm)(Z,null,{default:(0,a.w5)((function(){return[(0,a.Uk)("@"+(0,r.zw)(d.found_contact.username),1)]})),_:1})]),(0,a._)("div",l,[(0,a.Wm)(y,null,{default:(0,a.w5)((function(){return[(0,a.Uk)((0,r.zw)(d.found_contact.name),1)]})),_:1}),f.contacts_usernames.includes(d.found_contact.username)||d.found_contact.id===d.user_id?(0,a.kq)("",!0):((0,a.wg)(),(0,a.j4)(h,{key:0,color:"primary",class:"text-white",onClick:n[1]||(n[1]=function(t){return f.add_contact(d.found_contact.id)})},{default:(0,a.w5)((function(){return[(0,a.Uk)("Add to contacts ")]})),_:1}))])]})),_:1})):d.contact_not_found?((0,a.wg)(),(0,a.j4)(I,{key:1},{default:(0,a.w5)((function(){return[(0,a.Wm)(y,null,{default:(0,a.w5)((function(){return[(0,a.Uk)("Contact not found")]})),_:1}),(0,a.Wm)(Z,null,{default:(0,a.w5)((function(){return[(0,a.Uk)("Try searching again")]})),_:1})]})),_:1})):((0,a.wg)(),(0,a.j4)(I,{key:2},{default:(0,a.w5)((function(){return[(0,a.Wm)(y,null,{default:(0,a.w5)((function(){return[(0,a.Uk)("Search a new contact")]})),_:1}),(0,a.Wm)(Z,null,{default:(0,a.w5)((function(){return[(0,a.Uk)("You can add them to your emergency contacts so they will be notified when any of your nodes detect a harmful situation, you can add a total of 10 contacts")]})),_:1})]})),_:1}))]})),_:1})]})),_:1})]})),_:1})]})),_:1}),d.toast.show?((0,a.wg)(),(0,a.j4)(L,{key:0,style:{position:"absolute",bottom:"5px",right:"5px","z-index":"9999"}},{default:(0,a.w5)((function(){return[(0,a.Wm)(B,{show:d.toast.show,autohide:"true",fade:"true",onHide:n[2]||(n[2]=function(t){return d.toast.show=!1})},{default:(0,a.w5)((function(){return[(0,a.Wm)(z,null,{default:(0,a.w5)((function(){return[(0,a.Wm)(w,{name:"cil-check-circle",class:"me-2"}),(0,a.Uk)(" Error ")]})),_:1}),(0,a.Wm)(A,null,{default:(0,a.w5)((function(){return[(0,a.Uk)((0,r.zw)(d.toast.message),1)]})),_:1})]})),_:1},8,["show"])]})),_:1})):(0,a.kq)("",!0)])}var f=e(50124),m=e(48534),_=(e(92222),e(57327),e(41539),e(57658),e(21249),e(2707),e(52766)),w=e(44161);const h={name:"Contacts",data:function(){return{search_text:"",user_id:null,found_contact:null,contact_not_found:!1,contacts:[],toast:{show:!1,message:""}}},methods:{search:function(){var t=this;return(0,m.Z)((0,f.Z)().mark((function n(){var e;return(0,f.Z)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,w.Z.get("".concat(t.$store.state.API_URL,"/users/"),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))},params:{search:t.search_text}});case 3:e=n.sent,t.found_contact=e.data,n.next=11;break;case 7:n.prev=7,n.t0=n["catch"](0),t.contact_not_found=!0,t.toast={show:!0,message:"Contact not found",color:"danger"};case 11:case"end":return n.stop()}}),n,null,[[0,7]])})))()},remove_contact:function(t){var n=this;return(0,m.Z)((0,f.Z)().mark((function e(){return(0,f.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.Z["delete"]("".concat(n.$store.state.API_URL,"/contacts/").concat(t),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}});case 3:n.contacts=n.contacts.filter((function(n){return n.id!==t})),e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),n.toast={show:!0,message:"Error removing contact"};case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))()},add_contact:function(t){var n=this;return(0,m.Z)((0,f.Z)().mark((function e(){var a;return(0,f.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.Z.post("".concat(n.$store.state.API_URL,"/contacts/").concat(t),null,{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}});case 3:return e.next=5,w.Z.get("".concat(n.$store.state.API_URL,"/users/"),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))},params:{id:t}});case 5:a=e.sent,n.contacts.push(a.data),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),n.toast={show:!0,message:"Error adding contact"};case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()}},computed:{contacts_usernames:function(){return this.contacts.map((function(t){return t.username}))},sorted_contacts:function(){return this.contacts.sort((function(t,n){return t.name.localeCompare(n.name)}))}},watch:{search_text:function(){this.found_contact=null,this.contact_not_found=!1}},beforeMount:function(){var t=this;return(0,m.Z)((0,f.Z)().mark((function n(){var e;return(0,f.Z)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return(0,_.Z)(),n.next=3,w.Z.get("".concat(t.$store.state.API_URL,"/users/"),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}});case 3:e=n.sent,t.user_id=e.data.id;case 5:case"end":return n.stop()}}),n)})))()},mounted:function(){var t=this;return(0,m.Z)((0,f.Z)().mark((function n(){var e;return(0,f.Z)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,w.Z.get("".concat(t.$store.state.API_URL,"/contacts/"),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}});case 2:e=n.sent,t.contacts=e.data;case 4:case"end":return n.stop()}}),n)})))()}};var p=e(40089);const g=(0,p.Z)(h,[["render",d],["__scopeId","data-v-71a7815e"]]),k=g}}]);
//# sourceMappingURL=678.3f9fc7bc.js.map