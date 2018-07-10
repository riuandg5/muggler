function customError (message) {
    var err, aux;
    try {
    	throw new Error('MugErr')
    } catch (e) {
    	err = e
    }
    if (!err) return;
    aux = err.stack.split("\n");
    aux.splice(0, 2);
    aux = aux.join('\n');
    return `${message}\n${aux}`;
}

module.exports = customError;