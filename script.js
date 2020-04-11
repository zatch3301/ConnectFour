var player1 = prompt("Player1 : Enter your name");
var player1color =  'rgb(86, 151, 255)';

var player2 = prompt("Player2 : Enter your name");
var player2color = 'rgb(237, 45, 73)';

var game_on=true;
var table = $('table tr');

function reportwin(rowNum,colNum){
	console.log("You now starting at this row,col");
	console.log(rowNum);
	console.log(colNum);
}

function changeColor(rowIndex,colIndex,color){
	return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);

}

function returnColor(rowIndex,colIndex){
	return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
	
}

function checkBottom(colIndex){
	var colorReport=returnColor(5,colIndex);
	for(var row=5;row>-1;row--){
		colorReport=returnColor(row,colIndex);
		if(colorReport === 'rgb(128, 128, 128)'){
			return row
		}
	}
}

function colorMatchCheck(one,two,three,four){
	return(one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

function horizontalWinCheck(){
	for(var row=0; row<6; row++){
		for(var col=0;col<4;col++){
			if(colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
				console.log("horizontal");
				reportwin(row,col);
				return true;
			}else{
				continue;
			}
		}
	}
}


function verticalWinCheck(){
	for(var col=0; col<7; col++){
		for(var row=0;row<3;row++){
			if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
				console.log("vertical");
				reportwin(row,col);
				return true;
			}else{
				continue;
			}
		}
	}
}

function diagonalWinCheck(){
	for(var col=0; col<5; col++){
		for(var row=0;row<7;row++){
			if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
				console.log("diagonal");
				reportwin(row,col);
				return true;
			}else if(colorMatchCheck(returnColor(row,col),returnColor(row-1,col),returnColor(row-2,col+2),returnColor(row-3,col+3))){
				console.log("diagonal");
				reportwin(row,col);
				return true;
			}else{
				continue;
			}
		}
	}
}


var currentPlayer = 1;
var currentName = player1;
var currentColor = player1color;

$('h4').text(player1+" it is your turn, pick a column to drop it!");

$('.board button').on('click',function(){
	var col = $(this).closest('td').index();

	var  buttonAvail= checkBottom(col);

	changeColor(buttonAvail,col,currentColor);

	if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
		$('h2').text(currentName+" You won!");
		$('h3').fadeOut('fast');
		$('h4').fadeOut('fast');
	}
		currentPlayer = currentPlayer * -1;

	if(currentPlayer === 1){
		 currentName = player1;
		 $('h4').text(currentName+" it is your turn.")
		 currentColor = player1color;
	}else{
		currentName	= player2;
		$('h4').text(currentName+" it is your turn.")
		currentColor = player2color;
	}
})