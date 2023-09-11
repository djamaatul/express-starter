String.prototype.removeCharacter = function () {
	return this.valueOf().replace(/\W/g, '')
}

String.prototype.oracleString = function () {
	//binding only
	return this.valueOf().replace(/'/g, '')
}

const decodeOracle = function(s){
	if(!s) s = ""
	//escape character : literal only
	this.decode = () => {
		return s.match(/\W|[\w\s]+/g)?.map((char) => {
			if (/^\W$/.test(char)) {
				return `CHR(${char.charCodeAt(0)})`
			}
			return `'${char}'`
		}).join(' || ') || ""
	}
	return this.decode()
}

const likeOracle = function(s){
	//escape character : literal only
	return `'%' || ${decodeOracle(s) || "''"} || '%'`
}

const like = function (s) {
	//binding only
	if (!s) return s
	return `%${s.replace(/'/g,"")}%`
}

module.exports = {
	likeOracle,
	decodeOracle,
	like
}