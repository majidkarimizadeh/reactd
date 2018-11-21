export function columnParser(columns) {
	let standardColumns = [];
	for (var i = columns.length - 1; i >= 0; i--) {
		standardColumns.push(JSON.parse(columns[i]))
	}
	return standardColumns
}

export function tableParser(table) {
	return JSON.parse(table)
}

export function dataParser(data) {
	return data
}

export function lookupParser(lookups) {
	return lookups
}