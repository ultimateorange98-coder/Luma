const {chromium}=require('playwright');
const fs=require('fs');const path=require('path');
(async()=>{
 const pages=process.argv.slice(2).length?process.argv.slice(2):['index','how-it-works','business-registration','managed-compliance','pricing','about','resources','faq','contact'];
 const out=path.resolve(__dirname,'../docs/redesign');fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:1000},deviceScaleFactor:1});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const name of pages){
   await page.goto(`http://127.0.0.1:3080/${name}.html`,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1300);
   await page.screenshot({path:path.join(out,`${name}-${width}.png`)});
   const height=await page.locator('body').evaluate(x=>x.scrollHeight);
   for(let y=0;y<height;y+=700){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(70);}
   await page.waitForTimeout(800);await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(600);
   await page.screenshot({path:path.join(out,`${name}-${width}-full.png`),fullPage:true});
   console.log(JSON.stringify({page:name,width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),scenes:await page.locator('[data-ready=true]').count(),errors}));
  }
  await page.close();
 }
 await browser.close();
})();
