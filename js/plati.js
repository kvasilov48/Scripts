//-----ticker----------------------------------------------------------------------------------------------------------------
function g(a){return document.getElementById(a)}
var rssticker_ajax=new Object()
var lastid = 0
var mins = 0
var secs = 0

var ua = (function () {
    var agent = navigator.userAgent.toLowerCase();
    return function (browser) {
        return agent.indexOf(browser) !== -1;
    };
}());

var browser = {
    ie: ua('msie'),
    chrome: ua('chrome'),
    webkit: ua('chrome') || ua('safari'),
    safari: ua('safari') && !ua('chrome'),
    mozilla: ua('mozilla') && !ua('chrome') && !ua('safari'),
    opera: ua('opera')
};

var rssticker_ajax;

rssticker_ajax.Start=function (divId, divClass, delay){
    document.write('<div class=blackvsmall style=display:none id="'+divId+'">»нициализаци¤...<span id="tickettimer"></span></div>')
    rssticker_ajax.tickerid=divId //ID of ticker div to display information
    rssticker_ajax.delay=delay //Delay between msg change, in miliseconds.
    rssticker_ajax.mouseoverBol=0
    rssticker_ajax.title='', rssticker_ajax.link='', rssticker_ajax.pubdate='', rssticker_ajax.amountstr='', rssticker_ajax.namerazdel=''
    rssticker_ajax.TickTimer()
    rssticker_ajax.rotatemsg()
}
rssticker_ajax.rotatemsg=function(){
    if (rssticker_ajax.mouseoverBol==1) {//if mouse is currently over ticker, do nothing (pause it)
        setTimeout(function(){rssticker_ajax.rotatemsg()}, 100)
    }
    else
    {
	    rssticker_ajax.getAjaxcontent()
	    setTimeout(function(){rssticker_ajax.rotatemsg()}, this.delay) //update container
    }
}
rssticker_ajax.TickTimer=function(){
	secs+=1;if(secs>=60){secs=0;mins+=1;}	
	var secs_str = '';var timestr = '';
	if (secs<10) secs_str = '0'+secs.toString();else secs_str = secs.toString();	
	if (mins>0) timestr+=(mins+' мин. '); timestr+=(secs_str+' сек.');	    
	$('#tickettimer').html(timestr);
	setTimeout(function () { rssticker_ajax.TickTimer() }, 1000);
}
function proceedData(xmldata, textStatus) {	
	if ("success"==textStatus && lastid != xmldata.getElementsByTagName("id")[0].firstChild.nodeValue) {
		mins = parseInt(xmldata.getElementsByTagName("minutes")[0].firstChild.nodeValue)
		secs = parseInt(xmldata.getElementsByTagName("seconds")[0].firstChild.nodeValue)
		lastid = xmldata.getElementsByTagName("id")[0].firstChild.nodeValue
		rssticker_ajax.title = xmldata.getElementsByTagName("name")[0].firstChild.nodeValue
		rssticker_ajax.link = xmldata.getElementsByTagName("link")[0].firstChild.nodeValue
		rssticker_ajax.amountstr = xmldata.getElementsByTagName("amount")[0].firstChild.nodeValue + ' $'
		rssticker_ajax.pubdate = xmldata.getElementsByTagName("date")[0].firstChild.nodeValue
		rssticker_ajax.namerazdel = xmldata.getElementsByTagName("namerazdel")[0].firstChild.nodeValue	    
		$("#" + rssticker_ajax.tickerid).mouseover(function () { rssticker_ajax.mouseoverBol = 1 });	    
		$("#" + rssticker_ajax.tickerid).mouseout(function () { rssticker_ajax.mouseoverBol = 0 });

		tickerLoc = rssticker_ajax.link	
		var timestr = '';var secs_str = '';
		if (secs<10) secs_str = '0'+secs.toString()
		else secs_str = secs.toString() 
		if (mins>0) timestr+=(mins+' мин. ')
		timestr+=(secs_str+' сек.')		
		var linktitle='<a class=link_good title="'+rssticker_ajax.namerazdel+'" href="'+rssticker_ajax.link+'">'+rssticker_ajax.title+'</a>' //  <span style=color:#000000;>' + rssticker_ajax.amountstr + '</span>'
		var feeddate=rssticker_ajax.pubdate
		var tickercontent='<div class=ticket>ѕоследн¤¤ продажа <span class=ticket_timer id=tickettimer>'+timestr+'</span> назад: '+linktitle+'</div>'	    
		$("#" + rssticker_ajax.tickerid).html(tickercontent);
	    $("#" + rssticker_ajax.tickerid).hide();	    
		setTimeout(function () { $("#" + rssticker_ajax.tickerid).show(); }, 400)
	}
}
rssticker_ajax.getAjaxcontent=function(){
    $.get("http://www.plati.ru/asp/sellticker.asp?rnd=" + Math.random(), proceedData);
}
rssticker_ajax.fromTicker=function(){
	document.location=tickerLoc
}
//--/ticker----------------------------------------------------------------------------------------------------------------
//--блокнот----------------------------------------------------------------------------------------------------------------
var noteId=0;
var noteMode=0;
function noteItem(id, mode){	
	noteId=id;noteMode=mode;	
    //if(g('img'+id).src.indexOf("_off")>-1) var action = "add"; else var action = "del";	
	if ($("#img" + id).attr("src").indexOf("_off") > -1) var action = "add"; else var action = "del";

	$.get("notebook.asp?idd="+id+"&action="+action+"&rnd=" + Math.random(), function (result) {
	    var note = $("#img" + noteId);
	    $("#cntgoods").html(result);
	    if (note.attr("src").indexOf("_off") > -1) {
	        note.attr("src", "images/notebook_on.gif");
	        if (1 == noteMode) $("#txt" + noteId).html(_langs[0]);
	    }
	    else {	        
	        note.attr("src", "images/notebook_off.gif");
	        if (1 == noteMode) $("#txt" + noteId).html(_langs[1]);
	    }
	});

	return false;
}
//--/блокнот---------------------------------------------------------------------------------------------------------------


