import {test, expect} from '@playwright/test'

test('Verify that enpoint is active', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/characters/');

    expect(response.status()).toBe(200);
});

test('Verify the total number of entries', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/characters/');
    
    const respBody = JSON.parse(await response.text())

    // Max per page should be 10 per the documentation
    let totalCharacters = 10
    expect(respBody.length).toBe(totalCharacters)
});

test('Verify that fields appear', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/characters/');
    
    const respBody = JSON.parse(await response.text())

    // Verify that there are 16 data fields present for characters
    let characterFields = 16
    expect(Object.values(respBody[0]).length).toBe(characterFields)

    // Verify that each field is present
    expect(respBody[0].url).toBeDefined();
    expect(respBody[0].name).toBeDefined();
    expect(respBody[0].gender).toBeDefined();
    expect(respBody[0].culture).toBeDefined();
    expect(respBody[0].born).toBeDefined();
    expect(respBody[0].died).toBeDefined();
    expect(respBody[0].titles).toBeDefined();
    expect(respBody[0].aliases).toBeDefined();
    expect(respBody[0].father).toBeDefined();
    expect(respBody[0].mother).toBeDefined();
    expect(respBody[0].spouse).toBeDefined();
    expect(respBody[0].allegiances).toBeDefined();
    expect(respBody[0].books).toBeDefined();
    expect(respBody[0].povBooks).toBeDefined();
    expect(respBody[0].tvSeries).toBeDefined();
    expect(respBody[0].playedBy).toBeDefined();

});

test('Making assertions on individual values', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/characters/');
    const respBody = JSON.parse(await response.text())
    
    let characters_url = 'https://www.anapioficeandfire.com/api/characters/2';
    let characters_name = 'Walder';
    let characters_gender = 'Male';
    let characters_culture = '';
    let characters_born = '';
    let characters_died = '';
    let characters_titles = '';
    let characters_aliases = 'Hodor';
    let characters_father = '';
    let characters_mother = '';
    let characters_spouse = '';
    let characters_allegiances = 'https://www.anapioficeandfire.com/api/houses/362';
    let characters_books = 'https://www.anapioficeandfire.com/api/books/5';
    let characters_povBooks = [];
    let characters_tvSeries = 'Season 4';
    let characters_playedBy = 'Kristian Nairn';

    expect(respBody[1].url).toBe(characters_url)
    expect(respBody[1].name).toBe(characters_name)
    expect(respBody[1].gender).toBe(characters_gender)
    expect(respBody[1].culture).toBe(characters_culture)
    expect(respBody[1].born).toBe(characters_born)
    expect(respBody[1].died).toBe(characters_died)
    expect(respBody[1].titles).toContain(characters_titles)
    expect(respBody[1].aliases).toContain(characters_aliases)
    expect(respBody[1].father).toBe(characters_father)
    expect(respBody[1].mother).toBe(characters_mother)
    expect(respBody[1].spouse).toBe(characters_spouse)
    expect(respBody[1].allegiances).toContain(characters_allegiances)
    expect(respBody[1].books).toContain(characters_books)
    expect(respBody[1].povBooks).toStrictEqual(characters_povBooks)
    expect(respBody[1].tvSeries).toContain(characters_tvSeries)
    expect(respBody[1].playedBy).toContain(characters_playedBy)

});

test('Type checking values', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/characters/');
    const respBody = JSON.parse(await response.text())

    expect(typeof respBody[1].url).toBe('string')
    expect(typeof respBody[1].name).toBe('string')
    expect(typeof respBody[1].gender).toBe('string')
    expect(typeof respBody[1].culture).toBe('string')
    expect(typeof respBody[1].born).toBe('string')
    expect(typeof respBody[1].died).toBe('string')
    expect(typeof respBody[1].titles).toBe('object')
    expect(typeof respBody[1].aliases).toBe('object')
    expect(typeof respBody[1].father).toBe('string')
    expect(typeof respBody[1].mother).toBe('string')
    expect(typeof respBody[1].spouse).toBe('string')
    expect(typeof respBody[1].allegiances).toBe('object')
    expect(typeof respBody[1].books).toBe('object')
    expect(typeof respBody[1].povBooks).toBe('object')
    expect(typeof respBody[1].tvSeries).toBe('object')
    expect(typeof respBody[1].playedBy).toBe('object')

});

test('Test filtering values by Name', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/characters?name=Aenys%20I');
    const respBody = JSON.parse(await response.text())
     
    let characters_url = 'https://www.anapioficeandfire.com/api/characters/57';
    let characters_name = 'Aenys I';
    let characters_gender = 'Male';
    let characters_culture = '';
    let characters_born = '7 AC, at Dragonstone';
    let characters_died = '42 AC, at Dragonstone';
    let characters_titles = 'Lord of the Seven Kingdoms';
    let characters_aliases = '';
    let characters_father = 'https://www.anapioficeandfire.com/api/characters/38';
    let characters_mother = 'https://www.anapioficeandfire.com/api/characters/1874';
    let characters_spouse = 'https://www.anapioficeandfire.com/api/characters/110';
    let characters_allegiances = [];
    let characters_books = 'https://www.anapioficeandfire.com/api/books/11';
    let characters_povBooks = [];
    let characters_tvSeries = '';
    let characters_playedBy = '';

    expect(respBody[0].url).toBe(characters_url)
    expect(respBody[0].name).toBe(characters_name)
    expect(respBody[0].gender).toBe(characters_gender)
    expect(respBody[0].culture).toBe(characters_culture)
    expect(respBody[0].born).toBe(characters_born)
    expect(respBody[0].died).toBe(characters_died)
    expect(respBody[0].titles).toContain(characters_titles)
    expect(respBody[0].aliases).toContain(characters_aliases)
    expect(respBody[0].father).toBe(characters_father)
    expect(respBody[0].mother).toBe(characters_mother)
    expect(respBody[0].spouse).toBe(characters_spouse)
    expect(respBody[0].allegiances).toStrictEqual(characters_allegiances)
    expect(respBody[0].books).toContain(characters_books)
    expect(respBody[0].povBooks).toStrictEqual(characters_povBooks)
    expect(respBody[0].tvSeries).toContain(characters_tvSeries)
    expect(respBody[0].playedBy).toContain(characters_playedBy)

});

