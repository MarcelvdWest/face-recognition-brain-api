
const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if(!email || !name || !password){
        return res.status(400).json('Incorrect Form Submisson');
    }

    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx('login')
        .insert({
            hash: hash,
            email: email
        }).returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            }).then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }).catch(() => res.status(400).json('Unable to register'));
}

module.exports = {
    handleRegister: handleRegister
}