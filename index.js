const cron = require('node-cron')
const data = require("./getData")
const update = require("./updateData")
const puppeteer = require('puppeteer')
const dataBanCkecker = require('./getDataFromBanChecker')
const updateBanChecker = require('./updateDataInBanChecker')

const syncParse = async () => {
    let arrayUrl = await data();
    console.log(arrayUrl)
    
    const browser = await puppeteer.launch({headless: false})
    let pages = await browser.pages()
    let counter = 1;
    for(let i of arrayUrl){
        const page = await browser.newPage();

        await page.goto(i[2], {waitUntil: 'networkidle0'})
        counter == 1 ? await pages[0].close() : null
        console.log(i[2])
        try{
            await page.click('#g')
            i[1] = "Бан"

            await page.waitForTimeout(2000)
            let pages = await browser.pages();
            await pages[0].close()
        }
        catch{
            i[1] = "Активен"
        }
        page.close()
        console.log(`Проверено ${counter} из ${arrayUrl.length}`)
        counter++
    }
    updateGoogleSheets(arrayUrl)
}

syncParse()

const checkBans = async () => {
    let arrayUrl = await dataBanCkecker();
    console.log(arrayUrl)

    const browser = await puppeteer.launch({headless: false})
    let counter = 1;
    for(let i of arrayUrl){
        const page = await browser.newPage();

        await page.goto(`https://www.amazon.com/dp/${i[0]}`, {waitUntil: 'networkidle0'})
        console.log(i[0])
        try{
            await page.click('#g')
            i[1] = "Бан"
        }
        catch{
            i[1] = "Активен"
        }
        page.close()
        console.log(`Проверено ${counter} из ${arrayUrl.length}`)
        counter++
    }
    updateBanCheckerBans(arrayUrl)
}

//checkBans();

const updateGoogleSheets = (array) => {
    update.updateData(array);
}

const updateBanCheckerBans = (array) => {
    updateBanChecker.updateDataInBanChecker(array)
}

cron.schedule('0 30 3 * * *', () => {
    console.log('Jopa')
    console.log('Jopa')
    console.log('Jopa')
})