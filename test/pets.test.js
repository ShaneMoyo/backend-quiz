const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

describe('<Resource Name Here> API', () => {
    
    beforeEach(() => mongoose.connection.dropDatabase());
    const testPet1 = {
        name: 'sam',
        type: 'dog', 
        breed: 'good dog',
        catchPhrase: 'I am a good dog.'
    };
    let testPet2 = {
        name: 'jim',
        type: 'cat', 
        breed: 'good cat',
        catchPhrase: 'I am a good cat.'
    };

    it('Should save a pet with an id', () => {
        return request.post('/api/pets')
            .send(testPet1)
            .then(res => res.body)
            .then(savedPet => {
                assert.isOk(savedPet._id);
                assert.deepEqual(savedPet.name, testPet1.name);
            });
    });

    it('Should save a pet with a different type', () => {
        return request.post('/api/pets')
            .send(testPet2)
            .then(res => res.body)
            .then(savedPet => {
                assert.isOk(savedPet._id);
                assert.deepEqual(savedPet.name, testPet2.name);
            });
    });

    it('should get all pets', () => {
        const testPets = [testPet1, testPet2];
        return Promise.all(testPets.map( pet => {
            return request.post('/api/pets')
                .send(pet)
                .then(res => res.body);
        }))
            .then(() => {
                return request.get('/api/pets')
                    .then(pets => {
                        assert.deepEqual(pets.length, 2);
                    });
            });

    });

});