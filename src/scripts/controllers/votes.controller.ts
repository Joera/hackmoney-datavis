import {GraphController} from "./graph.controller";
import {HtmlService} from "../services/html.service";

export default class VotesController {

  html;
  main;
  body;

  constructor() {

    this.html = new HtmlService();
    this.body = [].slice.call(document.getElementsByTagName('body'))[0];
    this.main = [].slice.call(document.getElementsByTagName('main'))[0]
  }

  init(proposals: any) {

    const config = {
      "graphType": "Ballenbak",
      "xScaleType": "time",
      "yScaleType": "linear",
      "xParameter": "label",
      "yParameter": "value",
      "rParameter": "",
      "padding": {
        "top": 60,
        "bottom": 40,
        "left": 30,
        "right": 60
      },
      "margin": {
        "top": 0,
        "bottom": 0,
        "left": 0,
        "right": 60
      },
      "extra": {
        "paddingInner" : 1,
        "paddingOuter" : 1,
        "minRadius" : 3,
        "maxRadius" : 24,
        "radiusFactor": .05,
        "xScaleTicks": "quarterly"
      }
    };

    const mapping = [
      {
        "label": 'Votes in favor',
        "column" : 'votesInFavor',
        "colour" : "pink",
      }
    ];

    let container = document.createElement('div');
    container.classList.add('img_graph_container');
    container.id = 'timeline';
    container.classList.add('column');

    this.main.appendChild(container);

    const votesGraph = new GraphController();
    votesGraph.init(proposals, container.id,'ProposalTimeline', config, mapping);

  }
}

