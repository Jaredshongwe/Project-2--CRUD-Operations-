const router = require('express').Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    //#swagger.tags=['Hello Friend']
    res.send(`Hello Friend, My name is Jared. Welcome to the Contacts Project home page`)
});
router.use('/contacts', require('./contacts'));

module.exports = router;