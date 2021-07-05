import { localTime } from '../helpers/_formats';
import * as d3 from "d3";
import {getMonthFromNumber} from "../utils/date-object.utils";

export class ChartAxes {

    axis;
    axisGroup;

    constructor(
        private config,
        private svg,
        private position,
        private scale,
    ) {

        this.draw();
    }

    draw () {

        this.axisGroup = this.svg.layers.axes.append("g");

        switch (this.position) {

            case 'bottom' :

                this.axisGroup
                    .attr('class', 'x-axis');

                this.axis = d3.axisBottom(this.scale);

                break;

            case 'center' :

              this.axisGroup
                .attr('class', 'x-axis');

              this.axis = d3.axisBottom(this.scale);

              break;

            case 'top' :

                this.axisGroup
                    .attr('class', 'x-axis');

                this.axis =  d3.axisTop(this.scale);

                break;

            case 'left' :

                this.axisGroup
                    .attr('class', 'y-axis');

                this.axis = d3.axisLeft(this.scale);

                break;


            case 'right' :

                this.axisGroup
                    .attr('class', 'y-axis');

                this.axis = d3.axisRight(this.scale);

                break;

            case 'middle' :

              this.axisGroup
                .attr('class', 'y-axis');

              this.axis = d3.axisRight(this.scale);

              break;
        }

        return;
    }

    redraw(type, dimensions, scale) {

           switch (type) {


               case 'band' :

                   this.axis
                       .tickFormat( (d,_i) => {
                           // return (window.innerWidth < 640) ? (i + 1) : d;

                          return (this.config.extra.axisInMonths) ? getMonthFromNumber(d) : d;
                       })


                   break;


               case 'linear' :

                 if(this.config.extra.noTicks) {

                   this.axis
                     .ticks(0)
                     .tickSizeOuter(0);

                 } else {

                   this.axis
                     .ticks(4);
                 }

                   break;


               case 'time' :

                   let tickOrder, tickSpread;

                   if(this.config.extra.xScaleTicks === 'quarterly') {

                       tickOrder = 'timeMonth';
                       tickSpread = 3

                   } else {

                       tickOrder = this.config.extra.xScaleTicks;
                       tickSpread = (window.innerWidth > 700) ? 1 : 3;
                   }

                   this.axis
                       .ticks(d3[tickOrder].every(tickSpread))
                       .tickFormat( date => (d3.timeYear(date) < date) ? localTime.format('%b')(date) : localTime.format('%Y')(date));

                   break;

               case 'bandTime' :

                   this.axis
                       .ticks(d3[this.config.extra.xScaleTicks].every(1))
                       .tickFormat( date => localTime.format('%d %b')(new Date(date)));

                   break;



               case 'stacked' :

                   this.axis
                       .ticks(10, "%");

                   break;


               case 'stackedNormalized' :

                   this.axis
                       .ticks(10, "%");

                   break;


               default :

           }

            switch (this.position) {

                case 'bottom' :

                    this.axisGroup
                        .attr("transform", "translate(" + 0 + "," + (dimensions.height) + ")")


                    break;

              case 'center' :

                this.axisGroup
                  .attr("transform", "translate(" + 0 + "," + (dimensions.height / 2) + ")")


                break;

                case 'top' :

                    this.axisGroup
                        .attr("transform", "translate(" + 0 + "," + 0 + ")");


                    break;

                case 'left' :

                    this.axisGroup
                        .attr("transform", "translate(" + 0 + "," + 0 + ")");

                    break;


                case 'right' :

                    this.axisGroup
                        .attr("transform", "translate(" + 0 + "," + dimensions.width + ")");


                    break;

              case 'middle' :

                this.axisGroup
                  .attr("transform", "translate(" + (dimensions.width / 2) + "," + 0 + ")");


                break;

                default :


            }

            this.axisGroup
                .transition()
                .duration(1000)
                .call(this.axis.scale(scale));

            if(this.config.extra.alternateTicks && this.position === 'bottom') {

                this.svg.layers.axes.selectAll("g.x-axis g.tick text")
                    .attr("dy", (_d,i) => {

                        return (i % 2 == 0 ) ? 16 : 32
                    } );
            }
    }

}

