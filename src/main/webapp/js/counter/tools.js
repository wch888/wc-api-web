var pie = {
    run: function (opts) {
        if (!opts.id) {
            throw new Error("must be canvas id.")
        }
        var canvas = document.getElementById(opts.id), ctx;
        if (canvas && (ctx = canvas.getContext("2d"))) {
            var noop = function () {
            };
            var before = opts.onBefore || noop;
            var after = opts.onAfter || noop;
            before(ctx);
            ctx.fillStyle = opts.color || "#f76220";
            var step = opts.step || 1;
            var delay = opts.delay || 5;
            var i = 0, rage = 360 * (opts.percent || 0);
            var sRage = -Math.PI * 1.3;
            var djs = function () {
                i = i + step;
                if (i <= rage) {
                    ctx.beginPath();
                    ctx.moveTo(canvas.width / 2, canvas.width / 2);
                    ctx.arc(canvas.width / 2, canvas.width / 2, canvas.width / 2 - 0.5, sRage, Math.PI * 1.6 * (i / 360) + sRage);
                    ctx.fill();
                    setTimeout(djs, delay)
                } else {
                    after(ctx)
                }
            };
            djs()
        }
    }
};
var Tools = {
    showConfirmDialog: function (num) {
        var dialog = ['<div class="confirm-d-cover" id="confrimD">', '	<div class="confirm-d">', '		<div class="confirm-d-inner">', '			<div class="confirm-content">', '				<p>结果显示，公积金贷款额度超过本市上限<span class="moeny">' + num + "万</span>,您可以选择组合贷款。</p>", "			</div>", '			<div class="btn-box">', '				<div class="btn-item cls-confirm">我知道了</div>', '				<a class="btn-item" href="/tools/zhdk">去组合贷款</a>', "			</div>", "		</div>", "	</div>", "</div>"].join("");
        var confrimD = $("#confrimD");
        if (confrimD.length > 0) {
            confrimD.css("display", "table");
            confrimD.find(".moeny").html(num + "万")
        } else {
            $(dialog).appendTo($("body"));
            confrimD = $("#confrimD")
        }
    }, showTips: function (text) {
        var tips = ['<div class="tips-d-cover" id="tipsD">', '	<div class="tips-d">', '		<div class="tips-inner">' + text + "</div>", "	</div>", "</div>"].join("");
        if ($("#tipsD").length > 0) {
            return
        } else {
            $(tips).appendTo($("body"));
            setTimeout(function () {
                $("#tipsD").remove()
            }, 2000)
        }
    }, setMinheight: function () {
        $(".main-wrapper").css("min-height", $(window).height() - $(".public-header").height() - $(".public-breadcrumb-bootm").height() - $("footer").height() + "px")
    }, removeMinheight: function () {
        $(".main-wrapper").css("min-height", 0)
    }, caluHkze: function (dkze, dkqs, yll) {
        return (dkze * dkqs * yll * Math.pow((1 + yll), dkqs)) / (Math.pow((1 + yll), dkqs) - 1)
    }, caluYuegong: function (dkze, dkqs, yll) {
        return (dkze * yll * Math.pow((1 + yll), dkqs) / (Math.pow((1 + yll), dkqs) - 1))
    }, caluHklx: function (dkze, dkqs, yll) {
        return (dkze * yll * (dkqs + 1)) / 2
    }, caluMonthNum: function (dkze, dkqs, yll, num) {
        var a = 1 / dkqs, b = (num - 1) / dkqs, c = (1 - b) * yll, d = a + c;
        return dkze * d
    }, caluBenxi: function (dkze, dkqs, yll) {
        var hkze = Tools.caluHkze(dkze, dkqs, yll), hklx = hkze - dkze, yuegong = Tools.caluYuegong(dkze, dkqs, yll), tips = yuegong * 2;
        return {hkze: hkze, hklx: hklx, yuegong: yuegong, tips: tips}
    }, caluBenjin: function (dkze, dkqs, yll) {
        var hklx = Tools.caluHklx(dkze, dkqs, yll), hkze = dkze + hklx, firstMonth = Tools.caluMonthNum(dkze, dkqs, yll, 1), lastMonth = Tools.caluMonthNum(dkze, dkqs, yll, dkqs), avgMonth = (firstMonth + lastMonth) / 2, downNum = Tools.caluMonthNum(dkze, dkqs, yll, dkqs - 1) - Tools.caluMonthNum(dkze, dkqs, yll, dkqs);
        return {
            hklx: hklx,
            hkze: hkze,
            firstMonth: firstMonth,
            lastMonth: lastMonth,
            avgMonth: avgMonth,
            downNum: downNum
        }
    }, runCircle: function (percent1, percent2, num1, num2, num3, fundMoney, busiMoney) {
        $(".jqm-round-circle").eq(1).attr("data-percent", percent1);
        $(".jqm-round-circle").eq(1).find(".num").html(Tools.numFormat(num1));
        if (fundMoney) {
            $(".jqm-round-circle").eq(1).find(".title-1").html('<p class="sub-title">商贷<span class="highlight">' + Tools.wanFormat(busiMoney) + '万</span></p><p class="sub-title">公积金<span class="highlight">' + Tools.wanFormat(fundMoney) + "万</span></p>");
            $(".jqm-round-circle").eq(1).find(".title").css("bottom", "-60px")
        } else {
            $(".jqm-round-circle").eq(1).find(".title").css("bottom", "-45px")
        }
        $(".jqm-round-circle").eq(2).attr("data-percent", percent2);
        $(".jqm-round-circle").eq(2).find(".num").html(Tools.numFormat(num2));
        $(".jqm-round-circle").eq(0).attr("data-percent", "100");
        $(".jqm-round-circle").eq(0).find(".num").html(Tools.numFormat(num3));
        $(".title-2").eq(0).html(Math.round(percent1 * 100) / 100 + "%");
        $(".title-2").eq(1).html(Math.round(percent2 * 100) / 100 + "%");
        var p = 0;
        var len = $(".jqm-round-wrap").length;
        for (p = 0; p < len; p++) {
            var k = $("#jqm-round-sector" + p).next(".jqm-round-circle").attr("data-percent");
            k = percentTofloat(k);
            pie.run({
                id: "jqm-round-sector" + p,
                percent: k,
                color: $("#jqm-round-sector" + p).attr("data-color"),
                onBefore: function (ctx) {
                    ctx.fillStyle = "#ececec";
                    ctx.beginPath();
                    ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.width / 2);
                    ctx.arc(ctx.canvas.width / 2, ctx.canvas.width / 2, ctx.canvas.width / 2, -Math.PI * 1.3, Math.PI * 0.3);
                    ctx.fill()
                }
            })
        }
        function percentTofloat(km) {
            return km / 100
        }
    }, wanFormat: function (num) {
        var r = parseInt(Math.round(num / 100)) / 100;
        return r
    }, numFormat: function (num) {
        if (num <= 10000) {
            var r2 = num.toString().split(".");
            if (r2.length > 1) {
                return r2[0] + "." + r2[1].substring(0, 2)
            } else {
                return num
            }
        }
        num = num.toString();
        num = num.replace(/,/g, "");
        if (num.length > 10) {
            num = num.substring(0, 10)
        }
        var re = /\d{1,3}(?=(\d{3})+$)/g;
        var n1 = num.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
            return s1.replace(re, "$&,") + s2
        });
        var r = n1.split(".");
        if (r.length > 1) {
            var r1 = r[0] + "." + r[1].substring(0, 2);
            return r[0]
        } else {
            return n1
        }
    }, hanziFormat: function (num) {
        var r = "";
        switch (num) {
            case 1:
                r = "一";
                break;
            case 2:
                r = "二";
                break;
            case 3:
                r = "三";
                break;
            case 4:
                r = "四";
                break;
            case 5:
                r = "五";
                break;
            case 6:
                r = "六";
                break;
            case 7:
                r = "七";
                break;
            case 8:
                r = "八";
                break;
            case 9:
                r = "九";
                break
        }
        return r
    }, rateFormat: function (num) {
        var num = parseFloat(num);
        if (num < 1) {
            if (num.toString().split(".")[1].length == 2) {
                return num * 100 + "折"
            } else {
                return num * 10 + "折"
            }
        } else {
            if (num > 1) {
                return num + "倍"
            } else {
                return "基准利率"
            }
        }
    }, rateValueFormat: function (num) {
        var num = Math.round(parseFloat(num * 100));
        return (num / 100).toFixed(2)
    }, getCount: function (type, callback) {
        $.ajax({
            url: "/calculator/getcount?type=" + type, type: "get", dataType: "json", success: function (res) {
                if (res.errorCode == 0) {
                    var count = parseInt(res.data);
                    callback(count)
                }
            }
        })
    }, getBusiPercent: function (units, bankIds, projType, soilUseYears, callback) {
        $.ajax({
            url: "/tools/searchBankInfo",
            type: "get",
            data: "units=" + units + "&bankIds=" + bankIds + "&projType=" + projType + "&soilUseYears=" + (projType == "198" ? soilUseYears : ""),
            dataType: "json",
            success: function (res) {
                callback(res.data[0].payment, res)
            }
        })
    }, setPercent: function (elem, payment, callback, res) {
        var opts = "";
        for (var i = payment; i < 10; i++) {
            var isSelected = i == payment ? '"selected"="selected"' : "";
            opts += '<option value="' + parseFloat(i / 10) + '" ' + isSelected + " >" + Tools.hanziFormat(i) + "成</option>"
        }
        elem.html(opts);
        elem.parents(".item-select-box").find(".select-value").html(Tools.hanziFormat(payment) + "成");
        elem.parents(".item-select-box").find(".select-value").attr("data-value", parseFloat(payment / 10));
        if (callback) {
            callback(res)
        }
    }, setPercentInfo: function (elem, units, bankIds, projType, soilUseYears, callback) {
        $.ajax({
            url: "/tools/searchBankInfo",
            type: "get",
            data: "units=" + units + "&bankIds=" + bankIds + "&projType=" + projType + "&soilUseYears=" + (projType == "198" ? soilUseYears : ""),
            dataType: "json",
            success: function (res) {
                Tools.setPercent(elem, res.data[0].payment, callback, res)
            }
        })
    }, setBonus: function (elem, payment, callback, res) {
        var opts = "";
        for (var i = payment; i < 10; i++) {
            var isSelected = i == payment ? '"selected"="selected"' : "";
            opts += '<option value="' + parseFloat(i / 10) + '" ' + isSelected + ">" + Tools.hanziFormat(i) + "成</option>"
        }
        elem.html(opts);
        elem.parents(".item-select-box").find(".select-value").html(Tools.hanziFormat(payment) + "成");
        elem.parents(".item-select-box").find(".select-value").attr("data-value", parseFloat(payment / 10));
        if (callback) {
            callback(res)
        }
    }, setBonusInfo: function (elem, units, area, earea, callback) {
        $.ajax({
            url: "/tools/searchBonusInfo",
            type: "get",
            data: "units=" + units + "&area=" + area + "&exisitingArea=" + earea,
            dataType: "json",
            success: function (res) {
                Tools.setBonus(elem, parseInt(res.data[0].payLow / 10), callback, res)
            }
        })
    }, getBonusInfo: function (units, area, earea, callback) {
        $.ajax({
            url: "/tools/searchBonusInfo",
            type: "get",
            data: "units=" + units + "&area=" + area + "&exisitingArea=" + earea,
            dataType: "json",
            success: function (res) {
                callback(parseInt(res.data[0].payLow / 10), res)
            }
        })
    }, getMax: function (callback) {
        $.ajax({
            url: "/tools/searchBonusInfo",
            type: "get",
            data: "units=" + 1 + "&area=&exisitingArea=",
            dataType: "json",
            success: function (res) {
                callback(res)
            }
        })
    }, formatFloat: function (num, s) {
        var r = Math.round(num * Math.pow(10, s)) / Math.pow(10, s);
        if (parseFloat(r) == parseInt(r)) {
            return r
        } else {
            return parseFloat(r).toFixed(2)
        }
    }, clearNoNum: function (obj) {
        obj.value = obj.value.replace(/[^\d.]/g, "");
        obj.value = obj.value.replace(/^\./g, "");
        obj.value = obj.value.replace(/\.{2,}/g, ".");
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
    }
};
Date.prototype.dateFormat = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return fmt
};
$(document).on("tap", ".cls-confirm", function () {
    $("#confrimD").css("display", "none")
});