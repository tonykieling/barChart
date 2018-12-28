function checkTypeOfObject(mArray){
  console.log(mArray);
  for (let i in mArray){
    if (mArray[i] instanceof Array){
      console.log("Array of Arrays");
      return ("AA");
    } else if (mArray[i] instanceof Object){   //dont need it
      console.log("Array of objects");
      return ("AO");
    }
  }
  console.log("Only one Array");
  return "OOA";
}


// function setDealArray(bArray){
  // let isSimpleArray = true;
  // let isArrayObject = false;
  // let hasLabel = false;

  // console.log(bArray);
  // console.log("array lenght: " + bArray.length);
  // for (let i in bArray){
  //   console.log(((Number(i)) + 1) + "o object from the array: ");
  //   console.log(bArray[i]);
  //   for (let mkey in bArray[i]){
  //     if (bArray[i][mkey].length > 0){
  //       for(let k in bArray[i][mkey]){
  //         console.log("\t\"" + (mkey) + "\" is the key and its value is \"" + bArray[i][mkey][k] + "\"");
  //         isArrayObject = true;
  //         hasLabel = true;
  //       }
  //     } else {
  //       if (isNaN(mkey)){
  //         console.log("\t\"" + mkey + "\" value is " + bArray[i][mkey]);
  //         hasLabel = true;
  //       } else {
  //         console.log("\t" + ((Number(mkey)) + 1) + "o value is " + bArray[i][mkey]);
  //         hasLabel = true;
  //       }
  //     }
  //     isSimpleArray = false;
  //   }
  // }
  // console.log("\n\t\tSimpleArray: " + isSimpleArray);
  // console.log("\t\tArrayObject: " + isArrayObject);
  // console.log("\t\tLabel is: " + hasLabel);
  // console.log("------------------------------------------------------------------------------\n\n")
// }


// ********************************
// I have to find multiple values
// ********************************************************
// ********************************************************




// first way: only numbers for each item, no label
// console.log("// first way: only numbers");
// let k = [10, 30, 47, 33];
// // console.log(setDealArray(k));
// console.log(checkTypeOfObject(k));
// console.log("------------------------------------------------------------------------------\n\n");

// // second way: only one number for item and each one with label
// console.log("// second way: only one number for item and each one with label");
// k = [
//   {"okay": 10},   // label + data
//   {"nope": 5},    // label + data
//   {"yeah": 15},   // label + data
//   {"bad":   3}    // label + data
// ];
// // console.log(setDealArray(k));
// console.log(checkTypeOfObject(k));
// console.log("------------------------------------------------------------------------------\n\n")

// // third way: multiple numbers for item with label
// console.log("// third way: multiple numbers for item with label");
// k = [
//              {"okay": [["North", "South", "East", "West"], [99, 88, 80, 70]]},      // label + data + legend
//              {"bad": [["North", "South", "East", "West"], [41, 50, 45, 40]]},       // label + data + legend
//              {"regular": [["North", "South", "East", "West"], [55, 66, 70, 59]]},   // label + data + legend
//              {"terrible": [["North", "South", "East", "West"], [22, 33, 40, 30]]},  // label + data + legend
// ];
// // console.log(setDealArray(k));
// console.log(checkTypeOfObject(k));
// console.log("------------------------------------------------------------------------------\n\n")

// forth way: multiple values for item, with legend and whithout label
console.log("// forth way: multiple numbers for item whithout label");
k = [
             [[99, 88, 80, 70], ["North", "South", "East", "West"]],
             [[41, 50, 45, 40], ["North", "South", "East", "West"]],
             [[55, 66, 70, 59], ["North", "South", "East", "West"]],
             [[22, 33, 40, 30], ["North", "South", "East", "West"]],
//   [1, 2, 3],
//   [11, 22, 33],
//   [111, 222, 333]
];
// console.log(setDealArray(k));
console.log(checkTypeOfObject(k), " is the typeof object");
console.log("------------------------------------------------------------------------------\n\n")
console.log(k.length);
for (let i in k){
  console.log("i: ", i);
  // console.log(k[i][0]);
  for (let u in k[i][0]){
    console.log(k[i][0][u]);
  }
}

let big = 0;
for (let r in k){
  let temp = 0;
  console.log(k[r]);
  temp = Math.max(...k[r][0]);
  console.log(temp);
  if (temp > big){
    big = temp;
  }
}
console.log("biggestNumber: ", big);


    //  1- only one number by column without label. The label can be set by the variable setXLabel and setXLabelStarts, bellow.
    //    i.e.: data = [100, 200, 150, 350, 88]
    //  2- only one number by column, with label.
    //    i.e.: data = [
    //          {"okay": 10},
    //          {"nope": 5},
    //          {"yeah": 15},
    //          {"bad":   3}]
    //  3- multiples numbers by column without label, but has to have the identifier for each number. The label can be set by the variable setXLabel and setXLabelStarts, bellow.
    //    i.e.: data = [
    //          [[99, 88, 80, 70], ["North", "South", "East", "West"]],
    //          [[41, 50, 45, 40], ["North", "South", "East", "West"]],
    //          [[55, 66, 70, 59], ["North", "South", "East", "West"]],
    //          [[22, 33, 40, 30], ["North", "South", "East", "West"]],

    //  4- multiples numbers by column with label and the identifiers for each number
    //    i.e.: data = [
    //          [[99, 88, 80, 70], ["North", "South", "East", "West"], "okay"],
    //          [[41, 50, 45, 40], ["North", "South", "East", "West"], "bad"],
    //          [[55, 66, 70, 59], ["North", "South", "East", "West"], "regular"],
    //          [[22, 33, 40, 30], ["North", "South", "East", "West"], "terrible"],
    //          ]
