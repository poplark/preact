(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){"use strict";n.r(t);n(1),n(7);var l=n(0);var r=n(3),i=n(4),o=Object(r.a)(function e(t,n){Object(i.a)(this,e),this.type=null,this.props=null,this.parent=null,this.child=null,this.sibling=null,this.dom=null,this.alternate=null,this.type=t.type,this.props=t.props,this.parent=n});var c=null,a=null,u=[],d=null;function p(e){if(e)switch(e.effectTag){case"UPDATE":!function(e){var t=e.dom,n=e.props;Object.keys(n).filter(function(e){return"children"!==e}).forEach(function(e){t[e]=n[e]})}(e),p(e.child),p(e.sibling);break;case"ADD":e.parent.dom.appendChild(e.dom),p(e.child),p(e.sibling);break;case"DELETE":e.parent.dom.removeChild(e.dom)}}function s(e){for(var t=!1;d&&!t;)d=h(d),e.timeRemaining()<1&&(t=!0),!d&&c&&(u.forEach(p),p(c.child),a=c,u=[],c=null);requestIdleCallback(s)}function h(e){if(e.dom||(e.dom=function(e){var t;return t="TEXT_ELEMENT"===e.type?document.createTextNode(""):document.createElement(e.type),Object.keys(e.props).filter(function(e){return"children"!==e}).forEach(function(n){t[n]=e.props[n]}),t}(e)),function(e,t){for(var n=0,l=e.alternate&&e.alternate.child,r=null;l||n<t.length;){var i=t[n],c=null,a=l&&i&&i.type===l.type;a&&((c=new o(i,e)).alternate=l,c.dom=l.dom,c.effectTag="UPDATE"),i&&!a&&((c=new o(i,e)).alternate=null,c.effectTag="ADD"),l&&!a&&(l.effectTag="DELETE",u.push(l)),0===n&&(e.child=c),r&&(r.sibling=c),r=c,l&&(l=l.sibling),n++}}(e,e.props.children),e.child)return e.child;for(var t=e;t;){if(t.sibling)return t.sibling;t=t.parent}}var f={createElement:function(e,t){if(n=e,Object.prototype.toString.call(n).indexOf("Function")>=0)return function(e){return e.prototype.constructor===e}(e)?new e(t):e(t);for(var n,r=arguments.length,i=new Array(r>2?r-2:0),o=2;o<r;o++)i[o-2]=arguments[o];return{type:e,props:Object(l.a)(Object(l.a)({},t),{},{children:i.map(function(e){return"object"===typeof e?e:{type:"TEXT_ELEMENT",props:{nodeValue:e,children:[]}}})})}},render:function(e,t){(c=new o({type:"Root",props:{children:[e]}},null)).dom=t,c.alternate=a,d=c,requestIdleCallback(s)}},m=f.createElement("div",null,f.createElement("h1",null,"title"),f.createElement("p",{id:"1"},f.createElement("h3",null,"body1"),f.createElement("h3",null,"body2"),f.createElement("h3",null,"body3"))),E=f.createElement("div",null,f.createElement("h1",null,"title"),f.createElement("p",{id:"2"},f.createElement("h4",null,"body4"),f.createElement("h3",null,"body5")));f.render(m,document.getElementById("root")),setTimeout(function(){f.render(E,document.getElementById("root"))},5e3)},5:function(e,t,n){e.exports=n(12)}},[[5,1,2]]]);
//# sourceMappingURL=main.d5913c95.chunk.js.map