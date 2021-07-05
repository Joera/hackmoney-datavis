import * as _ from "lodash";


export function getWeek(date) {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}

export function getMonth(date) {

    return ['jan','feb','maa','apr','mei','jun','jul','aug','sep','okt','nov','dec'][date.getMonth()];
}

export function getMonthFromNumber(number) {

    return ['jan','feb','maa','apr','mei','jun','jul','aug','sep','okt','nov','dec'][number - 1];
}

export function getLongMonthFromNumber(number) {

    return ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'][number - 1];
}

export function getDateRangeOfWeek(weekNo) {
    const d1 = new Date();
    // tslint:disable-next-line:no-eval
    const numOfdaysPastSinceLastMonday = d1.getDay() - 1;
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    const weekNoToday = this.getWeek(d1);
    const weeksInTheFuture = weekNo - weekNoToday;
    d1.setDate(d1.getDate() + ( 7 * weeksInTheFuture ));
    const rangeIsFrom = d1.getMonth() + 1 + "/" + d1.getDate() + '/' + d1.getFullYear();
    d1.setDate(d1.getDate() + 6);
    const rangeIsTo = d1.getMonth() + 1 + '/' + d1.getDate() + '/' + d1.getFullYear() ;
    return { rangeIsFrom, rangeIsTo};
}

