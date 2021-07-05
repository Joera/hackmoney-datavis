// @ts-ignore
import regeneratorRuntime from "regenerator-runtime";
import 'babel-polyfill';
import 'isomorphic-fetch';

import MainController from "./controllers/main.controller";
import AsideController from "./controllers/aside.controller";

class GovCalDashboard {

  main;
  asideCtrl;

  constructor() {
    this.main = new MainController();
    this.asideCtrl = new AsideController();
    this.init();
  }

  init() {

      this.main.init();
  }

  aside(proposal) {

    this.asideCtrl.populate(proposal);
  }f

}
declare global {
  interface Window { datavis: any; }
}

window.datavis = new GovCalDashboard();
