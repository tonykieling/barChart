$(function(){
  "use strict";

  function barC(argum, option = "", element = ""){
    if (!element){
      element = "body";
    }


    // +++++++++++++++++++++++++++++++++++++++
    // ++++++++++ BIG FRAME ELEMENT ++++++++++
    // +++++++++++++++++++++++++++++++++++++++
    //big frame which will host all elements, including the bar chart
    // size as received via agrguments
    let bigFrame = $("<div></div>");
    $(element).append(bigFrame);
    $(bigFrame).css({
      position: "relative",
      left: 50, // check this out later
      width: option.frameWidth,
      height: option.frameHeigth,
      backgroundColor: "white",
    });


    // +++++++++++++++++++++++++++++++++++++++++
    // ++++++++++ CHART LABEL ELEMENT ++++++++++
    // +++++++++++++++++++++++++++++++++++++++++
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
      // backgroundColor: "yellow",
    });


    let biggestNumber = Math.max(...argum);;
    let ceilChart = biggestNumber * 1.02;
    // console.log("biggestNumber: " + biggestNumber + " --- ceilchart: " + ceilChart);
    if (biggestNumber % 5 != 0){
      let count = 1;
      while ((ceilChart % 5) != 0){
        ceilChart = Math.floor(ceilChart) + count;
        count++;
      }
    }

    // console.log("bignu: " + biggestNumber + " -- ceilchart: " + ceilChart);

    // +++++++++++++++++++++++++++++++++++++++
    // ++++++++++ FRAME ELEMENT ++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++
    //frame to the bar chart
    var frame = $("<div></div>");
    $(bigFrame).append(frame);


      //first starting the draw with the barFrame as the size of the big frame.
      // At the end readjust the size Length and  Width regarding all elements which affects the chart draw's size
    // var frameHeigth = option.frameHeigth - ((parseInt($(chartLabel).css("height"))) + (parseInt($(xLabel).css("height")))) - 50;
    var frameHeigth = option.frameHeigth * 0.7;
    // var frameHeigth = option.frameHeigth - (parseInt($(chartLabel.css(height))));
    // console.log("frameh: " + (parseInt($(chartLabel).css("height"))) + " " + (parseInt($(xLabel).css("height"))));
    // console.log(frameHeigth);
    var frameWidth = option.frameWidth * 0.7;


    $(frame).css({
      position: "absolute",
      left: 80,    //   TODO: first draw the frame and after position that
      top: (parseInt($(chartLabel).css("height"))) + 15,
      width: frameWidth,
      height: frameHeigth,
      backgroundColor: "aquamarine",   //set default and user's option
    });

    //how to catch an element value via jquery and convert it to number
    //   ANSWER: (parseInt($(chartLabel).css("height"))) * 10;


    // +++++++++++++++++++++++++++++++++++++++
    // ++++++++++ Y ARROW ELEMENT ++++++++++++
    // +++++++++++++++++++++++++++++++++++++++
    let lineY = $("<div></div>");
    $(frame).append(lineY);
    $(lineY).css({
      height: frameHeigth * 1.05, // the arrow's line is gonna be 5% bigger than the frame heigth
      position: "absolute",
      bottom: -1 * (((frameHeigth * 1.05) - frameHeigth) / 2),
      borderLeft: "solid black",
    });
    let arrowY = $("<div></div>");
    $(lineY).append(arrowY);
    $(arrowY).css({
      position: "absolute",
      top: -1 * (((frameHeigth * 1.03) - frameHeigth) / 4),
      left: -5,
      border: "solid black",
      borderWidth: "0 2px 2px 0",
      display: "inline-block",
      padding: "3px",
      transform: "rotate(-135deg)"
    });


    // +++++++++++++++++++++++++++++++++++++++
    // ++++++++++ X ARROW ELEMENT ++++++++++++
    // +++++++++++++++++++++++++++++++++++++++
    let lineX = $("<div></div>");
    $(frame).append(lineX);
    $(lineX).css({
      width: frameWidth * 1.05, // the arrow's line is gonna be 5% bigger than the frame heigth
      position: "absolute",
      left: ((frameWidth * 0.05) / 2) * (-1),
      bottom: 0,
      zIndex: 10,
      borderBottom: "solid black",
      });
    let arrowX = $("<div></div>");
    $(lineX).append(arrowX);
    $(arrowX).css({
      position: "absolute",
      right: (-1) * ((((frameWidth * 1.02) - frameWidth)) / 4),
      bottom: -5,
      border: "solid black",
      borderWidth: "0 2px 2px 0",
      display: "inline-block",
      padding: "3px",
      transform: "rotate(-45deg)"
    });


    // +++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++ CHART DIVISIONS ELEMENT ++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++
    //draw the Y axis divisions
    let numberOfDivisions = 5;    //  number of divisions default
    if (option.numberOfDivisionsYAxis){
      console.log("numberdivision = notempty");
      numberOfDivisions = option.numberOfDivisionsYAxis; //change default if user says
    }
    console.log(numberOfDivisions);

    let divisionsHeigth = frameHeigth /numberOfDivisions;
    let topDivisionPos = divisionsHeigth;


    let multTextLabelDivision = parseInt(ceilChart / numberOfDivisions); // variable to hold the number to be add in each for loop for the divisionlabel
    let textLabelDivision = multTextLabelDivision;

    if ((option.typeOfDivision).toLowerCase() == "percent"){
      console.log("type PERCENT");
      multTextLabelDivision = parseInt(100 / numberOfDivisions);
      textLabelDivision = multTextLabelDivision;
      if (!option.numberOfDivisionsYAxis){
        numberOfDivisions = 4;
      }
    } else {
      console.log("ABSOLUTE"); // default is ABSOLUTE
    }


    // let multTextLabelDivision = parseInt(ceilChart / numberOfDivisions); // variable to hold the number to be add in each for loop for the divisionlabel
    // let textLabelDivision = multTextLabelDivision;


    let divisions = [];
    let labelDivision = [];
    for (let countDivision = 0; countDivision < numberOfDivisions; countDivision++){
      divisions[countDivision] = $("<div></div>");
      $(frame).append(divisions[countDivision]);
      $(divisions[countDivision]).css({
        width: frameWidth,
        position: "absolute",
        left: 0,
        bottom: topDivisionPos,
        // top: topDivision,
        zIndex: 10,
        borderTop: "dotted grey 1px",
        });

      //insert a label for each division here
      labelDivision[countDivision] = $("<div></div>");
      $(frame).append(labelDivision[countDivision]);
      if ((option.typeOfDivision).toLowerCase() == "percent"){
        $(labelDivision[countDivision]).html(textLabelDivision + "%");
      } else{
        $(labelDivision[countDivision]).html(textLabelDivision);
      }
      $(labelDivision[countDivision]).css({
        fontSize: 15,
        position: "absolute",
        right: frameWidth + 5,
        // bottom: topDivision,
        // border: "solid",
      });

      let ldh = (parseFloat($(labelDivision[countDivision]).css("height")));
      let k2 = ldh / 2;
      let positionp = topDivisionPos - k2;
      $(labelDivision[countDivision]).css("bottom", positionp);

      topDivisionPos += divisionsHeigth;
      // if ((option.typeOfDivision).toLowerCase() == "percent"){
      textLabelDivision += multTextLabelDivision;

    }




    let columnsNumber = argum.length;

    //common variables
    let diff = 0;
    if (columnsNumber % 2 == 0){
      diff = 0.5
    } else{
      diff = 1;
    }

    let columnWidth = frameWidth / (columnsNumber + ((Math.floor(columnsNumber / 2)) + diff));
    let spaceBtwCol = columnWidth / 2;
    let barBottom = 0;
    let vleft = 0;
    let columns = [];
    let labelColumn = [];

    for (let i in argum){
      // console.log(`${i}o item: ${argum[i]}`);
      if (i == 0){
        vleft = spaceBtwCol;
      } else {
        vleft = (spaceBtwCol * (Number(i) + 1)) + (columnWidth * (Number(i)));
      }

      //column creation
      columns[i] = $("<div></div>");
      $(columns[i]).html(argum[i]);

      $(columns[i]).css({
        position: "absolute",
        bottom: barBottom,
        left: vleft,
        backgroundColor: "blue",
        width: columnWidth,
        height: ((argum[i] / ceilChart) * frameHeigth),
        // height: ((argum[i] * frameHeigth) / frameHeigth),
        // display: "table-cell",
        // verticalAlign: "middle",   TODO how to vertical align in a absolute positioned element????
        textAlign: "center",
        fontFamily: "Arial",
        zIndex: 10,
      });
      $(frame).append(columns[i]);

      //insert a label for each column here
      labelColumn[i] = $("<div></div>");
      $(frame).append(labelColumn[i]);
      $(labelColumn[i]).html(argum[i]);
      $(labelColumn[i]).css({
        position: "absolute",
        bottom: -20,
      });

      let lw = (parseFloat($(labelColumn[i]).css("width")));
      let cw = columnWidth;
      let k1 = ((cw - lw) / 2);
      let plabel = vleft + k1;
      $((labelColumn[i]).css("left", plabel));

    }

  //set the X label, regarding the argument received from options
  let xLabel = $("<div></div>");
  $(frame).append(xLabel);
  $(xLabel).html(option.xLabelText);
  $(xLabel).css({
    position: "absolute",
    // backgroundColor: "yellow",
    });
  $((xLabel).css("bottom", (-1) * (parseFloat($(labelColumn[0]).css("height")) * 2.5 )));
  $((xLabel).css("left", (((parseFloat($(frame).css("width"))) - (parseFloat($(xLabel).css("width")))) / 2)));

  // $((frame).css("heigth",

  console.log(
    $(xLabel).css("bottom")
    + " and " +
    $(arrowY).css("top"));
            /////////////////////////// how to get the absolute distance btw two diff elements (diff parents)???
            // with this im gonna figure out how height have to be the bar chart

  }

barC([134, 201, 307, 400, 800, 600, 799, 878, 900, 700, 588],
   {frameHeigth: 500, frameWidth: 700,
     xLabelText: "Monthly $ spend", yLabelText: "IM Y", chartLabelText:"This is the bar chart name", chartLabelColor:"green",
    numberOfDivisionsYAxis: 5, typeOfDivision: "Percent"},
   "#barChartPlace");

// barC({"month": "jan", {"north":10, "south":20}},
//       {"montn": "feb", {"north":20, "south": 30}});

});
