$(document).ready(function () {
    Tools.setMinheight();
    var mianjiFormIns = new MianjiForm("#mianjiForm", "busi");
    var loupanFormIns = new LoupanForm("#loupanForm", "busi");
    var eduFormIns = new EduForm("#eduForm", "busi");
    var navIns = new Nav(".jsq-nav-inner");
    var jsqTab = $(".jsq-tab"), jsqForms = $(".jsq-form"), resultTab = $(".result-tab"), resultContent = $(".result-content");
    var tabIndex = 0;
    jsqTab.on("tap", ".tab-item", function () {
        if ($(this).hasClass("current-tab")) {
            return
        } else {
            jsqTab.find(".current-tab").removeClass("current-tab");
            $(this).addClass("current-tab");
            jsqForms.hide();
            jsqForms.eq($(this).index()).show();
            tabIndex = $(this).index();
            $(".jsq-result-wrapper").hide();
            if ($(this).index() == 0) {
                $(mianjiFormIns).trigger("form_tab_changed", {index: $(this).index()})
            } else {
                if ($(this).index() == 1) {
                    $(loupanFormIns).trigger("form_tab_changed", {index: $(this).index()})
                } else {
                    $(eduFormIns).trigger("form_tab_changed", {index: $(this).index()})
                }
            }
        }
    });
    resultTab.on("tap", ".tab-item", function () {
        if ($(this).hasClass("current-item")) {
            return
        } else {
            resultTab.find(".current-item").removeClass("current-item");
            $(this).addClass("current-item");
            resultContent.find(".show-item").removeClass("show-item");
            resultContent.find(".result-content-item").eq($(this).index()).addClass("show-item");
            $(window).trigger("tab_changed", {index: tabIndex, rIndex: $(this).index()})
        }
    });
    $(rateSlide).on("rate_selected", function (e, data) {
        if (data.currentIns == mianjiFormIns) {
            $(mianjiFormIns.form).trigger("rate_selected_p", data)
        } else {
            if (data.currentIns == loupanFormIns) {
                $(loupanFormIns.form).trigger("rate_selected_p", data)
            } else {
                if (data.currentIns == eduFormIns) {
                    $(eduFormIns.form).trigger("rate_selected_p", data)
                }
            }
        }
    });
    Tools.getBusiPercent("1", "", "", "", function (payment, res) {
        Tools.setPercent($("#mianjiPercent"), payment, function () {
            $(mianjiFormIns).trigger("percent_init")
        });
        Tools.setPercent($("#loupanPercent"), payment, function () {
            $(loupanFormIns).trigger("percent_init")
        });
        $(rateSlide).trigger("percent_refresh", {data: res.data})
    });
    function _initCount() {
        var likeItem = $(".like-item"), muchItem = $(".much-item"), countN = 0;
        Tools.getCount(1, function (count) {
            countN = count;
            likeItem.find("span").html(count)
        });
        likeItem.on("tap", function () {
            if (likeItem.hasClass("result-bottom-item-tap")) {
                return
            } else {
                likeItem.addClass("result-bottom-item-tap");
                $.ajax({
                    url: "/calculator/pluscount", type: "post", data: "type=1", success: function (res) {
                        countN++;
                        likeItem.find("span").html(countN);
                        Tools.showTips("您可以添加计算器到主屏幕，或保存到浏览器书签中便于以后使用")
                    }
                })
            }
        });
        muchItem.on("tap", function () {
            Tools.showTips("您可以尝试调整按揭年数，或贷款总额再次进行计算")
        })
    }

    _initCount()
});