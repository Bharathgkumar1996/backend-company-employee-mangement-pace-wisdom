// Base64 Encode
module.exports.base64Encode = (str) => {
    let bufferr = new Buffer.from(str);
    return bufferr.toString('base64');
}

// Base64 Decode
module.exports.base64Decode = (str) => {
    let bufferr = new Buffer.from(str, 'base64');
    return bufferr.toString('ascii');
}
