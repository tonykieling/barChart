//first with columns okay

$(function(){
	"use strict";

  //frame creation
	var frame = $("<div></div>");
  var frameHeigth = 400;
  var frameWidth = 500;
	$(frame).height(frameHeigth);
	$(frame).css({
		"position": "relative",
		"width": frameWidth,
		"height": frameHeigth,
		"background-color": "green"
	});
	$("body").append(frame);  //frame append to the body element

  //common variables
  var columnWidth = 50;
  var barBottom = 0;
  //1st column creation
	var column1 = $("<div></div>");
  $(column1).html("1o");
  var column1Height = 350;
  var column1Width = columnWidth;
  var column1Left = 30;
	$(column1).css({
		"position": "absolute",
    "bottom": barBottom,
    "left": column1Left,
		"background-color": "blue",
		"width": column1Width,
		"height": column1Height,
		"display": "table-cell",
		"vertical-align": "middle",
		"text-align": "center",
		"font-family": "Arial",
	});

  //column creation
	var column2 = $("<div></div>");
  $(column2).html("2o");
  var column2Height = 350;
  var column2Width = columnWidth;
  var column2Left = (column1Left * 2) + column1Width;
	$(column2).css({
		"position": "absolute",
    // "top": 0,
    "bottom": barBottom,
    "left": column2Left,
		"background-color": "blue",
		"width": column2Width,
		"height": column2Height,
		"display": "table-cell",
		"vertical-align": "middle",
		"text-align": "center",
		"font-family": "Arial",
	});

  $(frame).append(column2);
  $(frame).append(column1);



});
