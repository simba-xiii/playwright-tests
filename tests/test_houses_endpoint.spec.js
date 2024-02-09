import {test, expect} from '@playwright/test'

test('Verify that enpoint is active', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses');

    expect(response.status()).toBe(200);
});

test('Verify the total number of entries', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses');
    
    const respBody = JSON.parse(await response.text())
    
    // Max per page should be 10 per the documentation
    let totalHouses = 10
    expect(respBody.length).toBe(totalHouses)
});

test('Verify that fields appear', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses');
    
    const respBody = JSON.parse(await response.text())

    // Verify that there are 16 data fields present for a House
    let houseFields = 16
    expect(Object.values(respBody[0]).length).toBe(houseFields)

    // Verify that each field is present
    expect(respBody[0].url).toBeDefined();
    expect(respBody[0].name).toBeDefined();
    expect(respBody[0].region).toBeDefined();
    expect(respBody[0].coatOfArms).toBeDefined();
    expect(respBody[0].words).toBeDefined();
    expect(respBody[0].titles).toBeDefined();
    expect(respBody[0].seats).toBeDefined();
    expect(respBody[0].currentLord).toBeDefined();
    expect(respBody[0].heir).toBeDefined();
    expect(respBody[0].overlord).toBeDefined();
    expect(respBody[0].founded).toBeDefined();
    expect(respBody[0].founder).toBeDefined();
    expect(respBody[0].diedOut).toBeDefined();
    expect(respBody[0].ancestralWeapons).toBeDefined();
    expect(respBody[0].cadetBranches).toBeDefined();
    expect(respBody[0].swornMembers).toBeDefined();

});

test('Making assertions on individual values', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses');
    const respBody = JSON.parse(await response.text())
    
    let url = 'https://www.anapioficeandfire.com/api/houses/1';
    let name = 'House Algood';
    let region = 'The Westerlands';
    let coatOfArms = 'A golden wreath, on a blue field with a gold border(Azure, a garland of laurel within a bordure or)';
    let words = '';
    let titles = '';
    let seats = '';
    let currentLord = '';
    let heir = '';
    let overlord = 'https://www.anapioficeandfire.com/api/houses/229';
    let founded = '';
    let founder = '';
    let diedOut = '';
    let ancestralWeapons = '';
    let cadetBranches = [];
    let swornMembers = [];

    expect(respBody[0].url).toBe(url);
    expect(respBody[0].name).toBe(name);
    expect(respBody[0].region).toBe(region);
    expect(respBody[0].coatOfArms).toBe(coatOfArms);
    expect(respBody[0].words).toBe(words);
    expect(respBody[0].titles[0]).toBe(titles);
    expect(respBody[0].seats).toContain(seats);
    expect(respBody[0].currentLord).toBe(currentLord);
    expect(respBody[0].heir).toBe(heir);
    expect(respBody[0].overlord).toBe(overlord);
    expect(respBody[0].founded).toBe(founded);
    expect(respBody[0].founder).toBe(founder);
    expect(respBody[0].diedOut).toBe(diedOut);
    expect(respBody[0].ancestralWeapons).toContain(ancestralWeapons);
    expect(respBody[0].cadetBranches).toStrictEqual(cadetBranches);
    expect(respBody[0].swornMembers).toStrictEqual(swornMembers);

});

test('Type checking values', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses');
    const respBody = JSON.parse(await response.text())

    expect(typeof respBody[0].url).toBe('string')
    expect(typeof respBody[0].name).toBe('string')
    expect(typeof respBody[0].region).toBe('string')
    expect(typeof respBody[0].coatOfArms).toBe('string')
    expect(typeof respBody[0].words).toBe('string')
    expect(typeof respBody[0].titles).toBe('object')
    expect(typeof respBody[0].seats).toBe('object')
    expect(typeof respBody[0].currentLord).toBe('string')
    expect(typeof respBody[0].heir).toBe('string')
    expect(typeof respBody[0].overlord).toBe('string')
    expect(typeof respBody[0].founded).toBe('string')
    expect(typeof respBody[0].founder).toBe('string')
    expect(typeof respBody[0].diedOut).toBe('string')
    expect(typeof respBody[0].ancestralWeapons).toBe('object')
    expect(typeof respBody[0].cadetBranches).toBe('object')
    expect(typeof respBody[0].swornMembers).toBe('object')

});

