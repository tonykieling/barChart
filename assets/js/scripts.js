$(function(){
  "use strict";

  function barC(argum, option = "", element = ""){
    if (option){
      console.log("element: " + element);
    } else {
      console.log("no options");
    }

    console.log("arguments: " + argum);
    let biggestNumber = Math.max(...argum);;
    let ceilChart = Math.ceil(biggestNumber * 1.05); // 5% margin to the biggest number
    console.log("big: " + biggestNumber);

    //frame creation
    var frame = $("<div></div>");
    var frameHeigth = option.frameHeigth;
    var frameWidth = option.frameWidth;

    $(frame).height(frameHeigth);
    $(frame).css({
      "position": "relative",
      "width": frameWidth,
      "height": frameHeigth,
      "background-color": "green"
    });

    $("body").append(frame);  //frame append to the body element

    let columnsNumber = argum.length;
    console.log("columnsNumber-: " + columnsNumber);

    //common variables
    let columnWidth = frameWidth / (columnsNumber + ((columnsNumber / 2) + 1));
    let spaceBtwCol = columnWidth / 2;
    let barBottom = 0;
    let left = 0;
    let columns = [];
    console.log("columnWidth: " + columnWidth);


    for (let i in argum){
      console.log(`${i}o item: ${argum[i]}`);
      if (i == 0){
        left = spaceBtwCol;
      } else {
        left = (spaceBtwCol * (Number(i) + 1)) + (columnWidth * (Number(i)));
      }

      //column creation
      columns[i] = $("<div></div>");
      console.log(columns[i]);
      $(columns[i]).html(argum[i]);

      $(columns[i]).css({
        "position": "absolute",
        // "top": 0,
        "bottom": barBottom,
        "left": left,
        "background-color": "blue",
        "width": columnWidth,
        "height": ((argum[i] / ceilChart) * frameHeigth),
        "display": "table-cell",
        "vertical-align": "middle",
        "text-align": "center",
        "font-family": "Arial",
      });
      $(frame).append(columns[i]);
    }

    //set the X label, regarding the argument received from options
    let xLabel = $("<div></div>");
    $(xLabel).html(option.xLabelText);
    $(xLabel).css({
      "position":"relative",
      "text-align": "center",
      // "background-color": "blue",
      "left": 0,
      "bottom": - 2 - (frameHeigth)
      });
    $(frame).append(xLabel);

    //set the chart label, regarding the argument received from options
    let chartLabel = $("<div></div>");
    $(chartLabel).html(option.chartLabelText);
    $(chartLabel).css({
      "font-size": 30,
      "position":"relative",
      "text-align": "center",
      "color": option.chartLabelColor,
      "left": 0,
      "top": -50});
    // });
    $(frame).append(chartLabel);

    $(element).append(frame);
  }

barC([10, 2, 3, 4, 8, 6, 7, 8, 9],
   {frameHeigth: 400, frameWidth: 500,
     xLabelText: "Monthly $ spend", yLabelText: "IM Y", chartLabelText:"This is a bar chart!!!", chartLabelColor:"green"},
   "#barChartPlace");

// barC({"month": "jan", {"north":10, "south":20}},
//       {"montn": "feb", {"north":20, "south": 30}});

});
