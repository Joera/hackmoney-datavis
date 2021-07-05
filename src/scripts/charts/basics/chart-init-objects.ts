import * as d3 from 'd3';

let ChartObjects = function ChartObjects() {

    let config = function config() {

        return {
            margin: { // space around chart
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            padding: { // room for axis
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        };
    }

    let dimensions = function dimensions() {

        return {
            svgWidth: 0, // width of element minus config.margin
            width : 0, // svgWidth minus config.padding
            svgHeight: 0, // height of element minus config.margin
            height : 0, // svgHeight minus config.padding
        }

    }

    let svg = function svg(){

        let tooltip = document.createElement('span');
        tooltip.classList.add('tooltip');
        tooltip.style.display = 'block';
        tooltip.style.opacity = '0';
        tooltip.style.position = 'absolute';
        tooltip.style.zIndex = '10';
        tooltip.style.width = 'auto';
        tooltip.style.height = 'auto'
        tooltip.style.maxWidth = '220px';
        // tooltip.style.maxHeight = '180px';
        tooltip.style.padding = '.5rem';
        tooltip.style.background = 'white';
        tooltip.style.border = '1px solid black';
        tooltip.style.fontFamily = 'NotoSans Regular';
        tooltip.style.color = 'black';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.fontSize = '.85rem';
        tooltip.style.overflow = 'hidden';


        return {
            body : null,
            layers : {},
            tooltip : (document.querySelector('.tooltip')) ? d3.select(".tooltip") : document.querySelector('body').appendChild(tooltip),
            yAxis : null,
            xAxis : null
        }
    }

    return {
        config : config,
        dimensions : dimensions,
        svg : svg,
    }
}

export { ChartObjects }


