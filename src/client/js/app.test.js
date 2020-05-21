jest.mock('./app.js')

test('waiting for a value', () => {
    const func = async function sendWeatherInformation(placeInfo) {
        expect().toBeThruthy();
    }
});


test('waiting for a value', () => {
    const func = async function getDestinationServer() {
        const searchResults = 'valuepls';
        expect(getDestinationServer()).toBe(searchResult);
    }
});

test('return value', () => {
    const func = async function getWeatherServer() {
        const weatherDataResult = 'valuepls';
        expect(getWeatherServer()).toBe(weatherDataResult);
    }
});
