const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeEach(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        expect(band.name).toBe('The Beatles');
        expect(band.genre).toBe('Rock');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const musician = await Musician.create({ name: 'John Lennon', instrument: 'Guitar' });
        expect(musician.name).toBe('John Lennon');
        expect(musician.instrument).toBe('Guitar');
    })

    test('can update a Band', async () => {
        // TODO - test updating a band
        const band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        await band.update({ name: 'The Rolling Stones' });
        expect(band.name).toBe('The Rolling Stones');
    })

    test('can update a Musician', async () => {
        // TODO - test updating a musician
        const musician = await Musician.create({ name: 'John Lennon', instrument: 'Guitar' });
        await musician.update({ instrument: 'Piano' });
        expect(musician.instrument).toBe('Piano');
    })

    test('can delete a Band', async () => {
        // TODO - test deleting a band
        const band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        await band.destroy();
        const foundBand = await Band.findByPk(band.id);
        expect(foundBand).toBeNull();
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        const musician = await Musician.create({ name: 'John Lennon', instrument: 'Guitar' });
        await musician.destroy();
        const foundMusician = await Musician.findByPk(musician.id);
        expect(foundMusician).toBeNull();
    })
})