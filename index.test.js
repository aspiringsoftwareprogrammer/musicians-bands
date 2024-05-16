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

    test('can create bands with musicians', async () => {
        // Create bands
        const band1 = await Band.create({ name: 'Band 1' });
        const band2 = await Band.create({ name: 'Band 2' });

        // Create musicians
        const musician1 = await Musician.create({ name: 'Musician 1' });
        const musician2 = await Musician.create({ name: 'Musician 2' });

        // Associate musicians with bands
        await band1.addMusician(musician1);
        await band2.addMusician(musician2);

        // Retrieve bands with musicians
        const bandsWithMusicians = await Band.findAll({
            include: [{ model: Musician }]
        });
       // Check associations
       expect(bandsWithMusicians.length).toBe(2);
       expect(bandsWithMusicians[0].Musicians.length).toBe(1);
       expect(bandsWithMusicians[1].Musicians.length).toBe(1);
   });
   
   

   test('can add multiple songs to a band', async () => {
    // Create bands
    const band1 = await Band.create({ name: 'Band 1' });
    const band2 = await Band.create({ name: 'Band 2' });

    // Create songs
    const song1 = await Song.create({ title: 'Song 1' });
    const song2 = await Song.create({ title: 'Song 2' });

    // Add songs to one band
    await band1.addSongs([song1, song2]);


    // Retrieve songs for the band
    const songsForBand1 = await band1.getSongs();

    // Check associations
    expect(songsForBand1.length).toBe(2);
    expect(songsForBand1[0].title).toBe('Song 1');
    expect(songsForBand1[1].title).toBe('Song 2');

    // Do the same with the bands
    const bandsForSong1 = await song1.getBands();
    const bandsForSong2 = await song2.getBands();

    expect(bandsForSong1.length).toBe(1);
    expect(bandsForSong2.length).toBe(1);
    expect(bandsForSong1[0].name).toBe('Band 1');
    expect(bandsForSong2[0].name).toBe('Band 1');
});
  

})