test('Test filtering values by Name', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses?name=House%20Ambrose');
    const respBody = JSON.parse(await response.text())
    
    let url = 'https://www.anapioficeandfire.com/api/houses/4';
    let name = 'House Ambrose';
    let region = 'The Reach';
    let coatOfArms = 'Or, semy of ants gules';
    let words = 'Never Resting';
    let titles = '';
    let seats = '';
    let currentLord = 'https://www.anapioficeandfire.com/api/characters/141';
    let heir = '';
    let overlord = 'https://www.anapioficeandfire.com/api/houses/398';
    let founded = '';
    let founder = '';
    let diedOut = '';
    let ancestralWeapons = '';
    let cadetBranches = [];
    let swornMembers = 'https://www.anapioficeandfire.com/api/characters/82';

    expect(respBody[0].url).toBe(url);
    expect(respBody[0].name).toBe(name);
    expect(respBody[0].region).toBe(region);
    expect(respBody[0].coatOfArms).toBe(coatOfArms);
    expect(respBody[0].words).toBe(words);
    expect(respBody[0].titles[0]).toBe(titles);
    expect(respBody[0].seats).toContain(seats);
    expect(respBody[0].currentLord).toBe(currentLord);
    expect(respBody[0].heir).toBe(heir);
    expect(respBody[0].overlord).toBe(overlord);
    expect(respBody[0].founded).toBe(founded);
    expect(respBody[0].founder).toBe(founder);
    expect(respBody[0].diedOut).toBe(diedOut);
    expect(respBody[0].ancestralWeapons).toContain(ancestralWeapons);
    expect(respBody[0].cadetBranches).toStrictEqual(cadetBranches);
    expect(respBody[0].swornMembers).toContain(swornMembers);
});

test('Test filtering values by Region', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses?region=The%20Vale');
    const respBody = JSON.parse(await response.text())
     
    let house_url = 'https://www.anapioficeandfire.com/api/houses/35';
    let house_name = 'House Borrell of Sweetsister';
    let house_region = 'The Vale';

    expect(respBody[4].url).toBe(house_url)
    expect(respBody[4].name).toBe(house_name)
    expect(respBody[4].region).toBe(house_region)

});

test('Test filtering values by Words', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses?words=As%20High%20as%20Honor');
    const respBody = JSON.parse(await response.text())
     
    let house_url = 'https://www.anapioficeandfire.com/api/houses/7';
    let house_name = 'House Arryn of the Eyrie';
    let house_words = 'As High as Honor';

    expect(respBody[0].url).toBe(house_url)
    expect(respBody[0].name).toBe(house_name)
    expect(respBody[0].words).toBe(house_words)

});

test('Test filtering values by hasWords', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses?hasWords=False');
    const respBody = JSON.parse(await response.text())
     
    let house_url = 'https://www.anapioficeandfire.com/api/houses/5';
    let house_name = 'House Appleton of Appleton';
    let house_words = '';

    expect(respBody[2].url).toBe(house_url)
    expect(respBody[2].name).toBe(house_name)
    expect(respBody[2].words).toBe(house_words)

});

test('Test filtering values by hasTitles', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses?hasTitles=true');
    const respBody = JSON.parse(await response.text())
     
    let house_url = 'https://www.anapioficeandfire.com/api/houses/7';
    let house_name = 'House Arryn of the Eyrie';
    let house_titles = 'Lord of the Eyrie';

    expect(respBody[0].url).toBe(house_url)
    expect(respBody[0].name).toBe(house_name)
    expect(respBody[0].titles).toContain(house_titles)

});

test('Test filtering values by hasSeats', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses?hasSeats=true');
    const respBody = JSON.parse(await response.text())
     
    let house_url = 'https://www.anapioficeandfire.com/api/houses/2';
    let house_name = 'House Allyrion of Godsgrace';
    let house_seats = 'Godsgrace';

    expect(respBody[0].url).toBe(house_url)
    expect(respBody[0].name).toBe(house_name)
    expect(respBody[0].seats).toContain(house_seats)

});

test('Test filtering values by hasDiedOut', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses?hasDiedOut=true');
    const respBody = JSON.parse(await response.text())
     
    let house_url = 'https://www.anapioficeandfire.com/api/houses/107';
    let house_name = 'House Dryland';
    let house_diedOut = 'Rhoynar migration';

    expect(respBody[4].url).toBe(house_url)
    expect(respBody[4].name).toBe(house_name)
    expect(respBody[4].diedOut).toContain(house_diedOut)

});

