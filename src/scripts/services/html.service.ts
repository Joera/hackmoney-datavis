import Handlebars from 'handlebars';
import { templates } from './templates';
import { helpers } from "./handlebars-helpers";

export class HtmlService {

  constructor() {
      this._registerHelpers();
  }

  create(data: any,templateName: string) {

    //  web3.eth.getBlockNumber(function(e, r) { blockNumber = r; });
    // console.log(templateName)
    const source = templates[templateName];
    const template = Handlebars.compile(source);
    return template(data);
  }

  async _registerHelpers() {

    // register all helpers
    if(helpers) {
      helpers.forEach((helper) => {
        try {
          Handlebars.registerHelper(helper.name, helper.helper); // register helper
        }
        catch (error) {
          console.error("failed to register helper");
        }
      });
    }
  }

}
