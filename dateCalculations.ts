
export type ResultType = number

export type Month = { name: string, days: ResultType[] }

export function range(a: number): number[]
export function range(a: number, b: number): number[]
export function range(a: number, b?: number): number[] {
    if (b) {
        const to = b
        const from = a
        return Array.from(Array(to - from).keys()).map((i) => i + from);
    } else {
        const to = a
        return Array.from(Array(to).keys())
    }
}

export function calculateDates(year: number, fromDays: (d: Date) => ResultType): Month[] {
    const monthsInYear = 12

    // from https://stackoverflow.com/questions/11322281/javascript-get-array-of-day-names-of-given-date-month-year
    function daysInMonth(month: number): number {
        // returns the day-number of the day before the first day of the following month, i.e. the number of days in that month
        return new Date(year, month, 0).getDate()
    }

    const months = range(monthsInYear).map(protoMonth => {

        const month: number = protoMonth + 1 // from 0 indexed to 1 indexed
        const daysInThisMonth = daysInMonth(month)

        const monthName = new Date(year, protoMonth).toLocaleString("default", { month: "narrow" })

        const days = range(daysInThisMonth).map(protoDay =>
            fromDays(new Date(year, protoMonth, protoDay + 1))
        )

        return { name: monthName, days: days }
    })

    return months
}