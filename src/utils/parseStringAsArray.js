// Exported function to read the dev's known techs array and return as a string
module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(techs => techs.trim());
}