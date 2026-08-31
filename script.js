// ===================================================================
// Yasoo Portfolio — renders the entire page from content.json.
// To change anything on the site (text, images, links), edit content
// via admin.html and replace content.json — this file just displays it.
// ===================================================================

const ICONS = {
  whatsapp: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.5.7 4.8 1.9 6.8L3 29l7-1.9c1.9 1 4 1.6 6 1.6 7 0 12.7-5.6 12.7-12.5S23 3 16 3zm0 22.7c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.2 1.1 1.1-4.1-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.2 9.7 10 5 16 5s10.8 4.7 10.8 10.5S22 25.7 16 25.7zm5.9-7.9c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.8-1-2.4-.3-.7-.5-.6-.7-.6h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8 0 1.7 1.2 3.3 1.4 3.5.2.2 2.4 3.8 5.9 5.2.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>`,
  telegram: `<svg viewBox="0 0 240 240" fill="currentColor"><path d="M100 173l-4.5 63.6c6.4 0 9.2-2.8 12.6-6.1l30.2-28.9 62.6 45.8c11.5 6.3 19.7 3 22.6-10.6L223.9 22.4c3.9-16.7-6-23.2-17.4-19L10.7 84.1c-16.3 6.3-16.1 15.4-2.8 19.5l50 15.6L182.5 40.5c5.6-3.7 10.7-1.7 6.5 2z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="#1877F2"><path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.3C16.3 4.2 15.2 4 14 4c-2.6 0-4.4 1.6-4.4 4.5V10.5H7v3h2.6V21h3.9z"/></svg>`,
  instagram: (id) => `<svg viewBox="0 0 24 24" fill="none"><defs><linearGradient id="${id}" x1="0" y1="24" x2="24" y2="0"><stop offset="0" stop-color="#833AB4"/><stop offset=".5" stop-color="#E1306C"/><stop offset="1" stop-color="#F77737"/></linearGradient></defs><rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#${id})" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="url(#${id})" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.1" fill="url(#${id})"/></svg>`,
  tiktok: `<svg viewBox="0 0 48 48"><path transform="translate(-1.1,1.1)" fill="#25F4EE" d="M33 6c1 4.6 4 7.6 9 8v6.2c-3.2.1-6.1-.9-9-2.8v12.9c0 7.7-6 12.9-12.7 12.9C13.4 43.2 8 37.9 8 30.9c0-7.6 6.6-13.1 13.9-12.6v6.5c-3.5-.4-6.9 2-6.9 6.1 0 3.7 3 6 6.2 6 3.9 0 6.7-3 6.7-8.1V6H33z"/><path transform="translate(1.1,-1.1)" fill="#FE2C55" d="M33 6c1 4.6 4 7.6 9 8v6.2c-3.2.1-6.1-.9-9-2.8v12.9c0 7.7-6 12.9-12.7 12.9C13.4 43.2 8 37.9 8 30.9c0-7.6 6.6-13.1 13.9-12.6v6.5c-3.5-.4-6.9 2-6.9 6.1 0 3.7 3 6 6.2 6 3.9 0 6.7-3 6.7-8.1V6H33z"/><path fill="#ffffff" d="M33 6c1 4.6 4 7.6 9 8v6.2c-3.2.1-6.1-.9-9-2.8v12.9c0 7.7-6 12.9-12.7 12.9C13.4 43.2 8 37.9 8 30.9c0-7.6 6.6-13.1 13.9-12.6v6.5c-3.5-.4-6.9 2-6.9 6.1 0 3.7 3 6 6.2 6 3.9 0 6.7-3 6.7-8.1V6H33z"/></svg>`
};

function el(id){ return document.getElementById(id); }
function esc(s){ return (s ?? '').toString(); }

function buildSocialRow(socials, idPrefix){
  const wrap = document.createElement('div');
  const items = [
    { key:'tiktok',    icon: ICONS.tiktok,                          label:'TikTok'    },
    { key:'facebook',  icon: ICONS.facebook,                        label:'Facebook'  },
    { key:'instagram', icon: ICONS.instagram(idPrefix+'-igGrad'),   label:'Instagram' }
  ];
  items.forEach(item=>{
    const url = socials[item.key];
    if(!url) return;
    const a = document.createElement('a');
    a.className = 'social-ic';
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('aria-label', item.label);
    a.innerHTML = item.icon;
    wrap.appendChild(a);
  });
  return wrap;
}

