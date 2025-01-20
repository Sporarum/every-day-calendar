# Every Day Calendar

Create habit trackers through dataviewjs !

![dark mode example](readme-resources/dark-mode.png)
![light mode example](readme-resources/light-mode.png)

The layout is inspired by Simone Giertz's [Every Day Calendar](https://yetch.store/en-eur/products/every-day-goal-calendar), and the idea to make a plugin in the first place from Richard Slettevoll's [Heatmap Calendar](https://github.com/Richardsl/heatmap-calendar-obsidian).

Here is the code for the above:

```dataviewjs
const property = "Read Emails"

dv.header(1, property)

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

everyDayCalendar(this.container, 2025, date => {

	return Math.min(getRandomInt(5), 2)
})
```

As you can see, you only need to give it the desired year, and a function from `Date` to a number which represents how done is the task that day.
The default idea is that 1 and 2 mean the task was not done (resp done) that day, and 0 the day is missing or invalid (for example if you were on vacation).
The colors are taken directly from Obsidian, so they adjust with your theme.

It's also possible to define custom CSS to support more values and/or more colors. 

### Example

Here is how you can extract whether you've done a task some day:
```dataviewjs
const property = "Set this as you wish"

dv.header(1, property)

const defaultValue = 0
everyDayCalendar(this.container, 2025, d => {
	const name = d.toISOString().substring(0,10)
	const page = dv.page(name)
	if (page) {
		const res = page.file.tasks.values.some(e => e.text === property && e.completed)
		return 1 + res
	} else {
	    return defaultValue
	}
})
```
This assumes your days are named `YYYY-MM-DD` and that there is only one page per such name in your vault


## Building locally

### The first time

- Clone this repo, for example in your vault's `.obsidian/plugins` folder
- Run `npm i` (from NodeJS)
- Run `npm run dev` every time you work on the repo
- Enable the plugin in the settings (in Community plugins)
- When you want to check a change, reload Obsidian (the rest is done continuously by `npm run dev`)

### The following times

- Run `npm run dev`
- When checking changes, reload Obsidian

Quick starting guide for new plugin devs:

### In case the api gets updated 

- Run `npm update`

For more information about plugin development, please consult https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin and https://github.com/obsidianmd/obsidian-sample-plugin