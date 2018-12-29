console.log("qweasd");
// function setDealArray(mArray){
//   let objectKeys = Object.keys(mArray);
//   console.log("ob: " , objectKeys);

//   console.log('======= Object.entries ==========');
//   Object.entries(objectKeys).forEach(([key, value]) => {
//   console.log(`key= ${key} value = ${value}`)
// })
// }
function setDealArray(bArray){
  let isSimpleArray = true;
  let isArrayObject = false;
  let hasLabel = false;
  console.log(bArray);
  console.log("array lenght: " + bArray.length);
  for (let i in bArray){
    console.log(((Number(i)) + 1) + "o object from the array: ");
    console.log(bArray[i]);
    for (let mkey in bArray[i]){
      if (bArray[i][mkey].length > 0){
        for(let k in bArray[i][mkey]){
          console.log("\t\"" + (mkey) + "\" is the key and its value is \"" + bArray[i][mkey][k] + "\"");
          isArrayObject = true;
          hasLabel = true;
        }
      } else {
        if (isNaN(mkey)){
          console.log("\t\"" + mkey + "\" value is " + bArray[i][mkey] + "aaaa");
          hasLabel = true;
        } else {
          console.log("\t" + ((Number(mkey)) + 1) + "o value is " + bArray[i][mkey]);
        }
      }
      isSimpleArray = false;
    }
  }
  console.log("\n\t\tSimpleArray: " + isSimpleArray);
  console.log("\t\tArrayObject: " + isArrayObject);
  console.log("\t\tLabel is: " + hasLabel);
  // console.log("------------------------------------------------------------------------------\n\n")
}


// ********************************
// I have to find multiple values
// ********************************************************
// ********************************************************




// first way: only numbers for each item, no label
// console.log("// first way: only numbers");
// let k = [10, 30, 47, 33];
// setDealArray(k);
// console.log("------------------------------------------------------------------------------\n\n")

// // second way: only one number for item and each one with label
console.log("// second way: only one number for item and each one with label");
k = [
  {"okay": 10},
  {"nope": 5},
  {"yeah": 15},
  {"bad":   3}
];
setDealArray(k);
console.log("------------------------------------------------------------------------------\n\n")

// third way: multiple numbers for item with label
// console.log("// third way: multiple numbers for item with label");
// let k = [
//   [["numbers"], [1, 2, 3, 4], ["North", "South", "West", "East"]],
//   [["letters"], ["a", "b", "c", "d"], ["North", "South", "West", "East"]],
//   [["mix"], ["3e", 7, "88"], ["North", "South", "West", "East"]]
// ];
// setDealArray(k);
// console.log("------------------------------------------------------------------------------\n\n")

// forth way: multiple numbers for item whithout label
// console.log("// forth way: multiple numbers for item whithout label");
// k = [
//   [1, 2, 3],
//   [11, 22, 33],
//   [111, 222, 333]
// ];
// setDealArray(k);
// console.log("------------------------------------------------------------------------------\n\n")


/*
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
setFontSizekey", "width", 40, 50, "+");
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
    let tempp = [];
    tempp.push(mcount * 10);
    tempp.push((mcount + 1) * 10);
    console.log("tempp: " + tempp);
    // nObj = {key: mIndex, value: monthN[(mIndex % monthN.length)]};
    nObj = {key: mIndex, value: tempp};
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
console.log(k1);
*/
