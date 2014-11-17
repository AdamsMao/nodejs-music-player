$(document).ready(function(){
	//初始化播放器
	Player.init();
	var playStatus = 'playing';
	//var playStatus = 'playing';
	//点击歌曲时自动播放该曲目
	$('.songs').live('click', function(e) {		
		var n = $(this).attr('id');	
		Player.play(n);
		//设置标题
		$("#title").text(Player.playList[n].name);
	}); 
	//监听播放按键, 播放第一首歌曲
	$('#play').click(function() {
		if (Player.currentId==-1)
		{
			Player.play(0);	//播放第一首
			//设置标题
			$("#title").text(Player.playList[0].name);    
		}else if (playStatus=='playing')
		{
			//设置播放按钮变暂停图标
			$("#play").css("background-image","url(../img/pause.png)");
			Player.stop();		//暂停播放
			playStatus = 'paused';
		}else if (playStatus=='paused')
		{
			//设置播放按钮变播放图标
			$("#play").css("background-image","url(../img/play.png)");
			Player.play(Player.currentId);		//继续播放
			playStatus = 'playing';
		}		
	});
	//监听下一首按键, 播放下一首歌曲
	$('#next').click(function() {
		Player.playNext();
		//设置标题
		$("#title").text(Player.playList[Player.currentId].name);
	});
	//监听上一首按键, 播放上一首歌曲
	$('#pri').click(function() {
		Player.playPri();
		//设置标题
		$("#title").text(Player.playList[Player.currentId].name);
	});
	//绑定播放进度条
    bindProgress();
    //绑定进度条事件
    function bindProgress() {
		var audio = $(Player.audioObj);
		//绑定timeupdate事件，音频播放时间改变时触发
		audio.bind("timeupdate",function() {
			var cTime = audio[0].currentTime;
			var tTime = audio[0].duration;
			//设置内部滚动条长度
			setCurrTime(cTime,tTime) ;
			//自动播放下一首
			if (cTime >= tTime) {
				Player.playNext();
				//设置标题
				$("#title").text(Player.playList[Player.currentId].name);
			}
		});
    }
	//设置播放进度条, cTime表示当前音乐时间，tTime表示音乐总时间
    function setCurrTime(cTime,tTime) {
		var per = (tTime<=0)?0:cTime/tTime;
		var pPos = $("#progress").width()*per;     
		$("#pBar").css("left",pPos);
		$("#pgBar").width(pPos);
    }
	// ***** 窗口拖动 ***** start
	function gs2(d,a){
	    	if (d.currentStyle) { 
	      		var curVal=d.currentStyle[a]
	    	}else{ 
	      		var curVal=document.defaultView.getComputedStyle(d, null)[a]
	    	}
	    	return curVal;
	}	
	if (window.opera){ 
		document.write("<input type='hidden' id='Q' value=' '>"); 
	}		      
	var n = 500;
	var dragok = false;
	var y,x,d,dy,dx;		
	function move(e)
	{
		if (!e) e = window.event;
		if (dragok){
			d.style.left = dx + e.clientX - x + "px";
			d.style.top  = dy + e.clientY - y + "px";
			return false;
		}
	}		
	function down(e){
		if (!e) e = window.event;
		var temp = (typeof e.target != "undefined")?e.target:e.srcElement;
		if (temp.tagName != "HTML"|"BODY" && temp.className != "icontainer"){
			temp = (typeof temp.parentNode != "undefined")?temp.parentNode:temp.parentElement;
			if (temp.className != "icontainer") {
				temp = (typeof temp.parentNode != "undefined")?temp.parentNode:temp.parentElement;
			}
		}	
		if (temp.className == "icontainer"){
			if (window.opera){ 
				document.getElementById("Q").focus(); 
			}
			dragok = true;
			temp.style.zIndex = n++;
			d = temp;
			dx = parseInt(gs2(temp,"left"))|0;
			dy = parseInt(gs2(temp,"top"))|0;
			//dx = $("#container").position().left;
			//dy = $("#container").position().top;
			x = e.clientX;
			y = e.clientY;
			document.onmousemove = move;
			return false;
		}
	}
	function up(){
		dragok = false;
		document.onmousemove = null;
	}		
	document.onmousedown = down;
	document.onmouseup = up;
	// ***** 窗口拖动 ***** end
	//指定窗口在屏幕中的位置
	var iWidth = document.body.clientWidth;
	var iHeight = document.body.clientHeight;	
	$("#container").css({"left":iWidth/2-270,"top":iHeight/4});
	//监听点击+号按钮
	$("#upload").click(function(){
		window.location.href = '/upload';
	});


});

