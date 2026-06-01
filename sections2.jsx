/* Why us, Services, Process, Cases, FAQ */

/* ============ WHY US ============ */
function WhyUs() {
  const reasons = [
    {
      num: '01',
      tag: '검증된 수행률',
      title: '2025년, 10곳 이상과 함께 100% 수행',
      desc: '지난해 함께한 모든 업체가 약속한 모든 마케팅을 완수했습니다. 단 한 곳도 빠짐없이.',
      stat: '100%',
      statLabel: '2025 수행률',
    },
    {
      num: '02',
      tag: '대표 직접 컨설팅',
      title: '대표가 직접 찾아가서 듣습니다',
      desc: '담당자가 매번 바뀌는 일은 없습니다. 대표가 직접 사장님 사업장을 방문해, 업종·상권·고객을 이해한 뒤 마케팅을 설계합니다.',
      stat: '1:1',
      statLabel: '대표 미팅',
    },
    {
      num: '03',
      tag: '올인원 8개 채널',
      title: '필요한 마케팅, 한 곳에서 다',
      desc: '블로그·인스타·유튜브·바이럴·스마트스토어·랜딩페이지·홈페이지·로고 — 다른 업체 따로 부르지 않으셔도 됩니다.',
      stat: '8',
      statLabel: '통합 채널',
    },
    {
      num: '04',
      tag: '계약 후에도 끝까지',
      title: '수행기간 끝나도 책임지고 동행합니다',
      desc: '계약이 종료되어도 사장님이 원하시는 한 끝까지 책임지는 게 저희 원칙입니다. 2025년에는 수행기간 이후에도 6개월 이상 함께한 업체도 있었습니다.',
      stat: '끝까지',
      statLabel: '책임지는 마케팅',
    },
  ];
  return (
    <section id="why" style={{ padding: '120px 0', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <Reveal>
          <SectionHeader
            kicker="Why 브랜딩포유"
            title={<>왜 브랜딩포유와<br/>함께해야 할까요</>}
            sub="다른 마케팅 업체와 무엇이 다른지, 네 가지로 정리해드립니다."
          />
        </Reveal>
        <div style={{
          marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24,
        }} className="bfy-why-grid">
          {reasons.map((r, i) => (
            <Reveal key={r.num} delay={i * 100}>
              <div className="bfy-why-card" style={{
                background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 6,
                padding: 36, height: '100%',
                display: 'grid', gridTemplateColumns: '1.5fr auto', gap: 24, alignItems: 'start',
                transition: 'border-color .2s ease, transform .25s ease',
              }}>
                <div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 22 }}>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--gold-deep)', letterSpacing: '0.14em' }}>{r.num}</span>
                    <Tag tone="gold">{r.tag}</Tag>
                  </div>
                  <h3 className="display" style={{ fontSize: 26, margin: '0 0 12px', lineHeight: 1.2 }}>{r.title}</h3>
                  <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 15.5, lineHeight: 1.65 }}>{r.desc}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="display" style={{ fontSize: 'clamp(40px, 5vw, 60px)', color: 'var(--gold-deep)', lineHeight: 1 }}>{r.stat}</div>
                  <div className="mono" style={{ marginTop: 8, fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{r.statLabel}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        .bfy-why-card:hover { border-color: var(--ink) !important; transform: translateY(-2px); }
        @media (max-width: 880px) {
          .bfy-why-grid { grid-template-columns: 1fr !important; }
          .bfy-why-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ============ SERVICES — All-in-one ============ */
function Services() {
  const services = [
    { code: 'BLOG', name: '블로그', desc: '블로그 콘텐츠 기획·발행·관리', deliver: '월 10-20건' },
    { code: 'IG',   name: '인스타그램', desc: '브랜드 톤 피드 + 릴스 운영', deliver: '월 8건 (기본)' },
    { code: 'YT',   name: '유튜브', desc: '쇼츠·롱폼 기획부터 편집까지', deliver: '월 4-8건' },
    { code: 'VRL',  name: '바이럴 마케팅', desc: '카페·커뮤니티 조직적 바이럴', deliver: '상담 필요' },
    { code: 'STR',  name: '스마트스토어', desc: '상세페이지 + 광고 운영', deliver: '풀세팅' },
    { code: 'LDP',  name: '랜딩페이지', desc: '광고 전용 전환 최적 페이지', deliver: '1식' },
    { code: 'WEB',  name: '홈페이지', desc: '브랜드 홈페이지 기획·제작', deliver: '1식' },
    { code: 'BR',   name: '로고·브랜딩', desc: '네이밍·로고·CI 가이드라인', deliver: '1식' },
  ];
  return (
    <section id="services" style={{
      padding: '120px 0', background: 'var(--ink)', color: 'var(--paper)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* arc deco */}
      <svg aria-hidden style={{
        position: 'absolute', top: -60, right: -120, width: 600, height: 600, opacity: 0.35,
      }} viewBox="0 0 400 400" fill="none">
        {[180, 150, 120, 90, 60].map((r, i) => (
          <path key={i} d={`M ${200-r} 220 A ${r} ${r} 0 0 1 ${200+r} 220`} stroke="var(--gold)" strokeWidth="1.4" opacity={0.45 - i*0.05}/>
        ))}
      </svg>
      <div className="container" style={{ position: 'relative' }}>
        <Reveal>
          <SectionHeader
            dark
            kicker="Services"
            title={<>희망리턴패키지 8개 채널,<br/><span style={{ color: 'var(--gold)' }}>한 팀이 다 합니다</span></>}
            sub="채널마다 다른 외주를 부르실 필요가 없습니다. 브랜드 톤이 일관되고, 커뮤니케이션도 한 번에 끝납니다."
          />
        </Reveal>

        {/* services as numbered list */}
        <div style={{ marginTop: 64, borderTop: '1px solid rgba(207,176,126,.25)' }}>
          {services.map((s, i) => (
            <Reveal key={s.code} delay={i * 60}>
              <div className="bfy-svc-row" style={{
                display: 'grid', gridTemplateColumns: '80px 120px 1fr 160px',
                padding: '28px 0', borderBottom: '1px solid rgba(207,176,126,.25)',
                alignItems: 'center', gap: 24,
                transition: 'background .2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(207,176,126,.06)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div className="mono" style={{ fontSize: 14, color: 'var(--gold)', letterSpacing: '0.12em' }}>0{i+1}</div>
                <div className="mono" style={{ fontSize: 12, padding: '4px 10px', border: '1px solid rgba(207,176,126,.4)', borderRadius: 4, color: 'var(--gold)', letterSpacing: '0.08em', justifySelf: 'start' }}>{s.code}</div>
                <div>
                  <div className="display" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', marginBottom: 6 }}>{s.name}</div>
                  <div style={{ fontSize: 14.5, color: 'rgba(251,246,236,.65)' }}>{s.desc}</div>
                </div>
                <div className="mono" style={{ fontSize: 12, color: 'rgba(251,246,236,.55)', letterSpacing: '0.08em', textAlign: 'right' }}>
                  <div style={{ color: 'var(--gold)' }}>DELIVER</div>
                  <div style={{ marginTop: 4 }}>{s.deliver}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={500}>
          <div style={{
            marginTop: 56, padding: '28px 32px', borderRadius: 6,
            background: 'rgba(207,176,126,.08)', border: '1px solid rgba(207,176,126,.25)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap',
          }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--gold)' }}>BUNDLE</div>
              <div style={{ marginTop: 4, fontSize: 18, fontWeight: 600 }}>희망리턴 항목에 맞춰 채널 조합을 자유롭게 구성해드립니다.</div>
            </div>
            <Button variant="gold" size="md" icon={<ArrowIcon size={14}/>} onClick={() => document.getElementById('apply')?.scrollIntoView({behavior:'smooth'})}>맞춤 견적 받기</Button>
          </div>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .bfy-svc-row { grid-template-columns: 60px 1fr !important; row-gap: 6px !important; }
          .bfy-svc-row > :nth-child(2) { display: none; }
          .bfy-svc-row > :nth-child(4) { grid-column: 2 !important; text-align: left !important; }
        }
      `}</style>
    </section>
  );
}

/* ============ PROCESS ============ */
function Process() {
  const steps = [
    { n: '01', title: '무료 상담 신청', desc: '카톡·전화·폼 중 편하신 방법으로 연락주세요. 영업일 24시간 내 회신드립니다.', time: 'D-day' },
    { n: '02', title: '대표 미팅 (방문 가능)', desc: '대표가 직접 사장님 사업장을 방문하거나 화상으로 상담합니다. 업종·상권·목표를 함께 정리합니다.', time: 'D+1~3' },
    { n: '03', title: '맞춤 마케팅 설계', desc: '희망리턴 항목에 맞춰 8개 채널 중 최적 조합과 콘텐츠 방향을 제안드립니다.', time: 'D+5~7' },
    { n: '04', title: '계약 + 운영 시작', desc: '계약 후 첫 콘텐츠가 7-10일 내 게재됩니다. 매달 운영 리포트를 받으십니다.', time: 'D+10' },
    { n: '05', title: '수행 + 끝까지 동행', desc: '수행기간이 끝나도 사장님이 원하시면 마케팅을 이어가드립니다. 2025년에는 6개월 이상 함께한 업체도 있었습니다.', time: '끝까지' },
  ];
  return (
    <section id="process" style={{ padding: '120px 0', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <Reveal>
          <SectionHeader
            kicker="Process"
            title={<>상담부터 사후관리까지,<br/>5단계로 충분합니다</>}
          />
        </Reveal>
        <div style={{ marginTop: 80, position: 'relative' }}>
          <div aria-hidden style={{
            position: 'absolute', left: 28, top: 12, bottom: 12,
            width: 1, background: 'var(--line)', zIndex: 0,
          }}/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36, position: 'relative' }}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="bfy-process-row" style={{
                  display: 'grid', gridTemplateColumns: '56px 1fr auto', gap: 28, alignItems: 'start',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'var(--bg)', border: '1.5px solid var(--ink)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'IBM Plex Mono, monospace', fontWeight: 600, fontSize: 14,
                    position: 'relative', zIndex: 1,
                  }}>{s.n}</div>
                  <div>
                    <h3 className="display" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', margin: 0 }}>{s.title}</h3>
                    <p style={{ margin: '10px 0 0', color: 'var(--ink-2)', fontSize: 15.5, maxWidth: 620, lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                  <Tag tone="outline">{s.time}</Tag>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .bfy-process-row { grid-template-columns: 44px 1fr !important; gap: 18px !important; }
          .bfy-process-row > :last-child { grid-column: 2 !important; margin-top: 6px; }
        }
      `}</style>
    </section>
  );
}

/* ============ CASES ============ */
function Cases() {
  const cases = [
    {
      type: '음식점 · 외식',
      name: 'A 사장님',
      region: '서울',
      channels: '블로그 · 인스타 · 스마트스토어',
      highlight: '다른 데는 100% 못 채워서 환수당했단 얘기 듣는데, 우린 그런 걱정 없었어요.',
      body: '사실 주변 사장님들 얘기 들어보면 마케팅 업체가 약속한 콘텐츠를 다 못 채워서 환수 통보 받는 경우가 꽤 있더라구요. 브랜딩포유는 처음부터 마지막까지 100% 다 진행해주셨고, 수행기간 끝나고도 계속 같이 일하고 있습니다.',
    },
    {
      type: '뷰티 · 서비스업',
      name: 'B 사장님',
      region: '경기',
      channels: '인스타 · 유튜브 · 홈페이지',
      highlight: '비슷한 견적서만 보다 결정 못 했는데, 대표님이 직접 매장으로 와주셨어요.',
      body: '여러 업체 견적을 받았지만 다 비슷비슷해서 한참 고민했어요. 브랜딩포유는 대표님이 직접 매장에 한 시간 넘게 앉아서 우리 가게 톤이랑 손님층을 듣고 가셨습니다. 그 뒤로 올라온 콘텐츠가 진짜 우리 가게 같아 보여서 단골 손님까지 의미있게 늘었어요.',
    },
    {
      type: '제조 · 판매',
      name: 'C 사장님',
      region: '인천',
      channels: '스마트스토어 · 로고 · 랜딩',
      highlight: '로고·상세페이지·홈페이지를 한 팀이 했더니, 브랜드가 살아 보입니다.',
      body: '예전엔 로고 따로, 홈페이지 따로, 스마트스토어 상세페이지 따로 외주를 줬는데 결과물 톤이 다 어긋났어요. 이번엔 브랜딩포유에 다 맡기고 나니까 일관된 브랜드처럼 느껴집니다. 외주 관리하는 시간도 줄고, 매출도 자연스럽게 올라왔어요.',
    },
    {
      type: '서비스업 · 교육',
      name: 'D 사장님',
      region: '부산',
      channels: '블로그 · 인스타 · 바이럴',
      highlight: '수행이 끝나도 계속 가져갈 수 있는 마케팅 자산이 남았어요.',
      body: '다른 업체들은 수행기간이 끝나면 콘텐츠 운영도 같이 끝나서 정작 남는 게 없었다는 얘기를 많이 들었어요. 브랜딩포유는 블로그도 검색 잘 되는 글로 채워주시고, 인스타도 저희가 직접 이어갈 수 있게 콘셉트를 잡아주셔서 너무 만족스럽습니다.',
    },
  ];
  return (
    <section id="cases" style={{ padding: '120px 0', background: 'var(--paper)' }}>
      <div className="container">
        <Reveal>
          <SectionHeader
            kicker="Real reviews"
            title={<>마케팅 업체 잘 선정한<br/>사장님들의 이야기</>}
            sub="* 사장님 동의 하에 후기 일부만 공개합니다. 상호명·얼굴은 비공개로 받았습니다."
          />
        </Reveal>
        <div style={{
          marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24,
        }} className="bfy-cases-grid">
          {cases.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <article style={{
                background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 6,
                padding: 'clamp(28px, 3.4vw, 44px)',
                height: '100%', display: 'flex', flexDirection: 'column', gap: 24,
                position: 'relative',
              }}>
                {/* big quote mark */}
                <div className="display" aria-hidden style={{
                  position: 'absolute', top: 18, right: 24,
                  fontSize: 84, lineHeight: 1, color: 'var(--gold)', opacity: 0.35,
                }}>"</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <Tag tone="gold">{c.type}</Tag>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em' }}>2025</span>
                </div>

                {/* highlight pull-quote */}
                <p className="display" style={{
                  margin: 0, fontSize: 'clamp(20px, 2.2vw, 26px)', lineHeight: 1.4,
                  color: 'var(--ink)', letterSpacing: '-0.01em',
                  textIndent: 0,
                  position: 'relative',
                }}>
                  <span style={{
                    background: `linear-gradient(to top, var(--gold-soft) 0%, var(--gold-soft) 32%, transparent 32%, transparent 100%)`,
                    paddingInline: 2,
                  }}>{c.highlight}</span>
                </p>

                {/* body */}
                <p style={{ margin: 0, fontSize: 15.5, color: 'var(--ink-2)', lineHeight: 1.75 }}>
                  {c.body}
                </p>

                {/* attribution */}
                <div style={{
                  marginTop: 'auto', paddingTop: 22,
                  borderTop: '1px solid var(--line)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: 999, background: 'var(--gold-soft)',
                      color: 'var(--gold-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 14,
                    }}>{c.name.charAt(0)}</span>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{c.region}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>CHANNELS</div>
                    <div style={{ fontSize: 12.5, marginTop: 4, color: 'var(--ink-2)' }}>{c.channels}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* trust footer line */}
        <Reveal delay={400}>
          <div style={{
            marginTop: 56, padding: '24px 28px', borderRadius: 6,
            background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', gap: 18,
            justifyContent: 'space-between', flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{
                fontSize: 22, fontWeight: 700, color: 'var(--gold-deep)',
                fontFamily: 'IBM Plex Mono, monospace',
              }}>★ ★ ★ ★ ★</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>2025년 담당 사장님 전원, 환수 0건</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>모든 약속한 마케팅 항목을 100% 수행했습니다.</div>
              </div>
            </div>
            <Button size="md" variant="primary" icon={<ArrowIcon size={14}/>} onClick={() => document.getElementById('apply')?.scrollIntoView({behavior:'smooth'})}>
              나도 상담받기
            </Button>
          </div>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 960px) { .bfy-cases-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ============ FAQ ============ */
function FAQ() {
  const [open, setOpen] = React.useState(0);
  const faqs = [
    { q: '브랜딩포유는 어떤 회사인가요?', a: '브랜드를 위한 맞춤 마케팅을 전문으로 하는 마케팅 대행사입니다. 희망리턴패키지의 8개 마케팅 항목(블로그·인스타·유튜브·바이럴·스마트스토어·랜딩페이지·홈페이지·로고)을 한 팀이 통합 운영합니다.' },
    { q: '저희는 이미 희망리턴패키지에 합격했는데, 어떻게 진행되나요?', a: '합격 통지를 받으신 후 마케팅 업체를 선정하실 수 있는데, 브랜딩포유와 무료 상담을 통해 사장님 사업에 맞는 채널 조합과 콘텐츠 방향을 먼저 설계해드립니다. 이후 계약·진행 단계로 넘어갑니다.' },
    { q: '대표가 직접 미팅 오시는 게 사실인가요?', a: '네. 모든 상담과 초기 미팅은 대표가 직접 진행합니다. 사업장 방문도 가능하며(수도권 우선), 거리가 먼 경우 화상으로 진행합니다. 담당자가 매번 바뀌는 일은 없습니다.' },
    { q: '수행기간이 끝나면 마케팅도 끝인가요?', a: '계약 종료가 끝이 아니라고 생각합니다. 사장님이 원하시는 한 마케팅을 이어가드리며, 2025년의 경우 수행기간 종료 이후에도 6개월 이상 이어가신 업체도 있었습니다. 일정·범위는 경우에 따라 조율하면서요.' },
    { q: '비용은 어떻게 책정되나요?', a: '희망리턴패키지로 지원되는 마케팅 항목 한도 내에서 모두 진행 가능합니다. 채널별 견적은 상담 시 사업 규모·목표·요구사항을 듣고 맞춤으로 안내드립니다.' },
    { q: '다른 업체에 이미 견적을 받았는데, 비교 상담 가능한가요?', a: '환영합니다. 다른 업체의 제안서를 보여주시면, 같은 예산 안에서 어떻게 다른 가치를 제공할 수 있는지 솔직하게 비교해서 설명드립니다.' },
  ];
  return (
    <section id="faq" style={{ padding: '120px 0', background: 'var(--bg-alt)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
        <Reveal>
          <Tag tone="gold">FAQ</Tag>
          <h2 className="display" style={{ fontSize: 'clamp(34px, 4.6vw, 60px)', margin: '20px 0 24px', lineHeight: 1.05 }}>
            사장님들이<br/>가장 많이<br/>물어보신 것들
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: 16, maxWidth: 380, lineHeight: 1.7 }}>
            여기에 없는 질문은 카카오톡 또는 전화로 편하게 물어봐 주세요.<br/>
            대표가 직접 답변드립니다.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button variant="primary" icon={<ArrowIcon size={14}/>} onClick={() => document.getElementById('apply')?.scrollIntoView({behavior:'smooth'})}>
              지금 문의하기
            </Button>
          </div>
        </Reveal>
        <div>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 50}>
              <div style={{ borderTop: i === 0 ? '1px solid var(--ink)' : '1px solid var(--line)', borderBottom: i === faqs.length - 1 ? '1px solid var(--ink)' : 'none' }}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  style={{
                    width: '100%', textAlign: 'left', background: 'none', border: 'none',
                    padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 20, color: 'var(--ink)',
                  }}
                >
                  <span style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--gold-deep)', marginTop: 4 }}>Q.0{i+1}</span>
                    <span style={{ fontSize: 17, fontWeight: 600 }}>{f.q}</span>
                  </span>
                  <span style={{
                    width: 32, height: 32, borderRadius: 999, background: open === i ? 'var(--ink)' : 'transparent',
                    border: open === i ? '1px solid var(--ink)' : '1px solid var(--line)',
                    color: open === i ? 'var(--gold)' : 'var(--ink)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all .2s ease', flexShrink: 0,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d={open === i ? "M3 7 H 11" : "M3 7 H 11 M7 3 V 11"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                <div style={{
                  maxHeight: open === i ? 400 : 0, overflow: 'hidden',
                  transition: 'max-height .35s ease',
                }}>
                  <div style={{ padding: '0 0 28px 44px', color: 'var(--ink-2)', fontSize: 15.5, lineHeight: 1.75, maxWidth: 640 }}>{f.a}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) {
          #faq .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { WhyUs, Services, Process, Cases, FAQ });
