const {chromium}=require('playwright');
const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 const routes={home:'index',journey:'how-it-works',registration:'business-registration',compliance:'managed-compliance',pricing:'pricing',about:'about',resources:'resources',faq:'faq',contact:'contact'};
 page.on('pageerror',e=>console.log('Page error:',e.message));
 for(const kind of process.argv.slice(2).length?process.argv.slice(2):['home','journey','registration','compliance','pricing','about','resources','faq','contact']){
  for(const mobile of [false,true]){
   await page.setViewportSize({width:mobile?390:1440,height:mobile?844:1000});
   await page.goto(`http://127.0.0.1:3080/${routes[kind]}.html?render=1`,{waitUntil:'networkidle'});
   await page.waitForFunction(()=>document.querySelector('[data-ready=true]'),{timeout:30000});
   const value=await page.evaluate(kind=>{const s=window.__lumaScenes.get(kind);s.reset();return s.renderer.domElement.toDataURL('image/webp',.92);},kind);
   fs.writeFileSync(path.join(ROOT,`assets/images/sculpture-${kind}${mobile?'-mobile':''}.webp`),Buffer.from(value.split(',')[1],'base64'));
  }
  console.log('Rendered',kind);
 }
 await page.goto('http://127.0.0.1:3080/docs/redesign-planning/scene-lab.html?render=1&kind=home',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>window.__lumaScenes?.has('home'));
 const story=await page.evaluate(()=>{const s=window.__lumaScenes.get('home');s.setStoryProgress(1,true);return s.renderer.domElement.toDataURL('image/webp',.92);});
 fs.writeFileSync(path.join(ROOT,'assets/images/sculpture-story.webp'),Buffer.from(story.split(',')[1],'base64'));
 await browser.close();
})();
