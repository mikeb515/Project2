var container = document.getElementById('timeline');
var gclick;
var gpdata;
let lastEvent="";

  // Create a DataSet (allows two way data-binding)
  var events;
  // Configuration for the Timeline  : http://visjs.org/docs/timeline/#Configuration_Options
  var options = { 
      zoomMax: 315360000000000
  };

  // Create a Timeline
  var timeline = new vis.Timeline(container, new vis.DataSet(events), options);
  timeline.setWindow('1965-01-01', '1966-01-31');
  timeline.on('click', function (clickObj) {
        gclick=clickObj;
        eventId=clickObj.item;
        console.log(clickObj);
        if (eventId !== null  && lastEvent !=eventId){
            lastEvent=eventId
            drawGraphs(eventId);}
    });  


function choose(choices) {
    console.log(choices);
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
    }

function getColor(x){ 
    console.log(x);
    return x > 156 ? '#BD0026' :	//cat5
            x > 129 ? '#F03b20'	:	//cat4
            x > 110 ? '#FD8D3C'	:	//cat3
            x > 95	? '#FECC5C' :	//cat2
            x > 73	? '#FFFFB2'	:	//cat1
            x > 38	? '#B6F0B6'	:	//tstorm
                    '#DCE3DD'; 		//storm
}

function drawGraphs(eventID){  //replace with actual json query to use in line d3.json...
    /* start with map */
    streetmap.addTo(pathMap);
    d3.json('../static/js/dorothy_json.json').then(function(pdata){ //RTEPLACE W JSON FROM FLASK WITH eventID   
        gpdata=pdata; //global copy
       L.geoJson(pdata, {
            style: function (feature) {
                return {
                 "color": getColor(feature.properties.winds),
                 "opacity": 1,
                }}
        }).addTo(pathMap)
    
        let dates=gpdata.features[0].properties.dates;
        let winds=gpdata.features[0].properties.winds;
        //console.log(winds);
        let trace1 ={
            x:dates,
            y:winds,
            type:'scatter',
            fill: 'tozeroy',
        }
        let datas = [trace1];
        var layout = {
            title: 'Wind Speed throughout event '+eventID ,
            xaxis: {
              title: 'Time'
            },
            yaxis: {
              title: 'Max. Wind Speed (mph)'
            }
          };
        Plotly.newPlot('eventPlot', datas, layout);  

    });

}
/*
function parseDates(){
    tdorothy.forEach(d =>{
        d.Date = (new moment(d.Date).add(d.Time/100,'hours')).toDate();
        dates.push(d.Date);
    });
} */

   