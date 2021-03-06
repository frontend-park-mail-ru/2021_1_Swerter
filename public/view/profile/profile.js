function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function profile(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (date, imgAvatar, imgContent, postCreator, postData, textPost) {pug_html = pug_html + "\u003C!--style--\u003E\u003C!--    include header.css--\u003E\u003Cdiv class=\"header\"\u003E\u003Cdiv class=\"section-h-1\"\u003E\u003Cdiv class=\"logo-container\"\u003E\u003Cimg class=\"logo\" src=\".\u002Fassets\u002FimgLogo.jpg\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"search\"\u003E\u003Ci class=\"fas fa-search\" style=\"color:#6B717A\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"section-h-2\"\u003E\u003Cdiv class=\"menu\"\u003E\u003Cdiv class=\"menu-item home\"\u003E\u003Ci class=\"fas fa-home fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"menu-item friends\"\u003E\u003Ci class=\"fas fa-users fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"menu-item news \"\u003E\u003Ci class=\"fas fa-newspaper fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"section-h-3\"\u003E\u003Cdiv class=\"widget plus\"\u003E\u003Ci class=\"far fa-plus-square fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"widget notify\"\u003E\u003Ci class=\"far fa-bell fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"widget account\"\u003E\u003Cimg class=\"img-profile\" src=\".\u002Fassets\u002FimgUser.jpg\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"widget register\"\u003E\u003Ci class=\"fas fa-sign-in-alt fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"profile-header-content\"\u003E\u003Cdiv class=\"header-content\"\u003E\u003Cimg class=\"background-img\" src=\".\u002Fassets\u002FimgContent.jpg\"\u002F\u003E\u003Cdiv class=\"ava-img\"\u003E\u003Cimg class=\"ava\" src=\".\u002Fassets\u002FimgUser.jpg\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"profile-info\"\u003E\u003Cdiv class=\"profile-info-content\"\u003E\u003Ch1\u003EDmitry\nAkzhigitov\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn-edit-profile\"\u003EEdit\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["post"] = pug_interp = function(postData){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cdiv class=\"post\"\u003E\u003Cdiv class=\"postHeader\"\u003E\u003Cimg" + (" class=\"avatarInPost\""+pug_attr("src", imgAvatar, true, false)) + "\u002F\u003E\u003Cdiv class=\"postInfo\"\u003E\u003Cspan class=\"postCreator\"\u003E" + (pug_escape(null == (pug_interp = postCreator) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan clss=\"date\"\u003E" + (pug_escape(null == (pug_interp = date) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"postContent\"\u003E\u003Cimg" + (" class=\"contentImg\""+pug_attr("src", imgContent, true, false)) + "\u002F\u003E\u003Cp class=\"contentText\"\u003E" + (pug_escape(null == (pug_interp = textPost) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"postFooter\"\u003E\u003Cdiv class=\"postAction\"\u003E\u003Ca\u003E\u003Cimg src=\".\u002Fassets\u002Flike.png\"\u002F\u003E\u003C\u002Fa\u003E\u003Ca\u003E\u003Cimg src=\".\u002Fassets\u002Fcomment.png\"\u002F\u003E\u003C\u002Fa\u003E\u003Ca\u003E\u003Cimg src=\".\u002Fassets\u002Freposticon.png\"\u002F\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Cdiv class=\"profile-content\"\u003E\u003Cdiv class=\"left-content\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"right-content\"\u003E\u003Cdiv class=\"lenta\"\u003E";
pug_mixins["post"](postData);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"date" in locals_for_with?locals_for_with.date:typeof date!=="undefined"?date:undefined,"imgAvatar" in locals_for_with?locals_for_with.imgAvatar:typeof imgAvatar!=="undefined"?imgAvatar:undefined,"imgContent" in locals_for_with?locals_for_with.imgContent:typeof imgContent!=="undefined"?imgContent:undefined,"postCreator" in locals_for_with?locals_for_with.postCreator:typeof postCreator!=="undefined"?postCreator:undefined,"postData" in locals_for_with?locals_for_with.postData:typeof postData!=="undefined"?postData:undefined,"textPost" in locals_for_with?locals_for_with.textPost:typeof textPost!=="undefined"?textPost:undefined));;return pug_html;}