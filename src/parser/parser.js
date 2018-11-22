export function columnParser(columns) {
	if(!columns) return [];

	let standardColumns = [];
	for (var i = 0; i < columns.length; i++) {
		standardColumns.push(JSON.parse(columns[i]))
	}
	return standardColumns
}

export function detailParser(details) {
	if(!details) return [];

	let standardDetail = [];
	for (var i = 0; i < details.length; i++) {
		standardDetail.push(JSON.parse(details[i]))
	}
	return standardDetail
}

export function tableParser(table) {
	if(!table) return {}
	return JSON.parse(table)
}

export function dataParser(data) {
	if(!data) return []
	return data
}

export function lookupParser(lookups) {
	if(!lookups) return []
	return lookups
}