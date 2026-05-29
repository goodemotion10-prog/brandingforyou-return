/* Landing page — top sections (Nav, Hero variants, Trust, Stats, Manifesto) */

/* ============ NAV ============ */
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const items = [
    ['차별점', '#why'],
    ['서비스', '#services'],
    ['프로세스', '#process'],
    ['사례', '#cases'],
    ['FAQ', '#faq'],
  ];
  const go = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'color-mix(in srgb, var(--bg) 92%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'all .3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px' }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); }} style={{ textDecoration: 'none' }}>
          <BrandMark variant="horizontal" size={36} />
        </a>
        <nav className="bfy-nav-links" style={{ display: 'flex', gap: 32 }}>
          {items.map(([label, href]) => (
            <a key={href} href={href} onClick={(e) => { e.preventDefault(); go(href); }}
               style={{ textDecoration: 'none', fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>{label}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href="tel:070-4101-8253" className="bfy-nav-phone mono" style={{
            fontSize: 13, color: 'var(--ink)', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500,
          }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3.5 2C3 2 2.5 2.5 2.5 3v1.5c0 5 4 9 9 9H13c.5 0 1-.5 1-1v-2c0-.5-.4-.9-.9-1l-2.1-.5c-.4-.1-.8.1-1 .4l-.7 1c-2-.9-3.6-2.5-4.5-4.5l1-.7c.3-.2.5-.6.4-1L4.7 2.9c-.1-.5-.5-.9-1-.9H3.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
            070-4101-8253
          </a>
          <Button size="sm" variant="primary" onClick={() => go('#apply')} icon={<ArrowIcon size={14}/>}>
            무료 상담
          </Button>
          <button className="bfy-burger" onClick={() => setMobileOpen(!mobileOpen)} style={{
            background: 'none', border: '1px solid var(--ink)', borderRadius: 999,
            width: 38, height: 38, display: 'none', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={mobileOpen ? "M4 4 L12 12 M12 4 L4 12" : "M3 5 H 13 M3 11 H 13"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      {/* mobile menu */}
      {mobileOpen && (
        <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)', padding: '12px 20px 20px' }}>
          {items.map(([l, h]) => (
            <a key={h} href={h} onClick={(e) => { e.preventDefault(); go(h); }}
               style={{ display: 'block', padding: '12px 4px', fontSize: 16, color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--line)' }}>{l}</a>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 880px) {
          .bfy-nav-links, .bfy-nav-phone { display: none !important; }
          .bfy-burger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

/* ============ HERO — three variants ============ */
function Hero() {
  const ctx = React.useContext(PageCtx);
  if (ctx.hero === 'statement') return <HeroStatement />;
  if (ctx.hero === 'split')     return <HeroSplit />;
  return <HeroEditorial />;
}

/* --- Variant A: Editorial (asymmetric) --- */
function HeroEditorial() {
  return (
    <section id="top" style={{ position: 'relative', paddingTop: 140, paddingBottom: 100, overflow: 'hidden' }}>
      {/* deco arc — riff on logo */}
      <svg aria-hidden style={{
        position: 'absolute', top: 80, right: -160, width: 720, height: 720, opacity: 0.5,
      }} viewBox="0 0 400 400" fill="none">
        {[200, 165, 130, 95].map((r, i) => (
          <path key={i} d={`M ${200-r} 220 A ${r} ${r} 0 0 1 ${200+r} 220`} stroke="var(--gold)" strokeWidth="1.8" opacity={0.5 - i*0.08}/>
        ))}
        <circle cx="200" cy="180" r="36" fill="var(--gold)" opacity="0.35"/>
      </svg>

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, alignItems: 'end' }} className="bfy-hero-grid">
          <div>
            <Reveal>
              <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
                <Tag tone="gold">For 희망리턴패키지 합격사</Tag>
                <Tag>2026 마케팅 파트너 모집중</Tag>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="display" style={{ fontSize: 'clamp(40px, 7vw, 92px)', margin: 0, lineHeight: 1.0 }}>
                합격을<br/>
                축하드립니다.<br/>
                <span style={{ display: 'inline-block' }}>
                  이제는,
                </span>
                <br/>
                <span className="bfy-hl" style={{ color: 'var(--ink)' }}>마케팅</span>입니다.
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p style={{ marginTop: 36, fontSize: 19, color: 'var(--ink-2)', maxWidth: 560, lineHeight: 1.65 }}>
                항목만 채우는 마케팅은 수행기간이 끝나면 그대로 멈춥니다.<br/>
                브랜딩포유는 <strong style={{ color: 'var(--ink)' }}>상담 포함 10곳 이상과 함께, 담당 업체 전원 100% 수행</strong>,
                수행기간이 끝난 후에도 마케팅을 함께 이어간 업체가 있었던,
                책임감 있게 끝까지 함께하는 마케팅 파트너입니다.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button size="lg" variant="primary" onClick={() => document.getElementById('apply')?.scrollIntoView({behavior:'smooth'})} icon={<ArrowIcon/>}>
                  무료 상담 받기
                </Button>
                <Button size="lg" variant="ghost" onClick={() => document.getElementById('why')?.scrollIntoView({behavior:'smooth'})}>
                  왜 브랜딩포유인가
                </Button>
              </div>
            </Reveal>
            <Reveal delay={500}>
              <div style={{ marginTop: 56, display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                <MiniStat n="100" u="%" l="2025 수행률" />
                <MiniStat n="10" u="+" l="담당·상담 업체" />
                <MiniStat n="6+" u="개월" l="이상 지속 사례" />
              </div>
            </Reveal>
          </div>

          {/* Right card */}
          <Reveal delay={300}>
            <HeroQuickCard />
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) { .bfy-hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; } }
      `}</style>
    </section>
  );
}

/* --- Variant B: Statement (centered massive) --- */
function HeroStatement() {
  return (
    <section id="top" style={{ position: 'relative', paddingTop: 160, paddingBottom: 80, overflow: 'hidden', textAlign: 'center' }}>
      <Reveal>
        <div style={{ display: 'inline-flex', gap: 8, marginBottom: 32 }}>
          <Tag tone="gold">For 희망리턴패키지 합격사</Tag>
        </div>
      </Reveal>
      <div className="container" style={{ position: 'relative' }}>
        {/* big symbol behind */}
        <div aria-hidden style={{
          position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)',
          width: 'min(720px, 90vw)', opacity: 0.18, pointerEvents: 'none',
        }}>
          <BrandMark variant="symbol" size={600}/>
        </div>
        <Reveal delay={120}>
          <h1 className="display" style={{
            fontSize: 'clamp(44px, 9vw, 132px)', margin: 0, lineHeight: 0.96, position: 'relative',
            letterSpacing: '-0.03em',
          }}>
            진짜 마케팅을<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--gold-deep)' }}>아는 곳</span>과<br/>
            함께하세요.
          </h1>
        </Reveal>
        <Reveal delay={280}>
          <p style={{ margin: '40px auto 0', fontSize: 19, color: 'var(--ink-2)', maxWidth: 640, lineHeight: 1.7, position: 'relative' }}>
            희망리턴패키지 합격은 시작입니다.<br/>
            정해진 항목을 채우는 마케팅이 아니라, 사장님의 매출을 만드는 마케팅을 약속드립니다.
          </p>
        </Reveal>
        <Reveal delay={420}>
          <div style={{ marginTop: 44, display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button size="lg" variant="primary" onClick={() => document.getElementById('apply')?.scrollIntoView({behavior:'smooth'})} icon={<ArrowIcon/>}>무료 상담 받기</Button>
            <Button size="lg" variant="ghost" onClick={() => document.getElementById('why')?.scrollIntoView({behavior:'smooth'})}>차별점 보기</Button>
          </div>
        </Reveal>
        <Reveal delay={560}>
          <div style={{ marginTop: 80, display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
            <MiniStat n="100" u="%" l="2025 수행률" />
            <MiniStat n="7" u="개" l="2025 담당 업체" />
            <MiniStat n="6+" u="개월" l="이상 지속 사례" />
            <MiniStat n="8" u="개" l="올인원 채널" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Variant C: Split (text | symbol) --- */
function HeroSplit() {
  return (
    <section id="top" style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="bfy-hero-grid">
          <div>
            <Reveal><Tag tone="gold">For 희망리턴패키지 합격사</Tag></Reveal>
            <Reveal delay={120}>
              <h1 className="display" style={{ fontSize: 'clamp(40px, 6.4vw, 88px)', margin: '20px 0 32px', lineHeight: 1.02 }}>
                채우는<br/>
                마케팅이 아닌,<br/>
                <span style={{ color: 'var(--gold-deep)' }}>매출을 만드는</span><br/>
                마케팅.
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p style={{ fontSize: 18, color: 'var(--ink-2)', maxWidth: 480, lineHeight: 1.7 }}>
                희망리턴패키지 합격을 축하드립니다.
                이제 가장 중요한 결정 — 어떤 마케팅 업체와 함께하시겠습니까?
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button size="lg" variant="primary" onClick={() => document.getElementById('apply')?.scrollIntoView({behavior:'smooth'})} icon={<ArrowIcon/>}>무료 상담 받기</Button>
                <Button size="lg" variant="ghost" onClick={() => document.getElementById('why')?.scrollIntoView({behavior:'smooth'})}>차별점 보기</Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div style={{ position: 'relative', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BrandMark variant="symbol" size={420}/>
              {/* floating badges */}
              <div style={{ position: 'absolute', top: '12%', left: '4%', background: 'var(--ink)', color: 'var(--paper)', padding: '12px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, boxShadow: '0 12px 24px -8px rgba(62,42,30,.3)' }}>
                2025 수행률 100%
              </div>
              <div style={{ position: 'absolute', bottom: '14%', right: '2%', background: 'var(--gold)', color: 'var(--ink)', padding: '12px 18px', borderRadius: 999, fontSize: 13, fontWeight: 700, boxShadow: '0 12px 24px -8px rgba(207,176,126,.5)' }}>
                7개 업체 전원 만족
              </div>
              <div style={{ position: 'absolute', bottom: '40%', left: '-8%', background: 'var(--paper)', color: 'var(--ink)', padding: '10px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600, border: '1px solid var(--line)' }}>
                대표 직접 컨설팅
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) { .bfy-hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; } }
      `}</style>
    </section>
  );
}

/* --- Hero quick-card (used by editorial) --- */
function HeroQuickCard() {
  const services = ['블로그', '인스타그램', '유튜브', '바이럴', '스마트스토어', '랜딩페이지', '홈페이지', '로고'];
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        background: 'var(--paper)', borderRadius: 6,
        padding: 28, border: '1px solid var(--line)',
        boxShadow: '0 30px 60px -30px rgba(62,42,30,0.2)',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase' }}>All-in-one</div>
            <div className="display" style={{ fontSize: 22, marginTop: 6 }}>마케팅 풀패키지</div>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--gold-deep)', border: '1px solid var(--gold)', padding: '4px 8px', borderRadius: 999 }}>8 CHANNELS</div>
        </div>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {services.map((s, i) => (
            <div key={s} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0', borderTop: i === 0 ? 'none' : '1px dashed var(--line)',
              fontSize: 14.5,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', width: 22 }}>0{i+1}</span>
                <span style={{ fontWeight: 500 }}>{s}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7 L5.5 10.5 L12 4" stroke="var(--gold-deep)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 22, padding: 14, background: 'var(--bg-alt)', borderRadius: 4,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>전 채널 통합 운영</div>
          <div className="display" style={{ fontSize: 18, color: 'var(--ink)' }}>One Team</div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ n, u, l }) {
  return (
    <div>
      <div className="display" style={{ fontSize: 32, lineHeight: 1, color: 'var(--ink)' }}>
        {n}<span style={{ fontSize: '0.55em', marginLeft: 3, color: 'var(--gold-deep)' }}>{u}</span>
      </div>
      <div className="mono" style={{ marginTop: 8, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>{l}</div>
    </div>
  );
}

/* ============ TRUST MARQUEE ============ */
function TrustStrip() {
  const items = [
    '2025년 담당 업체 7곳 전원 100% 수행',
    '블로그·인스타·유튜브·스마트스토어 통합 운영',
    '랜딩페이지·홈페이지·로고 제작 포함',
    '수행기간 종료 후에도 끝까지 책임지는 마케팅',
    '대표가 직접 찾아가는 1:1 컨설팅',
    '사장님 매출에 도움되는 진짜 제안',
  ];
  return <Marquee items={items} speed={55}/>;
}

/* ============ STATS ============ */
function Stats() {
  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <Reveal>
          <SectionHeader
            kicker="By the numbers"
            title={<>숫자가<br/>증명합니다</>}
            sub="2025년, 브랜딩포유와 함께한 모든 사장님이 만족하셨습니다."
          />
        </Reveal>
        <div style={{
          marginTop: 80,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
          borderTop: '1px solid var(--line)', paddingTop: 60,
        }} className="bfy-stats-grid">
          <Reveal delay={0}><Stat value="100" unit="%" label="2025 수행률" suffix="담당 업체 7곳 전원"/></Reveal>
          <Reveal delay={100}><Stat value="6+" unit="개월" label="이상 지속한 사례" suffix="수행기간 후에도 함께"/></Reveal>
          <Reveal delay={200}><Stat value="8" unit="채널" label="올인원 마케팅" suffix="블로그~로고까지"/></Reveal>
          <Reveal delay={300}><Stat value="1:1" unit="" label="대표 직접 컨설팅" suffix="찾아가는 미팅"/></Reveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .bfy-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px 24px !important; }
        }
      `}</style>
    </section>
  );
}

/* ============ MANIFESTO — "채우기 vs 만들기" ============ */
function Manifesto() {
  return (
    <section style={{ padding: '120px 0', background: 'var(--paper)' }}>
      <div className="container">
        <Reveal>
          <SectionHeader
            kicker="Our manifesto"
            title={<>마케팅은 <span style={{ color: 'var(--gold-deep)' }}>"항목"</span>이 아닌<br/><span style={{ textDecoration: 'underline', textDecorationColor: 'var(--gold)', textDecorationThickness: 4, textUnderlineOffset: 8 }}>"매출"</span>로 증명되어야 합니다</>}
          />
        </Reveal>
        <div style={{
          marginTop: 64,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
        }} className="bfy-manifesto-grid">
          <Reveal delay={120}>
            <div style={{
              padding: 36, border: '1px solid var(--line)', borderRadius: 6,
              background: 'var(--bg)', position: 'relative',
            }}>
              <Tag>다른 곳</Tag>
              <h3 className="display" style={{ fontSize: 26, margin: '20px 0 18px', color: 'var(--muted)' }}>
                항목만 채우는 마케팅
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  '계약서에 적힌 게시물 수만 채워서 보고',
                  '수행기간 끝나면 마케팅도 종료',
                  '담당자가 자주 바뀌어 매번 처음부터',
                  '업체 사정과 무관한 천편일률 콘텐츠',
                ].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15, color: 'var(--muted)' }}>
                    <span style={{ flexShrink: 0, marginTop: 8, width: 14, height: 2, background: 'var(--muted)' }}/>
                    <span style={{ textDecoration: 'line-through', textDecorationThickness: 1.5 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div style={{
              padding: 36, borderRadius: 6,
              background: 'var(--ink)', color: 'var(--paper)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div aria-hidden style={{
                position: 'absolute', top: -40, right: -40, opacity: 0.15,
              }}><BrandMark variant="symbol" size={220} light/></div>
              <Tag tone="dark">브랜딩포유</Tag>
              <h3 className="display" style={{ fontSize: 26, margin: '20px 0 18px', color: 'var(--gold)', position: 'relative' }}>
                매출을 만드는 마케팅
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
                {[
                  '업체에 실제 도움되는 콘텐츠·전략 제안',
                  '수행기간 후에도 끝까지 책임지는 마케팅',
                  '대표가 직접 책임지고 동행',
                  '업종·상권·고객 분석 기반 맞춤 운영',
                ].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15.5 }}>
                    <span style={{
                      flexShrink: 0, marginTop: 3, width: 18, height: 18, borderRadius: 999,
                      background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5 L4 7 L8 3" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) { .bfy-manifesto-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

Object.assign(window, { Nav, Hero, TrustStrip, Stats, Manifesto });
