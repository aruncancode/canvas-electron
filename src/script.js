const { ipcRenderer } = require("electron")
window.$ = window.jQuery = require("jquery");


mouse_down = false;
selected_size = 5;
selected_colour = "black";
selected_stroke = "solid"

lineVars = {
	"solid" : [],
	"dashed" : [10,10],
	"dotted" : [5,5]
}

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

lastx = 0;
lasty = 0;
newx = 0;
newy = 0;

function make_line(lastx, lasty, newx, newy) {
	ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(lastx, lasty);
	ctx.lineTo(newx, newy);
	ctx.setLineDash(lineVars[selected_stroke])
	ctx.lineWidth = selected_size + 4;
	ctx.strokeStyle = selected_colour;
	ctx.stroke();
}

$("#canvas").mousedown(function (e) {
	mouse_down = true;
	lastx = e.clientX;
	lasty = e.clientY;
	ctx.beginPath();
});

$("#canvas").mousemove(function (e) {
	if (mouse_down) {
		ctx.lineTo(e.clientX, e.clientY)
		ctx.setLineDash(lineVars[selected_stroke])
		ctx.strokeStyle = selected_colour
		ctx.lineWidth=selected_size + 4
		ctx.stroke()
	}
	newx = e.clientX;
	newy = e.clientY;
});

$(window).mouseup(function (e) {
	mouse_down = false;
});

$(".brushColours").click(function (e) {
	selected_colour = e.target.style.outlineColor;
});

$(".brushSizes").click(function (e) {
	selected_size = parseInt(e.target.id);
});

$(document).keydown(function (e) {
	if (e.keyCode == 16) {
		make_line(lastx, lasty, newx, newy);
	}
});

$(".clear").click(function (e) {
	ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});

$(".brushStrokes").click(function(e){
	selected_stroke = e.target.id
})

$(".options").click(function(){
	$(".options").fadeOut("slow")
})

$(".slider").mouseover(function(){
	$(".options").fadeIn("5000")	
})

$("#close").click(function () {
	window.close();
});

$("#minimize").click(function () {
	ipcRenderer.send("minimize")
});

// $("#maximize").click(function () {
// 	out.send("maximize")
// });


// &#128469;