import {test, expect} from '@playwright/test'

test('Verify that enpoint is active', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/books/');

    expect(response.status()).toBe(200);
});

test('Verify the total number of entries', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/books/');
    
    const respBody = JSON.parse(await response.text())

    // Max per page should be 10 per the documentation
    let totalBooks = 10
    expect(respBody.length).toBe(totalBooks)
});

test('Verify that fields appear', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/books/');
    
    const respBody = JSON.parse(await response.text())

    // Verify that there are 11 data fields present for books
    let bookFields = 11
    expect(Object.values(respBody[0]).length).toBe(bookFields)

    // Verify that each field is present
    expect(respBody[0].url).toBeDefined();
    expect(respBody[0].name).toBeDefined();
    expect(respBody[0].isbn).toBeDefined();
    expect(respBody[0].authors).toBeDefined();
    expect(respBody[0].numberOfPages).toBeDefined();
    expect(respBody[0].publisher).toBeDefined();
    expect(respBody[0].country).toBeDefined();
    expect(respBody[0].mediaType).toBeDefined();
    expect(respBody[0].released).toBeDefined();
    expect(respBody[0].characters).toBeDefined();
    expect(respBody[0].povCharacters).toBeDefined();

});

test('Making assertions on individual values', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/books/');
    
    const respBody = JSON.parse(await response.text())
    
    let book_url = 'https://www.anapioficeandfire.com/api/books/2';
    let book_name = 'A Clash of Kings';
    let book_isbn = '978-0553108033';
    let book_authors = 'George R. R. Martin';
    let book_numberOfPages = 768;
    let book_publisher = 'Bantam Books';
    let book_country = 'United States';
    let book_mediaType = 'Hardback';
    let book_released = '1999-02-02T00:00:00';
    let book_characters = 'https://www.anapioficeandfire.com/api/characters/13';
    let book_povCharacters = 'https://www.anapioficeandfire.com/api/characters/232';

    expect(respBody[1].url).toBe(book_url)
    expect(respBody[1].name).toBe(book_name)
    expect(respBody[1].isbn).toBe(book_isbn)
    expect(respBody[1].authors).toContain(book_authors)
    expect(respBody[1].numberOfPages).toBe(book_numberOfPages)
    expect(respBody[1].publisher).toBe(book_publisher)
    expect(respBody[1].country).toBe(book_country)
    expect(respBody[1].mediaType).toBe(book_mediaType)
    expect(respBody[1].released).toBe(book_released)
    expect(respBody[1].characters).toContain(book_characters)
    expect(respBody[1].povCharacters).toContain(book_povCharacters)

});

test('Type checking values', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/books/');
    
    const respBody = JSON.parse(await response.text())

    expect(typeof respBody[1].url).toBe('string')
    expect(typeof respBody[1].name).toBe('string')
    expect(typeof respBody[1].isbn).toBe('string')
    expect(typeof respBody[1].authors).toBe('object')
    expect(typeof respBody[1].numberOfPages).toBe('number')
    expect(typeof respBody[1].publisher).toBe('string')
    expect(typeof respBody[1].country).toBe('string')
    expect(typeof respBody[1].mediaType).toBe('string')
    expect(typeof respBody[1].released).toBe('string')
    expect(typeof respBody[1].characters).toBe('object')
    expect(typeof respBody[1].povCharacters).toBe('object')

});

test('Test filtering values by Name', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/books?name=The%20Hedge%20Knight');
    
    const respBody = JSON.parse(await response.text())
    
    let book_url = 'https://www.anapioficeandfire.com/api/books/4';
    let book_name = 'The Hedge Knight';
    let book_isbn = '978-0976401100';
    let book_authors = 'George R. R. Martin';
    let book_numberOfPages = 164;
    let book_publisher = 'Dabel Brothers Publishing';
    let book_country = 'United States';
    let book_mediaType = 'GraphicNovel';
    let book_released = '2005-03-09T00:00:00';
    let book_characters = 'https://www.anapioficeandfire.com/api/characters/46';
    let book_povCharacters = 'https://www.anapioficeandfire.com/api/characters/329';

    expect(respBody[0].url).toBe(book_url)
    expect(respBody[0].name).toBe(book_name)
    expect(respBody[0].isbn).toBe(book_isbn)
    expect(respBody[0].authors).toContain(book_authors)
    expect(respBody[0].numberOfPages).toBe(book_numberOfPages)
    expect(respBody[0].publisher).toBe(book_publisher)
    expect(respBody[0].country).toBe(book_country)
    expect(respBody[0].mediaType).toBe(book_mediaType)
    expect(respBody[0].released).toBe(book_released)
    expect(respBody[0].characters).toContain(book_characters)
    expect(respBody[0].povCharacters).toContain(book_povCharacters)

});

