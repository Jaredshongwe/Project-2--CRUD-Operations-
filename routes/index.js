const router = require('express').Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    //#swagger.tags=['Hello Friend']
    res.send(`Hello Friend, My name is Jared. Welcome to the Books Project home page`);
});

router.use('/books', require('./books'));

module.exports = router;
