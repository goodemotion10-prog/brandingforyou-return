/* Shared atoms — gold × brown brand system */
const { useState, useEffect, useRef, useMemo } = React;

/* ---------- Reveal on scroll (with IO + fallback) ---------- */
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let revealed = false;
    const showIt = () => {
      if (revealed) return;
      revealed = true;
      el.classList.add('in');
    };
    // Immediate reveal if already in viewport on mount
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setTimeout(showIt, delay);
    }
    // IO for elements that scroll into view
    let io;
    try {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(showIt, delay);
            io && io.unobserve(el);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      io.observe(el);
    } catch {}
    // Safety fallback — guarantee reveal after a beat
    const t = setTimeout(showIt, Math.max(delay, 0) + 800);
    return () => { clearTimeout(t); io && io.disconnect(); };
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

/* ---------- Logo / brand mark ---------- */
function BrandMark({ variant = 'horizontal', size = 40, light = false }) {
  // variant: 'horizontal' | 'symbol' | 'stacked'
  const src = variant === 'symbol'
    ? 'assets/symbol.png'
    : variant === 'stacked'
      ? 'assets/logo-stacked.png'
      : 'assets/logo-horizontal.png';
  const h = size;
  const style = {
    height: h, width: 'auto', objectFit: 'contain',
    filter: light ? 'brightness(1.15) saturate(0.7)' : 'none',
  };
  return <img src={src} alt="브랜딩포유" style={style} />;
}

/* ---------- Buttons ---------- */
function Button({ children, variant = 'primary', size = 'md', icon, onClick, type = 'button', style, full, href }) {
  const palettes = {
    primary: { bg: 'var(--ink)',  fg: 'var(--paper)', border: 'var(--ink)' },
    gold:    { bg: 'var(--gold)', fg: 'var(--ink)',   border: 'var(--gold)' },
    ghost:   { bg: 'transparent', fg: 'var(--ink)',   border: 'var(--ink)' },
    soft:    { bg: 'var(--gold-soft)', fg: 'var(--ink)', border: 'var(--gold-soft)' },
    kakao:   { bg: '#FEE500',     fg: '#191600',      border: '#FEE500' },
    dark:    { bg: 'var(--ink)',  fg: 'var(--paper)', border: 'var(--ink)' },
  };
  const sizes = {
    sm: { pad: '10px 16px', fs: 14, h: 38 },
    md: { pad: '14px 22px', fs: 15, h: 48 },
    lg: { pad: '18px 28px', fs: 16, h: 58 },
  };
  const p = palettes[variant] || palettes.primary;
  const s = sizes[size] || sizes.md;
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      type={href ? undefined : type}
      href={href}
      onClick={onClick}
      style={{
        background: p.bg, color: p.fg, border: `1.5px solid ${p.border}`,
        padding: s.pad, fontSize: s.fs, minHeight: s.h,
        borderRadius: 999, fontWeight: 600,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        width: full ? '100%' : 'auto',
        textDecoration: 'none',
        transition: 'transform .15s ease, box-shadow .2s ease, background .2s ease',
        cursor: 'pointer',
        ...style,
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={(e) => e.currentTarget.style.transform = ''}
      onMouseLeave={(e) => e.currentTarget.style.transform = ''}
    >
      {children}
      {icon}
    </Tag>
  );
}

const ArrowIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ---------- Tag / pill ---------- */
function Tag({ children, tone = 'default' }) {
  const tones = {
    default: { bg: 'var(--paper)', fg: 'var(--ink)', bd: 'var(--line)' },
    gold:    { bg: 'var(--gold-soft)', fg: 'var(--ink)', bd: 'transparent' },
    dark:    { bg: 'var(--ink)', fg: 'var(--gold)', bd: 'var(--ink)' },
    outline: { bg: 'transparent', fg: 'var(--ink)', bd: 'var(--ink)' },
  };
  const t = tones[tone] || tones.default;
  return (
    <span className="mono" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', borderRadius: 999,
      background: t.bg, color: t.fg, border: `1px solid ${t.bd}`,
      fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
      fontWeight: 500,
    }}>{children}</span>
  );
}

