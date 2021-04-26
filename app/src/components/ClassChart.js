import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { scaleOrdinal } from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';
import { pie, arc } from 'd3-shape';
import { interpolateColors } from '../colorSchemeGenerator.js';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginBottom: '8px',
    marginRight: '8px',
    marginTop: '8px',
    textAlign: 'center',
    color: '#4fbbd6',
    fontSize: '40px',
    backgroundColor: '#242730',
    minHeight: '32vh',
    padding: '0 0 0 0'
  },
  svg: {
    minHeight: '30vh',
    minWidth: '100%',
  },
  text: {
    textAnchor: 'middle',
    fontSize: '18px'
  },
  title: {
    fontSize: '25px',
    textAnchor: 'middle'
  },
}));

function process(c) {
  return c
}

function Arc(props) {
  const classes = useStyles();
  const d = props.d;
  const color = props.color;
  const x = props.x;
  const valid_keys = props.valid_keys
  const setHover = props.setHover;
  const [fill, setFill] = React.useState(color(d.data.key));
  const setSelectedData = props.setSelectedData;
  const selectedData = props.selectedData;
  const showColor = props.showColor;

  if(showColor !== fill && fill !== '#D55D0E') {
    setFill(showColor)
  }

  function enter() {
    setSelectedData(d.data.data);
    setHover(d);
    setFill('#D55D0E');
  }

  function leave() {
    setSelectedData(null);
    setHover(null);
    setFill(color(d.data.class));
  }


  if(selectedData !== null && selectedData[0] !== undefined) {
    for(var i = 0; i < selectedData.length; i++) {
      var exp_cls = process(selectedData[i].class)
      var mod_cls = valid_keys.includes(exp_cls) ? exp_cls : 'Other'
      if(mod_cls === d.data.class) {
        return (
          <g className={classes.arc} key={"arc_"+d.data.key}>
              <path d={x()} fill={'#D55D0E'} onMouseEnter={enter} onMouseLeave={leave} />
          </g>
        )
      }
    }
  }
  return (
    <g className={classes.arc} key={"arc_"+d.data.key}>
        <path d={x()} fill={fill} onMouseEnter={enter} onMouseLeave={leave} />
    </g>
  )
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


export default function ClassChart(props) {
  const classes = useStyles();
  const data = props.data;
  const selectedData = props.selectedData;
  const setSelectedData = props.setSelectedData;
  const [hover, setHover] = React.useState(null);

  function vw(view_width) {
    return view_width * (window.innerWidth / 100)
  }

  function vh(view_height) {
    return view_height * (window.innerHeight / 100)
  }

  const svgWidth = vw(23),
        svgHeight = vh(24);

  const margin = { top: vh(2.5), right: 0, bottom: 0, left: 0 },
         width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;

  var radius = Math.min(width, height) * 3/5

  var all_classes = Array.from(data.map(function(d)
      { 
        var new_class = process(d.class);
        d.class = new_class;
        return new_class;
      }).values());

  var counts = {};

  for (var i = 0; i < all_classes.length; i++) {
    var cls = all_classes[i];
    counts[cls] = counts[cls] ? counts[cls] + 1 : 1;
  }

  const distinct = (value, index, self)=>{
    return self.indexOf(value) === index;
  }

  var uniq_classes = all_classes.filter(distinct)

  var class_data = []
  for (var j = 0; j < uniq_classes.length; j++){
    const iter = j
    var tmp = data.filter((d)=>{return d.class === uniq_classes[iter]});
    class_data.push({
      'class': uniq_classes[j],
      'data': tmp,
    });
  }

  const colorRangeInfo = {
    colorStart: .5,
    colorEnd: .9,
    useEndAsStart: false,
  };

  const colorScale = interpolateBlues;

  class_data = class_data.sort((a,b)=>{return b['data'].length-a['data'].length});


  var other_data = []
  if (class_data.length > 14){
    class_data = class_data.reduce((acc, curr, i)=>{
      if (i > 13){
        other_data.push(curr.data[0]);
        return acc;
      }
      acc.push(curr);
      return acc;
    },[])
  }

  class_data.push({'class':'Other', 'data':other_data})
  class_data = class_data.sort((a,b)=>{return b['data'].length-a['data'].length});

  var keys = class_data.map(d=>{return d.class});

  var scheme = interpolateColors(keys.length,colorScale,colorRangeInfo);

  const [key_colors, setKey_colors] = React.useState(shuffle(keys));
  var color = scaleOrdinal()
              .domain(key_colors)
              .range(scheme);

  var make_pie = pie()
    .value((d)=>{return d['data'].length; });
  var data_ready = make_pie(class_data);

  const pad = Math.PI/360;

  var x = arc().innerRadius(0).outerRadius(radius).startAngle(0).endAngle(Math.PI * 2).padAngle([pad/2]);

  function ToolTip() {
    var key;
    var value;
    if(hover !== null) {
      key = hover.data.class;
      value = hover.data.data.length;
    } else if(selectedData !== null && selectedData[0] !== undefined) {
      if(selectedData.length > 1) {
        return <div />
      }
      var exp_cls = process(selectedData[0].class)
      key = keys.includes(exp_cls) ? exp_cls : 'Other';
      value = data_ready.filter((d)=>{return d.data.class === key})[0].value;
    } else { return <div /> }
    return (
      <text className={classes.text} y={vh(16)} x={vw(12)} style={{fill: '#D55D0E'}}>
        {key + " (" + value + ")"}
      </text>
    )
  }

  return (
    <Paper className={classes.paper}>
      <svg className={classes.svg} id="ClassChart">
        <text className={classes.title} y={vh(2.5)} x={vw(12)} style={{fill: '#4fbbd6'}}>
          Meteorite Class
        </text>
        <g transform={`translate(${width/2+radius/16}, ${height/2+radius/4+margin.top})`} key={"pie_chart"}>
           {
            data_ready.map((d,i) => {
              x = arc().innerRadius(radius/1.5).outerRadius(radius).startAngle(d.startAngle).endAngle(d.endAngle).padAngle([pad]);
              
              return (
                <Arc x={x} d={d} color={color} setHover={setHover} selectedData={selectedData} key={i} showColor={color(d.data.class)} setSelectedData={setSelectedData} valid_keys={keys}/>
              )
            })
          }
        </g>
        <ToolTip />
      </svg>
    </Paper>
  )
};