test('Test filtering values by hasAncestralWeapons', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/houses?hasAncestralWeapons=true');
    const respBody = JSON.parse(await response.text())
     
    let house_url = 'https://www.anapioficeandfire.com/api/houses/81';
    let house_name = 'House Corbray of Heart\'s Home';
    let house_ancestralWeapons = 'Lady Forlorn';

    expect(respBody[1].url).toBe(house_url)
    expect(respBody[1].name).toBe(house_name)
    expect(respBody[1].ancestralWeapons).toContain(house_ancestralWeapons)

});

test('Test pagination', async({request}) => {
    const response_a = await request.get('https://www.anapioficeandfire.com/api/houses?page=1');    
    const respBody_a = JSON.parse(await response_a.text())

    let totalResults_a = 10
    expect(respBody_a.length).toBe(totalResults_a)

    let house_name_a = 'House Arryn of the Eyrie';
    expect(respBody_a[6].name).toBe(house_name_a)
    

    const response_b = await request.get('https://www.anapioficeandfire.com/api/houses?page=2');
    const respBody_b = JSON.parse(await response_b.text())
    
    let totalResults_b = 10
    expect(respBody_b.length).toBe(totalResults_b)

    let house_name_b = 'House Baratheon of Storm\'s End';
    expect(respBody_b[6].name).toBe(house_name_b)

});
test('Test pageSize', async({request}) => {
    const response= await request.get('https://www.anapioficeandfire.com/api/houses?page=1&pageSize=50');    
    const respBody= JSON.parse(await response.text())

    let totalResults = 50
    expect(respBody.length).toBe(totalResults)

});
test('Verify that the POST method is disabled', async({request}) => {
    const response = await request.post('https://www.anapioficeandfire.com/api/houses');
    
    expect(response.status()).toBe(405);
});

test('Verify that the PUT method is disabled', async({request}) => {
    const response = await request.put('https://www.anapioficeandfire.com/api/houses');
    
    expect(response.status()).toBe(405);
});

test('Verify that the DELETE method is disabled', async({request}) => {
    const response = await request.delete('https://www.anapioficeandfire.com/api/houses');

    expect(response.status()).toBe(405);
});

// Possible bugs
// // The test below should fail but the API still returns results. The parameter is being set to a string instead of a boolean
// test('Test filtering values by hasWords - NEGATIVE SCENARIO', async({request}) => {
//     const response = await request.get('https://www.anapioficeandfire.com/api/houses?hasWords=DRAGONS');
//     const respBody = JSON.parse(await response.text())
     
//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)
// });

// // The test below should fail but the API still returns results. The parameter is being set to a string instead of a boolean
// test('Test filtering values by hasTitles - NEGATIVE SCENARIO', async({request}) => {
//     const response = await request.get('https://www.anapioficeandfire.com/api/houses?hasTitles=DRAGONS');
//     const respBody = JSON.parse(await response.text())

//    let totalResults = 0
//    expect(respBody.length).toBe(totalResults)
// });

// // The test below should fail but the API still returns results. The parameter is being set to a string instead of a boolean
// test('Test filtering values by hasSeats - NEGATIVE SCENARIO', async({request}) => {
//     const response = await request.get('https://www.anapioficeandfire.com/api/houses?hasSeats=DRAGONS');
//     const respBody = JSON.parse(await response.text())
    
//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)
// });

// // The test below should fail but the API still returns results. The parameter is being set to a string instead of a boolean
// test('Test filtering values by hasDiedOut - NEGATIVE SCENARIO', async({request}) => {
//     const response = await request.get('https://www.anapioficeandfire.com/api/houses?hasDiedOut=DRAGONS');
//     const respBody = JSON.parse(await response.text())
    
//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)
// });

// // The test below should fail but the API still returns results. The parameter is being set to a string instead of a boolean
// test('Test filtering values by hasAncestralWeapons - NEGATIVE SCENARIO', async({request}) => {
//     const response = await request.get('https://www.anapioficeandfire.com/api/houses?hasAncestralWeapons=DRAGONS');
//     const respBody = JSON.parse(await response.text())
    
//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)
// });

// // The test below should fail but the API still returns results. The page is being set to a string instead of an int
// test('Test pagination - NEGATIVE SCENARIO', async({request}) => {
//     const response = await request.get('https://www.anapioficeandfire.com/api/houses?page=ZZZ');    
//     const respBody = JSON.parse(await response.text())

//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)
// });

// // The test below should fail but the API still returns results. The pageSize is being set to a string instead of an int
// test('Test pageSize - NEGATIVE SCENARIO', async({request}) => {
//     const response= await request.get('https://www.anapioficeandfire.com/api/houses?page=1&pageSize=ZZZ');    
//     const respBody= JSON.parse(await response.text())

//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)

// });