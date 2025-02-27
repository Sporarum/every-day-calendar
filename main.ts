import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';


export default class EveryDayCalendar extends Plugin {

	async onload() {

		type ResultType = number

		type Month = { name: string, days: ResultType[] }

		function range(a: number): number[]
		function range(a: number, b: number): number[]
		function range(a: number, b?: number): number[] {
			if (b) {
				const to = b
				const from = a
				return Array.from(Array(to - from).keys()).map((i) => i + from);
			} else {
				const to = a
				return Array.from(Array(to).keys())
			}

		}

		function calculateDates(year: number, fromDays: (d: Date) => ResultType): Month[] {
			const monthsInYear = 12

			// from https://stackoverflow.com/questions/11322281/javascript-get-array-of-day-names-of-given-date-month-year
			function daysInMonth(month: number): number {
				// returns the day-number of the day before the first day of the following month, i.e. the number of days in that month
				return new Date(Date.UTC(year, month, 0)).getUTCDate()
			}

			const months = range(monthsInYear).map(protoMonth => {

				const month: number = protoMonth + 1 // from 0 indexed to 1 indexed
				const daysInThisMonth = daysInMonth(month)

				const monthName = new Date(Date.UTC(year, protoMonth)).toLocaleString("default", { month: "narrow" })

				const days = range(daysInThisMonth).map(protoDay =>
					fromDays(new Date(Date.UTC(year, protoMonth, protoDay + 1)))
				)

				return { name: monthName, days: days }
			})

			return months

		}

		//@ts-ignore
		window.everyDayCalendar = (el: HTMLElement, year: number, fromDays: (d: Date) => ResultType, extraParams: { additionalClasses: string[] } | null = null): void => {

			const additionalClasses = extraParams?.additionalClasses ?? []

			const months: Month[] = calculateDates(year, fromDays)

			const outerDiv = createDiv({
				cls: additionalClasses.concat(["every-day-calendar", "outermost"]),
				parent: el,
			})

			createDiv({
				cls: additionalClasses.concat(["every-day-calendar", "year"]),
				parent: outerDiv,
				text: `${year}`
			})

			const boxesDiv = createDiv({
				cls: additionalClasses.concat(["every-day-calendar", "boxes"]),
				parent: outerDiv,
			})

			months.forEach((month, index) => {

				const monthDiv = createDiv({
					cls: additionalClasses.concat(["every-day-calendar", "month", "outer"]),
					parent: boxesDiv,
				})

				createDiv({
					cls: additionalClasses.concat(["every-day-calendar", "month", "inner"]),
					parent: monthDiv,
					text: month.name
				})

				month.days.forEach(value => {
					createSpan({
						cls: additionalClasses.concat(["every-day-calendar", "box"]),
						parent: boxesDiv,
						attr: { value: value, month: index + 1 },
					})
				})
			})

		}
	}

	onunload() {

	}
}
