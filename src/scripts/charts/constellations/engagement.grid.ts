import { ChartObjects, ChartSVG, ChartDimensions, ChartScale, ChartAxes } from '../basics/module';
import { colours} from "../_styleguide/_colours";
import { ChartCirclesGrid } from '../elements/module';


import * as d3 from "d3";
import * as _ from "lodash";
import {breakpoints} from "../_styleguide/_breakpoints";

export class EngagementGrid {

    element;
    xParameter
    yParameter;
    rParameter
    rFactor;
    dimensions;
    svg;
    rScale;
    xScale;
    yScale;
    bottomAxis;
    leftAxis;

    chartDimensions;
    chartSVG;
    chartXScale;
    chartYScale;
    chartRScale;
    chartAxes;
    chartCircles;
    htmlHeader;

    link;
    simulation: any;
    groupCount;
    popup;
    html;

    constructor(
        private data : any,
        private elementID : string,
        private config : any,
        private dataMapping : [any],
    ) {
        this.element = d3.select('#' + this.elementID).node();
        this.xParameter = this.config.xParameter;
        this.yParameter = this.config.yParameter;
    }


    init() {

        let self = this;

        let chartObjects = ChartObjects();
        this.config = Object.assign(chartObjects.config(),this.config);
        this.dimensions = chartObjects.dimensions();
        this.svg = chartObjects.svg();

        // get dimensions from parent element
        this.chartDimensions = new ChartDimensions(this.elementID, this.config);
        this.dimensions = this.chartDimensions.get(this.dimensions);

        // create svg elements without data
        this.chartSVG = new ChartSVG(this.elementID, this.config, this.dimensions, this.svg);
        this.chartXScale = new ChartScale(this.config.xScaleType, this.config);
        this.chartYScale = new ChartScale(this.config.yScaleType, this.config);
        this.bottomAxis = new ChartAxes(this.config, this.svg, 'center',this.chartXScale);
        this.leftAxis = new ChartAxes(this.config, this.svg,'middle',this.chartYScale);

        this.chartCircles = new ChartCirclesGrid(this.config, this.svg.layers);

        this.bottomAxis.draw();
        this.leftAxis.draw();

        self.update(this.data);  // 'delegatesTotal'

      this.svg.layers.axes.append("text")
        .attr("transform",
          "translate(" + (this.dimensions.width) + " ," +
          ((this.dimensions.height / 2) + 15) + ")")
        .style("text-anchor", "end")
        .style("font-size", "1rem")
        .text("USD value ->");

      this.svg.layers.axes.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0)
        .attr("y", (this.dimensions.width / 2) - 15)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .style("font-size", "1rem")
        .text("delegates ->");

    }

    prepareData(data)  {

      console.log(data);

        return { data };

    }

    legend(data) {

    }

    draw(data) {

        let self = this;

        // with data we can init scales
        this.xScale = this.chartXScale.set(data.map( (d) => d[this.xParameter]));
        this.yScale = this.chartYScale.set(_.uniq(data.map( (d) => d[this.yParameter])));
        this.chartCircles.draw(data);

    }

    redraw(data) {

        let self = this;

      // on redraw chart gets new dimensions
        this.dimensions = this.chartDimensions.get(this.dimensions);
        this.chartSVG.redraw(this.dimensions);

        this.xScale = this.chartXScale.reset('horizontal',this.dimensions,this.xScale);
        this.yScale = this.chartYScale.reset('vertical',this.dimensions,this.yScale);

        this.bottomAxis.redraw(this.config.xScaleType, this.dimensions, this.xScale);
        this.leftAxis.redraw(this.config.yScaleType, this.dimensions, this.yScale);

        this.chartCircles.redraw(data,this.dimensions,this.xScale,this.yScale,false);

    }

    update(newData) {

        let self = this;
        let { data } = self.prepareData(newData);
        self.draw(data);
        self.redraw(data);

        window.addEventListener("resize", () => self.redraw(data), false);
    }
}

