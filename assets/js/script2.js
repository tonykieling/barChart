/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable indent */
$(function(){
  "use strict";

//*******************************************
// function to check what type of object is being received.
// It will be used to deal with the data and build the columns
// *********************************************
function checkTypeOfObject(mArray){

  for (let i in mArray){
    if (mArray[i] instanceof Array){
      console.log("Array of Arrays");
      return ("AA");
    } else if (mArray[i] instanceof Object){
      console.log("Array of objects");
      return ("AO");
    }
  }
  console.log("Only one Array");
  return "OOA";
}



//*******************************************
// function to define the size of the space btw columns,
// according user's arguments
// It will be used to build the columns
// *********************************************
function aboutColumnsFunc(frameWidthF, columnsNumberF, typeOfSpace){
  console.log(frameWidthF, columnsNumberF, typeOfSpace);
  let valueToReturn = [];
  if (typeOfSpace == "extra"){
    console.log("this is extra space");
    valueToReturn.push(frameWidthF / (columnsNumberF + (columnsNumberF + 1)));
    valueToReturn.push(frameWidthF / (columnsNumberF + (columnsNumberF + 1)));
    console.log(valueToReturn);
    return valueToReturn;
  } else if (typeOfSpace == "small"){
    console.log("this is small space");
    valueToReturn.push(frameWidthF / (columnsNumberF + ((columnsNumberF + 1) * 0.25)));
    valueToReturn.push((frameWidthF / (columnsNumberF + ((columnsNumberF + 1) * 0.25))) * 0.25);
    console.log(valueToReturn);
    return valueToReturn;
  }

}


// it checks if the fontSize passed by the user is fittable in the current element, which can be chartLabel or Xlabel.
// it returns fontSize fittable for the attribute in case, height or width.
// the maximum fontSize possible will be regarding the definition of the host element width or height
function setFontSize(contentF, hostElement, attributeF, maxF, userFontSize, operatorF, fontFamilyF = "Arial"){

  maxF = parseInt(maxF);

  // console.log(
  //   "contentF: " + contentF +
  //   "\nhostElement: " + hostElement +
  //    "\nattributeF: " + attributeF +
  //    "\nmaxF: "  + maxF +
  //     "\nuserFontSize: " + userFontSize +
  //     "\noperatorF: " + operatorF +
  //      "\nfontFamilyF: " + fontFamilyF
  // );

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

  if (parseInt($(elementF).css(attributeF)) < maxF){
    $(elementF).remove();
    // console.log("fontSize is bigger than 8 and it's okay");
    return(userFontSize);
  }

  let sbF = "";
  if (operatorF == "+"){
    sbF = "<=";
  } else if (operatorF == "-"){
    sbF = ">=";
  }

  // increase or decrease the size of the font according the size of the element passed by the user (height or width)
  // console.log("attrib::: " + parseInt($(elementF).css(attributeF)));
  let mcountF = 1;
  // console.log(((parseInt($(elementF).css(attributeF))) + " " + sbF + " " + maxF));
  let countFontSize = 0;
  while (eval((parseInt($(elementF).css(attributeF))) + sbF + maxF)){
    countFontSize = eval(countFontSize + operatorF + 1);
    returnVar = userFontSize + countFontSize;
    $(elementF).css({
      fontSize: returnVar
      });

    if (mcountF > 30){ // just in case
      console.log("Break! Something's wrong.");
      $(elementF).remove();
      return 8;
    }
    mcountF++;
  }
  $(elementF).remove();
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
  FUNCTION TO ARRANGE NUMBER'S LABELS ACCORDING USER ARGUMENT
  **********************************************************
  */
  function setXLabelNumber(argumM, numberToStart = 0, inc = 1){
    // console.log(argumM , " -- ", numberToStart, " -- ", inc);
    if (typeof(numberToStart) == "string"){
      // console.log("here string");
      numberToStart = (Number(numberToStart));
      if (isNaN(numberToStart)){
        numberToStart = 0;
      }
    }
    let numbObj = {};
    let arrayToReturn = [];
    let tempNumb = numberToStart;
    for (let counting = 0; counting < argumM; counting++){
      numbObj = {key: counting, value: tempNumb};
      arrayToReturn.push(numbObj);
      tempNumb += inc;
    }
    return (arrayToReturn);
  }





  /*
  **********************************************************
  FUNCTION TO GENERATE A BAR CHART *************************
  **********************************************************
  */
  function drawBarChart(argum, option = "", element = ""){
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
      backgroundColor: "#E0E4E3",
      border: "solid 1px black"
    });

    if (option.setBigFrameColor){ // if no background color definition
      $(bigFrame).css("backgroundColor", option.setBigFrameColor);
    }
    if (option.setBigFrameBorder){ // if no border definition
      $(bigFrame).css("border", option.setBigFrameBorder);
    }



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
      fontFamily: `${option.chartLabelFontFamily}, "Arial"`,
      fontSize: option.chartLabelFontSize,
      color: "darkslategrey",
      backgroundColor: "#E0E4E3",
      border: "",
    });
    if (option.chartLabelFontColor){
      $(chartLabel).css("color", option.chartLabelFontColor);
    }
    if (option.chartLabelBackColor){
      $(chartLabel).css("backgroundColor", option.chartLabelColor);
    } else if (option.setBigFrameColor){
      $(chartLabel).css("backgroundColor", option.setBigFrameColor);
    }
    if (option.chartLabelBorder){
      $(chartLabel).css("border", option.chartLabelBorder);
    }

    if (!option.chartLabelText){  // if no chartLabel defined by the user, the room for chartLabel has to be small (3% of the whole frame)
      $(chartLabel).css("height", (option.frameHeight * 0.03));
    } else {
      if ((Number(option.chartLabelFontSize < 8)) && (Number(option.chartLabelFontSize) > 0)){
        // console.log("chartLabel is valid but no fontSize btw 0 - 7");
        $(chartLabel).css("fontSize", 8);

      } else if (parseInt(option.chartLabelFontSize) >= 8){ // it will call the function setFontSize only to check if the size is fittable with the chartlabel room
        // console.log("user define sizeFont as: " + option.chartLabelFontSize + " and the function will check if it is fittable");
        $(chartLabel).css("fontSize",
                  (setFontSize(option.chartLabelText,               // call setFontSize with the arguments: chartLabelText
                               bigFrame,                            // bigFrame is the current HTML element parent
                               "height",                            // apply the size related to the height
                               (option.frameHeight * 0.1),          // maximum size of the current element is supposed to support
                               Number(option.chartLabelFontSize),   // user's fontSize
                               "-",                                 // the fontSize will decrease, just in case user'a FontSize too big
                               option.chartLabelFontFamily) ));     // fontFamily to be used

      } else { // just in case, programmer's definition
        // console.log("programeer definition of chartlabelfontSize");
        $(chartLabel).css("fontSize",
                  (setFontSize(option.chartLabelText,               // call setFontSize with the arguments: chartLabelText
                               bigFrame,                            // bigFrame is the current HTML element parent
                               "height",                            // apply the size related to the height
                               (option.frameHeight * 0.1),          // maximum size of the current element is supposed to support
                               50,                                  // programmer's fontSize
                               "-",                                 // the fontSize will decrease, just in case user'a FontSize too big
                               option.chartLabelFontFamily) ));     // fontFamily to be used
      }
    }




    // +++++++++++++++++++++++++++++++++++++++
    // ++++++++++ FRAME ELEMENT ++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++
    let typeOfData = checkTypeOfObject(argum);
    console.log(typeOfData, "type of date checked: ", typeOfData);

    let offSetVarVert = 0;
    if (option.chartLabelText){
      // console.log("chartLabelText = ", option.chartLabelText);
      offSetVarVert = 0.1;
    }
    if (option.xLabelText){
      // console.log("xLabelText = ", option.xLabelText);
      offSetVarVert += 0.04;
    }
    // if (((typeOfData == "OOA") || (typeOfData == "AA")) && (option.setXLabel) || (typeOfData == "AO")){
      offSetVarVert += 0.04; // adds 4% for the XLabel room if there is Xlabel
    // }

    let offSetVarHoriz = 0;
    if (typeOfData == "AA") {   //with legend
      offSetVarHoriz = 0.3;
      console.log("chart width prepared to receive legend");
    } else {
      offSetVarHoriz = 0.1;
    }



    let frameHeight = ((option.frameHeight * (1 - offSetVarVert)) - 35); // 35 is related to the arrow spot
    let frameWidth = ((option.frameWidth * (1 - offSetVarHoriz)) - 85);  // 85 from the divisionLabel

    let biggestNumber = Math.max(...argum);

    if (typeOfData == "AA"){
      biggestNumber = 0;
      for (let r in argum){
          let temp = 0;
          temp = Math.max(...argum[r][0]);
          if (temp > biggestNumber){
            biggestNumber = temp;
          }
      }
    } else if (typeOfData == "AO"){
      biggestNumber = 0;
      for (let c in argum){
        for (let k in argum[c]){
          if (argum[c][k] > biggestNumber){
            biggestNumber = argum[c][k];
          }
        }
      }
    }

    let ceilChart = biggestNumber * 1.02;   //it gives a offset to the frame chart related to the biggest column
    if (option.setMaximunValue){
      if (option.setMaximunValue > biggestNumber){
        ceilChart = option.setMaximunValue; //change the frame reference to the biggest value if the user say so
      }
    }


    //frame to the bar chart
    let frame = $("<div></div>");
    $(bigFrame).append(frame);
    $(frame).css({
      position: "absolute",
      left: ((option.frameWidth - frameWidth)/2),
      // top: (parseInt($(chartLabel).css("height"))) + ((parseInt($(chartLabel).css("height"))) * 0.4),  //distance related to the chartlabel
      top: ((parseInt($(chartLabel).css("height"))) * 1.5),  //distance related to the chartlabel
      width: frameWidth,
      height: frameHeight,
      backgroundColor: "aquamarine",   //set default and user's option
    });



    // //*************************************** */
    // // Draw the legend ********************** */
    // //*************************************** */
    // if (typeOfData == "AA"){
    //   let legendText = [];
    //   let legendColor = [];
    //   const legendColorHeight = (frameWidth * 0.05);
    //   const legendColorWidth = (frameWidth * 0.05);
    //   const topLegendColor = (legendColorHeight * 0.75);
    //   let topLegend = topLegendColor;

    //   // it will calculate the spaces according the number of columns
    //   let countSpaces = ((legendColorHeight * (Number(argum[0][1].length))) +
    //                    (((Number(argum[0][1].length)) - 1) * (topLegendColor / 2)) + (2 * topLegendColor));

    //   $(frame).css("left", (frameWidth / 5));
    //   let legendFrame = $("<div></div>");
    //   $(frame).append(legendFrame);
    //   $(legendFrame).css({
    //     position: "absolute",
    //     width: ((option.frameWidth * offSetVarHoriz) * 0.7), // 80% of the whole frameWidth's Horizontal offset
    //     height: countSpaces,
    //     border: "solid 0.5px grey",
    //   });
    //   $(legendFrame).css({
    //     top: (($(legendFrame).height()) / 2),
    //     left: ((frameWidth) + (($(legendFrame).width()) / 5))
    //   });

    //   for (let i in argum){
    //     for (let k in argum[i][1]){
    //       legendColor[k] = $("<div></div>");
    //       $(legendFrame).append(legendColor[k]);
    //       $(legendColor[k]).css({
    //         position: "absolute",
    //         backgroundColor: (argum[i][2][k]),
    //         height: legendColorHeight,
    //         width: legendColorWidth,
    //         left: (legendColorWidth * 0.75),
    //         top: topLegend,
    //       });

    //       legendText[k] = $("<div></div>");
    //       $(legendFrame).append(legendText[k]);
    //       $(legendText[k]).html(argum[i][1][k]);
    //       $(legendText[k]).css({
    //         position: "absolute",
    //         left: ((legendColorWidth * 0.75) + (legendColorHeight * 1.5)),
    //         top: topLegend,
    //       });

    //       if (option.setEmphasis){
    //         $(legendColor[k]).hover(function(){
    //           $(this).css("border", ("solid 2px ").concat($(this).css("backgroundColor")));
    //           $(legendText[k]).css("fontWeight", "bold");

    //           }, function(){
    //             $(this).css("border", "none");
    //             $(legendText[k]).css("fontWeight", "normal");
    //         });
    //       }

    //         topLegend = (topLegendColor + ((Number(k) + 1) * legendColorHeight) + ((Number(k) + 1) * (topLegendColor / 2)));
    //     }
    //     break;
    //   }
    // }














    if (option.setFrameColor){
      $(frame).css("backgroundColor", option.setFrameColor);
    }




    // +++++++++++++++++++++++++++++++++++++++
    // ++++++++++ Y ARROW ELEMENT ++++++++++++
    // +++++++++++++++++++++++++++++++++++++++
    let lineY = $("<div></div>");
    $(frame).append(lineY);
    $(lineY).css({
      height: frameHeight * 1.05, // the arrow's line is gonna be 5% bigger than the frame heigth
      position: "absolute",
      bottom: (-1) * (((frameHeight * 1.05) - frameHeight) / 2),
      borderLeft: "solid black",
      zIndex: 15,
    });
    let arrowY = $("<div></div>");
    $(lineY).append(arrowY);
    $(arrowY).css({
      position: "absolute",
      top: (-1) * (((frameHeight * 1.03) - frameHeight) / 4),
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
      left: (-1) * ((frameWidth * 0.05) / 2),
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
      multTextLabelDivision = parseInt(100 / numberOfDivisions);
      textLabelDivision = multTextLabelDivision;
      if (!option.numberOfDivisionsYAxis){
        numberOfDivisions = 4;
      }
    }

    let divisions = [];
    let labelDivision = [];
    let tempLabelDivFontS = 8;
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
        $(divisions[countDivision]).css("zIndex", 12);
      }

      //insert a label for each division here
      labelDivision[countDivision] = $("<div></div>");
      $(frame).append(labelDivision[countDivision]);

      // the division label has to have % if it's the case
      if ((option.typeOfDivision).toLowerCase() == "percent"){
        $(labelDivision[countDivision]).html(textLabelDivision + "%");

        if (countDivision == 0){

          // fontSize of the labelDiv right now is related to the frameWidth
          tempLabelDivFontS =
                        (setFontSize("100%",               // call setFontSize with the arguments: chartLabelText
                          bigFrame,                            // bigFrame is the current HTML element parent
                          "width",                            // apply the size related to the height
                          frameWidth * 0.07,          // maximum size of the current element is supposed to support
                          20, //user's fontSize
                          "-",                                 // the fontSize will decrease, just in case user'a FontSize too big
                          "Arial") );     // fontFamily to be used
        }

      } else if (((option.typeOfDivision).toLowerCase()) == "absolute"){
        $(labelDivision[countDivision]).html(textLabelDivision);
        if (countDivision == 0){
          if (option.setDivLabelFontSize){
            if (option.setDivLabelFontSize < 8){
              tempLabelDivFontS = 8;
            } else{
              // fontSize of the labelDiv right now is related to the frameWidth
              tempLabelDivFontS =
                        (setFontSize(biggestNumber,       // call setFontSize with the arguments: chartLabelText
                          bigFrame,                       // bigFrame is the current HTML element parent
                          "width",                        // apply the size related to the height
                          frameWidth * 0.07,              // maximum size of the current element is supposed to support
                          option.setDivLabelFontSize,     //user's fontSize
                          "-",                            // the fontSize will decrease, just in case user'a FontSize too big
                          "Arial") );                     // fontFamily to be used
            }

          } else { // NO user font Definition, that means, programmer's definition
            // fontSize of the labelDiv right now is related to the frameWidth
            tempLabelDivFontS =
                        (setFontSize(biggestNumber,       // call setFontSize with the arguments: chartLabelText
                          bigFrame,                       // bigFrame is the current HTML element parent
                          "width",                        // apply the size related to the height
                          frameWidth * 0.07,              // maximum size of the current element is supposed to support
                          15,                             // no user's fontSize definition, so 15 is gonna play (programmer definition)
                          "-",                            // the fontSize will decrease, just in case user'a FontSize too big
                          "Arial") );                     // fontFamily to be used
          }
        }


      }

      $(labelDivision[countDivision]).css({
        fontSize: tempLabelDivFontS,
        position: "absolute",
        right: frameWidth + 5,
        bottom: (topDivisionPos - ((parseFloat($(labelDivision[countDivision]).css("height"))) / 2))  //vertical position
      });

      // change the positioning variable and label one
      topDivisionPos += divisionsHeigth;
      textLabelDivision += multTextLabelDivision;
  }




  //******************************************************************
  //******************************************************************
  // Working with columns and their aspects   ************************
  //******************************************************************
  //******************************************************************

    // these variables are related to the columns but they were defined here in order to have the same width btw columns labels and chartdivision labels
    let columnsNumber = argum.length;

    // diff will be used to calculate the space btw the columns
    let diff = 0;
    if (columnsNumber % 2 == 0){ // for even number of columns
      diff = 0.5;
    } else {  // for odd number of columns
      diff = 1;
    }

    let columnWidth = frameWidth / (columnsNumber + ((Math.floor(columnsNumber / 2)) + diff));
    let spaceBtwCol = columnWidth / 2;


    // dealing with different space btw columns
    if (option.setSpaceColumn){
      if ((option.setSpaceColumn.toLowerCase()) == "extra"){
        console.log("Space btw the columns has to be extra!");
        let tempAboutColumns = aboutColumnsFunc(frameWidth, columnsNumber, "extra");
        columnWidth = tempAboutColumns[0];
        spaceBtwCol = tempAboutColumns[1];
      } else if ((option.setSpaceColumn.toLowerCase()) == "small"){
        console.log("Small Space btw the columns.");
        let tempAboutColumns = aboutColumnsFunc(frameWidth, columnsNumber, "small");
        columnWidth = tempAboutColumns[0];
        spaceBtwCol = tempAboutColumns[1];
      }
    }




    let barBottom = 0;
    let vleft = 0;
    let columns = [];
    let multColumns = [];
    let labelAxisColumn = [];
    let labelColumns = [];
    let eachXLabel = [];


    for (let i in argum){
      // console.log(`${i}o item: ${argum[i]}`);
      if (i == 0){
        vleft = spaceBtwCol;
      } else {
        vleft = (spaceBtwCol * (Number(i) + 1)) + (columnWidth * (Number(i)));
      }



      // deal with Only One Array structure
      if (typeOfData == "OOA"){
        console.log("dealing with Only One Array");
        //column creation for each number received as data within the array ou object
        columns[i] = $("<div></div>");
        $(frame).append(columns[i]);
        $(columns[i]).css({
          position: "absolute",
          bottom: barBottom,
          left: vleft,
          backgroundColor: "DarkCyan",
          width: columnWidth,
          height: ((argum[i] / ceilChart) * frameHeight),
          zIndex: 10,
        });
        if (option.setBarColor){
          $(columns[i]).css("backgroundColor", option.setBarColor);
        }



        //COLUMN LABEL
        if (option.setColumnWithLabel == true){
          //label within each column
          labelColumns[i] = $("<div></div>");
          $(columns[i]).append(labelColumns[i]);
          $(labelColumns[i]).html(argum[i]);
          $(labelColumns[i]).css({
            position: "absolute",
            fontFamily: `${option.setColumnsFont}, "Arial"`,  //fontFamily default is Arial
            width: "100%",
            fontSize: "1.5vw",
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


        //insert a Xlabel for each column here
        if (i == 0) { // it will set the label , or its variable, only in the very first time
          if (typeof(option.setXLabel) == "string"){
            if (((option.setXLabel.toLowerCase()) == "month") || ((option.setXLabel.toLowerCase()) == "on")) {
              eachXLabel = setXLabelMonth(argum.length, option.setXLabelStarts);
            } else if ((option.setXLabel.toLowerCase()) == "number"){
                eachXLabel = setXLabelNumber(argum.length, option.setXLabelStarts, option.setXLabelInc);
            } else {
              console.log("check this out later");
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


          // emphasis and moviment if so
          if (option.setEmphasis){
            $(columns[i]).hover(function(){
              $(this).css("border", ("solid 2px ").concat($(this).css("backgroundColor")));
              $(labelAxisColumn[i]).css("fontWeight", "bold");
              if (option.setColumnWithLabel == true){
                $(labelColumns[i]).css("fontWeight", "bold");
              }
              }, function(){
                $(this).css("border", "none");
                $(labelAxisColumn[i]).css("fontWeight", "normal");
                if (option.setColumnWithLabel == true){
                  $(labelColumns[i]).css("fontWeight", "normal");
                }
            });
        }




      }



      // deal with Array of Arrays
      if (typeOfData == "AA"){
        console.log("dealing with Array os Arrays");


        //*************************************** */
        // Draw the legend ********************** */
        //*************************************** */
        let legendText = [];
        let legendColor = [];
        const legendColorHeight = (frameWidth * 0.05);
        const legendColorWidth = (frameWidth * 0.05);
        const topLegendColor = (legendColorHeight * 0.75);
        let topLegend = topLegendColor;

        // it will calculate the spaces and size for the legend frame, according the number of columns
        let countSpaces = ((legendColorHeight * (Number(argum[0][1].length))) +
                        (((Number(argum[0][1].length)) - 1) * (topLegendColor / 2)) + (2 * topLegendColor));

        $(frame).css("left", (frameWidth / 5));
        let legendFrame = $("<div></div>");
        $(frame).append(legendFrame);
        $(legendFrame).css({
          position: "absolute",
          width: ((option.frameWidth * offSetVarHoriz) * 0.7), // 80% of the whole frameWidth's Horizontal offset
          height: countSpaces,
          border: "solid 0.5px grey",
        });
        $(legendFrame).css({
          top: (($(legendFrame).height()) / 2),
          left: ((frameWidth) + (($(legendFrame).width()) / 5))
        });

        for (let i in argum){
          for (let k in argum[i][1]){
            legendColor[k] = $("<div></div>");
            $(legendFrame).append(legendColor[k]);
            $(legendColor[k]).css({
              position: "absolute",
              backgroundColor: (argum[i][2][k]),
              height: legendColorHeight,
              width: legendColorWidth,
              left: (legendColorWidth * 0.75),
              top: topLegend,
            });

            legendText[k] = $("<div></div>");
            $(legendFrame).append(legendText[k]);
            $(legendText[k]).html(argum[i][1][k]);
            $(legendText[k]).css({
              position: "absolute",
              left: ((legendColorWidth * 0.75) + (legendColorHeight * 1.5)),
              top: topLegend,
            });

              topLegend = (topLegendColor + ((Number(k) + 1) * legendColorHeight) + ((Number(k) + 1) * (topLegendColor / 2)));
          }
          break;
        }


        let tempVleft = vleft;
        multColumns[i] = [];
        for (let subBar in argum[i][0]){
          multColumns[i][subBar] = $("<div></div>");
          $(frame).append(multColumns[i][subBar]);
          $(multColumns[i][subBar]).css({
            bottom: barBottom,
            position: "absolute",
            width: (columnWidth / (Number(argum[i][0].length))),
            left: tempVleft,
            height: (((argum[i][0][subBar]) / ceilChart) * frameHeight),
            backgroundColor: argum[i][2][subBar],
            zIndex: 10,
          });
          tempVleft += ($(multColumns[i][subBar]).width());


          if (option.setColumnWithLabel == true){
            //label within each column
            labelColumns[i] = [];
              labelColumns[i][subBar] = $("<div></div>");
              $(multColumns[i][subBar]).append(labelColumns[i][subBar]);
              $(labelColumns[i][subBar]).html(argum[i][0][subBar]);
              $(labelColumns[i][subBar]).css({
                position: "absolute",
                fontFamily: `${option.setColumnsFont}, "Arial"`,  //fontFamily default is Arial
                width: "100%",
                fontSize: "1.5vw",
                zIndex: 11,  //same columns[i]'s zIndex
                textAlign: "center",
              });

          // vertical position: top, bottom or middle
          if (typeof(option.setLabelColumnPos) == "string"){
            if (option.setLabelColumnPos.toLowerCase() == "top"){
              $(labelColumns[i][subBar]).css("top", 0);
            } else if (option.setLabelColumnPos.toLowerCase() == "bottom"){
              $(labelColumns[i][subBar]).css("bottom", 0);

            } else if (option.setLabelColumnPos.toLowerCase() == "middle"){
              $(labelColumns[i][subBar]).css("bottom",
                                (((parseInt($(multColumns[i][subBar]).css("height"))) - (parseInt($(labelColumns[i][subBar]).css("height")))) / 2));
            } else if (option.setLabelColumnPos.toLowerCase() == "over"){
              $(labelColumns[i][subBar]).css("bottom",
                                ((parseInt($(multColumns[i][subBar]).css("height")))));
            } else {
              console.log("columnposition: gonna be top (default)");
              $(labelColumns[i][subBar]).css("top", 0);
            }
          } else{
            console.log("Please the Column Label Position parameter (setLabelColumnPos) has to be a string 'TOP', 'BOTTOM' or 'MIDDLE'.");
            $(labelColumns[i][subBar]).css("top", 0);
          }
        }

        // draw the XLabel only in the last number of the array and check if this is auto month
        if (subBar == ((Number(argum[i][0].length) - 1))){
          // XLabel
          if (option.setXLabel){
              //insert a label for each column here
              if (i == 0) { // it will set the label , or its variable, only in the very first time
                if (typeof(option.setXLabel) == "string"){
                  if (((option.setXLabel.toLowerCase()) == "month") || ((option.setXLabel.toLowerCase()) == "on")) {
                    eachXLabel = setXLabelMonth(argum[i][0].length, option.setXLabelStarts);
                    console.log("xlabeltype is ", typeof(eachXLabel));
                  } else if ((option.setXLabel.toLowerCase()) == "number"){
                    eachXLabel = setXLabelNumber(argum[i][0].length, option.setXLabelStarts, option.setXLabelInc);
                    console.log("now is number");
                  }
                } else {
                  console.log("check this out later");
                }
              }
            } else {
              if (i == 0){
                for (let mv = 0; mv < argum[i].length; mv++){
                  let labObj = {};
                  labObj = {key: mv, value:argum[mv][3]};
                  eachXLabel.push(labObj);
                }
              }
            }

            labelAxisColumn[i] = $("<div></div>");
            $(multColumns[i][0]).append(labelAxisColumn[i]);
            $(labelAxisColumn[i]).html(eachXLabel[i].value);
            $(labelAxisColumn[i]).css({
              position: "absolute",
              bottom: -20,
              width: ($(multColumns[i][0]).width() * argum[i][0].length),
              fontSize: "1.4vw",
              textAlign:"center",
            });
          }
        }


        // check emphasis and apply the functionally if so
        // this is for the legendcolor context
        if (option.setEmphasis){
          for (let count in argum[i][0]){
            $(legendColor[count]).hover(function(){
              $(this).css("border", ("solid 2px ").concat($(this).css("backgroundColor")));
              $(legendText[count]).css({
                fontWeight: "bold",
              });
              for (let n in multColumns[i]){
                $(multColumns[n][count]).css("border", ("solid 2px ").concat($(this).css("backgroundColor")));
              }

              }, function(){
                $(this).css("border", "none");
                $(legendText[count]).css("fontWeight", "normal");
                for (let m in multColumns[i]){
                  $(multColumns[m][count]).css("border", "none");
                }
            });
          }
        }
      }



      // deal with Array of Objects structure
      if (typeOfData == "AO"){
        console.log("dealing with Array of Objects");

        for (let be in argum[i]){
          //column creation for each number received as data within the array ou object
          columns[i] = $("<div></div>");
          $(frame).append(columns[i]);
          $(columns[i]).css({
            position: "absolute",
            bottom: barBottom,
            left: vleft,
            backgroundColor: "darksalmon",
            width: columnWidth,
            height: ((argum[i][be] / ceilChart) * frameHeight),
            zIndex: 10,
          });
        if (option.setBarColor){
          $(columns[i]).css("backgroundColor", option.setBarColor);
        }


        //COLUMN LABEL
        if (option.setColumnWithLabel == true){
          //label within each column
          labelColumns[i] = $("<div></div>");
          $(columns[i]).append(labelColumns[i]);
          $(labelColumns[i]).html(argum[i][be]);
          $(labelColumns[i]).css({
            position: "absolute",
            fontFamily: `${option.setColumnsFont}, "Arial"`,  //fontFamily default is Arial
            width: "100%",
            fontSize: "1.5vw",
            zIndex: 11,  //same columns[i]'s zIndex
            textAlign: "center",
          });
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

          //insert a Xlabel for each column here
          // this type of data structure contains labels, ridding of any field of label passed for the user, besides the data
          labelAxisColumn[i] = $("<div></div>");
          $(columns[i]).append(labelAxisColumn[i]);
          $(labelAxisColumn[i]).html(be);
          $(labelAxisColumn[i]).css({
            position: "absolute",
            bottom: -20,
            width: "100%",
            fontSize: "1.4vw",
            textAlign:"center",
          });


          // emphasis and moviment if so
          if (option.setEmphasis){
              $(columns[i]).hover(function(){
                $(this).css("border", ("solid 2px ").concat($(this).css("backgroundColor")));
                $(labelAxisColumn[i]).css("fontWeight", "bold");
                if (option.setColumnWithLabel == true){
                  $(labelColumns[i]).css("fontWeight", "bold");
                }
                }, function(){
                  $(this).css("border", "none");
                  $(labelAxisColumn[i]).css("fontWeight", "normal");
                  if (option.setColumnWithLabel == true){
                    $(labelColumns[i]).css("fontWeight", "normal");
                  }
              });
          }
        }
      }


    } // for let in argum
  } // last }

  drawBarChart(
    // FIRST ARGUMENT
    // data
             [[[99, 88, 80, 70], ["North", "South", "East", "West"], ["navy", "olive", "MediumVioletRed	", "teal"], "2014"],
             [[41, 50, 45, 40], ["North", "South", "East", "West"], ["navy", "olive", "MediumVioletRed", "teal"], "2015"],
             [[55, 66, 70, 59], ["North", "South", "East", "West"], ["navy", "olive", "MediumVioletRed	", "teal"], "2016"],
             [[22, 33, 40, 30], ["North", "South", "East", "West"], ["navy", "olive", "MediumVioletRed	", "teal"], "2017"]],


    // SECOND ARGUMENT
    //  chart options
    {
      // bigFrame Features:
      frameHeight: 350, frameWidth: 900, /* consider color and border features*/
      setBigFrameColor: "tan", setBigFrameBorder: "solid 0.5px black",

      // chartFrame features:
      setFrameColor: "darksalmon",
      // setFrameColor: "lightyellow",
      setBarColor: "tan", setEmphasis: true,

      // chartLabelFeatures:
      chartLabelText: "Fall Winter (2017/2018) Sales by region", chartLabelFontFamily: "Arial", chartLabelFontSize: 0, chartLabelFontColor: "brown",
          chartLabelBorder: "", /*chartLabelBackColor: "red",*/

      // X Axis features:
      setXLabel: "month", setXLabelStarts: "oct", setXLabelInc: 2,
        //it will consider only the numbers passed by the user, regardless whether there is label. The label will be month starting in setXLabelStarts
      setColumnsFont: 10, setColumnWithLabel: false, setLabelColumnPos: "top", /*top, bottom, middle and over*/
      setSpaceColumn: "small",

      // Y Axis features
      setMaximunValue: 120,
      numberOfDivisionsYAxis: 6, typeOfDivision: "absolute", setDivLabelFontSize: "", setDivisionsOverColumns: false,

    },

    // THIRD ARGUMENT
    //  chart position, that is, in what element it's supposed to be placed
    "#barChartPlace2"
   );


});
