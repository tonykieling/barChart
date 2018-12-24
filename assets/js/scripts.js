$(function(){
  "use strict";

// it checks if the fontSize passed by the user is fittable in the current element, which can be chartLabel or Xlabel.
// it returns fontSize fittable for the attribute in case, height or width.
// the maximum fontSize possible will be regarding the definition of the host element width or height
function setFontSize(contentF, hostElement, attributeF, maxF, fontSizeF, userFontSize, operatorF, fontFamilyF = "Arial"){
  // if (contentF != "100%"){
  //   return 15;
  // }

  maxF = parseInt(maxF);

  // console.log(
  //   "contentF: " + contentF +
  //   "\nhostElement: " + hostElement +
  //    "\nattributeF: " + attributeF +
  //    "\nmaxF: "  + maxF +
  //     "\nfontSizeF: " + fontSizeF +
  //     "\nuserFontSize: " + userFontSize +
  //     "\noperatorF: " + operatorF +
  //      "\nfontFamilyF: " + fontFamilyF
  // );

  // const tempFontSize = (parseInt(fontSizeF));

  let returnVar = 0;

  let elementF = $("<div></div>");
  $(hostElement).append(elementF);
  $(elementF).html(contentF);
  $(elementF).css({
    position: "absolute",
    fontFamily: fontFamilyF,
    fontSize: userFontSize,
    border: "solid purple"
  });

  // $(elementF).css("fontSize", userFontSize);

  if (parseInt($(elementF).css(attributeF)) < maxF){
    $(elementF).remove();
    console.log("fontSize is bigger than 8 and it's okay");
    return(userFontSize);
  }

  let sbF = "";
  if (operatorF == "+"){
    sbF = "<=";
  } else if (operatorF == "-"){
    sbF = ">=";
    // console.log("eval:: " + eval(5 + sbF + 4));
  }

  // increase or decrease the size of the font according the size of the element passed by the user (height or width)
  console.log("attrib::: " + parseInt($(elementF).css(attributeF)));
                        // if (eval((parseInt($(elementF).css(attributeF))) + sbF + maxF)){
                        //   console.log(((parseInt($(elementF).css(attributeF))) + " " + sbF + " " + maxF));
                        //   console.log("leaving!!!!");
                        //   // $(elementF).remove();
                        //   return fontSizeF;
                        // }
  let mcountF = 1;
  console.log("-------------------");
  console.log(((parseInt($(elementF).css(attributeF))) + " " + sbF + " " + maxF));
  let countFontSize = 0;
  while (eval((parseInt($(elementF).css(attributeF))) + sbF + maxF)){
    // console.log("inside while " + mcountF);
    // console.log(countFontSize + " " + operatorF);
    countFontSize = eval(countFontSize + operatorF + 1);
    returnVar = userFontSize + countFontSize;
    // console.log("returnVar: " + returnVar);
    $(elementF).css({
      fontSize: returnVar
      });

    if (mcountF > 30){
      console.log("Break!");
      $(elementF).remove();
      return 8;
    }
    mcountF++;
  }
  $(elementF).remove();
  console.log("returnVar: " + (returnVar));
  return returnVar;
}



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
    // big frame which will host all elements, including the bar chart
    // size as received via agrguments
    let bigFrame = $("<div></div>");
    $(element).append(bigFrame);
    $(bigFrame).css({
      position: "relative",
      left: 50, // check this out later
      width: option.frameWidth,
      height: option.frameHeight,
      backgroundColor: "white",
    });

    var frameHeight = option.frameHeight * 0.7;    //old way
    var frameWidth = option.frameWidth * 0.7;


    // +++++++++++++++++++++++++++++++++++++++++
    // ++++++++++ CHART LABEL ELEMENT ++++++++++
    // +++++++++++++++++++++++++++++++++++++++++
    //set the chart label, regarding the argument received from options

    let chartLabel = $("<div></div>");
    $(bigFrame).append(chartLabel);
    $(chartLabel).html(option.chartLabelText);
    $(chartLabel).css({
      position: "absolute",
      textAlign: "center",
      width: "100%",
      top: 0,
      fontFamily: `${option.chartLabelFontFamily}, "Arial"`,
      fontSize: "8px",   // later, set a maximum limit such as 45 and minimum as 12. Default should be 30.
      color: option.chartLabelColor,
      border: option.chartLabelBorder,
    });


    if (!option.chartLabelText){  // if no chartLabel defined by the user, the room for chartLabel has to be small (3% of the whole frame)
      $(chartLabel).css("height", (option.frameHeight * 0.03));
    } else {
      if ((parseInt(option.chartLabelFontSize < 8)) || (option.chartLabelFontSize == "0")){
        console.log("chartLabel is valid but no fontSize btw 0 - 7");
        $(chartLabel).css("fontSize", 8);

      } else if (parseInt(option.chartLabelFontSize) > 8){ // it will call the function setFontSize only to check if the size is fittable with the chartlabel room
        console.log("user define sizeFont as: " + option.chartLabelFontSize + " and the function will check if it is fittable");
        // $(chartLabel).css("fontSize", 20);
        // console.log("fontsize > 8 and now = 20");
        $(chartLabel).css("fontSize",
                  (setFontSize(option.chartLabelText,               // call setFontSize with the arguments: chartLabelText
                               bigFrame,                            // bigFrame is the current HTML element parent
                               "height",                            // apply the size related to the height
                               (option.frameHeight * 0.1),          // maximum size of the current element is supposed to support
                               parseInt($(chartLabel).css("fontSize")),  // start the fontSize in 8
                               parseInt(option.chartLabelFontSize), //user's fontSize
                               "-",                                 // the fontSize will decrease, just in case user'a FontSize too big
                               option.chartLabelFontFamily) ));     // fontFamily to be used
        console.log("new SizeF: " + $(chartLabel).css("fontSize"));

      // } else if ((option.chartLabelFontSize == "") ||
      //           (!option.chartLabelFontSize)){  //if no fontSize defined by the user, the system will do it with the maximum possible
      }
    }


    // +++++++++++++++++++++++++++++++++++++++
    // ++++++++++ FRAME ELEMENT ++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++
    let biggestNumber = Math.max(...argum);;
    let ceilChart = biggestNumber * 1.02;   //it gives a offset to the frame chart related to the biggest column
    if (option.setMaximunValue){
      ceilChart = option.setMaximunValue; //change the frame reference to the biggest value if the user say so
    }

    // it is used only in absolute mode, note percent mode
    // maybe it is not mattering
    // if (biggestNumber % 5 != 0){
    //   let count = 1;
    //   while ((ceilChart % 5) != 0){
    //     ceilChart = Math.floor(ceilChart) + count;
    //     count++;
    //   }
    // }
// console.log(((parseInt($(chartLabel).css("height"))) * 0.4) + " chartLabelH: " + $(chartLabel).css("height"));
    //frame to the bar chart
    var frame = $("<div></div>");
    $(bigFrame).append(frame);
    $(frame).css({
      position: "absolute",
      left: 80,    //   TODO: first draw the frame and after position that
      top: (parseInt($(chartLabel).css("height"))) + ((parseInt($(chartLabel).css("height"))) * 0.4),  //distance related to the chartlabel
      width: frameWidth,
      height: frameHeight,
      backgroundColor: "aquamarine",   //set default and user's option
    });




    // +++++++++++++++++++++++++++++++++++++++
    // ++++++++++ Y ARROW ELEMENT ++++++++++++
    // +++++++++++++++++++++++++++++++++++++++
    let lineY = $("<div></div>");
    $(frame).append(lineY);
    $(lineY).css({
      height: frameHeight * 1.05, // the arrow's line is gonna be 5% bigger than the frame heigth
      position: "absolute",
      bottom: -1 * (((frameHeight * 1.05) - frameHeight) / 2),
      borderLeft: "solid black",
      zIndex: 15,
    });
    let arrowY = $("<div></div>");
    $(lineY).append(arrowY);
    $(arrowY).css({
      position: "absolute",
      top: -1 * (((frameHeight * 1.03) - frameHeight) / 4),
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


    //**************************************************************
    // it's to adjust the arrow's details for small and big frames */
    if (((option.frameHeight) <= 400) || ((option.frameWidth) <= 600)){
      $(lineX).css("borderBottom", "solid black 1.5px");
      $(arrowX).css("borderWidth", "0 1.5px 1.5px 0");
      $(lineY).css("borderLeft", "solid black 1.5px");
      $(arrowY).css("borderWidth", "0 1.5px 1.5px 0");
    }

    if (((option.frameHeight) <= 200) || ((option.frameWidth) <= 400)){
      $(lineX).css("borderBottom", "solid black 1px");
      $(arrowX).css("borderWidth", "0 1px 1px 0");
      $(lineY).css("borderLeft", "solid black 1px");
      $(arrowY).css("borderWidth", "0 1px 1px 0");
    }




    // these variables are related to the columns but were defined here in order tohave the size width btw columns labels and chartdivision labels
    let columnsNumber = argum.length;

    // diff will be used to calculate the space btw the columns
    let diff = 0;
    if (columnsNumber % 2 == 0){ // for even number of columns
      diff = 0.5
    } else {  // for odd number of columns
      diff = 1;
    }

    var columnWidth = frameWidth / (columnsNumber + ((Math.floor(columnsNumber / 2)) + diff));
    // console.log("columwidth " + columnWidth + "\nframewidth " + frameWidth + "\ncolumnsNumber "+ columnsNumber + "\ndiff "+ diff)


    // +++++++++++++++++++++++++++++++++++++++++++++
    // ++++++++++ CHART DIVISIONS ELEMENT ++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++
    //draw the Y axis divisions
    let numberOfDivisions = 4;    //  default number of divisions
    if (option.numberOfDivisionsYAxis){
      numberOfDivisions = option.numberOfDivisionsYAxis; //change default if user says
    }

    let divisionsHeigth = frameHeight /numberOfDivisions;
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
    let tempLabelDivFontS = 10;
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
        console.log("percentage");

        // if (countDivision == 0){
        //   console.log("once");
        //   tempLabelDivFontS = 0;
        //   tempLabelDivFontS =
        //   (setFontSize("100%",             // call setFontSize with the arguments: chartLabelText
        //               bigFrame,                          // bigFrame is the current HTML element parent
        //               "height",                          // apply the size related to the height
        //               columnWidth,        // maximum size of the current element is supposed to support
        //               8,                                 // start the fontSize in 8
        //               "+",                               // the fontSize will increase
        //               option.chartLabelFontFamily) );   // fontFamily to be used
        //               console.log("templafS: " + tempLabelDivFontS);

      } else if (((option.typeOfDivision).toLowerCase()) == "absolute"){
        $(labelDivision[countDivision]).html(textLabelDivision);
        console.log("abs");
      }

      $(labelDivision[countDivision]).css({
        fontSize: tempLabelDivFontS,
        position: "absolute",
        right: frameWidth + 5,
      });

      // vertical position
      $(labelDivision[countDivision]).css("bottom", (topDivisionPos - ((parseFloat($(labelDivision[countDivision]).css("height"))) / 2)));

      // change the positioning variable and label one
      topDivisionPos += divisionsHeigth;
      textLabelDivision += multTextLabelDivision;


  }












// these variables were defined above in order to have the same width for the columns and the Y axis labels
    // let columnsNumber = argum.length;

    // // diff will be used to calculate the space btw the columns
    // let diff = 0;
    // if (columnsNumber % 2 == 0){ // for even number of columns
    //   diff = 0.5
    // } else {  // for odd number of columns
    //   diff = 1;
    // }

    // let columnWidth = frameWidth / (columnsNumber + ((Math.floor(columnsNumber / 2)) + diff));
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
        height: ((argum[i] / ceilChart) * frameHeight),
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
          } else if (option.setLabelColumnPos.toLowerCase() == "over"){
            $(labelColumns[i]).css("bottom",
                              ((parseInt($(columns[i]).css("height")))));
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
          if (((option.setXLabel.toLowerCase()) == "month") || ((option.setXLabel.toLowerCase()) == "on")) {
            eachXLabel = setXLabelMonth(argum.length, option.setXLabelStarts);
          } else if ((option.setXLabel.toLowerCase()) == "number"){
            console.log("now is number");
            if ((typeof(Number(option.setXLabel))) == "number"){
              console.log("OK, but need to have information from the user");
            }
          }
          }
        }
      // }

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

      // setup the fontSize of the labelAxisColumn HERE
















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
  // var frameHeight = distancek;
  // var frameWidth = option.frameWidth * 0.7;
  */



  }

