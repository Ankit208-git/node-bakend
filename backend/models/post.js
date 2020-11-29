const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name:{ type: String, required: true},
    sex:{ type: String, required: true},
    fatherName:{ type: String, required: true},
    motherName:{ type: String, required: true},
    state:{ type: String, required: true},
    district:{ type: String, required: true}
});
module.exports = mongoose.model('Post', postSchema);