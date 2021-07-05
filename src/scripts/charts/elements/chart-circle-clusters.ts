import * as d3 from 'd3';
import {event as currentEvent} from 'd3-selection';
import { colours } from  '../_styleguide/_colours'

export class ChartCircleClusters {

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

    switch(d.choice) {

      case 1:
        return '#fff'

      case 2:
        return '#000';

      case 0:
        return colours.gray

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
            .style("fill", colours.gray)
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

    redraw(_data,dimensions,rScale,xScale, yScale, direction) {

        let self = this;


      // Create our number formatter.
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      });

      let tooltip = function popup(d) {

        return `
            <span>` + d.choiceName + `</span>
            <div>` + d.voter + `</div>
            <span>` + formatter.format(d.voteValue) + `</span>
        `;
      }

        this.circles
            .attr("r", (d) => {  return rScale(Math.round(d[this.config.rParameter]));  })
            .on("mouseover", function(d) {

                // self.svgLayers.data.selectAll(".circle")
                //     .style("fill", b => (b !== d) ? colours.gray : self.coloring(d));

                d3.select('.tooltip')
                    .html(tooltip(d))
                    .style("left", (currentEvent.pageX - 20) + "px")
                    .style("top", (currentEvent.pageY - 0) + "px")
                    .transition()
                    .duration(250)
                    .style("opacity", 1);
            })
            .on("mouseout", function(d) {

                // self.svgLayers.data.selectAll(".circle")
                //     .style("fill", d => self.coloring(d));

                d3.select('.tooltip')
                    .transition()
                    .duration(250)
                    .style("opacity", 0);
            })// add

        // this.circlesText
        //     .attr("dy", (_d) => { return (direction === 'vertical-reverse') ? ".3rem" : ".4rem" })
        //     .text( (d) => { return d['description'].slice(0,20)});

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

    startPoint(dimensions) {

      this.groupEnter.merge(this.group)

        .attr("transform", (d) => {
          return "translate(" + dimensions.width / 2 + "," + dimensions.height / 2 + ")"
        });
    }
}
