// Thanks to: Amy Sitwala
// https://codenebula.io/javascript/frontend/dataviz/2019/04/18/automatically-generate-chart-colors-with-chart-js-d3s-color-scales/

function calculatePoint(i, intervalSize, colorRangeInfo) {
    var { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
    return (useEndAsStart
      ? (colorEnd - (i * intervalSize))
      : (colorStart + (i * intervalSize)));
  }

function interpolateColors(dataLength, colorScale, colorRangeInfo) {
            var { colorStart, colorEnd } = colorRangeInfo;
            var colorRange = colorEnd - colorStart;
            var intervalSize = colorRange / dataLength;
            var i, colorPoint;
            var colorArray = [];
          
            for (i = 0; i < dataLength; i++) {
              colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
              colorArray.push(colorScale(colorPoint));
            }
          
            return colorArray;
  }

export {interpolateColors};
