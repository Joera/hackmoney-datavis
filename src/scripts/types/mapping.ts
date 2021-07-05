export interface Mapping {

    label: string | boolean,
    column: string | string[] | boolean,
    colour?: string | boolean,
    group?: string | boolean,
    short?: string,
    outflow?: any,
    duration?: string,
    units? : string
}
