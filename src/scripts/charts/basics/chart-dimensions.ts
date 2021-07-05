export class ChartDimensions {

    element;
    dimensions;

    constructor(
        private elementID,
        private config
    ) {}

    get(dimensions) {

        this.dimensions = dimensions;

        this.element = document.getElementById(this.elementID);

        this.dimensions.svgWidth = this.element.getBoundingClientRect().width - this.config.margin.left - this.config.margin.right;
        this.dimensions.width = dimensions.svgWidth - this.config.padding.left - this.config.padding.right;

        this.dimensions.svgHeight = this.element.getBoundingClientRect().height - this.config.margin.top - this.config.margin.bottom;
        this.dimensions.height = this.dimensions.svgHeight - this.config.padding.top - this.config.padding.bottom;

        return this.dimensions;
    }
}