// barC([100, 201, 307, 600, 799, 878, 130, 700, 588, 80, 110, 50, 60, 70],
// barC([100, 201, 307, 600, 799, 878, 130, 700, 588],
  barC(
    // FIRST ARGUMENT
    //  data to be considered in the chart:
    [100, 201, 307, 600, 799, 70],

    // SECOND ARGUMENT
    //  chart options
    {
    //bigFrame Features:
    frameHeight: 400, frameWidth: 600, /* consider color and border features*/

    //chartLabelFeatures:
    chartLabelText: "ChartLabel!", chartLabelFontFamily: "Arial", chartLabelFontSize: 50, chartLabelColor: "green",
     chartLabelBorder: "",

    //chart features:
    setXLabel: "month", setXLabelStarts: "mar",
      setMaximunValue: 1500,
      xLabelText: "Monthly $ spend",
      setColumnsFont: 0, setColumnWithLabel: true, setLabelColumnPos: "over", /*top, bottom, middle and over*/
      numberOfDivisionsYAxis: 4, typeOfDivision: "percent", setDivisionsOverColumns: 0},

    // THIRD ARGUMENT
    //  chart position, that is, in what element it's supposed to be placed
    "#barChartPlace"
   );


  //  barC({["jan", 100], ["feb", 200], ["mar", 150], ["apr", 230]});

// barC({"month": "jan", {"north":10, "south":20}},
//       {"montn": "feb", {"north":20, "south": 30}});

});
