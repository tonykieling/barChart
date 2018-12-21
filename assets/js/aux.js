
// function setXLabelMonth(argum, mm){
//   console.log(argum + " and " + typeof(mm));
//   let nObj = {};
//   let varToReturn = [];
//   const monthN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];

//   let mIndex = 0
//   if (typeof(mm) == "string"){
//     while (monthN[mIndex]){
//       if (mm.toLowerCase() == monthN[mIndex].toLowerCase()){
//         break;
//       }
//       mIndex++;
//     }

//   } else if (typeof(mm) == "number"){
//     mIndex = mm;
//   }

//   for (let mcount = 0; mcount < argum; mcount++){
//     nObj = {key: mIndex, value: monthN[(mIndex % monthN.length)]};
//     varToReturn.push(nObj);
//     mIndex++;
//   }
//   return (varToReturn);
// }
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
