$(function(){
  "use strict";

  function barC(argum, option = "", element = ""){
    if (!element){
      element = "body";
    }

    // have to create another frame as static

    let bigFrame = $("<div></div>");
    $(element).append(bigFrame);
    $(bigFrame).css({
      position: "absolute",
      left: 10, // check this out later
      width: option.frameWidth,
      height: option.frameHeigth,
      backgroundColor: "white",
    });

    //set the chart label, regarding the argument received from options
    let chartLabel = $("<div></div>");
    $(bigFrame).append(chartLabel);
    $(chartLabel).html(option.chartLabelText);
    $(chartLabel).css({
      fontSize: 30,   // later, set a maximum limit such as 45 and minimum as 12. Default should be 30.
      position: "relative",
      textAlign: "center",
      color: option.chartLabelColor,
      // backgroundColor: yellow,
      // left: 0,
      // top: 0
    });


    let biggestNumber = Math.max(...argum);;
    let ceilChart = Math.ceil(biggestNumber * 1.05); // 5% margin to the biggest number

    //frame to the chart columns
    var frame = $("<div></div>");
    $(bigFrame).append(frame);

    var frameHeigth = option.frameHeigth * 0.7;
    var frameWidth = option.frameWidth * 0.7;

    $(frame).css({
      position: "relative",
      left: 50,
      width: frameWidth,
      height: frameHeigth,
      backgroundColor: "green",   //set default and user's option
    });

    // Y arrow
    let lineY = $("<div></div>");
    $(frame).append(lineY);
    $(lineY).css({
      height: frameHeigth * 1.05, // 5% bigger than the frame heigth
      position: "relative",
      bottom: frameHeigth * 0.025,
      borderLeft: "solid black",
    });
    let arrowY = $("<div></div>");
    $(lineY).append(arrowY);
    $(arrowY).css({
      position: "relative",
      bottom: frameHeigth * 0.025,
      left: -5,
      border: "solid black",
      borderWidth: "0 2px 2px 0",
      display: "inline-block",
      padding: "3px",
      transform: "rotate(-135deg)"
    });

    // X arrow
    let lineX = $("<div></div>");
    $(frame).append(lineX);
    $(lineX).css({
      width: frameWidth * 1.05, // 5% bigger than the frame heigth
      position: "relative",
      left: (frameWidth * 0.025) * (-1),
      top: 0,
      borderBottom: "solid red",
      });
    console.log("framebottom " + frame.height());
    let arrowX = $("<div></div>");
    $(lineX).append(arrowX);
    $(arrowX).css({
      position: "absolute",
      bottom: frameHeigth,
      left: lineX.width() + 5,
      bottom: frame.height(),
      border: "solid red",
      borderWidth: "0 2px 2px 0",
      display: "inline-block",
      padding: "3px",
      transform: "rotate(-45deg)"
    });

    // $("body").append(frame);  //frame append to the body element

    let columnsNumber = argum.length;
    console.log("columnsNumber-: " + columnsNumber);

    //common variables
    let columnWidth = frameWidth / (columnsNumber + ((columnsNumber / 2) + 1));
    let spaceBtwCol = columnWidth / 2;
    let barBottom = 0;
    let left = 0;
    let columns = [];

    for (let i in argum){
      // console.log(`${i}o item: ${argum[i]}`);
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
        position: "absolute",
        bottom: barBottom,
        left: left,
        backgroundColor: "blue",
        width: columnWidth,
        height: ((argum[i] / ceilChart) * frameHeigth),
        display: "table-cell",
        verticalAlign: "middle",
        textAlign: "center",
        fontFamily: "Arial",
      });
      $(frame).append(columns[i]);
    }

    //set the X label, regarding the argument received from options
    let xLabel = $("<div></div>");
    $(frame).append(xLabel);
    $(xLabel).html(option.xLabelText);
    $(xLabel).css({
      position: "relative",
      textAlign: "center",
      backgroundColor: "blue",
      left: 0,
      bottom: - 2 - (frameHeigth)
      });

  }

barC([10, 2, 3, 4, 8, 6, 7, 8, 9],
   {frameHeigth: 400, frameWidth: 500,
     xLabelText: "Monthly $ spend", yLabelText: "IM Y", chartLabelText:"This is a bar chart!!!", chartLabelColor:"green"},
   "#barChartPlace");

// barC({"month": "jan", {"north":10, "south":20}},
//       {"montn": "feb", {"north":20, "south": 30}});

});
