(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,t){e.exports=t(40)},38:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(11),o=t.n(c),u=t(12),i=t(2),l=function(e){var n=e.person,t=e.deleteEntry;return r.a.createElement("li",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:t},"poista"))},m=function(e){var n=e.modifySearch,t=e.search;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4",r.a.createElement("input",{value:t,onChange:n}))))},f=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,c=e.newNumber,o=e.handleNumberChange;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"nimi:",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:c,onChange:o})),r.a.createElement("button",{type:"submit"},"tallenna")))},s=t(3),d=t.n(s),h="/api/persons",p=function(){return d.a.get(h).then(function(e){return e.data})},b=function(e){return d.a.post(h,e).then(function(e){return e.data})},v=function(e,n){return d.a.put("".concat(h,"/").concat(e),n).then(function(e){return e.data})},E=function(e){return d.a.delete("".concat(h,"/").concat(e.id)).then(function(e){return e.data})},g=function(){var e=Object(a.useState)([{name:"Arto Hellas"}]),n=Object(i.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),s=Object(i.a)(o,2),d=s[0],h=s[1],g=Object(a.useState)(""),j=Object(i.a)(g,2),w=j[0],O=j[1],k=Object(a.useState)(""),S=Object(i.a)(k,2),y=S[0],N=S[1],C=Object(a.useState)(""),P=Object(i.a)(C,2),J=P[0],L=P[1],T=Object(a.useState)(""),x=Object(i.a)(T,2),A=x[0],B=x[1],D=function(e){L(e),setTimeout(function(){L(null)},4e3)},H=function(e){B(e),setTimeout(function(){B(null)},4e3)};Object(a.useEffect)(function(){console.log("effect"),p().then(function(e){c(e)})},[]);var I=t.filter(function(e){return e.name.toLowerCase().includes(d.toLowerCase())});return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement("span",{className:"error"}," ",A),r.a.createElement("span",{className:"notification"},J),r.a.createElement(m,{search:d,modifySearch:function(e){h(e.target.value)}}),r.a.createElement(f,{addPerson:function(e){if(e.preventDefault(),t.filter(function(e){return e.name===w}).length>0){var n=t.find(function(e){return e.name===w});if(window.confirm("henkil\xf6 ".concat(w," on jo luettelossa haluatko p\xe4ivitt\xe4\xe4 numeron?"))){var a={name:w,number:y};v(n.id,a).then(function(e){var n=Object(u.a)(t);n.forEach(function(n){return n.id===e.id?n.number=e.number:0}),c(n),O(""),N(""),D("henkil\xf6n ".concat(w," puhelinnumero p\xe4ivitetty"))}).catch(function(e){console.log(e),H("".concat(e.response.data.error))})}else D("henkil\xf6n ".concat(w," puhelinnumeroa ei p\xe4ivitetty"))}else b({name:w,number:y}).then(function(e){c(t.concat(e)),O(""),N(""),D("henkil\xf6 ".concat(w," lis\xe4tty"))}).catch(function(e){H("".concat(e.response.data.error))})},newName:w,newNumber:y,handleNameChange:function(e){O(e.target.value)},handleNumberChange:function(e){N(e.target.value)}}),r.a.createElement("h2",null,"Numerot"),r.a.createElement("ul",null,I.map(function(e){return r.a.createElement(l,{key:e.name,person:e,deleteEntry:function(){return function(e){var n=t.find(function(n){return n.id===e});window.confirm("Poistetaanko ".concat(n.name,"?"))&&(E(n).then(function(e){D("henkil\xf6 ".concat(n.name," poistettiin"))}).catch(function(e){H("henkil\xf6 '".concat(n.name,"' on jo valitettavasti poistettu palvelimelta"))}),c(t.filter(function(e){return e.id.toString()!==n.id.toString()})))}(e.id)}})})))};t(38);o.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[13,2,1]]]);
//# sourceMappingURL=main.76402e3a.chunk.js.map