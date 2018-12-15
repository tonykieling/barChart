$(function(){
  "use strict";

  function bigNumb(numbers){
    return Math.max(...numbers);
  }

  function barC(argum){
  console.log("arguments: " + argum);
  let biggestNumber = bigNumb(argum);
  let ceilChart = Math.ceil(biggestNumber * 1.05); // 5% margin to the biggest number
  console.log("big: " + biggestNumber);
  // defineHeight(argum, frameHeigth);

    //frame creation
    var frame = $("<div></div>");
    var frameHeigth = 300;
    var frameWidth = 400;
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

  }

barC([10, 20, 5, 70, 80, 15, 50]);

});
