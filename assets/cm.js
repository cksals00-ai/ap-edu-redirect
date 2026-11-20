/* CourtMate — public read via Supabase views, anonymous submit (pending only). The publishable key is public by design. */
window.CM=(function(){
  const URL='https://cgijpcimixaregbpvqbf.supabase.co/rest/v1/';
  const KEY='sb_publishable_68JEef0wu8PIRAF9wXvuvQ_7jyd1zzv';
  const H={apikey:KEY,Authorization:'Bearer '+KEY};
  async function get(view,q){const r=await fetch(URL+view+'?'+q,{headers:H});if(!r.ok)throw new Error('load '+r.status);return r.json();}
  async function post(table,row){const r=await fetch(URL+table,{method:'POST',headers:Object.assign({'Content-Type':'application/json',Prefer:'return=minimal'},H),body:JSON.stringify(row)});if(!r.ok){let t='';try{t=(await r.json()).message||''}catch(e){}throw new Error(t||('submit '+r.status));}return true;}
  async function rpc(fn,args){const r=await fetch(URL+'rpc/'+fn,{method:'POST',headers:Object.assign({'Content-Type':'application/json'},H),body:JSON.stringify(args)});if(!r.ok)throw new Error('rpc '+r.status);return r.json();}
  const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const CAT={club:'클럽 고르기',cost:'비용·시간',tournament:'대회',position:'포지션·체격',injury:'부상·성장',gear:'용품',school:'진학',other:'기타'};
  const PCAT={news:'대회·소식',training:'훈련',food:'음식·영양',school:'학교·진학',gear:'용품',free:'자유'};
  const LV={pro:'프로',college:'대학',national:'국가대표',retired:'은퇴'};
  const d=s=>{if(!s)return '';if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s.replace(/-/g,'.');const x=new Date(new Date(s).getTime()+9*36e5);return x.getUTCFullYear()+'.'+String(x.getUTCMonth()+1).padStart(2,'0')+'.'+String(x.getUTCDate()).padStart(2,'0');};
  const dr=(a,b)=>b&&b!==a?d(a)+' – '+d(b):d(a);
  const qp=k=>new URLSearchParams(location.search).get(k)||'';
  const link=s=>E(s).replace(/(https?:\/\/[^\s<)]+)/g,u=>'<a href="'+u+'" target="_blank" rel="noopener noreferrer">'+u.replace(/^https?:\/\//,'')+'</a>');
  const num=p=>{const m=/등번호 (\d+)/.exec(p.career||'');return m?m[1]:'';};
  const MON=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const stub=(s,past)=>{if(!s)return '';const x=new Date(s);return '<div class="stub'+(past?' past':'')+'"><b>'+x.getDate()+'</b><span>'+MON[x.getMonth()]+'</span></div>';};
  function clubItem(c){const kv=[];if(c.age_range)kv.push('<span><b>연령</b> '+E(c.age_range)+'</span>');if(c.days)kv.push('<span><b>요일</b> '+E(c.days)+'</span>');if(c.fee_range)kv.push('<span><b>회비</b> '+E(c.fee_range)+'</span>');if(c.level)kv.push('<span><b>레벨</b> '+E(c.level)+'</span>');if(c.trial!=null)kv.push('<span><b>체험</b> '+(c.trial?'가능':'없음')+'</span>');
    return '<article class="item"><h3>'+(c.premium?'<span class="badge or">프리미엄</span>':'')+E(c.name)+'</h3><div class="meta">'+E(c.region)+(c.district?' · '+E(c.district):'')+(c.address?' · '+E(c.address):'')+'</div>'+(c.description?'<p>'+E(c.description)+'</p>':'')+(kv.length?'<div class="kv">'+kv.join('')+'</div>':'')+(c.website?'<p><a href="'+E(c.website)+'" target="_blank" rel="noopener noreferrer">홈페이지 ↗</a></p>':'')+bar('club',c.id,c.name,{fix:1})+'</article>';}
  function eventItem(e,past){return '<article class="item item--ev">'+stub(e.start_date,past)+'<div class="body"><h3>'+(past?'<span class="badge gray">지난 대회</span>':'<span class="badge">예정</span>')+E(e.title)+'</h3><div class="meta">'+dr(e.start_date,e.end_date)+(e.region?' · '+E(e.region):'')+(e.venue?' · '+E(e.venue):'')+(e.organizer?' · 주최 '+E(e.organizer):'')+'</div>'+(e.age_groups?'<div class="kv"><span><b>대상</b> '+E(e.age_groups)+'</span></div>':'')+(e.description?'<p>'+E(e.description)+'</p>':'')+(e.url?'<p><a href="'+E(e.url)+'" target="_blank" rel="noopener noreferrer">공식 안내 ↗</a></p>':'')+bar('event',e.id,e.title,past?{k:['been','cheer'],fix:1,rev:1}:{k:['going','cheer'],fix:1})+'</div></article>';}
  function qaItem(q){return '<details class="qa"><summary><div><div class="q">'+E(q.title)+'</div><div class="m"><span class="badge">'+E(CAT[q.category]||q.category)+'</span>'+(q.nickname?E(q.nickname)+' · ':'')+d(q.created_at)+(q.answer?' · 답변 완료':' · 답변 준비 중')+'</div></div></summary><div class="a"><div class="body">'+E(q.body)+'</div>'+(q.answer?'<div class="ans">'+E(q.answer)+'</div><div class="src">답변: '+E(q.answered_by||'코트메이트 운영팀')+(q.answer_sources?' · 근거: '+E(q.answer_sources):'')+' · 일반 안내이며 진단·추천이 아닙니다.</div>':'<div class="src">운영팀이 확인 후 답을 달고 있습니다.</div>')+'</div></details>';}
  function postItem(p){return '<a class="post" href="/board/?id='+p.id+'"><span class="badge'+(p.is_staff?'':' gray')+'">'+E(PCAT[p.category]||p.category)+'</span>'+(p.pinned?'<span class="badge or">고정</span>':'')+'<h3>'+E(p.title)+'</h3><p class="ex">'+E(p.body)+'</p><div class="meta">'+E(p.nickname||'학부모')+' · '+d(p.created_at)+(p.source?' · 출처 '+E(p.source):'')+'</div></a>';}
  function postLi(p){return '<li><a href="/board/?id='+p.id+'">'+E(p.title)+'<small>'+E(p.nickname||'학부모')+' · '+d(p.created_at)+'</small></a></li>';}
  function schoolCard(s){return '<a class="ent" href="/schools/?id='+s.id+'"><h3><span class="lv">'+E(s.level)+'</span>'+E(s.name)+'</h3><div class="meta">'+E(s.region||'')+(s.district?' · '+E(s.district):'')+' · 출신 선수 '+(s.player_count||0)+'명</div></a>';}
  function playerCard(p){const sc=(p.schools||[]).map(s=>s.school_name.replace(/(등학교|학교)$/,'')).join('–');const n=num(p);return '<a class="ent ent--pl" href="/players/?id='+p.id+'">'+(n?'<span class="jersey">'+n+'</span>':'')+'<h3><span class="lv">'+E(LV[p.level]||p.level)+'</span>'+E(p.name)+'</h3><div class="meta">'+E(p.current_team||'')+(p.position?' · '+E(p.position):'')+(p.birth_year?' · '+p.birth_year+'년생':'')+'</div>'+(sc?'<div class="meta">'+E(sc)+'</div>':'')+'</a>';}
  function menu(){const td=document.getElementById('topdate');if(td){const n=new Date();td.textContent=n.getFullYear()+'.'+String(n.getMonth()+1).padStart(2,'0')+'.'+String(n.getDate()).padStart(2,'0')+' '+['SUN','MON','TUE','WED','THU','FRI','SAT'][n.getDay()]+' · 회원가입 없음 · 아동 개인정보 미수집';}
    const cur=document.querySelector('.mnav a[aria-current]');if(cur)cur.scrollIntoView({inline:'center',block:'nearest'});
    document.querySelectorAll('form.sf').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const q=f.querySelector('input').value.trim();if(q)location.href='/search/?q='+encodeURIComponent(q);}));}
  async function banners(el){try{const b=await get('cm_banners_public','select=*&order=sort.asc');if(!b.length){el.remove();return;}
    el.innerHTML='<div class="slides">'+b.map(x=>'<a class="slide '+E(x.theme||'green')+'" href="'+E(x.url||'#')+'"'+(/^https?:/.test(x.url||'')?' target="_blank" rel="noopener noreferrer"':'')+'>'+(x.emoji?'<span class="em" aria-hidden="true">'+E(x.emoji)+'</span>':'')+'<div><b>'+E(x.title)+'</b><span>'+E(x.subtitle||'')+'</span></div></a>').join('')+'</div><div class="dots">'+b.map((x,i)=>'<button aria-label="배너 '+(i+1)+'"'+(i===0?' aria-current="true"':'')+'></button>').join('')+'</div>';
    let i=0;const sl=el.querySelector('.slides'),dots=[...el.querySelectorAll('.dots button')];const go=n=>{i=(n+b.length)%b.length;sl.style.transform='translateX(-'+(i*100)+'%)';dots.forEach((d,k)=>k===i?d.setAttribute('aria-current','true'):d.removeAttribute('aria-current'));};
    dots.forEach((d,k)=>d.addEventListener('click',()=>go(k)));let t=setInterval(()=>go(i+1),5500);el.addEventListener('mouseenter',()=>clearInterval(t));el.addEventListener('mouseleave',()=>{t=setInterval(()=>go(i+1),5500)});
    let sx=0;el.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});el.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));},{passive:true});}catch(e){el.remove();}}
  /* ── 저마찰 참여(2026-11-20): 한 번 탭 반응 · 정보 수정 제안 · 후기 한 줄. 가입 없음, 개인정보 미수집 ── */
  const RX={going:['🙋','참가해요'],cheer:['📣','응원해요'],been:['✅','가봤어요'],helpful:['👍','도움이 됐어요']};
  const LS={g(k){try{return localStorage.getItem(k)}catch(e){return null}},s(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
  function cid(){let c=LS.g('cm_cid');if(!c){c='c'+Math.random().toString(36).slice(2)+Date.now().toString(36);LS.s('cm_cid',c);}return c;}
  function bar(t,id,title,o){o=o||{};return '<div class="cmx" data-t="'+t+'" data-id="'+E(id)+'" data-title="'+E(title||'')+'" data-k="'+(o.k||[]).join(',')+'"'+(o.fix?' data-fix="1"':'')+(o.rev?' data-rev="1"':'')+'></div>';}
  async function rawPost(table,row){const r=await fetch(URL+table,{method:'POST',headers:Object.assign({'Content-Type':'application/json',Prefer:'return=minimal'},H),body:JSON.stringify(row)});return r.status;}
  let pend=false;
  function scan(){if(pend)return;pend=true;setTimeout(hydrate,60);}
  async function hydrate(){pend=false;const els=[...document.querySelectorAll('.cmx:not([data-ok])')];if(!els.length)return;els.forEach(el=>el.setAttribute('data-ok','1'));
    const ids=[...new Set(els.filter(el=>el.dataset.k).map(el=>el.dataset.id))];let cnt={};
    if(ids.length){try{const rows=await get('cm_reaction_counts_public','select=*&target_id=in.('+ids.map(encodeURIComponent).join(',')+')');rows.forEach(r=>cnt[r.target_type+':'+r.target_id+':'+r.kind]=r.n);}catch(e){}}
    els.forEach(el=>render(el,cnt));}
  function render(el,cnt){const t=el.dataset.t,id=el.dataset.id,ks=el.dataset.k?el.dataset.k.split(','):[];let h='';
    ks.forEach(k=>{const key=t+':'+id+':'+k,on=LS.g('cmx:'+key)==='1',n=cnt[key]||0;h+='<button type="button" class="rx'+(on?' on':'')+'" data-kind="'+k+'" aria-pressed="'+on+'">'+RX[k][0]+' '+RX[k][1]+(n?' <b>'+n+'</b>':'')+'</button>';});
    if(el.dataset.rev)h+='<button type="button" class="rx rx--txt" data-act="rev">후기 한 줄</button>';
    if(el.dataset.fix)h+='<button type="button" class="rx rx--txt" data-act="fix">정보가 틀렸어요·추가해요</button>';
    el.innerHTML='<div class="rxrow">'+h+'</div><div class="rxform" hidden></div>';}
  function pick(name,label,opts){return '<fieldset class="rxq"><legend>'+label+'</legend>'+opts.map((o,i)=>'<label><input type="radio" name="'+name+'" value="'+o+'"> '+o+'</label>').join('')+'</fieldset>';}
  function openForm(el,act){const f=el.querySelector('.rxform');if(!f.hidden&&f.dataset.act===act){f.hidden=true;return;}f.dataset.act=act;f.hidden=false;
    if(act==='fix'){f.innerHTML='<form><fieldset class="rxq"><legend>어떤 내용인가요?</legend><label><input type="radio" name="kind" value="correction" checked> 틀린 정보 고치기</label><label><input type="radio" name="kind" value="addition"> 빠진 정보 추가</label></fieldset><textarea name="body" maxlength="1000" rows="3" required placeholder="예) 수업 요일이 화·목으로 바뀌었어요 / 체험 수업 가능해요"></textarea><input name="contact" maxlength="120" placeholder="답을 받을 연락처(선택)"><p class="rxnote">아이 이름·사진·학교는 적지 말아 주세요. 운영팀이 확인 후 반영해요.</p><button class="btn btn--sm">보내기</button><span class="rxmsg" role="status"></span></form>';}
    else{f.innerHTML='<form>'+pick('parking','주차는?',['쉬워요','보통','어려워요'])+pick('run','대회 운영은?',['원활','보통','아쉬움'])+pick('rec','다른 학부모에게?',['추천','보통','비추천'])+'<input name="line" maxlength="100" placeholder="한 줄 더(선택) 예) 2층 관람석이 따뜻했어요"><p class="rxnote">아이 이름·성적은 적지 말아 주세요. 운영팀 확인 후 모아서 보여드려요.</p><button class="btn btn--sm">보내기</button><span class="rxmsg" role="status"></span></form>';}
    f.querySelector('form').addEventListener('submit',async ev=>{ev.preventDefault();const fm=ev.target,fd=new FormData(fm),msg=fm.querySelector('.rxmsg'),btn=fm.querySelector('button');btn.disabled=true;
      const row={target_type:el.dataset.t,target_id:el.dataset.id,target_title:(el.dataset.title||'').slice(0,200),page_url:location.pathname+location.search};
      if(act==='fix'){row.kind=fd.get('kind');row.body=String(fd.get('body')||'').trim();row.contact=String(fd.get('contact')||'').trim()||null;if(row.body.length<2){msg.textContent='내용을 적어 주세요.';btn.disabled=false;return;}}
      else{const rv={parking:fd.get('parking'),run:fd.get('run'),rec:fd.get('rec')};if(!rv.parking&&!rv.run&&!rv.rec&&!fd.get('line')){msg.textContent='하나 이상 골라 주세요.';btn.disabled=false;return;}row.kind='review';row.review=rv;row.body=String(fd.get('line')||'').trim()||null;}
      const s=await rawPost('cm_feedback',row).catch(()=>0);
      if(s>=200&&s<300){fm.innerHTML='<p class="rxdone">고마워요! 운영팀이 확인하고 반영할게요.</p>';}else{msg.textContent='잠시 후 다시 시도해 주세요.';btn.disabled=false;}});}
  document.addEventListener('click',async ev=>{const b=ev.target.closest('.cmx .rx');if(!b)return;const el=b.closest('.cmx');
    if(b.dataset.act){openForm(el,b.dataset.act);return;}
    const k=b.dataset.kind,key=el.dataset.t+':'+el.dataset.id+':'+k;if(LS.g('cmx:'+key)==='1'||b.disabled)return;b.disabled=true;
    const s=await rawPost('cm_reactions',{target_type:el.dataset.t,target_id:el.dataset.id,kind:k,client_id:cid()}).catch(()=>0);
    if((s>=200&&s<300)||s===409){LS.s('cmx:'+key,'1');b.classList.add('on');b.setAttribute('aria-pressed','true');if(s!==409){const n=b.querySelector('b');if(n)n.textContent=+n.textContent+1;else b.insertAdjacentHTML('beforeend',' <b>1</b>');}}
    b.disabled=false;});
  new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',scan);
  document.addEventListener('DOMContentLoaded',menu);
  return {get,post,rpc,E,CAT,PCAT,LV,d,dr,qp,link,num,stub,clubItem,eventItem,qaItem,postItem,postLi,schoolCard,playerCard,banners,bar};
})();
