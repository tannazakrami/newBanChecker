const {google} = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
})

module.exports = async function getData(){
    const client = await auth.getClient()
    const googlesheets = google.sheets({version: 'v4', auth: client})
    const spreadsheetId = '1y4Fg5DXi2TGel-XnWAkNh3T02axyvaHtIMnJZIZtSAk';
    let data = await googlesheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Sheet1!J2:L869',
    })
    return data.data.values || undefined;
}