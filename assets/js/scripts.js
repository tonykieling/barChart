$(function(){
  "use strict";

  /*
  **********************************************************
  FUNCTION TO ARRANGE MONTH'S LABELS ACCORDING USER ARGUMENT
  **********************************************************
  */
  function setXLabelMonth(argumM, monthToStart = 0){
    let nObj = {};
    let varToReturn = [];
    const monthN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
    let mIndex = 0;

    if (typeof(monthToStart) == "string"){
      while (monthN[mIndex]){
        if (monthToStart.toLowerCase() == monthN[mIndex].toLowerCase()){
          break;
        }
        mIndex++;
        //if the month argument is invalid, the mIndex will be 13, which means 0 index in the modulus index bellow
      }

    } else if (typeof(monthToStart) == "number"){
      mIndex = monthToStart;
    }

    for (let mcount = 0; mcount < argumM; mcount++){
      nObj = {key: mIndex, value: monthN[(mIndex % monthN.length)]};
      varToReturn.push(nObj);
      mIndex++;
    }
    return (varToReturn);
  }




  /*
  **********************************************************
  FUNCTION TO GENERATE A BAR CHART *************************
  **********************************************************
  */
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
    });




    // +++++++++++++++++++++++++++++++++++++++
    // ++++++++++ FRAME ELEMENT ++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++
    let biggestNumber = Math.max(...argum);;
    let ceilChart = biggestNumber * 1.02;   //it gives a offset to the frame chart to the biggest column
    if (option.setMaximunValue){
      ceilChart = option.setMaximunValue; //change the frame reference to the biggest value if the user say so
    }

    if (biggestNumber % 5 != 0){
      let count = 1;
      while ((ceilChart % 5) != 0){
        ceilChart = Math.floor(ceilChart) + count;
        count++;
      }
    }

    //frame to the bar chart
    var frame = $("<div></div>");
    $(bigFrame).append(frame);

    var frameHeigth = option.frameHeigth * 0.75;    //old way
    var frameWidth = option.frameWidth * 0.7;


    $(frame).css({
      position: "absolute",
      left: 80,    //   TODO: first draw the frame and after position that
      top: (parseInt($(chartLabel).css("height"))) + 30,  //distance related to the chartlabel
      width: frameWidth,
      height: frameHeigth,
      backgroundColor: "aquamarine",   //set default and user's option
    });




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
    let numberOfDivisions = 4;    //  default number of divisions
    if (option.numberOfDivisionsYAxis){
      numberOfDivisions = option.numberOfDivisionsYAxis; //change default if user says
    }

    let divisionsHeigth = frameHeigth /numberOfDivisions;
    let topDivisionPos = divisionsHeigth;


    //the values below are related to ABSOLUTE mode.
    let multTextLabelDivision = Math.ceil(ceilChart / numberOfDivisions); // variable to hold the number to be add in each for loop for the divisionlabel
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

    //comonthToStart = 0on variables

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
    let labelColumnFontSize = option.setColumnsFontSize;
    let eachXLabel = argum; //move THIS LINE to before the for loop


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


      // check whether fontSize is valid
      // if it isn't, sets 16 as default
      // if ((option.setColumnsFontSize == "") || (option.setColumnsFontSize == 0)){
      //   $(labelColumns[i]).css("fontSize", 16);
      // }

      if (option.setColumnWithLabel == true){
        //label within each column
        labelColumns[i] = $("<div></div>");
        $(columns[i]).append(labelColumns[i]);
        $(labelColumns[i]).html(argum[i]);
        $(labelColumns[i]).css({
          position: "absolute",
          fontFamily: `${option.setColumnsFont}, "Arial"`,  //fontFamily default is Arial
          width: "100%",
          fontSize: "1.3vw",
          zIndex: 11,  //same columns[i]'s zIndex
          textAlign: "center",
        });


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
      }

      //insert a label for each column here
      // console.log(typeof(option.setXLabel));
      if (i == 0) { // it will set the label , or its variable, only in the very first time
        if (typeof(option.setXLabel) == "string"){
          if (((option.setXLabel.toLowerCase()) == "month") ||
             ((option.setXLabel.toLowerCase()) == "number") ||
             ((option.setXLabel.toLowerCase()) == "on")) {
            eachXLabel = setXLabelMonth(argum.length, option.setXLabelStarts);
          }
        }
      }

      labelAxisColumn[i] = $("<div></div>");
      $(columns[i]).append(labelAxisColumn[i]);
      $(labelAxisColumn[i]).html(eachXLabel[i].value);
      $(labelAxisColumn[i]).css({
        position: "absolute",
        bottom: -20,
        width: "100%",
        fontSize: "1.4vw",
        textAlign:"center",
      });
    }


  //set the X label, regarding the argument received from options
  let xGeneralLabel = $("<div></div>");
  $(frame).append(xGeneralLabel);
  $(xGeneralLabel).html(option.xLabelText);
  $(xGeneralLabel).css({
    position: "absolute",
    });
  $((xGeneralLabel).css("bottom", (-1) * (parseInt($(labelAxisColumn[0]).css("height")) * 3.5 )));
  $((xGeneralLabel).css("left", (((parseFloat($(frame).css("width"))) - (parseFloat($(xGeneralLabel).css("width")))) / 2)));


  /* just in case to calculate vertical distances btw element
  let xlabelh   = (parseInt($(xGeneralLabel).css("height")));
  let xlabelpos = (parseInt($(xGeneralLabel).offset().top));
  let frametop  = (parseInt($(frame).offset().top));
  console.log("xlabelH: " + xlabelh + "\nxlabelPos: " + xlabelpos + "\nframetop: " + frametop);
  let distancek = ((xlabelh + xlabelpos) - frametop);
  console.log("distance is: " + distancek);

  // $(frame).css("height", distancek);
  // var frameHeigth = distancek;
  // var frameWidth = option.frameWidth * 0.7;
  */

  }

// barC([100, 201, 307, 600, 799, 878, 130, 700, 588, 80, 110, 50, 60, 70],
// barC([100, 201, 307, 600, 799, 878, 130, 700, 588],
  barC([100, 201, 307, 600, 799, 70],
   {frameHeigth: 500, frameWidth: 700,
    setXLabel: "month", setXLabelStarts: "nov",
    setMaximunValue: 0,
     xLabelText: "Monthly $ spend", chartLabelText: "This is the bar chart name", chartLabelColor: "green",
     setColumnsFont: 0, setColumnWithLabel: true, setLabelColumnPos: "middle", /*top, bottom, middle */
     numberOfDivisionsYAxis: 5, typeOfDivision: "percent", setDivisionsOverColumns: 0},
   "#barChartPlace");


  //  barC({["jan", 100], ["feb", 200], ["mar", 150], ["apr", 230]});

// barC({"month": "jan", {"north":10, "south":20}},
//       {"montn": "feb", {"north":20, "south": 30}});

});
