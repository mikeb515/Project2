var container = document.getElementById('timeline');
var tmobj;
var tdorothy;

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet([
    {id: 'AL011851', content: 'AL011851', start: '1851-06-26', end:'1851-06-28'},
    {id: 'AL041988', content: 'AL041988', start: '1988-08-31', end : '1988-09-08' },
    {id: 'AL202005', content: 'AL202005', start: '2005-10-01', end:'2005-10-05'},
    {id: 'AL041966', content: 'Dorothy', start: '1966-07-22', end: '1966-07-31'},
    {id: 'AL041903', content: 'AL041903', start: '1903-09-12', end:'1903-09-17'},
    {id: 'Today', content: '', start: '2019-03-14', type: 'point'}
  ]);

  // Configuration for the Timeline  : http://visjs.org/docs/timeline/#Configuration_Options
  //  clicktouse, selectable, showtooltips, tootlti[]
  var options = { 
      //zoomMax: 315360000000000,
     clickToUse: true  //verify
  };

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
  
//click on timeline
    timeline.on('click', function (properties) {
        tmobj=properties;
        console.log(tmobj);
        drawGraphs(properties.item);
        //plotWind(properties.item);
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

function drawGraphs(pathData){  //replace with actual json query to use in line d3.json...
    /* start with map */
    let mapZoomLevel = 8;
    streetmap.addTo(pathMap);
    d3.json('../static/js/dorothy_json.json').then(function(pdata){ //console.log(data)});   
        tdorothy=pdata;
        L.geoJson(pdata, {
            style: function (feature) {
                return {
                 "color": getColor(feature.properties.winds),
                 "opacity": 1,
                }}
        }).addTo(pathMap);/*

        latlns=[]
        //pdata.forEach(e=>{latlns.push([e.Latitude,e.Longitude])})
        //TODO chnage line color according to status ?? HU=red... // d => choose(['red', 'green']
       //let polyline = L.polyline(, {color:'red', weight:1}).addTo(pathMap);

        
        // zoom the map to the polyline
       // pathMap.fitBounds(polyline.getBounds());
       // pathMap.zoomOut(3);
        /* followed by wind speed  with ploltly */
        /*
        dates=[];
        parseDates();
        let trace1 ={
            x:dates,
            y:tdorothy.map(x=> x["Maximum Wind"]),
            type:'scatter',
            fill: 'tozeroy',
        }
        let datas = [trace1];
        var layout = {
            title: 'Wind Speed throughout event',
            xaxis: {
              title: 'Time'
            },
            yaxis: {
              title: 'Max. Wind Speed (mph)'
            }
          };
        Plotly.newPlot('eventPlot', datas, layout);  */

    });

}

function parseDates(){
    tdorothy.forEach(d =>{
        d.Date = (new moment(d.Date).add(d.Time/100,'hours')).toDate();
        dates.push(d.Date);
    });
}

   