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
<div class="main" id="main">
    <div class="bk20"></div>
    <div class="content">
        <h1 class="news_title">${bean.title}</h1>
        <p class="news_info"><span>${bean.createTime?string('yyyy-MM-dd HH:mm:ss')}</span><span>${bean.author}</span></p>
    </div>
    <div class="show_content">
        <div class="content">
        ${bean.content}
        </div>
    </div>
</div>
</body>
</html>