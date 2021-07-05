import * as d3 from 'd3';

export class ChartSVG {

    constructor(
        public elementID,
        public config,
        public dimensions,
        public svg
    ) {
        this.render();
        this.layers();
    }


    render() {

        this.svg.body = d3.select('#' + this.elementID)
            .append('svg')
            .style('overflow','visible');
    }

    redraw(dimensions) {

        this.svg.body
            .attr('height', dimensions.svgHeight)
            .attr('width', dimensions.svgWidth);

        this.svg.layers.legend
            .attr('transform', 'translate(' + this.config.padding.left + ',' + this.config.padding.top + ')');
    }

    layers() {

        this.svg.layers.underData = this.svg.body.append('g')
            .attr('class', 'under_data')
            .attr('transform', 'translate(' + this.config.padding.left + ',' + this.config.padding.top + ')');

        this.svg.layers.data = this.svg.body.append('g')
            .attr('class', 'data')
            .attr('transform', 'translate(' + (this.config.padding.left) + ',' + this.config.padding.top + ')');

        this.svg.layers.axes = this.svg.body.append('g')
            .attr('class', 'axes')
            .attr('transform', 'translate(' + this.config.padding.left + ',' + this.config.padding.top + ')');

        // separate svg?
        this.svg.layers.legend = this.svg.body.append('g')
            .attr('class', 'legend');
    }
}



