(function (k) {
    function c(b, a) {
        var e, g, d;
        2 > arguments.length && (a = b, b = null);
        e = a.Extends || null;
        delete a.Extends;
        g = a.Implements || null;
        delete a.Implements;
        d = a.initialize || null;
        delete a.initialize;
        d || (d = e ? function () {
            e.apply(this, arguments)
        } : function () {
        });
        b && l(d, b);
        c.inherit(d, e);
        c.implement(d, g);
        b && m(d, b);
        c.extend(d, a, !0);
        null != b && c.namespace(b, d);
        return d
    }

    function n(b, a) {
        b.toString = function () {
            return a
        }
    }

    function l(b, a) {
        b.toString = function () {
            return a
        }
    }

    function m(b, a) {
        b.prototype.toString = function () {
            return a
        }
    }

    c.augment = function (b, a, e) {
        var c, d, f;
        for (c in a) {
            a.hasOwnProperty(c) && (d = b.hasOwnProperty(c), e || !d) && (d = b[c] = a[c], "function" === typeof d && (f = (f = a.toString === Object.prototype.toString) ? b.constructor : a.constructor, n(d, f + "::" + c)))
        }
    };
    c.extend = function (b, a, e) {
        a.STATIC && (b.Super && c.augment(b, b.Super._STATIC_, !0), c.augment(b, a.STATIC, !0), b._STATIC_ = a.STATIC, delete a.STATIC);
        c.augment(b.prototype, a, e)
    };
    c.inherit = function (b, a) {
        if (a) {
            var e = function () {
            };
            e.prototype = a.prototype;
            b.prototype = new e;
            b.prototype.constructor = b;
            b.Super = a;
            c.extend(b, a, !1)
        }
    };
    c.implement = function (b, a) {
        if (a) {
            var e;
            "function" === typeof a && (a = [a]);
            for (e = 0; e < a.length; e += 1) {
                c.augment(b.prototype, a[e].prototype, !1)
            }
        }
    };
    c.namespace = function (b, a) {
        if (k) {
            var c, g, d, f, h;
            c = b.split(".");
            g = c[c.length - 1];
            d = k;
            for (h = 0; h < c.length - 1; h += 1) {
                f = c[h], "undefined" === typeof d[f] && (d[f] = {}), d = d[f]
            }
            d[g] = a
        }
    };
    "undefined" !== typeof define ? define([], function () {
        return c
    }) : k ? k.Class = c : module.exports = c
})("undefined" !== typeof define || "undefined" === typeof window ? null : window);
Class("Nav", {
    initialize: function (selector) {
        this.selector = selector;
        this.elem = $(this.selector);
        this._initPosition()
    }, _initPosition: function () {
        var currentItem = this.elem.find(".current-nav"), index = currentItem.index();
        if (index == 0 || index == 1) {
            return
        } else {
            this.elem.scrollLeft(currentItem.position().left - 50)
        }
    }
});
var SearchBox = function (cityPrefix) {
    this.groupId = "";
    this.groupName = "";
    this.cityPrefix = cityPrefix;
    this.init()
};
SearchBox.prototype = {
    init: function () {
        $(this.searchBoxTpl()).appendTo($("body"));
        this.searchBox = $(".search-box");
        this.searchInput = $("#searchInput");
        this.type = "busi";
        this.bindEvents()
    }, setType: function (type) {
        this.type = type
    }, searchBoxTpl: function () {
        return ['<div class="search-box"><div class="search-header">', '   <a href="javascript:history.back();" class="back-btn"></a>', '   <div class="input-container">', '       <input type="text" id="searchInput" placeholder="请输入楼盘名称">', "   </div>", '   <a href="javascript:void(0);" class="cancel-btn">取消</a>', "</div>", '<div class="search-container">', '   <section class="search-result" id="search-result-loupan" style="display: block;">', '       <ul class="result-list">', "       </ul>", '       <div class="none-tips">', "           <p>未找到相应的楼盘</p>", "       </div>", "   </section>", "</div></div>"].join("")
    }, getResultItems: function (data) {
        var data = data, tpl = "";
        for (var i = 0; i < data.length; i++) {
            tpl += ['<li class="list-item">', '   <a href="javascript:;" data-groupid="' + data[i].group_id + '">' + data[i].proj_name + "</a>", "</li>"].join("")
        }
        return tpl
    }, show: function () {
        this.searchBox.show()
    }, hide: function () {
        this.searchBox.hide()
    }, bindEvents: function () {
        var _self = this;
        this.searchInput.on("input", function () {
            var serachText = $(this).val(), str = "";
            if (_self.type == "busi") {
                str = "/" + _self.cityPrefix + "/search/suggestv3?queryWords=" + serachText + "&callback=?"
            } else {
                str = "/" + _self.cityPrefix + "/search/suggestv3?queryWords=" + serachText + "&projTypeIds=64,67,68,71,72,76&callback=?"
            }
            $.getJSON(str, function (res) {
                if (res.errorCode == 0) {
                    if (res.data) {
                        $(".result-list").html(_self.getResultItems(res.data));
                        $(".search-box .none-tips").hide()
                    } else {
                        $(".result-list").html("");
                        $(".search-box .none-tips").show()
                    }
                }
            })
        });
        $(".result-list").on("click", ".list-item a", function (e) {
            $(_self).trigger("group_select", {id: $(this).attr("data-groupid"), name: $(this).text()});
            _self.searchBox.hide();
            _self.searchInput.blur();
            e.preventDefault();
            e.stopPropagation()
        });
        this.searchBox.on("click", ".cancel-btn", function (e) {
            _self.searchBox.hide();
            e.preventDefault();
            e.stopPropagation()
        })
    }
};
var RateSlide = function () {
    this.slide = $("#rateSetWrapper");
    this.backBtn = $("#rateSetWrapper").find(".back-icon");
    this.rateList = $("#rateSetWrapper").find("ul");
    this.rateInput = $("#rateSetWrapper").find("input");
    this.rateBtn = $("#rateSetWrapper").find(".rate-input-btn");
    this.currentIns = null;
    this.index = 0;
    this._bindEvents()
};
RateSlide.prototype = {
    _bindEvents: function () {
        var _self = this;
        this.backBtn.on("click", function (e) {
            _self.showIn();
            e.preventDefault();
            e.stopPropagation()
        });
        this.rateBtn.on("click", function (e) {
            if (_self.rateInput.val().trim() == "") {
                alert("请输入自定义利率")
            } else {
                $(_self).trigger("rate_selected", {
                    num: _self.rateInput.val() / 100,
                    text: _self.rateInput.val() + "%",
                    currentIns: _self.currentIns,
                    index: _self.index,
                    isCustom: true
                });
                _self.rateInput.blur();
                _self.showIn()
            }
            e.preventDefault();
            e.stopPropagation()
        });
        this.rateList.on("click", "li", function (e) {
            if ($(this).hasClass("selected-item")) {
                _self.showIn()
            } else {
                _self.rateList.find(".selected-item").removeClass("selected-item");
                $(this).addClass("selected-item");
                $(_self).trigger("rate_selected", {
                    num: $(this).attr("data-num"),
                    text: $(this).text(),
                    currentIns: _self.currentIns,
                    index: _self.index,
                    isCustom: false
                });
                _self.showIn()
            }
            e.preventDefault();
            e.stopPropagation()
        });
        $(this).on("percent_refresh", function (e, res) {
            _self.rateList.html(_self.getTpl(res.data[0].discount))
        })
    }, showOut: function (ins, index, originNum, isCustom) {
        $("input:focus").blur();
        this.currentIns = ins;
        this.index = index;
        this.slide.removeClass("show-in-animation");
        this.slide.addClass("show-out-animation");
        this.slide.find(".selected-item").removeClass("selected-item");
        if (this.slide.find('li[data-num="' + originNum + '"]').length > 0) {
            this.slide.find('li[data-num="' + originNum + '"]').addClass("selected-item")
        }
    }, showIn: function () {
        this.slide.removeClass("show-out-animation");
        this.slide.addClass("show-in-animation")
    }, getTpl: function (data) {
        var tpl = "";
        for (var i = 0; i < data.length; i++) {
            tpl += '<li class="' + (i == 0 ? "selected-item" : "") + '" data-num="' + data[i] + '">' + Tools.rateFormat(data[i]) + "</li>"
        }
        return tpl
    }
};
var rateSlide = new RateSlide();
Class("SelectBox", {
    initialize: function (selector, triggerIns) {
        this.selector = selector;
        this.elem = $(this.selector);
        this.triggerIns = triggerIns;
        this._bindEvents()
    }, _bindEvents: function () {
        var _self = this;
        this.elem.on("change", function () {
            _self.triggerIns.setValue(_self.elem.find("option").eq($(this)[0].selectedIndex).text());
            _self.triggerIns.setAttr("data-value", _self.elem.val())
        })
    }
});
Class("FormItem", {
    initialize: function (selector) {
        this.selector = selector;
        this.elem = $(selector)
    }, getValue: function () {
        return this.elem.find(".select-value").text()
    }, setValue: function (value) {
        this.elem.find(".select-value").text(value)
    }, setAttr: function (attr, attrValue) {
        this.elem.find(".select-value").attr(attr, attrValue)
    }, getAttr: function (attr) {
        return this.elem.find(".select-value").attr(attr)
    }, show: function () {
        this.elem.css("display", "-webkit-box")
    }, hide: function () {
        this.elem.hide()
    }
});
var InputItem = Class("InputItem", {
    Extends: FormItem, initialize: function (selector) {
        InputItem.Super.call(this, selector)
    }, getValue: function () {
        return this.elem.find("input").val()
    }, setValue: function (value) {
        this.elem.find("input").val(value)
    }, checkInput: function () {
        if (this.elem.find("input").val() == "") {
            Tools.showTips(this.elem.find("input").attr("data-none-tips"));
            return false
        } else {
            if (this.elem.find("input").val() <= 0 || this.elem.find("input").val().split(".").length > 2) {
                Tools.showTips("您输入的信息有误");
                return false
            } else {
                return true
            }
        }
    }
});
var TimeItem = Class("TimeItem", {
    Extends: FormItem, initialize: function (selector) {
        TimeItem.Super.call(this, selector)
    }, checkInput: function () {
        if (this.elem.find(".select-value").attr("data-value") == "") {
            Tools.showTips(this.elem.find(".select-value").attr("data-none-tips"));
            return false
        } else {
            return true
        }
    }
});
var PriceItem = Class("PriceItem", {
    Extends: FormItem, initialize: function (selector) {
        PriceItem.Super.call(this, selector)
    }, setYouhui: function (value) {
        this.elem.find(".value-youhui").text(value)
    }
});
var RadioItem = Class("RadioItem", {
    Extends: FormItem, initialize: function (selector) {
        RadioItem.Super.call(this, selector);
        this.radioBox = this.elem.find(".item-radio-box");
        this._bindEvents()
    }, _bindEvents: function (value) {
        var _self = this;
        this.radioBox.on("tap", ".radio-item", function (e) {
            if ($(this).hasClass("current-radio")) {
                return
            } else {
                _self.radioBox.find(".current-radio").removeClass("current-radio");
                $(this).addClass("current-radio");
                _self.radioBox.attr("data-value", $(this).index() + 1)
            }
            e.preventDefault();
            e.stopPropagation()
        })
    }, getValue: function () {
        return this.radioBox.find(".current-radio").text()
    }, getAttr: function (text) {
        return this.radioBox.attr(text)
    }
});
var PropertyRadioItem = Class("PropertyRadioItem", {
    Extends: FormItem, initialize: function (selector) {
        PropertyRadioItem.Super.call(this, selector);
        this.radioBox = this.elem.find(".item-radio-box");
        this._bindEvents()
    }, _bindEvents: function (value) {
        var _self = this;
        this.radioBox.on("tap", ".radio-item", function (e) {
            if ($(this).hasClass("current-radio")) {
                return
            } else {
                _self.radioBox.find(".current-radio").removeClass("current-radio");
                $(this).addClass("current-radio");
                _self.radioBox.attr("data-value", $(this).index() + 1);
                $(_self).trigger("radio_change", {index: $(this).index()})
            }
            e.preventDefault();
            e.stopPropagation()
        })
    }, getValue: function () {
        return this.radioBox.find(".current-radio").text()
    }, getAttr: function (text) {
        return this.radioBox.attr(text)
    }
});
var TypeRadioItem = Class("TypeRadioItem", {
    Extends: FormItem, initialize: function (selector) {
        TypeRadioItem.Super.call(this, selector);
        this.radioBox = this.elem.find(".item-radio-box");
        this._bindEvents()
    }, _bindEvents: function (value) {
        var _self = this;
        this.radioBox.on("tap", ".radio-item", function (e) {
            if ($(this).hasClass("current-radio")) {
                return
            } else {
                _self.radioBox.find(".current-radio").removeClass("current-radio");
                $(this).addClass("current-radio");
                _self.radioBox.attr("data-value", $(this).index() + 1);
                $(_self).trigger("radio_change_type", {index: $(this).index()})
            }
            e.preventDefault();
            e.stopPropagation()
        })
    }, getValue: function () {
        return this.radioBox.find(".current-radio").text()
    }, getAttr: function (text) {
        return this.radioBox.attr(text)
    }
});
Class("Form", {
    initialize: function (selector) {
        this.selector = selector;
        this.elem = $(this.selector);
        this.jsqResultWrapper = $(".jsq-result-wrapper");
        this.generateBtn = this.elem.find(".generate-btn");
        this.sf = $(".result-shoufu");
        this.benxiShoufu = $(".shoufu-right").eq(0);
        this.benxiYuegong = $(".month-money").eq(0);
        this.benxiZM = $(".month-tips").eq(0);
        this.benjinShoufu = $(".shoufu-right").eq(1);
        this.benjinFirstMonth = $(".month-money").eq(1);
        this.benjinLastMonth = $(".last-month");
        this.benjinZM = $(".month-tips").eq(1);
        this.benjinDown = $(".month-down")
    }
});
Class("JsqForm", {
    initialize: function (selector, jsqType) {
        this.selector = selector;
        this.jsqType = jsqType;
        this.form = $(selector);
        this.elem = $(this.selector);
        if (this.jsqType == "com") {
            this.bRateItemIns = new FormItem(selector + " .b-rate-item");
            this.fRateItemIns = new FormItem(selector + " .f-rate-item");
            this.originNumB = this.bRateItemIns.getAttr("data-origin");
            this.originNumF = this.fRateItemIns.getAttr("data-origin")
        } else {
            this.rateItemIns = new FormItem(selector + " .rate-item");
            this.originNum = this.rateItemIns.getAttr("data-origin")
        }
        this.jsqResultWrapper = $(".jsq-result-wrapper");
        this.generateBtn = this.elem.find(".generate-btn");
        this.sf = $(".result-shoufu");
        this.benxiShoufu = $(".shoufu-right").eq(0);
        this.benxiYuegong = $(".month-money").eq(0);
        this.benxiZM = $(".month-tips").eq(0);
        this.benjinShoufu = $(".shoufu-right").eq(1);
        this.benjinFirstMonth = $(".month-money").eq(1);
        this.benjinLastMonth = $(".last-month");
        this.benjinZM = $(".month-tips").eq(1);
        this.benjinDown = $(".month-down");
        this._bindParentEvents()
    }, _bindParentEvents: function () {
        var _self = this;
        if (this.jsqType == "com") {
            this.bRateItemIns.elem.on("click", function (e) {
                rateSlide.showOut(_self, 1, _self.bRateItemIns.getAttr("data-value"));
                _self.originNumB = _self.bRateItemIns.getAttr("data-origin");
                e.preventDefault();
                e.stopPropagation()
            });
            $(this.form).on("rate_selected_p", function (e, data) {
                if (data.isCustom == true) {
                    var rNumB = Math.round(parseFloat(data.num) * 1000) / 1000, rNumF = Math.round(parseFloat(data.num) * 1000) / 1000;
                    if (data.index == 1) {
                        _self.bRateItemIns.setValue(data.text + "(" + (rNumB * 100).toFixed(2) + "%)");
                        _self.bRateItemIns.setAttr("data-value", data.num);
                        _self.bRateItemIns.setAttr("data-origin", "1")
                    } else {
                        if (data.index == 2) {
                            _self.fRateItemIns.setValue(data.text + "(" + (rNumF * 100).toFixed(2) + "%)");
                            _self.fRateItemIns.setAttr("data-value", data.num);
                            _self.fRateItemIns.setAttr("data-origin", "1")
                        }
                    }
                } else {
                    if (data.index == 1) {
                        _self.bRateItemIns.setAttr("data-origin", parseFloat(_self.getBaseRate(_self.yearIns.getAttr("data-value") / 12).b) / 100);
                        var origin = parseFloat(_self.bRateItemIns.getAttr("data-origin")), rate = parseFloat(data.num), r = ((origin * rate) * 10000 / 100).toFixed(2);
                        _self.bRateItemIns.setValue(data.text + "(" + r + "%)");
                        _self.bRateItemIns.setAttr("data-value", data.num)
                    } else {
                        if (data.index == 2) {
                            _self.fRateItemIns.setAttr("data-origin", parseFloat(_self.getBaseRate(_self.yearIns.getAttr("data-value") / 12).f) / 100);
                            var rNumF = ((parseInt(parseFloat(data.num) * parseFloat(_self.fRateItemIns.getAttr("data-origin")) * 10000)) / 100).toFixed(2);
                            _self.fRateItemIns.setValue(data.text + "(" + rNumF + "%)");
                            _self.fRateItemIns.setAttr("data-value", data.num)
                        }
                    }
                }
            })
        } else {
            if (this.jsqType == "busi") {
                this.rateItemIns.elem.on("click", function (e) {
                    rateSlide.showOut(_self, 0, _self.rateItemIns.getAttr("data-value"));
                    _self.originNum = _self.rateItemIns.getAttr("data-origin");
                    e.preventDefault();
                    e.stopPropagation()
                });
                $(this.form).on("rate_selected_p", function (e, data) {
                    if (data.isCustom == true) {
                        var rNum = Math.round(parseFloat(data.num) * 1000) / 1000;
                        _self.rateItemIns.setValue(data.text + "(" + (rNum * 100).toFixed(2) + "%)");
                        _self.rateItemIns.setAttr("data-value", data.num);
                        _self.rateItemIns.setAttr("data-origin", "1")
                    } else {
                        _self.rateItemIns.setAttr("data-origin", parseFloat(_self.getBaseRate(_self.yearIns.getAttr("data-value") / 12).b) / 100);
                        var origin = parseFloat(_self.rateItemIns.getAttr("data-origin")), rate = parseFloat(data.num), r = ((origin * rate) * 10000 / 100).toFixed(2);
                        _self.rateItemIns.setValue(data.text + "(" + r + "%)");
                        _self.rateItemIns.setAttr("data-value", data.num)
                    }
                })
            }
        }
        $(this).on("form_tab_changed", function (e, data) {
            var units = "1";
            if (data.index == 0 || data.index == 1) {
                units = _self.propertyIns.getAttr("data-value")
            }
            $(".rate-input").find("input").val("");
            Tools.getBusiPercent(units, "", "", "", function (payment, res) {
                $(rateSlide).trigger("percent_refresh", {data: res.data})
            })
        })
    }, setRateValue: function (yearTime) {
        var baseRate = this.getBaseRate(yearTime), _self = this;
        if (_self.jsqType == "busi") {
            _self.rateItemIns.setValue("基准利率(" + baseRate.b + "%)");
            _self.rateItemIns.setAttr("data-value", "1");
            _self.rateItemIns.setAttr("data-origin", parseFloat(baseRate.b) / 100)
        } else {
            if (_self.jsqType == "fund") {
                _self.rateItemIns.setValue("基准利率(" + baseRate.f + "%)");
                _self.rateItemIns.setAttr("data-value", "1");
                _self.rateItemIns.setAttr("data-origin", parseFloat(baseRate.f) / 100)
            } else {
                if (_self.jsqType == "com") {
                    _self.bRateItemIns.setValue("基准利率(" + baseRate.b + "%)");
                    _self.bRateItemIns.setAttr("data-value", "1");
                    _self.bRateItemIns.setAttr("data-origin", parseFloat(baseRate.b) / 100);
                    _self.fRateItemIns.setValue("基准利率(" + baseRate.f + "%)");
                    _self.fRateItemIns.setAttr("data-value", "1");
                    _self.fRateItemIns.setAttr("data-origin", parseFloat(baseRate.f) / 100)
                }
            }
        }
    }, getBaseRate: function (yearTime) {
        if (yearTime == 1) {
            return {b: baseRateB.year1, f: baseRateF.year5}
        } else {
            if (yearTime > 1 && yearTime <= 3) {
                return {b: baseRateB.year3, f: baseRateF.year5}
            } else {
                if (yearTime > 3 && yearTime <= 5) {
                    return {b: baseRateB.year5, f: baseRateF.year5}
                } else {
                    if (yearTime > 5) {
                        return {b: baseRateB.yearMore, f: baseRateF.yearMore}
                    }
                }
            }
        }
    }, resetRate: function (res) {
        $(rateSlide).trigger("percent_refresh", {data: res.data});
        var year = this.yearIns.getAttr("data-value") / 12, baseB = parseFloat(this.getBaseRate(year).b), changeRateIns = null;
        if (this.jsqType == "busi") {
            changeRateIns = this.rateItemIns
        } else {
            if (this.jsqType == "com") {
                changeRateIns = this.bRateItemIns
            }
        }
        if (res.data[0].discount[0] > 1) {
            changeRateIns.setValue(res.data[0].discount[0] + "倍(" + Tools.formatFloat(res.data[0].discount[0] * baseB, 2) + "%)");
            changeRateIns.setAttr("data-value", res.data[0].discount[0])
        } else {
            changeRateIns.setValue("基准利率(" + baseB + "%)");
            changeRateIns.setAttr("data-value", "1")
        }
    }, handlePropertyChange: function (type, data) {
        var _self = this;
        if (type == "mianji") {
            var units = _self.propertyIns.getAttr("data-value") || "", area = _self.areaIns.getValue() || "", earea = _self.fisrtAreaIns.getValue() || "", bankId = "", selectId = "#mianjiPercent", selectElem = $(selectId), isShowAreaIns = _self.fisrtAreaIns
        } else {
            if (type == "loupan") {
                var units = _self.propertyIns.getAttr("data-value") || "", area = "", earea = _self.areaIns ? _self.areaIns.getValue() : "", bankId = data.bankId || "", selectId = "#loupanPercent", selectElem = $(selectId), isShowAreaIns = _self.areaIns
            }
        }
        if (_self.jsqType == "busi") {
            if (_self.groupData == null) {
                Tools.setPercentInfo(selectElem, _self.propertyIns.getAttr("data-value"), bankId, "", "", function (res) {
                    _self.percentSelect = new SelectBox(selectId, _self.percentIns);
                    _self.resetRate(res)
                })
            } else {
                Tools.setPercentInfo(selectElem, _self.propertyIns.getAttr("data-value"), bankId, _self.groupData.projType, _self.groupData.soilUseYears, function (res) {
                    _self.percentSelect = new SelectBox(selectId, _self.percentIns);
                    _self.resetRate(res)
                })
            }
        } else {
            if (_self.jsqType == "fund") {
                if (data.index == 1) {
                    isShowAreaIns.show()
                } else {
                    isShowAreaIns.hide()
                }
                Tools.setBonusInfo(selectElem, units, area, earea, function (res) {
                    _self.percentSelect = new SelectBox(selectId, _self.percentIns);
                    _self.personMax = parseFloat(res.data[0].personalLoan) * 10000;
                    _self.familyMax = parseFloat(res.data[0].familyLoan) * 10000;
                    _self.form.find(".form-tips").html("公积金贷款最高额度：个人" + res.data[0].personalLoan + "万元，家庭" + res.data[0].familyLoan + "万元");
                    _self.changeFundRate(res.data[0].floatingRate)
                })
            } else {
                if (_self.jsqType == "com") {
                    Tools.setPercentInfo(selectElem, _self.propertyIns.getAttr("data-value"), bankId, "", "", function (res) {
                        _self.percentSelect = new SelectBox(selectId, _self.percentIns);
                        _self.resetRate(res)
                    });
                    Tools.getBonusInfo(units, area, earea, function (payment, res) {
                        _self.personMax = parseFloat(res.data[0].personalLoan) * 10000;
                        _self.familyMax = parseFloat(res.data[0].familyLoan) * 10000;
                        _self.form.find(".form-tips").html("公积金贷款最高额度：个人" + res.data[0].personalLoan + "万元，家庭" + res.data[0].familyLoan + "万元");
                        _self.changeFundRate(res.data[0].floatingRate)
                    })
                }
            }
        }
    }, changeFundRate: function (floatRate) {
        var br = this.getBaseRate(this.yearIns.getAttr("data-value") / 12), cIns = null;
        if (this.jsqType == "fund") {
            cIns = this.rateItemIns
        } else {
            cIns = this.fRateItemIns
        }
        if (floatRate == 1) {
            cIns.setValue("基准利率(" + parseFloat(br.f).toFixed(2) + "%)")
        } else {
            cIns.setValue(floatRate + "倍(" + parseFloat(br.f * floatRate).toFixed(2) + "%)")
        }
    }, calculate: function (jsqType, type, zongjia, dkze, dkqs, yll) {
        var shoufu = "";
        if (zongjia != 0) {
            shoufu = zongjia - dkze
        }
        if (type == "benxi") {
            var result = Tools.caluBenxi(dkze, dkqs, yll);
            if (jsqType == "busi") {
                this.setBenxi(shoufu, result.yuegong, result.tips, dkze, result.hkze)
            } else {
                if (jsqType == "fund") {
                    this.setBenxi(shoufu, result.yuegong, result.tips, dkze, result.hkze)
                } else {
                    if (jsqType == "com") {
                    }
                }
            }
        } else {
            if (type == "benjin") {
                var result = Tools.caluBenjin(dkze, dkqs, yll);
                if (jsqType == "busi") {
                    this.setBenjin(shoufu, result.firstMonth, result.lastMonth, result.downNum, result.avgMonth, dkze, result.hkze)
                } else {
                    if (jsqType == "fund") {
                        this.setBenjin(shoufu, result.firstMonth, result.lastMonth, result.downNum, result.avgMonth, dkze, result.hkze)
                    } else {
                        if (jsqType == "com") {
                        }
                    }
                }
            }
        }
    }, calculateCom: function (type, zongjia, dkze, dkqs, yllF, yllB, fundMoney, busiMoney) {
        var shoufu = "";
        if (zongjia != 0) {
            shoufu = zongjia - dkze
        }
        if (type == "benxi") {
            if (busiMoney > 0) {
                var resultFund = Tools.caluBenxi(fundMoney, dkqs, yllF), resultBusi = Tools.caluBenxi(dkze - fundMoney, dkqs, yllB);
                this.setBenxi(shoufu, resultFund.yuegong + resultBusi.yuegong, resultFund.tips + resultBusi.tips, dkze, resultFund.hkze + resultBusi.hkze, fundMoney, busiMoney)
            } else {
                var resultFund = Tools.caluBenxi(fundMoney, dkqs, yllF);
                this.setBenxi(shoufu, resultFund.yuegong, resultFund.tips, dkze, resultFund.hkze, fundMoney, busiMoney)
            }
        } else {
            if (type == "benjin") {
                if (busiMoney > 0) {
                    var resultFund = Tools.caluBenjin(fundMoney, dkqs, yllF), resultBusi = Tools.caluBenjin(dkze - fundMoney, dkqs, yllB);
                    this.setBenjin(shoufu, resultFund.firstMonth + resultBusi.firstMonth, resultFund.lastMonth + resultBusi.lastMonth, resultFund.downNum + resultBusi.downNum, resultFund.avgMonth + resultBusi.avgMonth, dkze, resultFund.hkze + resultBusi.hkze, fundMoney, busiMoney)
                } else {
                    var resultFund = Tools.caluBenjin(fundMoney, dkqs, yllF);
                    this.setBenjin(shoufu, resultFund.firstMonth, resultFund.lastMonth, resultFund.downNum, resultFund.firstMonth, dkze, resultFund.hkze, fundMoney, busiMoney)
                }
            }
        }
    }, setBenxi: function (shoufu, yuegong, tips, dkze, hkze, fundMoney, busiMoney) {
        if (shoufu != "") {
            this.benxiShoufu.html(Tools.numFormat(shoufu))
        }
        this.benxiYuegong.html(Tools.numFormat(yuegong));
        this.benxiZM.html("您需要开具" + Tools.numFormat(tips) + "元/月的收入证明");
        Tools.runCircle(dkze / hkze * 100, (100 - dkze / hkze * 100), dkze, (hkze - dkze), hkze, fundMoney, busiMoney)
    }, setBenjin: function (shoufu, firstMonth, lastMonth, downNum, avgMonth, dkze, hkze, fundMoney, busiMoney) {
        if (shoufu != "") {
            this.benjinShoufu.html(Tools.numFormat(shoufu))
        }
        this.benjinFirstMonth.html(Tools.numFormat(firstMonth) + '<span class="month-down">每月递减：' + Tools.numFormat(downNum) + "元</span>");
        this.benjinLastMonth.html(Tools.numFormat(lastMonth));
        this.benjinZM.html("您需要开具" + Tools.numFormat(firstMonth * 2) + "元/月的收入证明");
        Tools.runCircle(dkze / hkze * 100, (100 - dkze / hkze * 100), dkze, (hkze - dkze), hkze, fundMoney, busiMoney)
    }
});
var LoupanForm = Class("LoupanForm", {
    Extends: JsqForm, initialize: function (selector, jsqType) {
        LoupanForm.Super.call(this, selector, jsqType);
        this.selector = selector;
        this.jsqType = jsqType;
        this.searchBoxIns = new SearchBox($("#cityPrefix").val());
        this.form = $(selector);
        this.loupanIns = new FormItem("#loupanSerach");
        this.huxingIns = new FormItem(selector + " .huxing-item");
        this.priceIns = new PriceItem(selector + " .price-item");
        this.propertyIns = new PropertyRadioItem(selector + " .property-item");
        this.percentIns = new FormItem(selector + " .percent-item");
        this.yearIns = new FormItem(selector + " .year-item");
        this.yearSelect = new SelectBox("#loupanSelect", this.yearIns);
        this.huxingNoneTips = $(".huxing-none-item");
        this.huxingData = null;
        this.groupData = null;
        this.personMax = 0;
        this.familyMax = 0;
        if (this.jsqType == "busi") {
            this.bankIns = new FormItem(selector + " .bank-item")
        } else {
            if (this.jsqType == "fund") {
                this.typeIns = new TypeRadioItem(selector + " .type-item");
                this.areaIns = new InputItem(selector + " .area-item")
            } else {
                if (this.jsqType == "com") {
                    this.bankIns = new FormItem(selector + " .bank-item");
                    this.typeIns = new RadioItem(selector + " .type-item");
                    this.areaIns = new InputItem(selector + " .area-item")
                }
            }
        }
        this._bindEvents()
    }, _setBankInfo: function (bankMap, groupData) {
        var bankOptions = "", _self = this;
        if (Object.keys(bankMap).length > 0) {
            for (var i = 0; i < Object.keys(bankMap).length; i++) {
                var isSelected = i == 0 ? '"selected"="selected"' : "";
                bankOptions += '<option value="' + Object.keys(bankMap)[i] + '" ' + isSelected + ">" + bankMap[Object.keys(bankMap)[i]] + "</option>"
            }
            $("#bankSelect").html(bankOptions);
            var bankIdDefault = Object.keys(bankMap)[0], bankNameDefault = bankMap[Object.keys(bankMap)[0]];
            _self.bankIns.setValue(bankNameDefault);
            _self.bankIns.setAttr("data-value", bankIdDefault);
            _self.bankSelect = new SelectBox("#bankSelect", _self.bankIns);
            _self.bankIns.show();
            Tools.setPercentInfo($("#loupanPercent"), _self.propertyIns.getAttr("data-value"), bankIdDefault, groupData.projType, groupData.soilUseYears, function (res) {
                _self.percentSelect = new SelectBox("#loupanPercent", _self.percentIns);
                _self.resetRate(res)
            })
        } else {
            _self.bankIns.hide();
            Tools.setPercentInfo($("#loupanPercent"), _self.propertyIns.getAttr("data-value"), "", groupData.projType, groupData.soilUseYears, function (res) {
                _self.percentSelect = new SelectBox("#loupanPercent", _self.percentIns);
                _self.resetRate(res)
            })
        }
    }, _bindEvents: function () {
        var _self = this, cityPrefix = $("#cityPrefix").val();
        this.loupanIns.elem.on("click", function (e) {
            if (_self.jsqType == "fund" || _self.jsqType == "com") {
                _self.searchBoxIns.setType("fund")
            } else {
                _self.searchBoxIns.setType("busi")
            }
            _self.searchBoxIns.show();
            $(window).scrollTop(0);
            e.preventDefault();
            e.stopPropagation()
        });
        $(this.searchBoxIns).on("group_select", function (e, data) {
            _self.loupanIns.setValue(data.name);
            _self.loupanIns.setAttr("data-groupid", data.id);
            $.ajax({
                url: "/" + cityPrefix + "/loupan/" + data.id + "/loan",
                type: "get",
                dataType: "json",
                success: function (res) {
                    _self.huxingData = res.huxingItems;
                    _self.groupData = res.buildingInfo;
                    if (_self.jsqType == "busi" || _self.jsqType == "com") {
                        _self._setBankInfo(res.buildingInfo.bankNameArr, res.buildingInfo)
                    } else {
                        var units = _self.propertyIns.getAttr("data-value"), area = "", earea = _self.areaIns.getValue();
                        Tools.setBonusInfo($("#loupanPercent"), units, area, earea, function (res) {
                            _self.percentSelect = new SelectBox("#loupanPercent", _self.percentIns)
                        })
                    }
                    if (_self.huxingData.length > 0) {
                        _self.huxingNoneTips.hide();
                        var huxingOptions = "";
                        for (var i = 0; i < (_self.huxingData.length > 10 ? 10 : _self.huxingData.length); i++) {
                            var isSelected = i == 0 ? '"selected"="selected"' : "", priceShow = _self.huxingData[i].allAvgPrice == 0 ? (_self.huxingData[i].allLowPrice == 0 ? _self.huxingData[i].allMaxPrice : _self.huxingData[i].allLowPrice) : _self.huxingData[i].allAvgPrice;
                            huxingOptions += '<option data-youhui="' + _self.huxingData[i].discount + '" data-all="' + priceShow + '" value="' + parseFloat(priceShow / 10000).toFixed(2) + '" ' + isSelected + ">" + _self.huxingData[i].typeClassName + "  " + _self.huxingData[i].buildArea + "㎡ </option>"
                        }
                        $("#huxingSelect").html(huxingOptions);
                        _self.huxingSelect = new SelectBox("#huxingSelect", _self.huxingIns);
                        _self.huxingIns.show();
                        _self.huxingIns.setValue(_self.huxingData[0].typeClassName + "  " + _self.huxingData[0].buildArea + "㎡");
                        var defaultPriceShow = _self.huxingData[0].allAvgPrice == 0 ? (_self.huxingData[0].allLowPrice == 0 ? _self.huxingData[0].allMaxPrice : _self.huxingData[0].allLowPrice) : _self.huxingData[0].allAvgPrice;
                        _self.priceIns.setValue(parseFloat(defaultPriceShow / 10000).toFixed(2) + "万");
                        _self.priceIns.setAttr("data-value", defaultPriceShow);
                        _self.priceIns.show();
                        if (_self.huxingData[0].discount) {
                            _self.priceIns.setYouhui(_self.huxingData[0].discount);
                            $(".value-youhui").show().attr("href", "/" + res._city.cityPinyinAbbr + "/loupan/" + res.buildingInfo.groupId)
                        } else {
                            $(".value-youhui").hide()
                        }
                    } else {
                        _self.huxingNoneTips.show();
                        _self.priceIns.setValue("");
                        _self.priceIns.hide();
                        _self.huxingIns.hide();
                        if (_self.bankIns) {
                            _self.bankIns.hide()
                        }
                    }
                }
            })
        });
        $("#huxingSelect").on("change", function () {
            var That = $("#huxingSelect").find("option:selected");
            var priceForShow = $(this).attr("value"), priceNum = That[0].dataset.all, youhui = That[0].dataset.youhui;
            _self.priceIns.setValue(priceForShow + "万");
            _self.priceIns.setAttr("data-value", priceNum);
            if (youhui) {
                _self.priceIns.setYouhui(youhui);
                $(".value-youhui").show()
            } else {
                $(".value-youhui").hide()
            }
        });
        $("#bankSelect").on("change", function () {
            if (_self.jsqType == "busi" || _self.jsqType == "com") {
                var bankId = $(this).val() || "";
                if (_self.groupData == null) {
                    Tools.setPercentInfo($("#loupanPercent"), _self.propertyIns.getAttr("data-value"), bankId, "", "", function (res) {
                        _self.percentSelect = new SelectBox("#loupanPercent", _self.percentIns);
                        _self.resetRate(res)
                    })
                } else {
                    Tools.setPercentInfo($("#loupanPercent"), _self.propertyIns.getAttr("data-value"), bankId, _self.groupData.projType, _self.groupData.soilUseYears, function (res) {
                        _self.percentSelect = new SelectBox("#loupanPercent", _self.percentIns);
                        _self.resetRate(res)
                    })
                }
            }
        });
        $("#loupanSelect").on("change", function () {
            var yearTime = parseInt($(this).val() / 12);
            _self.setRateValue(yearTime)
        });
        $(this.propertyIns).on("radio_change", function (e, data) {
            _self.handlePropertyChange("loupan", data)
        });
        $(this).on("percent_init", function (e, res) {
            _self.percentSelect = new SelectBox("#loupanPercent", _self.percentIns);
            if (res) {
                _self.personMax = parseFloat(res.data[0].personalLoan) * 10000;
                _self.familyMax = parseFloat(res.data[0].familyLoan) * 10000
            }
        });
        if (this.jsqType == "fund") {
            this.areaIns.elem.find("input").on("input", function () {
                var units = _self.propertyIns.getAttr("data-value"), area = "", earea = $(this).val();
                Tools.setBonusInfo($("#loupanPercent"), units, area, earea, function (res) {
                    _self.percentSelect = new SelectBox("#loupanPercent", _self.percentIns)
                })
            })
        }
        this.generateBtn.on("tap", function () {
            var tabIndex = $(".result-tab").find(".current-item").index();
            if (tabIndex == 0) {
                _self.startCalu("benxi")
            } else {
                _self.startCalu("benjin")
            }
        });
        $(window).on("tab_changed", function (e, data) {
            if (data.index == 1) {
                if (data.rIndex == 0) {
                    if (_self.jsqType == "busi") {
                        _self.caluBusi("benxi")
                    } else {
                        if (_self.jsqType == "fund") {
                            _self.caluFund("benxi")
                        } else {
                            _self.caluCom("benxi")
                        }
                    }
                } else {
                    if (data.rIndex == 1) {
                        if (_self.jsqType == "busi") {
                            _self.caluBusi("benjin")
                        } else {
                            if (_self.jsqType == "fund") {
                                _self.caluFund("benjin")
                            } else {
                                _self.caluCom("benjin")
                            }
                        }
                    }
                }
            }
        })
    }, startCalu: function (calutype) {
        var _self = this;
        if (_self.loupanIns.getValue() != "填写您要购买的楼盘") {
            if (_self.priceIns.getValue() == "") {
                Tools.showTips("未找到所选楼盘在售户型");
                return
            }
            if (_self.jsqType == "busi") {
                _self.caluBusi(calutype)
            } else {
                if (_self.jsqType == "fund") {
                    if ((_self.propertyIns.getAttr("data-value") == "2" && _self.areaIns.checkInput()) || _self.propertyIns.getAttr("data-value") == "1") {
                        _self.caluFund(calutype)
                    }
                } else {
                    _self.caluCom(calutype)
                }
            }
        } else {
            Tools.showTips("请选择您要购买的楼盘")
        }
    }, caluBusi: function (type) {
        Tools.removeMinheight();
        var zongjia = parseFloat(this.priceIns.getAttr("data-value")), dkze = zongjia * (1 - parseFloat(this.percentIns.getAttr("data-value"))), dkqs = parseFloat(this.yearIns.getAttr("data-value")), yll = parseFloat(this.rateItemIns.getAttr("data-origin")) * parseFloat(this.rateItemIns.getAttr("data-value")) / 12;
        this.jsqResultWrapper.show();
        this.sf.show();
        this.calculate(this.jsqType, type, zongjia, dkze, dkqs, yll);
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }, caluFund: function (type) {
        Tools.removeMinheight();
        var zongjia = parseFloat(this.priceIns.getAttr("data-value")), dkze = zongjia * (1 - parseFloat(this.percentIns.getAttr("data-value"))), dkqs = parseFloat(this.yearIns.getAttr("data-value")), yll = parseFloat(this.rateItemIns.getAttr("data-origin")) * parseFloat(this.rateItemIns.getAttr("data-value")) / 12;
        if (this.typeIns.getAttr("data-value") == "1") {
            if (dkze > this.personMax) {
                Tools.showConfirmDialog(this.personMax / 10000)
            }
        } else {
            if (this.typeIns.getAttr("data-value") == "2") {
                if (dkze > this.familyMax) {
                    Tools.showConfirmDialog(this.personMax / 10000)
                }
            }
        }
        this.jsqResultWrapper.show();
        this.sf.show();
        this.calculate(this.jsqType, type, zongjia, dkze, dkqs, yll);
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }, caluCom: function (type) {
        var zongjia = parseFloat(this.priceIns.getAttr("data-value")), shoufu = parseFloat(zongjia * this.percentIns.getAttr("data-value")), dkze = zongjia - shoufu, dkqs = parseFloat(this.yearIns.getAttr("data-value")), yllB = parseFloat(this.bRateItemIns.getAttr("data-origin")) * parseFloat(this.bRateItemIns.getAttr("data-value")) / 12, yllF = parseFloat(this.fRateItemIns.getAttr("data-origin")) * parseFloat(this.fRateItemIns.getAttr("data-value")) / 12;
        var fundMoney = 0, busiMoney = 0;
        if (this.typeIns.getAttr("data-value") == "1") {
            if (dkze > this.personMax) {
                fundMoney = this.personMax;
                busiMoney = dkze - this.personMax
            } else {
                fundMoney = dkze;
                busiMoney = 0
            }
        } else {
            if (this.typeIns.getAttr("data-value") == "2") {
                if (dkze > this.familyMax) {
                    fundMoney = this.familyMax;
                    busiMoney = dkze - this.familyMax
                } else {
                    fundMoney = dkze;
                    busiMoney = 0
                }
            }
        }
        this.jsqResultWrapper.show();
        this.sf.show();
        this.calculateCom(type, zongjia, dkze, dkqs, yllF, yllB, fundMoney, busiMoney);
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }
});
var MianjiForm = Class("MianjiForm", {
    Extends: JsqForm, initialize: function (selector, jsqType) {
        MianjiForm.Super.call(this, selector, jsqType);
        this.selector = selector;
        this.jsqType = jsqType;
        this.form = $(selector);
        this.unitPriceIns = new InputItem(selector + " .unit-price-item");
        this.areaIns = new InputItem(selector + " .area-item");
        this.fisrtAreaIns = new InputItem(selector + " .first-area-item");
        this.propertyIns = new PropertyRadioItem(selector + " .property-item");
        this.percentIns = new FormItem(selector + " .percent-item");
        this.yearIns = new FormItem(selector + " .year-item");
        this.percentSelect = new SelectBox("#mianjiPercent", this.percentIns);
        this.yearSelect = new SelectBox("#mianjiSelect", this.yearIns);
        if (this.jsqType == "fund" || this.jsqType == "com") {
            this.typeIns = new TypeRadioItem(selector + " .type-item")
        }
        this.personMax = 0;
        this.familyMax = 0;
        this._bindEvents()
    }, _bindEvents: function () {
        var _self = this;
        $(this).on("percent_init", function (e, res) {
            _self.percentSelect = new SelectBox("#mianjiPercent", _self.percentIns);
            if (res) {
                _self.personMax = parseFloat(res.data[0].personalLoan) * 10000;
                _self.familyMax = parseFloat(res.data[0].familyLoan) * 10000
            }
        });
        $(this.propertyIns).on("radio_change", function (e, data) {
            _self.handlePropertyChange("mianji", data)
        });
        this.generateBtn.on("tap", function () {
            var tabIndex = $(".result-tab").find(".current-item").index();
            if (tabIndex == 0) {
                _self.startCalu("benxi")
            } else {
                _self.startCalu("benjin")
            }
        });
        $(window).on("tab_changed", function (e, data) {
            if (data.index == 0) {
                if (data.rIndex == 0) {
                    if (_self.jsqType == "busi") {
                        _self.caluBusi("benxi")
                    } else {
                        if (_self.jsqType == "fund") {
                            _self.caluFund("benxi")
                        } else {
                            _self.caluCom("benxi")
                        }
                    }
                } else {
                    if (data.rIndex == 1) {
                        if (_self.jsqType == "busi") {
                            _self.caluBusi("benjin")
                        } else {
                            if (_self.jsqType == "fund") {
                                _self.caluFund("benjin")
                            } else {
                                _self.caluCom("benjin")
                            }
                        }
                    }
                }
            }
        });
        $("#mianjiSelect").on("change", function () {
            var yearTime = parseInt($(this).val() / 12);
            _self.setRateValue(yearTime)
        });
        if (this.jsqType == "fund") {
            this.areaIns.elem.find("input").on("input", function () {
                _self.setBaseInfo()
            });
            this.fisrtAreaIns.elem.find("input").on("input", function () {
                _self.setBaseInfo()
            })
        }
    }, setBaseInfo: function () {
        var _self = this;
        var units = this.propertyIns.getAttr("data-value"), area = this.areaIns.getValue(), earea = this.fisrtAreaIns.getValue();
        Tools.setBonusInfo($("#mianjiPercent"), units, area, earea, function (res) {
            _self.percentSelect = new SelectBox("#mianjiPercent", _self.percentIns);
            _self.personMax = parseFloat(res.data[0].personalLoan) * 10000;
            _self.familyMax = parseFloat(res.data[0].familyLoan) * 10000
        })
    }, startCalu: function (calutype) {
        var _self = this;
        if (_self.jsqType == "busi") {
            if (_self.unitPriceIns.checkInput() && _self.areaIns.checkInput()) {
                _self.caluBusi(calutype)
            }
        } else {
            if (_self.jsqType == "fund") {
                if (_self.unitPriceIns.checkInput() && _self.areaIns.checkInput()) {
                    if (_self.propertyIns.getAttr("data-value") == "2") {
                        if (!_self.fisrtAreaIns.checkInput()) {
                            return
                        }
                    }
                    _self.caluFund(calutype)
                }
            } else {
                if (_self.jsqType == "com") {
                    if (_self.unitPriceIns.checkInput() && _self.areaIns.checkInput()) {
                        _self.caluCom(calutype)
                    }
                }
            }
        }
    }, caluBusi: function (type) {
        Tools.removeMinheight();
        var zongjia = parseFloat(this.unitPriceIns.getValue()) * parseFloat(this.areaIns.getValue()), dkze = zongjia * (1 - parseFloat(this.percentIns.getAttr("data-value"))), dkqs = parseFloat(this.yearIns.getAttr("data-value")), yll = parseFloat(this.rateItemIns.getAttr("data-origin")) * parseFloat(this.rateItemIns.getAttr("data-value")) / 12;
        this.jsqResultWrapper.show();
        this.sf.show();
        this.calculate(this.jsqType, type, zongjia, dkze, dkqs, yll);
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }, caluFund: function (type) {
        Tools.removeMinheight();
        var zongjia = parseFloat(this.unitPriceIns.getValue()) * parseFloat(this.areaIns.getValue()), dkze = zongjia * (1 - parseFloat(this.percentIns.getAttr("data-value"))), dkqs = parseFloat(this.yearIns.getAttr("data-value")), yll = parseFloat(this.rateItemIns.getAttr("data-origin")) * parseFloat(this.rateItemIns.getAttr("data-value")) / 12;
        if (this.typeIns.getAttr("data-value") == "1") {
            if (dkze > this.personMax) {
                Tools.showConfirmDialog(this.personMax / 10000)
            }
        } else {
            if (this.typeIns.getAttr("data-value") == "2") {
                if (dkze > this.familyMax) {
                    Tools.showConfirmDialog(this.familyMax / 10000)
                }
            }
        }
        this.jsqResultWrapper.show();
        this.sf.show();
        this.calculate(this.jsqType, type, zongjia, dkze, dkqs, yll);
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }, caluCom: function (type) {
        Tools.removeMinheight();
        var zongjia = parseFloat(this.unitPriceIns.getValue()) * parseFloat(this.areaIns.getValue()), dkze = zongjia * (1 - parseFloat(this.percentIns.getAttr("data-value"))), dkqs = parseFloat(this.yearIns.getAttr("data-value")), yllB = parseFloat(this.bRateItemIns.getAttr("data-origin")) * parseFloat(this.bRateItemIns.getAttr("data-value")) / 12, yllF = parseFloat(this.fRateItemIns.getAttr("data-origin")) * parseFloat(this.fRateItemIns.getAttr("data-value")) / 12;
        var fundMoney = 0, busiMoney = 0;
        if (this.typeIns.getAttr("data-value") == "1") {
            if (dkze > this.personMax) {
                fundMoney = this.personMax;
                busiMoney = dkze - this.personMax
            } else {
                fundMoney = dkze;
                busiMoney = 0
            }
        } else {
            if (this.typeIns.getAttr("data-value") == "2") {
                if (dkze > this.familyMax) {
                    fundMoney = this.familyMax;
                    busiMoney = dkze - this.familyMax
                } else {
                    fundMoney = dkze;
                    busiMoney = 0
                }
            }
        }
        this.jsqResultWrapper.show();
        this.sf.show();
        this.calculateCom(type, zongjia, dkze, dkqs, yllF, yllB, fundMoney, busiMoney);
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }
});
var EduForm = Class("EduForm", {
    Extends: JsqForm, initialize: function (selector, jsqType) {
        EduForm.Super.call(this, selector, jsqType);
        this.selector = selector;
        this.jsqType = jsqType;
        this.form = $(selector);
        this.yearIns = new FormItem(selector + " .year-item");
        this.yearSelect = new SelectBox("#eduSelect", this.yearIns);
        if (this.jsqType == "fund" || this.jsqType == "com") {
            this.typeIns = new TypeRadioItem(selector + " .type-item")
        }
        if (this.jsqType == "com") {
            this.bMoneyIns = new InputItem(selector + " .b-money-item");
            this.fMoneyIns = new InputItem(selector + " .f-money-item")
        } else {
            this.moneyIns = new InputItem(selector + " .money-item")
        }
        this.personMax = 0;
        this.familyMax = 0;
        this._bindEvents()
    }, _bindEvents: function () {
        var _self = this;
        $("#eduSelect").on("change", function () {
            var yearTime = parseInt($(this).val() / 12);
            _self.setRateValue(yearTime)
        });
        $(this).on("percent_init", function (e, res) {
            if (res) {
                _self.personMax = parseFloat(res.data[0].personalLoan) * 10000;
                _self.familyMax = parseFloat(res.data[0].familyLoan) * 10000;
                $(".form-tips").html("公积金贷款最高额度：个人" + res.data[0].personalLoan + "万元，家庭" + res.data[0].familyLoan + "万元")
            }
        });
        $(window).on("tab_changed", function (e, data) {
            if (data.index == 2) {
                if (data.rIndex == 0) {
                    if (_self.jsqType == "busi") {
                        _self.caluBusi("benxi")
                    } else {
                        if (_self.jsqType == "fund") {
                            _self.caluFund("benxi")
                        } else {
                            _self.caluCom("benxi")
                        }
                    }
                } else {
                    if (data.rIndex == 1) {
                        if (_self.jsqType == "busi") {
                            _self.caluBusi("benjin")
                        } else {
                            if (_self.jsqType == "fund") {
                                _self.caluFund("benjin")
                            } else {
                                _self.caluCom("benjin")
                            }
                        }
                    }
                }
            }
        });
        this.generateBtn.on("tap", function () {
            var tabIndex = $(".result-tab").find(".current-item").index();
            if (tabIndex == 0) {
                _self.startCalu("benxi")
            } else {
                _self.startCalu("benjin")
            }
        })
    }, startCalu: function (calutype) {
        var _self = this;
        if (_self.jsqType == "busi") {
            if (_self.moneyIns.checkInput()) {
                _self.caluBusi(calutype)
            }
        } else {
            if (_self.jsqType == "fund") {
                if (_self.moneyIns.checkInput()) {
                    if (_self.typeIns.getAttr("data-value") == "1") {
                        if (_self.moneyIns.getValue() > (_self.personMax / 10000)) {
                            Tools.showTips("贷款金额不得超过上限" + (_self.personMax / 10000) + "万！")
                        } else {
                            _self.caluFund(calutype)
                        }
                    } else {
                        if (_self.typeIns.getAttr("data-value") == "2") {
                            if (_self.moneyIns.getValue() > (_self.familyMax / 10000)) {
                                Tools.showTips("贷款金额不得超过上限" + (_self.familyMax / 10000) + "万！")
                            } else {
                                _self.caluFund(calutype)
                            }
                        }
                    }
                }
            } else {
                if (_self.fMoneyIns.checkInput() && _self.bMoneyIns.checkInput()) {
                    _self.caluCom(calutype)
                }
            }
        }
    }, caluBusi: function (type) {
        var dkze = parseFloat(this.moneyIns.getValue()) * 10000, dkqs = parseFloat(this.yearIns.getAttr("data-value")), yll = parseFloat(this.rateItemIns.getAttr("data-origin")) * parseFloat(this.rateItemIns.getAttr("data-value")) / 12;
        Tools.removeMinheight();
        this.jsqResultWrapper.show();
        this.sf.hide();
        this.calculate(this.jsqType, type, 0, dkze, dkqs, yll);
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }, caluFund: function (type) {
        var zongjia = 0, dkze = parseFloat(this.moneyIns.getValue()) * 10000, dkqs = parseFloat(this.yearIns.getAttr("data-value")), yll = parseFloat(this.rateItemIns.getAttr("data-origin")) * parseFloat(this.rateItemIns.getAttr("data-value")) / 12;
        if (this.typeIns.getAttr("data-value") == "1") {
            if (dkze > this.personMax) {
                Tools.showConfirmDialog(this.personMax)
            }
        } else {
            if (this.typeIns.getAttr("data-value") == "2") {
                if (dkze > this.familyMax) {
                    Tools.showConfirmDialog(this.personMax)
                }
            }
        }
        Tools.removeMinheight();
        this.jsqResultWrapper.show();
        this.sf.hide();
        this.calculate(this.jsqType, type, zongjia, dkze, dkqs, yll);
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }, caluCom: function (type) {
        var zongjia = 0, dkzeF = parseFloat(this.fMoneyIns.getValue()) * 10000, dkzeB = parseFloat(this.bMoneyIns.getValue()) * 10000, dkze = dkzeF + dkzeB, dkqs = parseFloat(this.yearIns.getAttr("data-value")), yllB = parseFloat(this.bRateItemIns.getAttr("data-origin")) * parseFloat(this.bRateItemIns.getAttr("data-value")) / 12, yllF = parseFloat(this.fRateItemIns.getAttr("data-origin")) * parseFloat(this.fRateItemIns.getAttr("data-value")) / 12;
        var fundMoney = 0, busiMoney = 0;
        if (this.typeIns.getAttr("data-value") == "1") {
            if (dkzeF > this.personMax) {
                Tools.showTips("公积金贷款额度大于本市规定额度" + (this.personMax / 10000) + "万元");
                return
            } else {
                fundMoney = dkzeF;
                busiMoney = dkzeB
            }
        } else {
            if (this.typeIns.getAttr("data-value") == "2") {
                if (dkzeF > this.familyMax) {
                    Tools.showTips("公积金贷款额度大于本市规定额度" + (this.familyMax / 10000) + "万元");
                    return
                } else {
                    fundMoney = dkzeF;
                    busiMoney = dkzeB
                }
            }
        }
        Tools.removeMinheight();
        this.jsqResultWrapper.show();
        this.sf.hide();
        this.calculateCom(type, zongjia, dkze, dkqs, yllF, yllB, fundMoney, busiMoney);
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }
});
var AbilityForm = Class("AbilityForm", {
    Extends: Form, initialize: function (selector) {
        AbilityForm.Super.call(this, selector);
        this.selector = selector;
        this.form = $(selector);
        this.priceIns = new InputItem(selector + " .price-item");
        this.yearIns = new FormItem(selector + " .year-item");
        this.areaIns = new InputItem(selector + " .area-item");
        this.cityIns = new FormItem(selector + " .city-item");
        this.districtIns = new FormItem(selector + " .district-item");
        this.inIns = new InputItem(selector + " .in-item");
        this.outIns = new InputItem(selector + " .out-item");
        this.yearSelect = new SelectBox("#yearSelect", this.yearIns);
        this.generateBtn = this.form.find(".generate-btn");
        this.cityElem = $("#citySelect");
        this.districtElem = $("#districtSelect");
        this.cityData = [];
        var _self = this;
        this.cityPrefix = $("#cityPrefix").val();
        this.cityId = $("#cityId").val();
        $.getJSON("/calculator/getAreaAjax?callback=?", function (res) {
            _self.cityData = res.data;
            var cityStr = "", districtStr = "";
            for (var i = 0; i < res.data.length; i++) {
                cityStr += '<option value="' + res.data[i].cityId + '">' + res.data[i].cityName + "</option>"
            }
            _self.cityElem.html(cityStr);
            _self.citySelect = new SelectBox("#citySelect", _self.cityIns);
            _self.cityIns.setAttr("data-value", _self.cityId);
            $.ajax({
                url: "/" + _self.cityPrefix + "/loupan/getDistrictInfo?cityId=" + _self.cityId,
                type: "get",
                dataType: "json",
                success: function (res) {
                    for (var i = 0; i < res.data.length; i++) {
                        districtStr += '<option value="' + res.data[i].key + '">' + res.data[i].name + "</option>"
                    }
                    _self.districtElem.html(districtStr);
                    _self.districtSelect = new SelectBox("#districtSelect", _self.districtIns);
                    _self.districtIns.setAttr("data-value", "0")
                }
            })
        });
        this._bindEvents()
    }, _bindEvents: function () {
        var _self = this;
        var total = $(".ahead-p-money").eq(0), totalUnit = $(".ahead-p-money").eq(1);
        this.generateBtn.on("tap", function () {
            if (_self.priceIns.checkInput() && _self.areaIns.checkInput() && _self.inIns.checkInput() && _self.outIns.checkInput()) {
                var dkqs = parseInt(_self.yearIns.getAttr("data-value")), shoufu = parseFloat(_self.priceIns.getValue()) * 10000, area = parseFloat(_self.areaIns.getValue());
                var l = 0.049 / 12, a = Math.pow(1 + l, dkqs) - 1, b = Math.pow(1 + l, dkqs), n = a / l * b;
                var m = parseFloat(_self.outIns.getValue()) * a / (b * l) + shoufu;
                total.html(Tools.numFormat(Math.round(m)));
                totalUnit.html(Tools.numFormat(Math.round(m / area)));
                _self.jsqResultWrapper.show();
                $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top);
                Tools.removeMinheight();
                $.ajax({
                    url: "/" + _self.cityPrefix + "/loupan/filterajax/ajaxSearchForAssess",
                    type: "get",
                    data: "districtId=" + _self.districtIns.getAttr("data-value") + "&cityId=" + _self.cityIns.getAttr("data-value") + "&area=" + _self.areaIns.getValue() + "&price=" + parseInt(m / area) + "&pageSize=6",
                    dataType: "json",
                    success: function (res) {
                        if (res.errorCode == 0 && res.data.length > 0) {
                            $(".rc-loupan-list").html(_self.getTpl(res.data));
                            $(".jsq-rc-loupan").show()
                        } else {
                            $.ajax({
                                url: "/" + _self.cityPrefix + "/loupan/filterajax/ajaxSearchForAssess",
                                type: "get",
                                data: "districtId=0&cityId=" + _self.cityIns.getAttr("data-value") + "&area=" + _self.areaIns.getValue() + "&price=" + parseInt(m / area) + "&pageSize=6",
                                dataType: "json",
                                success: function (res) {
                                    if (res.errorCode == 0 && res.data.length > 0) {
                                        $(".rc-loupan-list").html(_self.getTpl(res.data));
                                        $(".jsq-rc-loupan").show()
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    }, getTpl: function (data) {
        var tpl = "";
        for (var i = 0; i < data.length; i++) {
            tpl += ['<a class="loupan-item" href="/' + this.cityPrefix + "/loupan/" + data[i].groupId + '">', '   <img src="' + data[i].projPicUrl + '">', '   <div class="loupan-info">', '       <p class="loupan-name">' + data[i].projName + "</p>", '       <p class="now-price"><span>' + data[i].showAllPriceDesc + "</span></p>", '       <p class="loupan-type">', "           <span>" + data[i].districtName + "</span>", "           <span>" + data[i].projAddress + "</span>", "       </p>", "   </div>", "</a>"].join("")
        }
        return tpl
    }
});
var FundPinguForm = Class("FundPinguForm", {
    Extends: Form, initialize: function (selector) {
        FundPinguForm.Super.call(this, selector);
        this.selector = selector;
        this.form = $(selector);
        this.monthIns1 = new InputItem(selector + " .month-price-item-1");
        this.monthIns2 = new InputItem(selector + " .month-price-item-2");
        this.monthPercentIns1 = new InputItem(selector + " .month-percent-item-1");
        this.monthPercentIns2 = new InputItem(selector + " .month-percent-item-2");
        this.moneyIns = new InputItem(selector + " .money-item");
        this.propertyIns = new RadioItem(selector + " .property-item");
        this.yearIns = new FormItem(selector + " .year-item");
        this.creditIns = new FormItem(selector + " .credit-item");
        this.yearSelect = new SelectBox("#yearSelect", this.yearIns);
        this.creditSelect = new SelectBox("#creditSelect", this.creditIns);
        this.data = {
            12: 845.8,
            24: 428.71,
            36: 289.71,
            48: 220.24,
            60: 178.58,
            72: 153.06,
            84: 133.26,
            96: 118.43,
            108: 106.92,
            120: 97.72,
            132: 90.21,
            144: 83.96,
            156: 78.68,
            168: 74.17,
            180: 70.27,
            192: 66.86,
            204: 63.87,
            216: 61.21,
            228: 58.84,
            240: 56.72,
            252: 54.8,
            264: 53.07,
            276: 51.49,
            288: 50.05,
            300: 48.73,
            312: 47.52,
            324: 46.4,
            336: 45.37,
            348: 44.41,
            360: 43.52
        };
        this._bindEvents()
    }, _bindEvents: function () {
        var _self = this;
        Tools.getBonusInfo("1", "", "", function (payment, res) {
            _self.maxPerson = res.data[0].personalLoan;
            _self.maxFamily = res.data[0].familyLoan
        });
        this.generateBtn.on("tap", function () {
            if (_self.monthIns1.checkInput() && _self.monthPercentIns1.checkInput()) {
                if (_self.monthIns2.getValue() != "" || _self.monthPercentIns2.getValue() != "") {
                    if (_self.monthIns2.checkInput() && _self.monthPercentIns2.checkInput()) {
                        _self.calu()
                    }
                } else {
                    _self.calu()
                }
            }
        })
    }, calu: function () {
        var num1 = parseFloat(this.monthIns1.getValue()), num2 = parseFloat(this.monthIns2.getValue()) || 0, percent1 = parseFloat(this.monthPercentIns1.getValue() / 100), percent2 = parseFloat(this.monthPercentIns2.getValue() / 100) || 0, money = parseFloat(this.moneyIns.getValue()) || 0, m = this.data[this.yearIns.getAttr("data-value")];
        var result1 = 0;
        if (num2 == 0) {
            result = ((num1 / percent1 - 1204) / m) * 10000
        } else {
            result = (((num1 / percent1) + (num2 / percent2) - 2408) / m) * 10000
        }
        if ((num1 / percent1) < 1204 || ((num1 / percent1) + (num2 / percent2)) < 2408) {
            Tools.showTips("人均月收入低于基本生活费（1204元），不符合贷款条件");
            return
        }
        Tools.removeMinheight();
        this.jsqResultWrapper.show();
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top);
        if (money == 0) {
            if (num2 == 0) {
                $(".ahead-p-money").html(Tools.numFormat(Math.min(result, this.maxPerson * 10000)))
            } else {
                $(".ahead-p-money").html(Tools.numFormat(Math.min(result, this.maxFamily * 10000)))
            }
        } else {
            if (num2 == 0) {
                $(".ahead-p-money").html(Tools.numFormat(Math.min(Math.min(result, this.maxPerson * 10000), money * 10000 * 0.8)))
            } else {
                $(".ahead-p-money").html(Tools.numFormat(Math.min(Math.min(result, this.maxFamily * 10000), money * 10000 * 0.8)))
            }
        }
    }
});
var AheadForm = Class("AheadForm", {
    Extends: Form, initialize: function (selector) {
        AheadForm.Super.call(this, selector);
        this.selector = selector;
        this.form = $(selector);
        this.calIns = new PropertyRadioItem(selector + " .cal-item");
        this.priceIns = new InputItem(selector + " .price-item");
        this.yearIns = new FormItem(selector + " .year-item");
        this.rateItemIns = new FormItem(selector + " .rate-item");
        this.firstTimeIns = new TimeItem(selector + " .first-time-item");
        this.aheadTimeIns = new TimeItem(selector + " .ahead-time-item");
        this.aheadTypeIns = new TypeRadioItem(selector + " .ahead-type-item");
        this.aheadMoneyIns = new InputItem(selector + " .ahead-money-item");
        this.yearSelect = new SelectBox("#yearSelect", this.yearIns);
        this.generateBtn = this.form.find(".generate-btn");
        this.onetimeResult = $("#oneTimeResult");
        this.partTimeResult = $("#partTimeResult");
        this.currentYearIns = null;
        this._initDate();
        this._bindEvents()
    }, _initDate: function () {
        $("#beginTime").date({
            dateDay: new Date().dateFormat("yyyy-MM-dd"),
            beginyear: 2000,
            endyear: parseInt(new Date().dateFormat("yyyy")) + 1,
            event: "click"
        });
        $("#endTime").date({
            dateDay: new Date().dateFormat("yyyy-MM-dd"),
            beginyear: new Date().dateFormat("yyyy"),
            endyear: parseInt(new Date().dateFormat("yyyy")) + 30,
            event: "click"
        });
        this.firstTimeIns.setValue(new Date().dateFormat("yyyy年MM月"));
        this.aheadTimeIns.setValue(new Date().dateFormat("yyyy年MM月"));
        this.firstTimeIns.setAttr("data-value", new Date().dateFormat("yyyyMM"));
        this.aheadTimeIns.setAttr("data-value", new Date().dateFormat("yyyyMM"))
    }, _bindEvents: function () {
        var _self = this;
        var yearConfimrBtn = $(".confirm-btn"), yearCancelBtn = $(".cancel-btn"), birthBox = $(".birth-box");
        yearConfimrBtn.on("click", function (e) {
            var y = $("#yearwrapper ul").find("li").eq((-yearScroll.y / 30) + 2).attr("data-y"), m = $("#monthwrapper ul").find("li").eq((-monthScroll.y / 30) + 2).attr("data-m");
            var showStr = y + "年" + (m.length == 1 ? ("0" + m) : m) + "月", dateStr = y + (m.length == 1 ? ("0" + m) : m);
            if (_self.currentYearIns == _self.firstTimeIns) {
                _self.firstTimeIns.setValue(showStr);
                _self.firstTimeIns.setAttr("data-value", dateStr)
            } else {
                if (_self.currentYearIns == _self.aheadTimeIns) {
                    _self.aheadTimeIns.setValue(showStr);
                    _self.aheadTimeIns.setAttr("data-value", dateStr)
                }
            }
            birthBox.addClass("hidden-dialog");
            e.preventDefault()
        });
        $(this.calIns).on("radio_change", function (e, data) {
            var year = parseInt(_self.yearIns.getAttr("data-value")) / 12;
            if (data.index == 0) {
                _self.rateItemIns.setValue("基准利率 (" + Tools.formatFloat(_self.getBaseRate(year).b, 2) + "%)");
                _self.rateItemIns.setAttr("data-origin", _self.getBaseRate(year).b / 100);
                _self.rateItemIns.setAttr("data-value", "1");
                _self.rateItemIns.elem.find(".arrow-right").css("display", "block")
            } else {
                _self.rateItemIns.setValue("基准利率 (" + Tools.formatFloat(_self.getBaseRate(year).f, 2) + "%)");
                _self.rateItemIns.setAttr("data-origin", _self.getBaseRate(year).f / 100);
                _self.rateItemIns.setAttr("data-value", "1");
                _self.rateItemIns.elem.find(".arrow-right").css("display", "none")
            }
        });
        $(this.aheadTypeIns).on("radio_change_type", function (e, res) {
            if (res.index == 1) {
                _self.aheadMoneyIns.show()
            } else {
                _self.aheadMoneyIns.hide()
            }
        });
        yearCancelBtn.on("click", function (e) {
            birthBox.addClass("hidden-dialog");
            e.preventDefault()
        });
        this.aheadTimeIns.elem.on("click", function () {
            _self.currentYearIns = _self.aheadTimeIns;
            birthBox.removeClass("hidden-dialog")
        });
        this.firstTimeIns.elem.on("click", function () {
            _self.currentYearIns = _self.firstTimeIns;
            birthBox.removeClass("hidden-dialog")
        });
        this.rateItemIns.elem.on("click", function (e) {
            if (_self.calIns.getAttr("data-value") == 2) {
                return
            }
            rateSlide.showOut(_self, 1, _self.rateItemIns.getAttr("data-value"));
            e.preventDefault();
            e.stopPropagation()
        });
        $(rateSlide).on("rate_selected", function (e, data) {
            var year = parseInt(_self.yearIns.getAttr("data-value")) / 12;
            if (data.isCustom == true) {
                var rNum = Math.round(parseFloat(data.num) * 1000) / 1000;
                _self.rateItemIns.setValue(data.text + "(" + (rNum * 100).toFixed(2) + "%)");
                _self.rateItemIns.setAttr("data-value", data.num);
                _self.rateItemIns.setAttr("data-origin", "1")
            } else {
                _self.rateItemIns.setAttr("data-origin", parseFloat(_self.getBaseRate(year).b) / 100);
                var origin = parseFloat(_self.rateItemIns.getAttr("data-origin")), rate = parseFloat(data.num), r = ((origin * rate) * 10000 / 100).toFixed(2);
                _self.rateItemIns.setValue(data.text + "(" + r + "%)");
                _self.rateItemIns.setAttr("data-value", data.num)
            }
        });
        $("#yearSelect").on("change", function () {
            var yearTime = parseInt($(this).val() / 12);
            _self.setRateValue(yearTime)
        });
        this.generateBtn.on("tap", function () {
            if (_self.priceIns.checkInput() && _self.firstTimeIns.checkInput() && _self.aheadTimeIns.checkInput()) {
                if (_self.aheadTypeIns.getAttr("data-value") == "2") {
                    if (!_self.aheadMoneyIns.checkInput()) {
                        return
                    }
                }
                var dkze = parseFloat(_self.priceIns.getValue()) * 10000, dkqs = parseInt(_self.yearIns.getAttr("data-value")), yll = parseFloat(_self.rateItemIns.getAttr("data-value")) * parseFloat(_self.rateItemIns.getAttr("data-origin")) / 12, firstY = parseInt(_self.firstTimeIns.getAttr("data-value").substr(0, 4)), firstM = parseInt(_self.firstTimeIns.getAttr("data-value").substr(4)), lastY = parseInt(_self.aheadTimeIns.getAttr("data-value").substr(0, 4)), lastM = parseInt(_self.aheadTimeIns.getAttr("data-value").substr(4)), tqhded = parseFloat(_self.aheadMoneyIns.getValue()) * 10000;
                var plusYear = dkqs / 12 * 100 + parseInt(_self.firstTimeIns.getAttr("data-value")), aheadTimeV = _self.aheadTimeIns.getAttr("data-value"), maxM = ((firstM - 1) < 10 ? ("0" + (firstM - 1).toString()) : (firstM - 1)).toString(), maxDate = firstM == 1 ? ((firstY + (dkqs / 12) - 1).toString() + "12") : (firstY + (dkqs / 12)).toString() + maxM;
                if (aheadTimeV < _self.firstTimeIns.getAttr("data-value")) {
                    Tools.showTips("提前还款时间必须晚于首次还款时间");
                    return
                } else {
                    if (aheadTimeV > maxDate) {
                        Tools.showTips("提前还款时间晚于您的最后还款日");
                        return
                    }
                }
                if (tqhded > dkze) {
                    Tools.showTips("提前还款金额不能大于贷款总额");
                    return
                }
                if (_self.aheadTypeIns.getValue() == "部分" && _self.aheadMoneyIns.checkInput()) {
                    _self.computePartTimeYear(dkze, dkqs, yll, firstY, firstM, lastY, lastM, tqhded);
                    _self.computePartTimeEdu(dkze, dkqs, yll, firstY, firstM, lastY, lastM, tqhded)
                } else {
                    _self.computeOneTime(dkze, dkqs, yll, firstY, firstM, lastY, lastM)
                }
            }
        })
    }, getBaseRate: function (yearTime) {
        if (yearTime == 1) {
            return {b: baseRateB.year1, f: baseRateF.year5}
        } else {
            if (yearTime > 1 && yearTime <= 3) {
                return {b: baseRateB.year3, f: baseRateF.year5}
            } else {
                if (yearTime > 3 && yearTime <= 5) {
                    return {b: baseRateB.year5, f: baseRateF.year5}
                } else {
                    if (yearTime > 5) {
                        return {b: baseRateB.yearMore, f: baseRateF.yearMore}
                    }
                }
            }
        }
    }, setRateValue: function (yearTime) {
        var baseRate = this.getBaseRate(yearTime), _self = this;
        if (_self.calIns.getAttr("data-value") == 1 || _self.calIns.getAttr("data-value") == null) {
            _self.rateItemIns.setValue("基准利率(" + parseFloat(baseRate.b).toFixed(2) + "%)");
            _self.rateItemIns.setAttr("data-value", "1");
            _self.rateItemIns.setAttr("data-origin", baseRate.b / 100)
        } else {
            _self.rateItemIns.setValue("基准利率(" + parseFloat(baseRate.f).toFixed(2) + "%)");
            _self.rateItemIns.setAttr("data-value", "1");
            _self.rateItemIns.setAttr("data-origin", baseRate.f / 100)
        }
    }, computeOneTime: function (dkze, dkqs, yll, firstY, firstM, lastY, lastM) {
        var beforeYhke = (dkze * yll * Math.pow(1 + yll, dkqs)) / (Math.pow(1 + yll, dkqs) - 1), beforeQs = (lastY - firstY) * 12 + lastM - firstM, yhke = beforeYhke * beforeQs, yhkbj = (beforeYhke - (dkze * yll)) * (Math.pow(1 + yll, beforeQs) - 1) / yll, ycxhk = (dkze - yhkbj) * (1 + yll), jylxzc = beforeYhke * dkqs - yhke - ycxhk;
        this.onetimeResult.find(".ahead-p-money").eq(0).html(Tools.numFormat(ycxhk));
        this.onetimeResult.find(".ahead-p-money").eq(1).html(Tools.numFormat(yhke));
        this.onetimeResult.find(".save-money .num").eq(0).html(Tools.numFormat(jylxzc));
        this.partTimeResult.hide();
        this.onetimeResult.show();
        Tools.removeMinheight();
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }, computePartTimeYear: function (dkze, dkqs, yll, firstY, firstM, lastY, lastM, tqhded) {
        var yyhke = (dkze * yll * Math.pow(1 + yll, dkqs)) / (Math.pow(1 + yll, dkqs) - 1), yzhhkY = (firstY * 12 + firstM + (dkqs / 12) - 2) / 12, yzhhkM = ((firstY * 12 + firstM + dkqs - 2) / 12) - 1, yhkqs = (lastY - firstY) * 12 + lastM - firstM, yhkze = yyhke * yhkqs, yhkbj = (yyhke - (dkze * yll)) * (Math.pow(1 + yll, yhkqs) - 1) / yll, yhklx = yhkze - yhkbj, gyhke = yyhke + tqhded, sybj = dkze - yhkbj - tqhded, syhkqs = parseInt(Math.log(yyhke / (yyhke - (sybj * yll))) / Math.log(1 + yll)), jylxzc = yyhke * (dkqs - yhkqs - syhkqs) - tqhded, tmp = parseInt(lastY + parseInt((syhkqs + lastM) / 12)), newY = (syhkqs + lastM) % 12 == 0 ? (tmp - 1) : tmp, newM = (syhkqs + lastM) % 12 == 0 ? 12 : (syhkqs + lastM) % 12, oldY = (firstM - 1) == 0 ? (firstY + dkqs / 12 - 1) : (firstY + dkqs / 12), oldM = (firstM - 1) == 0 ? 12 : (firstM - 1);
        if (tqhded > (dkze - yhkbj)) {
            Tools.showTips("您的提前还款额已足够还清剩余贷款，请选择一次还清");
            return
        }
        this.partTimeResult.find(".ahead-p-money").eq(0).html(Tools.numFormat(gyhke));
        this.partTimeResult.find(".detail-date").eq(0).html(oldY + "年" + (oldM.toString().length == 1 ? ("0" + oldM) : oldM) + "月");
        this.partTimeResult.find(".detail-date").eq(1).html(newY + "年" + (newM.toString().length == 1 ? ("0" + newM) : newM) + "月");
        this.partTimeResult.find(".detail-date").eq(2).html(Tools.numFormat(yyhke));
        this.partTimeResult.find(".detail-date").eq(3).html(Tools.numFormat(yyhke));
        this.partTimeResult.find(".save-money .num").eq(0).html(Tools.numFormat(jylxzc));
        this.partTimeResult.show();
        this.onetimeResult.hide();
        Tools.removeMinheight();
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }, computePartTimeEdu: function (dkze, dkqs, yll, firstY, firstM, lastY, lastM, tqhded) {
        var yyhke = (dkze * yll * Math.pow(1 + yll, dkqs)) / (Math.pow(1 + yll, dkqs) - 1), yzhhkY = (firstY * 12 + firstM + (dkqs / 12) - 2) / 12, yzhhkM = ((firstY * 12 + firstM + dkqs - 2) % 12) + 1, yhkqs = (lastY - firstY) * 12 + lastM - firstM, yhkze = yyhke * yhkqs, yhkbj = (yyhke - (dkze * yll)) * (Math.pow(1 + yll, yhkqs) - 1) / yll, yhklx = yhkze - yhkbj, gyhke = yyhke + tqhded, sybj = dkze - yhkbj - tqhded, syhkqs = dkqs - yhkqs, xyhke = (sybj * yll * Math.pow(1 + yll, syhkqs)) / (Math.pow(1 + yll, syhkqs) - 1), jylxzc = syhkqs * (yyhke - xyhke) - tqhded, oldY = (firstM - 1) == 0 ? (firstY + dkqs / 12 - 1) : (firstY + dkqs / 12), oldM = (firstM - 1) == 0 ? 12 : (firstM - 1);
        if (tqhded > (dkze - yhkbj)) {
            Tools.showTips("您的提前还款额已足够还清剩余贷款，请选择一次还清");
            return
        }
        this.partTimeResult.find(".ahead-p-money").eq(1).html(Tools.numFormat(gyhke));
        this.partTimeResult.find(".detail-date").eq(4).html(oldY + "年" + (oldM.toString().length == 1 ? ("0" + oldM) : oldM) + "月");
        this.partTimeResult.find(".detail-date").eq(5).html(oldY + "年" + (oldM.toString().length == 1 ? ("0" + oldM) : oldM) + "月");
        this.partTimeResult.find(".detail-date").eq(6).html(Tools.numFormat(yyhke));
        this.partTimeResult.find(".detail-date").eq(7).html(Tools.numFormat(xyhke));
        this.partTimeResult.find(".save-money .num").eq(1).html(Tools.numFormat(jylxzc));
        this.partTimeResult.show();
        this.onetimeResult.hide();
        Tools.removeMinheight();
        $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
    }
});
var TaxForm = Class("TaxForm", {
    Extends: Form, initialize: function (selector) {
        TaxForm.Super.call(this, selector);
        this.selector = selector;
        this.form = $(selector);
        this.priceIns = new InputItem(selector + " .price-item");
        this.areaIns = new InputItem(selector + " .area-item");
        this.generateBtn = this.form.find(".generate-btn");
        this._bindEvents()
    }, _bindEvents: function () {
        var _self = this;
        var total = $(".price-total").find(".value"), items = $(".tax-result-item"), yinhua = items.eq(0).find(".value"), gongzheng = items.eq(1).find(".value"), qi = items.eq(2).find(".value"), shouxu = items.eq(3).find(".value"), weituo = items.eq(4).find(".value");
        var taxResult = $(".jsq-tax-result");
        this.generateBtn.on("tap", function () {
            if (_self.priceIns.checkInput() && _self.areaIns.checkInput()) {
                Tools.removeMinheight();
                var tNum = _self.priceIns.getValue() * _self.areaIns.getValue(), poundage = 0;
                total.text(Tools.formatFloat(tNum, 2) + "元");
                yinhua.text("免征");
                gongzheng.text(Tools.formatFloat(tNum * 0.003, 2) + "元");
                if (parseInt(_self.areaIns.getValue()) <= 90) {
                    qi.text(Tools.formatFloat(tNum * 0.01, 2) + "元")
                } else {
                    qi.text(Tools.formatFloat(tNum * 0.015, 2) + "元")
                }
                if (parseFloat(_self.areaIns.getValue()) <= 120) {
                    poundage = 500
                } else {
                    if (parseFloat(_self.areaIns.getValue()) > 120 && parseFloat(_self.areaIns.getValue()) <= 5000) {
                        poundage = 1500
                    } else {
                        poundage = 5000
                    }
                }
                shouxu.text(poundage + "元");
                weituo.text(Tools.formatFloat(tNum * 0.003, 2) + "元");
                taxResult.show();
                $(window).scrollTop($(".jsq-result-wrapper").eq(0).position().top)
            }
        })
    }
});