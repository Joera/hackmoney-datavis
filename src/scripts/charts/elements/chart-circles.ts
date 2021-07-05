import * as d3 from 'd3';
import {event as currentEvent} from 'd3-selection';
import { colours } from  '../_styleguide/_colours'

export class ChartCircles {

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

    switch(d.protocol) {

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
            .style("fill", d => this.coloring(d));
      ;

        // this.circlesText = this.groupEnter
        //     .append("text")
        //     .attr("class","small-label in-circle")
        //     .attr("text-anchor","middle")
        //     .style("font-size","1.25rem")
        //     .style("fill","black")
        //   ;

    }

    redraw(_data,dimensions,rScale,xScale, yScale, rParameter) {

        let self = this;

        this.circles
            .attr("r", (d) => {  return rScale(d[rParameter]);  })
            .on("click", function(d) {

                window.datavis.aside(d)
            });
    }

    forceDirect(xScale,yScale,_rScale) {

        this.groupEnter.merge(this.group)
          .attr("transform", (d) => {

            if (!isNaN(d.x)) {

              return "translate(" + d.x + "," + d.y + ")"
            } else {
              return "translate(" + 0 + "," + d.y + ")"
            }
          });

    }
}
