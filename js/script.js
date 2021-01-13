(()=>{"use strict";function e(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,c=void 0;try{for(var i,a=e[Symbol.iterator]();!(o=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,c=e}finally{try{o||null==a.return||a.return()}finally{if(r)throw c}}return n}}(e,n)||t(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){if(e){if("string"==typeof e)return n(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?n(e,t):void 0}}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var r=function(){var n=document.querySelector(".upload-overlay"),r=document.querySelector(".image-preview"),c=document.querySelector(".upload-file"),i=document.querySelector(".button__reset"),a=document.querySelector(".form-input"),s=document.querySelector(".button__post"),u=document.querySelector(".upload-submit"),l=document.querySelector(".input__user-comment"),d=document.querySelector(".input__user-name"),f=0,m=0,v=0,h="",p=document.querySelector('[type="file"]'),y=document.querySelector(".icon-hueRotate"),g=document.querySelector(".icon-sepia"),b=document.querySelector(".icon-blur"),L=document.querySelector(".hueRotate"),S=document.querySelector(".thumb-hueRotate"),k=document.querySelector(".blur"),E=document.querySelector(".thumb-blur"),q=document.querySelector(".sepia"),w=document.querySelector(".thumb-sepia"),x="\n    left: 0;\n    transition: all 0.7s ease;",T="",D=function(){function t(e,n,o,r,c,i,a,s){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=e,this.name=n,this.comment=o,this.filter=r,this.time=c,this.image_src=i,this.userLike=a,this.favorite=s}var n,r;return n=t,(r=[{key:"getTimeComment",value:function(){var e=Date.parse(new Date)-this.time,t=Math.floor(e/864e5),n=Math.floor(e/36e5),o=Math.floor(e/1e3/60),r=Math.floor(e/1e3);if(r<60)return this.time="".concat(r," секунд назад");if(o<60){if(1==o)return this.time="".concat(o," минута назад");if(o>1&&o<5)return this.time="".concat(o," минуты назад");if(o>=5)return this.time="".concat(o," минут назад")}else if(n<=23){if(1==n)return this.time="".concat(n," час назад");if(n>1&&n<5)return this.time="".concat(n," часа назад");if(n>=5)return this.time="".concat(n," часов назад")}else{if(1==t)return this.time="".concat(t," день назад");if(t>1&&t<5)return this.time="".concat(t," дня назад");if(t>=5)return this.time="".concat(t," дней назад")}}},{key:"render",value:function(){var t=this;this.elem||(this.elem=document.createElement("div"),this.elem.className="photo",document.querySelector(".photo-wrapper--dynamic").append(this.elem)),this.elem.innerHTML='\n            <img style="'.concat(this.filter,'" src="').concat(this.image_src,'">                \n            <div class="comment">\n                <p class="user-name">').concat(this.name,'<span class="comment__time"> (').concat(this.getTimeComment(),')</span></p>\n                <p class="comment__text">').concat(this.comment,'</p>\n                <div class="comment__like">\n                    <svg class="icon">\n                        <use xlink:href="sprite.svg#icon-heart"></use>\n                    </svg>Нравится: <input class="amount-like" type="text" value=').concat(this.userLike,' disabled>\n                </div>\n                <button class="deletePhoto" type="button" style="display: none">Удалить</button>\n                <label class="favorite"><input type="checkbox" ').concat(this.favorite,"><span></span></label>\n            </div>\n            "),this.elem.querySelector("img").addEventListener("click",(function(e){var t=document.querySelector(".big-image");t.classList.add("show-bigImg"),t.innerHTML='\n                <img src="'.concat(e.target.src,'">\n            '),t.addEventListener("click",(function(){t.classList.remove("show-bigImg")})),document.addEventListener("keydown",(function(e){"Escape"===e.code&&t.classList.contains("show-bigImg")&&t.classList.remove("show-bigImg")}))})),this.elem.querySelector("[type='checkbox']").addEventListener("click",(function(n){1==n.target.checked?n.target.value="checked":n.target.value="";var o={id:t.id,favorite:n.target.value},r=Object.entries(o).reduce((function(t,n){var o=e(n,2),r=o[0],c=o[1];return t.append(r,c),t}),new FormData);fetch("/backend/setFavorite.php",{method:"POST",body:r}).then((function(e){if(e.ok)return e.text();console.error("Что-то пошло не так"+e.status)})).then((function(e){"ok"==e?console.log("Успех"):console.log("Провал")}))})),this.elem.querySelector(".icon").addEventListener("click",(function(n){n.preventDefault();var o={id:t.id,userLike:++n.target.nextElementSibling.value},r=Object.entries(o).reduce((function(t,n){var o=e(n,2),r=o[0],c=o[1];return t.append(r,c),t}),new FormData);fetch("/backend/addLike.php",{method:"POST",body:r}).then((function(e){if(e.ok)return e.text();console.error("Что-то пошло не так"+e.status)})).then((function(e){"ok"==e?(document.querySelector(".modal-like").classList.add("show-modal--like"),setTimeout((function(){document.querySelector(".modal-like").classList.remove("show-modal--like")}),1e3)):console.log("Провал")}))})),this.elem.querySelector(".deletePhoto").addEventListener("click",(function(){t.deletePhoto()}))}},{key:"deletePhoto",value:function(){var e=this;return new Promise((function(t,n){confirm("Вы действительно хотите удалить фото? Это действие необратимо")&&fetch("/backend/deletePhoto_obr.php?id=".concat(e.id)).then((function(e){e.ok&&e.text()})).then((function(n){e.elem.classList.add("delete"),setTimeout((function(){e.elem.remove()}),1e3),t()}))})).then((function(){return $()}))}}])&&o(n.prototype,r),t}();p.addEventListener("change",(function(e){n.classList.remove("hidden");var t=p.files[0],o=t.name.toLowerCase();if(["gif","jpg","jpeg","png"].some((function(e){return o.endsWith(e)}))){var i=new FileReader;i.addEventListener("load",(function(){r.src=i.result})),i.readAsDataURL(t)}c.style.cssText="\n            display: none;\n        ",T=Date.parse(new Date)})),d.addEventListener("input",(function(){""!=d.value&&d.value.length>2?u.disabled=!1:u.disabled=!0})),u.addEventListener("click",(function(e){e.preventDefault(),document.querySelector(".preview").innerHTML='\n        <img src="'.concat(r.src,'" class="effect-image">\n        '),n.classList.add("hidden"),s.disabled=!1})),i.addEventListener("click",(function(e){e.preventDefault(),B(),j()})),document.querySelector(".upload-cancel").addEventListener("click",(function(){n.classList.add("hidden"),B()})),E.addEventListener("mousedown",(function(e){e.preventDefault(),function(){var e=document.querySelector(".effect-image");function t(t){t.preventDefault();var n=t.clientX,o=n-(n-t.clientX)-k.getBoundingClientRect().left,r=k.offsetWidth-E.offsetWidth;o<0&&(o=0),o>r&&(o=r),f=(100*o/300).toFixed()/5+"px",m=0,v=0,E.style.cssText="\n            transition: none;\n            left: ".concat(o,"px;\n        "),w.style.cssText=x,S.style.cssText=x,e.style.cssText="\n            filter: blur(".concat(f,");\n        ")}document.addEventListener("mousemove",t),document.addEventListener("mouseup",(function e(n){n.preventDefault(),document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",e)}))}()})),w.addEventListener("mousedown",(function(e){e.preventDefault(),function(){var e=document.querySelector(".effect-image");function t(t){t.preventDefault();var n=t.clientX,o=n-(n-t.clientX)-q.getBoundingClientRect().left,r=q.offsetWidth-w.offsetWidth;o<0&&(o=0),o>r&&(o=r),m=(100*o/(q.offsetWidth-14)).toFixed()+"%",f=0,v=0,w.style.cssText="\n            transition: none;\n            left: ".concat(o,"px;\n        "),S.style.cssText=x,E.style.cssText=x,e.style.cssText="\n            filter: sepia(".concat(m,");\n        ")}document.addEventListener("mousemove",t),document.addEventListener("mouseup",(function e(n){n.preventDefault(),document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",e)}))}()})),S.addEventListener("mousedown",(function(e){e.preventDefault(),function(){var e=document.querySelector(".effect-image");function t(t){t.preventDefault();var n=t.clientX,o=n-(n-t.clientX)-L.getBoundingClientRect().left,r=L.offsetWidth-S.offsetWidth;o<0&&(o=0),o>r&&(o=r),v=5*(100*o/300).toFixed()+"deg",m=0,f=0,S.style.cssText="\n            transition: none;\n            left: ".concat(o,"px;\n        "),w.style.cssText=x,E.style.cssText=x,e.style.cssText="\n        filter: hue-rotate(".concat(v,");\n    ")}document.addEventListener("mousemove",t),document.addEventListener("mouseup",(function e(n){n.preventDefault(),document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",e)}))}()}));var _=document.querySelectorAll(".icon-hueRotate, .icon-sepia, .icon-blur"),P=document.querySelectorAll(".mobail-filter-controls");function j(){document.querySelector(".effect-image").style="",O.value=0,C.value=0,H.value=0}_.forEach((function(e){e.addEventListener("click",(function(e){e.preventDefault();var t=e.currentTarget;switch(t){case y:case g:case b:_.forEach((function(e){e.classList.remove("tool--active")})),P.forEach((function(e){e.classList.remove("show")})),j(),function(e){e.classList.add("tool--active"),e.nextElementSibling.classList.add("show")}(t)}}))}));var A=document.querySelectorAll(".filter-button-inc"),M=document.querySelectorAll(".filter-button-dec");function I(e){e.previousElementSibling.value<100&&(e.previousElementSibling.value=+e.previousElementSibling.value+10)}function R(e){e.nextElementSibling.value>0&&(e.nextElementSibling.value-=10)}var O=document.querySelector(".hueRotate-controls-value"),C=document.querySelector(".sepia-controls-value"),H=document.querySelector(".blur-controls-value");function F(e){var t=O.value;v=3.6*t+"deg",m=0,f=0,e.style.cssText="\n                filter: hue-rotate(".concat(v,");\n            ")}function W(e){var t=C.value;m=t+"%",f=0,v=0,e.style.cssText="\n                filter: sepia(".concat(m,");\n            ")}function X(e){var t=H.value;f=t/8+"px",m=0,v=0,e.style.cssText="\n                    filter: blur(".concat(f,");\n                ")}function B(){p.value="",document.querySelector(".effect-image").src="img/photo-road-mobile@1x.jpg",document.querySelector(".effect-image").style="",s.disabled=!0,c.style.cssText="\n        display: flex;\n    ",r.src="plug.png",d.value="",l.value="",S.style.cssText=x,E.style.cssText=x,w.style.cssText=x}function U(){return new Promise((function(e,t){N.innerHTML="",e()})).then((function(){return $()}))}function z(e){return new Promise((function(n,o){var r,c=function(e,n){var o;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(o=t(e))){o&&(e=o);var r=0,c=function(){};return{s:c,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){o=e[Symbol.iterator]()},n:function(){var e=o.next();return a=e.done,e},e:function(e){s=!0,i=e},f:function(){try{a||null==o.return||o.return()}finally{if(s)throw i}}}}(e);try{for(c.s();!(r=c.n()).done;){var i=r.value;new D(i.id,i.name,i.comment,i.filter,i.time,i.image_src,i.userLike,i.favorite).render()}}catch(e){c.e(e)}finally{c.f()}Y(),n()})).then((function(){N.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})}))}A.forEach((function(e){e.addEventListener("click",(function(e){var t=e.target,n=document.querySelector(".effect-image");t.parentElement.classList.contains("mobail-hueRotate")?(I(t),F(n)):t.parentElement.classList.contains("mobail-sepia")?(I(t),W(n)):t.parentElement.classList.contains("mobail-blur")&&(I(t),X(n))}))})),M.forEach((function(e){e.addEventListener("click",(function(e){var t=e.target,n=document.querySelector(".effect-image");t.parentElement.classList.contains("mobail-hueRotate")?(R(t),F(n)):t.parentElement.classList.contains("mobail-sepia")?(R(t),W(n)):t.parentElement.classList.contains("mobail-blur")&&(R(t),X(n))}))})),a.addEventListener("submit",(function(t){t.preventDefault(),0!=f?h="filter: blur(".concat(f,")"):0!=m?h="filter: sepia(".concat(m,")"):0!=v&&(h="filter: hue-rotate(".concat(v,")"));var n=d.value.replace(/(\<(\/?[^>]+)>)/g,""),o=n.split("");o=o[0].toUpperCase()+n.slice(1);var c,i,a=l.value.replace(/(\<(\/?[^>]+)>)/g,""),s=new D(this.id,o,a,h,T,r.src,0,"");J=0,c=s,i=Object.entries(c).reduce((function(t,n){var o=e(n,2),r=o[0],c=o[1];return t.append(r,c),t}),new FormData),new Promise((function(e,t){fetch("/backend/addPhoto_obr.php",{method:"POST",body:i}).then((function(e){if(e.ok)return e.text();console.error("Что-то пошло не так"+e.status)})).then((function(t){var n,o;"ok"==t?((o=document.querySelector(".madal-success")).classList.add("show-modal--success"),setTimeout((function(){o.classList.remove("show-modal--success")}),3e3),e()):((n=document.querySelector(".madal-errore")).classList.add("show-modal--errore"),setTimeout((function(){n.classList.remove("show-modal--errore")}),3e3))}))})).then((function(){return U()})),B()})),window.addEventListener("resize",(function(e){window.innerWidth<1200&&B()}),!1);var N=document.querySelector(".photo-wrapper--dynamic"),V=0;function $(){return new Promise((function(e,t){fetch("/backend/getAllPhotos.php").then((function(e){if(e.ok)return e.json();console.error("Ошибка"+e.status)})).then((function(t){V=Math.ceil(t.length/12),e(V)}))})).then((function(e){return function(e){return new Promise((function(t,n){G.innerHTML="";for(var o=1;o<=e;o++)G.innerHTML+='\n            <a href="#"><span>'.concat(o,"</span></a>\n            ");t()})).then((function(){return e=G.querySelectorAll("a"),J?e[J].classList.add("link--active"):e[0].classList.add("link--active"),fetch("/backend/pagination.php/?page=".concat(J+1)).then((function(e){if(e.ok)return e.json();console.error("Ошибка"+e.status)})).then((function(e){N.innerHTML="",z(e)})),void e.forEach((function(e,t,n){e.addEventListener("click",(function(n){G.querySelectorAll("a").forEach((function(e){e.classList.remove("link--active")})),Y(),N.innerHTML="",n.preventDefault(),e.classList.add("link--active"),e.disabled=!0,J=t,console.log(J),fetch("/backend/pagination.php/?page=".concat(t+1)).then((function(e){if(e.ok)return e.json();console.error("Ошибка"+e.status)})).then((function(e){return z(e)}))}))}));var e}))}(e)}))}var G=document.querySelector(".gallery__pages"),J=0;U();var K=document.querySelector(".editor-gallery");K.addEventListener("click",(function(){fetch("/backend/pagination.php/?page=".concat(J+1)).then((function(e){if(e.ok)return e.json();console.error("Ошибка"+e.status)})).then((function(e){N.innerHTML="",z(e)})),K.disabled=!0,Z.disabled=!1,G.style.display="",document.querySelector(".aside-editor").style.display=""}));var Q=document.querySelector(".editor-button");function Y(){var e=document.querySelectorAll(".deletePhoto");"on"==localStorage.getItem("editor")?(Q.checked=!0,e.forEach((function(e){e.style.display="block"}))):e.forEach((function(e){e.style.display="none"}))}Q.addEventListener("input",(function(){Q.checked?Q.value="on":Q.value="off",localStorage.setItem("editor",Q.value),Y()}));var Z=document.querySelector(".editor-favorite");Z.addEventListener("click",(function(e){N.innerHTML="",fetch("/backend/getFavorite.php").then((function(e){if(e.ok)return e.json();console.error("Ошибка"+e.status)})).then((function(e){return z(e)})),K.disabled=!1,Z.disabled=!0,G.style.display="none",document.querySelector(".aside-editor").style.display="none",localStorage.setItem("editor","off"),Q.checked=!1,Y()}))};window.addEventListener("DOMContentLoaded",(function(){var e,t,n;e=document.querySelector(".main-nav"),t=document.querySelector(".main-nav__toggle"),n=document.querySelector(".page-header"),t.addEventListener("click",(function(){e.classList.toggle("main-nav--closed"),e.classList.toggle("main-nav--opened"),n.classList.toggle("back")})),r()}))})();