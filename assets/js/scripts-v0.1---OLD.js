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
      zIndex: 15,
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
      zIndex: 15,
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
    let numberOfDivisions = 4;    //  number of divisions default
    if (option.numberOfDivisionsYAxis){
      numberOfDivisions = option.numberOfDivisionsYAxis; //change default if user says
    }

    let divisionsHeigth = frameHeigth /numberOfDivisions;
    let topDivisionPos = divisionsHeigth;


    //the values below are related to ABSOLUTE mode.
    let multTextLabelDivision = parseInt(ceilChart / numberOfDivisions); // variable to hold the number to be add in each for loop for the divisionlabel
    let textLabelDivision = multTextLabelDivision;

    //check whether the user wants RELATIVE mode and apply it if so
    if ((option.typeOfDivision).toLowerCase() == "percent"){
      // console.log("type PERCENT");
      multTextLabelDivision = parseInt(100 / numberOfDivisions);
      textLabelDivision = multTextLabelDivision;
      if (!option.numberOfDivisionsYAxis){
        numberOfDivisions = 4;
      }
    }

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

      if (option.setDivisionsOverColumns){
        $(divisions[countDivision]).css("zIndex", 11);
      }


      //insert a label for each division here
      labelDivision[countDivision] = $("<div></div>");
      $(frame).append(labelDivision[countDivision]);

      // the division label has to have % if it's the case
      if ((option.typeOfDivision).toLowerCase() == "percent"){
        $(labelDivision[countDivision]).html(textLabelDivision + "%");
      } else{
        $(labelDivision[countDivision]).html(textLabelDivision);
      }
      $(labelDivision[countDivision]).css({
        fontSize: 15,
        position: "absolute",
        right: frameWidth + 5,
      });

      // vertical position
      $(labelDivision[countDivision]).css("bottom", (topDivisionPos - ((parseFloat($(labelDivision[countDivision]).css("height"))) / 2)));

      // change the positioning variable and label one
      topDivisionPos += divisionsHeigth;
      textLabelDivision += multTextLabelDivision;

    }




    let columnsNumber = argum.length;

    //common variables

    // diff will be used to calculate the space btw the columns
    let diff = 0;
    if (columnsNumber % 2 == 0){ // for even number of columns
      diff = 0.5
    } else {  // for odd number of columns
      diff = 1;
    }

    let columnWidth = frameWidth / (columnsNumber + ((Math.floor(columnsNumber / 2)) + diff));
    let spaceBtwCol = columnWidth / 2;
    let barBottom = 0;
    let vleft = 0;
    let columns = [];
    let labelAxisColumn = [];
    let labelColumns = [];


    for (let i in argum){
      // console.log(`${i}o item: ${argum[i]}`);
      if (i == 0){
        vleft = spaceBtwCol;
      } else {
        vleft = (spaceBtwCol * (Number(i) + 1)) + (columnWidth * (Number(i)));
      }

      //column creation for each number received as data within the array ou object
      columns[i] = $("<div></div>");
      $(columns[i]).css({
        position: "absolute",
        bottom: barBottom,
        left: vleft,
        backgroundColor: "blue",
        width: columnWidth,
        height: ((argum[i] / ceilChart) * frameHeigth),
        zIndex: 10,
      });
      $(frame).append(columns[i]);

      //label within each column
      labelColumns[i] = $("<div></div>");
      $(columns[i]).append(labelColumns[i]);
      $(labelColumns[i]).html(argum[i]);
      $(labelColumns[i]).css({
        position: "absolute",
        fontFamily: `${option.setColumnsFont}, "Arial"`,  //fontFamily default is Arial
        fontSize: option.setColumnsFontSize,
        zIndex: 11,  //same columns[i]'s zIndex
      });

      // check whether fontSize is valid
      // if it isn't, sets 16 as default
      if ((option.setColumnsFontSize == "") || (option.setColumnsFontSize == 0)){
        $(labelColumns[i]).css("fontSize", 16);
      }

      // arrange the size of the labelColumnFont according the width's column
      if ((parseInt($(columns[i]).css("width"))) < (parseInt($(labelColumns[i]).css("width")))){
        let newFontSize = (parseInt($(labelColumns[i]).css("fontSize")));
        while((parseInt($(columns[i]).css("width"))) < (parseInt($(labelColumns[i]).css("width")))){
          newFontSize--;
          $(labelColumns[i]).css("fontSize", newFontSize);
        }
      } else { // labelColumn positioned in the center
        $(labelColumns[i]).css("left",
                          (((parseInt($(columns[i]).css("width"))) - (parseInt($(labelColumns[i]).css("width")))) / 2));
      }

      // vertical position: top, bottom or middle
      if (typeof(option.setLabelColumnPos) == "string"){
        if (option.setLabelColumnPos.toLowerCase() == "top"){
          $(labelColumns[i]).css("top", 0);
        } else if (option.setLabelColumnPos.toLowerCase() == "bottom"){
          $(labelColumns[i]).css("bottom", 0);

        } else if (option.setLabelColumnPos.toLowerCase() == "middle"){
          $(labelColumns[i]).css("bottom",
                            (((parseInt($(columns[i]).css("height"))) - (parseInt($(labelColumns[i]).css("height")))) / 2));
        } else {
          console.log("columnposition: gonna be top (default)");
          $(labelColumns[i]).css("top", 0);
        }
      } else{
        console.log("Please the Column Label Position parameter (setLabelColumnPos) has to be a string 'TOP', 'BOTTOM' or 'MIDDLE'.");
        $(labelColumns[i]).css("top", 0);
      }


      //insert a label for each column here
      labelAxisColumn[i] = $("<div></div>");
      $(frame).append(labelAxisColumn[i]);
      $(labelAxisColumn[i]).html(argum[i]);
      $(labelAxisColumn[i]).css({
        position: "absolute",
        bottom: -20,
      });

      let lw = (parseFloat($(labelAxisColumn[i]).css("width")));
      let cw = columnWidth;
      let k1 = ((cw - lw) / 2);
      let plabel = vleft + k1;
      $((labelAxisColumn[i]).css("left", plabel));

    }

  //set the X label, regarding the argument received from options
  let xLabel = $("<div></div>");
  $(frame).append(xLabel);
  $(xLabel).html(option.xLabelText);
  $(xLabel).css({
    position: "absolute",
    });
  $((xLabel).css("bottom", (-1) * (parseFloat($(labelAxisColumn[0]).css("height")) * 2.5 )));
  $((xLabel).css("left", (((parseFloat($(frame).css("width"))) - (parseFloat($(xLabel).css("width")))) / 2)));


  let xlabelh   = (parseInt($(xLabel).css("height")));
  let xlabelpos = (parseInt($(xLabel).offset().top));
  let frametop  = (parseInt($(frame).offset().top));
  console.log("xlabelH: " + xlabelh + "\nxlabelPos: " + xlabelpos + "\nframetop: " + frametop);
  let distancek = ((xlabelh + xlabelpos) - frametop);
  console.log("distance is: " + distancek);

  $(frame).css("height", distancek);
  // var frameHeigth = distancek;
  // var frameWidth = option.frameWidth * 0.7;


  // let k1 = $("<div></div>");
  // $(k1).html("K1");
  // $(k1).css({
  //   position: "relative",
  //   top: parseInt($(frame).css("top")),
  //   backgroundColor: "red",
  //   zIndex: 30,
  // })
  // let k2 = $("<div></div>");
  // $(k2).html("K2");
  // $(selector).offset({top:value,left:value})


  }

barC([134, 201, 307, 600, 799, 878, 900, 700, 588],
   {frameHeigth: 500, frameWidth: 700,
     xLabelText: "Monthly $ spend", yLabelText: "IM Y", chartLabelText: "This is the bar chart name", chartLabelColor: "green",
     setColumnsFont: 0, setColumnsFontSize: "", setLabelColumnPos: "top", /*top, bottom, middle */
     numberOfDivisionsYAxis: 10, typeOfDivision: "Percent", setDivisionsOverColumns: 0},
   "#barChartPlace");

// barC({"month": "jan", {"north":10, "south":20}},
//       {"montn": "feb", {"north":20, "south": 30}});

});
