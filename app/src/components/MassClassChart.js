import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { scaleOrdinal, scaleLinear, scaleBand} from 'd3-scale';
import { schemeBlues } from 'd3-scale-chromatic';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#4fbbd6',
    backgroundColor: '#242730',
    borderColor: '#4fbbd6',
    height: '3vh',
    minWidth: '4vw',
    width: '4vw',
    top: '0.8vh'
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
    minHeight: '33vh',
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
  ranges: {
    fill: '#4fbbd6',
    fontSize: '12px',
    display: 'inline-block'
  },
  formControl: {
    color: '#4fbbd6',
    position: 'absolute',
    right: '1vw',
    height: '2vw',
    fontSize: '12'
  },
  menu: {
    color: '#4fbbd6',
    backgroundColor: '#242730',
  },
  gutters: {
    color: '#4fbbd6',
    backgroundColor: '#242730',
  }
}));

function label_to_mass_range(label) {
  if(label === "<r1") {
    return [0, 0.5]
  } else if(label === "r1-r2") {
    return [0.5, 1]
  } else if(label === "r2-r3") {
    return [1, 2]
  } else if(label === "r3-r4") {
    return [2, 4]
  } else if(label === "r4-r5") {
    return [4, 10]
  } else if(label === "r5-r6") {
    return [10, 20]
  } else if(label === "r6-r7") {
    return [20, 30]
  } else if(label === "r7-r8") {
    return [30, Number.MAX_SAFE_INTEGER]
  }
}

function process(c) {
  return c
}

function Bar(props) {
  const range = props.range;
  const x = props.x;
  const y = props.y;
  const color = props.color;
  const cls = props.cls;
  const start = props.start;
  const end = props.end;
  const valid_keys = props.valid_keys;
  const [hover, setHover] = React.useState(null);
  const selectedData = props.selectedData
  const setSelectedData = props.setSelectedData;

  function enter() {
    setHover([range, cls]);
    setSelectedData(range, cls);
  }

  function leave() {
    setSelectedData(null, null);
    setHover(null);
  }

  function get_color(d) {
    if(hover !== null) {
      if(hover[0] === range && hover[1] === cls){
        return '#D55D0E';
      }
    }
    if(selectedData !== null && selectedData[0] !== undefined) {
      for(var i = 0; i < selectedData.length; i++) {
        var masses = label_to_mass_range(range);

        var exp_cls = process(selectedData[i].class)
        var mod_cls = valid_keys.includes(exp_cls) ? exp_cls : 'other'
        if(selectedData[i].mass/1000 >= masses[0] && selectedData[i].mass/1000 < masses[1] && mod_cls === cls) {
          return '#D55D0E';
        }
      }
    }
    
    return color;
  }

  return (
    <rect 
      x={x(start)}
      y={y(cls)} 
      width={x(end)-x(start)} 
      height={y.bandwidth()} 
      key={cls}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{fill:get_color([range, cls])}}
    />
  );
}

