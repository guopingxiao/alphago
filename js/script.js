

//1.先获得canvas画布
var chess = document.getElementById('chess');
var context = chess.getContext('2d');
var me = true;//创建人机对象，me为人，！me为机。

var chessArray =[];//初始化二维数组，0表示没有下，1表示人下的，2表示机下的
for (var i = 0,len = 15; i < len; i++) {
	chessArray[i] = [];
	for (var j = 0; j < len; j++) {
		chessArray[i][j] = 0;
	}
}




//3.画logo
// var logo = new Image();
// logo.src = "imgs/logo.png";
// logo.onload = function(){
// 	context.drawImage(logo,20,0,430,430);
// 	drawChessBoard();
// }

window.onload=function(){
	drawChessBoard();
	// oneStep(0,0,true);
	// oneStep(1,1,false);
}

//画棋盘
function drawChessBoard(){
	context.strokeStyle="#636363";
	for (var i = 0,len = 15;  i<len; i++) {
	context.moveTo(15 + 30*i,15);
	context.lineTo(15 + 30*i,435);
	context.stroke();
	context.moveTo(15,15 + 30*i);
	context.lineTo(435,15 + 30*i);
	context.stroke();
	}
}

//画棋子
/*i,j为棋子在棋盘上的索引，me为是否是人还是机，me为黑子，机为白子*/
function oneStep(i,j,me){
	context.beginPath();
	context.arc(15 + 30*i,15 + 30*j,12,0,2*Math.PI);
	context.closePath();
	//给棋子添加渐变色。由两个圆构造径向梯度 +2,-2是为了圆心偏移，更好看。
	var gradient = context.createRadialGradient(15 + 30*i+2,15 + 30*j-2,13,15 + 30*i+2,15 + 30*j-2,0);
	if(me){
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636766");
	}else{
		gradient.addColorStop(0,"#E1E1E1");
		gradient.addColorStop(1,"#FAFAFA");
	}
	
	context.fillStyle = gradient;
	context.fill();//stroke()描边，fill（）填充
}

//落子实现，bug是下了白棋之后，在下黑棋，怎么让它不重复，二维数组记录下子过程。
chess.onclick = function(e){
	//计算点击的位置坐标
	var x = e.offsetX;
	var y = e.offsetY;
	//计算索引
	var i = Math.floor(x/30);
	var j  = Math.floor(y/30);
	if (chessArray[i][j] == 0) {
		oneStep(i,j,me);
		if (me) {
			chessArray[i][j] = 1;
		}else{
			chessArray[i][j] = 2;
		}
		me = !me;		
	}

}

