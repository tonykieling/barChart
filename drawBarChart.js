/*
have to consider include jquery declaration inside the js file
and the line about ready document to grab all code to load after
the document is ready.

src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous">


$(document).ready(function(){

});
*/

function drawBarChart(data, options = "", element = ""){
	// - data is the set of number to be drawed (X and Y axis).
	// - option sets some chart features, such as height, color, orientation (vertical, horizontal),
	//   round, flat, X and Y titles, chart title, fonts, size, colors, chart element size,
	// - element says where the chart is gonna be drawed. For default, it sets the chart in the code
	//  where the command is. ie, if the command is inside body, it will be in body element.

  console.log("test");
  let num_columns = data.length();
  $("body").append("<div> </div>");
  for (let each_column in data){
    //create a html element with css properties
    $("div").append("p".html(each_column));
  }

}

drawBarChart();
