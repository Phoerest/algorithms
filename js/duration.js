/*
	Parse a duration string.
	https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#parse-a-duration-string
*/
function parseDurationString(input) {
	if (typeof input !== 'string') return false;
	//1, 2, 3, 4
	const asciiWhitespace = [9, 10, 12, 13, 32];
	const asciiDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let position = months = seconds = componentCount = 0;
	let M_disambiguator = 'minutes';
	//5, 6
	while (asciiWhitespace.includes(input[position])) position++;
	if (position >= input.length - 1) return false;
	//7
	if (input[position] === 'P') {
		position++;
		M_disambiguator = 'months';
		while (asciiWhitespace.includes(input[position])) position++;
	}
	//8
	while(true) {
		//1, 2, 3
		let units;
		let nextCharachter;
		if (position > input.length - 1) break;
		//4
		if (input[position] === 'T') {
			position++;
			M_disambiguator = 'minutes';
			while (asciiWhitespace.includes(input[position])) position++;
			continue;
		}
		//5, 6
		nextCharachter = input[position];
		let N;
		if (nextCharachter === '.') {
			N = 0;
		} else if (asciiDigits.includes(input[position])) {
			let result = '';
			while (asciiDigits.includes(input[position])) result += input[position++];
			N = parseInt(result);
		}
		else return false;
		//7, 8
		if (position > input.length - 1) return false;
		nextCharachter = input[position++];
		//9
		if (nextCharachter === '.') {
			//1, 2
			let s = '';
			while (asciiDigits.includes(input[position])) s += input[position++];
			if (s === '') return false;
			//3, 4, 5
			const length = s.length;
			const fraction = parseInt(s) / Math.pow(10, length);
			N += fraction;
			//6, 7, 8
			while (asciiWhitespace.includes(input[position])) position++;
			if (position > input.length - 1) return false;
			nextCharachter = input[position++];
			//9
			if (
				nextCharachter !== 'S' &&
				nextCharachter !== 's'
			) return false;
			//10
			units = 'seconds';
			//Otherwise 1
		} else if (asciiWhitespace.includes(nextCharachter)) {
			while (asciiWhitespace.includes(input[position])) position++;
			nextCharachter = input[position++];
			//Otherwise 2
		} else if (
			nextCharachter === 'Y' || 
			nextCharachter === 'y'
		) {
			units = 'years';
			M_disambiguator = 'months';
		} else if (
			(nextCharachter === 'M' || 
			nextCharachter === 'm') &&
			M_disambiguator === 'months'
		) {
			units = 'months';
		} else if (
			nextCharachter === 'W' || 
			nextCharachter === 'w'
		) {
			units = 'weeks';
			M_disambiguator = 'minutes';
		} else if (
			nextCharachter === 'D' || 
			nextCharachter === 'd'
		) {
			units = 'days';
			M_disambiguator = 'minutes';
		} else if (
			nextCharachter === 'H' || 
			nextCharachter === 'h'
		) {
			units = 'hours';
			M_disambiguator = 'minutes';
		} else if (
			(nextCharachter === 'M' || 
			nextCharachter === 'm') &&
			M_disambiguator === 'minutes'
		) {
			units = 'minutes';
		} else if (
			nextCharachter === 'S' || 
			nextCharachter === 's'
		) {
			units = 'seconds';
			M_disambiguator = 'minutes';
		} else return false;
		//10, 11, 12, 13
		componentCount++;
		let multiplier = 1;
		if (units === 'years') {
			multiplier *= 12;
			units = 'months';
		}
		if (units === 'months') {
			months += N * multiplier;
		} else {
			//1, 2, 3, 4, 5
			if (units === 'weeks') {
				multiplier *= 7;
				units = 'days';
			}
			if (units === 'days') {
				multiplier *= 24;
				units = 'hours';
			}
			if (units === 'hours') {
				multiplier *= 60;
				units = 'minutes';
			}
			if (units === 'minutes') {
				multiplier *= 60;
				units = 'seconds';
			}
			seconds += N * multiplier;
		}
		//14
		while (asciiWhitespace.includes(input[position])) position++;
	}
	//9, 10, 11
	if (componentCount === 0) return false;
	if (months !== 0) return false;
	return seconds;
}
