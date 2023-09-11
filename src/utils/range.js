function* range(n){
	let counter = 0
	if(typeof n !== "number") return 
	while(counter !== n){
		yield counter
		++counter
	}
}

module.exports = range