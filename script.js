const splash = document.getElementById('splash');
  const barFill = document.getElementById('barFill');
  setTimeout(()=>{ barFill.style.width = "100%"; }, 300);
  setTimeout(()=>{
    splash.classList.add('hide');
    document.body.style.overflow = 'auto';
    document.getElementById('dev-badge').classList.add('show');
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

  document.getElementById('year').textContent = new Date().getFullYear();
