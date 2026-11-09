/* LUMA: accessible navigation, purposeful motion and honest local-only enquiry. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  let sceneRequested=false;
  function loadScenes(){
    if(sceneRequested||reduce.matches||navigator.connection?.saveData)return;
    sceneRequested=true;
    const poster=$('.scene-poster');
    Promise.all([document.fonts.ready,poster?.decode().catch(()=>{})]).then(()=>{
      const enhance=()=>{if(reduce.matches){sceneRequested=false;return;}import(new URL('js/scenes.js',document.baseURI)).catch(()=>{sceneRequested=false;});};
      if('requestIdleCallback' in window)requestIdleCallback(enhance,{timeout:1800});else requestAnimationFrame(enhance);
    });
  }
  loadScenes();reduce.addEventListener('change',e=>{if(!e.matches)loadScenes();});

  const services=$('[data-services]'), servicesMenu=$('#services-menu');
  const closeServices=()=>{if(!services)return;services.setAttribute('aria-expanded','false');servicesMenu.hidden=true;};
  services?.addEventListener('click',()=>{const expanded=services.getAttribute('aria-expanded')==='true';services.setAttribute('aria-expanded',String(!expanded));servicesMenu.hidden=expanded;});
  document.addEventListener('click',e=>{if(services&&!e.target.closest('.nav-dropdown'))closeServices();});
  document.addEventListener('focusin',e=>{if(services&&!e.target.closest('.nav-dropdown'))closeServices();});
  const toggle=$('.menu-toggle'),menu=$('#mobile-menu');
  function setMenu(open){
    if(!toggle)return;menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    document.body.classList.toggle('menu-open',open);$('main').inert=open;$('footer').inert=open;
    if(open)$('a',menu).focus();else toggle.focus();
  }
  toggle?.addEventListener('click',()=>setMenu(menu.hidden));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){if(menu&&!menu.hidden){setMenu(false);e.preventDefault();}if(servicesMenu&&!servicesMenu.hidden){closeServices();services.focus();}}
    if(e.key==='Tab'&&menu&&!menu.hidden){const elements=[toggle,...$$('a',menu)],first=elements[0],last=elements.at(-1);if(e.shiftKey&&document.activeElement===first){last.focus();e.preventDefault();}else if(!e.shiftKey&&document.activeElement===last){first.focus();e.preventDefault();}}
  });
  matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches&&menu&&!menu.hidden){setMenu(false);$('.brand').focus();}});

  // Selected once-only reveals; content is visible if enhancement fails.
  let motion;
  function setupMotion(){
    motion?.revert();
    if(!window.gsap||!window.ScrollTrigger||reduce.matches||new URLSearchParams(location.search).has('render'))return;
    gsap.registerPlugin(ScrollTrigger);
    motion=gsap.context(()=>{
      const headline=$('h1');
      if(headline){
        if(!headline.querySelector('.type-line'))headline.innerHTML=headline.innerHTML.split(/<br\s*\/?\s*>/i).map(line=>`<span class="type-line"><span class="type-word">${line}</span></span>`).join(' ');
        gsap.from($$('.type-word',headline),{yPercent:innerWidth<700?10:30,opacity:.6,duration:innerWidth<700?.4:.8,stagger:.07,ease:'power3.out',clearProps:'transform,opacity'});
      }
      $$('.service-panel,.journey-step,.fact,.fee-block').forEach(el=>gsap.from(el,{y:22,opacity:.6,duration:.7,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
      const home=$('.hero-home');
      if(home)ScrollTrigger.create({trigger:home,start:'top top',end:'bottom top',onUpdate:self=>window.__lumaScenes?.get('home')?.setProgress(self.progress)});
      const steps=$$('.journey-step');
      if(steps.length)steps.forEach((el,i)=>ScrollTrigger.create({trigger:el,start:'top 70%',end:'bottom 30%',onEnter:()=>window.__lumaScenes?.get('journey')?.setProgress(i/(steps.length-1)),onEnterBack:()=>window.__lumaScenes?.get('journey')?.setProgress(i/(steps.length-1))}));
    });
  }
  setupMotion();reduce.addEventListener('change',setupMotion);

  // Reuse the hero's renderer for the signature chapter; never create a second canvas.
  let storyTrigger,storyObserver,storyBound=false;
  function setupStory(){
    const chapter=$('.fold-story'),mount=$('.story-mount'),origin=$('.home-sculpture');
    const state=window.__lumaScenes?.get('home');
    if(!chapter||!state||storyBound||reduce.matches||!window.ScrollTrigger)return;
    storyBound=true;
    const buttons=$$('[data-story-step]');const controls=new AbortController();
    const placeholder=document.createElement('img');placeholder.src='assets/images/sculpture-home.webp';placeholder.alt='';placeholder.className='home-still';placeholder.width=960;placeholder.height=800;
    function enter(){if(state.element.parentElement!==mount){origin.prepend(placeholder);mount.append(state.element);mount.classList.add('is-live');state.setMode('story');}}
    function leave(){if(state.element.parentElement===mount){origin.prepend(state.element);placeholder.remove();mount.classList.remove('is-live');state.setMode('hero');}}
    function update(value){state.setStoryProgress(value);const active=value<.28?0:value<.76?1:2;buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));}
    buttons.forEach(button=>button.addEventListener('click',()=>{enter();update(Number(button.dataset.storyStep));},{signal:controls.signal}));
    const mq=gsap.matchMedia();
    mq.add('(min-width:701px)',()=>{storyTrigger=ScrollTrigger.create({trigger:chapter,start:'top 10%',end:'bottom 90%',onEnter:enter,onEnterBack:enter,onLeaveBack:leave,onUpdate:self=>{if(self.progress>0){enter();update(self.progress);}}});return()=>{storyTrigger?.kill();leave();};});
    mq.add('(max-width:700px)',()=>{storyObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)enter();else if(chapter.getBoundingClientRect().top>innerHeight)leave();}),{threshold:.2});storyObserver.observe(chapter);return()=>{storyObserver.disconnect();leave();};});
    reduce.addEventListener('change',e=>{if(e.matches){controls.abort();mq.revert();leave();storyBound=false;}},{once:true});
  }
  window.addEventListener('luma:scene-ready',setupStory);setupStory();
  reduce.addEventListener('change',()=>requestAnimationFrame(setupStory));
  $$('[data-story-step]').forEach(button=>button.addEventListener('click',()=>{
    if(!reduce.matches&&window.__lumaScenes?.has('home'))return;
    const value=Number(button.dataset.storyStep);$$('[data-story-step]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    const image=$('.story-fallback');if(image){image.src=`assets/images/sculpture-${value===0?'home':value===.5?'registration':'story'}.webp`;image.alt=value===0?'The folded LUMA sculpture':value===.5?'Document folio representing business registration':'Registration and ongoing compliance, brought together';}
  }));

  // Ambient autoplay video loops with no start or pause buttons.
  const films=$$('video[data-film]');
  const playFilm=video=>{
    if(!video.src&&video.dataset.src)video.src=video.dataset.src;
    video.muted=true;
    video.loop=true;
    const playPromise=video.play();
    if(playPromise&&typeof playPromise.catch==='function'){
      playPromise.catch(()=>{
        const resumeOnGesture=()=>{video.play().catch(()=>{});};
        window.addEventListener('pointerdown',resumeOnGesture,{once:true,passive:true});
        window.addEventListener('scroll',resumeOnGesture,{once:true,passive:true});
        window.addEventListener('keydown',resumeOnGesture,{once:true,passive:true});
      });
    }
  };
  const filmObserver=new IntersectionObserver(entries=>entries.forEach(({target:video,isIntersecting})=>{
    if(isIntersecting)playFilm(video);else video.pause();
  }),{threshold:0.1});
  films.forEach(video=>{
    video.muted=true;
    video.loop=true;
    video.playsInline=true;
    filmObserver.observe(video);
    playFilm(video);
  });
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)films.forEach(v=>v.pause());
    else films.forEach(v=>{const r=v.getBoundingClientRect();if(r.top<window.innerHeight&&r.bottom>0)playFilm(v);});
  });

  // Shared keyboard tabs, including the calendar and journey demonstrator.
  $$('[role=tablist]').forEach(list=>{
    const tabs=$$('[role=tab]',list);
    function activate(tab){tabs.forEach(t=>{const on=t===tab;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;const panel=document.getElementById(t.getAttribute('aria-controls'));if(panel)panel.hidden=!on;});if(tab.dataset.period){window.__lumaScenes?.get('compliance')?.setProgress(tab.dataset.period==='annual'?.8:0);}}
    tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=tabs[(i+1)%tabs.length];if(e.key==='ArrowLeft')next=tabs[(i-1+tabs.length)%tabs.length];if(e.key==='Home')next=tabs[0];if(e.key==='End')next=tabs.at(-1);if(next){e.preventDefault();activate(next);next.focus();}});});
  });

  const diagnostic=$('#structure-diagnostic');
  $$('[data-route-step]').forEach(link=>{const select=()=>window.__lumaScenes?.get('journey')?.setProgress(Number(link.dataset.routeStep));link.addEventListener('pointerenter',select);link.addEventListener('focus',select);});
  if(diagnostic){
    const partners=$('#calcPartners'),liability=$('#calcLiability'),result=$('#calcResult');
    function update(){const plural=partners.value==='multiple',limited=liability.value==='limited';const title=plural?'Explore a SARL':limited?'Explore a single-member SARL':'Explore an individual business';const copy=plural?'A company structure can organise shared ownership and responsibilities. Discuss the ownership arrangements, governance and applicable requirements with a qualified adviser.':limited?'A single-member company may suit a founder seeking a distinct company structure. Confirm the legal, capital and practical requirements for your situation.':'An individual business may suit a sole operator seeking a simpler starting structure. Consider the personal liability and administrative implications before choosing.';$('[data-result-title]',result).textContent=title;$('[data-result-copy]',result).textContent=copy;
      const people=(plural?[24,63,102]:[62]).map(x=>`<circle cx="${x}" cy="24" r="7" fill="currentColor"/><path d="M${x-13} 54v-7c0-15 26-15 26 0v7" fill="none" stroke="currentColor" stroke-width="1.5"/>`).join('');
      const label=plural?'Shared company':limited?'Separate company':'Individual activity';
      $('#ownership-diagram').innerHTML=`<svg viewBox="0 0 340 95" role="img" aria-label="${plural?'Multiple founders': 'One founder'} connected to ${label.toLowerCase()}">${people}<path d="M135 40h35m-7-6 7 6-7 6" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="185" y="9" width="145" height="61" rx="${limited||plural?3:25}" fill="none" stroke="currentColor" stroke-width="1.2"/><text x="257" y="44" text-anchor="middle" fill="currentColor" font-size="12">${label}</text><text x="62" y="83" text-anchor="middle" fill="currentColor" font-size="10">${plural?'Founders':'Founder'}</text></svg>`;
      window.__lumaScenes?.get('registration')?.setProgress(plural?1:limited?.5:0);}
    partners.addEventListener('change',update);liability.addEventListener('change',update);update();
  }
  const checkpoints={records:['Gather the right records.','Bring together the business information needed for the agreed work. Confirm what your team and advisers need to provide.'],coordinate:['Coordinate the agreed work.','Review the prepared information, obtain the approvals needed and follow up on the agreed submissions.'],evidence:['Keep the handover together.','Organise the available receipts, confirmations and documents, with any outstanding steps clearly recorded.']};
  $$('[data-checkpoint]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.checkpoint;$$('[data-checkpoint]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$('[data-checkpoint-title]').textContent=checkpoints[key][0];$('[data-checkpoint-copy]').textContent=checkpoints[key][1];$$('[data-handover]').forEach(el=>el.classList.toggle('selected',el.dataset.handover===key));}));

  const billing=$$('[data-billing]');
  billing.forEach(button=>button.addEventListener('click',()=>{billing.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$$('[data-cycle-note]').forEach(note=>note.textContent=button.dataset.billing==='annual'?'Scope and fees agreed for the year.':'Scope and fees agreed for recurring support.');}));

  // Search and category filters keep navigable articles/answers in real HTML.
  const search=$('[data-search]'), filters=$$('[data-filter]');
  const searchable=$$('.resource-item,[data-faq]');let category=new URLSearchParams(location.search).get('category')||'All';
  function filterItems(){
    if(!searchable.length)return;const q=(search?.value||'').toLocaleLowerCase().trim();let count=0;
    searchable.forEach(item=>{const show=(category==='All'||item.dataset.category===category)&&item.textContent.toLocaleLowerCase().includes(q);item.hidden=!show;if(show)count++;});
    filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));const status=$('[data-search-status]');if(status)status.textContent=count?`${count} ${document.body.dataset.page==='faq'?'answers':'guides'} to explore.`:'No matches. Try another search or category.';
  }
  search?.addEventListener('input',filterItems);
  filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;const u=new URL(location.href);if(category==='All')u.searchParams.delete('category');else u.searchParams.set('category',category);history.replaceState(null,'',u);filterItems();}));
  if(searchable.length){if(!filters.some(b=>b.dataset.filter===category))category='All';filterItems();}

  const dialog=$('#resource-dialog');
  if(dialog){
    let opener;
    document.documentElement.classList.add('has-dialog');
    $$('[data-article]').forEach(a=>a.addEventListener('click',event=>{const content=document.getElementById(a.dataset.article)?.querySelector('.article-body');if(!content||!dialog.showModal)return;event.preventDefault();opener=a;$('.dialog-inner',dialog).replaceChildren(...[...content.childNodes].map(node=>node.cloneNode(true)));const title=$('h2',dialog);title.id='dialog-article-title';dialog.showModal();$('.dialog-close',dialog).focus();}));
    $('.dialog-close',dialog).addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>opener?.focus());
  }

  const form=$('#enquiry-form');
  if(form){
    $('button[type=submit]',form).disabled=false;
    const required=$$('[required]',form);const result=$('#form-result');let downloadURL;
    const service=$('#service');const serviceFromURL=new URLSearchParams(location.search).get('service')||new URLSearchParams(location.search).get('package');if([...service.options].some(o=>o.value===serviceFromURL))service.value=serviceFromURL;
    const progress=()=>{$('#form-progress').textContent=`${required.filter(f=>f.value.trim()&&f.validity.valid).length} of ${required.length} essentials`;};
    form.addEventListener('input',e=>{progress();result.hidden=true;if(downloadURL){URL.revokeObjectURL(downloadURL);downloadURL=undefined;}if(e.target.hasAttribute('aria-invalid')){e.target.removeAttribute('aria-invalid');const err=document.getElementById(e.target.id+'-error');if(err)err.hidden=true;}});
    form.addEventListener('change',progress);progress();
    form.addEventListener('submit',event=>{
      event.preventDefault();let first;
      required.forEach(field=>{const invalid=!field.value.trim()||!field.validity.valid;field.setAttribute('aria-invalid',String(invalid));const err=document.getElementById(field.id+'-error');if(err){err.hidden=!invalid;field.setAttribute('aria-describedby',err.id);}if(invalid&&!first)first=field;});
      if(first){first.focus();return;}
      const data=new FormData(form);const brief=['LUMA — Enquiry brief','Prepared locally. Not submitted to LUMA.','',...['name','email','phone','location','service','message'].map(key=>`${key.charAt(0).toUpperCase()+key.slice(1)}: ${data.get(key)||'Not provided'}`)].join('\r\n');
      if(downloadURL)URL.revokeObjectURL(downloadURL);downloadURL=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'}));$('#download-enquiry').href=downloadURL;result.hidden=false;result.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'nearest'});
    });
  }
  window.addEventListener('pagehide',event=>{films.forEach(v=>v.pause());if(!event.persisted){motion?.revert();filmObserver.disconnect();} });
  window.addEventListener('pageshow',event=>{if(event.persisted)window.ScrollTrigger?.refresh();});
})();
