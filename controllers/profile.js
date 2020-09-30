const HandleProfileGet = (req,res) => {
    const { id } = req.params;
    
    db('users').where({
        id: id
    }).select('*')
    .then(user => {
        if(user.length){
            res.json(user[0])
        } else {
            res.status(400).json('Not Found!!')
        }
    }).catch(err => res.status(400).json('Error Getting User'));    
   
}

module.exports = {
    HandleProfileGet: HandleProfileGet
}