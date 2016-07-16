<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no"/>
    <meta name="format-detection" content="email=no"/>
    <meta content="" name="keywords"/>
    <meta content="" name="description"/>
    <title>${bean.title}</title>
    <link href="/css/style.css" rel="stylesheet" charset="gbk"/>
</head>
<body class="bgf9f9f9">

    <#if bean.video??>
    <embed src=" ${bean.video360}"
                       allowFullScreen="true" quality="high" width="480" height="400"
                       align="middle" allowScriptAccess="always"
                       type="application/x-shockwave-flash"></embed>
    </#if>

</body>
</html>