test('Test filtering values by fromReleaseDate and toReleaseDate', async({request}) => {
    const response = await request.get('https://www.anapioficeandfire.com/api/books?fromReleaseDate=1999-01-01&toReleaseDate=2012-12-31');
    
    const respBody = JSON.parse(await response.text())
    
    let totalResults = 7
    expect(respBody.length).toBe(totalResults)

    let book_name_0 = 'A Clash of Kings';
    let book_name_6 = 'A Dance with Dragons';

    expect(respBody[0].name).toBe(book_name_0)
    expect(respBody[6].name).toBe(book_name_6)

});

test('Test pagination', async({request}) => {
    const response_a = await request.get('https://www.anapioficeandfire.com/api/books?page=1');    
    const respBody_a = JSON.parse(await response_a.text())

    let totalResults_a = 10
    expect(respBody_a.length).toBe(totalResults_a)

    let book_name_a = 'A Game of Thrones';
    expect(respBody_a[0].name).toBe(book_name_a)
    

    const response_b = await request.get('https://www.anapioficeandfire.com/api/books?page=2');
    const respBody_b = JSON.parse(await response_b.text())
    
    let totalResults_b = 2
    expect(respBody_b.length).toBe(totalResults_b)

    let book_name_b = 'The World of Ice and Fire';
    expect(respBody_b[0].name).toBe(book_name_b)

});

test('Test pageSize', async({request}) => {
    const response_a = await request.get('https://www.anapioficeandfire.com/api/books?page=1&pageSize=5');    
    const respBody_a = JSON.parse(await response_a.text())

    let totalResults_a = 5
    expect(respBody_a.length).toBe(totalResults_a)

    
    const response_b = await request.get('https://www.anapioficeandfire.com/api/books?page=1&pageSize=50');    
    const respBody_b = JSON.parse(await response_b.text())

    let totalResults_b = 12
    expect(respBody_b.length).toBe(totalResults_b)
});

test('Verify that the POST method is disabled', async({request}) => {
    const response = await request.post('https://www.anapioficeandfire.com/api/books/');
    
    expect(response.status()).toBe(405);
});

test('Verify that the PUT method is disabled', async({request}) => {
    const response = await request.put('https://www.anapioficeandfire.com/api/books/');
    
    expect(response.status()).toBe(405);
});

test('Verify that the DELETE method is disabled', async({request}) => {
    const response = await request.delete('https://www.anapioficeandfire.com/api/books/');

    expect(response.status()).toBe(405);
});

// Possible bugs
// // The test below should fail but the API still returns results. The fromReleaseDate and toReleaseDate should be in a date format
// test('Test filtering values by fromReleaseDate and toReleaseDate - NEGATIVE SCENARIO', async({request}) => {
//     const response = await request.get('https://www.anapioficeandfire.com/api/books?fromReleaseDate=ZZZ&toReleaseDate=AAA');
    
//     const respBody = JSON.parse(await response.text())
    
//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)
// });

// // The test below should fail but the API still returns results. The page is being set to a string instead of an int
// test('Test pagination - NEGATIVE SCENARIO', async({request}) => {
//     const response = await request.get('https://www.anapioficeandfire.com/api/books?page=ZZZ');    
//     const respBody = JSON.parse(await response.text())

//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)

// });

// // The test below should fail but the API still returns results. The pageSize is being set to a string instead of an int
// test('Test pageSize - NEGATIVE SCENARIO', async({request}) => {
//     const response = await request.get('https://www.anapioficeandfire.com/api/books?page=1&pageSize=ZZZ');    
//     const respBody = JSON.parse(await response.text())

//     let totalResults = 0
//     expect(respBody.length).toBe(totalResults)

// });
