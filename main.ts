import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface EveryDayCalendarSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: EveryDayCalendarSettings = {
	mySetting: 'default'
}

export default class EveryDayCalendar extends Plugin {
	settings: EveryDayCalendarSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

		type ResultType = number | boolean

		//@ts-ignore
		window.everyDayCalendar = (el: HTMLElement, year: number, fromDays: (d: Date) => ResultType): void => {
			
			const monthsInYear = 12

			// from https://stackoverflow.com/questions/11322281/javascript-get-array-of-day-names-of-given-date-month-year
			function daysInMonth(month: number): number {
				// returns the day-number of the day before the first day of the following month, i.e. the number of days in that month
				return new Date(year, month, 0).getDate()
			}

			const results: ResultType[][] = Array(monthsInYear).fill([])

			for (var protoMonth = 0; protoMonth < monthsInYear; protoMonth++) {

				const month: number = protoMonth + 1 // from 0 indexed to 1 indexed
				const daysInThisMonth = daysInMonth(month)

				for (var protoDay = 0; protoDay < daysInThisMonth; protoDay++) {
					const day = protoDay + 1
					results[protoMonth].push(fromDays(new Date(year, protoMonth, day)))
				}

			}

			//const debugString: string = results.map(month => month.map(day => day.toString() + "\n").toString() + "\n").toString()
			const debugString: string = results[0].map(day => day.toString() + "\n").toString()


			createSpan({
				cls: "test",
				parent: el,
				text: debugString,
			})
		}
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
