import  VotesController from "./votes.controller";
import AsideController from "./aside.controller";
import * as _ from "lodash";

export default class MainController {

  aside;
  votes;

  constructor() {

    this.votes = new VotesController();
    this.aside = new AsideController();
  }

  async init() {
    fetch('https://data.autonomous-times.com/api/defiproposals', {referrerPolicy: 'unsafe-url'})
      .then( (response) => response.json())
      .then( (data) => {

        data = data.filter( d => d.protocol !== 'curve');
        data = data.filter( d => d.disagreementLevel !== 0);

        this.votes.init(data);

        const protocols = _.uniq(data.map( p => p.protocol));
        this.aside.legend({ protocols : protocols })
      })
  }
}
