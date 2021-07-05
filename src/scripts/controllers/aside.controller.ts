import {HtmlService} from "../services/html.service";
import {GraphController} from "./graph.controller";

export default class AsideController {

  html;
  element;


  constructor() {

    this.html = new HtmlService();
    this.element = document.getElementsByTagName('aside')[0]

  }

  legend(data) {

    this.element.innerHTML = '';

    const HTML = this.html.create(data,'legend');
    const el = document.createElement('div');
    el.innerHTML = HTML;
    this.element.appendChild(el);

  }

  populate(proposal) {

    this.element.innerHTML = '';

    const topHTML = this.html.create(proposal,'detailTop');
    const topEl = document.createElement('div');
    topEl.innerHTML = topHTML;
    this.element.appendChild(topEl);

    let graphContainer = document.createElement('div');
    graphContainer.classList.add('graph_container');
    graphContainer.id = 'votedistribution';

    this.element.appendChild(graphContainer);
    try {
      this.graph(proposal, graphContainer.id);
    } catch (error) {
      console.log('kan grafiek niet laden')
    }

    const bottomHTML = this.html.create(proposal,'detailBottom');
    const bottomEl = document.createElement('div');
    bottomEl.innerHTML = bottomHTML;
    this.element.appendChild(bottomEl);
  }

  graph(proposal: any, elementID: string) {

      const config = {
        "graphType": "VoteDistribution",
        "xScaleType": "linear",
        "yScaleType": "linear",
        "xParameter": "label",
        "yParameter": "value",
        "rParameter": "",
        "padding": {
          "top": 0,
          "bottom": 0,
          "left": 0,
          "right": 100
        },
        "margin": {
          "top": 0,
          "bottom": 0,
          "left": 0,
          "right": 0
        },
        "extra": {
          "paddingInner" : 0,
          "paddingOuter" : 0,
          "minRadius" : 3,
          "maxRadius" : 18,
          "radiusFactor": 0.01
        }
      };

      const mapping = [
        {
          "label": 'Votes in favor',
          "column" : 'votesInFavor',
          "colour" : "pink",
        }
      ];


      const votesGraph = new GraphController();
      votesGraph.init(proposal, elementID,'VoteDistribution', config, mapping);

  }
}
