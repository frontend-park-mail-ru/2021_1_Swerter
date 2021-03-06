function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function newsFeed(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (postsData) {pug_html = pug_html + "\u003Cstyle\u003E.news-feed {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-image: url(.\u002Fassets\u002Fbackground.jpg);\n    background-repeat: no-repeat ;\n    background-attachment: fixed\n}\n\n.wrap-post {\n    margin-top: 40px;\n}\u003C\u002Fstyle\u003E";
pug_mixins["post"] = pug_interp = function(data){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cdiv class=\"wrap-post\"\u003E\u003Cstyle\u003E.post {\n    display: flex;\n    width: 690px;\n    border-radius: 38px;\n    flex-direction: column;\n    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);\n    background-color: #F1F2F6;\n}\n\n.post-header {\n    height: 74px;\n    background-color: #F1F2F6;\n    border-radius: 10px;\n    display: flex;\n    justify-content: flex-start;\n    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);\n}\n\n.avatar-in-post{\n    width: 50px;\n    height: 50px;\n    border-radius: 100px;\n    box-shadow: 0 0 7px #666;\n    margin-left: 49px;\n    margin-top: 12px;\n}\n\n.post-info {\n    margin-left: 32px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n    align-items: end;\n}\n\n.post-creator {\n    font-family: Roboto;\n    font-weight: bold;\n    font-size: 16px;\n}\n\n.date {\n    font-family: Roboto;\n    font-weight: lighter;\n    font-size: 12px;\n}\n\n.post-content {\n    display: flex;\n    flex-direction: column;\n    margin-top: 27px;\n    background-color: #FFFFFF ;\n}\n\n.content-text {\n    display: block;\n    margin: 17px 13px;\n}\n\n.post-footer {\n    height: 49px;\n    border-radius: 10px;\n}\n\n.post-action {\n    width: 230px;\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n}\n\n.single-action:hover {\n    cursor: pointer\n}\n\n.content-img {\n    height: 300px;\n}\n\n\u003C\u002Fstyle\u003E\u003Cdiv class=\"post\"\u003E\u003Cdiv class=\"post-header\"\u003E\u003Cimg" + (" class=\"avatar-in-post\""+pug_attr("src", data.imgAvatar, true, false)) + "\u002F\u003E\u003Cdiv class=\"post-info\"\u003E\u003Cspan class=\"post-creator\"\u003E" + (pug_escape(null == (pug_interp = data.postCreator) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan clss=\"date\"\u003E" + (pug_escape(null == (pug_interp = data.date) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"post-content\"\u003E";
if (data.imgContent) {
pug_html = pug_html + "\u003Cimg" + (" class=\"content-img\""+pug_attr("src", data.imgContent, true, false)) + "\u002F\u003E";
}
if (data.textPost) {
pug_html = pug_html + "\u003Cp class=\"content-text\"\u003E" + (pug_escape(null == (pug_interp = data.textPost) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"post-footer\"\u003E\u003Cdiv class=\"post-action\"\u003E\u003Ca class=\"single-action\"\u003E\u003Cimg src=\".\u002Fassets\u002Flike.png\"\u002F\u003E\u003C\u002Fa\u003E\u003Ca class=\"single-action\"\u003E\u003Cimg src=\".\u002Fassets\u002Fcomment.png\"\u002F\u003E\u003C\u002Fa\u003E\u003Ca class=\"single-action\"\u003E\u003Cimg src=\".\u002Fassets\u002Freposticon.png\"\u002F\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Cdiv class=\"news-feed\"\u003E";
// iterate postsData
;(function(){
  var $$obj = postsData;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var postData = $$obj[pug_index0];
pug_mixins["post"](postData);
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var postData = $$obj[pug_index0];
pug_mixins["post"](postData);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";}.call(this,"postsData" in locals_for_with?locals_for_with.postsData:typeof postsData!=="undefined"?postsData:undefined));;return pug_html;}