function render(content){
  document.title = content.site?.title || document.title;

  // Intro / splash
  const ib = el('introBg');
  if(content.intro?.introImage) ib.style.backgroundImage = `url('${content.intro.introImage}')`;
  el('introTag').textContent = content.intro?.tag || '';
  el('introName').textContent = content.intro?.name || '';
  el('introSub').textContent = content.intro?.sub || '';

  // Dev badge
  if(content.devBadge?.enabled){
    const badge = el('dev-badge');
    badge.href = content.devBadge.link || '#';
    el('devBadgeText').innerHTML = `${esc(content.devBadge.line1)}<br>${esc(content.devBadge.line2)}`;
    badge.style.display = 'flex';
  }

  // Header logo
  el('logoText').innerHTML = `${esc(content.site?.logoPre)}<span>${esc(content.site?.logoAccent)}</span>`;

  // Hero
  el('heroEyebrow').textContent = content.hero?.eyebrow || '';
  el('heroHeadline').innerHTML = `${esc(content.hero?.headlinePre)} <span class="accent">${esc(content.hero?.headlineAccent)}</span>`;
  el('heroRoleLine').textContent = content.hero?.roleLine || '';
  const tagsWrap = el('heroTags');
  (content.hero?.tags || []).forEach((t,i)=>{
    const span = document.createElement('span');
    span.className = 'tag' + (i===1 ? ' hot' : '');
    span.textContent = t;
    tagsWrap.appendChild(span);
  });
  el('heroPhoto').src = content.hero?.photo || '';
  el('floatBadgeK').textContent = content.hero?.badgeK || '';
  el('floatBadgeV').textContent = content.hero?.badgeV || '';

  // WhatsApp / Telegram links (hero + contact)
  const waLink = content.contact?.whatsapp ? `https://wa.me/${content.contact.whatsapp}` : '#';
  const tgLink = content.contact?.telegram ? `https://t.me/${content.contact.telegram}` : '#';
  ['waBtnHero','waBtnContact'].forEach(id=> el(id).href = waLink);
  ['tgBtnHero','tgBtnContact'].forEach(id=> el(id).href = tgLink);
  el('waIconHero').innerHTML = ICONS.whatsapp;
  el('waIconContact').innerHTML = ICONS.whatsapp;
  el('tgIconHero').innerHTML = ICONS.telegram;
  el('tgIconContact').innerHTML = ICONS.telegram;

  // Social rows
  el('socialRowHero').replaceWith(Object.assign(buildSocialRow(content.socials || {}, 'hero'), {id:'socialRowHero'}));
  el('socialRowContact').replaceWith(Object.assign(buildSocialRow(content.socials || {}, 'contact'), {id:'socialRowContact'}));

  // About cards
  const aboutGrid = el('aboutGrid');
  (content.about?.cards || []).forEach(c=>{
    const card = document.createElement('div');
    card.className = 'info-card';
    card.innerHTML = `<div class="k">${esc(c.k)}</div><div class="v">${esc(c.v)}</div>`;
    aboutGrid.appendChild(card);
  });

  // Quote
  el('quoteText').innerHTML = `${esc(content.quote?.before)}<span class="accent">${esc(content.quote?.accent)}</span>${esc(content.quote?.after)}`;
  el('quoteSig').textContent = '— ' + (content.quote?.sig || '');

  // Gallery
  const galleryGrid = el('galleryGrid');
  (content.gallery || []).forEach(g=>{
    const a = document.createElement('a');
    a.href = '#';
    if(g.wide) a.classList.add('wide');
    a.innerHTML = `<img src="${g.img}" alt="${esc(g.cap)}"><span class="cap">${esc(g.cap)}</span>`;
    galleryGrid.appendChild(a);
  });

  // Artist
  el('artistImg').src = content.artist?.img || '';
  el('artistImg').alt = content.artist?.name || '';
  el('artistName').textContent = content.artist?.name || '';
  el('artistText').textContent = content.artist?.text || '';

  // Contact
  el('contactIntro').textContent = content.contact?.intro || '';

  // Footer
  el('footerName').textContent = content.footer?.name || '';
  el('footerSub').textContent = content.footer?.sub || '';
}

function startSplashAndReveal(){
  const splash = document.getElementById('splash');
  const barFill = document.getElementById('barFill');
  setTimeout(()=>{ barFill.style.width = "100%"; }, 300);
  setTimeout(()=>{
    splash.classList.add('hide');
    document.body.style.overflow = 'auto';
    const badge = document.getElementById('dev-badge');
    if(badge) badge.classList.add('show');
  }, 3600);
  document.body.style.overflow = 'hidden';

  document.documentElement.classList.add('js');
  const revealEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:.12});
    revealEls.forEach(el=>io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add('in'));
  }
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
}

// A locally-saved draft from admin.html (same browser only) takes priority
// over content.json, so you can preview edits before publishing them.
// If fetch('content.json') fails (e.g. the page was opened directly as a
// local file instead of through a web server), we fall back to the copy
// embedded in index.html so the site still works.
function loadContent(){
  try {
    const draft = localStorage.getItem('yasoo_content_draft');
    if(draft) return Promise.resolve(JSON.parse(draft));
  } catch(e) { /* ignore bad draft */ }

  return fetch('content.json')
    .then(r => { if(!r.ok) throw new Error('bad response'); return r.json(); })
    .catch(() => {
      const embedded = document.getElementById('embeddedContent');
      if(embedded) return JSON.parse(embedded.textContent);
      throw new Error('no content available');
    });
}

loadContent()
  .then(content => { render(content); startSplashAndReveal(); })
  .catch(err => {
    console.error('Failed to load content.json', err);
    // Even if content fails to load, don't leave the user stuck on the splash.
    document.getElementById('splash').classList.add('hide');
    document.body.style.overflow = 'auto';
  });
