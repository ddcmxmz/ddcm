// const puppeteer = require('puppeteer')
// const config = require('../../config')
//
// puppeteer.launch({headless: false}).then(async browser => {
//   const page = await browser.newPage()
//   page.setViewport({width: 1200, height: 600})
//
//   try {
//     await page.goto(`http://${config.dev.host}:${config.dev.port}/#/login`)
//
//     await page.waitFor(1000);
//     await page.type('.el-input__inner', '王柳12345', {delay: 20})
//
//     await page.waitFor(1000);
//     await page.type('[placeholder=请输入密码]', '123456', {delay: 20})
//
//     await page.waitFor(1000);
//     await page.click('.el-button--medium');
//     await page.setRequestInterception(true);
//     page.on('requestfailed', request => {
//       console.log(request);
//     });
//     await page.click('.side_trgger');
//
//     await page.waitFor(2000);
//
//     await page.click('.side_trgger');
//
//     await page.waitFor(2000);
//
//     await page.click('.el-menu-main .el-menu-item a[href=#/ge/organ]')
//   } catch (e) {
//     console.log(e);
//   }
//   await page.waitFor(5000)
//   await page.close()
//   browser.close()
// });