/* ---------- Section header ---------- */
function SectionHeader({ kicker, title, sub, align = 'left', dark = false }) {
  return (
    <div style={{ textAlign: align, maxWidth: 760, marginInline: align === 'center' ? 'auto' : 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: align === 'center' ? 'center' : 'flex-start', marginBottom: 18 }}>
        <span style={{ width: 28, height: 1, background: dark ? 'var(--gold)' : 'var(--ink)' }}/>
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: dark ? 'var(--gold)' : 'var(--ink-2)' }}>{kicker}</span>
      </div>
      <h2 className="display" style={{ fontSize: 'clamp(30px, 4.6vw, 60px)', margin: 0, color: dark ? 'var(--paper)' : 'var(--ink)' }}>
        {title}
      </h2>
      {sub && <p style={{ marginTop: 22, fontSize: 17, color: dark ? 'rgba(251,246,236,.78)' : 'var(--ink-2)', maxWidth: 620, lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

/* ---------- Stat ---------- */
function Stat({ value, unit, label, suffix, dark = false }) {
  return (
    <div>
      <div className="display" style={{ fontSize: 'clamp(44px, 6vw, 80px)', lineHeight: 1, color: dark ? 'var(--gold)' : 'var(--ink)' }}>
        {value}<span style={{ fontSize: '0.42em', color: dark ? 'var(--paper)' : 'var(--ink)', marginLeft: 4, opacity: 0.7 }}>{unit}</span>
      </div>
      <div className="mono" style={{ marginTop: 14, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: dark ? 'rgba(251,246,236,.6)' : 'var(--ink-2)' }}>{label}</div>
      {suffix && <div style={{ fontSize: 13, color: dark ? 'rgba(251,246,236,.5)' : 'var(--muted)', marginTop: 6 }}>{suffix}</div>}
    </div>
  );
}

/* ---------- Stripe placeholder ---------- */
function StripePlaceholder({ ratio = '4/5', label = 'placeholder', tone = 'warm' }) {
  const colors = tone === 'dark' ? ['#2A1E14', '#352818'] : ['#E6D6B6', '#DCC8A0'];
  return (
    <div style={{
      aspectRatio: ratio, width: '100%',
      background: `repeating-linear-gradient(135deg, ${colors[0]} 0 12px, ${colors[1]} 12px 24px)`,
      borderRadius: 4,
      display: 'flex', alignItems: 'flex-end', padding: 16,
      position: 'relative', overflow: 'hidden',
    }}>
      <span className="mono" style={{
        fontSize: 11, letterSpacing: '0.08em',
        background: 'var(--ink)', color: 'var(--paper)',
        padding: '4px 8px', borderRadius: 2,
      }}>{label}</span>
    </div>
  );
}

/* ---------- Marquee ---------- */
function Marquee({ items, speed = 50 }) {
  return (
    <div style={{ overflow: 'hidden', borderBlock: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
      <div style={{
        display: 'flex', gap: 48, padding: '18px 0',
        animation: `bfy-marquee ${speed}s linear infinite`,
        width: 'max-content',
      }}>
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="mono" style={{ fontSize: 13, letterSpacing: '0.08em', color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--gold)' }}/>
            {item}
          </div>
        ))}
      </div>
      <style>{`@keyframes bfy-marquee { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }`}</style>
    </div>
  );
}

/* ---------- Tweaks-driven font/hero context ---------- */
const PageCtx = React.createContext({
  typo: 'serif',
  hero: 'editorial',
});

Object.assign(window, { Reveal, BrandMark, Button, ArrowIcon, Tag, SectionHeader, Stat, StripePlaceholder, Marquee, PageCtx });
