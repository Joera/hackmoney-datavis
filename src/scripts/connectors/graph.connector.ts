import axios from 'axios'
// @ts-ignore
import regeneratorRuntime from "regenerator-runtime";


export default class GraphConnector {

  constructor () {

  }

  async get(subgraph: string, query: any) {

    return await axios.post(subgraph, query);
  }
}

