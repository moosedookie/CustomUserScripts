function addimg(e){var t=document.createElement("img");t.src=e,t.width="1px",t.height="1px",t.setAttribute("style","display:none"),document.body.appendChild(t)}function getdomain(e){return(e.indexOf("://")>-1?e.split("/")[2]:e.split("/")[0]).split(":")[0]}function getref(){var e=document.referrer;return getdomain(e)==getdomain(window.location.href)&&(e=""),e}function XReport(e,t){this.appid=e,this.objectlist=t,this.ref=getref(),this.send=function(){var e="https://rp.codon.vn/savefull.ashx";if(this.objectlist.length>1e3){var t=new XMLHttpRequest;t.open("POST",e,!0),t.withCredentials = true,t.timeout=7e3,t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("appid="+this.appid+"&ref="+encodeURIComponent(this.ref)+"&objlist="+encodeURIComponent(this.objectlist)+"&t=_"+(new Date).getTime())}else addimg(e+="?appid="+this.appid+"&ref="+encodeURI(this.ref)+"&objlist="+encodeURI(this.objectlist))}}String.prototype.replaceAll=function(e,t){return this.replace(new RegExp(e,"g"),t)};
function uuidv4() {return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "="); if (c_start != -1)
        { c_start = c_start + c_name.length + 1; c_end = document.cookie.indexOf(";", c_start); if (c_end == -1) c_end = document.cookie.length; return unescape(document.cookie.substring(c_start, c_end)); }
    }
    return "";
}
function setCookie(c_name, value, expiredays) {var exdate = new Date(); exdate.setDate(exdate.getDate() + expiredays); document.cookie = c_name + "=" + escape(value) +((expiredays == null) ? "" :";expires=" + exdate.toUTCString()) + ";path=/;";
}
class XMRP_ACT{
	constructor(appId,obj, debug){
		this.debug = debug,
		this.timeTotal= 0,
        this.collapseAfter= 35,
        this.elements = [],this.elements_mo = [];
        this.prev_mover;
        let e = this;
        for (let index = 0; index < obj.length; index++) {
            const item = obj[index];
            if(item.act==='sh'){
                item.ele.forEach(el => {
					if(typeof item.rpt!=='undefined' && item.rpt!==null)
                    {
						el.setAttribute('data-rpt',JSON.stringify(item.rpt));
					}
                    this.elements.push(el);
                });
            }else{
                if(item.act==='mo'){
                    item.ele.forEach(el => {
                        if(typeof item.rpt !=='undefined' && item.rpt!==null){
                            el.setAttribute('data-rpt',JSON.stringify(item.rpt));
                        }else{
                            if(typeof item.rpt_att !=='undefined'){
                                let data_rpt = [
                                    {
                                        "ai":el.getAttribute(item.rpt_att.ai),
                                        "oi":el.getAttribute(item.rpt_att.oi),
                                        "an":el.getAttribute(item.rpt_att.an),
                                        "main":((el.getAttribute(item.rpt_att.main)===null||el.getAttribute(item.rpt_att.main)==="")?0:parseInt(el.getAttribute(item.rpt_att.main))),
										"pl":JSON.parse(el.getAttribute(item.rpt_att.pl)),
                                        "cplx":((el.getAttribute(item.rpt_att.cplx)===null||el.getAttribute(item.rpt_att.cplx)==="")?0:parseInt(el.getAttribute(item.rpt_att.cplx))),
                                        "plx":JSON.parse(el.getAttribute(item.rpt_att.plx)),
                                        "avl":el.getAttribute(item.rpt_att.avl),
                                        "efl":el.getAttribute(item.rpt_att.efl)
                                    }
                                ];
                                el.removeAttribute(item.rpt_att.ai),
                                el.removeAttribute(item.rpt_att.oi),
                                el.removeAttribute(item.rpt_att.an),
                                el.removeAttribute(item.rpt_att.main),
								el.removeAttribute(item.rpt_att.pl),
                                el.removeAttribute(item.rpt_att.cplx),
                                el.removeAttribute(item.rpt_att.plx),
                                el.removeAttribute(item.rpt_att.avl),
                                el.removeAttribute(item.rpt_att.efl);
                                el.setAttribute('data-rpt',JSON.stringify(data_rpt));
                                el.addEventListener("mouseover",
                                    function(ev){
                                        e.mover(ev,e,el.getAttribute("data-timeout"),JSON.stringify(data_rpt))
                                    },true
                                );
                                el.addEventListener("mouseout",
                                    function(ev){
                                        e.mout(e)
                                    },true
                                );
                            }
                        }
                        this.elements_mo.push(el);
                    });
                }
            }
        }

        this.objReport = {};
        this.appId = appId;
	}
    init() {
        var e = this;
        if(this.elements.length>0){
            this.addEvent("load", window, function() {
                window.scrollTo(0, 0),
                e.positions = e.getPositions(e.elements, e.attrReport),
                e.addEvent("resize", window, function() {
                    e.positions = e.updatePositions(e.elements, e.positions, e.attrReport)
                }),
                e.addEvent("scroll", window, function() {
                    e.positions = e.updatePositions(e.elements, e.positions, e.attrReport)
                });
                var t = 0;
                e.addPageEvent(),
                e.startPageTimer();
            })
        }
    }
	init2() {
        var e = this; window.scrollTo(0, 0);
        if(e.elements.length>0){


                e.positions = e.getPositions(e.elements, e.attrReport),
				window.addEventListener("resize",function(){
					e.positions = e.updatePositions(e.elements, e.positions, e.attrReport)
				},true),
                window.addEventListener("scroll",function(){
                    e.positions = e.updatePositions(e.elements, e.positions, e.attrReport)
                },true);
                var t = 0;
                e.addPageEvent(),
                e.startPageTimer();

        }
    }
    addPageEvent() {
        var e, t, n = this;
        "undefined" != typeof document.hidden ? (e = "hidden",
        t = "visibilitychange") : "undefined" != typeof document.mozHidden ? (e = "mozHidden",
        t = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (e = "msHidden",
        t = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (e = "webkitHidden",
        t = "webkitvisibilitychange"),
        n.addEvent(t, document, function() {
            document[e] ? n.stopPageTimer() : n.startPageTimer()
        })
    }
    startPageTimer() {
        var e = this;
        this.timer = window.setInterval(function() {
            e.timeTotal += .1,
            e.checkPositions(e.positions)
        }, 100)
    }
    stopPageTimer() {
        window.clearInterval(this.timer),
        this.timer = null
    }
    getPositions(e, att) {
        var t = 0
            , n = {}
            , i = [];
        for (t = 0; t < e.length; t += 1)
            (n = e[t].getBoundingClientRect(),
            i.push({
                el: e[t],
                time: 0,
                viewable: 0,
                x: n.left,
                y: n.top,
                w: e[t].offsetWidth,
                h: e[t].offsetHeight - 4
            }));
        return i
    }
    updatePositions(e, t, att) {
        var n = 0
            , i = void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft
            , s = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
            , l = 0
            , o = {};
        for (n = 0; n < e.length; n += 1)
            (typeof att==='undefined' ?true:e[n].hasAttribute(att)) && (o = e[n].getBoundingClientRect(),
            t[l].x = o.left + i,
            t[l].y = o.top + s,
            t[l].w = e[n].offsetWidth,
            t[l].h = e[n].offsetHeight - 4,
            l += 1);
        return t
    }
    checkPositions(e) {
        var t = 0
            , n = 1
            , i = 0
            , s = 0
            , a = void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft
            , d = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
            , m = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            , r = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        for (t = 0; t < e.length; t += 1)
            i = 0,
            e[t].x < a && (i += a - e[t].x),
            e[t].x + e[t].w > a + m && (i += e[t].x + e[t].w - (a + m)),
            i > e[t].w && (i = e[t].w),
            window.innerWidth <= 735 || screen.width <= 735 ? (s = 0,
            e[t].y < d && (s += d - e[t].y),
            e[t].y + e[t].h + 75 > d + r && (s += e[t].y + e[t].h + 75 - (d + r)),
            s > e[t].h && (s = e[t].h)) : (s = 0,
            e[t].y < d && (s += d - e[t].y),
            e[t].y + e[t].h > d + r && (s += e[t].y + e[t].h - (d + r)),
            s > e[t].h && (s = e[t].h)),
            e[t].viewable = Math.round((e[t].w - i) * (e[t].h - s) / (e[t].w * e[t].h) * 100),
            n = 1,
            -1 !== e[t].el.className.indexOf("video-") && (n = 2),
            e[t].time > n ?
            (!e[t].el.hasAttribute("data-xmrp-s") ?( !e[t].el.setAttribute("data-xmrp-s", 1) , this.report(e[t])):'') : '',
            e[t].viewable >= 50 ? -1 !== e[t].el.className.indexOf("video-") ? -1 !== e[t].el.className.indexOf("playing") ? this.startTimer(e[t]) : e[t].timer && this.stopTimer(e[t]) : this.startTimer(e[t]) : e[t].timer && this.stopTimer(e[t]);
    }
    startTimer(e) {
        e.timer || (e.timer = window.setInterval(function() {
            e.time += .1
        }, 100))
    }
    convertTime(e) {
        var t = parseInt(e / 3600, 10) % 24
            , n = parseInt(e / 60, 10) % 60
            , i = Math.round(e % 60);
        return (10 > t ? "0" + t : t) + ":" + (10 > n ? "0" + n : n) + ":" + (10 > i ? "0" + i : i)
    }
    stopTimer(e) {
        window.clearInterval(e.timer),
        e.timer = null,
        !e.el.hasAttribute('data-xmrp-s') && (e.time = 0)
    }
    addEvent(e, t, n) {
        t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent ? t.attachEvent("on" + e, n) : t[e] = n
    }
    report(e){
        if(this.debug){
            console.log(this.objReport);
        }
        try{
            let data_rpt = e.el.getAttribute("data-rpt");
            this.XReport(this.appId,data_rpt,this)
        }catch(e){

        }
        //e.XReport(this.appId,this.objReport,e);

    }
    addimg(e){var t=document.createElement("img");t.src=e,t.width="1px",t.height="1px",t.setAttribute("style","display:none"),document.body.appendChild(t)}
    getdomain(e){return(e.indexOf("://")>-1?e.split("/")[2]:e.split("/")[0]).split(":")[0]}
    getref(b){var e=document.referrer;return b.getdomain(e)==b.getdomain(window.location.href)&&(e=""),e}
    XReport(e,t,b){
        this.appid=e,this.objectlist=t,this.ref=b.getref(b);

        var e="https://rp.codon.vn/savefull.ashx";

        var t=new XMLHttpRequest;t.open("POST",e,!0),t.timeout=7e3,t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),
            t.send("appid="+this.appid+"&ref="+encodeURIComponent(this.ref)+"&objlist="+encodeURIComponent(this.objectlist)+"&t=_"+(new Date).getTime())
        /*
        if(this.objectlist.length>1e3){
            var t=new XMLHttpRequest;t.open("POST",e,!0),t.timeout=7e3,t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),
            t.send("appid="+this.appid+"&ref="+encodeURIComponent(this.ref)+"&objlist="+encodeURIComponent(this.objectlist)+"&t=_"+(new Date).getTime())
        }
        else{
            b.addimg(e+="?appid="+this.appid+"&ref="+encodeURI(this.ref)+"&objlist="+encodeURI(this.objectlist))
        }
        */
    }
	XReportPost(e,t,b){
        this.appid=e,this.objectlist=t;

        var e="https://rp.codon.vn/savefull.ashx";

        var t=new XMLHttpRequest;t.open("POST",e,!0),t.withCredentials = true,t.timeout=7e3,t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.send("appid="+this.appid+"&ref="+encodeURIComponent(this.ref)+"&objlist="+encodeURIComponent(this.objectlist)+"&t=_"+(new Date).getTime())
    }
    uuidv4() {return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));}
    getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "="); if (c_start != -1)
            { c_start = c_start + c_name.length + 1; c_end = document.cookie.indexOf(";", c_start); if (c_end == -1) c_end = document.cookie.length; return unescape(document.cookie.substring(c_start, c_end)); }
        }
        return "";
    }
    setCookie(c_name, value, expiredays) {
        var exdate = new Date(); exdate.setDate(exdate.getDate() + expiredays); document.cookie = c_name + "=" + escape(value) +((expiredays == null) ? "" :";expires=" + exdate.toUTCString()) + ";path=/;";
    }
    mout(e){
        try{
            e.cancel_work(e);
        }catch(e){}
    }
    mover(event,e,timeout,data_rpt) {
        if (event.target === document.body || (e.prev_mover && e.prev_mover === event.target)) {
            return;
        }
        if (e.prev_mover) {
            e.prev_mover = undefined;
        }
        if(typeof timeout==='undefined'||timeout===null)
            timeout = 1000;
        if (event.target) {
            e.work(event.target, e, timeout,data_rpt);
        }
    }
    cancel_work(e){
        try{
            clearTimeout(e.xm_itv);
        }catch(e){}
    }
    work(ele, e, timeout, data_rpt){
         e.xm_itv  = setTimeout(function(){
            e.prev_mover = ele;
            if(e.debug)
                console.log(ele);
            e.XReport(e.appId,data_rpt,e)
        }, timeout);
    }
}
