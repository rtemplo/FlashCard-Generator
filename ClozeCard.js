var ClozeCard = function (text, cloze) {
	if (text.indexOf(cloze) !== -1) {
		this.text = text;
	} else {
		console.log('Sorry this card text does not contain the cloze: "' + cloze + '"');
	}

    this.cloze = cloze;
};

ClozeCard.prototype.fullText = function () {
    return this.text.replace("...", this.cloze);
};

ClozeCard.prototype.partial = function () {
    return this.text.replace(this.cloze, "...");
};

module.exports = ClozeCard;