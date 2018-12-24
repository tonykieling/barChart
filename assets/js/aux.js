// returns fontSize fittable for the attribute (height or width) in case
function setFontSize(contentF, attributeF, maxF, fontSizeF, operatorF, fontFamilyF = "Arial"){
  console.log(
    "\ncontentF: " + contentF +
    "\nattributeF: " + attributeF +
    "\nmaxF: " + maxF +
    "\nfontSizeF: " + (fontSizeF) +
    "\noperatorF: " + operatorF +
    "\nfontFamilyF: " + fontFamilyF +
    "\n\n" +
    "maxF(" + maxF + ") * fontSizeF(" + fontSizeF + ") = " + eval(maxF * fontSizeF) +
    "\n\n");
    //  +
    // fontSizeF + " " + operatorF + " " + maxF + " = " +
  //  eval(fontSizeF + operatorF + maxF));
  // eval(fontSizeF + (operatorF)));
  // eval(operatorF + (Number(fontSizeF))));
  // if (operatorF = ">"){
  //   console.log("biiger than");
  //   if (eval(fontSizeF + operatorF + maxF)){
  //     console.log("fontsize BIGGER than MaxF");
  //   }
  // }
  let u = fontSizeF + eval((fontSizeF) + operatorF + operatorF + ";");
  console.log(u);
}
setFontSize("asd", "width", 40, 50, "+");
/*
  if ((contentF == "") || (contentF == null)){
    console.log("have to return 0");
    return 0;
  }

  const tempFontSize = (parseInt(fontSizeF));
  // const heightMax = option.frameHeight * 0.1;


  let returnVar;
  let countFontSize = 0;

  let elementF = $("<div></div>");
  $(elementF).css({
    fontSize: fontSizeF,
    fontFamily: fontFamilyF,
  });

  while ((parseInt($(elementF).css(attributeF))) < maxF){
    $(elementF).css({
      fontSize: (tempFontSize + countFontSize),
    });
    countFontSize--;

    if (countFontSize > (-30)){    // just in case to avoid infinite loops
      break;
    }
  }
  return returnVar;
}
*/
  // if ((parseInt(fontSizeF)) < (parseInt($(chartLabel).css("fontSize")))){
  //   if ((parseInt(option.chartLabelFontSize)) > 8){ //minumum size
  //     $(chartLabel).css("fontSize", parseInt(option.chartLabelFontSize));
  //   }
  // }



/*
function setXLabelMonth(argum, monthToStart = 0){
  console.log(argum + " and " + (monthToStart));
  let nObj = {};
  let varToReturn = [];
  const monthN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];

  let mIndex = 0;
  if (typeof(monthToStart) == "string"){
    console.log("month type is string");
    while (monthN[mIndex]){
      if (monthToStart.toLowerCase() == monthN[mIndex].toLowerCase()){
        break;
      }
      mIndex++;
    }

  } else if (typeof(monthToStart) == "number"){
    console.log("month type is number");
    mIndex = monthToStart = 0;
  }

  for (let mcount = 0; mcount < argum; mcount++){
    nObj = {key: mIndex, value: monthN[(mIndex % monthN.length)]};
    varToReturn.push(nObj);
    mIndex++;
  }
  return (varToReturn);
}

let mvar = [1000, 201, 307, 600, 799, 878, 900];//, 130, 700, 588, 80, 110, 500, 1, 2, 3, 5];
// for (let i = 0; i < 3; i++){
//   mvar.push(mvar[i]);
// }
// console.log(mvar.slice("+"));

let k1 = setXLabelMonth(mvar.length, "ago");
for (let p in k1){
  console.log(k1[p].value + " = " + mvar[p]);
}
// console.log(k1[0]);
*/
