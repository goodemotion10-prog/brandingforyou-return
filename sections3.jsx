/* Apply (multi-step form + 3 channels), Sticky CTA, About company, Footer */

/* ============ ABOUT (회사 소개) ============ */
function About() {
  return (
    <section id="about" style={{ padding: '120px 0', background: 'var(--paper)' }}>
      <div className="container" style={{
        display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'center',
      }} >
        <Reveal>
          <div style={{ position: 'relative' }}>
            <div style={{
              padding: 48, background: 'var(--bg-alt)', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              aspectRatio: '1/1',
            }}>
              <BrandMark variant="stacked" size={280}/>
            </div>
            {/* corner caption */}
            <div className="mono" style={{
              position: 'absolute', bottom: -16, left: 20,
              background: 'var(--ink)', color: 'var(--paper)',
              padding: '8px 14px', fontSize: 11, letterSpacing: '0.12em',
              borderRadius: 2,
            }}>BRANDING · FOR · YOU</div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <Tag tone="gold">About us</Tag>
          <h2 className="display" style={{ fontSize: 'clamp(34px, 4.8vw, 60px)', margin: '20px 0 28px', lineHeight: 1.05 }}>
            브랜딩포유는<br/>
            <span style={{ color: 'var(--gold-deep)', fontStyle: 'italic' }}>브랜드를 위한</span><br/>
            맞춤 마케팅을 합니다.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 540, lineHeight: 1.75 }}>
            저희는 사장님의 사업을 <strong style={{ color: 'var(--ink)' }}>"브랜드"</strong>로 봅니다.
            브랜드에는 톤이 있고 이야기가 있습니다.
            저희는 그 톤과 이야기를 8개 채널에 일관되게 풀어내는 일을 합니다.
          </p>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 540, marginTop: 18, lineHeight: 1.75 }}>
            희망리턴패키지에 합격하신 사장님께 가장 필요한 것은
            <strong style={{ color: 'var(--ink)' }}> 항목을 채우는 업체가 아니라, 매출을 만드는 파트너</strong>입니다.
            저희는 후자가 되겠습니다.
          </p>
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 28, justifyContent: 'start' }}>
            <FactBlock label="설립" v="브랜딩 마케팅" />
            <FactBlock label="전문" v="희망리턴 8개 채널" />
            <FactBlock label="방식" v="대표 직접 컨설팅" />
          </div>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 960px) {
          #about .container { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
      `}</style>
    </section>
  );
}
function FactBlock({ label, v }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--muted)', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 14, fontWeight: 600 }}>{v}</div>
    </div>
  );
}

/* ============ APPLY (multi-channel + multi-step form) ============ */
function Apply() {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    status: '',     // 합격여부
    channels: [],   // 관심 채널
    name: '',
    phone: '',
    company: '',
    region: '',
    message: '',
    consent: false,
  });
  const [done, setDone] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqnbeaq';

  const totalSteps = 3;
  const next = () => setStep(s => Math.min(totalSteps, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));
  const toggleChannel = (c) => setData(d => ({ ...d, channels: d.channels.includes(c) ? d.channels.filter(x => x !== c) : [...d.channels, c] }));

  const canStep1 = !!data.status && data.channels.length > 0;
  const canStep2 = data.name.trim().length >= 2 && /^[0-9\-\s]{9,}$/.test(data.phone) && !!data.region;
  const canSubmit = data.consent;

  const submit = async () => {
    if (!canSubmit || sending) return;
    setError('');
    setSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          '현재 상황': data.status,
          '관심 채널': data.channels.join(', '),
          '대표자 성함': data.name,
          '연락처': data.phone,
          '상호명': data.company || '-',
          '지역': data.region,
          '문의사항': data.message || '-',
          _subject: `[브랜딩포유] 상담 신청 — ${data.name || '익명'}`,
        }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        const body = await res.json().catch(() => ({}));
        setError((body.errors && body.errors.map(e => e.message).join(' ')) || '전송에 실패했습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.');
      }
    } catch (e) {
      setError('네트워크 오류로 전송하지 못했습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="apply" style={{
      padding: '120px 0', background: 'var(--ink)', color: 'var(--paper)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* deco arcs */}
      <svg aria-hidden style={{
        position: 'absolute', bottom: -80, left: -80, width: 500, height: 500, opacity: 0.25,
      }} viewBox="0 0 400 400" fill="none">
        {[180, 150, 120, 90, 60].map((r, i) => (
          <path key={i} d={`M ${200-r} 220 A ${r} ${r} 0 0 1 ${200+r} 220`} stroke="var(--gold)" strokeWidth="1.4" opacity={0.5 - i*0.06}/>
        ))}
      </svg>

      <div className="container" style={{
        position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 80, alignItems: 'start',
      }}>
        {/* LEFT — channels */}
        <Reveal>
          <div className="bfy-apply-intro">
            <Tag tone="dark">Contact</Tag>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '20px 0 28px', lineHeight: 1.02 }}>
              지금<br/>
              상담받으세요.<br/>
              <span style={{ color: 'var(--gold)' }}>대표가 직접</span><br/>
              답변드립니다.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(251,246,236,.8)', maxWidth: 460, lineHeight: 1.7 }}>
              세 가지 채널 중 편하신 방법으로 연락 주세요.
              영업일 24시간 이내에 회신드립니다.
            </p>

            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ChannelCard
                kind="전화 상담"
                label="070-4101-8253"
                sub="평일 10:00 - 19:00"
                href="tel:070-4101-8253"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 4C4 4 3 5 3 6c0 8 7 15 15 15 1 0 2-1 2-2v-3c0-.8-.6-1.4-1.3-1.5l-3.2-.6c-.6-.1-1.2.1-1.5.6l-1 1.5c-3-1.5-5.4-3.9-6.9-6.9l1.5-1c.5-.3.7-.9.6-1.5L7.6 5.3C7.5 4.6 6.9 4 6.1 4H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>}
                tone="primary"
              />
              <ChannelCard
                kind="이메일"
                label="brandingforyou100@naver.com"
                sub="제안서·자료 첨부 가능"
                href="mailto:brandingforyou100@naver.com"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="m3.5 7.5 8 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>}
                tone="default"
              />
              <ChannelCard
                kind="카카오톡 상담"
                label="@브랜딩포유"
                sub="24시간 접수 · 영업일 회신"
                href="https://pf.kakao.com/_fAgxexb"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 4C7 4 3 7.2 3 11.2c0 2.5 1.6 4.6 4 5.9l-1 3.4 4-2.3c.6.1 1.3.2 2 .2 5 0 9-3.2 9-7.2S17 4 12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>}
                tone="kakao"
              />
            </div>
          </div>
        </Reveal>

        {/* RIGHT — form */}
        <Reveal delay={200}>
          <div style={{
            background: 'var(--paper)', color: 'var(--ink)',
            borderRadius: 8, padding: 'clamp(28px, 4vw, 44px)',
            boxShadow: '0 40px 80px -30px rgba(0,0,0,.5)',
          }}>
            {done ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', margin: '0 auto 24px',
                  background: 'var(--gold-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M10 18 L16 24 L26 12" stroke="var(--gold-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="display" style={{ fontSize: 30, margin: 0 }}>상담 신청이 완료되었습니다</h3>
                <p style={{ marginTop: 14, color: 'var(--ink-2)', fontSize: 15 }}>
                  영업일 기준 24시간 안에 대표가<br/>
                  {data.name || '사장'}님께 직접 연락드릴 예정입니다.
                </p>
                <div className="mono" style={{
                  marginTop: 28, padding: '12px 18px', background: 'var(--bg-alt)',
                  borderRadius: 4, fontSize: 13, display: 'inline-block',
                }}>접수번호 · BFY-{Math.floor(Math.random()*900000+100000)}</div>
                <div style={{ marginTop: 36 }}>
                  <Button variant="ghost" size="md" onClick={() => { setDone(false); setStep(1); setData({status:'',channels:[],name:'',phone:'',company:'',region:'',message:'',consent:false}); }}>
                    처음으로
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                  <div className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', color: 'var(--muted)' }}>
                    STEP {String(step).padStart(2,'0')} / {String(totalSteps).padStart(2,'0')}
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {Array.from({ length: totalSteps }).map((_, i) => (
                      <div key={i} style={{
                        width: 32, height: 3, borderRadius: 2,
                        background: i < step ? 'var(--gold-deep)' : 'var(--line)',
                        transition: 'background .3s ease',
                      }}/>
                    ))}
                  </div>
                </div>

                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <FormField label="현재 상황을 알려주세요" required>
                      <ChoiceGroup
                        value={data.status}
                        onChange={(v) => update('status', v)}
                        options={[
                          ['passed', '희망리턴패키지 합격했어요'],
                          ['applying', '신청 준비 중이에요'],
                        ]}
                      />
                    </FormField>
                    <FormField label="관심 있는 마케팅 채널 (복수 선택)" required>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }} className="bfy-channel-grid">
                        {['블로그','인스타그램','유튜브','바이럴 마케팅','스마트스토어','랜딩페이지','홈페이지','로고·브랜딩','전체 패키지'].map(c => {
                          const on = data.channels.includes(c);
                          return (
                            <button key={c} type="button" onClick={() => toggleChannel(c)} style={{
                              padding: '10px 8px', border: `1.5px solid ${on ? 'var(--ink)' : 'var(--line)'}`,
                              background: on ? 'var(--ink)' : 'var(--bg)', color: on ? 'var(--paper)' : 'var(--ink)',
                              borderRadius: 6, fontSize: 13, fontWeight: 500, transition: 'all .15s ease',
                            }}>{c}</button>
                          );
                        })}
                      </div>
                    </FormField>
                  </div>
                )}

                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <FormField label="대표자 성함" required>
                      <input type="text" placeholder="홍길동" value={data.name} onChange={(e) => update('name', e.target.value)} style={inputStyle}/>
                    </FormField>
                    <FormField label="연락처" required hint="'-' 없이 또는 포함 모두 가능합니다.">
                      <input type="tel" placeholder="010-1234-5678" value={data.phone} onChange={(e) => update('phone', e.target.value)} style={inputStyle}/>
                    </FormField>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="bfy-form-row">
                      <FormField label="상호명">
                        <input type="text" placeholder="(선택)" value={data.company} onChange={(e) => update('company', e.target.value)} style={inputStyle}/>
                      </FormField>
                      <FormField label="지역" required>
                        <select value={data.region} onChange={(e) => update('region', e.target.value)} style={{...inputStyle, background: 'var(--bg)'}}>
                          <option value="">선택</option>
                          {['서울','경기·인천','강원','충청','전라','경상','제주'].map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </FormField>
                    </div>
                    <FormField label="문의사항 (선택)">
                      <textarea rows={3} placeholder="궁금하신 점이나 사업장 상황을 자유롭게 적어주세요." value={data.message} onChange={(e) => update('message', e.target.value)} style={{...inputStyle, resize: 'vertical', fontFamily: 'inherit'}}/>
                    </FormField>
                  </div>
                )}

                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div style={{ padding: 22, background: 'var(--bg-alt)', borderRadius: 6 }}>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 14 }}>신청 내용 확인</div>
                      <Row k="상황" v={statusLabel(data.status)}/>
                      <Row k="관심 채널" v={data.channels.join(', ')}/>
                      <Row k="성함" v={data.name}/>
                      <Row k="연락처" v={data.phone}/>
                      <Row k="상호" v={data.company || '-'}/>
                      <Row k="지역" v={data.region}/>
                      {data.message && <Row k="문의" v={data.message}/>}
                    </div>
                    <label style={{ display: 'flex', gap: 12, cursor: 'pointer', fontSize: 13.5, color: 'var(--ink-2)' }}>
                      <input type="checkbox" checked={data.consent} onChange={(e) => update('consent', e.target.checked)}
                        style={{ marginTop: 3, width: 18, height: 18, accentColor: 'var(--gold-deep)' }} />
                      <span><strong>(필수)</strong> 개인정보 수집·이용에 동의합니다. 수집된 정보는 상담 목적으로만 사용되며, 처리 완료 후 즉시 파기됩니다.</span>
                    </label>
                    {error && (
                      <div style={{ marginTop: 4, fontSize: 13, color: '#C0392B', lineHeight: 1.5 }}>{error}</div>
                    )}
                  </div>
                )}

                <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <Button variant="ghost" size="md" onClick={back} style={{ visibility: step === 1 ? 'hidden' : 'visible' }}>이전</Button>
                  {step < totalSteps ? (
                    <Button variant="primary" size="md" onClick={next} icon={<ArrowIcon size={14}/>}
                      style={{ opacity: (step === 1 ? canStep1 : canStep2) ? 1 : .4, pointerEvents: (step === 1 ? canStep1 : canStep2) ? 'auto' : 'none' }}>다음 단계</Button>
                  ) : (
                    <Button variant="gold" size="md" onClick={submit} icon={<ArrowIcon size={14}/>}
                      style={{ opacity: (canSubmit && !sending) ? 1 : .4, pointerEvents: (canSubmit && !sending) ? 'auto' : 'none' }}>{sending ? '전송 중…' : '상담 신청 완료'}</Button>
                  )}
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 960px) {
          #apply > .container { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
        @media (max-width: 560px) {
          .bfy-channel-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .bfy-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ChannelCard({ kind, label, sub, href, icon, tone = 'default' }) {
  const styles = {
    default: { bg: 'rgba(251,246,236,.05)', border: 'rgba(251,246,236,.15)', icon: 'var(--gold)', label: 'var(--paper)' },
    primary: { bg: 'var(--gold)', border: 'var(--gold)', icon: 'var(--ink)', label: 'var(--ink)' },
    kakao:   { bg: '#FEE500', border: '#FEE500', icon: '#191600', label: '#191600' },
  };
  const s = styles[tone] || styles.default;
  const isLight = tone === 'default';
  return (
    <a href={href} style={{
      display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: 16, alignItems: 'center',
      padding: '18px 20px', background: s.bg, border: `1px solid ${s.border}`,
      borderRadius: 8, textDecoration: 'none',
      transition: 'transform .15s ease',
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 999,
        background: isLight ? 'rgba(207,176,126,.15)' : 'rgba(0,0,0,0.08)',
        color: s.icon,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7, color: s.label }}>{kind}</div>
        <div style={{ marginTop: 4, fontSize: 16, fontWeight: 700, color: s.label }}>{label}</div>
        <div style={{ marginTop: 2, fontSize: 12, opacity: 0.6, color: s.label }}>{sub}</div>
      </div>
      <ArrowIcon size={18}/>
    </a>
  );
}

const inputStyle = {
  width: '100%', padding: '14px 16px', border: '1.5px solid var(--line)',
  borderRadius: 6, background: 'var(--bg)', color: 'var(--ink)',
  fontSize: 15, fontFamily: 'inherit', outline: 'none',
  transition: 'border-color .2s ease',
};

function FormField({ label, required, hint, children }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'flex', gap: 4 }}>
        {label}{required && <span style={{ color: 'var(--gold-deep)' }}>*</span>}
      </div>
      {children}
      {hint && <div style={{ marginTop: 6, fontSize: 12, color: 'var(--muted)' }}>{hint}</div>}
    </div>
  );
}

function ChoiceGroup({ value, onChange, options }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
      {options.map(([val, label]) => {
        const selected = value === val;
        return (
          <button key={val} type="button" onClick={() => onChange(val)} style={{
            padding: '14px 16px', border: `1.5px solid ${selected ? 'var(--ink)' : 'var(--line)'}`,
            background: selected ? 'var(--ink)' : 'var(--bg)',
            color: selected ? 'var(--paper)' : 'var(--ink)',
            borderRadius: 6, fontSize: 14, textAlign: 'left',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            transition: 'all .15s ease',
          }}>
            {label}
            <span style={{
              width: 16, height: 16, borderRadius: 999,
              border: `1.5px solid ${selected ? 'var(--gold)' : 'var(--line)'}`,
              background: selected ? 'var(--gold)' : 'transparent',
            }}/>
          </button>
        );
      })}
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 8, borderBottom: '1px dashed var(--line)', fontSize: 14, gap: 16 }}>
      <span style={{ color: 'var(--muted)', flexShrink: 0 }}>{k}</span>
      <span style={{ fontWeight: 600, textAlign: 'right' }}>{v || '-'}</span>
    </div>
  );
}

function statusLabel(s) {
  return { passed: '희망리턴 합격', applying: '신청 준비 중', considering: '합격 전 사전 알아보기', other: '기타' }[s] || '-';
}

/* ============ STICKY CTA ============ */
function StickyCta() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div style={{
      position: 'fixed', right: 24, bottom: 24, zIndex: 40,
      display: 'flex', flexDirection: 'column', gap: 10,
      opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none',
      transition: 'opacity .3s ease, transform .3s ease',
      transform: show ? 'none' : 'translateY(20px)',
      alignItems: 'flex-end',
    }}>
      <a href="tel:070-4101-8253" style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: '14px 20px', borderRadius: 999, fontWeight: 600, fontSize: 14,
        display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
        boxShadow: '0 12px 24px -8px rgba(0,0,0,0.25)',
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3.5 2C3 2 2.5 2.5 2.5 3v1.5c0 5 4 9 9 9H13c.5 0 1-.5 1-1v-2c0-.5-.4-.9-.9-1l-2.1-.5c-.4-.1-.8.1-1 .4l-.7 1c-2-.9-3.6-2.5-4.5-4.5l1-.7c.3-.2.5-.6.4-1L4.7 2.9c-.1-.5-.5-.9-1-.9H3.5Z" stroke="currentColor" strokeWidth="1.2"/></svg>
        070-4101-8253
      </a>
      <a href="https://pf.kakao.com/_fAgxexb" target="_blank" rel="noopener" style={{
        background: '#FEE500', color: '#191600', border: 'none',
        padding: '14px 20px', borderRadius: 999, fontWeight: 700, fontSize: 14,
        display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
        boxShadow: '0 12px 24px -8px rgba(0,0,0,0.2)',
      }}>
        <span style={{ width: 18, height: 18, borderRadius: 4, background: '#191600', color: '#FEE500', fontSize: 11, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>K</span>
        카톡 상담
      </a>
    </div>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(251,246,236,.65)', padding: '80px 0 40px', borderTop: '1px solid var(--gold)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48 }} className="bfy-footer-grid">
          <div>
            <BrandMark variant="horizontal" size={36}/>
            <p style={{ marginTop: 24, fontSize: 14, maxWidth: 360, lineHeight: 1.8 }}>
              브랜딩포유는 브랜드를 위한 맞춤 마케팅을 합니다.<br/>
              희망리턴패키지 8개 채널을 한 팀이 통합 운영합니다.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
              <Tag tone="dark">대표 직접 컨설팅</Tag>
              <Tag tone="dark">2025 100% 수행</Tag>
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18, color: 'var(--gold)' }}>Services</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <li>블로그 운영</li>
              <li>인스타그램·유튜브</li>
              <li>바이럴 마케팅</li>
              <li>스마트스토어</li>
              <li>랜딩페이지·홈페이지</li>
              <li>로고·브랜딩</li>
            </ul>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18, color: 'var(--gold)' }}>Contact</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <li><a href="tel:070-4101-8253" style={{ textDecoration: 'none', color: 'inherit' }}>070-4101-8253</a></li>
              <li><a href="mailto:brandingforyou100@naver.com" style={{ textDecoration: 'none', color: 'inherit' }}>brandingforyou100@naver.com</a></li>
              <li><a href="https://pf.kakao.com/_fAgxexb" target="_blank" rel="noopener" style={{ textDecoration: 'none', color: 'inherit' }}>카카오톡 @브랜딩포유</a></li>
              <li style={{ fontSize: 13, color: 'rgba(251,246,236,.45)' }}>평일 10:00 - 19:00</li>
            </ul>
          </div>
        </div>
        <div style={{
          marginTop: 64, paddingTop: 28, borderTop: '1px solid rgba(251,246,236,.12)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          fontSize: 12, color: 'rgba(251,246,236,.4)',
        }}>
          <div>© 2026 BRANDING · FOR · YOU. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <span>이용약관</span>
            <span>개인정보처리방침</span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) { .bfy-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

Object.assign(window, { About, Apply, StickyCta, Footer });
