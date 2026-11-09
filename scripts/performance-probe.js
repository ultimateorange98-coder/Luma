const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{
 const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 const result={date:'2026-11-07',conditions:'Local Windows host, headless Chrome. Mobile viewport is emulation, not a physical phone or mobile GPU.',profiles:[]};
 for(const profile of [{name:'Desktop',width:1440,height:1000,scale:1,throttle:false},{name:'Mobile / simulated constrained CPU and network',width:390,height:844,scale:2,throttle:true}]){
  const context=await b.newContext({viewport:{width:profile.width,height:profile.height},deviceScaleFactor:profile.scale});const p=await context.newPage();const cdp=await context.newCDPSession(p);
  await p.addInitScript(()=>{window.__perf={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries())window.__perf.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__perf.cls+=e.value;}).observe({type:'layout-shift',buffered:true});});
  if(profile.throttle){await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:75000,connectionType:'cellular4g'});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});}
  await p.goto('http://127.0.0.1:3080/',{waitUntil:'networkidle'});await p.waitForFunction(()=>window.__lumaScenes?.has('home'));await p.waitForTimeout(1500);
  const before=await p.evaluate(()=>({...window.__perf,transferBytes:performance.getEntriesByType('resource').reduce((n,r)=>n+r.transferSize,0)}));
  // Rendering sampling stays on the same host/GPU; it does not pretend to model a phone GPU.
  if(profile.throttle){await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});}
  const frames=await p.evaluate(async()=>{
   const s=window.__lumaScenes.get('home');s.pause(true);const samples=[];let start,last;
   await new Promise(resolve=>{function frame(t){if(!start){start=last=t;}else{samples.push(t-last);last=t;}s.object.rotation.y+=.002;s.render();if(t-start<2500)requestAnimationFrame(frame);else resolve();}requestAnimationFrame(frame);});
   const sorted=[...samples].sort((a,b)=>a-b);s.pause(false);
   return {sampleMs:2500,frames:samples.length,averageFPS:1000/(samples.reduce((a,b)=>a+b,0)/samples.length),p95FrameMs:sorted[Math.floor(sorted.length*.95)],drawCalls:s.renderer.info.render.calls,triangles:s.renderer.info.render.triangles,pixelRatio:s.renderer.getPixelRatio(),memoryCounts:s.renderer.info.memory};
  });
  await p.locator('.film-frame').scrollIntoViewIfNeeded();await p.waitForTimeout(1800);
  const scrollTransfer=await p.evaluate(()=>performance.getEntriesByType('resource').reduce((n,r)=>n+r.transferSize,0));
  result.profiles.push({profile,...before,rendering:frames,transferAfterFilmBytes:scrollTransfer});console.log(JSON.stringify(result.profiles.at(-1)));
  await context.close();
 }
 await b.close();fs.writeFileSync(path.resolve(__dirname,'../docs/redesign/performance.json'),JSON.stringify(result,null,2));
})();
