// https://www.npmjs.com/package/ffmpeg para editar os videos

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'
    });
  const page = await browser.newPage();
  page.on('console', consoleObj => console.log(consoleObj.text())); //permite usar o console.log dentro do page.evaluate
  await page.goto('https://www.twitch.tv/directory/game/Counter-Strike%3A%20Global%20Offensive/clips?range=7d');
  
  //espera dropdown:
  await page.waitForSelector('#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div > div > div > div.Layout-sc-nxg1ff-0.jLsLts.directory-game-clips-page__filters > div.Layout-sc-nxg1ff-0.Bza-dv > div.Layout-sc-nxg1ff-0.fmvSLu > div:nth-child(1) > div > div > div:nth-child(1) > button')
  //clica dropdown:
  await page.click('#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div > div > div > div.Layout-sc-nxg1ff-0.jLsLts.directory-game-clips-page__filters > div.Layout-sc-nxg1ff-0.Bza-dv > div.Layout-sc-nxg1ff-0.fmvSLu > div:nth-child(1) > div > div > div:nth-child(1) > button')
  
  //espera pt-br:
  await page.waitForSelector('#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div > div > div > div.Layout-sc-nxg1ff-0.jLsLts.directory-game-clips-page_filters > div.Layout-sc-nxg1ff-0.Bza-dv > div.Layout-sc-nxg1ff-0.fmvSLu > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div > div.language-select-menu_balloon > div > div.simplebar-scroll-content > div > div > div:nth-child(1)')
  //clica pt-br:
  await page.click('#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div > div > div > div.Layout-sc-nxg1ff-0.jLsLts.directory-game-clips-page_filters > div.Layout-sc-nxg1ff-0.Bza-dv > div.Layout-sc-nxg1ff-0.fmvSLu > div:nth-child(1) > div > div > div:nth-child(2) > div > div > div > div.language-select-menu_balloon > div > div.simplebar-scroll-content > div > div > div:nth-child(1)')
  urlVideos = []
  videoTitle = []
    for(i = 1; i<=20; i++){
        console.log(`Clicando no video de numero ${i}...`)
        //espera primeiro video:
        await page.waitForTimeout(1200)
        await page.waitForSelector(`#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div > div > div > div.Layout-sc-nxg1ff-0.dKDtCW > div.Layout-sc-nxg1ff-0.hUEwpv > div > div > div > div:nth-child(${i}) > article > div.Layout-sc-nxg1ff-0.kMJwbg > div > div.ScTextWrapper-sc-14f6evl-1.iBqVGm > div:nth-child(1) > div > a > div > h3`)
        
        //clica primeiro video:
        await page.click(`#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div > div > div > div.Layout-sc-nxg1ff-0.dKDtCW > div.Layout-sc-nxg1ff-0.hUEwpv > div > div > div > div:nth-child(${i}) > article > div.Layout-sc-nxg1ff-0.kMJwbg > div > div.ScTextWrapper-sc-14f6evl-1.iBqVGm > div:nth-child(1) > div > a > div > h3`)
        console.log(`Cliquei no video de numero ${i}!`)
        
        // espera link do video carregar
        await page.waitForTimeout(1200)
        await page.waitForSelector('#root > div>div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.InjectLayout-sc-588ddc-0.persistent-player > div > div.Layout-sc-nxg1ff-0.video-player > div > div > video')
        //pega link de download do clipe
        await page.waitForTimeout(4000)
        var fonte = await page.evaluate(() => {
          return {
            link: Array.from(document.querySelectorAll('#root > div>div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.InjectLayout-sc-588ddc-0.persistent-player > div > div.Layout-sc-nxg1ff-0.video-player > div > div > video'))
            [0].currentSrc,
            title: document.evaluate(
                '//*[@id="root"]/div/div[2]/div[1]/main/div[2]/div[3]/div/div/div[1]/div[1]/div[2]/div/div[1]/div/div[1]/div[1]/h2', 
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent
            }
        })
        urlVideos.push(fonte.link)
        videoTitle.push(fonte.title)
        await page.waitForTimeout(1200)
        await page.goBack()
      }
    for(i = 0; i<=19; i++){
      console.log(urlVideos[i])
      console.log(videoTitle[i])
    }
    page.close()
})();