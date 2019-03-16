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
    {id: 'Today', content: 'thisday', start: '2019-03-14', type: 'point'}
  ]);

  // Configuration for the Timeline  : http://visjs.org/docs/timeline/#Configuration_Options
  // TODO: ADD clicktouse, selectable, showtooltips, tootlti[]
  var options = { 
     // zoomMax: 63072000000000
     clickToUse: true  //verify
  };

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
  
//click on timeline
    timeline.on('click', function (properties) {
        tmobj=properties;
        console.log(tmobj);
        alert('selected items: ' + properties.item);
        
    });  

drawPath('');

function drawPath(pathData){
    let mapZoomLevel = 12;
    streetmap.addTo(pathMap);
    d3.json('/static/js/dorothy_json.json', function(pdata) {
        tdorothy=pdata;
        L.geoJson(pdata, {
            style: mapStyle 
        }).addTo(pathMap);
        
         //pathmap.fitBounds(this.getBounds());
    });

    
} //drawPath
