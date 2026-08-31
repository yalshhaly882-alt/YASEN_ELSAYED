// ===================================================================
// Admin panel logic for the Yasoo portfolio site.
// Loads content.json (or a previously saved local draft), lets you
// edit everything through the form, then either:
//   - "حفظ ومعاينة محلي" -> saves a draft to localStorage so
//     index.html (opened in THIS browser) shows your changes.
//   - "تحميل content.json" -> downloads the updated file so you can
//     replace it in your hosting (GitHub, Netlify, etc.) to publish
//     the changes for everyone.
// ===================================================================

let state = null;
const DRAFT_KEY = 'yasoo_content_draft';

function $(id){ return document.getElementById(id); }
function setStatus(msg){ $('status').textContent = msg; setTimeout(()=>{ if($('status').textContent===msg) $('status').textContent=''; }, 3500); }

function fileToDataURL(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ---------- Rendering form from state ----------
function renderForm(){
  $('logoPre').value = state.site?.logoPre || '';
  $('logoAccent').value = state.site?.logoAccent || '';
  $('introName').value = state.intro?.name || '';
  $('introSub').value = state.intro?.sub || '';
  $('introTag').value = state.intro?.tag || '';
  $('introImgPreview').src = state.intro?.introImage || '';

  $('heroEyebrow').value = state.hero?.eyebrow || '';
  $('headlinePre').value = state.hero?.headlinePre || '';
  $('headlineAccent').value = state.hero?.headlineAccent || '';
  $('roleLine').value = state.hero?.roleLine || '';
  $('heroPhotoPreview').src = state.hero?.photo || '';
  $('badgeK').value = state.hero?.badgeK || '';
  $('badgeV').value = state.hero?.badgeV || '';

  $('quoteBefore').value = state.quote?.before || '';
  $('quoteAccent').value = state.quote?.accent || '';
  $('quoteAfter').value = state.quote?.after || '';
  $('quoteSig').value = state.quote?.sig || '';

  $('artistImgPreview').src = state.artist?.img || '';
  $('artistName').value = state.artist?.name || '';
  $('artistText').value = state.artist?.text || '';

  $('contactIntro').value = state.contact?.intro || '';
  $('whatsapp').value = state.contact?.whatsapp || '';
  $('telegram').value = state.contact?.telegram || '';

  $('tiktok').value = state.socials?.tiktok || '';
  $('facebook').value = state.socials?.facebook || '';
  $('instagram').value = state.socials?.instagram || '';

  $('devEnabled').checked = !!state.devBadge?.enabled;
  $('devLine1').value = state.devBadge?.line1 || '';
  $('devLine2').value = state.devBadge?.line2 || '';
  $('devLink').value = state.devBadge?.link || '';

  renderTags();
  renderAbout();
  renderGallery();
}

// ---------- Tags (repeatable list) ----------
function renderTags(){
  const wrap = $('tagsList'); wrap.innerHTML = '';
  (state.hero.tags || []).forEach((tag, i)=>{
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <button class="rm" data-i="${i}">✕ حذف</button>
      <div class="field"><label>وسم ${i+1}</label><input type="text" value="${escapeAttr(tag)}" data-tag-i="${i}"></div>
    `;
    wrap.appendChild(item);
  });
  wrap.querySelectorAll('[data-tag-i]').forEach(inp=>{
    inp.addEventListener('input', e=>{ state.hero.tags[+e.target.dataset.tagI] = e.target.value; });
  });
  wrap.querySelectorAll('.rm').forEach(btn=>{
    btn.addEventListener('click', ()=>{ state.hero.tags.splice(+btn.dataset.i,1); renderTags(); });
  });
}
$('addTag').addEventListener('click', ()=>{ state.hero.tags.push('وسم جديد'); renderTags(); });

// ---------- About cards ----------
function renderAbout(){
  const wrap = $('aboutList'); wrap.innerHTML = '';
  (state.about.cards || []).forEach((card, i)=>{
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <button class="rm" data-i="${i}">✕ حذف</button>
      <div class="row2">
        <div class="field"><label>العنوان</label><input type="text" value="${escapeAttr(card.k)}" data-about-k="${i}"></div>
        <div class="field"><label>القيمة</label><input type="text" value="${escapeAttr(card.v)}" data-about-v="${i}"></div>
      </div>
    `;
    wrap.appendChild(item);
  });
  wrap.querySelectorAll('[data-about-k]').forEach(inp=> inp.addEventListener('input', e=>{ state.about.cards[+e.target.dataset.aboutK].k = e.target.value; }));
  wrap.querySelectorAll('[data-about-v]').forEach(inp=> inp.addEventListener('input', e=>{ state.about.cards[+e.target.dataset.aboutV].v = e.target.value; }));
  wrap.querySelectorAll('.rm').forEach(btn=> btn.addEventListener('click', ()=>{ state.about.cards.splice(+btn.dataset.i,1); renderAbout(); }));
}
$('addAbout').addEventListener('click', ()=>{ state.about.cards.push({k:'عنوان جديد', v:'القيمة'}); renderAbout(); });

// ---------- Gallery ----------
function renderGallery(){
  const wrap = $('galleryList'); wrap.innerHTML = '';
  (state.gallery || []).forEach((g, i)=>{
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <button class="rm" data-i="${i}">✕ حذف</button>
      <img class="img-preview" src="${g.img}">
      <label class="btn file">📷 غيّر الصورة<input type="file" accept="image/*" data-gallery-img="${i}"></label>
      <div class="field" style="margin-top:10px;"><label>التسمية (اسم يظهر على الصورة)</label><input type="text" value="${escapeAttr(g.cap)}" data-gallery-cap="${i}"></div>
      <label style="display:flex; align-items:center; gap:8px; font-size:13px; margin-top:6px;">
        <input type="checkbox" data-gallery-wide="${i}" ${g.wide ? 'checked' : ''}> صورة عريضة (تاخد مكان مربعين)
      </label>
    `;
    wrap.appendChild(item);
  });
  wrap.querySelectorAll('[data-gallery-cap]').forEach(inp=> inp.addEventListener('input', e=>{ state.gallery[+e.target.dataset.galleryCap].cap = e.target.value; }));
  wrap.querySelectorAll('[data-gallery-wide]').forEach(chk=> chk.addEventListener('change', e=>{ state.gallery[+e.target.dataset.galleryWide].wide = e.target.checked; }));
  wrap.querySelectorAll('[data-gallery-img]').forEach(inp=>{
    inp.addEventListener('change', async e=>{
      const i = +e.target.dataset.galleryImg;
      const file = e.target.files[0];
      if(!file) return;
      state.gallery[i].img = await fileToDataURL(file);
      renderGallery();
    });
  });
  wrap.querySelectorAll('.rm').forEach(btn=> btn.addEventListener('click', ()=>{ state.gallery.splice(+btn.dataset.i,1); renderGallery(); }));
}
$('addGallery').addEventListener('click', ()=>{
  state.gallery.push({ img:'', cap:'صورة جديدة', wide:false });
  renderGallery();
});

function escapeAttr(s){ return (s ?? '').toString().replace(/"/g,'&quot;'); }

// ---------- Simple field bindings ----------
function bind(id, path){
  $(id).addEventListener('input', e=>{ setDeep(state, path, e.target.value); });
}
function setDeep(obj, path, val){
  const parts = path.split('.');
  let cur = obj;
  for(let i=0;i<parts.length-1;i++) cur = cur[parts[i]];
  cur[parts[parts.length-1]] = val;
}
[
  ['logoPre','site.logoPre'], ['logoAccent','site.logoAccent'],
  ['introName','intro.name'], ['introSub','intro.sub'], ['introTag','intro.tag'],
  ['heroEyebrow','hero.eyebrow'], ['headlinePre','hero.headlinePre'], ['headlineAccent','hero.headlineAccent'],
  ['roleLine','hero.roleLine'], ['badgeK','hero.badgeK'], ['badgeV','hero.badgeV'],
  ['quoteBefore','quote.before'], ['quoteAccent','quote.accent'], ['quoteAfter','quote.after'], ['quoteSig','quote.sig'],
  ['artistName','artist.name'], ['artistText','artist.text'],
  ['contactIntro','contact.intro'], ['whatsapp','contact.whatsapp'], ['telegram','contact.telegram'],
  ['tiktok','socials.tiktok'], ['facebook','socials.facebook'], ['instagram','socials.instagram'],
  ['devLine1','devBadge.line1'], ['devLine2','devBadge.line2'], ['devLink','devBadge.link'],
].forEach(([id,path])=> bind(id,path));

$('devEnabled').addEventListener('change', e=>{ state.devBadge.enabled = e.target.checked; });

// ---------- Image upload fields (single images) ----------
document.querySelectorAll('input[type=file][data-target]').forEach(inp=>{
  inp.addEventListener('change', async e=>{
    const target = e.target.dataset.target;
    const file = e.target.files[0];
    if(!file) return;
    const dataUrl = await fileToDataURL(file);
    if(target === 'introImage'){ state.intro.introImage = dataUrl; $('introImgPreview').src = dataUrl; }
    if(target === 'heroPhoto'){ state.hero.photo = dataUrl; $('heroPhotoPreview').src = dataUrl; }
    if(target === 'artistImg'){ state.artist.img = dataUrl; $('artistImgPreview').src = dataUrl; }
  });
});

// ---------- Save / Download / Import ----------
$('saveLocalBtn').addEventListener('click', ()=>{
  localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
  setStatus('✅ اتحفظ في المتصفح ده — افتح "الموقع" تشوف المعاينة.');
});

$('downloadBtn').addEventListener('click', ()=>{
  const blob = new Blob([JSON.stringify(state)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'content.json';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  setStatus('⬇️ اتحمّل content.json — استبدل بيه الملف القديم وانشره.');
});

$('importInput').addEventListener('change', async e=>{
  const file = e.target.files[0];
  if(!file) return;
  const text = await file.text();
  try {
    state = JSON.parse(text);
    renderForm();
    setStatus('📤 اتحمّل الملف بنجاح.');
  } catch(err){
    setStatus('❌ الملف مش JSON صحيح.');
  }
});

// ---------- Boot ----------
async function boot(){
  try {
    const draft = localStorage.getItem(DRAFT_KEY);
    if(draft){ state = JSON.parse(draft); }
    else { state = await fetch('content.json').then(r=>r.json()); }
  } catch(err){
    state = await fetch('content.json').then(r=>r.json());
  }
  renderForm();
}
boot();
