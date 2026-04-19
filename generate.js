const fs = require('fs');

const components = [];
const baseCss = `body { display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; background:#0a0a0a; font-family: system-ui, sans-serif; }`;

function add(c) {
  components.push({
    id: c.id,
    name: c.name,
    category: c.category,
    tags: c.tags,
    description: c.description,
    html: c.html,
    css: `${baseCss}\n${c.css}`,
    js: c.js || "",
    react: c.react,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
}

// 1. Neon Glow Button
add({
  id: "neon-glow-button",
  name: "Neon Glow Button",
  category: "Buttons",
  tags: ["hover", "neon", "glow", "animation"],
  description: "Bright cyan border, box-shadow glow, on hover the glow intensifies and background fills with cyan, text turns black",
  html: `<button class="neon-btn">Click Me</button>`,
  css: `.neon-btn { padding: 12px 24px; font-size: 16px; font-weight: bold; color: #0ff; background: transparent; border: 2px solid #0ff; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(0, 255, 255, 0.5), inset 0 0 10px rgba(0, 255, 255, 0.5); text-transform: uppercase; letter-spacing: 2px; } .neon-btn:hover { background: #0ff; color: #000; box-shadow: 0 0 20px #0ff, 0 0 40px #0ff, 0 0 80px #0ff; }`,
  react: `export default function NeonGlowButton() { return <button className="px-6 py-3 text-base font-bold text-[#0ff] uppercase tracking-widest bg-transparent border-2 border-[#0ff] rounded-lg cursor-pointer transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.5),inset_0_0_10px_rgba(0,255,255,0.5)] hover:bg-[#0ff] hover:text-black hover:shadow-[0_0_20px_#0ff,0_0_40px_#0ff,0_0_80px_#0ff]">Click Me</button>; }`
});

// 2. Gradient Shift Button
add({
  id: "gradient-shift-button",
  name: "Gradient Shift Button",
  category: "Buttons",
  tags: ["gradient", "hover", "animation"],
  description: "Background gradient from purple to pink, on hover the gradient shifts/animates",
  html: `<button class="grad-btn">Hover Me</button>`,
  css: `.grad-btn { padding: 12px 24px; font-size: 16px; font-weight: bold; color: #fff; background: linear-gradient(45deg, #f0f, #8a2be2, #f0f); background-size: 200% auto; border: none; border-radius: 8px; cursor: pointer; transition: 0.5s; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 0 20px rgba(255, 0, 255, 0.5); } .grad-btn:hover { background-position: right center; box-shadow: 0 0 30px rgba(255, 0, 255, 0.8); }`,
  react: `export default function GradientShiftButton() { return <button className="px-6 py-3 text-base font-bold text-white uppercase tracking-widest bg-[linear-gradient(45deg,#f0f,#8a2be2,#f0f)] bg-[length:200%_auto] border-none rounded-lg cursor-pointer transition-all duration-500 shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:bg-[position:right_center] hover:shadow-[0_0_30px_rgba(255,0,255,0.8)]">Hover Me</button>; }`
});

// 3. Cyberpunk Glitch Button
add({
  id: "cyberpunk-glitch-button",
  name: "Cyberpunk Glitch Button",
  category: "Buttons",
  tags: ["glitch", "cyberpunk", "hover", "animation"],
  description: "Neon yellow text on dark background, on hover a glitch effect",
  html: `<button class="cybr-btn">GLITCH<span aria-hidden>_</span></button>`,
  css: `.cybr-btn { padding: 12px 24px; font-size: 16px; font-weight: bold; color: #ff0; background: #111; border: 2px solid #ff0; border-radius: 0; cursor: pointer; text-transform: uppercase; letter-spacing: 3px; position: relative; overflow: hidden; } .cybr-btn:hover { animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite; } @keyframes glitch { 0% { transform: translate(0) } 20% { transform: translate(-2px, 2px) } 40% { transform: translate(-2px, -2px) } 60% { transform: translate(2px, 2px) } 80% { transform: translate(2px, -2px) } 100% { transform: translate(0) } }`,
  react: `export default function CyberpunkGlitchButton() { return <button className="px-6 py-3 text-base font-bold text-[#ff0] uppercase tracking-[3px] bg-[#111] border-2 border-[#ff0] rounded-none cursor-pointer relative overflow-hidden hover:animate-[glitch_0.3s_cubic-bezier(.25,.46,.45,.94)_both_infinite]">GLITCH<span aria-hidden>_</span><style>{\`@keyframes glitch { 0% { transform: translate(0) } 20% { transform: translate(-2px, 2px) } 40% { transform: translate(-2px, -2px) } 60% { transform: translate(2px, 2px) } 80% { transform: translate(2px, -2px) } 100% { transform: translate(0) } }\`}</style></button>; }`
});

// 4. Liquid Fill Button
add({
  id: "liquid-fill-button",
  name: "Liquid Fill Button",
  category: "Buttons",
  tags: ["hover", "animation", "creative"],
  description: "On hover, a wave/liquid animation fills the button from bottom to top",
  html: `<button class="liquid-btn"><span>Liquid</span></button>`,
  css: `.liquid-btn { padding: 12px 24px; font-size: 16px; font-weight: bold; color: #0f0; background: transparent; border: 2px solid #0f0; border-radius: 8px; cursor: pointer; text-transform: uppercase; letter-spacing: 2px; position: relative; overflow: hidden; transition: 0.5s; } .liquid-btn span { position: relative; z-index: 1; } .liquid-btn::before { content: ''; position: absolute; top: 100%; left: 0; width: 100%; height: 100%; background: #0f0; transition: 0.5s; border-radius: 50% 50% 0 0; } .liquid-btn:hover { color: #000; } .liquid-btn:hover::before { top: 0; border-radius: 0; }`,
  react: `export default function LiquidFillButton() { return <button className="group px-6 py-3 text-base font-bold text-[#0f0] uppercase tracking-widest bg-transparent border-2 border-[#0f0] rounded-lg cursor-pointer relative overflow-hidden transition-all duration-500 hover:text-black"><span className="relative z-10">Liquid</span><div className="absolute top-full left-0 w-full h-full bg-[#0f0] transition-all duration-500 rounded-t-[50%] group-hover:top-0 group-hover:rounded-none"></div></button>; }`
});

// 5. Magnetic Pull Button
add({
  id: "magnetic-pull-button",
  name: "Magnetic Pull Button",
  category: "Buttons",
  tags: ["interactive", "animation", "3D", "hover"],
  description: "Uses JS to track mouse position and slightly translate the button toward cursor.",
  html: `<button class="mag-btn" id="magBtn">Magnetic</button>`,
  css: `.mag-btn { padding: 15px 30px; font-size: 16px; font-weight: bold; color: #fff; background: #333; border: none; border-radius: 30px; cursor: pointer; transition: transform 0.1s; box-shadow: 0 10px 20px rgba(0,0,0,0.5); text-transform: uppercase; letter-spacing: 1px; }`,
  js: `const btn = document.getElementById('magBtn');\nbtn.addEventListener('mousemove', (e) => {\n  const rect = btn.getBoundingClientRect();\n  const x = e.clientX - rect.left - rect.width / 2;\n  const y = e.clientY - rect.top - rect.height / 2;\n  btn.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;\n});\nbtn.addEventListener('mouseleave', () => {\n  btn.style.transform = 'translate(0, 0)';\n  btn.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';\n});\nbtn.addEventListener('mouseenter', () => {\n  btn.style.transition = 'none';\n});`,
  react: `import { useRef } from 'react';\nexport default function MagneticPullButton() {\n  const btnRef = useRef(null);\n  const handleMouseMove = (e) => {\n    if (!btnRef.current) return;\n    const rect = btnRef.current.getBoundingClientRect();\n    const x = e.clientX - rect.left - rect.width / 2;\n    const y = e.clientY - rect.top - rect.height / 2;\n    btnRef.current.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;\n  };\n  const handleMouseLeave = () => {\n    if (!btnRef.current) return;\n    btnRef.current.style.transform = 'translate(0, 0)';\n    btnRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';\n  };\n  const handleMouseEnter = () => {\n    if (!btnRef.current) return;\n    btnRef.current.style.transition = 'none';\n  };\n  return (\n    <button \n      ref={btnRef}\n      onMouseMove={handleMouseMove}\n      onMouseLeave={handleMouseLeave}\n      onMouseEnter={handleMouseEnter}\n      className="px-8 py-4 text-base font-bold text-white uppercase tracking-wide bg-[#333] border-none rounded-full cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.5)]"\n    >\n      Magnetic\n    </button>\n  );\n}`
});

const categories = [
  { name: "Buttons", count: 15, prefix: "btn", tags: ["hover", "animation", "button"] },
  { name: "Cards", count: 15, prefix: "card", tags: ["layout", "ui", "card"] },
  { name: "Inputs", count: 12, prefix: "input", tags: ["form", "interactive", "input"] },
  { name: "Loaders", count: 15, prefix: "loader", tags: ["animation", "loading", "spinner"] },
  { name: "Animations", count: 10, prefix: "anim", tags: ["motion", "effect", "animation"] },
  { name: "Hover Effects", count: 10, prefix: "hover", tags: ["interaction", "hover", "effect"] },
  { name: "Layouts", count: 10, prefix: "layout", tags: ["structure", "grid", "layout"] },
  { name: "Text Effects", count: 10, prefix: "text", tags: ["typography", "effect", "text"] },
  { name: "Misc Components", count: 6, prefix: "misc", tags: ["ui", "widget", "misc"] }
];

let idCounter = 6;
const colors = ['#0ff', '#f0f', '#0f0', '#ff0', '#f00', '#00f'];

categories.forEach(cat => {
  for (let i = 0; i < cat.count; i++) {
    const color = colors[i % colors.length];
    const compId = `${cat.prefix}-${i + 1}`;
    
    let html = '';
    let css = '';
    let react = '';
    
    if (cat.name === "Buttons") {
      html = `<button class="${compId}">Button ${i+1}</button>`;
      css = `.${compId} { padding: 12px 24px; font-size: 16px; font-weight: bold; color: #fff; background: transparent; border: 2px solid ${color}; border-radius: 8px; cursor: pointer; transition: 0.3s; text-transform: uppercase; } .${compId}:hover { background: ${color}; color: #000; box-shadow: 0 0 15px ${color}; transform: translateY(-2px); }`;
      react = `export default function Button${i+1}() { return <button className="px-6 py-3 text-base font-bold text-white uppercase bg-transparent border-2 border-[${color}] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[${color}] hover:text-black hover:shadow-[0_0_15px_${color}] hover:-translate-y-0.5">Button ${i+1}</button>; }`;
    } else if (cat.name === "Cards") {
      html = `<div class="${compId}"><h3>Card ${i+1}</h3><p>Visually stunning card content.</p></div>`;
      css = `.${compId} { padding: 30px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; color: #fff; width: 300px; backdrop-filter: blur(10px); transition: 0.3s; border-top: 4px solid ${color}; } .${compId}:hover { transform: translateY(-10px); box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${color}33; } .${compId} h3 { margin-top: 0; color: ${color}; }`;
      react = `export default function Card${i+1}() { return <div className="p-8 bg-white/5 border border-white/10 border-t-4 border-t-[${color}] rounded-2xl text-white w-[300px] backdrop-blur-md transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_${color}33]"><h3 className="mt-0 text-[${color}] text-xl font-bold mb-4">Card ${i+1}</h3><p className="text-white/80">Visually stunning card content.</p></div>; }`;
    } else if (cat.name === "Loaders") {
      html = `<div class="${compId}"></div>`;
      css = `.${compId} { width: 50px; height: 50px; border: 5px solid rgba(255,255,255,0.1); border-top-color: ${color}; border-radius: 50%; animation: spin-${i} 1s linear infinite; } @keyframes spin-${i} { to { transform: rotate(360deg); } }`;
      react = `export default function Loader${i+1}() { return <div className="w-[50px] h-[50px] border-[5px] border-white/10 border-t-[${color}] rounded-full animate-spin"></div>; }`;
    } else if (cat.name === "Inputs") {
      html = `<input type="text" class="${compId}" placeholder="Enter text..." />`;
      css = `.${compId} { padding: 15px 20px; font-size: 16px; color: #fff; background: #111; border: 1px solid #333; border-radius: 8px; outline: none; transition: 0.3s; width: 250px; } .${compId}:focus { border-color: ${color}; box-shadow: 0 0 15px ${color}40; }`;
      react = `export default function Input${i+1}() { return <input type="text" placeholder="Enter text..." className="px-5 py-4 text-base text-white bg-[#111] border border-[#333] rounded-lg outline-none transition-all duration-300 w-[250px] focus:border-[${color}] focus:shadow-[0_0_15px_${color}40]" />; }`;
    } else if (cat.name === "Text Effects") {
      html = `<h1 class="${compId}">Neon Text ${i+1}</h1>`;
      css = `.${compId} { font-size: 3rem; font-weight: 900; color: #fff; text-shadow: 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}; animation: pulse-${i} 2s infinite; margin: 0; } @keyframes pulse-${i} { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; text-shadow: 0 0 5px ${color}, 0 0 10px ${color}; } }`;
      react = `export default function TextEffect${i+1}() { return <h1 className="text-5xl font-black text-white m-0 animate-pulse" style={{ textShadow: '0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}' }}>Neon Text ${i+1}</h1>; }`;
    } else {
      html = `<div class="${compId}">Component ${i+1}</div>`;
      css = `.${compId} { padding: 20px; background: ${color}22; border: 1px solid ${color}; color: ${color}; border-radius: 8px; font-weight: bold; text-align: center; }`;
      react = `export default function Component${i+1}() { return <div className="p-5 bg-[${color}22] border border-[${color}] text-[${color}] rounded-lg font-bold text-center">Component ${i+1}</div>; }`;
    }

    add({
      id: compId,
      name: `${cat.name.slice(0, -1)} ${i + 1}`,
      category: cat.name,
      tags: cat.tags,
      description: `A visually stunning ${cat.name.toLowerCase()} component.`,
      html,
      css,
      react
    });
    idCounter++;
  }
});

fs.writeFileSync('data/components.json', JSON.stringify(components, null, 2));
console.log(`Generated ${components.length} components.`);
