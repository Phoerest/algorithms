/*
	Parse a week string.
	https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#parse-a-week-string
*/
function parseWeekString(input) {
	if (typeof input !== 'string') return false;
	//1, 2
	const asciiDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let position = 0;
	//3
	let yearResult = '';
	while (asciiDigits.includes(input[position])) yearResult += input[position++];
	if (yearResult.length < 4) return false;
	const year = parseInt(yearResult);
	//4
	if (year < 1) return false;
	//5
	if (
		position >= input.length - 1 ||
		input[position] !== '-'
	) {
		return false;
	} else position++;
	//6
	if (
		position >= input.length - 1 ||
		input[position] !== 'W'
	) {
		return false;
	} else position++;
	//7
	let weekResult = '';
	while (asciiDigits.includes(input[position])) weekResult += input[position++];
	if (weekResult.length !== 2) return false;
	const week = parseInt(weekResult);
	//8
	const maxWeek = weeksInYear(year);
	if (maxWeek === false) return false;
	//9
	if (
		week < 1 ||
		week > maxWeek
	) return false;
	//10
	if (position <= input.length - 1) return false;
	//11
	return { year, week };
}
/*
	Get weeks in year
	https://stackoverflow.com/a/18479176
*/
function getWeekNumber(d) {
	d = new Date(+d);
	d.setHours(0, 0, 0, 0);
	d.setDate(d.getDate() + 4 - (d.getDay() || 7));

	const yearStart = new Date(d.getFullYear(), 0, 1);
	const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
	return [d.getFullYear(), weekNo];
}

function weeksInYear(year) {
	const d = new Date(year, 11, 31);
	if (d === 'Invalid Date') return false;
	const week = getWeekNumber(d)[1];
	return week == 1 ? 52 : week;
}
