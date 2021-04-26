import React, { useEffect } from 'react';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    maxHeight: '33vh',
    backgroundColor: '#242730',
  },
  table: {
    minWidth: 650,
  },
  cell: {
    color: 'white'
  },
  label: {
    color: '#4fbbd6',
    backgroundColor: '#242730',
  },
  highlight: {
    color: '#D55D0E',
  },
  active: {
    color: 'white',
  },
});

function TableItem(props) {
  const selectedData = props.selectedData;
  const hoverCallback = props.hoverCallback;
  const d = props.d;

  function get_color() {
    if(selectedData !== null && selectedData[0] !== undefined) {
      if(selectedData.includes(d)) {
        return '#D55D0E';
      }
    }
    return 'white';
  }

  return (
    <TableRow onMouseEnter={() => {hoverCallback([d])}} onMouseLeave={() => {hoverCallback(null)}}>
      <TableCell style={{color: get_color()}} component="th" scope="row">
        {d.name}
      </TableCell>
      <TableCell style={{color: get_color()}} align="right">{d.year}</TableCell>
      <TableCell style={{color: get_color()}} align="right">{d.class}</TableCell>
      <TableCell style={{color: get_color()}} align="right">{d.mass}</TableCell>
      <TableCell style={{color: get_color()}} align="right">{d.coordinates[0]}</TableCell>
      <TableCell style={{color: get_color()}} align="right">{d.coordinates[1]}</TableCell>
    </TableRow>
  )
}

const StyledTableSortLabel = withStyles((theme: Theme) => createStyles({
  root: {
    color: '#4fbbd6',
    "&:hover": {
      color: '#D55D0E',
    },
    '&$active': {
      color: '#D55D0E',
    },
  },
  active: {},
  icon: {
    color: 'inherit !important'
  },
}))(TableSortLabel);

function TableTitle(props) {
  const classes = useStyles();
  const orderType = props.orderType;
  const orderDirection = props.orderDirection;
  const id = props.id;
  const side = props.side;
  const setSort = props.setSort;

  return (
    <TableCell className={classes.label} align={side} sortDirection={'asc'}>
      <StyledTableSortLabel
        active={orderType === id}
        direction={orderDirection}
        onClick={() => {setSort(id)}}
        classes={{active: classes.active}}
      >
        {id}
      </StyledTableSortLabel>
    </TableCell>
  )
}

export default function DataTable(props) {
  const classes = useStyles();
  const data = props.data;
  const [dispData, setDispData] = React.useState(data);
  const [orderType, setOrderType] = React.useState(null);
  const [orderDirection, setOrderDirection] = React.useState('asc');
  const selectedData = props.selectedData;
  const hoverCallback = props.hoverCallback;
  useEffect(() => {
    sortData('Name');
  }, [])

  if(data.length !== dispData.length) {
    rerender();
  }

  function rerender() {
    if(orderType === null) {
      setDispData(data);
      return;
    }
    var tmp = data;
    if(orderType === 'Name') {
      tmp.sort((a, b) => {return a.name.localeCompare(b.name);});
    } else if(orderType === 'Year') {
      tmp.sort((a, b) => {return a.year-b.year});
    } else if(orderType === 'Class') {
      tmp.sort((a, b) => {return a.class.localeCompare(b.class);});
    } else if(orderType === 'Mass\u00a0(g)') {
      tmp.sort((a, b) => {return a.mass-b.mass});
    } else if(orderType === 'Latitude') {
      tmp.sort((a, b) => {return a.coordinates[0]-b.coordinates[0]});
    } else if(orderType === 'Longitude') {
      tmp.sort((a, b) => {return a.coordinates[1]-b.coordinates[1]});
    }
    if(orderDirection === 'desc') {
      tmp.reverse();
    }
    setDispData(tmp);
  }

  function sortData(method) {
    if(orderType === method) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
      var tmp_data = dispData;
      tmp_data.reverse();
      setDispData(tmp_data);
      return;
    }
    var tmp = data;
    if(method === 'Name') {
      tmp.sort((a, b) => {return a.name.localeCompare(b.name);});
    } else if(method === 'Year') {
      tmp.sort((a, b) => {return a.year-b.year});
    } else if(method === 'Class') {
      tmp.sort((a, b) => {return a.class.localeCompare(b.class);});
    } else if(method === 'Mass\u00a0(g)') {
      tmp.sort((a, b) => {return a.mass-b.mass});
    } else if(method === 'Latitude') {
      tmp.sort((a, b) => {return a.coordinates[0]-b.coordinates[0]});
    } else if(method === 'Longitude') {
      tmp.sort((a, b) => {return a.coordinates[1]-b.coordinates[1]});
    }
    setOrderDirection('asc');
    setOrderType(method);
    setDispData(tmp);
  }

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table stickyHeader className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableTitle orderType={orderType} orderDirection={orderDirection} setSort={sortData} side={"left"} id={"Name"}/>
            <TableTitle orderType={orderType} orderDirection={orderDirection} setSort={sortData} side={"right"} id={"Year"} />
            <TableTitle orderType={orderType} orderDirection={orderDirection} setSort={sortData} side={"right"} id={"Class"}/>
            <TableTitle orderType={orderType} orderDirection={orderDirection} setSort={sortData} side={"right"} id={"Mass\u00a0(g)"} />
            <TableTitle orderType={orderType} orderDirection={orderDirection} setSort={sortData} side={"right"} id={"Latitude"}/>
            <TableTitle orderType={orderType} orderDirection={orderDirection} setSort={sortData} side={"right"} id={"Longitude"} />
          </TableRow>
        </TableHead>
        <TableBody>
          {dispData.map((d, i) => 
            <TableItem d={d} selectedData={selectedData} hoverCallback={hoverCallback} key ={i} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
