(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function r(r){return null!=r&&""!==r}function n(e){return Array.isArray(e)?e.map(n).filter(r).join(" "):e}var e={};return e.merge=function t(n,e){if(1===arguments.length){for(var a=n[0],s=1;s<n.length;s++)a=t(a,n[s]);return a}var i=n["class"],l=e["class"];(i||l)&&(i=i||[],l=l||[],Array.isArray(i)||(i=[i]),Array.isArray(l)||(l=[l]),n["class"]=i.concat(l).filter(r));for(var o in e)"class"!=o&&(n[o]=e[o]);return n},e.joinClasses=n,e.cls=function(r,t){for(var a=[],s=0;s<r.length;s++)a.push(t&&t[s]?e.escape(n([r[s]])):n(r[s]));var i=n(a);return i.length?' class="'+i+'"':""},e.attr=function(r,n,t,a){return"boolean"==typeof n||null==n?n?" "+(a?r:r+'="'+r+'"'):"":0==r.indexOf("data")&&"string"!=typeof n?" "+r+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'":t?" "+r+'="'+e.escape(n)+'"':" "+r+'="'+n+'"'},e.attrs=function(r,t){var a=[],s=Object.keys(r);if(s.length)for(var i=0;i<s.length;++i){var l=s[i],o=r[l];"class"==l?(o=n(o))&&a.push(" "+l+'="'+o+'"'):a.push(e.attr(l,o,!1,t))}return a.join("")},e.escape=function(r){var n=String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+r?r:n},e.rethrow=function a(r,n,e,t){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&n||t))throw r.message+=" on line "+e,r;try{t=t||require("fs").readFileSync(n,"utf8")}catch(s){a(r,null,e)}var i=3,l=t.split("\n"),o=Math.max(e-i,0),c=Math.min(l.length,e+i),i=l.slice(o,c).map(function(r,n){var t=n+o+1;return(t==e?"  > ":"    ")+t+"| "+r}).join("\n");throw r.path=n,r.message=(n||"Jade")+":"+e+"\n"+i+"\n\n"+r.message,r},e}();

    var templatizer = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><div class="navbar navbar-default"><div class="container"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#" class="navbar-brand">Vicarius</a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#Configuration">Configuration</a></li><li><a href="#Intercept">Intercept</a></li><li class="active"><a href="#History">History</a></li></ul></div></div></div><div class="container"><main role="page-container"></main></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/><head><title>#title</title><meta name="viewport" content="width=device-width"/><link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"/><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script><script type="text/javascript" src="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script><script src="http://listjs.com/no-cdn/list.js"></script><link rel="stylesheet" href="/public/css/prism.css"/></head>';
    };

    // includes/httpExchangeItem.jade compiled template
    templatizer["includes"]["httpExchangeItem"] = function tmpl_includes_httpExchangeItem() {
        return '<li class="httpExchangeElement list-group-item"><p role="route" class="httpExchangeLabel route"></p><p role="method" class="httpExchangeLabel method"></p><p role="statusCode" class="httpExchangeLabel statusCode"></p><p role="responseLength" class="httpExchangeLabel responseLength"></p><p role="responseTime" class="httpExchangeLabel responseTime"></p></li>';
    };

    // includes/httpExchangeSelectionDetails.jade compiled template
    templatizer["includes"]["httpExchangeSelectionDetails"] = function tmpl_includes_httpExchangeSelectionDetails() {
        return '<div class="container"><div role="selectionTabs" class="container"><ul class="nav navbar-nav"><li class="active rawTab"><a href="#">Raw</a></li><li class="active bodyTab"><a href="#">Body</a></li><li class="active renderTab"><a href="#">Render</a></li><li class="active repeatTab"><a href="#">Repeat</a></li><li class="active fuzzTab"><a href="#">Fuzz</a></li></ul></div><div class="container"><div role="selectionViewPort" class="div selectionViewPort"><pre class="language-js"><code role="dataViewer" style="overflow: auto; overflow-x: hidden; height: 95%;" class="language-js"></code></pre></div></div></div>';
    };

    // pages/history.jade compiled template
    templatizer["pages"]["history"] = function tmpl_pages_history() {
        return '<section id="displaySelection" class="page history"><div id="historyLabels" class="container"><input type="text" class="fuzzy-search"/><ul id="httpExchangeList" role="httpExchangeList" style="width: 100%; height: 300px; overflow: auto" class="httpExchangeList list"></ul><hr/></div><div role="selectionDetailsView" id="selectionDetailsView" class="selectionDetailsView container"></div></section>';
    };

    return templatizer;
}));