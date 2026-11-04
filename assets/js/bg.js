/*
 * 主页背景主题
 * 主题由 _config.yml 的 theme_style 决定，也可以用 ?theme=xxx 临时预览：
 *   classic | galaxy | network | aurora | blueprint
 */
(function () {
  var THEMES = ['classic', 'galaxy', 'network', 'aurora', 'blueprint'];
  var DARK = { galaxy: true, blueprint: true };
  var body = document.body;

  var theme = body.getAttribute('data-theme') || 'classic';
  var m = /[?&]theme=([a-z]+)/.exec(window.location.search);
  if (m && THEMES.indexOf(m[1]) !== -1) theme = m[1];

  THEMES.forEach(function (t) { body.classList.remove('theme-' + t); });
  body.classList.remove('theme-dark');
  body.classList.add('theme-' + theme);
  if (DARK[theme]) body.classList.add('theme-dark');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (theme === 'aurora') {
    var a = document.createElement('div');
    a.className = 'bg-aurora';
    a.setAttribute('aria-hidden', 'true');
    a.innerHTML = '<span></span><span></span><span></span>';
    body.insertBefore(a, body.firstChild);
    return;
  }
  if (theme !== 'galaxy' && theme !== 'network') return;

  var canvas = document.createElement('canvas');
  canvas.className = 'bg-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  body.insertBefore(canvas, body.firstChild);
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var W = 0, H = 0, dpr = 1;
  var mouse = { x: -9999, y: -9999 };
  var items = [];
  var running = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    init();
  }

  function rand(a, b) { return a + Math.random() * (b - a); }

  /* ---------------- 星系 ---------------- */
  var meteors = [];
  var nextMeteor = 0;

  function initGalaxy() {
    var n = Math.min(600, Math.round(W * H / 3500));
    items = [];
    for (var i = 0; i < n; i++) {
      var depth = Math.random();
      items.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.3 + depth * 1.3,
        depth: depth,
        tw: rand(0.5, 2.2),
        ph: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.15 ? rand(190, 230) : (Math.random() < 0.1 ? rand(20, 45) : 0)
      });
    }
  }

  function drawGalaxy(t) {
    ctx.clearRect(0, 0, W, H);
    var scroll = window.scrollY || 0;
    for (var i = 0; i < items.length; i++) {
      var s = items[i];
      var y = (s.y - scroll * (0.02 + s.depth * 0.08)) % H;
      if (y < 0) y += H;
      var x = (s.x + t * 0.004 * (0.2 + s.depth)) % W;
      var alpha = 0.45 + 0.55 * Math.abs(Math.sin(t * 0.001 * s.tw + s.ph));
      ctx.fillStyle = s.hue
        ? 'hsla(' + s.hue + ',90%,80%,' + alpha + ')'
        : 'rgba(255,255,255,' + alpha + ')';
      if (s.r < 1) { // tiny stars: a square pixel is indistinguishable and much cheaper
        ctx.fillRect(x - s.r, y - s.r, s.r * 2, s.r * 2);
        continue;
      }
      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.r > 1.35) { // 亮星光晕
        ctx.beginPath();
        ctx.fillStyle = 'rgba(180,200,255,' + alpha * 0.12 + ')';
        ctx.arc(x, y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // 流星
    if (t > nextMeteor) {
      meteors.push({ x: rand(W * 0.2, W), y: rand(0, H * 0.4), vx: -rand(6, 10), vy: rand(2.5, 4), life: 1 });
      nextMeteor = t + rand(4000, 9000);
    }
    for (var j = meteors.length - 1; j >= 0; j--) {
      var mt = meteors[j];
      var g = ctx.createLinearGradient(mt.x, mt.y, mt.x - mt.vx * 12, mt.y - mt.vy * 12);
      g.addColorStop(0, 'rgba(255,255,255,' + mt.life + ')');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(mt.x, mt.y);
      ctx.lineTo(mt.x - mt.vx * 12, mt.y - mt.vy * 12);
      ctx.stroke();
      mt.x += mt.vx; mt.y += mt.vy; mt.life -= 0.012;
      if (mt.life <= 0) meteors.splice(j, 1);
    }
  }

  /* ---------------- 神经网络 ---------------- */
  var LINK = 140;

  function initNetwork() {
    var n = Math.min(120, Math.round(W * H / 13000));
    items = [];
    for (var i = 0; i < n; i++) {
      items.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: rand(-0.25, 0.25),
        vy: rand(-0.25, 0.25),
        r: rand(1.4, 2.8),
        ph: Math.random() * Math.PI * 2
      });
    }
  }

  function drawNetwork(t) {
    ctx.clearRect(0, 0, W, H);
    var i, j, p, q, dx, dy, d2, a;
    for (i = 0; i < items.length; i++) {
      p = items[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
      // 鼠标轻微吸引
      dx = mouse.x - p.x; dy = mouse.y - p.y; d2 = dx * dx + dy * dy;
      if (d2 < 200 * 200 && d2 > 1) { p.x += dx * 0.002; p.y += dy * 0.002; }
    }
    ctx.lineWidth = 1;
    for (i = 0; i < items.length; i++) {
      p = items[i];
      for (j = i + 1; j < items.length; j++) {
        q = items[j];
        dx = p.x - q.x; dy = p.y - q.y; d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          a = 1 - Math.sqrt(d2) / LINK;
          ctx.strokeStyle = 'rgba(31,79,163,' + (a * 0.35) + ')';
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      dx = p.x - mouse.x; dy = p.y - mouse.y; d2 = dx * dx + dy * dy;
      if (d2 < 180 * 180) {
        a = 1 - Math.sqrt(d2) / 180;
        ctx.strokeStyle = 'rgba(14,165,233,' + (a * 0.6) + ')';
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    for (i = 0; i < items.length; i++) {
      p = items[i];
      var pulse = 0.6 + 0.4 * Math.sin(t * 0.002 + p.ph); // “神经元放电”
      ctx.beginPath();
      ctx.fillStyle = 'rgba(31,79,163,' + (0.45 + 0.4 * pulse) + ')';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  var init = theme === 'galaxy' ? initGalaxy : initNetwork;
  var draw = theme === 'galaxy' ? drawGalaxy : drawNetwork;

  var last = 0;
  function loop(t) {
    if (!running) return;
    window.requestAnimationFrame(loop);
    if (t - last < 32) return; // ~30 fps is plenty for a background
    last = t;
    draw(t || 0);
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resize(); if (reduce) draw(0); }, 150);
  });
  window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseout', function () { mouse.x = mouse.y = -9999; });
  document.addEventListener('visibilitychange', function () {
    if (reduce) return;
    running = !document.hidden;
    if (running) window.requestAnimationFrame(loop);
  });

  resize();
  if (reduce) draw(0); else window.requestAnimationFrame(loop);
})();
