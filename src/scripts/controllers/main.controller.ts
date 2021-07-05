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

   // let url = 'https://data.autonomous-times.com';
    let url = 'http://localhost:3000'

    fetch(url + '/api/defiproposals', {referrerPolicy: 'unsafe-url'})
      .then( (response) => response.json())
      .then( (data) => {

        data = data.filter( d => d.protocol !== 'curve');
        data = data.filter( d => d.disagreementLevel !== 0);

        this.votes.init(data);

        let protocols = _.uniq(data.map( p => p.protocol));
        this.aside.legend({ protocols : protocols })

        data = data.sort( (a:any,b:any) => a.closingTimestamp < b.closingTimestamp)

        protocols = protocols.map((p) => {

              let proposals = data.filter( d => d.protocol === p && d.delegatesTotal > 0 && d.valueStaked > 0).slice(0,9);

              return {
                name : p,
                delegateCount : proposals.reduce((a : number, c: any) => a + c['delegatesTotal'], 0) / proposals.length,
                totalValue : proposals.reduce((a : number, c: any) => a + c['valueStaked'], 0) / proposals.length
              };
        });

        this.votes.grid(protocols);

      })
  }
}
