import * as d3 from 'd3';
import {event as currentEvent} from 'd3-selection';
import { colours } from  '../_styleguide/_colours'

export class ChartCirclesGrid {

    start = {};

    headerGroup;
    headerGroupEnter;
    headerLabels;

    group;
    groupEnter;

    headers_lines;

    circles;
    circlesText;

    constructor(
        private config,
        private svgLayers
    ) {
    }

  coloring(d)  {

    switch(d.name) {

      case 'uniswap':
        return colours.pink

      case 'compound':
        return colours.blue

      case 'aave':
        return colours.yellow

      case 'yearn':
        return colours.purple

      case 'balancer':
        return colours.mint

      case 'yam':
        return colours.orange

      case 'curve':
        return colours.cherry

      case 'mstable':
        return colours.green
    }
  }

    draw(data) {

        this.group = this.svgLayers.data.selectAll('.group')
            .data(data);

        this.group.exit().remove();

        this.groupEnter = this.group.enter()
            .append("g")
            .attr("class","group");

        this.circles = this.groupEnter
            .append("circle")
            .attr("class","circle")
            .attr("r","10")
            .style("fill", d => this.coloring(d));
      ;

        this.circlesText = this.groupEnter
            .append("text")
            .attr("class","small-label in-circle")
            .attr("text-anchor","start")
            .attr("dx","15")
            .attr("dy","3")
            .style("font-size","1rem")
            .style("fill","black")
            .text(d => d.name)
          ;

    }

    redraw(_data,dimensions,xScale, yScale) {

      let self = this;

      this.groupEnter.merge(this.group)
        .attr("transform", (d) => {
            return "translate(" + xScale(d[this.config.xParameter]) + "," + yScale(d[this.config.yParameter]) + ")"
        });


    }

}
