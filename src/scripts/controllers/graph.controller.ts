// import {GraphObject} from "../types/graphObject";
// import { configs } from "../charts/configs/module";
import { constellations } from '../charts/constellations/module';

export class GraphController {

  graph;

  constructor() {


  }

  init(data: any, element: any, graphType : string, config: any, mapping: any) {

    this.graph = new constellations[graphType](data, element, config, mapping);
    this.graph.init();
  }
}

