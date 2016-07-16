/*! Zepto 1.1.6 (generated with Zepto Builder) - zepto event ajax form ie callbacks deferred selector touch assets - zeptojs.com/license */
var Zepto = function () {
    function t(t) {
        return null == t ? String(t) : V[Y.call(t)] || "object"
    }

    function e(e) {
        return "function" == t(e)
    }

    function n(t) {
        return null != t && t == t.window
    }

    function r(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
    }

    function i(e) {
        return "object" == t(e)
    }

    function o(t) {
        return i(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
    }

    function s(t) {
        return "number" == typeof t.length
    }

    function a(t) {
        return O.call(t, function (t) {
            return null != t
        })
    }

    function u(t) {
        return t.length > 0 ? j.fn.concat.apply([], t) : t
    }

    function c(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function l(t) {
        return t in L ? L[t] : L[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
    }

    function f(t, e) {
        return "number" != typeof e || Z[c(t)] ? e : e + "px"
    }

    function h(t) {
        var e, n;
        return k[t] || (e = M.createElement(t), M.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), k[t] = n), k[t]
    }

    function p(t) {
        return "children" in t ? D.call(t.children) : j.map(t.childNodes, function (t) {
            return 1 == t.nodeType ? t : void 0
        })
    }

    function d(t, e) {
        var n, r = t ? t.length : 0;
        for (n = 0; r > n; n++) {
            this[n] = t[n]
        }
        this.length = r, this.selector = e || ""
    }

    function m(t, e, n) {
        for (T in e) {
            n && (o(e[T]) || K(e[T])) ? (o(e[T]) && !o(t[T]) && (t[T] = {}), K(e[T]) && !K(t[T]) && (t[T] = []), m(t[T], e[T], n)) : e[T] !== E && (t[T] = e[T])
        }
    }

    function g(t, e) {
        return null == e ? j(t) : j(t).filter(e)
    }

    function v(t, n, r, i) {
        return e(n) ? n.call(t, r, i) : n
    }

    function y(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
    }

    function w(t, e) {
        var n = t.className || "", r = n && n.baseVal !== E;
        return e === E ? r ? n.baseVal : n : void (r ? n.baseVal = e : t.className = e)
    }

    function x(t) {
        try {
            return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? j.parseJSON(t) : t) : t
        } catch (e) {
            return t
        }
    }

    function b(t, e) {
        e(t);
        for (var n = 0, r = t.childNodes.length; r > n; n++) {
            b(t.childNodes[n], e)
        }
    }

    var E, T, j, C, S, N, A = [], P = A.concat, O = A.filter, D = A.slice, M = window.document, k = {}, L = {}, Z = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    }, R = /^\s*<(\w+|!)[^>]*>/, $ = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, F = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, q = /^(?:body|html)$/i, z = /([A-Z])/g, I = ["val", "css", "html", "text", "data", "width", "height", "offset"], W = ["after", "prepend", "before", "append"], H = M.createElement("table"), U = M.createElement("tr"), _ = {
        tr: M.createElement("tbody"),
        tbody: H,
        thead: H,
        tfoot: H,
        td: U,
        th: U,
        "*": M.createElement("div")
    }, B = /complete|loaded|interactive/, X = /^[\w-]*$/, V = {}, Y = V.toString, G = {}, J = M.createElement("div"), Q = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    }, K = Array.isArray || function (t) {
            return t instanceof Array
        };
    return G.matches = function (t, e) {
        if (!e || !t || 1 !== t.nodeType) {
            return !1
        }
        var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (n) {
            return n.call(t, e)
        }
        var r, i = t.parentNode, o = !i;
        return o && (i = J).appendChild(t), r = ~G.qsa(i, e).indexOf(t), o && J.removeChild(t), r
    }, S = function (t) {
        return t.replace(/-+(.)?/g, function (t, e) {
            return e ? e.toUpperCase() : ""
        })
    }, N = function (t) {
        return O.call(t, function (e, n) {
            return t.indexOf(e) == n
        })
    }, G.fragment = function (t, e, n) {
        var r, i, s;
        return $.test(t) && (r = j(M.createElement(RegExp.$1))), r || (t.replace && (t = t.replace(F, "<$1></$2>")), e === E && (e = R.test(t) && RegExp.$1), e in _ || (e = "*"), s = _[e], s.innerHTML = "" + t, r = j.each(D.call(s.childNodes), function () {
            s.removeChild(this)
        })), o(n) && (i = j(r), j.each(n, function (t, e) {
            I.indexOf(t) > -1 ? i[t](e) : i.attr(t, e)
        })), r
    }, G.Z = function (t, e) {
        return new d(t, e)
    }, G.isZ = function (t) {
        return t instanceof G.Z
    }, G.init = function (t, n) {
        var r;
        if (!t) {
            return G.Z()
        }
        if ("string" == typeof t) {
            if (t = t.trim(), "<" == t[0] && R.test(t)) {
                r = G.fragment(t, RegExp.$1, n), t = null
            } else {
                if (n !== E) {
                    return j(n).find(t)
                }
                r = G.qsa(M, t)
            }
        } else {
            if (e(t)) {
                return j(M).ready(t)
            }
            if (G.isZ(t)) {
                return t
            }
            if (K(t)) {
                r = a(t)
            } else {
                if (i(t)) {
                    r = [t], t = null
                } else {
                    if (R.test(t)) {
                        r = G.fragment(t.trim(), RegExp.$1, n), t = null
                    } else {
                        if (n !== E) {
                            return j(n).find(t)
                        }
                        r = G.qsa(M, t)
                    }
                }
            }
        }
        return G.Z(r, t)
    }, j = function (t, e) {
        return G.init(t, e)
    }, j.extend = function (t) {
        var e, n = D.call(arguments, 1);
        return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
            m(t, n, e)
        }), t
    }, G.qsa = function (t, e) {
        var n, r = "#" == e[0], i = !r && "." == e[0], o = r || i ? e.slice(1) : e, s = X.test(o);
        return t.getElementById && s && r ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : D.call(s && !r && t.getElementsByClassName ? i ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
    }, j.contains = M.documentElement.contains ? function (t, e) {
        return t !== e && t.contains(e)
    } : function (t, e) {
        for (; e && (e = e.parentNode);) {
            if (e === t) {
                return !0
            }
        }
        return !1
    }, j.type = t, j.isFunction = e, j.isWindow = n, j.isArray = K, j.isPlainObject = o, j.isEmptyObject = function (t) {
        var e;
        for (e in t) {
            return !1
        }
        return !0
    }, j.inArray = function (t, e, n) {
        return A.indexOf.call(e, t, n)
    }, j.camelCase = S, j.trim = function (t) {
        return null == t ? "" : String.prototype.trim.call(t)
    }, j.uuid = 0, j.support = {}, j.expr = {}, j.noop = function () {
    }, j.map = function (t, e) {
        var n, r, i, o = [];
        if (s(t)) {
            for (r = 0; r < t.length; r++) {
                n = e(t[r], r), null != n && o.push(n)
            }
        } else {
            for (i in t) {
                n = e(t[i], i), null != n && o.push(n)
            }
        }
        return u(o)
    }, j.each = function (t, e) {
        var n, r;
        if (s(t)) {
            for (n = 0; n < t.length; n++) {
                if (e.call(t[n], n, t[n]) === !1) {
                    return t
                }
            }
        } else {
            for (r in t) {
                if (e.call(t[r], r, t[r]) === !1) {
                    return t
                }
            }
        }
        return t
    }, j.grep = function (t, e) {
        return O.call(t, e)
    }, window.JSON && (j.parseJSON = JSON.parse), j.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
        V["[object " + e + "]"] = e.toLowerCase()
    }), j.fn = {
        constructor: G.Z,
        length: 0,
        forEach: A.forEach,
        reduce: A.reduce,
        push: A.push,
        sort: A.sort,
        splice: A.splice,
        indexOf: A.indexOf,
        concat: function () {
            var t, e, n = [];
            for (t = 0; t < arguments.length; t++) {
                e = arguments[t], n[t] = G.isZ(e) ? e.toArray() : e
            }
            return P.apply(G.isZ(this) ? this.toArray() : this, n)
        },
        map: function (t) {
            return j(j.map(this, function (e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function () {
            return j(D.apply(this, arguments))
        },
        ready: function (t) {
            return B.test(M.readyState) && M.body ? t(j) : M.addEventListener("DOMContentLoaded", function () {
                t(j)
            }, !1), this
        },
        get: function (t) {
            return t === E ? D.call(this) : this[t >= 0 ? t : t + this.length]
        },
        toArray: function () {
            return this.get()
        },
        size: function () {
            return this.length
        },
        remove: function () {
            return this.each(function () {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function (t) {
            return A.every.call(this, function (e, n) {
                return t.call(e, n, e) !== !1
            }), this
        },
        filter: function (t) {
            return e(t) ? this.not(this.not(t)) : j(O.call(this, function (e) {
                return G.matches(e, t)
            }))
        },
        add: function (t, e) {
            return j(N(this.concat(j(t, e))))
        },
        is: function (t) {
            return this.length > 0 && G.matches(this[0], t)
        },
        not: function (t) {
            var n = [];
            if (e(t) && t.call !== E) {
                this.each(function (e) {
                    t.call(this, e) || n.push(this)
                })
            } else {
                var r = "string" == typeof t ? this.filter(t) : s(t) && e(t.item) ? D.call(t) : j(t);
                this.forEach(function (t) {
                    r.indexOf(t) < 0 && n.push(t)
                })
            }
            return j(n)
        },
        has: function (t) {
            return this.filter(function () {
                return i(t) ? j.contains(this, t) : j(this).find(t).size()
            })
        },
        eq: function (t) {
            return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
        },
        first: function () {
            var t = this[0];
            return t && !i(t) ? t : j(t)
        },
        last: function () {
            var t = this[this.length - 1];
            return t && !i(t) ? t : j(t)
        },
        find: function (t) {
            var e, n = this;
            return e = t ? "object" == typeof t ? j(t).filter(function () {
                var t = this;
                return A.some.call(n, function (e) {
                    return j.contains(e, t)
                })
            }) : 1 == this.length ? j(G.qsa(this[0], t)) : this.map(function () {
                return G.qsa(this, t)
            }) : j()
        },
        closest: function (t, e) {
            var n = this[0], i = !1;
            for ("object" == typeof t && (i = j(t)); n && !(i ? i.indexOf(n) >= 0 : G.matches(n, t));) {
                n = n !== e && !r(n) && n.parentNode
            }
            return j(n)
        },
        parents: function (t) {
            for (var e = [], n = this; n.length > 0;) {
                n = j.map(n, function (t) {
                    return (t = t.parentNode) && !r(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
                })
            }
            return g(e, t)
        },
        parent: function (t) {
            return g(N(this.pluck("parentNode")), t)
        },
        children: function (t) {
            return g(this.map(function () {
                return p(this)
            }), t)
        },
        contents: function () {
            return this.map(function () {
                return this.contentDocument || D.call(this.childNodes)
            })
        },
        siblings: function (t) {
            return g(this.map(function (t, e) {
                return O.call(p(e.parentNode), function (t) {
                    return t !== e
                })
            }), t)
        },
        empty: function () {
            return this.each(function () {
                this.innerHTML = ""
            })
        },
        pluck: function (t) {
            return j.map(this, function (e) {
                return e[t]
            })
        },
        show: function () {
            return this.each(function () {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
            })
        },
        replaceWith: function (t) {
            return this.before(t).remove()
        },
        wrap: function (t) {
            var n = e(t);
            if (this[0] && !n) {
                var r = j(t).get(0), i = r.parentNode || this.length > 1
            }
            return this.each(function (e) {
                j(this).wrapAll(n ? t.call(this, e) : i ? r.cloneNode(!0) : r)
            })
        },
        wrapAll: function (t) {
            if (this[0]) {
                j(this[0]).before(t = j(t));
                for (var e; (e = t.children()).length;) {
                    t = e.first()
                }
                j(t).append(this)
            }
            return this
        },
        wrapInner: function (t) {
            var n = e(t);
            return this.each(function (e) {
                var r = j(this), i = r.contents(), o = n ? t.call(this, e) : t;
                i.length ? i.wrapAll(o) : r.append(o)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                j(this).replaceWith(j(this).children())
            }), this
        },
        clone: function () {
            return this.map(function () {
                return this.cloneNode(!0)
            })
        },
        hide: function () {
            return this.css("display", "none")
        },
        toggle: function (t) {
            return this.each(function () {
                var e = j(this);
                (t === E ? "none" == e.css("display") : t) ? e.show() : e.hide()
            })
        },
        prev: function (t) {
            return j(this.pluck("previousElementSibling")).filter(t || "*")
        },
        next: function (t) {
            return j(this.pluck("nextElementSibling")).filter(t || "*")
        },
        html: function (t) {
            return 0 in arguments ? this.each(function (e) {
                var n = this.innerHTML;
                j(this).empty().append(v(this, t, e, n))
            }) : 0 in this ? this[0].innerHTML : null
        },
        text: function (t) {
            return 0 in arguments ? this.each(function (e) {
                var n = v(this, t, e, this.textContent);
                this.textContent = null == n ? "" : "" + n
            }) : 0 in this ? this[0].textContent : null
        },
        attr: function (t, e) {
            var n;
            return "string" != typeof t || 1 in arguments ? this.each(function (n) {
                if (1 === this.nodeType) {
                    if (i(t)) {
                        for (T in t) {
                            y(this, T, t[T])
                        }
                    } else {
                        y(this, t, v(this, e, n, this.getAttribute(t)))
                    }
                }
            }) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : E
        },
        removeAttr: function (t) {
            return this.each(function () {
                1 === this.nodeType && t.split(" ").forEach(function (t) {
                    y(this, t)
                }, this)
            })
        },
        prop: function (t, e) {
            return t = Q[t] || t, 1 in arguments ? this.each(function (n) {
                this[t] = v(this, e, n, this[t])
            }) : this[0] && this[0][t]
        },
        data: function (t, e) {
            var n = "data-" + t.replace(z, "-$1").toLowerCase(), r = 1 in arguments ? this.attr(n, e) : this.attr(n);
            return null !== r ? x(r) : E
        },
        val: function (t) {
            return 0 in arguments ? this.each(function (e) {
                this.value = v(this, t, e, this.value)
            }) : this[0] && (this[0].multiple ? j(this[0]).find("option").filter(function () {
                return this.selected
            }).pluck("value") : this[0].value)
        },
        offset: function (t) {
            if (t) {
                return this.each(function (e) {
                    var n = j(this), r = v(this, t, e, n.offset()), i = n.offsetParent().offset(), o = {
                        top: r.top - i.top,
                        left: r.left - i.left
                    };
                    "static" == n.css("position") && (o.position = "relative"), n.css(o)
                })
            }
            if (!this.length) {
                return null
            }
            if (!j.contains(M.documentElement, this[0])) {
                return {top: 0, left: 0}
            }
            var e = this[0].getBoundingClientRect();
            return {
                left: e.left + window.pageXOffset,
                top: e.top + window.pageYOffset,
                width: Math.round(e.width),
                height: Math.round(e.height)
            }
        },
        css: function (e, n) {
            if (arguments.length < 2) {
                var r, i = this[0];
                if (!i) {
                    return
                }
                if (r = getComputedStyle(i, ""), "string" == typeof e) {
                    return i.style[S(e)] || r.getPropertyValue(e)
                }
                if (K(e)) {
                    var o = {};
                    return j.each(e, function (t, e) {
                        o[e] = i.style[S(e)] || r.getPropertyValue(e)
                    }), o
                }
            }
            var s = "";
            if ("string" == t(e)) {
                n || 0 === n ? s = c(e) + ":" + f(e, n) : this.each(function () {
                    this.style.removeProperty(c(e))
                })
            } else {
                for (T in e) {
                    e[T] || 0 === e[T] ? s += c(T) + ":" + f(T, e[T]) + ";" : this.each(function () {
                        this.style.removeProperty(c(T))
                    })
                }
            }
            return this.each(function () {
                this.style.cssText += ";" + s
            })
        },
        index: function (t) {
            return t ? this.indexOf(j(t)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function (t) {
            return t ? A.some.call(this, function (t) {
                return this.test(w(t))
            }, l(t)) : !1
        },
        addClass: function (t) {
            return t ? this.each(function (e) {
                if ("className" in this) {
                    C = [];
                    var n = w(this), r = v(this, t, e, n);
                    r.split(/\s+/g).forEach(function (t) {
                        j(this).hasClass(t) || C.push(t)
                    }, this), C.length && w(this, n + (n ? " " : "") + C.join(" "))
                }
            }) : this
        },
        removeClass: function (t) {
            return this.each(function (e) {
                if ("className" in this) {
                    if (t === E) {
                        return w(this, "")
                    }
                    C = w(this), v(this, t, e, C).split(/\s+/g).forEach(function (t) {
                        C = C.replace(l(t), " ")
                    }), w(this, C.trim())
                }
            })
        },
        toggleClass: function (t, e) {
            return t ? this.each(function (n) {
                var r = j(this), i = v(this, t, n, w(this));
                i.split(/\s+/g).forEach(function (t) {
                    (e === E ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t)
                })
            }) : this
        },
        scrollTop: function (t) {
            if (this.length) {
                var e = "scrollTop" in this[0];
                return t === E ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function () {
                    this.scrollTop = t
                } : function () {
                    this.scrollTo(this.scrollX, t)
                })
            }
        },
        scrollLeft: function (t) {
            if (this.length) {
                var e = "scrollLeft" in this[0];
                return t === E ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function () {
                    this.scrollLeft = t
                } : function () {
                    this.scrollTo(t, this.scrollY)
                })
            }
        },
        position: function () {
            if (this.length) {
                var t = this[0], e = this.offsetParent(), n = this.offset(), r = q.test(e[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : e.offset();
                return n.top -= parseFloat(j(t).css("margin-top")) || 0, n.left -= parseFloat(j(t).css("margin-left")) || 0, r.top += parseFloat(j(e[0]).css("border-top-width")) || 0, r.left += parseFloat(j(e[0]).css("border-left-width")) || 0, {
                    top: n.top - r.top,
                    left: n.left - r.left
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var t = this.offsetParent || M.body; t && !q.test(t.nodeName) && "static" == j(t).css("position");) {
                    t = t.offsetParent
                }
                return t
            })
        }
    }, j.fn.detach = j.fn.remove, ["width", "height"].forEach(function (t) {
        var e = t.replace(/./, function (t) {
            return t[0].toUpperCase()
        });
        j.fn[t] = function (i) {
            var o, s = this[0];
            return i === E ? n(s) ? s["inner" + e] : r(s) ? s.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function (e) {
                s = j(this), s.css(t, v(this, i, e, s[t]()))
            })
        }
    }), W.forEach(function (e, n) {
        var r = n % 2;
        j.fn[e] = function () {
            var e, i, o = j.map(arguments, function (n) {
                return e = t(n), "object" == e || "array" == e || null == n ? n : G.fragment(n)
            }), s = this.length > 1;
            return o.length < 1 ? this : this.each(function (t, e) {
                i = r ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null;
                var a = j.contains(M.documentElement, i);
                o.forEach(function (t) {
                    if (s) {
                        t = t.cloneNode(!0)
                    } else {
                        if (!i) {
                            return j(t).remove()
                        }
                    }
                    i.insertBefore(t, e), a && b(t, function (t) {
                        null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                    })
                })
            })
        }, j.fn[r ? e + "To" : "insert" + (n ? "Before" : "After")] = function (t) {
            return j(t)[e](this), this
        }
    }), G.Z.prototype = d.prototype = j.fn, G.uniq = N, G.deserializeValue = x, j.zepto = G, j
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function (t) {
    function e(e, n, r) {
        var i = t.Event(n);
        return t(e).trigger(i, r), !i.isDefaultPrevented()
    }

    function n(t, n, r, i) {
        return t.global ? e(n || y, r, i) : void 0
    }

    function r(e) {
        e.global && 0 === t.active++ && n(e, null, "ajaxStart")
    }

    function i(e) {
        e.global && !--t.active && n(e, null, "ajaxStop")
    }

    function o(t, e) {
        var r = e.context;
        return e.beforeSend.call(r, t, e) === !1 || n(e, r, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void n(e, r, "ajaxSend", [t, e])
    }

    function s(t, e, r, i) {
        var o = r.context, s = "success";
        r.success.call(o, t, s, e), i && i.resolveWith(o, [t, s, e]), n(r, o, "ajaxSuccess", [e, r, t]), u(s, e, r)
    }

    function a(t, e, r, i, o) {
        var s = i.context;
        i.error.call(s, r, e, t), o && o.rejectWith(s, [r, e, t]), n(i, s, "ajaxError", [r, i, t || e]), u(e, r, i)
    }

    function u(t, e, r) {
        var o = r.context;
        r.complete.call(o, e, t), n(r, o, "ajaxComplete", [e, r]), i(r)
    }

    function c() {
    }

    function l(t) {
        return t && (t = t.split(";", 2)[0]), t && (t == T ? "html" : t == E ? "json" : x.test(t) ? "script" : b.test(t) && "xml") || "text"
    }

    function f(t, e) {
        return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
    }

    function h(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data), e.data = void 0)
    }

    function p(e, n, r, i) {
        return t.isFunction(n) && (i = r, r = n, n = void 0), t.isFunction(r) || (i = r, r = void 0), {
            url: e,
            data: n,
            success: r,
            dataType: i
        }
    }

    function d(e, n, r, i) {
        var o, s = t.isArray(n), a = t.isPlainObject(n);
        t.each(n, function (n, u) {
            o = t.type(u), i && (n = r ? i : i + "[" + (a || "object" == o || "array" == o ? n : "") + "]"), !i && s ? e.add(u.name, u.value) : "array" == o || !r && "object" == o ? d(e, u, r, n) : e.add(n, u)
        })
    }

    var m, g, v = 0, y = window.document, w = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, x = /^(?:text|application)\/javascript/i, b = /^(?:text|application)\/xml/i, E = "application/json", T = "text/html", j = /^\s*$/, C = y.createElement("a");
    C.href = window.location.href, t.active = 0, t.ajaxJSONP = function (e, n) {
        if (!("type" in e)) {
            return t.ajax(e)
        }
        var r, i, u = e.jsonpCallback, c = (t.isFunction(u) ? u() : u) || "jsonp" + ++v, l = y.createElement("script"), f = window[c], h = function (e) {
            t(l).triggerHandler("error", e || "abort")
        }, p = {abort: h};
        return n && n.promise(p), t(l).on("load error", function (o, u) {
            clearTimeout(i), t(l).off().remove(), "error" != o.type && r ? s(r[0], p, e, n) : a(null, u || "error", p, e, n), window[c] = f, r && t.isFunction(f) && f(r[0]), f = r = void 0
        }), o(p, e) === !1 ? (h("abort"), p) : (window[c] = function () {
            r = arguments
        }, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + c), y.head.appendChild(l), e.timeout > 0 && (i = setTimeout(function () {
            h("timeout")
        }, e.timeout)), p)
    }, t.ajaxSettings = {
        type: "GET",
        beforeSend: c,
        success: c,
        error: c,
        complete: c,
        context: null,
        global: !0,
        xhr: function () {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: E,
            xml: "application/xml, text/xml",
            html: T,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, t.ajax = function (e) {
        var n, i, u = t.extend({}, e || {}), p = t.Deferred && t.Deferred();
        for (m in t.ajaxSettings) {
            void 0 === u[m] && (u[m] = t.ajaxSettings[m])
        }
        r(u), u.crossDomain || (n = y.createElement("a"), n.href = u.url, n.href = n.href, u.crossDomain = C.protocol + "//" + C.host != n.protocol + "//" + n.host), u.url || (u.url = window.location.toString()), (i = u.url.indexOf("#")) > -1 && (u.url = u.url.slice(0, i)), h(u);
        var d = u.dataType, v = /\?.+=\?/.test(u.url);
        if (v && (d = "jsonp"), u.cache !== !1 && (e && e.cache === !0 || "script" != d && "jsonp" != d) || (u.url = f(u.url, "_=" + Date.now())), "jsonp" == d) {
            return v || (u.url = f(u.url, u.jsonp ? u.jsonp + "=?" : u.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(u, p)
        }
        var w, x = u.accepts[d], b = {}, E = function (t, e) {
            b[t.toLowerCase()] = [t, e]
        }, T = /^([\w-]+:)\/\//.test(u.url) ? RegExp.$1 : window.location.protocol, S = u.xhr(), N = S.setRequestHeader;
        if (p && p.promise(S), u.crossDomain || E("X-Requested-With", "XMLHttpRequest"), E("Accept", x || "*/*"), (x = u.mimeType || x) && (x.indexOf(",") > -1 && (x = x.split(",", 2)[0]), S.overrideMimeType && S.overrideMimeType(x)), (u.contentType || u.contentType !== !1 && u.data && "GET" != u.type.toUpperCase()) && E("Content-Type", u.contentType || "application/x-www-form-urlencoded"), u.headers) {
            for (g in u.headers) {
                E(g, u.headers[g])
            }
        }
        if (S.setRequestHeader = E, S.onreadystatechange = function () {
                if (4 == S.readyState) {
                    S.onreadystatechange = c, clearTimeout(w);
                    var e, n = !1;
                    if (S.status >= 200 && S.status < 300 || 304 == S.status || 0 == S.status && "file:" == T) {
                        d = d || l(u.mimeType || S.getResponseHeader("content-type")), e = S.responseText;
                        try {
                            "script" == d ? (1, eval)(e) : "xml" == d ? e = S.responseXML : "json" == d && (e = j.test(e) ? null : t.parseJSON(e))
                        } catch (r) {
                            n = r
                        }
                        n ? a(n, "parsererror", S, u, p) : s(e, S, u, p)
                    } else {
                        a(S.statusText || null, S.status ? "error" : "abort", S, u, p)
                    }
                }
            }, o(S, u) === !1) {
            return S.abort(), a(null, "abort", S, u, p), S
        }
        if (u.xhrFields) {
            for (g in u.xhrFields) {
                S[g] = u.xhrFields[g]
            }
        }
        var A = "async" in u ? u.async : !0;
        S.open(u.type, u.url, A, u.username, u.password);
        for (g in b) {
            N.apply(S, b[g])
        }
        return u.timeout > 0 && (w = setTimeout(function () {
            S.onreadystatechange = c, S.abort(), a(null, "timeout", S, u, p)
        }, u.timeout)), S.send(u.data ? u.data : null), S
    }, t.get = function () {
        return t.ajax(p.apply(null, arguments))
    }, t.post = function () {
        var e = p.apply(null, arguments);
        return e.type = "POST", t.ajax(e)
    }, t.getJSON = function () {
        var e = p.apply(null, arguments);
        return e.dataType = "json", t.ajax(e)
    }, t.fn.load = function (e, n, r) {
        if (!this.length) {
            return this
        }
        var i, o = this, s = e.split(/\s/), a = p(e, n, r), u = a.success;
        return s.length > 1 && (a.url = s[0], i = s[1]), a.success = function (e) {
            o.html(i ? t("<div>").html(e.replace(w, "")).find(i) : e), u && u.apply(o, arguments)
        }, t.ajax(a), this
    };
    var S = encodeURIComponent;
    t.param = function (e, n) {
        var r = [];
        return r.add = function (e, n) {
            t.isFunction(n) && (n = n()), null == n && (n = ""), this.push(S(e) + "=" + S(n))
        }, d(r, e, n), r.join("&").replace(/%20/g, "+")
    }
}(Zepto), function (t) {
    var e, n = [];
    t.fn.remove = function () {
        return this.each(function () {
            this.parentNode && ("IMG" === this.tagName && (n.push(this), this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", e && clearTimeout(e), e = setTimeout(function () {
                n = []
            }, 60000)), this.parentNode.removeChild(this))
        })
    }
}(Zepto), function (t) {
    t.Callbacks = function (e) {
        e = t.extend({}, e);
        var n, r, i, o, s, a, u = [], c = !e.once && [], l = function (t) {
            for (n = e.memory && t, r = !0, a = o || 0, o = 0, s = u.length, i = !0; u && s > a; ++a) {
                if (u[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                    n = !1;
                    break
                }
            }
            i = !1, u && (c ? c.length && l(c.shift()) : n ? u.length = 0 : f.disable())
        }, f = {
            add: function () {
                if (u) {
                    var r = u.length, a = function (n) {
                        t.each(n, function (t, n) {
                            "function" == typeof n ? e.unique && f.has(n) || u.push(n) : n && n.length && "string" != typeof n && a(n)
                        })
                    };
                    a(arguments), i ? s = u.length : n && (o = r, l(n))
                }
                return this
            }, remove: function () {
                return u && t.each(arguments, function (e, n) {
                    for (var r; (r = t.inArray(n, u, r)) > -1;) {
                        u.splice(r, 1), i && (s >= r && --s, a >= r && --a)
                    }
                }), this
            }, has: function (e) {
                return !(!u || !(e ? t.inArray(e, u) > -1 : u.length))
            }, empty: function () {
                return s = u.length = 0, this
            }, disable: function () {
                return u = c = n = void 0, this
            }, disabled: function () {
                return !u
            }, lock: function () {
                return c = void 0, n || f.disable(), this
            }, locked: function () {
                return !c
            }, fireWith: function (t, e) {
                return !u || r && !c || (e = e || [], e = [t, e.slice ? e.slice() : e], i ? c.push(e) : l(e)), this
            }, fire: function () {
                return f.fireWith(this, arguments)
            }, fired: function () {
                return !!r
            }
        };
        return f
    }
}(Zepto), function (t) {
    function e(n) {
        var r = [["resolve", "done", t.Callbacks({
            once: 1,
            memory: 1
        }), "resolved"], ["reject", "fail", t.Callbacks({
            once: 1,
            memory: 1
        }), "rejected"], ["notify", "progress", t.Callbacks({memory: 1})]], i = "pending", o = {
            state: function () {
                return i
            }, always: function () {
                return s.done(arguments).fail(arguments), this
            }, then: function () {
                var n = arguments;
                return e(function (e) {
                    t.each(r, function (r, i) {
                        var a = t.isFunction(n[r]) && n[r];
                        s[i[1]](function () {
                            var n = a && a.apply(this, arguments);
                            if (n && t.isFunction(n.promise)) {
                                n.promise().done(e.resolve).fail(e.reject).progress(e.notify)
                            } else {
                                var r = this === o ? e.promise() : this, s = a ? [n] : arguments;
                                e[i[0] + "With"](r, s)
                            }
                        })
                    }), n = null
                }).promise()
            }, promise: function (e) {
                return null != e ? t.extend(e, o) : o
            }
        }, s = {};
        return t.each(r, function (t, e) {
            var n = e[2], a = e[3];
            o[e[1]] = n.add, a && n.add(function () {
                i = a
            }, r[1 ^ t][2].disable, r[2][2].lock), s[e[0]] = function () {
                return s[e[0] + "With"](this === s ? o : this, arguments), this
            }, s[e[0] + "With"] = n.fireWith
        }), o.promise(s), n && n.call(s, s), s
    }

    var n = Array.prototype.slice;
    t.when = function (r) {
        var i, o, s, a = n.call(arguments), u = a.length, c = 0, l = 1 !== u || r && t.isFunction(r.promise) ? u : 0, f = 1 === l ? r : e(), h = function (t, e, r) {
            return function (o) {
                e[t] = this, r[t] = arguments.length > 1 ? n.call(arguments) : o, r === i ? f.notifyWith(e, r) : --l || f.resolveWith(e, r)
            }
        };
        if (u > 1) {
            for (i = new Array(u), o = new Array(u), s = new Array(u); u > c; ++c) {
                a[c] && t.isFunction(a[c].promise) ? a[c].promise().done(h(c, s, a)).fail(f.reject).progress(h(c, o, i)) : --l
            }
        }
        return l || f.resolveWith(s, a), f.promise()
    }, t.Deferred = e
}(Zepto), function (t) {
    function e(t) {
        return t._zid || (t._zid = h++)
    }

    function n(t, n, o, s) {
        if (n = r(n), n.ns) {
            var a = i(n.ns)
        }
        return (g[e(t)] || []).filter(function (t) {
            return t && (!n.e || t.e == n.e) && (!n.ns || a.test(t.ns)) && (!o || e(t.fn) === e(o)) && (!s || t.sel == s)
        })
    }

    function r(t) {
        var e = ("" + t).split(".");
        return {e: e[0], ns: e.slice(1).sort().join(" ")}
    }

    function i(t) {
        return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
    }

    function o(t, e) {
        return t.del && !y && t.e in w || !!e
    }

    function s(t) {
        return x[t] || y && w[t] || t
    }

    function a(n, i, a, u, l, h, p) {
        var d = e(n), m = g[d] || (g[d] = []);
        i.split(/\s/).forEach(function (e) {
            if ("ready" == e) {
                return t(document).ready(a)
            }
            var i = r(e);
            i.fn = a, i.sel = l, i.e in x && (a = function (e) {
                var n = e.relatedTarget;
                return !n || n !== this && !t.contains(this, n) ? i.fn.apply(this, arguments) : void 0
            }), i.del = h;
            var d = h || a;
            i.proxy = function (t) {
                if (t = c(t), !t.isImmediatePropagationStopped()) {
                    t.data = u;
                    var e = d.apply(n, t._args == f ? [t] : [t].concat(t._args));
                    return e === !1 && (t.preventDefault(), t.stopPropagation()), e
                }
            }, i.i = m.length, m.push(i), "addEventListener" in n && n.addEventListener(s(i.e), i.proxy, o(i, p))
        })
    }

    function u(t, r, i, a, u) {
        var c = e(t);
        (r || "").split(/\s/).forEach(function (e) {
            n(t, e, i, a).forEach(function (e) {
                delete g[c][e.i], "removeEventListener" in t && t.removeEventListener(s(e.e), e.proxy, o(e, u))
            })
        })
    }

    function c(e, n) {
        return (n || !e.isDefaultPrevented) && (n || (n = e), t.each(j, function (t, r) {
            var i = n[t];
            e[t] = function () {
                return this[r] = b, i && i.apply(n, arguments)
            }, e[r] = E
        }), (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = b)), e
    }

    function l(t) {
        var e, n = {originalEvent: t};
        for (e in t) {
            T.test(e) || t[e] === f || (n[e] = t[e])
        }
        return c(n, t)
    }

    var f, h = 1, p = Array.prototype.slice, d = t.isFunction, m = function (t) {
        return "string" == typeof t
    }, g = {}, v = {}, y = "onfocusin" in window, w = {
        focus: "focusin",
        blur: "focusout"
    }, x = {mouseenter: "mouseover", mouseleave: "mouseout"};
    v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents", t.event = {
        add: a,
        remove: u
    }, t.proxy = function (n, r) {
        var i = 2 in arguments && p.call(arguments, 2);
        if (d(n)) {
            var o = function () {
                return n.apply(r, i ? i.concat(p.call(arguments)) : arguments)
            };
            return o._zid = e(n), o
        }
        if (m(r)) {
            return i ? (i.unshift(n[r], n), t.proxy.apply(null, i)) : t.proxy(n[r], n)
        }
        throw new TypeError("expected function")
    }, t.fn.bind = function (t, e, n) {
        return this.on(t, e, n)
    }, t.fn.unbind = function (t, e) {
        return this.off(t, e)
    }, t.fn.one = function (t, e, n, r) {
        return this.on(t, e, n, r, 1)
    };
    var b = function () {
        return !0
    }, E = function () {
        return !1
    }, T = /^([A-Z]|returnValue$|layer[XY]$)/, j = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    t.fn.delegate = function (t, e, n) {
        return this.on(e, t, n)
    }, t.fn.undelegate = function (t, e, n) {
        return this.off(e, t, n)
    }, t.fn.live = function (e, n) {
        return t(document.body).delegate(this.selector, e, n), this
    }, t.fn.die = function (e, n) {
        return t(document.body).undelegate(this.selector, e, n), this
    }, t.fn.on = function (e, n, r, i, o) {
        var s, c, h = this;
        return e && !m(e) ? (t.each(e, function (t, e) {
            h.on(t, n, r, e, o)
        }), h) : (m(n) || d(i) || i === !1 || (i = r, r = n, n = f), (i === f || r === !1) && (i = r, r = f), i === !1 && (i = E), h.each(function (f, h) {
            o && (s = function (t) {
                return u(h, t.type, i), i.apply(this, arguments)
            }), n && (c = function (e) {
                var r, o = t(e.target).closest(n, h).get(0);
                return o && o !== h ? (r = t.extend(l(e), {
                    currentTarget: o,
                    liveFired: h
                }), (s || i).apply(o, [r].concat(p.call(arguments, 1)))) : void 0
            }), a(h, e, i, r, n, c || s)
        }))
    }, t.fn.off = function (e, n, r) {
        var i = this;
        return e && !m(e) ? (t.each(e, function (t, e) {
            i.off(t, n, e)
        }), i) : (m(n) || d(r) || r === !1 || (r = n, n = f), r === !1 && (r = E), i.each(function () {
            u(this, e, r, n)
        }))
    }, t.fn.trigger = function (e, n) {
        return e = m(e) || t.isPlainObject(e) ? t.Event(e) : c(e), e._args = n, this.each(function () {
            e.type in w && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
        })
    }, t.fn.triggerHandler = function (e, r) {
        var i, o;
        return this.each(function (s, a) {
            i = l(m(e) ? t.Event(e) : e), i._args = r, i.target = a, t.each(n(a, e.type || e), function (t, e) {
                return o = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), o
    }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
        t.fn[e] = function (t) {
            return 0 in arguments ? this.bind(e, t) : this.trigger(e)
        }
    }), t.Event = function (t, e) {
        m(t) || (e = t, t = e.type);
        var n = document.createEvent(v[t] || "Events"), r = !0;
        if (e) {
            for (var i in e) {
                "bubbles" == i ? r = !!e[i] : n[i] = e[i]
            }
        }
        return n.initEvent(t, r, !0), c(n)
    }
}(Zepto), function (t) {
    t.fn.serializeArray = function () {
        var e, n, r = [], i = function (t) {
            return t.forEach ? t.forEach(i) : void r.push({name: e, value: t})
        };
        return this[0] && t.each(this[0].elements, function (r, o) {
            n = o.type, e = o.name, e && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || o.checked) && i(t(o).val())
        }), r
    }, t.fn.serialize = function () {
        var t = [];
        return this.serializeArray().forEach(function (e) {
            t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
        }), t.join("&")
    }, t.fn.submit = function (e) {
        if (0 in arguments) {
            this.bind("submit", e)
        } else {
            if (this.length) {
                var n = t.Event("submit");
                this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
            }
        }
        return this
    }
}(Zepto), function () {
    try {
        getComputedStyle(void 0)
    } catch (t) {
        var e = getComputedStyle;
        window.getComputedStyle = function (t) {
            try {
                return e(t)
            } catch (n) {
                return null
            }
        }
    }
}(), function (t) {
    function e(e) {
        return e = t(e), !(!e.width() && !e.height()) && "none" !== e.css("display")
    }

    function n(t, e) {
        t = t.replace(/=#\]/g, '="#"]');
        var n, r, i = a.exec(t);
        if (i && i[2] in s && (n = s[i[2]], r = i[3], t = i[1], r)) {
            var o = Number(r);
            r = isNaN(o) ? r.replace(/^["']|["']$/g, "") : o
        }
        return e(t, n, r)
    }

    var r = t.zepto, i = r.qsa, o = r.matches, s = t.expr[":"] = {
        visible: function () {
            return e(this) ? this : void 0
        }, hidden: function () {
            return e(this) ? void 0 : this
        }, selected: function () {
            return this.selected ? this : void 0
        }, checked: function () {
            return this.checked ? this : void 0
        }, parent: function () {
            return this.parentNode
        }, first: function (t) {
            return 0 === t ? this : void 0
        }, last: function (t, e) {
            return t === e.length - 1 ? this : void 0
        }, eq: function (t, e, n) {
            return t === n ? this : void 0
        }, contains: function (e, n, r) {
            return t(this).text().indexOf(r) > -1 ? this : void 0
        }, has: function (t, e, n) {
            return r.qsa(this, n).length ? this : void 0
        }
    }, a = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"), u = /^\s*>/, c = "Zepto" + +new Date;
    r.qsa = function (e, o) {
        return n(o, function (n, s, a) {
            try {
                var l;
                !n && s ? n = "*" : u.test(n) && (l = t(e).addClass(c), n = "." + c + " " + n);
                var f = i(e, n)
            } catch (h) {
                throw console.error("error performing selector: %o", o), h
            } finally {
                l && l.removeClass(c)
            }
            return s ? r.uniq(t.map(f, function (t, e) {
                return s.call(t, e, f, a)
            })) : f
        })
    }, r.matches = function (t, e) {
        return n(e, function (e, n, r) {
            return (!e || o(t, e)) && (!n || n.call(t, null, r) === t)
        })
    }
}(Zepto), function (t) {
    function e(t, e, n, r) {
        return Math.abs(t - e) >= Math.abs(n - r) ? t - e > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down"
    }

    function n() {
        l = null, h.last && (h.el.trigger("longTap"), h = {})
    }

    function r() {
        l && clearTimeout(l), l = null
    }

    function i() {
        a && clearTimeout(a), u && clearTimeout(u), c && clearTimeout(c), l && clearTimeout(l), a = u = c = l = null, h = {}
    }

    function o(t) {
        return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
    }

    function s(t, e) {
        return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
    }

    var a, u, c, l, f, h = {}, p = 750;
    t(document).ready(function () {
        var d, m, g, v, y = 0, w = 0;
        "MSGesture" in window && (f = new MSGesture, f.target = document.body), t(document).bind("MSGestureEnd", function (t) {
            var e = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
            e && (h.el.trigger("swipe"), h.el.trigger("swipe" + e))
        }).on("touchstart MSPointerDown pointerdown", function (e) {
            (!(v = s(e, "down")) || o(e)) && (g = v ? e : e.touches[0], e.touches && 1 === e.touches.length && h.x2 && (h.x2 = void 0, h.y2 = void 0), d = Date.now(), m = d - (h.last || d), h.el = t("tagName" in g.target ? g.target : g.target.parentNode), a && clearTimeout(a), h.x1 = g.pageX, h.y1 = g.pageY, m > 0 && 250 >= m && (h.isDoubleTap = !0), h.last = d, l = setTimeout(n, p), f && v && f.addPointer(e.pointerId))
        }).on("touchmove MSPointerMove pointermove", function (t) {
            (!(v = s(t, "move")) || o(t)) && (g = v ? t : t.touches[0], r(), h.x2 = g.pageX, h.y2 = g.pageY, y += Math.abs(h.x1 - h.x2), w += Math.abs(h.y1 - h.y2))
        }).on("touchend MSPointerUp pointerup", function (n) {
            (!(v = s(n, "up")) || o(n)) && (r(), h.x2 && Math.abs(h.x1 - h.x2) > 30 || h.y2 && Math.abs(h.y1 - h.y2) > 30 ? c = setTimeout(function () {
                h.el.trigger("swipe"), h.el.trigger("swipe" + e(h.x1, h.x2, h.y1, h.y2)), h = {}
            }, 0) : "last" in h && (30 > y && 30 > w ? u = setTimeout(function () {
                var e = t.Event("tap");
                e.cancelTouch = i, h.el.trigger(e), h.isDoubleTap ? (h.el && h.el.trigger("doubleTap"), h = {}) : a = setTimeout(function () {
                    a = null, h.el && h.el.trigger("singleTap"), h = {}
                }, 250)
            }, 0) : h = {}), y = w = 0)
        }).on("touchcancel MSPointerCancel pointercancel", i), t(window).on("scroll", i)
    }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (e) {
        t.fn[e] = function (t) {
            return this.on(e, t)
        }
    })
}(Zepto);
try {
    document.domain = "focus.cn"
} catch (e) {
}
var focusjs = focusjs || {};
focusjs.data = focusjs.data || {};
focusjs.utils = focusjs.utils || {};
focusjs.browser = focusjs.browser || {};
focusjs.event = focusjs.event || {};
focusjs.data.jsp = focusjs.data.jsp || {};
focusjs.log = focusjs.log || {};
focusjs.utils.ui = {
    reBackTopFn: function () {
        var _obj = $(".pubilc-back-top");
        $(window).scroll(function () {
            var _nowScrollTop = $(this).scrollTop();
            if (_nowScrollTop > 0) {
                _obj.show()
            } else {
                _obj.hide()
            }
        });
        _obj.on("click", function () {
            $("body, html").scrollTop("0")
        })
    }, reBackHomeFn: function () {
        var _obj = $(".public-back-home");
        $(window).scroll(function () {
            var _nowScrollTop = $(this).scrollTop();
            if (_nowScrollTop > 0) {
                _obj.css("display", "block")
            } else {
                _obj.css("display", "none")
            }
        })
    }
};
(function () {
    focusjs.utils.ui.reBackTopFn();
    focusjs.utils.ui.reBackHomeFn()
})();
focusjs.event = {
    START_EV: ("ontouchstart" in window || window.DocumentTouch) ? "touchstart" : "mousedown",
    MOVE_EVN: ("ontouchstart" in window || window.DocumentTouch) ? "touchmove" : "mousemove",
    END_EV: ("ontouchstart" in window || window.DocumentTouch) ? "touchend" : "mouseup",
    isMove: false
};
focusjs.event.checkMoveFn = function () {
    var _moveFlag = false;
    $(document).on(focusjs.event.START_EV, function () {
        _moveFlag = false
    });
    $(document).on(focusjs.event.MOVE_EVN, function () {
        _moveFlag = true
    });
    $(document).on(focusjs.event.END_EV, function () {
        if (_moveFlag === true) {
            focusjs.event.isMove = true
        } else {
            focusjs.event.isMove = false
        }
    })
}();
focusjs.utils.isInViewPortFn = function (ele) {
    var _top = ele.offsetTop, _left = ele.offsetLeft, _width = ele.offsetWidth, _height = ele.offsetHeight;
    while (ele.offsetParent) {
        ele = ele.offsetParent;
        _top += ele.offsetTop;
        _left += ele.offsetLeft
    }
    return (_top < (window.pageYOffset + window.innerHeight) && _left < (window.pageXOffset + window.innerWidth) && (_top + _height) > window.pageYOffset && (_left + _width) > window.pageXOffset)
};
focusjs.utils.lazyloadFn = function () {
    var _scrollValue = $(window).scrollTop();
    var _instances = $("img[data-src]").not(".lazyloaded"), _insArr = [];
    for (var i = 0; i < _instances.length; i++) {
        _insArr.push(_instances[i])
    }
    function _checkLoadFn() {
        if ($(window).scrollTop() - _scrollValue < 50 && $(window).scrollTop() - _scrollValue > -50) {
            return
        } else {
            _scrollValue = $(window).scrollTop()
        }
        var elms = _insArr;
        for (var i = 0, iLength = elms.length; i < iLength; i++) {
            if (focusjs.utils.isInViewPortFn(elms[i]) === true) {
                $(elms[i]).attr("src", $(elms[i]).attr("data-src")).addClass("lazyloaded");
                _insArr.splice(i, 1);
                if (_insArr.length <= 0) {
                    $(window).off("scroll")
                }
                break
            }
        }
    }

    $(window).on("scroll", _checkLoadFn)
};
focusjs.utils.getLocation = {
    debugEnable: true, geolocation: function (callback, wc) {
        var _writeCookie = wc || true;
        var _self = this;
        var retVal = {code: 0, city: undefined, origiCity: undefined};
        if (!callback) {
            callback = alert
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _self.getCityName(position.coords.longitude, position.coords.latitude, function (city, province) {
                    if (city == "error") {
                        retVal.code = -6;
                        callback(retVal)
                    } else {
                        retVal.origiCity = city;
                        _self.cityLocate(city, province, _writeCookie, function (dictCity) {
                            if (dictCity == "error") {
                                retVal.code = -7;
                                callback(retVal)
                            } else {
                                retVal.city = dictCity;
                                callback(retVal)
                            }
                        })
                    }
                })
            }, function (error) {
                retVal.code = -5;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        retVal.code = -2;
                        break;
                    case error.POSITION_UNAVAILABLE:
                        retVal.code = -3;
                        break;
                    case error.TIMEOUT:
                        retVal.code = -4;
                        break;
                    case error.UNKNOWN_ERROR:
                        break
                }
                callback(retVal)
            })
        } else {
            retVal.code = -1;
            callback(retVal)
        }
    }, getCityName: function (lng, lat, callback) {
        var _self = this;
        if (window.AMap == undefined) {
            callback("error")
        }
        if (isNaN(lng) || isNaN(lat)) {
            callback("error")
        }
        var _lnglatXY = new AMap.LngLat(lng, lat);
        AMap.service(["AMap.Geocoder"], function () {
            var _geo = new AMap.Geocoder({});
            _geo.getAddress(_lnglatXY, function (status, result) {
                if (status === "complete" && result.info === "OK") {
                    var _city;
                    var add = result.regeocode.addressComponent;
                    var _province = add.province;
                    if (_province == "北京市" || _province == "重庆市" || _province == "天津市" || _province == "上海市") {
                        _city = _province
                    } else {
                        _city = add.city
                    }
                    callback(_city, _province)
                } else {
                    callback("error")
                }
            })
        })
    }, cityLocate: function (city, province, wc, callback) {
        var _self = this;
        var _url = "/city/locate?preventCache=" + new Date().getTime();
        $.post(_url, {cityName: city, province: province, wc: wc}, function (data) {
            var _result = JSON.parse(data);
            if (_result && _result.errorCode == 0) {
                callback(_result.data.cityLocated)
            } else {
                callback("error")
            }
        })
    }
};
focusjs.utils.getCookieFn = function (cookieName) {
    var _name = cookieName + "=", _cArray = document.cookie.split(";");
    for (var i = 0; i < _cArray.length; i++) {
        var _cItem = _cArray[i];
        while (_cItem.charAt(0) === " ") {
            _cItem = _cItem.substring(1)
        }
        if (_cItem.indexOf(_name) !== -1) {
            return _cItem.substring(_name.length, _cItem.length)
        }
    }
    return ""
};
focusjs.utils.setCookieFn = function (cookieName, value, extime) {
    var _date = new Date();
    _date.setTime(_date.getTime() + extime);
    var _expires = "expires=" + _date.toUTCString();
    document.cookie = cookieName + "=" + value + "; " + _expires
};
focusjs.utils.queryByNameFn = function (name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var _regexS = "[\\?&]" + name + "=([^&#]*)";
    var _regex = new RegExp(_regexS);
    var _results = _regex.exec(url);
    if (_results == null) {
        return ""
    } else {
        return decodeURIComponent(_results[1].replace(/\+/g, " "))
    }
};
(function (exports) {
    $(document).delegate("[data-touchcolor]", focusjs.event.START_EV, function (e) {
        var _$this = $(this), _bgColor = _$this.attr("data-touchcolor");
        reColor = _$this.css("backgroundColor") || getComputedStyle(this).backgroundColor;
        if (!_$this.attr("data-revertcolor")) {
            _$this.attr("data-revertcolor", reColor)
        }
        _$this.css("backgroundColor", _bgColor)
    }).on(focusjs.event.MOVE_EVN, function (e) {
        $("[data-revertcolor]").each(function () {
            var _$this = $(this);
            _$this.css("backgroundColor", _$this.attr("data-revertcolor"));
            _$this.removeAttr("data-revertcolor")
        })
    }).delegate("[data-touchcolor]", focusjs.event.END_EV, function (e) {
        var _$this = $(this);
        _$this.css("backgroundColor", _$this.attr("data-revertcolor"));
        _$this.removeAttr("data-revertcolor")
    })
})(focusjs.event);
focusjs.browser.isAndroidFn = function () {
    if (window.navigator.userAgent.toLowerCase().indexOf("android") === -1) {
        return false
    } else {
        return true
    }
};
focusjs.browser.isUCFn = function () {
    if (window.navigator.userAgent.toLowerCase().indexOf("ucbrowser") === -1) {
        return false
    } else {
        return true
    }
};
focusjs.browser.isQQFn = function () {
    if (window.navigator.userAgent.toLowerCase().indexOf("mqqbrowser") === -1) {
        return false
    } else {
        return true
    }
};
focusjs.utils.setMinHeight = function () {
    var fixHeight = $("header").height() + $("footer").height() + $(".link_boxs").height();
    $("#mainContent").css("min-height", ($(window).height() - fixHeight) + "px")
};
focusjs.log.signupLog = function (param, callback) {
    var logIframe = document.createElement("iframe");
    logIframe.src = "http://house.focus.cn/focuskpi/" + param;
    logIframe.style.display = "none";
    logIframe.onload = function () {
        if (callback) {
            callback.call()
        }
    };
    document.body.appendChild(logIframe)
};
focusjs.utils.getVerifyCode = function (mobile, codeType, sucFn, errorFn, timeoutFn) {
    $.ajax({
        url: "http://login.focus.cn/captcha/getMobileCaptcha",
        type: "get",
        data: "mobile=" + mobile + "&type=" + codeType + "&callback=?",
        dataType: "script",
        processData: false,
        jsonpCallback: "getCodeCallBack",
        async: false,
        timeout: 5000,
        success: function (res) {
            if (res.errorCode === 0) {
                sucFn(res)
            } else {
                errorFn(res)
            }
        },
        error: function () {
            errorFn()
        },
        complete: function (xml, status) {
            if (status == "timeout") {
                if (timeoutFn) {
                    timeoutFn()
                }
            }
        }
    })
};
focusjs.utils.verifyCodeLogin = function (mobile, captcha, auto, sucFn, errorFn, timeoutFn) {
    $.ajax({
        url: "http://login.focus.cn/login/loginByCaptcha",
        type: "get",
        data: "mobile=" + mobile + "&captcha=" + captcha + "&auto=" + auto + "&callback=?",
        dataType: "script",
        processData: false,
        jsonpCallback: "loginCallBack",
        async: false,
        timeout: 5000,
        success: function (res) {
            if (res.errorCode === 0) {
                sucFn(res)
            } else {
                errorFn(res)
            }
        },
        error: function () {
            errorFn()
        },
        complete: function (xml, status) {
            if (status == "timeout") {
                if (timeoutFn) {
                    timeoutFn()
                }
            }
        }
    })
};
function splitUntil(result, url, target, remainFirst) {
    var min = url.length;
    for (var i = 0, len = url.length; i < len; i++) {
        if (target.indexOf(url.charAt(i)) != -1) {
            if (i < min) {
                min = i;
                break
            }
        }
    }
    result.got = url.substring(0, min);
    result.remained = (remainFirst ? url.substring(min) : url.substring(min + 1));
    return result
}
var urllib = {
    parse: function (url, default_scheme) {
        if (typeof url != "string") {
            return ["", "", "", "", "", ""]
        }
        var scheme = "", netloc = "", path = "", params = "", query = "", fragment = "", i = 0;
        i = url.indexOf(":");
        if (i > 0) {
            if (url.substring(0, i) == "http") {
                scheme = url.substring(0, i).toLowerCase();
                url = url.substring(i + 1)
            } else {
                for (i = 0, len = url.length; i < len; i++) {
                    if (scheme_chars.indexOf(url.charAt(i)) == -1) {
                        break
                    }
                }
                scheme = url.substring(0, i);
                url = url.substring(i + 1)
            }
        }
        if (!scheme && default_scheme) {
            scheme = default_scheme
        }
        var splited = {};
        if (url.substring(0, 2) == "//") {
            splitUntil(splited, url.substring(2), "/?#", true);
            netloc = splited.got;
            url = splited.remained
        }
        if (url.indexOf("#") != -1) {
            splitUntil(splited, url, "#");
            url = splited.got;
            fragment = splited.remained
        }
        if (url.indexOf("?") != -1) {
            splitUntil(splited, url, "?");
            url = splited.got;
            query = splited.remained
        }
        if (url.indexOf(";") != -1) {
            splitUntil(splited, url, ";");
            path = splited.got;
            params = splited.remained
        }
        if (!path) {
            path = url
        }
        return [scheme, netloc, path, params, query, fragment]
    }, unparse: function (parts) {
        if (!parts) {
            return ""
        }
        var url = "";
        if (parts[0]) {
            url += parts[0] + "://" + parts[1]
        }
        if (parts[1] && parts[2] && parts[2].indexOf("/") != 0) {
            url += "/"
        }
        url += parts[2];
        if (parts[3]) {
            url += ";" + parts[3]
        }
        if (parts[4]) {
            url += "?" + parts[4]
        }
        if (parts[5]) {
            url += "#" + parts[5]
        }
        return url
    }, join: function (base, url) {
        if (!base) {
            return url
        }
        if (!url) {
            return base
        }
        url = String(url);
        base = String(base);
        var bparts = this.parse(base);
        var parts = this.parse(url, bparts[0]);
        if (parts[0] != bparts[0]) {
            return url
        }
        if (parts[1]) {
            return this.unparse(parts)
        }
        parts[1] = bparts[1];
        if (parts[2].charAt(0) == "/") {
            return this.unparse(parts)
        }
        if (!parts[2] && !parts[3]) {
            parts[2] = bparts[2];
            parts[3] = bparts[3];
            if (!parts[4]) {
                parts[4] = bparts[4]
            }
            return this.unparse(parts)
        }
        var segments = bparts[2].split("/").slice(0, -1).concat(parts[2].split("/"));
        var i;
        if (segments[segments.length - 1] == ".") {
            segments[segments.length - 1] = ""
        }
        for (i = 0, l = segments.length; i < l; i++) {
            if (segments[i] == ".") {
                segments.splice(i, 1);
                i--
            }
        }
        while (true) {
            i = 1;
            n = segments.length - 1;
            while (i < n) {
                if (segments[i] == ".." && ["", ".."].indexOf(segments[i - 1]) == -1) {
                    segments.splice(i - 1, 2);
                    break
                }
                i++
            }
            if (i >= n) {
                break
            }
        }
        if (segments.length == 2 && segments[0] == "" && segments[1] == "..") {
            segments[segments.length - 1] = ""
        } else {
            if (segments.length >= 2 && segments[segments.length - 1] == "..") {
                segments.pop();
                segments.pop();
                segments.push("")
            }
        }
        parts[2] = segments.join("/");
        return this.unparse(parts)
    }
};
focusjs.utils.crosend = function (iframe, options) {
    var s = $.extend({}, options);
    try {
        var corsxhr = iframe.contentWindow.getTransport()
    } catch (e) {
    }
    s.crossDomain = false;
    s.xhr = function () {
        return corsxhr
    };
    s.xhr.cors = true;
    return $.ajax(s).always(function () {
        setTimeout(function () {
            $(iframe).attr("src", "javascript:;").remove()
        }, 1000)
    })
};
focusjs.utils.ajaxPostCros = function (options) {
    var parts = urllib.parse(options.url);
    $("<iframe>").hide().attr("src", urllib.unparse([parts[0], parts[1], "ajaxproxy.htm"])).load(function () {
        var jqXHR = focusjs.utils.crosend(this, options)
    }).appendTo(document.body)
};
$(document).ready(function () {
    var scriptUrl = "";
    if (focusjs.data.jsp.loadScript) {
        scriptUrl = focusjs.data.jsp.loadScript;
        var loadScript = document.createElement("script");
        loadScript.type = "text/javascript";
        loadScript.src = scriptUrl;
        document.body.appendChild(loadScript)
    }
});
(function () {
    focusjs.utils.setMinHeight()
})();
(function () {
    var backBtn = document.getElementsByClassName("public-header-back")[0], menuBtn = document.getElementsByClassName("public-header-menu")[0], menu = document.getElementsByClassName("public-navigator-container")[0];

    function menuClickFn() {
        if (menu.style.display === "none" || menu.style.display === "") {
            menu.style.display = "block"
        } else {
            menu.style.display = "none"
        }
    }

    function touchstartFn() {
        var _className = this.classList[1];
        if (_className) {
            this.classList.add(_className + "-touched")
        }
    }

    function touchendFn() {
        var _className = this.classList[1];
        if (_className) {
            this.classList.remove(_className + "-touched")
        }
    }

    if (menuBtn && menu) {
        var _hasTouch = "ontouchstart" in window || window.DocumentTouch, _startEnv = _hasTouch ? "touchstart" : "mousedown", _endEnv = _hasTouch ? "touchend" : "mouseup";
        menuBtn.addEventListener(_endEnv, menuClickFn, false);
        menuBtn.addEventListener(_startEnv, touchstartFn, false);
        menuBtn.addEventListener(_endEnv, touchendFn, false);
        if (backBtn) {
            backBtn.addEventListener(_startEnv, touchstartFn, false);
            backBtn.addEventListener(_endEnv, touchendFn, false)
        }
    }
})();
$(document).ready(function () {
    var END_EV = ("ontouchstart" in window || window.DocumentTouch) ? "touchend" : "mouseup", publicHeader = document.getElementsByClassName("public-header")[0] || document.getElementsByClassName("public-home-header")[0] || document.getElementsByClassName("public-qa-header")[0], headerMenuBtn = document.getElementsByClassName("public-header-menu")[0] || document.getElementsByClassName("public-header-menu-btn")[0], headerPopup = document.getElementsByClassName("public-header-popup")[0], publicCover = document.getElementsByClassName("public-home-new-cover")[0], backBtn = document.getElementsByClassName("public-header-back")[0];
    if (headerMenuBtn === undefined) {
        return
    }
    var menuClass;
    headerMenuBtn.addEventListener(END_EV, function (e) {
        menuClass = headerMenuBtn.className.split(" ");
        if (headerPopup.className === "public-header-popup") {
            showNav(menuClass)
        } else {
            hiddenNav(menuClass)
        }
        e.preventDefault()
    }, false);
    document.addEventListener(END_EV, function (e) {
        if (e.target.className.indexOf("public-home-new-cover") !== -1) {
            menuClass = headerMenuBtn.className.split(" ");
            hiddenNav(menuClass);
            e.preventDefault()
        }
    }, false);
    function showNav(menuClass) {
        var headerOffsetTop = publicHeader.offsetTop;
        if (headerOffsetTop > 0) {
            headerPopup.style.top = (headerOffsetTop + 44) + "px"
        }
        headerPopup.className = "public-header-popup public-header-popup-show";
        menuClass.push("public-header-menu-touched");
        headerMenuBtn.className = menuClass.join(" ");
        if (publicCover !== undefined) {
            publicCover.className = "public-home-new-cover public-header-popup-show"
        } else {
            var cover = document.createElement("div");
            document.body.appendChild(cover);
            cover.className = "public-home-new-cover public-header-popup-show";
            publicCover = document.getElementsByClassName("public-home-new-cover")[0]
        }
        if (backBtn) {
            backBtn.style.display = "none"
        }
    }

    function hiddenNav(menuClass) {
        headerPopup.className = "public-header-popup";
        publicCover.className = "public-home-new-cover";
        if (backBtn) {
            backBtn.style.display = "block"
        }
        var tmpArray = [];
        for (var i = 0; i < menuClass.length; i++) {
            if (menuClass[i] !== "public-header-menu-touched") {
                tmpArray.push(menuClass[i])
            }
        }
        headerMenuBtn.className = tmpArray.join(" ")
    }

    var bread = $(".public-breadcrumb-box"), breadItems = bread.find(".breadcrumb-item"), maxWidth = $(window).width() - 20, totalWidth = 0;

    function calWidth() {
        for (var i = 0; i < breadItems.length; i++) {
            totalWidth += breadItems.eq(i).width();
            if (totalWidth > maxWidth) {
                flag = true;
                breadItems.eq(i).css({width: (breadItems.eq(i).width() - (totalWidth - maxWidth)) + "px"})
            }
            if (i !== (breadItems.length - 1)) {
                totalWidth += 21
            }
        }
    }

    function resetWidth() {
        for (var i = 0; i < breadItems.length; i++) {
            breadItems.eq(i).css({width: "auto"})
        }
    }

    calWidth();
    $(window).on("orientationchange", function () {
        resetWidth();
        calWidth()
    })
});
(function () {
    var getCookieFn = function (cookieName) {
        var _name = cookieName + "=", _cArray = document.cookie.split(";");
        for (var i = 0; i < _cArray.length; i++) {
            var _cItem = _cArray[i];
            while (_cItem.charAt(0) === " ") {
                _cItem = _cItem.substring(1)
            }
            if (_cItem.indexOf(_name) !== -1) {
                return _cItem.substring(_name.length, _cItem.length)
            }
        }
        return ""
    };
    var moveFlag = false;
    $(document).on("touchstart", function () {
        moveFlag = false
    });
    $(document).on("touchmove", function () {
        moveFlag = true
    });
    $(document).on("touchend", "*[data-log-id]", function () {
        if (moveFlag) {
            return
        }
        var logUrl = "http://click.pv.focus.cn/pv_click.gif", logId = $(this).attr("data-log-id"), isDevice = $(this).attr("data-device"), device = "", phoneNumber = "", groupId = "", timer = new Date().getTime();
        var cookieInfo = getCookieFn("focus_mes_info");
        var subCookieInfo = "";
        if (cookieInfo != "") {
            if (cookieInfo.substring(0, 1) == '"') {
                subCookieInfo = cookieInfo.substring(1, (cookieInfo.length - 2))
            } else {
                subCookieInfo = cookieInfo
            }
        }
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf("iphone") !== -1) {
            device = "_/t_ios"
        } else {
            if (ua.indexOf("android") !== -1) {
                device = "_/t_android"
            } else {
                device = "_/t_else"
            }
        }
        if ($(this).attr("data-zhuji")) {
            if ($(this).attr("data-fenji").trim() != "") {
                phoneNumber = $(this).attr("data-zhuji") + "," + $(this).attr("data-fenji")
            } else {
                phoneNumber = $(this).attr("data-zhuji")
            }
        }
        if ($(this).attr("data-groupid")) {
            groupId = $(this).attr("data-groupid")
        }
        if (ua.indexOf("android") !== -1) {
            if ($(this).attr("data-fenji") === "") {
                sendLog($(this))
            } else {
                if (($(this).parents("#pubilc-phone-module").length > 0 || $(this).parents(".pop-layer").length > 0) && $(this).text().trim() == "立即拨打") {
                    sendLog($(this))
                }
                if ($(this).attr("data-fenji") == undefined) {
                    sendLog($(this))
                }
            }
        } else {
            sendLog($(this))
        }
        function sendLog(_obj) {
            var img = new Image();
            if (subCookieInfo == "") {
                img.src = logUrl + "?d?=" + logId + "_/t_" + timer + device
            } else {
                if (_obj.attr("data-fenji") == undefined) {
                    img.src = logUrl + "?d?=" + logId + "_/t_" + timer + device
                } else {
                    img.src = logUrl + "?d?=" + logId + "_/t_" + timer + device + "_/t_" + subCookieInfo + phoneNumber + "@@" + groupId
                }
            }
        }
    })
})();