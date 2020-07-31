const axios = require('axios');
const { GistBox } = require("gist-box");
const Box = new GistBox({
    id: process.env.GIST_ID,
    token: process.env.GH_TOKEN,
});

(async function () {
    const url = 'https://www.no-api-key.com/api/v1/requests'

    try {
        const response = await axios.get(url, {
            headers: {
                'X-API-KEY': process.env.API_KEY_HEADER
            }
        })

        const data = response.data

        console.log(data)

        await Box.update({
            content: `Bear Requests: ${data.bear_requests.requests} 🐻\nRiddle Requests: ${data.riddle_requests.requests} 🃏\nLyric Requests: ${data.lyric_requests.requests} 🎶\nIncorrect Lyric Requests: ${data.incorrect_lyric_requests.requests} ❌\n Random Facts: ${data.incorrect_lyric_requests.requests}`,
            filename: `📊 Api Hits.txt`
        })
    } catch (e) {
        return console.log(e)
    }
})();