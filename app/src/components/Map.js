import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DeckGL from '@deck.gl/react';
import { withStyles } from '@material-ui/styles';
import {StaticMap} from 'react-map-gl';
import {ScatterplotLayer} from '@deck.gl/layers';
import {MapView} from '@deck.gl/core';
import MAPBOX_ACCESS_TOKEN from './APIKey';

const styles = theme => ({
  root: {
    minHeight: '64vh',
    maxWidth: '100%',
    position: 'relative',
    marginBottom: '8px',
    marginLeft: '8px',
    marginTop: '8px',
  },
  tooltip: {
    position: 'absolute',
    zIndex: 100,
    pointerEvents: 'none',
    color: '#4fbbd6',
    backgroundColor: '#242730',
    padding: '8px 8px 8px 8px',
  },
});

const MAP_VIEW = new MapView({repeat: true});
const INITIAL_VIEW = {
  longitude: 0,
  latitude: 30,
  zoom: 1.7,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      hoveredObject: null,
      expandedObjects: null,
      pointerX: null,
      pointerY: null,
      hoverCallback: props.hoverCallback,
      selectedData: null
    };
    this.data = props.data;
  }

  _renderTooltip() {
    const {hoveredObject, pointerX, pointerY} = this.state || {};
    const { classes } = this.props;
    return hoveredObject && (
      <div className={classes.tooltip} style={{left: pointerX+20, top: pointerY+20}}>
        Name: { hoveredObject.name } <br />
        Year: { hoveredObject.year } <br />
        Class: { hoveredObject.class } <br />
        Mass: { hoveredObject.mass } (g) <br />
      </div>
    );
  }

  setSelectedData(d) {
    this.setState({
      selectedData: d
    })
  }

  // documentation: https://deck.gl/#/documentation/deckgl-api-reference/layers/scatterplot-layer?section=getposition-function-optional-transition-enabled
  getLayer() {
    const {data = this.data} = this.props;
    return [new ScatterplotLayer({
      id: 'scatterplot-layer',
      data,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 5,
      radiusMaxPixels: 8,
      lineWidthMinPixels: 1,
      getPosition: d => d.coordinates,
      getRadius: d => d.mass * 1,
      getFillColor: d => {
        return [79, 187, 214]
      },
      getLineColor: d => [0, 0, 0],
      onHover: info => {
        this.setState({
          hoveredObject: info.object,
          pointerX: info.x,
          pointerY: info.y
        })
        this.state.hoverCallback([info.object])
      }
    }),
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data,
      pickable: true,
      opacity: 1.0,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 5,
      radiusMaxPixels: 8,
      lineWidthMinPixels: 1,
      getPosition: d => d.coordinates,
      getRadius: d => d.mass*1,
      getFillColor: d => {
        if((this.state.selectedData !== null 
            && this.state.selectedData.includes(d)) 
            || d === this.state.hoveredObject) 
          {
            return [213, 93, 14]
          }
          return [213, 93, 14,0]
      },
      getLineColor: d => {
        if((this.state.selectedData !== null 
            && this.state.selectedData.includes(d)) 
            || d === this.state.hoveredObject) 
          {
            return [0,0,0]
          }
          return [0, 0, 0, 0]
      },
      onHover: info => {
        this.setState({
          hoveredObject: info.object,
          pointerX: info.x,
          pointerY: info.y
        })
        this.state.hoverCallback([info.object])
      },
      updateTriggers: {
        getFillColor: [this.state],
        getLineColor: [this.state]
      }
    })];
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <DeckGL
          layers={this.getLayer()}
          views={MAP_VIEW}
          initialViewState={INITIAL_VIEW}
          controller={{dragRotate: false}}
        >
          <StaticMap
            reuseMaps
            // mapStyle={'mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs'}
            mapStyle={'mapbox://styles/uberdata/cjoqbbf6l9k302sl96tyvka09'}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          />
          { this._renderTooltip() }
        </DeckGL>
      </div>
    );
  }
}

Deck.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Deck);
