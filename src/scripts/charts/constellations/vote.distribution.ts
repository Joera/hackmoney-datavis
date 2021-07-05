import { ChartObjects, ChartSVG, ChartDimensions, ChartScale, ChartAxes } from '../basics/module';
import { colours} from "../_styleguide/_colours";
import { ChartCircleClusters } from '../elements/module';


import * as d3 from "d3";
import * as _ from "lodash";
import {breakpoints} from "../_styleguide/_breakpoints";

export class VoteDistribution {

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
    chartCircleClusters;
    htmlHeader;

    link;
    simulation: any;
    groupCount;
    popup;

    clusters;

    constructor(
        private data : any,
        private elementID : string,
        private config : any,
        private dataMapping : [any],
    ) {
        this.element = d3.select('#' + this.elementID).node();
        this.xParameter = this.config.xParameter = 'choice';
        this.yParameter = this.config.yParameter = 'voteValue';
        this.rParameter = this.config.rParameter = 'voteValue';
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
        this.chartCircleClusters = new ChartCircleClusters(this.config, this.svg.layers);

        this.clusters = new Array(2);

        self.update(this.data);
    }

    prepareData(proposal)  {

      console.log(proposal);

        let delegates = proposal.delegatesInFavor.concat(proposal.delegatesAgainst)

        delegates = delegates.filter( (d) => d.balance > 0);

        delegates = delegates.map( d => {
          d.choiceName = proposal.choices[parseInt(d.choice) - 1]
          d.voteValue = d.balance * proposal.tokenPriceUSD;
          d.x = 100;
          d.y = 100;
          return d;
        })

        let clusters = new Array(2)

        clusters[0] = delegates.filter ( d => d.choice === 1);
        clusters[1] = delegates.filter ( d => d.choice === 2);

        return { delegates, clusters };

    }

    legend(data) {

    }

    draw(delegates,clusters) {

        let self = this;

        // with data we can init scales
        this.xScale = this.chartXScale.set(delegates.map( (d) => d[this.xParameter]));
        this.yScale = this.chartYScale.set(_.uniq(delegates.map( (d) => d[this.yParameter])));
        this.rScale = this.chartRScale.set(delegates.map( (d) => Math.round((d[this.rParameter])))) // = radius !!
        this.chartCircleClusters.draw(delegates);

        this.simulation = d3.forceSimulation()
            .nodes(delegates);

        this.initializeForces(delegates,clusters);



        this.simulation.on('tick', () => {

            self.chartCircleClusters.forceDirect(self.xScale, self.yScale, self.rScale,);
        });

    }

    redraw(delegates,clusters) {

        let self = this;

        // on redraw chart gets new dimensions
        this.dimensions = this.chartDimensions.get(this.dimensions);
        this.chartSVG.redraw(this.dimensions);

        this.xScale = this.chartXScale.reset('horizontal-reverse',this.dimensions,this.xScale);
        this.yScale = this.chartYScale.reset('vertical',this.dimensions,this.yScale);
        this.rScale = this.chartRScale.reset('radius',this.dimensions,this.rScale);

        // this.bottomAxis.redraw(this.config.xScaleType, this.dimensions, this.xScale);
        // this.leftAxis.redraw(this.config.yScaleType, this.dimensions, this.yScale);

        this.chartCircleClusters.redraw(delegates,this.dimensions,this.rScale,this.xScale,this.yScale,false);

        self.updateForces(delegates,clusters)

    }

    initializeForces(delegates,clusters) {

      // function forceCluster(alpha) {
      //   for (var i = 0, n = delegates.length, node, cluster, k = alpha * 1; i < n; ++i) {
      //     node = delegates[i];
      //
      //     cluster = clusters[node.choice - 1];
      //     node.vx -= (node.x - cluster.x) * k; //
      //     node.vy -= (node.y - cluster.y) * k; //
      //   }
      // }

        this.simulation

            .force('x', d3.forceX().strength(2))
            .force("center", d3.forceCenter())
            .force("collide", d3.forceCollide())
            // .force("cluster", forceCluster)
            .force("gravity", d3.forceManyBody())

             .force('y', d3.forceY().strength(2));


        this.updateForces(delegates,clusters)
    }



    updateForces(delegates,clusters) {

        // for (let i = 0; i < 5; i++) {
        //   this.simulation.tick();
        // }

        let self = this;
        // let forceStrength = 0.125;
        let center = {x: ((this.dimensions.width / 2) - 40 ) , y: (this.dimensions.height / 2)  };

      this.simulation
        .force("x")
        .x(100)
        .x((d) => {
          return .05 * self.xScale(d[self.config.xParameter]);
        })

      this.simulation
        .force("y")
        .y(200)
        .y((d) => {
          return .05 * self.yScale(d[self.config.yParameter]);
        })

      this.simulation.force("center")
        .x(center.x)
        .y(center.y);

        this.simulation
          .force("collide")
            .radius(function(d : any) {
                return 1 + self.rScale(Math.round(d[self.config.rParameter]));
            })
          .iterations(1);

      this.simulation.stop();

      this.simulation.alpha(1).restart();
      for (var i = 0; i < 120; ++i) this.simulation.tick();
      // this.simulation.stop();

        // this.simulation.alpha(1).restart();

    }

    update(newData) {

        let self = this;
        let { delegates, clusters } = self.prepareData(newData);//  self.redraw(data);
        this.draw(delegates,clusters);
        this.redraw(delegates, clusters);
        // self.legend(data);
        // this.popup = new HtmlPopup(this.element,this.description);
     //   window.addEventListener("resize", () => self.redraw(groupedData), false);
    }
}

