var lengthOfLastWord = function(s) {
    let trimmedString = s.trim();
    return trimmedString.lastIndexOf(' ')
};

console.log("out:" + lengthOfLastWord("   fly me   to   the moon  "));