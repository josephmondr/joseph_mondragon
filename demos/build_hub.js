// Genera hub.html incrustando las tres demos como srcdoc de iframes (aisladas).
const fs = require("fs");
const dir = __dirname;

function embed(name) {
  const raw = fs.readFileSync(`${dir}/${name}`, "utf8");
  // JSON.stringify escapa todo; <\/script evita cerrar el <script> del hub.
  return JSON.stringify(raw).replace(/<\//g, "<\\/");
}

const DEMOS = {
  leadflow: embed("leadflow.html"),
  clipengine: embed("clipengine.html"),
  mediakit: embed("mediakit.html"),
};

const hub = `<title>Sistema de Captación con IA · 3 Demos</title>
<style>
  :root{
    --ink-0:#0F1114;--ink-1:#15181D;--ink-2:#1C2027;--line:#2E3440;--line-soft:#232830;
    --txt-0:#F2EFE8;--txt-1:#B8B4A9;--txt-2:#7E7B72;
    --gold:#D9B96C;--gold-deep:#B08F45;--gold-dim:rgba(217,185,108,.14);
    --rec:#E84A3F;--bronze:#C8A468;
    --fd:"Didot","Bodoni MT","Playfair Display",Georgia,serif;
    --fb:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    --fm:ui-monospace,"SF Mono",SFMono-Regular,Menlo,Consolas,monospace;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{height:100%}
  html{-webkit-text-size-adjust:100%}
  body{background:var(--ink-0);color:var(--txt-0);font-family:var(--fb);font-size:15px;
    line-height:1.55;display:flex;flex-direction:column}
  ::selection{background:var(--gold);color:var(--ink-0)}
  button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
  button:focus-visible{outline:2px solid var(--gold);outline-offset:2px}

  /* ── barra superior ── */
  .bar{flex:0 0 auto;display:flex;align-items:center;gap:8px;padding:10px 14px;
    border-bottom:1px solid var(--line-soft);background:var(--ink-0);overflow-x:auto;scrollbar-width:none}
  .bar::-webkit-scrollbar{display:none}
  .logo{font-family:var(--fd);font-size:17px;white-space:nowrap;margin-right:4px}
  .logo em{font-style:italic;color:var(--gold)}
  .tab{flex:0 0 auto;padding:8px 14px;border-radius:999px;border:1px solid var(--line);
    color:var(--txt-1);font-size:13px;font-weight:500;transition:.15s;white-space:nowrap}
  .tab[aria-selected="true"]{background:var(--gold);border-color:var(--gold);color:var(--ink-0);font-weight:600}

  /* ── vistas ── */
  .view{flex:1 1 auto;min-height:0;display:none}
  .view.on{display:block}
  iframe{width:100%;height:100%;border:0;display:block;background:#0B0B0D}

  /* ── inicio ── */
  #v-inicio{overflow-y:auto}
  .home{max-width:760px;margin:0 auto;padding:38px 20px 70px}
  .kick{font-family:var(--fm);font-size:10.5px;letter-spacing:.18em;color:var(--gold);text-transform:uppercase}
  .home h1{font-family:var(--fd);font-weight:400;font-size:clamp(30px,6.5vw,46px);line-height:1.1;
    margin:14px 0 12px;text-wrap:balance}
  .home h1 em{font-style:italic;color:var(--gold)}
  .home .lead{color:var(--txt-1);font-size:15.5px;max-width:58ch;margin-bottom:8px}
  .funnel-line{font-family:var(--fm);font-size:11.5px;letter-spacing:.06em;color:var(--txt-2);margin:18px 0 26px}
  .funnel-line b{color:var(--gold);font-weight:600}
  .cards{display:grid;gap:12px}
  .dcard{display:grid;grid-template-columns:52px 1fr auto;gap:14px;align-items:center;text-align:left;
    background:var(--ink-1);border:1px solid var(--line-soft);border-radius:16px;padding:17px;transition:.16s;width:100%}
  .dcard:hover{border-color:var(--gold-deep);transform:translateY(-2px)}
  .dico{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;font-size:22px}
  .dico.g{background:var(--gold-dim);border:1px solid var(--gold-deep)}
  .dico.r{background:rgba(232,74,63,.12);border:1px solid #B3352C}
  .dico.b{background:rgba(200,164,104,.12);border:1px solid #8C6532}
  .dcard .stepn{font-family:var(--fm);font-size:9.5px;letter-spacing:.14em;color:var(--gold)}
  .dcard .nm{font-family:var(--fd);font-size:19px;margin:2px 0 3px}
  .dcard .ds{font-size:12.5px;color:var(--txt-1);line-height:1.5;max-width:48ch}
  .dcard .go{color:var(--gold);font-size:18px}
  .note{margin-top:26px;font-size:12px;color:var(--txt-2);line-height:1.7;border-top:1px solid var(--line-soft);padding-top:16px}
  .note b{color:var(--txt-1)}
  @media(prefers-reduced-motion:reduce){*{transition:none!important}}
  @media(max-width:420px){.dcard{grid-template-columns:44px 1fr auto;padding:14px}.dico{width:44px;height:44px;font-size:19px}}
</style>

<div class="bar" role="tablist" aria-label="Demos">
  <span class="logo">Sistema<em>IA</em></span>
  <button class="tab" role="tab" aria-selected="true" data-v="inicio">Inicio</button>
  <button class="tab" role="tab" aria-selected="false" data-v="leadflow">✉️ LeadFlow</button>
  <button class="tab" role="tab" aria-selected="false" data-v="clipengine">🎬 ClipEngine</button>
  <button class="tab" role="tab" aria-selected="false" data-v="mediakit">📸 Media Kit</button>
</div>

<div class="view on" id="v-inicio">
  <div class="home">
    <span class="kick">Demo en vivo · Beverly Hills, CA</span>
    <h1>Tres sistemas de IA para llenarte de clientes — <em>marcas y agencias.</em></h1>
    <p class="lead">Tú sales a la calle con la cámara. Estos tres sistemas trabajan 24/7 para atraer marcas, multiplicar tu contenido y cerrar tratos. Toca cada demo — todo es interactivo.</p>
    <div class="funnel-line"><b>01 ATRAER</b> → <b>02 DEMOSTRAR</b> → <b>03 CERRAR</b></div>
    <div class="cards">
      <button class="dcard" data-v="leadflow">
        <span class="dico g">✉️</span>
        <span><span class="stepn">01 · ATRAER</span><br><span class="nm">LeadFlow</span><br>
          <span class="ds">Motor de email marketing: leads verificados de marcas en LA, emails personalizados escritos por IA y un agente que responde y agenda reuniones solo.</span></span>
        <span class="go">→</span>
      </button>
      <button class="dcard" data-v="clipengine">
        <span class="dico r">🎬</span>
        <span><span class="stepn">02 · DEMOSTRAR</span><br><span class="nm">ClipEngine</span><br>
          <span class="ds">Estudio de contenido: tus entrevistas de calle convertidas en clips virales con hooks, captions y espacios patrocinados que le vendes a las marcas.</span></span>
        <span class="go">→</span>
      </button>
      <button class="dcard" data-v="mediakit">
        <span class="dico b">📸</span>
        <span><span class="stepn">03 · CERRAR</span><br><span class="nm">Media Kit Vivo</span><br>
          <span class="ds">Portal para marcas: portafolio, propuestas de campaña generadas por IA con precios, calculadora de ROI y agenda para apartar shoots.</span></span>
        <span class="go">→</span>
      </button>
    </div>
    <p class="note"><b>Cómo usar esta demo:</b> entra a cada sistema desde las pestañas de arriba o estas tarjetas. En LeadFlow, toca un lead y genera su email con IA. En ClipEngine, presiona "Procesar con IA". En Media Kit, arma tu propia propuesta. Todos los datos son simulados — en producción, esto se conecta a Apollo, Whisper, Claude y tu calendario real.<br><br>Demo construida por Joseph Mondragón · Sistemas de captación con IA</p>
  </div>
</div>
<div class="view" id="v-leadflow"></div>
<div class="view" id="v-clipengine"></div>
<div class="view" id="v-mediakit"></div>

<script>
const DEMOS={
  leadflow:${DEMOS.leadflow},
  clipengine:${DEMOS.clipengine},
  mediakit:${DEMOS.mediakit}
};
const loaded={};
function show(v){
  document.querySelectorAll(".tab").forEach(t=>t.setAttribute("aria-selected",t.dataset.v===v));
  document.querySelectorAll(".view").forEach(x=>x.classList.toggle("on",x.id==="v-"+v));
  if(DEMOS[v]&&!loaded[v]){
    const f=document.createElement("iframe");
    f.setAttribute("title","Demo "+v);
    f.srcdoc=DEMOS[v];
    document.getElementById("v-"+v).appendChild(f);
    loaded[v]=true;
  }
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-v]");if(!b)return;show(b.dataset.v);
});
</script>
`;

fs.writeFileSync(`${dir}/hub.html`, hub);
console.log("hub.html generado:", fs.statSync(`${dir}/hub.html`).size, "bytes");