export default function MassClassChart(props) {
  const classes = useStyles();
  const data = props.data;
  const selectedData = props.selectedData;
  const setSelectedData = props.setSelectedData;
  const [showNum, setShowNum] = React.useState(15);

  function vw(view_width) {
    return view_width * (window.innerWidth / 100)
  }

  function vh(view_height) {
    return view_height * (window.innerHeight / 100)
  }

  const svgWidth = vw(23),
        svgHeight = vh(30);

  const margin = { top: vh(7), right: vw(0), bottom: 0, left: vw(4) },
         width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;


  var all_classes = Array.from(data.map(function(d)
      { 
        var new_class = process(d.class);
        d.class = new_class;
        return new_class;
      }).values());

  var counts = {};

  var cls_masses = {};

  var range1 = .5
  var range2 = 1
  var range3 = 2
  var range4 = 4
  var range5 = 10
  var range6 = 20
  var range7 = 30

  var range_keys = ["<r1","r1-r2","r2-r3","r3-r4","r4-r5","r5-r6","r6-r7","r7-r8"];

  var range_strings = [
    `<${range1}`,
    `${range1}-${range2}`,
    `${range2}-${range3}`,
    `${range3}-${range4}`,
    `${range4}-${range5}`,
    `${range5}-${range6}`,
    `${range6}-${range7}`,
    `${range7}+`
  ]

  for (var i = 0; i < all_classes.length; i++) {
    const cls = all_classes[i];
    var subset = data.filter(d => d.class === cls);
    var subset_masses = subset.map(d=>d.mass).reduce((acc,curr)=>{acc.push(curr); return acc}, []);

    var total_masses = subset_masses.length;

    cls_masses[cls] = { 
        "<r1": subset_masses.filter(m=>{return m/1000 < range1}).length/total_masses, 
      "r1-r2": subset_masses.filter(m=>{return m/1000 >= range1 && m/1000 < range2}).length/total_masses,
      "r2-r3": subset_masses.filter(m=>{return m/1000 >= range2 && m/1000 < range3}).length/total_masses,
      "r3-r4": subset_masses.filter(m=>{return m/1000 >= range3 && m/1000 < range4}).length/total_masses,
      "r4-r5": subset_masses.filter(m=>{return m/1000 >= range4 && m/1000 < range5}).length/total_masses,
      "r5-r6": subset_masses.filter(m=>{return m/1000 >= range5 && m/1000 < range6}).length/total_masses,
      "r6-r7": subset_masses.filter(m=>{return m/1000 >= range6 && m/1000 < range7}).length/total_masses,
      "r7-r8": subset_masses.filter(m=>{return m/1000 >= range7}).length/total_masses,
    }

    counts[cls] = counts[cls] ? counts[cls] + 1 : 1;
  }

  const distinct = (value, index, self)=>{
    return self.indexOf(value) === index;
  }

  var uniq_classes = all_classes.filter(distinct);

  var class_data = []
  for (var j = 0; j < uniq_classes.length; j++){
    const iter = j
    var tmp = data.filter((d)=>{return d.class === uniq_classes[iter]});
    class_data.push({
      'class': uniq_classes[j],
      'data': tmp,
    });
  }
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
  class_data.push({'class':'other', 'data':other_data})
  class_data = class_data.sort((a,b)=>{return b['data'].length-a['data'].length});


  var other_masses = other_data.map(d=>d.mass).reduce((acc,curr)=>{acc.push(curr); return acc}, []);
  var other_m_len = other_masses.length;
  cls_masses['other'] ={ 
      "<r1": other_masses.filter(m=>{return m/1000 < range1}).length/other_m_len, 
    "r1-r2": other_masses.filter(m=>{return m/1000 >= range1 && m/1000 < range2}).length/other_m_len,
    "r2-r3": other_masses.filter(m=>{return m/1000 >= range2 && m/1000 < range3}).length/other_m_len,
    "r3-r4": other_masses.filter(m=>{return m/1000 >= range3 && m/1000 < range4}).length/other_m_len,
    "r4-r5": other_masses.filter(m=>{return m/1000 >= range4 && m/1000 < range5}).length/other_m_len,
    "r5-r6": other_masses.filter(m=>{return m/1000 >= range5 && m/1000 < range6}).length/other_m_len,
    "r6-r7": other_masses.filter(m=>{return m/1000 >= range6 && m/1000 < range7}).length/other_m_len,
    "r7-r8": other_masses.filter(m=>{return m/1000 >= range7}).length/other_m_len,
  }

  var keysSorted = class_data.map(d=>{return d['class']})

  var top_X = keysSorted.slice(0,showNum);

  var to_display = top_X.reduce((acc,curr)=>{
                      var entries = Object.entries(cls_masses[curr]);
                      acc[curr] = Object.fromEntries(entries.map((curr, index)=>{entries[index][1] = (index===0) ? curr[1] : entries[index-1][1]+curr[1]; return [curr[0], entries[index][1]]; })); 
                      return acc;
                    }, {});

  var x = scaleLinear()
    .domain([0,1])
    .range([0, width])

  var y = scaleBand()
    .domain(keysSorted.slice(0,showNum))
    .range([0, height])
    .padding(0.08)

  var color = scaleOrdinal()
    .domain(range_keys)
    .range(schemeBlues[range_keys.length])

  const handleShowNum = (event) => {
    setShowNum(event.target.value);
  };

  var legend_axis = scaleBand()
    .domain(range_strings)
    .range([0,width-vw(1)])

  const legend_height = 8;

  function setGlobal(range, cls) {
    if(range === null || cls === null) {
      setSelectedData(null);
      return;
    }
    var [lower, upper] = label_to_mass_range(range);
    var tmp = data.filter((d)=>{return d.mass/1000 >= lower && d.mass/1000 < upper && (keysSorted.includes(process(d.class)) ? process(d.class) : 'other') === cls});
    setSelectedData(tmp);
  }

  return (
    <Paper className={classes.paper}>
    <FormControl className={classes.formControl}>
      <Select
        value={showNum}
        onChange={handleShowNum}
        className={classes.root}
        style={{backgroundColor: '#444750'}}
      >
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={12}>12</MenuItem>
        <MenuItem value={15}>All</MenuItem>
      </Select>
    </FormControl>
      <svg className={classes.svg} id="MassClassChart">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <text x = {-margin.left/1.2} y={-vh(5)} style={{fill: '#4fbbd6', fontSize:'15px'}}>Kilograms</text>
          <text x = {-margin.left/1.2+vw(14)} y={-vh(5)} style={{fill: '#4fbbd6', fontSize:'15px'}}># Classes: </text>
          <g transform={`translate(${-margin.left+vw(0.5)}, ${-margin.top/2})`} ref={node => select(node).call(axisBottom(legend_axis).tickSize(0)).select(".domain").remove()}>
          {
            range_keys.map((key, i)=>{
              return(
                  <rect
                    x={legend_axis(range_strings[i])+1}
                    y={-legend_height}
                    width={legend_axis.bandwidth()-2}
                    height={legend_height}
                    key={"bin_"+i}
                    fill={color(key)}
                  />
              )
            })
          }
          </g>
          <g transform={`translate(0, ${height})`} ref={node => select(node).call(axisBottom(x).ticks(width / 50, "%"))} />
          {
            range_keys.map((key,index)=>{
               return (
                 <g style={{fill:color(key)}}>
                 {
                   Object.keys(to_display).map(d=>{
                     var end = to_display[d][key];
                     var start = index ? to_display[d][range_keys[index-1]] : 0;
                     return(
                        <Bar valid_keys={top_X} range={key} cls={d} color={color(key)} x={x} y={y} start={start} end={end} selectedData={selectedData} setSelectedData={setGlobal}/>
                     )
                   })
                 }
                 </g>
              )
            })
          }
          <g ref={node => select(node).call(axisLeft(y).tickSizeOuter(0)).select(".domain").remove()} />
        </g>
      </svg>
    </Paper>
  )
};
