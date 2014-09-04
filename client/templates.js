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
    templatizer["forms"] = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><div class="container"><div class="navbar navbar-default navLogo"><ul class="nav navbar-nav"><li><a href="#" data-autoHide="hide" id="navBarHideButton" onClick="window.toggleNavBar()" class="vicariusLogo"><span class="glyphicon glyphicon-chevron-right"></span></a></li></ul></div><div id="rootNavbar" class="navbar navbar-default navMenu"><ul class="nav navbar-nav"><li><a href="Configuration" class="navItem">Configuration</a></li><li><a href="IDE" class="navItem">IDE</a></li><li><a href="History" class="navItem">History</a></li><li><div class="spacer">&nbsp;</div></li><li class="selectBox"><select data-style="btn-info btn-xs" data-show-icon="false" data-width="8.5em" class="selectpacker profiles"><option data-content="&lt;p class=\'hoverEditContainer\'&gt;&lt;input role=\'createProfileInput\' id=\'createProfileInput\' class=\'editInput dropDown\' type=\'text\' placeholder=\'Create\'&gt;&lt;span class=\'hoverEditChild dropDown\' id=\'selectedProfile\'&gt;&lt;i class=\'fa fa-plus\'&gt;&lt;/i&gt;&lt;/span&gt;&lt;/p&gt;"></option></select></li><li><div class="spacer">&nbsp;</div></li><li class="selectBox"><select data-style="btn-info btn-xs" data-show-icon="false" data-width="8.5em" class="selectpacker projects"><option data-content="&lt;p class=\'hoverEditContainer\'&gt;&lt;input role=\'createProjectInput\' id=\'createProjectInput\' class=\'editInput dropDown\' type=\'text\' placeholder=\'Create\'&gt;&lt;span class=\'hoverEditChild dropDown\' id=\'selectedProject\'&gt;&lt;i class=\'fa fa-plus\'&gt;&lt;/i&gt;&lt;/span&gt;&lt;/p&gt;"></option></select></li><li><div class="spacer">&nbsp;</div></li><li><button class="btn-info btn-xs refresh"><i id="refreshIcon" class="fa fa-refresh"></i></button><button class="btn-info btn-xs playPause"><i id="playPauseIcon" class="fa fa-pause"></i></button></li></ul></div><li role="rootContainer" id="rootContainer" class="httpExchangeLabels list-group-item rootContainer"><p class="httpExchangeLabel referenceIdHeader"><a href="" onclick="window.app.sortList.sort(\'referenceId\',{order: \'asc\'})" class="arrow-up"></a><a href="" onclick="window.app.sortList.sort(\'referenceId\',{order: \'desc\'})" class="arrow-down"></a><input type="text" placeholder="Filter" oninput="window.app.sortList.fuzzySearch.search(this.value, [\'referenceId\']);" class="editInput"/><a class="editLabel hoverEditChild sortLabel">ID#</a></p><div class="vr"></div><p class="httpExchangeLabel hostHeader"><a href="" onclick="window.app.sortList.sort(\'host\',{order: \'asc\'})" class="arrow-up"></a><a href="" onclick="window.app.sortList.sort(\'host\',{order: \'desc\'})" class="arrow-down"></a><input type="text" placeholder="Filter" oninput="window.app.sortList.fuzzySearch.search(this.value, [\'host\']);console.log(this.value)" class="editInput"/><a class="editLabel hoverEditChild sortLabel">Host</a></p><div class="vr"></div><p class="httpExchangeLabel routeHeader"><a href="" onclick="window.app.sortList.sort(\'route\',{order: \'asc\'})" class="arrow-up"></a><a href="" onclick="window.app.sortList.sort(\'route\',{order: \'desc\'})" class="arrow-down"></a><input type="text" placeholder="Filter" oninput="window.app.sortList.fuzzySearch.search(this.value, [\'route\']);" class="editInput"/><a class="editLabel hoverEditChild sortLabel">Route</a></p><div class="vr"></div><p class="httpExchangeLabel methodHeader"><a href="" onclick="window.app.sortList.sort(\'method\',{order: \'asc\'})" class="arrow-up"></a><a href="" onclick="window.app.sortList.sort(\'method\',{order: \'desc\'})" class="arrow-down"></a><input type="text" placeholder="Filter" oninput="window.app.sortList.fuzzySearch.search(this.value, [\'method\']);" class="editInput"/><a class="editLabel hoverEditChild sortLabel">Method</a></p><div class="vr"></div><p class="httpExchangeLabel statusCodeHeader"><a href="" onclick="window.app.sortList.sort(\'statusCode\',{order: \'asc\'})" class="arrow-up"></a><a href="" onclick="window.app.sortList.sort(\'statusCode\',{order: \'desc\'})" class="arrow-down"></a><input type="text" placeholder="Filter" oninput="window.app.sortList.fuzzySearch.search(this.value, [\'statusCode\']);" class="editInput"/><a class="editLabel hoverEditChild sortLabel">Status</a></p><div class="vr"></div><p class="httpExchangeLabel responseLengthHeader"><a href="" onclick="window.app.sortList.sort(\'responseLength\',{order: \'asc\'})" class="arrow-up"></a><a href="" onclick="window.app.sortList.sort(\'responseLength\',{order: \'desc\'})" class="arrow-down"></a><input type="text" placeholder="Filter" oninput="window.app.sortList.fuzzySearch.search(this.value, [\'responseLength\']);" class="editInput"/><a class="editLabel hoverEditChild sortLabel">Length</a></p><div class="vr"></div><p class="httpExchangeLabel responseTimeHeader"><a href="" onclick="window.app.sortList.sort(\'responseTime\',{order: \'asc\'})" class="arrow-up"></a><a href="" onclick="window.app.sortList.sort(\'responseTime\',{order: \'desc\'})" class="arrow-down"></a><input type="text" placeholder="Filter" oninput="window.app.sortList.fuzzySearch.search(this.value, [\'responseTime\']);" class="editInput"/><a class="editLabel hoverEditChild sortLabel">Time</a></p></li></div><div class="container"><main role="page-container" class="main"></main></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/><head><title>#title</title><meta name="viewport" content="width=device-width"/><link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"/><link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"/><link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.2/css/bootstrap-select.min.css"/><script src="http://listjs.com/no-cdn/list.js"></script><script src="http://listjs.com/no-cdn/list.fuzzysearch.js"></script></head>';
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
        return '<div class="container"><div role="selectionTabs" class="container detailsNav"><ul class="nav navbar-nav"><li class="active rawTab"><a href="#" class="coloredTab">Raw</a></li></ul></div><div data-target="selectionDetailsView" role="resizeBar" class="resizeBar"></div><div class="container"><div role="selectionViewPort" id="selectionViewPort" class="div selectionViewPort"><pre class="requestViewer language-http"><code role="requestViewer" class="requestViewer language-http"></code></pre><pre class="responseViewer language-http"><code role="responseViewer" class="responseViewer language-http"></code></pre><div class="hspacer"></div></div></div></div>';
    };

    // pages/IDE.jade compiled template
    templatizer["pages"]["IDE"] = function tmpl_pages_IDE() {
        return '<section class="page IDE"><object data="http://127.0.0.1:9085" class="IDE"><embed src="http://127.0.0.1:9085" class="IDE"/>Error: IDE is not running. Please start IDE and try again.</object></section>';
    };

    // pages/configuration.jade compiled template
    templatizer["pages"]["configuration"] = function tmpl_pages_configuration() {
        return '<section class="page configuration"><div class="container serverSettingsContainer"><form id="configForm" class="configForm"><div class="panel"><div class="panel-heading"><h3 class="panel-title">Response Filtering Options:</h3></div><div class="panel-body">Configuration options for response filtering. Content-Types placed in the whitelist will always be passed through the chain, while those placed in the blacklist will always be skipped and will not appear in the History tab. This is to avoid potentially slow parsing of things like images, etc, which can cause problems with a system designated for processing text. Unknown Content-Types, or responses without a Content-Type, will be accepted if the size of the response is lower than the set Max Unknown Size option.<hr/><div role="Response Filtering" class="row form-Filtering"></div></div></div><input type="submit" method="POST" action="POST"/></form></div></section>';
    };

    // pages/history.jade compiled template
    templatizer["pages"]["history"] = function tmpl_pages_history() {
        return '<section id="displaySelection" class="page history"><div id="historyLabels" class="container"><div class="div fill-height-or-more"><div id="listContainer" class="div listContainer"><ul id="httpExchangeList" role="httpExchangeList" class="list httpExchangeList list"></ul></div></div><div role="selectionDetailsView" id="selectionDetailsView" class="selectionDetailsView container"></div></div></section>';
    };

    return templatizer;
}));