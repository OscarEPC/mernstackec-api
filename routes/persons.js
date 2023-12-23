const { Router } = require('express');

const { createPerson, getPersons, updatePerson, deletePerson } = require('../controllers/persons');

const router = Router();

router.post('/',  createPerson);

router.get('/',  getPersons);

router.put('/:id',  updatePerson);

router.delete('/:id',  deletePerson);

module.exports = router;