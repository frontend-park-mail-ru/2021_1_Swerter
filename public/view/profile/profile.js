function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function profile(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (console, profileData) {pug_mixins["header"] = pug_interp = function(data){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003C!--style--\u003E\u003C!--    include header.css--\u003E\u003Cdiv class=\"header\"\u003E\u003Cdiv class=\"section-h-1\"\u003E\u003Cdiv class=\"logo-container\"\u003E\u003Cimg class=\"logo\" src=\".\u002Fassets\u002FimgLogo.jpg\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"search\"\u003E\u003Ci class=\"fas fa-search\" style=\"color:#6B717A\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"section-h-2\"\u003E\u003Cdiv class=\"menu\"\u003E\u003Cdiv class=\"menu-item home\"\u003E\u003Ci class=\"fas fa-home fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"menu-item friends\"\u003E\u003Ci class=\"fas fa-users fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"menu-item news \"\u003E\u003Ci class=\"fas fa-newspaper fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"section-h-3\"\u003E\u003Cdiv class=\"widget plus\"\u003E\u003Ci class=\"far fa-plus-square fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"widget notify\"\u003E\u003Ci class=\"far fa-bell fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"widget account\"\u003E";
console.log(data)
pug_html = pug_html + "\u003Cimg" + (" class=\"img-profile\""+pug_attr("src", data.imgAvatar, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"widget register\"\u003E\u003Ci class=\"fas fa-sign-in-alt fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["header"](profileData.userData);
pug_mixins["profileHeader"] = pug_interp = function(data){
var block = (this && this.block), attributes = (this && this.attributes) || {};
console.log(profileData.userData.imgAvatar)
pug_html = pug_html + "\u003Cdiv class=\"profile-header-content\"\u003E\u003Cdiv class=\"header-content\"\u003E\u003Cimg" + (" class=\"background-img\""+" id=\"bg\""+pug_attr("src", data.imgBg, true, false)) + "\u002F\u003E\u003Cdiv class=\"upload-bg-wr\"\u003E\u003Cdiv class=\"upload-bg\" onclick=\"profileHeader.uploadImg(&quot;bg&quot;)\"\u003E\u003Ci class=\"fas fa-camera fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"ava-img\"\u003E\u003Cdiv class=\"ava-wrapper\"\u003E\u003Cimg" + (" class=\"ava\""+" id=\"ava\""+pug_attr("src", data.imgAvatar, true, false)) + "\u002F\u003E\u003Cdiv class=\"upload-ava\" onclick=\"profileHeader.uploadImg(&quot;ava&quot;)\"\u003E\u003Ci class=\"fas fa-camera fa-2x\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"profile-info\"\u003E";
if (!data.modEdited) {
pug_html = pug_html + "\u003Cdiv class=\"profile-info-content\"\u003E\u003Ch1\u003E" + (pug_escape(null == (pug_interp = data.firstName) ? "" : pug_interp)) + "\n" + (pug_escape(null == (pug_interp = data.lastName) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003Cdiv class=\"btn-edit-profile\" id=\"btn-edit-profile\" onclick=\"profileHeader.profileEdit()\"\u003E\u003Cb\u003EEdit\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\u003Cdiv\u003E\u003Cform class=\"profile-editing\"\u003E\u003Clabel class=\"profile-edit-lbl\"\u003EFirstname:\u003Cinput class=\"edit-input\" id=\"input-firstname\"\u002F\u003E\u003C\u002Flabel\u003E\u003Clabel class=\"profile-edit-lbl\"\u003ELastname:\u003Cinput class=\"edit-input\" id=\"input-lastname\"\u002F\u003E\u003C\u002Flabel\u003E\u003Cinput class=\"btn-edit-submit-profile\" type=\"submit\" onclick=\"profileHeader.profileEditSubmit()\"\u002F\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
console.log(profileData)
pug_mixins["profileHeader"](profileData.userData);
pug_mixins["post"] = pug_interp = function(data){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cdiv class=\"post\"\u003E\u003Cdiv class=\"post-header\"\u003E\u003Cimg" + (" class=\"avatar-in-post\""+pug_attr("src", data.imgAvatar, true, false)) + "\u002F\u003E\u003Cdiv class=\"post-info\"\u003E\u003Cspan class=\"post-creator\"\u003E" + (pug_escape(null == (pug_interp = data.postCreator) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan clss=\"date\"\u003E" + (pug_escape(null == (pug_interp = data.date) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"post-content\"\u003E";
if (data.imgContent) {
pug_html = pug_html + "\u003Cimg" + (" class=\"content-img\""+pug_attr("src", data.imgContent, true, false)) + "\u002F\u003E";
}
if (data.textPost) {
pug_html = pug_html + "\u003Cp class=\"content-text\"\u003E" + (pug_escape(null == (pug_interp = data.textPost) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"post-footer\"\u003E\u003Cdiv class=\"post-action\"\u003E\u003Ca class=\"single-action\"\u003E\u003Cimg src=\".\u002Fassets\u002Flike.png\"\u002F\u003E\u003C\u002Fa\u003E\u003Ca class=\"single-action\"\u003E\u003Cimg src=\".\u002Fassets\u002Fcomment.png\"\u002F\u003E\u003C\u002Fa\u003E\u003Ca class=\"single-action\"\u003E\u003Cimg src=\".\u002Fassets\u002Freposticon.png\"\u002F\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Cdiv class=\"profile-content\"\u003E\u003Cdiv class=\"left-content-column\"\u003E\u003Cdiv class=\"left-content-1\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"left-content-2\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"right-content\"\u003E\u003Cdiv class=\"lenta\"\u003E";
// iterate profileData.postsData
;(function(){
  var $$obj = profileData.postsData;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var postData = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv class=\"post-profile-wrapper\"\u003E";
pug_mixins["post"](postData);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var postData = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv class=\"post-profile-wrapper\"\u003E";
pug_mixins["post"](postData);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"console" in locals_for_with?locals_for_with.console:typeof console!=="undefined"?console:undefined,"profileData" in locals_for_with?locals_for_with.profileData:typeof profileData!=="undefined"?profileData:undefined));;return pug_html;}