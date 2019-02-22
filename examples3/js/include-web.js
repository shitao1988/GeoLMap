/* Copyright© 2000 - 2018 .*/
(function () {
    var r = new RegExp("(^|(.*?\\/))(include-web\.js)(\\?|$)"),
        s = document.getElementsByTagName('script'), targetScript;
    for (var i = 0; i < s.length; i++) {
        var src = s[i].getAttribute('src');
        if (src) {
            var m = src.match(r);
            if (m) {
                targetScript = s[i];
                break;
            }
        }
    }

    function inputScript(url) {
        var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
        document.writeln(script);
    }

    function inputCSS(url) {
        var css = '<link rel="stylesheet" href="' + url + '">';
        document.writeln(css);
    }

    function inArray(arr, item) {
        for (i in arr) {
            if (arr[i] == item) {
                return true;
            }
        }
        return false;
    }

    //加载类库资源文件
    function load() {
        var includes = (targetScript.getAttribute('include') || "").split(",");
        var excludes = (targetScript.getAttribute('exclude') || "").split(",");

        var jQueryInclude = false;
  
        if (inArray(includes, 'jquery') && !jQueryInclude) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
        }

        if (inArray(includes, 'bootstrap')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
            inputCSS("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js");
        }
 

        if (inArray(includes, 'template')) {
            inputScript("http://iclient.supermap.io/libs/art-template/template-web.js");
        }
        if (inArray(includes, 'papaparse')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.3.2/papaparse.min.js");
        }

        if (inArray(includes, 'admin-lte')) {
            inputCSS("http://iclient.supermap.io/libs/admin-lte/css/AdminLTE.min.css");
            inputCSS("http://iclient.supermap.io/libs/admin-lte/css/skins/skin-blue.min.css");
            inputCSS("http://iclient.supermap.io/libs/font-awesome/css/font-awesome.min.css");
            inputScript("http://iclient.supermap.io/libs/admin-lte/js/app.min.js");
        }
        if (inArray(includes, 'jquery.scrollto')) {
            inputScript("http://iclient.supermap.io/libs/jquery.scrollto/jquery.scrollTo.min.js");
        }
        if (inArray(includes, 'ace')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js");
        }
        if (inArray(includes, 'deck')) {
            inputScript("http://iclient.supermap.io/web/libs/deck.gl/5.1.3/deck.gl.min.js");
        }
        if (inArray(includes, 'mapv')) {
            inputScript("http://mapv.baidu.com/build/mapv.min.js");
        }
        if (inArray(includes, 'echarts')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/echarts/4.1.0/echarts.min.js");
            inputScript("http://iclient.supermap.io/libs/echartsLayer/EchartsLayer.js");
        }
        if (inArray(includes, 'three')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/92/three.min.js");
        }
        if (inArray(includes, 'echarts-gl')) {
            inputScript("http://iclient.supermap.io/web/libs/echarts-gl/1.1.1/echarts-gl.min.js");
        }
       

        if (inArray(includes, 'lazyload')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery_lazyload/1.9.7/jquery.lazyload.min.js");
        }
        if (inArray(includes, 'i18n')) {
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/i18next/10.0.7/i18next.min.js");
            inputScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-i18next/1.2.1/jquery-i18next.min.js");
        }
       
    }

    function datGuiI18N() {
        document.writeln("<script>function registerEventListener(evt,fn){" +
            "if(window.attachEvent){window.attachEvent('on'+evt,fn);}" +
            "else{window.addEventListener(evt,fn,false);}" +
            "}</script>");
        document.writeln("<script>registerEventListener('load',function() { " +
            "dat.GUI.TEXT_CLOSED=resources.text_close;dat.GUI.TEXT_OPEN=resources.text_open;" +
            "})</script>")
    }

    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
    window.version = "9.1.0";
    window.preRelease = "";
})();
