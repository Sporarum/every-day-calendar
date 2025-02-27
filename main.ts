import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { calculateDates, Month, ResultType } from 'dateCalculations';

export default class EveryDayCalendar extends Plugin {

	async onload() {

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
