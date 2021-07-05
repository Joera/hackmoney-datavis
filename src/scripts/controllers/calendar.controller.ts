import {HtmlService} from "../services/html.service";

export class CalendarController {

  html;
  main;
  aside;

  constructor() {
    this.html = new HtmlService();
    this.aside = [].slice.call(document.getElementsByTagName('aside'))[0]
  }

  init(data: any) {

      const calendarHTML = this.html.create(data,'calendar');
      console.log(this.aside);
      this.aside.innerHTML = calendarHTML;

      // for (let proposal of data.proposals) {
      //   let proposalHTML = this.html.create(proposal,'proposal')
      //   calendarElement.appendChild(proposalHTML);
      // }

      // this.body.appendChild(calendarHTML);


  }
}

