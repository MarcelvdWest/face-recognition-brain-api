const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '2e985394533c4351bf02038d50aef3a2'
});

const handleApiCall = (req, res) => {
    const { input } = req.body;

    console.log(input);

    app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
        .then(generalModel => { return generalModel.predict(input) })
        .then( data => {
            res.json(data)
        }).catch(err => res.status(400).json('unable to work with api'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }).catch(err => { res.status(400).json('Unable To Get Entries')});    

}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}