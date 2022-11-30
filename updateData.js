const {google} = require("googleapis");
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
})

module.exports = {
    updateData: async function(updatedData){
        const client = await auth.getClient();
        const googleSheets = google.sheets({version: "v4", auth: client});
        const spreadsheetId = "1y4Fg5DXi2TGel-XnWAkNh3T02axyvaHtIMnJZIZtSAk";
        return new Promise((resolve, reject) => {
            googleSheets.spreadsheets.values.update({
                auth,
                spreadsheetId,
                range:'Sheet1!J2:L869', //`TEST!C${2+index}:D${2+index}`,
                valueInputOption: "USER_ENTERED",
                resource: {range: 'Sheet1!J2:L869', majorDimension: "ROWS", values:updatedData}
            }, (err, resp) => {
                if(err){
                    console.log('Data Error: ',err)
                    reject(err);
                }
                resolve(resp);
            })
        })
    }
}