/*
 * 主页背景主题
 * 主题由 _config.yml 的 theme_style 决定，也可以用 ?theme=xxx 临时预览：
 *   classic | cosmos | galaxy | network | aurora | blueprint
 *   cosmos = 星系 + 神经网络：星空中漂浮着由神经元组成的星系，信号沿连线传播
 */
(function () {
  var THEMES = ['classic', 'cosmos', 'galaxy', 'network', 'aurora', 'blueprint'];
  var DARK = { cosmos: true, galaxy: true, blueprint: true };
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
  if (theme !== 'galaxy' && theme !== 'network' && theme !== 'cosmos') return;

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

  /* ---------------- 星系 + 神经网络（cosmos） ---------------- */
  // 预渲染的发光粒子，避免每帧创建渐变
  function makeSprite(rgb) {
    var c = document.createElement('canvas');
    c.width = c.height = 64;
    var g = c.getContext('2d');
    var gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(0.18, 'rgba(' + rgb + ',0.9)');
    gr.addColorStop(0.45, 'rgba(' + rgb + ',0.25)');
    gr.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 64);
    return c;
  }
  var SPRITE = { cyan: makeSprite('120,200,255'), violet: makeSprite('185,150,255'), gold: makeSprite('255,215,150') };
  var nets = [];

  // 分层神经网络（多层感知机）形状的星座
  function buildMLP(layers, w, h) {
    var nodes = [], next = [], starts = [];
    for (var l = 0; l < layers.length; l++) {
      for (var k = 0; k < layers[l]; k++) {
        var idx = nodes.length;
        nodes.push({
          x: (l / (layers.length - 1) - 0.5) * w + rand(-3, 3),
          y: ((k + 0.5) / layers[l] - 0.5) * h * (0.55 + 0.45 * layers[l] / 6) + rand(-3, 3),
          layer: l, r: rand(1.6, 2.6), flash: 0
        });
        next.push([]);
        if (l === 0) starts.push(idx);
      }
    }
    var edges = [];
    var off = 0;
    for (l = 0; l < layers.length - 1; l++) {
      var nextOff = off + layers[l];
      for (var a = 0; a < layers[l]; a++) {
        var linked = 0;
        for (var b = 0; b < layers[l + 1]; b++) {
          if (Math.random() < 0.6 || (b === layers[l + 1] - 1 && !linked)) {
            edges.push([off + a, nextOff + b, rand(0.35, 1)]);
            next[off + a].push(nextOff + b);
            linked++;
          }
        }
      }
      off = nextOff;
    }
    return { nodes: nodes, edges: edges, next: next, starts: starts, sprite: SPRITE.cyan, hue: '120,190,255' };
  }

  // 旋臂星系形状：沿两条对数螺线分布的神经元，相邻神经元相连，信号从核心向外传播
  function buildSpiral(n, R) {
    var nodes = [{ x: 0, y: 0, r: 3.2, rad: 0, flash: 0 }];
    for (var i = 0; i < n; i++) {
      var arm = i % 2, f = (i >> 1) / (n / 2);
      var ang = arm * Math.PI + f * Math.PI * 2.3 + rand(-0.12, 0.12);
      var rad = R * (0.12 + 0.88 * f) * rand(0.92, 1.08);
      nodes.push({ x: Math.cos(ang) * rad, y: Math.sin(ang) * rad * 0.62, r: rand(1.1, 2.3) * (1.2 - f * 0.5), rad: rad, flash: 0 });
    }
    var edges = [], next = nodes.map(function () { return []; }), seen = {};
    for (i = 0; i < nodes.length; i++) {
      var d = [];
      for (var j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        d.push([dx * dx + dy * dy, j]);
      }
      d.sort(function (p, q) { return p[0] - q[0]; });
      for (var k = 0; k < 3; k++) {
        var o = d[k][1], key = Math.min(i, o) + '-' + Math.max(i, o);
        if (seen[key]) continue;
        seen[key] = 1;
        var inner = nodes[i].rad <= nodes[o].rad ? i : o, outer = inner === i ? o : i;
        edges.push([inner, outer, rand(0.4, 1)]);
        next[inner].push(outer);
      }
    }
    return { nodes: nodes, edges: edges, next: next, starts: [0], sprite: SPRITE.violet, hue: '180,150,255' };
  }

  function placeNet(net, cx, cy, scale, angle, depth, dim) {
    net.cx = cx; net.cy = cy; net.scale = scale; net.angle = angle; net.depth = depth;
    net.dim = dim || 1; // nets behind the text column are drawn fainter
    net.spin = rand(-0.00004, 0.00004);
    net.signals = [];
    net.nextSpawn = 0;
    return net;
  }

  function initCosmos() {
    initGalaxy();
    nets = [];
    var small = W < 760;
    var s = small ? 0.62 : Math.min(1.15, Math.max(0.8, W / 1400));
    if (small) {
      nets.push(placeNet(buildSpiral(34, 170), W * 0.72, H * 0.2, s, rand(-0.3, 0.3), 0.05, 0.6));
      nets.push(placeNet(buildMLP([3, 5, 5, 2], 300, 210), W * 0.32, H * 0.8, s * 0.9, rand(-0.2, 0.2), 0.08, 0.6));
      return;
    }
    // 大旋臂星系在右上，分层网络在侧边栏下方，另外两个较小、较暗的放在正文后面
    nets.push(placeNet(buildSpiral(46, 170), W * 0.86, H * 0.2, s, rand(-0.3, 0.3), 0.05, 0.85));
    nets.push(placeNet(buildMLP([3, 5, 5, 2], 300, 210), W * 0.12, H * 0.82, s * 0.85, rand(-0.2, 0.2), 0.08));
    nets.push(placeNet(buildSpiral(28, 110), W * 0.47, H * 0.6, s * 0.75, rand(0, 3), 0.1, 0.5));
    nets.push(placeNet(buildMLP([4, 6, 3], 240, 190), W * 0.76, H * 0.88, s * 0.7, rand(-0.25, 0.25), 0.03, 0.55));
  }

  function project(net, n, t, scroll) {
    var a = net.angle + t * net.spin;
    var breathe = 1 + 0.03 * Math.sin(t * 0.0005 + net.cx);
    var c = Math.cos(a), sn = Math.sin(a), k = net.scale * breathe;
    var y0 = net.cy - scroll * net.depth;
    y0 = (((y0 + 200) % (H + 400)) + H + 400) % (H + 400) - 200; // wrap while scrolling
    return { x: net.cx + (n.x * c - n.y * sn) * k, y: y0 + (n.x * sn + n.y * c) * k };
  }

  function drawNets(t) {
    var scroll = window.scrollY || 0;
    for (var q = 0; q < nets.length; q++) {
      var net = nets[q], P = [], i, e, p0, p1;
      for (i = 0; i < net.nodes.length; i++) P.push(project(net, net.nodes[i], t, scroll));

      // 星系的星云光晕
      var core = project(net, { x: 0, y: 0 }, t, scroll);
      var rg = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, 190 * net.scale);
      rg.addColorStop(0, 'rgba(' + net.hue + ',' + 0.16 * net.dim + ')');
      rg.addColorStop(1, 'rgba(' + net.hue + ',0)');
      ctx.fillStyle = rg;
      ctx.fillRect(core.x - 200 * net.scale, core.y - 200 * net.scale, 400 * net.scale, 400 * net.scale);

      // 突触连线
      ctx.lineWidth = 0.8;
      for (i = 0; i < net.edges.length; i++) {
        e = net.edges[i]; p0 = P[e[0]]; p1 = P[e[1]];
        ctx.strokeStyle = 'rgba(' + net.hue + ',' + (0.07 + 0.13 * e[2]) * net.dim + ')';
        ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
      }

      // 神经信号：从起点出发，沿连线向前传播，到达后点亮神经元
      if (t > net.nextSpawn) {
        var st = net.starts[(Math.random() * net.starts.length) | 0];
        var nx = net.next[st];
        if (nx.length) net.signals.push({ from: st, to: nx[(Math.random() * nx.length) | 0], p: 0, v: rand(0.012, 0.022) });
        net.nodes[st].flash = 1;
        net.nextSpawn = t + rand(250, 700);
      }
      for (i = net.signals.length - 1; i >= 0; i--) {
        var sg = net.signals[i];
        sg.p += sg.v;
        if (sg.p >= 1) {
          net.nodes[sg.to].flash = 1;
          var nn = net.next[sg.to];
          if (nn.length && Math.random() < 0.9) { sg.from = sg.to; sg.to = nn[(Math.random() * nn.length) | 0]; sg.p = 0; }
          else { net.signals.splice(i, 1); continue; }
        }
        p0 = P[sg.from]; p1 = P[sg.to];
        var sx = p0.x + (p1.x - p0.x) * sg.p, sy = p0.y + (p1.y - p0.y) * sg.p;
        ctx.globalAlpha = 0.9 * net.dim;
        ctx.drawImage(SPRITE.gold, sx - 7, sy - 7, 14, 14);
      }

      // 神经元（亮星）
      for (i = 0; i < net.nodes.length; i++) {
        var nd = net.nodes[i];
        var tw = 0.65 + 0.35 * Math.sin(t * 0.0015 + i * 1.7);
        var size = nd.r * (5 + nd.flash * 5);
        ctx.globalAlpha = Math.min(1, 0.55 * tw + nd.flash * 0.6) * net.dim;
        ctx.drawImage(net.sprite, P[i].x - size, P[i].y - size, size * 2, size * 2);
        nd.flash *= 0.93;
      }
      ctx.globalAlpha = 1;
    }

    // 鼠标附近的星星连成临时星座
    if (mouse.x > -1000) {
      ctx.lineWidth = 0.7;
      for (var j = 0; j < items.length; j++) {
        var s = items[j];
        if (s.r < 0.9) continue;
        var sy2 = ((s.y - scroll * (0.02 + s.depth * 0.08)) % H + H) % H;
        var sx2 = (s.x + t * 0.004 * (0.2 + s.depth)) % W;
        var dx = sx2 - mouse.x, dy = sy2 - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150) {
          ctx.strokeStyle = 'rgba(150,200,255,' + (0.45 * (1 - Math.sqrt(d2) / 150)) + ')';
          ctx.beginPath(); ctx.moveTo(sx2, sy2); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }
  }

  function drawCosmos(t) {
    drawGalaxy(t);
    drawNets(t);
  }

  var init = theme === 'galaxy' ? initGalaxy : theme === 'cosmos' ? initCosmos : initNetwork;
  var draw = theme === 'galaxy' ? drawGalaxy : theme === 'cosmos' ? drawCosmos : drawNetwork;

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
