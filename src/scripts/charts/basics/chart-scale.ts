import * as d3 from 'd3';
// import {Dimensions} from "../types/dimensions";
import {Config} from "../../types/graphConfig";

export class ChartScale {

    dataLength;

    constructor(

        private type : string,
        private config : Config,
        // private dimensions : Dimensions

    ) {
        this.dataLength = 0;
    }

    set(data, minValue) {

        let self = this;

        this.dataLength = data.length;

        switch(this.type) {

           case 'linear':


                return d3.scaleLinear()
                    .domain([
                        d3.min(data, (v) => (v ? v : 0) as number),  //
                        d3.max(data, (v) => (v ? v : 0) as number)
                    ]);
                break;

            case 'time':

                return d3.scaleTime()
                    .domain([
                        minValue ? new Date(minValue) : d3.min(data, (d : any) => ( new Date(d) ? new Date(d) : 0) as Date), //
                        d3.max(data, (d : any) => ( new Date(d) ? new Date(d) : 0) as Date),
                    ]);
                break;

            case 'band':

                return d3.scaleBand()
                    .domain(data)
                    .paddingInner(self.config.extra.paddingInner)
                    .paddingOuter(self.config.extra.paddingOuter)
                    .align(.5);

                break;


            case 'bandTime':

                return d3.scaleBand()
                    .domain(data)
                    .paddingInner(.2)
                    .paddingOuter(.5)
                    .align(.5)

                break;

            case 'radius':

                return d3.scaleSqrt()
                    .domain([
                        d3.min(data, (v) => (v ? v : 0) as number),  //
                        d3.max(data, (v) => (v ? v : 0) as number)
                    ]).nice();

                break;


            case 'normalised':

                return d3.scaleLinear();

                break;
        }
    }


    reset(direction,dimensions,newScale) {

        switch(direction) {

            case 'horizontal':

                return newScale
                    .range([0, dimensions.width]);

                break;

          case 'horizontal-reverse':

            return newScale
              .range([dimensions.width,0]);

            break;

            case 'vertical-reverse':

                return newScale
                    .range([0,dimensions.height]);

                break;

            case 'vertical':
                return newScale
                    .range([dimensions.height, 0]);

                break;

            case 'radius' :

                let langsteZijde = dimensions.width > dimensions.height ? dimensions.width : dimensions.height;

                  return newScale
                    .range([this.config.extra.minRadius, this.config.extra.maxRadius]);


              break;

            case 'opacity' :

                return newScale
                    .range([0.3,1]);

        }
    }
}
