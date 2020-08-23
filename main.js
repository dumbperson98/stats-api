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
            content: `Total Requests: ${data.requests.toLocaleString()} ✅\nTotal Incorrect Requests: ${data.errors.toLocaleString()} ❌\nStatus: ok✅ \n Timestamp: ${new Date}`,
            filename: `📊 Api Hits.txt`
        })
    } catch (e) {
        return console.log(e)
    }
})();
