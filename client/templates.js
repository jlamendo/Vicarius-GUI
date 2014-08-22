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
        return '<body><div class="container"><div class="navbar navbar-default navLogo"><ul class="nav navbar-nav"><li><a href="#" data-autoHide="hide" id="navBarHideButton" onClick="window.toggleNavBar()" class="vicariusLogo"><span class="glyphicon glyphicon-chevron-right"></span></a></li></ul></div><div id="rootNavbar" class="navbar navbar-default navMenu"><ul class="nav navbar-nav"><li><a href="Configuration">Configuration</a></li><li><a href="IDE">IDE</a></li><li><a href="History">History</a></li></ul></div><li role="rootContainer" id="rootContainer" class="httpExchangeLabels list-group-item rootContainer"><p class="httpExchangeLabel referenceIdHeader">ID#</p><div class="vr"></div><p class="httpExchangeLabel hostHeader">Host</p><div class="vr"></div><p class="httpExchangeLabel routeHeader">Route</p><div class="vr"></div><p class="httpExchangeLabel methodHeader">Method</p><div class="vr"></div><p class="httpExchangeLabel statusCodeHeader">Status</p><div class="vr"></div><p class="httpExchangeLabel responseLengthHeader">Length</p><div class="vr"></div><p class="httpExchangeLabel responseTimeHeader">Time</p></li></div><div class="container"><main role="page-container" class="main"></main></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/><head><title>#title</title><meta name="viewport" content="width=device-width"/><link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"/></head>';
    };

    // includes/httpExchangeItem.jade compiled template
    templatizer["includes"]["httpExchangeItem"] = function tmpl_includes_httpExchangeItem() {
        return '<li role="rootContainer" class="httpExchangeElement list-group-item"><p role="referenceId" class="httpExchangeLabel referenceId"></p><div class="vr"></div><p role="host" class="httpExchangeLabel host"></p><div class="vr"></div><p role="route" class="httpExchangeLabel route"></p><div class="vr"></div><p role="method" class="httpExchangeLabel method"></p><div class="vr"></div><p role="statusCode" class="httpExchangeLabel statusCode"></p><div class="vr"></div><p role="responseLength" class="httpExchangeLabel responseLength"></p><div class="vr"></div><p role="responseTime" class="httpExchangeLabel responseTime"></p></li>';
    };

    // includes/httpExchangeLabels.jade compiled template
    templatizer["includes"]["httpExchangeLabels"] = function tmpl_includes_httpExchangeLabels() {
        return '<li role="rootContainer" class="httpExchangeElement list-group-item rootContainer"><p class="httpExchangeLabel hostHeader">Host</p><div class="vr"></div><p class="httpExchangeLabel routeHeader">Route</p><div class="vr"></div><p class="httpExchangeLabel methodHeader">Method</p><div class="vr"></div><p class="httpExchangeLabel statusCodeHeader">Status</p><div class="vr"></div><p class="httpExchangeLabel responseLengthHeader">Length</p><div class="vr"></div><p class="httpExchangeLabel responseTimeHeader">Time</p></li>';
    };

    // includes/httpExchangeSelectionDetails.jade compiled template
    templatizer["includes"]["httpExchangeSelectionDetails"] = function tmpl_includes_httpExchangeSelectionDetails() {
        return '<div class="container"><div role="selectionTabs" class="container detailsNav"><ul class="nav navbar-nav"><li class="active rawTab"><a href="#" class="coloredTab">Raw</a></li><li class="active bodyTab"><a href="#" class="coloredTab">Body</a></li><li class="active renderTab"><a href="#" class="coloredTab">Render</a></li></ul></div><div data-target="selectionDetailsView" role="resizeBar" class="resizeBar"></div><div class="container"><div role="selectionViewPort" id="selectionViewPort" class="div selectionViewPort"><pre class="requestViewer language-http"><code role="requestViewer" class="requestViewer language-http"></code></pre><pre class="responseViewer language-http"><code role="responseViewer" class="responseViewer language-http"></code></pre></div></div></div>';
    };

    // pages/IDE.jade compiled template
    templatizer["pages"]["IDE"] = function tmpl_pages_IDE() {
        return '<section class="page IDE"><object data="http://127.0.0.1:9085" class="IDE"><embed src="http://127.0.0.1:9085" class="IDE"/>Error: IDE is not running. Please start IDE and try again.</object></section>';
    };

    // pages/history.jade compiled template
    templatizer["pages"]["history"] = function tmpl_pages_history() {
        return '<section id="displaySelection" class="page history"><div id="historyLabels" class="container"><div class="div fill-height-or-more"><div id="listContainer" class="div listContainer"><ul id="httpExchangeList" role="httpExchangeList" class="httpExchangeList list"></ul></div></div><div role="selectionDetailsView" id="selectionDetailsView" class="selectionDetailsView container"></div></div></section>';
    };

    return templatizer;
}));