test('Test filtering values by Gender', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/characters?gender=Female');
    const respBody = JSON.parse(await response.text())
     
    let characters_url = 'https://www.anapioficeandfire.com/api/characters/19';
    let characters_name = 'Moelle';
    let characters_gender = 'Female';

    expect(respBody[9].url).toBe(characters_url)
    expect(respBody[9].name).toBe(characters_name)
    expect(respBody[9].gender).toBe(characters_gender)

});

test('Test filtering values by Culture', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/characters?culture=Braavosi');
    const respBody = JSON.parse(await response.text())
     
    let characters_url = 'https://www.anapioficeandfire.com/api/characters/1182';
    let characters_name = 'Baelish';
    let characters_culture = 'Braavosi';

    expect(respBody[7].url).toBe(characters_url)
    expect(respBody[7].name).toBe(characters_name)
    expect(respBody[7].culture).toBe(characters_culture)

});

test('Test filtering values by Born', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/characters?born=In%20263%20AC%20or%20264%20AC');
    const respBody = JSON.parse(await response.text())
     
    let characters_url = 'https://www.anapioficeandfire.com/api/characters/11';
    let characters_culture = 'Braavosi';
    let characters_born = 'In 263 AC or 264 AC';

    expect(respBody[0].url).toBe(characters_url)
    expect(respBody[0].culture).toBe(characters_culture)
    expect(respBody[0].born).toBe(characters_born)

});

test('Test filtering values by Died', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/characters?died=In%20283%20AC%20(Supposedly),%20at%20King%27s%20Landing');
    const respBody = JSON.parse(await response.text())
     
    let characters_url = 'https://www.anapioficeandfire.com/api/characters/42';
    let characters_name = 'Aegon Targaryen';
    let characters_culture = 'Valyrian';

    expect(respBody[0].url).toBe(characters_url)
    expect(respBody[0].name).toBe(characters_name)
    expect(respBody[0].culture).toBe(characters_culture)

});

test('Test filtering values by isAlive', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/characters?isAlive=false&pageSize=50');
    const respBody = JSON.parse(await response.text())
     
    let characters_url = 'https://www.anapioficeandfire.com/api/characters/41';
    let characters_name = 'Aegon IV';
    let characters_died = '184 AC, at King\'s Landing';

    expect(respBody[11].url).toBe(characters_url)
    expect(respBody[11].name).toBe(characters_name)
    expect(respBody[11].died).toBe(characters_died)

});

test('Test pagination', async({request}) => {
    const response_a = await request.get('https://www.anapioficeandfire.com/api/characters?page=1');    
    const respBody_a = JSON.parse(await response_a.text())

    let totalResults_a = 10
    expect(respBody_a.length).toBe(totalResults_a)

    let character_culture_a = 'Braavosi';
    expect(respBody_a[5].culture).toBe(character_culture_a)
    

    const response_b = await request.get('https://www.anapioficeandfire.com/api/characters?page=2');
    const respBody_b = JSON.parse(await response_b.text())
    
    let totalResults_b = 10
    expect(respBody_b.length).toBe(totalResults_b)

    let character_culture_b = 'Westeros';
    expect(respBody_b[5].culture).toBe(character_culture_b)

});

test('Test pageSize', async({request}) => {
    const response= await request.get('https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50');    
    const respBody= JSON.parse(await response.text())

    let totalResults = 50
    expect(respBody.length).toBe(totalResults)

});

test('Verify that the POST method is disabled', async({request}) => {
    const response = await request.post('https://www.anapioficeandfire.com/api/characters');
    
    expect(response.status()).toBe(405);
});

test('Verify that the PUT method is disabled', async({request}) => {
    const response = await request.put('https://www.anapioficeandfire.com/api/characters');
    
    expect(response.status()).toBe(405);
});

test('Verify that the DELETE method is disabled', async({request}) => {
    const response = await request.delete('https://www.anapioficeandfire.com/api/characters');

    expect(response.status()).toBe(405);
});

// Possible bugs
// // The test below should fail but the API still returns results. The parameter is being set to a string instead of a boolean
// test('Test filtering values by isAlive - NEGATIVE SCENARIO', async({request}) => {
//     const response = await request.get('https://www.anapioficeandfire.com/api/characters?isAlive=DRAGONS');
//     const respBody = JSON.parse(await response.text())

//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)
// });

// // The test below should fail but the API still returns results. The page is being set to a string instead of an int
// test('Test pagination - NEGATIVE SCENARIO', async({request}) => {
//     const response = await request.get('https://www.anapioficeandfire.com/api/characters?page=ZZZ');    
//     const respBody = JSON.parse(await response.text())

//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)

// });

// // The test below should fail but the API still returns results. The pageSize is being set to a string instead of an int
// test('Test pageSize - NEGATIVE SCENARIO', async({request}) => {
//     const response= await request.get('https://www.anapioficeandfire.com/api/characters?page=1&pageSize=ZZZ');    
//     const respBody= JSON.parse(await response.text())

//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)
// });
