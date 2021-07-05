export interface Config {

    graphType : string,
    xScaleType : string | boolean,
    yScaleType : string | boolean,
    xParameter : string | boolean,
    yParameter : string | boolean,
    padding: {
        top : number,
        bottom : number,
        left : number,
        right : number
    },
    margin: {
        top : number,
        bottom : number,
        left : number,
        right : number
    },
    extra : any
}