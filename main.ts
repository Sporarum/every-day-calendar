import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';


export default class EveryDayCalendar extends Plugin {

	async onload() {

		type ResultType = number

		//@ts-ignore
		window.everyDayCalendar = (el: HTMLElement, year: number, fromDays: (d: Date) => ResultType): void => {
			
			const monthsInYear = 12

			// from https://stackoverflow.com/questions/11322281/javascript-get-array-of-day-names-of-given-date-month-year
			function daysInMonth(month: number): number {
				// returns the day-number of the day before the first day of the following month, i.e. the number of days in that month
				return new Date(Date.UTC(year, month, 0)).getUTCDate()
			}

			const outerDiv = createDiv({
				cls: ["every-day-calendar", "outermost"],
				parent: el,
			})

			createDiv({
				cls: ["every-day-calendar", "year"],
				parent: outerDiv,
				text: `${year}`
			})

			const boxesDiv = createDiv({
				cls: ["every-day-calendar", "boxes"],
				parent: outerDiv,
			})

			for (var protoMonth = 0; protoMonth < monthsInYear; protoMonth++) {

				const month: number = protoMonth + 1 // from 0 indexed to 1 indexed
				const daysInThisMonth = daysInMonth(month)

				const monthDiv = createDiv({
					cls: ["every-day-calendar", "month", "outer"],
					parent: boxesDiv,
				})

				createDiv({
					cls: ["every-day-calendar", "month", "inner"],
					parent: monthDiv,
					text: "" + new Date(Date.UTC(year, protoMonth)).toLocaleString("default", { month: "narrow"})
				})
				
				for (var protoDay = 0; protoDay < daysInThisMonth; protoDay++) {
					const day = protoDay + 1
					const value = fromDays(new Date(Date.UTC(year, protoMonth, day)))
					
					createSpan({
						cls: ["every-day-calendar", "box"],
						parent: boxesDiv,
						text: "",//`${month}-${day}`,
						attr: {value: value, month: month},
					})
				}
			}

		}
	}

	onunload() {

	}
}
