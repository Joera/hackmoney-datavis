
const calendar = `<ul class="calendar">

    {{#each proposals as |proposal|}}
        <li class="proposal">
            <span>{{proposal.status}}</span>

            <h3>{{trimText proposal.description}}</h3>
        </li>
    {{/each}}

</ul>`;

const detailTop = `

  <span class="{{protocol}} protocol">{{protocol}}</span>

  <h3>{{title}}</h3>
  <span class="date">{{closingDate}}</span>
`;

const detailBottom = `
  <span class="value">Total delegate count: {{ delegatesTotal }}</span>
  <span class="value">Total price value of votes: {{ currency totalVoteCount tokenPriceUSD }}</span>
  <div class="description">
        {{{description}}}
  </div>
`;

const legend = `

    <span><i>Incomplete list of Defi protocols</i></span>
    <ul id="legend">
    {{#each protocols as |protocol|}}
        <li><span class="{{protocol}}"></span>{{protocol}}</li>
    {{/each}}
    </ul>
`;

const options = `

     <div style="margin-left:30px;">Size of circles: </div>
    <ul id="options">

        <li>
            <input type="radio" id="valueStaked" name="rParameter" value="valueStaked" checked>
            <label for="valueStaked">Total price value of votes in USD</label>
        </li>

        <li>
            <input type="radio" id="delegatesTotal" name="rParameter" value="delegatesTotal">
            <label for="delegatesTotal">Total delegate count</label>
        </li>

    </ul>

`;

export  const templates = {
  calendar : calendar,
  detailTop : detailTop,
  detailBottom : detailBottom,
  legend : legend,
  options : options
}