function doVideo(obj) {
	ajxP = "ajax.asp";	
	$(obj).find('span').css('background-image', 'url(../images/loading2.gif)');
	$.get(ajxP,
        $.extend(obj.data('ft'), {
            action: 'expand',
            r: Math.random()
        }),
        function (data) {
            obj.parent().html(data);
        }
    );	
	return false;
}

//--цена <-> количество------------------------------------------------------------------------------------------------------
var c_curr;
var n_curr;
var s_curr;

function getSumma(id, n, c) {    
    c_curr = c;
    //alert("id" + "," + n + "," + c);
	if (n.length > 0) { if (n.indexOf('.') > 0) { $("#unit_cnt").val(n.replace('.', ',')); } }
	$.get("units_prices.asp?id=" + id + "&n=" + n + "&c=" + c + "&rnd=" + Math.random(), function (result) {	    
	    $("#unit_summa").val(result);
	});
}

function getCnt(id, s, c){
 if(c!=c_curr||s!=s_curr){
	c_curr = c;
	if (s.length > 0) { if (s.indexOf('.') > 0) { $("#unit_summa").val(s.replace('.', ',')); } }
	$.get("units_prices.asp?id="+id+"&s="+s+"&c="+c+"&rnd=" + Math.random(), function (result) {
	    $("#unit_cnt").val(result);
	});
 }	
}
//--/цена <-> количество-----------------------------------------------------------------------------------------------------


