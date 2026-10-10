/* CourtMate — public read via Supabase views, anonymous submit (pending only). The publishable key is public by design. */
window.CM=(function(){
  const URL='https://cgijpcimixaregbpvqbf.supabase.co/rest/v1/';
  const KEY='sb_publishable_68JEef0wu8PIRAF9wXvuvQ_7jyd1zzv';
  const H={apikey:KEY,Authorization:'Bearer '+KEY};
  async function get(view,q){const r=await fetch(URL+view+'?'+q,{headers:H});if(!r.ok)throw new Error('load '+r.status);return r.json();}
  async function post(table,row){const r=await fetch(URL+table,{method:'POST',headers:Object.assign({'Content-Type':'application/json',Prefer:'return=minimal'},H),body:JSON.stringify(row)});if(!r.ok){let t='';try{t=(await r.json()).message||''}catch(e){}throw new Error(t||('submit '+r.status));}return true;}
  const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const CAT={club:'클럽 고르기',cost:'비용·시간',tournament:'대회',position:'포지션·체격',injury:'부상·성장',gear:'용품',school:'진학',other:'기타'};
  const d=s=>{if(!s)return '';const x=new Date(s);return x.getFullYear()+'.'+String(x.getMonth()+1).padStart(2,'0')+'.'+String(x.getDate()).padStart(2,'0');};
  const dr=(a,b)=>b&&b!==a?d(a)+' – '+d(b):d(a);
  function clubItem(c){const kv=[];if(c.age_range)kv.push('<span><b>연령</b> '+E(c.age_range)+'</span>');if(c.days)kv.push('<span><b>요일</b> '+E(c.days)+'</span>');if(c.fee_range)kv.push('<span><b>회비</b> '+E(c.fee_range)+'</span>');if(c.level)kv.push('<span><b>레벨</b> '+E(c.level)+'</span>');if(c.trial!=null)kv.push('<span><b>체험</b> '+(c.trial?'가능':'없음')+'</span>');
    return '<article class="item"><h3>'+(c.premium?'<span class="badge or">프리미엄</span>':'')+E(c.name)+'</h3><div class="meta">'+E(c.region)+(c.district?' · '+E(c.district):'')+(c.address?' · '+E(c.address):'')+'</div>'+(c.description?'<p>'+E(c.description)+'</p>':'')+(kv.length?'<div class="kv">'+kv.join('')+'</div>':'')+(c.website?'<p><a href="'+E(c.website)+'" target="_blank" rel="noopener noreferrer">홈페이지 ↗</a></p>':'')+'</article>';}
  function eventItem(e,past){return '<article class="item"><h3>'+(past?'<span class="badge gray">지난 대회</span>':'<span class="badge">예정</span>')+E(e.title)+'</h3><div class="meta">'+dr(e.start_date,e.end_date)+(e.region?' · '+E(e.region):'')+(e.venue?' · '+E(e.venue):'')+(e.organizer?' · 주최 '+E(e.organizer):'')+'</div>'+(e.age_groups?'<div class="kv"><span><b>대상</b> '+E(e.age_groups)+'</span></div>':'')+(e.description?'<p>'+E(e.description)+'</p>':'')+(e.url?'<p><a href="'+E(e.url)+'" target="_blank" rel="noopener noreferrer">공식 안내 ↗</a></p>':'')+'</article>';}
  function qaItem(q){return '<details class="qa"><summary><div><div class="q">'+E(q.title)+'</div><div class="m"><span class="badge">'+E(CAT[q.category]||q.category)+'</span>'+(q.nickname?E(q.nickname)+' · ':'')+d(q.created_at)+(q.answer?' · 답변 완료':' · 답변 준비 중')+'</div></div></summary><div class="a"><div class="body">'+E(q.body)+'</div>'+(q.answer?'<div class="ans">'+E(q.answer)+'</div><div class="src">답변: '+E(q.answered_by||'코트메이트 운영팀')+(q.answer_sources?' · 근거: '+E(q.answer_sources):'')+' · 일반 안내이며 진단·추천이 아닙니다.</div>':'<div class="src">운영팀이 확인 후 답을 달고 있습니다.</div>')+'</div></details>';}
  function menu(){const b=document.querySelector('.menu-btn'),n=document.querySelector('.nav');if(b&&n)b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);});}
  document.addEventListener('DOMContentLoaded',menu);
  return {get,post,E,CAT,d,dr,clubItem,eventItem,qaItem};
})();
