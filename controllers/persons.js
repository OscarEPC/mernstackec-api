const { response, request } = require('express');
const { Person } = require('../models/person');

const createPerson = async (req = request, res = response) => {
    const { name, lastName, age, dni } = req.body;
    try {
        const existDni = await Person.findOne({
            where: {
                dni: dni
            }
        });
        if (existDni) {
            return res.status(400).json({
                msg: 'Ya existe una persona con esa cédula ' + dni
            });
        }
        const person = new Person({ name, lastName, age, dni });
        await person.save();
        res.json(person);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }
}

const getPersons = async (req = request, res = response) => {
    const persons = await Person.findAll({
        where: {
            status: true,
        }
    });
    res.status(200).json(persons);
}

const updatePerson = async (req = request, res = response) => {
    const { id }   = req.params;
    const { body } = req;
    try {
        const person = await Person.findByPk(id);
        if (!person) {
            return res.status(404).json({
                msg: 'No existe una persona con el id ' + id
            });
        }
        await person.update(body);
        res.json(person);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        }); 
    }
}


const deletePerson = async (req = request, res = response) => {
    const { id } = req.params;
    const person = await Person.findByPk(id);
    if (!person) {
        return res.status(404).json({
            msg: 'No existe una persona con el id ' + id
        });
    }
    await person.update({ status: false });
    res.json(person);
}

module.exports = {
    createPerson,
    deletePerson,
    getPersons,
    updatePerson,
}