//--tooltip----------------------------------------------------------------------------------------------------------------
var viewpointer=true
var tooltip_messenger = _langs[2];
var offsetfromcursorX=12 
var offsetfromcursorY=10 
var offsetdivfrompointerX=10 
var offsetdivfrompointerY=14 
document.write('<div id="dhtmltooltip"></div>') //write out tooltip DIV
document.write('<img id="dhtmlpointer" src="images/arrow_tooltip.gif">') //write out pointer image
var ie=document.all
var nsc6=document.getElementById && !document.all
var enabletip=false
if (ie||nsc6)
var tipobj=document.all? document.all["dhtmltooltip"] : document.getElementById? document.getElementById("dhtmltooltip") : ""
var pointerobj=document.all? document.all["dhtmlpointer"] : document.getElementById? document.getElementById("dhtmlpointer") : ""
function ietruebody(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}
function fillTooltip(textData, textStatus){	
	if ("success"==textStatus){ 
			tipobj.innerHTML=textData;		
	}
}
function ddrivetip(thetext, thewidth, thecolor, theurl, theparam){
if (nsc6||ie){
viewpointer=true
tipobj.style.border="1px solid #000000"
tipobj.style.backgroundColor="#FCFEE4"
if (typeof thewidth!="undefined") tipobj.style.width=thewidth+"px"
if (typeof thecolor!="undefined" && thecolor!="") tipobj.style.backgroundColor=thecolor
if (typeof thetext!="undefined" && thetext!="") tipobj.innerHTML=thetext
else tipobj.innerHTML = "<img src=images/ajax-loader.gif>"
if (typeof theurl!="undefined" && theurl!="") $.get(theurl+"?"+theparam, fillTooltip);
enabletip=true
return false
}
}
function ddrivetip2(thetext, thewidth, thecolor, theurl, theparam){
if (nsc6||ie){
viewpointer=false
tipobj.style.border="none"
tipobj.style.backgroundColor="transparent"
if (typeof thewidth!="undefined") tipobj.style.width=thewidth+"px"
if (typeof thecolor!="undefined" && thecolor!="") tipobj.style.backgroundColor=thecolor
if (typeof thetext!="undefined" && thetext!="") tipobj.innerHTML=thetext
else tipobj.innerHTML = "<img src=images/ajax-loader.gif>"
if (typeof theurl!="undefined" && theurl!="") $.get(theurl+"?"+theparam, fillTooltip);
enabletip=true
return false
}
}
function positiontip(e){
if (enabletip){
var nondefaultpos=false
var curX=(nsc6)?e.pageX : event.clientX+ietruebody().scrollLeft;
var curY=(nsc6)?e.pageY : event.clientY+ietruebody().scrollTop;
//Find out how close the mouse is to the corner of the window
var winwidth=ie&&!window.opera? ietruebody().clientWidth : window.innerWidth-20
var winheight=ie&&!window.opera? ietruebody().clientHeight : window.innerHeight-20

var rightedge=ie&&!window.opera? winwidth-event.clientX-offsetfromcursorX : winwidth-e.clientX-offsetfromcursorX
var bottomedge=ie&&!window.opera? winheight-event.clientY-offsetfromcursorY : winheight-e.clientY-offsetfromcursorY

var leftedge=(offsetfromcursorX<0)? offsetfromcursorX*(-1) : -1000

//if the horizontal distance isn't enough to accomodate the width of the context menu
if (rightedge<tipobj.offsetWidth){
//move the horizontal position of the menu to the left by it's width
tipobj.style.left=curX-tipobj.offsetWidth+"px"
nondefaultpos=true
}
else if (curX<leftedge)
tipobj.style.left="5px"
else{
//position the horizontal position of the menu where the mouse is positioned
tipobj.style.left=curX+offsetfromcursorX-offsetdivfrompointerX+"px"
pointerobj.style.left=curX+offsetfromcursorX+"px"
}

//same concept with the vertical position
if (bottomedge<tipobj.offsetHeight){
tipobj.style.top=curY-tipobj.offsetHeight-offsetfromcursorY+"px"
nondefaultpos=true
}
else{
tipobj.style.top=curY+offsetfromcursorY+offsetdivfrompointerY+"px"
pointerobj.style.top=curY+offsetfromcursorY+"px"
}
tipobj.style.visibility="visible"
if (!nondefaultpos && viewpointer)
pointerobj.style.visibility="visible"
else
pointerobj.style.visibility="hidden"
}
}
function hideddrivetip(){
if (nsc6||ie){
enabletip=false
tipobj.style.visibility="hidden"
pointerobj.style.visibility="hidden"
tipobj.style.left="-1000px"
tipobj.style.backgroundColor=''
tipobj.style.width=''
}
}
document.onmousemove=positiontip
//--/tooltip---------------------------------------------------------------------------------------------------------------
var win=null;
function NewWindow(mypage,myname,w,h,scroll,pos){
if(pos=="random"){LeftPosition=(screen.width)?Math.floor(Math.random()*(screen.width-w)):100;TopPosition=(screen.height)?Math.floor(Math.random()*((screen.height-h)-75)):100;}
if(pos=="center"){LeftPosition=(screen.width)?(screen.width-w)/2:100;TopPosition=(screen.height)?(screen.height-h)/2:100;}
else if((pos!="center" && pos!="random") || pos==null){LeftPosition=0;TopPosition=20}
settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=yes';
win=window.open(mypage,myname,settings);}
function BySelected(element) {
	if( element.options[element.selectedIndex].value!='' ) {
		window.location = element.options[element.selectedIndex].value;
	}
}

function cBorder(element, mode) {
    if (mode == 1) g(element).style.borderColor = '#AAAAAA';
    else g(element).style.borderColor = '#EEEEEE';
}

//---autocomplete----
function formatItem(row) {        
        return '<div style=position:relative;float:left>' + row[0] + '</div>';
	}	
$(document).ready(function () {
    var _w = $(document).width();    
    if (_w < 1164) {
        $("#vktd").hide();
        if (_w < 1036) { $("#twittertd").hide(); } //$("#newstd").hide(); }
    }
	$('#searchstr').autocomplete('autocomplete.asp', {
	width: 250,
	minChars: 2,
    delay: 100,
	formatItem: formatItem,	
	selectFirst: false
	}).result(function(event, item) {	    
	    document.forms['searchform'].submit();
	});
});
//---/autocomplete----
