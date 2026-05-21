/* App orchestration + Tweaks panel */

const TWEAK_DEFAULTS = (() => {
  try { return JSON.parse(document.getElementById('tweak-defaults').textContent.match(/\{[\s\S]*\}/)[0]); }
  catch { return { hero: 'editorial', typo: 'minimal', color: ['#1C1A17', '#B89968', '#F2EEE6'] }; }
})();

const FONT_MAP = {
  serif:   { display: '"Noto Serif KR", "Gowun Batang", serif',  body: '"Pretendard", "IBM Plex Sans KR", sans-serif' },
  modern:  { display: '"IBM Plex Sans KR", "Pretendard", sans-serif', body: '"Pretendard", "IBM Plex Sans KR", sans-serif' },
  minimal: { display: '"Pretendard", sans-serif',                body: '"Pretendard", sans-serif' },
};

/* Color schemes — palette[0]=ink, [1]=gold, [2]=bg */
const SCHEMES = [
  {
    key: 'charcoal', label: '차콜',
    palette: ['#1C1A17', '#B89968', '#F2EEE6'],
    vars: {
      '--bg': '#F2EEE6', '--bg-alt': '#E6E0D2', '--paper': '#FBF9F4',
      '--ink': '#1C1A17', '--ink-2': '#4A4842', '--muted': '#8A8780', '--line': '#D8D1C0',
      '--gold': '#B89968', '--gold-deep': '#8C6D40', '--gold-soft': '#E8DDC4',
    },
  },
  {
    key: 'midnight', label: '미드나잇',
    palette: ['#172238', '#BD9962', '#F1EDE3'],
    vars: {
      '--bg': '#F1EDE3', '--bg-alt': '#E4DECB', '--paper': '#FBF8F0',
      '--ink': '#172238', '--ink-2': '#3E4A63', '--muted': '#7A8499', '--line': '#D2CCBC',
      '--gold': '#BD9962', '--gold-deep': '#8B6E3C', '--gold-soft': '#EBDDBE',
    },
  },
  {
    key: 'graphite', label: '그래파이트',
    palette: ['#0F0F0E', '#A8895A', '#FFFFFF'],
    vars: {
      '--bg': '#FFFFFF', '--bg-alt': '#F2F1ED', '--paper': '#FFFFFF',
      '--ink': '#0F0F0E', '--ink-2': '#3D3D3A', '--muted': '#86857F', '--line': '#D6D4CD',
      '--gold': '#A8895A', '--gold-deep': '#7C6132', '--gold-soft': '#E3D3B2',
    },
  },
  {
    key: 'forest', label: '포레스트',
    palette: ['#1F2A26', '#B8985F', '#F0EEE5'],
    vars: {
      '--bg': '#F0EEE5', '--bg-alt': '#DDD9CB', '--paper': '#F9F7F0',
      '--ink': '#1F2A26', '--ink-2': '#3F4C47', '--muted': '#7A857F', '--line': '#CFCFBE',
      '--gold': '#B8985F', '--gold-deep': '#8A7038', '--gold-soft': '#E6D8B7',
    },
  },
  {
    key: 'warm', label: '웜 브라운',
    palette: ['#3E2A1E', '#CFB07E', '#F5EFE2'],
    vars: {
      '--bg': '#F5EFE2', '--bg-alt': '#EDE3CE', '--paper': '#FBF6EC',
      '--ink': '#3E2A1E', '--ink-2': '#6B5240', '--muted': '#8F7860', '--line': '#E0D2B5',
      '--gold': '#CFB07E', '--gold-deep': '#A88751', '--gold-soft': '#ECDDBE',
    },
  },
];
const findScheme = (palette) =>
  SCHEMES.find(s => JSON.stringify(s.palette) === JSON.stringify(palette)) || SCHEMES[0];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Font CSS variables
  React.useEffect(() => {
    const map = FONT_MAP[t.typo] || FONT_MAP.minimal;
    document.documentElement.style.setProperty('--font-display', map.display);
    document.documentElement.style.setProperty('--font-body', map.body);
  }, [t.typo]);

  // Color CSS variables
  React.useEffect(() => {
    const scheme = findScheme(t.color);
    Object.entries(scheme.vars).forEach(([k, v]) =>
      document.documentElement.style.setProperty(k, v)
    );
  }, [Array.isArray(t.color) ? t.color.join('|') : t.color]);

  const ctxValue = React.useMemo(
    () => ({ typo: t.typo, hero: t.hero, color: t.color }),
    [t.typo, t.hero, t.color]
  );

  return (
    <PageCtx.Provider value={ctxValue}>
      <Nav />
      <Hero key={t.hero}/>
      <TrustStrip />
      <Stats />
      <Manifesto />
      <WhyUs />
      <Services />
      <Process />
      <Cases />
      <About />
      <FAQ />
      <Apply />
      <Footer />
      <StickyCta />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color scheme"/>
        <TweakColor
          label="컬러 팔레트"
          value={t.color}
          options={SCHEMES.map(s => s.palette)}
          onChange={(v) => setTweak('color', v)}
        />
        <div className="twk-row" style={{ fontSize: 10.5, color: 'rgba(41,38,27,.55)', lineHeight: 1.4, padding: '2px 0' }}>
          좌→우: 차콜 / 미드나잇 / 그래파이트 / 포레스트 / 웜
        </div>

        <TweakSection label="Hero variant"/>
        <TweakRadio
          label="히어로 스타일"
          value={t.hero}
          options={[
            { value: 'editorial', label: '에디토리얼' },
            { value: 'statement', label: '스테이트먼트' },
            { value: 'split',     label: '스플릿' },
          ]}
          onChange={(v) => setTweak('hero', v)}
        />

        <TweakSection label="Typography"/>
        <TweakRadio
          label="타이포 페어링"
          value={t.typo}
          options={[
            { value: 'minimal', label: 'Minimal' },
            { value: 'serif',   label: 'Serif' },
            { value: 'modern',  label: 'Modern' },
          ]}
          onChange={(v) => setTweak('typo', v)}
        />
      </TweaksPanel>
    </PageCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
