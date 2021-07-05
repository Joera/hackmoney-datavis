import { ChartObjects, ChartSVG, ChartDimensions, ChartScale, ChartAxes } from '../basics/module';
import { colours} from "../_styleguide/_colours";
import { ChartCircles } from '../elements/module';
import {HtmlService} from "../../services/html.service"


import * as d3 from "d3";
import * as _ from "lodash";
import {breakpoints} from "../_styleguide/_breakpoints";

export class ProposalTimeline {

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
        this.xParameter = this.config.xParameter = 'closingDate';
        this.yParameter = this.config.yParameter = 'disagreementLevel';
        this.rParameter = this.config.rParameter = 'totalVoteCount';
        this.rFactor = this.config.rFactor = 'tokenPriceUSD';

        this.html = new HtmlService();
    }


    init() {

        let self = this;

        let chartObjects = ChartObjects();
        this.config = Object.assign(chartObjects.config(),this.config);
        this.dimensions = chartObjects.dimensions();
        this.svg = chartObjects.svg();

        this.config.paddingInner = 0;
        this.config.paddingOuter = 0;

        // get dimensions from parent element
        this.chartDimensions = new ChartDimensions(this.elementID, this.config);
        this.dimensions = this.chartDimensions.get(this.dimensions);

        // create svg elements without data
        this.chartSVG = new ChartSVG(this.elementID, this.config, this.dimensions, this.svg);
        this.chartXScale = new ChartScale(this.config.xScaleType, this.config);
        this.chartYScale = new ChartScale(this.config.yScaleType, this.config);
        this.chartRScale = new ChartScale('radius', this.config);
        this.bottomAxis = new ChartAxes(this.config, this.svg, 'center',this.chartXScale);
        this.leftAxis = new ChartAxes(this.config, this.svg,'left',this.chartRScale);

        this.chartCircles = new ChartCircles(this.config, this.svg.layers);

        this.bottomAxis.draw();
        this.leftAxis.draw();

        self.update(this.data,'valueStaked');  // 'delegatesTotal'

        const HTML = this.html.create(this.data,'options');
        const el = document.createElement('div');
        el.innerHTML = HTML;
        this.element.appendChild(el);

        document.querySelectorAll('input[name="rParameter"]').forEach((elem) => {
          elem.addEventListener("change", function(event) {
            self.redraw(self.data, (<HTMLTextAreaElement>event.target).value);
          });
        });
    }

    prepareData(data)  {

        return { data };

    }

    legend(data) {

    }

    draw(data) {

        let self = this;

        // with data we can init scales
        this.xScale = this.chartXScale.set(data.map( (d) => d[this.xParameter]), '2020-05-01');
        this.yScale = this.chartYScale.set(_.uniq(data.map( (d) => d[this.yParameter])));
        this.chartCircles.draw(data);

        this.simulation = d3.forceSimulation()
            .nodes(data);

        this.initializeForces(data);

    }

    redraw(data,rParameter) {

        let self = this;

        this.rScale = this.chartRScale.set(data.map( (d) => d[rParameter])) // = radius !!

      // on redraw chart gets new dimensions
        this.dimensions = this.chartDimensions.get(this.dimensions);
        this.chartSVG.redraw(this.dimensions);

        this.xScale = this.chartXScale.reset('horizontal',this.dimensions,this.xScale);
        this.yScale = this.chartYScale.reset('vertical',this.dimensions,this.yScale);
        this.rScale = this.chartRScale.reset('radius',this.dimensions,this.rScale);

        this.bottomAxis.redraw(this.config.xScaleType, this.dimensions, this.xScale);
        this.leftAxis.redraw(this.config.yScaleType, this.dimensions, this.yScale);

        this.chartCircles.redraw(data,this.dimensions,this.rScale,this.xScale,this.yScale,rParameter);

        self.updateForces(data,rParameter);

        this.simulation.on('tick', () => {
          self.chartCircles.forceDirect(self.xScale, self.yScale, self.rScale);
        });


    }

    initializeForces(data) {

        this.simulation
            .force('x', d3.forceX())
            .force('y', d3.forceY())
            .force("collide", d3.forceCollide())
        ;
    }

    updateForces(data,rParameter) {

        let self = this;

        this.simulation
          .force("collide")
          .radius(function(d : any) {
              return self.rScale((d[rParameter]))
          });

        this.simulation
          .force("x")
          .x((d) => {
              return self.xScale(new Date(d[self.config.xParameter]));
          })

        this.simulation
          .force("y")
          .y(this.dimensions.height / 2)
          .y((d) => {
            return self.yScale(d[self.config.yParameter]);
          })

        this.simulation.alpha(1).restart();

    }

    update(newData,rParameter) {

        let self = this;
        let { data } = self.prepareData(newData);
        self.draw(data);
        self.redraw(data,rParameter);

        window.addEventListener("resize", () => self.redraw(data,rParameter), false);
    }
}

