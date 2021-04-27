// Color scheme: https://coolors.co/ffffff-ff7f11-353535-ff1b1c-202020
const paperColor = '#313131';
const colorOrange = '#FF7F11';
const colorRed = '#FF1B1C';
const paddingSize = '8px';

const rightMenuStyle = {
  root: {
    display: 'flex',
  },
  paper: {
    marginBottom: paddingSize,
    marginRight: paddingSize,
    marginTop: paddingSize,
    textAlign: 'center',
    color: colorOrange,
    backgroundColor: paperColor,
    minHeight: '15vh',
  },
  channelTitle: {
  	fontSize: '24px',
  	paddingBottom: '8px',
  },
  gridText: {
  	display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '4vh',
  },
};

export { rightMenuStyle };
export { paperColor };
export { paddingSize };
export { colorOrange };
export { colorRed };