export function colParser(cols) {
	if(!cols) return [];

	let standardCols = [];
	for (var i = 0; i < cols.length; i++) {
		standardCols.push(JSON.parse(cols[i]))
	}
	return standardCols
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

export function imageParser(record, field) {

	if(field.name && record[field.name])
	{
		if(record[field.name] == 'jpeg' || record[field.name] == 'jpg' || record[field.name] == 'png') 
		{
			return "http://localhost:8000/images/profiles/" + record.id + "/p." + record[field.name]
		}
		else
		{
			return "http://localhost:8000/" + record[field.name]
		}
	}
	return false;
}