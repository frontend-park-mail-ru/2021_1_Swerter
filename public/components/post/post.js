function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function post(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (data) {pug_html = pug_html + "\u003Cstyle\u003E.post {\n    display: flex;\n    width: 690px;\n    border-radius: 38px;\n    flex-direction: column;\n    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);\n    background-color: #F1F2F6;\n}\n\n.postHeader {\n    height: 74px;\n    background-color: #F1F2F6;\n    border-radius: 10px;\n    display: flex;\n    justify-content: flex-start;\n    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);\n}\n\n.avatarInPost{\n    width: 50px;\n    height: 50px;\n    border-radius: 100px;\n    box-shadow: 0 0 7px #666;\n    margin-left: 49px;\n    margin-top: 12px;\n}\n\n.postInfo {\n    margin-left: 32px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n    align-items: end;\n}\n\n.postCreator {\n    font-family: Roboto;\n    font-weight: bold;\n    font-size: 16px;\n}\n\n.date {\n    font-family: Roboto;\n    font-weight: lighter;\n    font-size: 12px;\n}\n\n.postContent {\n    display: flex;\n    flex-direction: column;\n    margin-top: 27px;\n    background-color: #FFFFFF ;\n}\n\n.contentText {\n    display: block;\n    margin: 17px 13px;\n}\n\n.postFooter {\n    height: 49px;\n    border-radius: 10px;\n}\n\n.postAction {\n    width: 230px;\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n}\n\n.singleAction:hover {\n    cursor: pointer\n}\n\n.contentImg {\n    height: 300px;\n}\n\n\u003C\u002Fstyle\u003E\u003Cdiv class=\"post\"\u003E\u003Cdiv class=\"postHeader\"\u003E\u003Cimg" + (" class=\"avatarInPost\""+pug_attr("src", data.imgAvatar, true, false)) + "\u002F\u003E\u003Cdiv class=\"postInfo\"\u003E\u003Cspan class=\"postCreator\"\u003E" + (pug_escape(null == (pug_interp = data.postCreator) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan clss=\"date\"\u003E" + (pug_escape(null == (pug_interp = data.date) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"postContent\"\u003E";
if (data.imgContent) {
pug_html = pug_html + "\u003Cimg" + (" class=\"contentImg\""+pug_attr("src", data.imgContent, true, false)) + "\u002F\u003E";
}
if (data.textPost) {
pug_html = pug_html + "\u003Cp class=\"contentText\"\u003E" + (pug_escape(null == (pug_interp = data.textPost) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"postFooter\"\u003E\u003Cdiv class=\"postAction\"\u003E\u003Ca class=\"singleAction\"\u003E\u003Cimg src=\".\u002Fassets\u002Flike.png\"\u002F\u003E\u003C\u002Fa\u003E\u003Ca class=\"singleAction\"\u003E\u003Cimg src=\".\u002Fassets\u002Fcomment.png\"\u002F\u003E\u003C\u002Fa\u003E\u003Ca class=\"singleAction\"\u003E\u003Cimg src=\".\u002Fassets\u002Freposticon.png\"\u002F\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return pug_html;}