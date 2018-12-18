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
      position: "relative",
      left: 50, // check this out later
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
      top: 0,
      color: option.chartLabelColor,
      // backgroundColor: yellow,
    });


    let biggestNumber = Math.max(...argum);;
    let ceilChart = Math.ceil(biggestNumber * 1.05); // 5% margin to the biggest number

    //frame to the bar chart
    var frame = $("<div></div>");
    $(bigFrame).append(frame);

    var frameHeigth = option.frameHeigth * 0.7;
    var frameWidth = option.frameWidth * 0.7;

    $(frame).css({
      position: "absolute",
      left: 50,    //   TODO: first draw the frame and after position that
      top: (parseInt($(chartLabel).css("height"))) + 10,
      width: frameWidth,
      height: frameHeigth,
      backgroundColor: "aquamarine",   //set default and user's option
    });

    //how to catch an element value via jquery and convert it to number
    //    (parseInt($(chartLabel).css("height"))) * 10;

    // Y arrow
    let lineY = $("<div></div>");
    $(frame).append(lineY);
    $(lineY).css({
      height: frameHeigth * 1.05, // 5% bigger than the frame heigth
      position: "absolute",
      bottom: -1 * (((frameHeigth * 1.05) - frameHeigth) / 2),
      borderLeft: "solid black",
    });
    let arrowY = $("<div></div>");
    $(lineY).append(arrowY);
    $(arrowY).css({
      position: "absolute",
      top: -1 * (((frameHeigth * 1.05) - frameHeigth) / 4),
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
      position: "absolute",
      left: ((frameWidth * 0.05) / 2) * (-1),
      bottom: 0,
      borderBottom: "solid black",
      });
    let arrowX = $("<div></div>");
    $(lineX).append(arrowX);
    $(arrowX).css({
      position: "absolute",
      // left: lineX.width() + 5,
      right: (-1) * ((((frameWidth * 1.05) - frameWidth)) / 4),
      bottom: -3,
      border: "solid black",
      borderWidth: "0 2px 2px 0",
      display: "inline-block",
      padding: "3px",
      transform: "rotate(-45deg)"
    });

    // $("body").append(frame);  //frame append to the body element

    let columnsNumber = argum.length;
    // console.log("columnsNumber-: " + columnsNumber);

    //common variables
    let columnWidth = frameWidth / (columnsNumber + ((columnsNumber / 2) + 1));
    let spaceBtwCol = columnWidth / 2;
    let barBottom = 0;
    let vleft = 0;
    let columns = [];

    for (let i in argum){
      // console.log(`${i}o item: ${argum[i]}`);
      if (i == 0){
        vleft = spaceBtwCol;
      } else {
        vleft = (spaceBtwCol * (Number(i) + 1)) + (columnWidth * (Number(i)));
      }

      //column creation
      columns[i] = $("<div></div>");
      // console.log(columns[i]);
      $(columns[i]).html(argum[i]);

      $(columns[i]).css({
        position: "absolute",
        bottom: barBottom,
        left: vleft,
        backgroundColor: "blue",
        width: columnWidth,
        height: ((argum[i] / ceilChart) * frameHeigth),
        display: "table-cell",
        // verticalAlign: "middle",   TODO how to vertical align in a absolute positioned element????
        textAlign: "center",
        fontFamily: "Arial",
      });
      $(frame).append(columns[i]);

      //insert a label for each column here
      let labelColumn = [];
      labelColumn[i] = $("<div></div>");
      $(frame).append(labelColumn[i]);
      $(labelColumn[i]).html(argum[i]);
      $(labelColumn[i]).css({
        position: "absolute",
        bottom: -20,
        // backgroundColor: "green",
      });

      let lw = (parseFloat($(labelColumn[i]).css("width")));
      let cw = columnWidth;
      let k1 = ((cw - lw) / 2);
      let plabel = vleft + k1;
      // console.log("label pos: " + (Number($(labelColumn[i]).css("width"))) + " -- vleft: " + vleft);
      // console.log("k1: " + k1 + " and vleft: " + vleft + " columnswidth: " + columnWidth + " labelwidth: " + labelColumn[i].css("width"));
      // console.log("columnwidth: " + cw + "labelwidth: " + lw + " diff = " + k1 + " positionlabel: " + plabel)
      $((labelColumn[i]).css("left", plabel));

    }


    // console.log(parseFloat($(labelColumn[00]).css("bottom")));

    //set the X label, regarding the argument received from options
    let xLabel = $("<div></div>");
    $(bigFrame).append(xLabel);
    $(xLabel).html(option.xLabelText);
    $(xLabel).css({
      position: "absolute",
      // textAlign: "center",
      backgroundColor: "blue",
      // left: 0,
      bottom: 0,
      });

    let bigfw = (parseFloat($(bigFrame).css("width")));
    let xlabelw = (parseFloat($(xLabel).css("width")));
    let ppk = ((bigfw - xlabelw) / 2);
    let xlabel = ppk;
    console.log("bigfwi: " + bigfw + " -- xlabelw: " + xlabelw + " ppk: " + ppk);
      // console.log("k1: " + k1 + " and vleft: " + vleft + " columnswidth: " + columnWidth + " labelwidth: " + labelColumn[i].css("width"));
      // console.log("columnwidth: " + cw + "labelwidth: " + lw + " diff = " + k1 + " positionlabel: " + plabel)
    $((xLabel).css("left", ppk));

  }

barC([10, 2, 3, 4, 8, 6, 7, 8, 9],
   {frameHeigth: 400, frameWidth: 500,
     xLabelText: "Monthly $ spend", yLabelText: "IM Y", chartLabelText:"This is a bar chart!!!", chartLabelColor:"green"},
   "#barChartPlace");

// barC({"month": "jan", {"north":10, "south":20}},
//       {"montn": "feb", {"north":20, "south": 30}});

});
