import {Mapping} from "./mapping";
import {Config} from "./graphConfig";

export interface GraphObject {

    label : string,
    slug : string,
    mapping : Mapping[][][] | Mapping[][] | Mapping[],
    config : Config,
    description : string,

    segment :  string | boolean,
    publishDate? : string | boolean,
    elementClasslist? : string[],


}
