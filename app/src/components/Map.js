import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    minHeight: '64vh',
    maxWidth: '100%',
    position: 'relative',
    marginBottom: '8px',
    marginLeft: '8px',
    marginTop: '8px',
  },
});


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
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

      </div>
    );
  }
}

Deck.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Deck);
