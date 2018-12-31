// var imported = document.createElement("script");
// imported.src = "script.js";  //saved in "other js" folder
// document.getElementsByTagName("head")[0].appendChild(imported);


// function second() { alert("Second");}


drawBarChart(
    // FIRST ARGUMENT
    // Data  can be:
    //  1- only one number by column without label. The label can be set by the variable setXLabel and setXLabelStarts, bellow.
    //    i.e.: data =
            // [100000, 200000, 150000, 350000, 88000, 77000, 89000],
    //  2- only one number by column, with label.
    //    i.e.: data =
            // [{"okay": 10},
            // {"nope": 8},
            // {"yeah": 14},
            // {"bad":   5},
            // {"soso": 9}],
    //  3- multiples numbers by column without label, but has to have the identifier for each number. The label can be set by the variable setXLabel and setXLabelStarts, bellow.
    //    i.e.: data = [
             [[[99, 88, 80, 70], ["North", "South", "East", "West"], ["navy", "olive", "orange", "teal"], "2014"],
             [[41, 50, 45, 40], ["North", "South", "East", "West"], ["navy", "olive", "orange", "teal"], "2015"],
             [[55, 66, 70, 59], ["North", "South", "East", "West"], ["navy", "olive", "orange", "teal"], "2016"],
             [[22, 33, 40, 30], ["North", "South", "East", "West"], ["navy", "olive", "orange", "teal"], "2017"]],

    // SECOND ARGUMENT
    //  chart options
    {
      // bigFrame Features:
      frameHeight: 400, frameWidth: 800, /* consider color and border features*/
      setBigFrameColor: "#E0E4E3", setBigFrameBorder: "solid 0.5px black",

      // chartFrame features:
      // setFrameColor: "#97CEC0",
      setFrameColor: "lightyellow",
      setBarColor: "seagreen", setEmphasis: true,

      // chartLabelFeatures:
      chartLabelText: "This is a ChartLabel!", chartLabelFontFamily: "Arial", chartLabelFontSize: 0, chartLabelFontColor: "firebrick",
          chartLabelBorder: "", chartLabelBackColor: "red",

      // X Axis features:
      setXLabel: "month", setXLabelStarts: 2000, setXLabelInc: -3,
        //it will consider only the numbers passed by the user, regardless whether there is label. The label will be month starting in setXLabelStarts
      setColumnsFont: 10, setColumnWithLabel: true, setLabelColumnPos: "over", /*top, bottom, middle and over*/
      setSpaceColumn: "small",

      // Y Axis features
      // setMaximunValue: 110,
      numberOfDivisionsYAxis: 5, typeOfDivision: "percent", setDivLabelFontSize: "", setDivisionsOverColumns: false,

    },

    // THIRD ARGUMENT
    //  chart position, that is, in what element it's supposed to be placed
    "#barChartPlace"
   );
