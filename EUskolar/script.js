// ── PAGE NAV ─────────────────────────────────────────────────────────────────
  const navIds = ['home','how','apply','contact'];
  function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    navIds.forEach(id => { const el = document.getElementById('nav-' + id); if (el) el.classList.remove('active'); });
    document.getElementById('page-' + page).classList.add('active');
    const navEl = document.getElementById('nav-' + page);
    if (navEl) navEl.classList.add('active');
    window.scrollTo(0, 0);
  }
  function filterCards(type, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.scard').forEach(card => {
      card.style.display = (type === 'all' || card.dataset.type === type) ? 'block' : 'none';
    });
  }
  let profile = {};
  let focusScholarship = null;

  const TREE = {
    start: {
      id: 'start',
      question: 'Are you currently enrolled at MSEUF, or are you planning to enroll?',
      options: [
        { label: 'Currently enrolled', value: 'enrolled', next: 'enrolled_level' },
        { label: 'Incoming / planning to enroll', value: 'incoming', next: 'incoming_honors' }
      ]
    },
    // ── INCOMING BRANCH ──────────────────────────────────────────────────────
    incoming_honors: {
      id: 'incoming_honors',
      question: 'Did you graduate with academic honors from your previous school?',
      sub: 'This affects eligibility for the Enverga Scholarship Grant.',
      options: [
        { label: 'With Highest Honors / Valedictorian', value: 'highest', next: 'incoming_province' },
        { label: 'With High Honors / Salutatorian', value: 'high', next: 'incoming_province' },
        { label: 'With Honors only', value: 'honors', next: 'incoming_province' },
        { label: 'No academic honors', value: 'none', next: 'incoming_province' }
      ]
    },
    incoming_province: {
      id: 'incoming_province',
      question: 'Were you born in Quezon Province?',
      sub: 'Required for the R.A. 6728 Study Grant.',
      options: [
        { label: 'Yes, born in Quezon Province', value: 'yes', next: 'incoming_military' },
        { label: 'No', value: 'no', next: 'incoming_military' }
      ]
    },
    incoming_military: {
      id: 'incoming_military',
      question: 'Is a parent or guardian an AFP military personnel?',
      sub: 'This covers AFPEBS, P.D. 451, and P.D. 577 grants.',
      options: [
        { label: 'Yes — killed-in-action or permanently disabled (KIA/CDD)', value: 'kia', next: 'incoming_sport' },
        { label: 'Yes — active or retired military', value: 'active', next: 'incoming_sport' },
        { label: 'Yes — AFPEBS member', value: 'afpebs', next: 'incoming_sport' },
        { label: 'No military background', value: 'none', next: 'incoming_sport' }
      ]
    },
    incoming_sport: {
      id: 'incoming_sport',
      question: 'Do you play a sport competitively, or are you interested in representing a university team?',
      options: [
        { label: 'Yes, I am a competitive athlete', value: 'yes', next: 'incoming_arts' },
        { label: 'No', value: 'no', next: 'incoming_arts' }
      ]
    },
    incoming_arts: {
      id: 'incoming_arts',
      question: 'Are you involved in performing arts — music, choir, or dance?',
      sub: 'Relevant for the Service Grants (Chamberwinds, Concert Singers, Banyuhay).',
      options: [
        { label: 'Yes', value: 'yes', next: 'incoming_financial' },
        { label: 'No', value: 'no', next: 'incoming_financial' }
      ]
    },
    incoming_financial: {
      id: 'incoming_financial',
      question: 'Would you describe your family\'s financial situation as low-income or marginalized?',
      sub: 'Relevant for need-based grants (Foundation Grant, P.D. 451, Student Assistantship).',
      options: [
        { label: 'Yes — low income / marginalized', value: 'yes', next: 'incoming_gender' },
        { label: 'No / I prefer not to say', value: 'no', next: 'incoming_gender' }
      ]
    },
    incoming_gender: {
      id: 'incoming_gender',
      question: 'Are you female?',
      sub: 'Required only to check eligibility for the Miss MSEUF Study Grant.',
      options: [
        { label: 'Yes', value: 'yes', next: 'RESULTS' },
        { label: 'No', value: 'no', next: 'RESULTS' }
      ]
    },

    // ── ENROLLED BRANCH ──────────────────────────────────────────────────────
    enrolled_level: {
      id: 'enrolled_level',
      question: 'What year level are you currently in?',
      options: [
        { label: '1st Year', value: '1', next: 'enrolled_units' },
        { label: '2nd Year', value: '2', next: 'enrolled_units' },
        { label: '3rd Year', value: '3', next: 'enrolled_units' },
        { label: '4th Year or higher', value: '4', next: 'enrolled_units' }
      ]
    },
    enrolled_units: {
      id: 'enrolled_units',
      question: 'How many academic units are you currently enrolled in?',
      sub: 'Excludes NSTP, Euthenics, and bracketed subjects.',
      options: [
        { label: '18 units or more', value: '18+', next: 'enrolled_gpa' },
        { label: '15 to 17 units', value: '15-17', next: 'enrolled_gpa' },
        { label: 'Less than 15 units', value: '<15', next: 'enrolled_gpa' }
      ]
    },
    enrolled_gpa: {
      id: 'enrolled_gpa',
      question: 'What is your current GPA or grade average?',
      sub: 'Use the 1.0–5.0 scale (1.0 = highest). If unsure of exact GPA, choose the closest range.',
      options: [
        { label: '1.000 – 1.300 (Excellent)', value: '1.0-1.3', next: 'enrolled_province' },
        { label: '1.301 – 1.500 (Very Good)', value: '1.3-1.5', next: 'enrolled_province' },
        { label: '1.501 – 2.500 (Good to Satisfactory)', value: '1.5-2.5', next: 'enrolled_province' },
        { label: 'Below 2.500', value: 'below2.5', next: 'enrolled_province' }
      ]
    },
    enrolled_province: {
      id: 'enrolled_province',
      question: 'Were you born in Quezon Province?',
      sub: 'Required for the R.A. 6728 Study Grant.',
      options: [
        { label: 'Yes', value: 'yes', next: 'enrolled_military' },
        { label: 'No', value: 'no', next: 'enrolled_military' }
      ]
    },
    enrolled_military: {
      id: 'enrolled_military',
      question: 'Is a parent or guardian an AFP military personnel?',
      options: [
        { label: 'Yes — killed-in-action or permanently disabled (KIA/CDD)', value: 'kia', next: 'enrolled_involvement' },
        { label: 'Yes — active or retired military / AFPEBS member', value: 'active', next: 'enrolled_involvement' },
        { label: 'No military background', value: 'none', next: 'enrolled_involvement' }
      ]
    },
    enrolled_involvement: {
      id: 'enrolled_involvement',
      question: 'Are you involved in any of the following? Select all that apply.',
      sub: 'Choose the one that best describes you.',
      options: [
        { label: 'Varsity / competitive sports', value: 'sport', next: 'enrolled_financial' },
        { label: 'Performing arts (band, choir, dance)', value: 'arts', next: 'enrolled_financial' },
        { label: 'Student council (UCSC President)', value: 'council', next: 'enrolled_financial' },
        { label: 'NROTC (Corps Commander)', value: 'nrotc', next: 'enrolled_financial' },
        { label: 'Publication staff (Luzonian editor)', value: 'publication', next: 'enrolled_financial' },
        { label: 'None of the above', value: 'none', next: 'enrolled_financial' }
      ]
    },
    enrolled_financial: {
      id: 'enrolled_financial',
      question: 'Would you describe your family\'s financial situation as low-income or marginalized?',
      sub: 'Relevant for need-based grants (Foundation, Alumni, Corporate, P.D. 451).',
      options: [
        { label: 'Yes — low income / marginalized', value: 'yes', next: 'enrolled_gender' },
        { label: 'No / I prefer not to say', value: 'no', next: 'enrolled_gender' }
      ]
    },
    enrolled_gender: {
      id: 'enrolled_gender',
      question: 'Are you female?',
      sub: 'Required only to check eligibility for the Miss MSEUF Study Grant.',
      options: [
        { label: 'Yes', value: 'yes', next: 'RESULTS' },
        { label: 'No', value: 'no', next: 'RESULTS' }
      ]
    }
  };

  // ── EVALUATION ENGINE ─────────────────────────────────────────────────────────
  function evaluate() {
    const p = profile;
    const results = [];

    const add = (name, status, reason, next) => results.push({ name, status, reason, next });

    // ── INCOMING STUDENT SCHOLARSHIPS ──
    if (p.start === 'incoming') {
      // Enverga Scholarship Grant
      if (p.incoming_honors === 'highest' || p.incoming_honors === 'high') {
        add('Enverga Scholarship Grant (ESG)',
          'likely',
          'You graduated with honors, which is the primary academic requirement. You will need to take and pass a qualifying exam administered by the Guidance and Testing Office.',
          'Prepare your Principal\'s Certification of Honors and watch for the qualifying exam schedule.');
      } else if (p.incoming_honors === 'honors') {
        add('Enverga Scholarship Grant (ESG)',
          'partial',
          '"With Honors" may not meet the threshold — the ESG requires "With High Honors" or "With Highest Honors" at minimum. Verify with OSJPAR.',
          'Bring your award documentation to OSJPAR for confirmation.');
      }

      // RA 6728
      if (p.incoming_province === 'yes') {
        add('R.A. 6728 Study Grant',
          'likely',
          'Being born in Quezon Province meets the primary requirement. You must also belong to a marginalized group and have at least 80% SHS GPA.',
          'Submit your birth certificate and marginalized group certification to OSJPAR.');
      }

      // Military grants
      if (p.incoming_military === 'kia') {
        add('P.D. 577 Study Grant', 'likely', 'Dependent of a KIA/CDD military personnel — this is the exact qualification for P.D. 577.', 'Have the AFP forward their recommendation to OSJPAR at least one month before enrollment.');
        add('AFPEBS–MSEUF Educational Benefit Program', 'likely', 'As a dependent of a deceased/disabled military member, you fall under first or second priority for AFPEBS.', 'Submit your application at the Alumni Building.');
      } else if (p.incoming_military === 'active' || p.incoming_military === 'afpebs') {
        add('AFPEBS–MSEUF Educational Benefit Program', 'likely', 'As a dependent of active military / AFPEBS member, you qualify under third priority.', 'Submit your application to OSJPAR at the Alumni Building.');
      }

      // Athletic
      if (p.incoming_sport === 'yes') {
        add('Athletic Scholarship Grant', 'partial', 'You must be selected to represent MSEUF in competitions — this is by coach nomination, not self-application.', 'Inform your coach or the PE department of your intent to compete for the university.');
      }

      // Service grants
      if (p.incoming_arts === 'yes') {
        add('Service Grants (Chamberwinds / Concert Singers / Banyuhay)', 'partial', 'You must pass auditions and be nominated by the band master, choir master, or dance master.', 'Audition for your respective group. The group master handles the nomination.');
      }

      // Need-based (incoming)
      if (p.incoming_financial === 'yes') {
        add('MSEUF Foundation Grant', 'partial', 'For financially deserving students. Must pass social investigation and interview. Limited slots available.', 'Submit application documents to OSJPAR. Look for Ms. Juliene at Room 1, Alumni Building.');
        add('P.D. 451 Study Grant', 'partial', 'One scholar per 500 tertiary students. Requires interview and GPA not below 2.50. Priority given to Indigenous People and PWDs.', 'Submit complete requirements to OSJPAR for initial screening.');
        add('Student Assistantship', 'partial', 'Qualified students may be recruited to do part-time duties in university units as Tuition-Aid or Foundation Grantees. Apply after being awarded a qualifying grant.', 'Submit your application to OSJPAR at the Alumni Building and follow up after one month.');
      }

      // Miss MSEUF (incoming)
      if (p.incoming_gender === 'yes') {
        add('Miss MSEUF Study Grant', 'partial', 'Full tuition discount for one school year for the reigning Miss MSEUF. Convertible to cash if also receiving another scholarship or graduating.', 'Join the Miss MSEUF pageant. The grant is awarded upon winning the title.');
      }

      // Trustee Study Grant
      add('Trustee Study Grant', 'partial', 'Full tuition grant awarded by nomination from a member of the Board of Trustees. This is not a self-application — you must be nominated.', 'If you believe you may be nominated, coordinate with your college dean or the Trustee\'s office.');

      // Government grants 
      add('Government Grants (CHED / DOST / TESDA)', 'partial', 'Government grants are available if you qualify under CHED, DOST, or TESDA priority programs. Applications go directly through government websites.', 'Visit the CHED or DOST website to check if your program is included.');

    // ── ENROLLED STUDENT SCHOLARSHIPS ──
    } else if (p.start === 'enrolled') {

      // Academic Scholarship
      if (p.enrolled_gpa === '1.0-1.3' && p.enrolled_units === '18+') {
        add('University Academic Scholarship Grant', 'likely', '100% tuition discount. You meet both the GPA (1.000–1.300) and unit load (18+) requirements. This is auto-evaluated by the system — no application needed.', 'No action needed. The system evaluates this automatically each semester.');
      } else if (p.enrolled_gpa === '1.3-1.5' && p.enrolled_units === '18+') {
        add('College Academic Scholarship Grant', 'likely', '50% tuition discount. You meet both the GPA (1.301–1.500) and unit load (18+) requirements. Auto-evaluated — no application needed.', 'No action needed. The system evaluates this automatically.');
      } else if ((p.enrolled_gpa === '1.0-1.3' || p.enrolled_gpa === '1.3-1.5') && p.enrolled_units !== '18+') {
        add('Academic Scholarship Grant', 'partial', 'Your GPA qualifies, but you need to be enrolled in at least 18 units. Below 18 units requires a manual application (ASG form).', 'Submit an Application for Scholarship Grades (ASG) to OSJPAR.');
      }

      // RA 6728
      if (p.enrolled_province === 'yes') {
        add('R.A. 6728 Study Grant', 'likely', 'Being born in Quezon Province is the primary requirement. You must also belong to a marginalized group.', 'Submit your birth certificate and marginalized group certification to OSJPAR.');
      }

      // Military
      if (p.enrolled_military === 'kia') {
        add('P.D. 577 Study Grant', 'likely', 'Dependent of KIA/CDD military personnel — exact qualification for P.D. 577.', 'Have AFP forward the recommendation to OSJPAR before enrollment.');
        add('AFPEBS–MSEUF Educational Benefit Program', 'likely', 'First or second priority as a dependent of deceased/disabled military.', 'Submit application at the Alumni Building.');
      } else if (p.enrolled_military === 'active') {
        add('AFPEBS–MSEUF Educational Benefit Program', 'likely', 'Third priority as a dependent of active military / AFPEBS member.', 'Submit application to OSJPAR.');
      }

      // Involvement-based
      if (p.enrolled_involvement === 'sport') {
        add('Athletic Scholarship Grant', 'partial', 'Must be officially chosen to represent MSEUF in competitions — by coach nomination only.', 'Inform your coach of your intent. They handle the nomination to OSJPAR.');
      } else if (p.enrolled_involvement === 'arts') {
        add('Service Grants (Chamberwinds / Concert Singers / Banyuhay)', 'partial', 'Must pass screening and be nominated by your group master.', 'Speak with your band master, choir master, or dance master.');
      } else if (p.enrolled_involvement === 'council') {
        add('UCSC Study Grant', 'likely', 'The UCSC President is entitled to a full tuition discount for one year.', 'Submit your application to OSJPAR at the Alumni Building.');
      } else if (p.enrolled_involvement === 'nrotc') {
        add('NROTC Corps Commander Study Grant', 'likely', 'The endorsed NROTC Corps Commander receives 100% tuition for one year.', 'The Commandant endorses you — coordinate with the NROTC office.');
      } else if (p.enrolled_involvement === 'publication') {
        add('The Luzonian Study Grant', 'likely', 'Editor-in-Chief gets 100% tuition; Managing Editor gets 50%. Must pass editorial exams and interview.', 'Join The Luzonian and take the competitive editorial examination.');
      }

      // Need-based
      if (p.enrolled_financial === 'yes') {
        add('MSEUF Foundation Grant', 'partial', 'For financially deserving students. Must pass social investigation and interview. Limited slots available.', 'Submit application documents to OSJPAR. Look for Ms. Juliene at Room 1, Alumni Building.');
        add('Alumni-Sponsored / Corporate-Sponsored / Individual Endowments', 'partial', 'Need-based grants requiring social investigation and a qualifying exam.', 'Submit your application to OSJPAR and follow up after one month.');
        add('P.D. 451 Study Grant', 'partial', 'One scholar per 500 tertiary students. Requires interview and GPA not below 2.50. Priority given to Indigenous People and PWDs.', 'Submit complete requirements to OSJPAR for initial screening.');
        add('Student Assistantship', 'partial', 'Qualified students may be recruited to do part-time duties in university units as Tuition-Aid or Foundation Grantees. Typically awarded alongside or after receiving a qualifying grant.', 'Submit your application to OSJPAR at the Alumni Building and follow up after one month.');
      }

      // Miss MSEUF (enrolled)
      if (p.enrolled_gender === 'yes') {
        add('Miss MSEUF Study Grant', 'partial', 'Full tuition discount for one school year for the reigning Miss MSEUF. Convertible to cash if also receiving another scholarship or graduating.', 'Join the Miss MSEUF pageant. The grant is awarded upon winning the title.');
      }

      // Trustee Study Grant 
      add('Trustee Study Grant', 'partial', 'Full tuition grant awarded by nomination from a member of the Board of Trustees. This is not a self-application — you must be nominated.', 'If you believe you may be nominated, coordinate with your college dean or the Trustee\'s office.');

      // Government
      add('Government Grants (CHED / DOST / TESDA)', 'partial', 'If your program is under CHED or DOST priority areas, you may qualify. Applications go directly through government websites.', 'Visit the CHED or DOST website to apply, then inform OSJPAR.');
    }

    return results;
  }

  // ── RENDERER ──────────────────────────────────────────────────────────────────
  let currentNodeId = 'start';
  let stepCount = 0;
  const TOTAL_STEPS = 8;

  function renderNode(nodeId) {
    currentNodeId = nodeId;
    if (nodeId === 'RESULTS') { renderResults(); return; }
    const node = TREE[nodeId];
    if (!node) { renderResults(); return; }

    const body = document.getElementById('checkerBody');
    body.style.overflowY = 'auto';
    body.style.maxHeight = '440px';

    let html = `<div style="margin-bottom:20px;">`;
    if (node.sub) {
      html += `<p style="font-size:0.78rem;color:var(--muted);margin-bottom:10px;line-height:1.5;">${node.sub}</p>`;
    }
    html += `<p style="font-size:1rem;font-weight:600;color:var(--text);line-height:1.45;margin-bottom:18px;">${node.question}</p>`;
    html += `<div style="display:flex;flex-direction:column;gap:9px;">`;
    node.options.forEach((opt, i) => {
      html += `<button onclick="selectOption('${nodeId}','${opt.value}','${opt.next}')"
        style="text-align:left;padding:12px 16px;border:1.5px solid var(--border);border-radius:9px;
        background:var(--white);color:var(--text);font-size:0.88rem;cursor:pointer;
        font-family:inherit;transition:all 0.15s;line-height:1.4;"
        onmouseover="this.style.borderColor='var(--maroon)';this.style.color='var(--maroon)';"
        onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text)';">
        ${opt.label}
      </button>`;
    });
    html += `</div></div>`;

    if (stepCount > 0) {
      html += `<button onclick="goBack()" style="background:none;border:none;color:var(--muted);font-size:0.8rem;cursor:pointer;padding:4px 0;font-family:inherit;">← Back</button>`;
    }

    body.innerHTML = html;
    updateProgress();
  }

  let history = [];

  function selectOption(nodeId, value, next) {
    history.push({ nodeId, profileKey: nodeId, profileVal: profile[nodeId] });
    profile[nodeId] = value;
    stepCount++;
    renderNode(next);
  }

  function goBack() {
    if (history.length === 0) return;
    const prev = history.pop();
    delete profile[prev.nodeId];
    stepCount = Math.max(0, stepCount - 1);
    renderNode(prev.nodeId);
  }

  function updateProgress() {
    const pct = Math.min(100, (stepCount / TOTAL_STEPS) * 100);
    document.getElementById('checkerProgressBar').style.width = pct + '%';
  }

  function renderResults() {
    document.getElementById('checkerProgressBar').style.width = '100%';
    const results = evaluate();
    const likely = results.filter(r => r.status === 'likely');
    const partial = results.filter(r => r.status === 'partial');

    const body = document.getElementById('checkerBody');
    body.style.overflowY = 'auto';
    body.style.maxHeight = '480px';

    let html = '';

    // Summary
    html += `<div style="background:var(--white);border:1px solid var(--border);border-radius:10px;padding:16px 18px;margin-bottom:20px;display:flex;align-items:center;gap:14px;">
      <div style="font-size:2rem;">${likely.length > 0 ? '🎓' : '📋'}</div>
      <div>
        <div style="font-weight:600;font-size:1rem;color:var(--text);">${likely.length} scholarship${likely.length !== 1 ? 's' : ''} you may qualify for</div>
        <div style="font-size:0.82rem;color:var(--muted);margin-top:2px;">${partial.length} additional scholarship${partial.length !== 1 ? 's' : ''} worth exploring</div>
      </div>
    </div>`;

    // Likely
    if (likely.length > 0) {
      html += `<p style="font-size:0.72rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--success);margin-bottom:10px;">✅ Likely qualify</p>`;
      likely.forEach(r => {
        html += resultCard(r, 'eligible', '#2A6B3C', 'rgba(42,107,60,0.06)', 'rgba(42,107,60,0.35)');
      });
    }

    // Partial
    if (partial.length > 0) {
      html += `<p style="font-size:0.72rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--warn);margin-bottom:10px;margin-top:18px;">⚠️ Worth exploring</p>`;
      partial.forEach(r => {
        html += resultCard(r, 'partial', '#8B5E0A', 'rgba(139,94,10,0.05)', 'rgba(139,94,10,0.3)');
      });
    }

    if (results.length === 0) {
      html += `<p style="font-size:0.9rem;color:var(--muted);line-height:1.7;">Based on your answers, no direct matches were found. We recommend visiting OSJPAR at the Alumni Building for a full personal assessment.</p>`;
    }

    html += `<div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);display:flex;gap:10px;flex-wrap:wrap;">
      <button onclick="restartChecker()" style="background:none;border:1.5px solid var(--border);border-radius:8px;padding:9px 16px;font-size:0.82rem;cursor:pointer;font-family:inherit;color:var(--muted);">← Start over</button>
      <button onclick="closeModal()" style="background:var(--maroon);color:white;border:none;border-radius:8px;padding:9px 18px;font-size:0.82rem;font-weight:600;cursor:pointer;font-family:inherit;flex:1;">Done</button>
    </div>`;

    body.innerHTML = html;
  }

  function resultCard(r, cls, textColor, bg, borderColor) {
    return `<div style="border:1px solid ${borderColor};border-radius:10px;padding:14px 16px;margin-bottom:10px;background:${bg};">
      <div style="font-weight:600;font-size:0.9rem;color:var(--text);margin-bottom:5px;">${r.name}</div>
      <div style="font-size:0.8rem;color:var(--muted);line-height:1.55;margin-bottom:6px;">${r.reason}</div>
      <div style="font-size:0.78rem;color:${textColor};font-style:italic;">Next step: ${r.next}</div>
    </div>`;
  }

  // ── PER-SCHOLARSHIP TARGETED CHECKS ─────────────────────────────────────────────
  // Each entry has its own short question tree (same node/option/next shape as the
  // global TREE above) plus its own evaluate() that returns a single result based on
  // that scholarship's specific qualifications. The global checker above is untouched.
  const FOCUS_CHECKS = {
    'University Academic Scholarship Grant': {
      steps: 3,
      tree: {
        start: {
          question: 'How many academic units are you currently enrolled in?',
          sub: 'Excludes NSTP, Euthenics, and bracketed subjects.',
          options: [
            { label: '18 units or more', value: '18+', next: 'gpa' },
            { label: '15 to 17 units', value: '15-17', next: 'gpa' },
            { label: 'Less than 15 units', value: '<15', next: 'gpa' }
          ]
        },
        gpa: {
          question: 'What is your current GPA?',
          sub: 'Use the 1.0–5.0 scale (1.0 = highest). If unsure of exact GPA, choose the closest range.',
          options: [
            { label: '1.000 – 1.300', value: '1.0-1.3', next: 'grade' },
            { label: '1.301 – 1.500', value: '1.3-1.5', next: 'grade' },
            { label: '1.501 – 2.500', value: '1.5-2.5', next: 'grade' },
            { label: 'Below 2.500', value: 'below2.5', next: 'grade' }
          ]
        },
        grade: {
          question: 'Do you have any grade lower than 2.0 in any subject this semester?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.grade === 'yes') {
          return { status: 'ineligible', reason: 'A grade below 2.0 in any subject disqualifies you from the University Academic Grant, regardless of your overall average.', next: 'Focus on raising that grade next semester, then re-check your eligibility.' };
        }
        if (p.gpa === '1.0-1.3') {
          if (p.units === '18+') {
            return { status: 'eligible', reason: 'You meet the GPA (1.000–1.300) and unit-load (18+) requirements with no grade below 2.0. This scholarship is auto-evaluated by the system — no manual application is required.', next: 'No action needed — the 100% tuition discount is credited automatically each semester.' };
          }
          return { status: 'partial', reason: 'Your GPA qualifies for the 100% University Grant, but automatic evaluation only applies at 18+ units. Since you\'re under that, you\'ll need to apply manually.', next: 'Submit an Application for Scholarship Grades (ASG) to the Office of Scholarships.' };
        }
        return { status: 'ineligible', reason: 'Your GPA doesn\'t fall within the 1.000–1.300 range required for the University (100%) Grant.', next: 'Check the College Academic Scholarship Grant (50%) card — your GPA may qualify there instead.' };
      }
    },

    'College Academic Scholarship Grant': {
      steps: 3,
      tree: {
        start: {
          question: 'How many academic units are you currently enrolled in?',
          sub: 'Excludes NSTP, Euthenics, and bracketed subjects.',
          options: [
            { label: '18 units or more', value: '18+', next: 'gpa' },
            { label: '15 to 17 units', value: '15-17', next: 'gpa' },
            { label: 'Less than 15 units', value: '<15', next: 'gpa' }
          ]
        },
        gpa: {
          question: 'What is your current GPA?',
          sub: 'Use the 1.0–5.0 scale (1.0 = highest). If unsure of exact GPA, choose the closest range.',
          options: [
            { label: '1.000 – 1.300', value: '1.0-1.3', next: 'grade' },
            { label: '1.301 – 1.500', value: '1.3-1.5', next: 'grade' },
            { label: '1.501 – 2.500', value: '1.5-2.5', next: 'grade' },
            { label: 'Below 2.500', value: 'below2.5', next: 'grade' }
          ]
        },
        grade: {
          question: 'Do you have any grade lower than 2.0 in any subject this semester?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.grade === 'yes') {
          return { status: 'ineligible', reason: 'A grade below 2.0 in any subject disqualifies you from the College Academic Grant, regardless of your overall average.', next: 'Focus on raising that grade next semester, then re-check your eligibility.' };
        }
        if (p.gpa === '1.3-1.5') {
          if (p.units === '18+') {
            return { status: 'eligible', reason: 'You meet the GPA (1.301–1.500) and unit-load (18+) requirements with no grade below 2.0. This scholarship is auto-evaluated by the system — no manual application is required.', next: 'No action needed — the 50% tuition discount is credited automatically each semester.' };
          }
          return { status: 'partial', reason: 'Your GPA qualifies for the 50% College Grant, but automatic evaluation only applies at 18+ units. Since you\'re under that, you\'ll need to apply manually.', next: 'Submit an Application for Scholarship Grades (ASG) to the Office of Scholarships.' };
        }
        if (p.gpa === '1.0-1.3') {
          return { status: 'partial', reason: 'Your GPA actually falls in the higher 1.000–1.300 range.', next: 'Check the University Academic Scholarship Grant (100%) card instead — you likely qualify there.' };
        }
        return { status: 'ineligible', reason: 'Your GPA doesn\'t fall within the 1.301–1.500 range required for the College Grant.', next: 'Visit OSJPAR if you believe your standing may still qualify for another grant.' };
      }
    },

    'AFPEBS–MSEUF Educational Benefit Program': {
      steps: 3,
      tree: {
        start: {
          question: 'Are you a dependent of military personnel?',
          options: [
            { label: 'Yes — combat casualty (KIA/CDD)', value: 'kia', next: 'nursing' },
            { label: 'Yes — non-combat casualty', value: 'noncombat', next: 'nursing' },
            { label: 'Yes — active military personnel', value: 'active', next: 'nursing' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        },
        nursing: {
          question: 'Are you currently enrolled in the Nursing program?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'pass' }
          ]
        },
        pass: {
          question: 'Did you pass all subjects you were enrolled in last semester?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'no') {
          return { status: 'ineligible', reason: 'AFPEBS requires you to be a dependent of military personnel — combat casualty, non-combat casualty, or active personnel.', next: 'Check other grants like P.D. 577 or P.D. 451 if they may apply to your situation.' };
        }
        if (p.nursing === 'yes') {
          return { status: 'ineligible', reason: 'AFPEBS benefits are not applicable to students enrolled in the Nursing program.', next: 'Speak with OSJPAR about other need-based grants you may qualify for.' };
        }
        const tier = p.start === 'kia' ? 'first priority (combat casualty dependent)' : p.start === 'noncombat' ? 'second priority (non-combat casualty dependent)' : 'third priority (active personnel dependent)';
        if (p.pass === 'no') {
          return { status: 'partial', reason: `You qualify under ${tier}, but retaining the grant requires passing all enrolled subjects each semester.`, next: 'Submit your application to OSJPAR and work on a clean academic record going forward.' };
        }
        return { status: 'eligible', reason: `You qualify under ${tier} and have a clean academic record. This benefit isn't applicable during Summer Term.`, next: 'Submit your application to OSJPAR at the Alumni Building.' };
      }
    },

    'Alumni-Sponsored Scholarship / Study Grant': {
      steps: 2,
      tree: {
        start: {
          question: 'Are you willing to undergo a social investigation (home and family background check)?',
          options: [
            { label: 'Yes', value: 'yes', next: 'exam' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        },
        exam: {
          question: 'Are you willing to take the qualifying examination required for this grant?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'no') {
          return { status: 'ineligible', reason: 'Passing a social investigation is a mandatory requirement for alumni-sponsored grants.', next: 'Reconsider if your circumstances change, or explore other grant types.' };
        }
        if (p.exam === 'no') {
          return { status: 'ineligible', reason: 'You must be willing to pass the qualifying examination to be considered.', next: 'Reach out to OSJPAR if you\'d like more detail on the exam itself.' };
        }
        return { status: 'partial', reason: 'You meet the basic willingness requirements. Final approval depends on an alumni benefactor choosing to sponsor you after an interview.', next: 'Submit your application to OSJPAR; they\'ll advise you if a benefactor wishes to interview you.' };
      }
    },

    'Athletic Scholarship Grant': {
      steps: 5,
      tree: {
        start: {
          question: 'Are you a Filipino citizen and a bona fide MSEUF college student?',
          options: [
            { label: 'Yes', value: 'yes', next: 'units' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        },
        units: {
          question: 'Are you carrying at least 15 academic units this term?',
          options: [
            { label: 'Yes', value: '15+', next: 'passed' },
            { label: 'No', value: '<15', next: 'grad' }
          ]
        },
        grad: {
          question: 'If under 15 units — are you a graduating student within your 5-year playing period?',
          options: [
            { label: 'Yes', value: 'yes', next: 'passed' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        },
        passed: {
          question: 'Did you pass at least 70% of your units with no incomplete marks last term?',
          options: [
            { label: 'Yes', value: 'yes', next: 'select' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        },
        select: {
          question: 'Have you been officially selected or endorsed by a coach to represent MSEUF in competitions?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No, not yet', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'no') {
          return { status: 'ineligible', reason: 'Must be a Filipino citizen and a bona fide MSEUF college student.', next: 'No further action available for this grant.' };
        }
        if (p.units === '<15' && p.grad !== 'yes') {
          return { status: 'ineligible', reason: 'Must carry a minimum of 15 units, unless you\'re a graduating student within your 5-year playing period.', next: 'Re-check once your unit load meets the requirement.' };
        }
        if (p.passed === 'no') {
          return { status: 'ineligible', reason: 'Must have passed at least 70% of your previous term\'s load with no incomplete marks.', next: 'Re-check next term once your academic standing improves.' };
        }
        if (p.select === 'no') {
          return { status: 'partial', reason: 'Your academic standing looks fine, but this scholarship requires official selection by a coach — it isn\'t self-applied.', next: 'Inform your coach or the PE department of your intent to compete for the university.' };
        }
        return { status: 'eligible', reason: 'You meet the citizenship, unit-load, and passing-rate requirements, and have been selected to represent the university.', next: 'Submit the APPLICATION FOR SCHOLARSHIP to OSJPAR at the Alumni Building.' };
      }
    },

    'Corporate-Sponsored Scholarship / Study Grant': {
      steps: 2,
      tree: {
        start: {
          question: 'Are you willing to undergo a social investigation and qualifying exam?',
          options: [
            { label: 'Yes', value: 'yes', next: 'workstudy' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        },
        workstudy: {
          question: 'Are you willing to comply with work-study guidelines if required by the sponsor?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'no') {
          return { status: 'ineligible', reason: 'Passing a social investigation and qualifying exam is mandatory for corporate-sponsored grants.', next: 'Explore other grant types that may better fit your situation.' };
        }
        if (p.workstudy === 'no') {
          return { status: 'partial', reason: 'Some corporate sponsors require work-study compliance to retain the grant — confirm specific terms with OSJPAR before applying.', next: 'Submit your application to OSJPAR and clarify the sponsor\'s requirements.' };
        }
        return { status: 'partial', reason: 'You meet the basic requirements. Final approval depends on a corporate sponsor selecting you after the qualifying process.', next: 'Submit your application to OSJPAR and follow up after one month.' };
      }
    },

    'Enverga Scholarship Grant (ESG)': {
      steps: 3,
      tree: {
        start: {
          question: 'Which best describes you?',
          options: [
            { label: 'Incoming Grade 7 / Grade 11 (Basic Education)', value: 'basiced', next: 'rank' },
            { label: 'Incoming 1st year college / SHS graduate', value: 'college', next: 'honors' }
          ]
        },
        rank: {
          question: 'What is your class rank?',
          options: [
            { label: 'Rank 1 (Valedictorian)', value: 'rank1', next: 'RESULTS' },
            { label: 'Rank 2 (Salutatorian)', value: 'rank2', next: 'RESULTS' },
            { label: 'Other rank', value: 'other', next: 'RESULTS' }
          ]
        },
        honors: {
          question: 'What honors did you graduate with?',
          options: [
            { label: 'Highest Honors', value: 'highest', next: 'cert' },
            { label: 'High Honors', value: 'high', next: 'cert' },
            { label: 'With Honors only', value: 'honors', next: 'RESULTS' },
            { label: 'No honors', value: 'none', next: 'RESULTS' }
          ]
        },
        cert: {
          question: 'Can you submit a Principal\'s Certification of Honors (signed, with school seal)?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'Not yet', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'basiced') {
          if (p.rank === 'rank1') return { status: 'eligible', reason: 'As Valedictorian (Rank 1), you qualify for a 100% tuition discount, provided your graduating class has at least 40 students.', next: 'Submit Principal Certification of Rank, Birth Certificate, Barangay Certificate of Residency, and your graduation program copy.' };
          if (p.rank === 'rank2') return { status: 'eligible', reason: 'As Salutatorian (Rank 2), you qualify for a 50% tuition discount, provided your graduating class has at least 40 students.', next: 'Submit Principal Certification of Rank, Birth Certificate, Barangay Certificate of Residency, and your graduation program copy.' };
          return { status: 'ineligible', reason: 'ESG for Basic Education is limited to Rank 1 (Valedictorian) and Rank 2 (Salutatorian).', next: 'Check other Basic Education scholarships you may qualify for.' };
        }
        if (p.honors === 'none') {
          return { status: 'ineligible', reason: 'ESG for incoming college students requires at least "With High Honors" — no honors won\'t qualify.', next: 'Look into need-based grants like the MSEUF Foundation Grant instead.' };
        }
        if (p.honors === 'honors') {
          return { status: 'partial', reason: '"With Honors" may not meet ESG\'s threshold, which requires High Honors or Highest Honors at minimum — confirm with OSJPAR.', next: 'Bring your award documentation to OSJPAR for confirmation.' };
        }
        if (p.cert === 'no') {
          return { status: 'partial', reason: 'You meet the honors requirement, but you\'ll need your Principal\'s Certification of Honors (with signature and school seal) before applying.', next: 'Request your certification, then submit it with your other documents at least one week before the exam date.' };
        }
        return { status: 'eligible', reason: 'You meet the honors and certification requirements. You\'ll still need to take and pass the qualifying exam — Top 10 examinees receive 100% tuition plus fees for 4 years; other passers receive 100% or 50% tuition for 1 year.', next: 'Submit your documents in PDF format and watch for the qualifying exam schedule from the Guidance and Testing Office.' };
      }
    },

    'Government Grants (CHED / DOST / TESDA)': {
      steps: 1,
      tree: {
        start: {
          question: 'Is your degree program listed as a priority program by CHED, DOST, or TESDA?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' },
            { label: 'Not sure', value: 'unsure', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'yes') {
          return { status: 'partial', reason: 'Government scholarships are awarded directly by the sponsoring agency, not by MSEUF.', next: 'Apply through the CHED, DOST, or TESDA website, then inform the Scholarship Office.' };
        }
        if (p.start === 'no') {
          return { status: 'ineligible', reason: 'Government grants are limited to priority programs designated by the sponsoring agency. Your program doesn\'t appear to qualify.', next: 'Check other scholarship types you may be eligible for instead.' };
        }
        return { status: 'partial', reason: 'You\'re not sure yet whether your program is a priority program.', next: 'Check the CHED or DOST website to confirm, then inform OSJPAR of any application.' };
      }
    },

    'Individual Endowments': {
      steps: 1,
      tree: {
        start: {
          question: 'Are you willing to undergo a social investigation and qualifying exam for an individual sponsor?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'no') {
          return { status: 'ineligible', reason: 'Passing a social investigation and qualifying exam is mandatory for individually-sponsored grants.', next: 'Explore other grant types that may better fit your situation.' };
        }
        return { status: 'partial', reason: 'You meet the basic willingness requirement. An individual sponsor must choose to fund your grant after the investigation and exam.', next: 'Submit your application to OSJPAR and follow up after one month.' };
      }
    },

    'Miss MSEUF Grant': {
      steps: 1,
      tree: {
        start: {
          question: 'Are you a female student who has won — or is planning to join — the Miss MSEUF pageant?',
          options: [
            { label: 'Already crowned Miss MSEUF', value: 'won', next: 'RESULTS' },
            { label: 'Planning to join the pageant', value: 'planning', next: 'RESULTS' },
            { label: 'Not applicable to me', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'won') {
          return { status: 'eligible', reason: 'As the reigning Miss MSEUF, you\'re entitled to a full tuition discount for one school year (convertible to cash if you hold another scholarship or are graduating).', next: 'Submit the APPLICATION FOR SCHOLARSHIP to OSJPAR at the Alumni Building.' };
        }
        if (p.start === 'planning') {
          return { status: 'partial', reason: 'This grant is only awarded to the student who wins the Miss MSEUF title.', next: 'Join the Miss MSEUF pageant — the grant follows automatically once you win.' };
        }
        return { status: 'ineligible', reason: 'This grant is exclusively for the reigning Miss MSEUF titleholder.', next: 'Check other scholarships that may better suit your situation.' };
      }
    },

    'MSEUF Foundation Grant': {
      steps: 2,
      tree: {
        start: {
          question: 'Would you describe your family\'s financial situation as low-income or financially disadvantaged?',
          options: [
            { label: 'Yes', value: 'yes', next: 'docs' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        },
        docs: {
          question: 'Can you provide a Certificate of Indigency and BIR Certificate of Non-Tax Filer for your parents?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'Not yet', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'no') {
          return { status: 'ineligible', reason: 'The Foundation Grant is need-based — it\'s intended for financially disadvantaged students.', next: 'Look into merit-based grants like the Academic Scholarship instead.' };
        }
        if (p.docs === 'no') {
          return { status: 'partial', reason: 'You may qualify based on need, but you\'ll need a Certificate of Indigency and BIR Certificate of Non-Tax Filer to complete your application.', next: 'Gather those documents, then submit your application form, Report Card, and Birth Certificate via the OneDrive link or in person at Room 1, Alumni Building.' };
        }
        return { status: 'partial', reason: 'You meet the basic need-based criteria and have the required documents. Slots are limited and qualified applicants are called for an interview — approval isn\'t guaranteed.', next: 'Submit your complete documents and watch for an interview invitation. Look for Ms. Juliene at Room 1, Alumni Building.' };
      }
    },

    'NROTC Corps Commander Study Grant': {
      steps: 1,
      tree: {
        start: {
          question: 'Have you been endorsed by the MSEUF NROTC Commandant as Corps Commander?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'yes') {
          return { status: 'eligible', reason: 'As the endorsed NROTC Corps Commander, you\'re entitled to a full tuition discount for one year. Renewal requires re-endorsement and no incomplete or failing marks.', next: 'Submit the APPLICATION FOR SCHOLARSHIP to OSJPAR at the Alumni Building.' };
        }
        return { status: 'ineligible', reason: 'This grant is reserved exclusively for the student endorsed by the NROTC Commandant as Corps Commander.', next: 'Check other military-related grants like AFPEBS if applicable to you.' };
      }
    },

    'P.D. 451 Study Grant': {
      steps: 2,
      tree: {
        start: {
          question: 'Would you describe your family as financially disadvantaged, Indigenous, or a Person with Disability?',
          options: [
            { label: 'Yes', value: 'yes', next: 'grade' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        },
        grade: {
          question: 'Do you currently maintain a GPA of 2.50 or better with no failing marks?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'no') {
          return { status: 'ineligible', reason: 'P.D. 451 is a need-based grant for financially disadvantaged students, with priority given to Indigenous Peoples and PWDs under RA 8371 and RA 10754.', next: 'Look into other need-based grants like the MSEUF Foundation Grant.' };
        }
        if (p.grade === 'no') {
          return { status: 'partial', reason: 'Financial need may qualify you, but P.D. 451 grantees must maintain a GPA of 2.50 or better with no failing marks to retain the grant.', next: 'Work on your academic standing, then submit your documents to OSJPAR.' };
        }
        return { status: 'partial', reason: 'You meet the eligibility profile. Only one scholar is selected per 500 enrolled students, and you\'ll be screened and interviewed (Grades 30%, Communication 25%, Commitment to Goals 25%, Personality 20%) before being endorsed to the Scholarship Committee.', next: 'Submit your application form, grades, Birth Certificate, Good Moral Certificate, and Certificate of Indigency to OSJPAR.' };
      }
    },

    'P.D. 577 Study Grant': {
      steps: 1,
      tree: {
        start: {
          question: 'Is a parent or guardian military personnel who was killed in action (KIA) or rendered completely disabled (CDD)?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'yes') {
          return { status: 'eligible', reason: 'As a dependent of a KIA/CDD military personnel, you meet P.D. 577\'s core qualification. Only one grant is extended per 2,000 students.', next: 'Have the AFP forward its recommendation to OSJPAR at least one month before enrollment.' };
        }
        return { status: 'ineligible', reason: 'P.D. 577 is strictly limited to dependents of military personnel killed in action or rendered completely disabled.', next: 'Check AFPEBS or P.D. 451 if they may better fit your situation.' };
      }
    },

    'R.A. 6728 Study Grant': {
      steps: 3,
      tree: {
        start: {
          question: 'Were you born in a municipality of Quezon Province?',
          options: [
            { label: 'Yes', value: 'yes', next: 'marginalized' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        },
        marginalized: {
          question: 'Do you belong to a marginalized group (with proper certification)?',
          options: [
            { label: 'Yes', value: 'yes', next: 'gpa' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        },
        gpa: {
          question: 'Did you have at least 80% GPA in Senior High School?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'no') {
          return { status: 'ineligible', reason: 'R.A. 6728 requires you to have been born in a municipality of Quezon Province.', next: 'Check other province- or residency-based grants if applicable.' };
        }
        if (p.marginalized === 'no') {
          return { status: 'partial', reason: 'Being born in Quezon Province meets one requirement, but you\'ll also need certification of belonging to a marginalized group.', next: 'Secure your marginalized-group certification, then re-check.' };
        }
        if (p.gpa === 'no') {
          return { status: 'partial', reason: 'You meet the residency and marginalized-group requirements, but R.A. 6728 also requires at least 80% GPA in Senior High School.', next: 'If your records show a different result, bring them to OSJPAR for confirmation.' };
        }
        return { status: 'eligible', reason: 'You meet the residency, marginalized-group, and academic requirements. MSEUF grants this to at least 5% of enrollees yearly.', next: 'Submit the Application for Scholarship to OSJPAR along with your Board of Trustees endorsement.' };
      }
    },

    'Service Grants': {
      steps: 2,
      tree: {
        start: {
          question: 'Are you interested in joining the MSEUF Chamberwinds, Concert Singers, or Banyuhay Dance Troupe?',
          options: [
            { label: 'Yes', value: 'yes', next: 'audition' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        },
        audition: {
          question: 'Have you passed the screening/audition and been nominated by the group\'s master or adviser?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'Not yet', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'no') {
          return { status: 'ineligible', reason: 'Service grants are exclusive to members of the Chamberwinds, Concert Singers, or Banyuhay Dance Troupe.', next: 'Check other talent-based grants like the Athletic Scholarship if applicable.' };
        }
        if (p.audition === 'no') {
          return { status: 'partial', reason: 'Passing the screening and being nominated by the band, choir, or dance master are required before this grant can be awarded.', next: 'Audition for your group of interest first — the master handles the nomination afterward.' };
        }
        return { status: 'eligible', reason: 'You\'ve passed screening and have a nomination. Note that this grant applies to one undergraduate program only and requires attendance at major university functions.', next: 'Submit the APPLICATION FOR SCHOLARSHIP to OSJPAR at the Alumni Building.' };
      }
    },

    'Student Assistantship': {
      steps: 1,
      tree: {
        start: {
          question: 'Are you currently a Tuition-Aid or Foundation Grantee?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'yes') {
          return { status: 'eligible', reason: 'As a Tuition-Aid or Foundation Grantee, you may be recruited for part-time duties in university units. Just avoid incomplete or failing marks to retain it.', next: 'Submit the APPLICATION FOR SCHOLARSHIP to OSJPAR at the Alumni Building.' };
        }
        return { status: 'partial', reason: 'Student Assistantship recruitment is typically limited to existing Tuition-Aid or Foundation Grantees.', next: 'Securing one of those grants first will improve your chances — check the Foundation Grant card.' };
      }
    },

    'The Luzonian Study Grant': {
      steps: 2,
      tree: {
        start: {
          question: 'Are you applying for Editor-in-Chief or Managing Editor of The Luzonian?',
          options: [
            { label: 'Editor-in-Chief', value: 'eic', next: 'exam' },
            { label: 'Managing Editor', value: 'me', next: 'exam' },
            { label: 'Neither', value: 'no', next: 'RESULTS' }
          ]
        },
        exam: {
          question: 'Are you prepared to take the competitive editorial written exam and oral interview?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'no') {
          return { status: 'ineligible', reason: 'This grant is limited to The Luzonian\'s Editor-in-Chief and Managing Editor.', next: 'Join The Luzonian\'s staff first if you\'re interested in pursuing this role.' };
        }
        if (p.exam === 'no') {
          return { status: 'partial', reason: 'The role requires passing competitive editorial exams and an oral interview with the Editorial Board — that\'s a hard requirement.', next: 'Prepare for the editorial exam and interview, then re-check.' };
        }
        if (p.start === 'eic') {
          return { status: 'eligible', reason: 'Editors-in-Chief who pass the Editorial Board\'s exams and interview receive a free full-tuition discount for their term.', next: 'Take the competitive written editorial examination and oral interview with the Editorial Board.' };
        }
        return { status: 'eligible', reason: 'Managing Editors who pass the Editorial Board\'s exams and interview receive a 50% tuition discount for their term.', next: 'Take the competitive written editorial examination and oral interview with the Editorial Board.' };
      }
    },

    'Trustee Study Grant': {
      steps: 1,
      tree: {
        start: {
          question: 'Have you been nominated by a member of the Board of Trustees?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'yes') {
          return { status: 'eligible', reason: 'As a Trustee nominee, you qualify for the full-tuition grant. Renewal requires passing all subjects and continued nomination by your sponsoring Trustee.', next: 'Submit the APPLICATION FOR SCHOLARSHIP to OSJPAR at the Alumni Building.' };
        }
        return { status: 'partial', reason: 'This grant requires direct nomination by a Board of Trustees member based on their quota — it can\'t be self-applied.', next: 'Coordinate with your college dean if you believe you may be eligible for nomination.' };
      }
    },

    'UCSC Study Grant': {
      steps: 1,
      tree: {
        start: {
          question: 'Are you the President of the University Collegiate Student Council?',
          options: [
            { label: 'Yes', value: 'yes', next: 'RESULTS' },
            { label: 'No', value: 'no', next: 'RESULTS' }
          ]
        }
      },
      evaluate(p) {
        if (p.start === 'yes') {
          return { status: 'eligible', reason: 'As UCSC President, you\'re entitled to a full tuition discount for one year. Retaining it requires no incomplete or failing marks.', next: 'Submit the APPLICATION FOR SCHOLARSHIP to OSJPAR at the Alumni Building.' };
        }
        return { status: 'ineligible', reason: 'This grant is reserved exclusively for the UCSC President.', next: 'Check other leadership-based grants like NROTC Corps Commander if applicable.' };
      }
    }
  };

  let focusProfile = {};
  let focusHistory = [];
  let focusStepCount = 0;

  function renderFocusNode(nodeId) {
    const check = FOCUS_CHECKS[focusScholarship];
    if (nodeId === 'RESULTS' || !check.tree[nodeId]) { renderFocusResult(); return; }
    const node = check.tree[nodeId];

    const body = document.getElementById('checkerBody');
    body.style.overflowY = 'auto';
    body.style.maxHeight = '440px';

    let html = `<div style="margin-bottom:20px;">`;
    if (node.sub) {
      html += `<p style="font-size:0.78rem;color:var(--muted);margin-bottom:10px;line-height:1.5;">${node.sub}</p>`;
    }
    html += `<p style="font-size:1rem;font-weight:600;color:var(--text);line-height:1.45;margin-bottom:18px;">${node.question}</p>`;
    html += `<div style="display:flex;flex-direction:column;gap:9px;">`;
    node.options.forEach((opt) => {
      html += `<button onclick="selectFocusOption('${nodeId}','${opt.value}','${opt.next}')"
        style="text-align:left;padding:12px 16px;border:1.5px solid var(--border);border-radius:9px;
        background:var(--white);color:var(--text);font-size:0.88rem;cursor:pointer;
        font-family:inherit;transition:all 0.15s;line-height:1.4;"
        onmouseover="this.style.borderColor='var(--maroon)';this.style.color='var(--maroon)';"
        onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text)';">
        ${opt.label}
      </button>`;
    });
    html += `</div></div>`;

    if (focusStepCount > 0) {
      html += `<button onclick="goBackFocus()" style="background:none;border:none;color:var(--muted);font-size:0.8rem;cursor:pointer;padding:4px 0;font-family:inherit;">← Back</button>`;
    }

    body.innerHTML = html;
    updateFocusProgress();
  }

  function selectFocusOption(nodeId, value, next) {
    focusHistory.push({ nodeId, prevVal: focusProfile[nodeId] });
    focusProfile[nodeId] = value;
    focusStepCount++;
    renderFocusNode(next);
  }

  function goBackFocus() {
    if (focusHistory.length === 0) return;
    const prev = focusHistory.pop();
    delete focusProfile[prev.nodeId];
    focusStepCount = Math.max(0, focusStepCount - 1);
    renderFocusNode(prev.nodeId);
  }

  function updateFocusProgress() {
    const check = FOCUS_CHECKS[focusScholarship];
    const pct = Math.min(100, (focusStepCount / check.steps) * 100);
    document.getElementById('checkerProgressBar').style.width = pct + '%';
  }

  const FOCUS_STATUS_STYLE = {
    eligible: { label: '✅ Likely qualify', textColor: '#2A6B3C', bg: 'rgba(42,107,60,0.06)', border: 'rgba(42,107,60,0.35)' },
    partial: { label: '⚠️ Worth exploring', textColor: '#8B5E0A', bg: 'rgba(139,94,10,0.05)', border: 'rgba(139,94,10,0.3)' },
    ineligible: { label: '✕ Likely not eligible', textColor: 'var(--red)', bg: 'rgba(139,26,26,0.05)', border: 'rgba(139,26,26,0.3)' }
  };

  function renderFocusResult() {
    document.getElementById('checkerProgressBar').style.width = '100%';
    const check = FOCUS_CHECKS[focusScholarship];
    const result = check.evaluate(focusProfile);
    const style = FOCUS_STATUS_STYLE[result.status];

    const body = document.getElementById('checkerBody');
    body.style.overflowY = 'auto';
    body.style.maxHeight = '480px';

    let html = '';
    html += `<div style="background:var(--white);border:1px solid var(--border);border-radius:10px;padding:16px 18px;margin-bottom:20px;display:flex;align-items:center;gap:14px;">
      <div style="font-size:2rem;">${result.status === 'eligible' ? '🎓' : result.status === 'partial' ? '📋' : '✕'}</div>
      <div>
        <div style="font-weight:600;font-size:1rem;color:var(--text);">${focusScholarship}</div>
        <div style="font-size:0.82rem;color:var(--muted);margin-top:2px;">Based on your answers to the questions above</div>
      </div>
    </div>`;

    html += `<p style="font-size:0.72rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:${style.textColor};margin-bottom:10px;">${style.label}</p>`;
    html += `<div style="border:1px solid ${style.border};border-radius:10px;padding:14px 16px;margin-bottom:10px;background:${style.bg};">
      <div style="font-size:0.85rem;color:var(--muted);line-height:1.6;margin-bottom:8px;">${result.reason}</div>
      <div style="font-size:0.78rem;color:${style.textColor};font-style:italic;">Next step: ${result.next}</div>
    </div>`;

    html += `<div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);display:flex;gap:10px;flex-wrap:wrap;">
      <button onclick="restartChecker()" style="background:none;border:1.5px solid var(--border);border-radius:8px;padding:9px 16px;font-size:0.82rem;cursor:pointer;font-family:inherit;color:var(--muted);">← Start over</button>`;
    if (result.status !== 'ineligible') {
      html += `<button onclick="applyNow('${focusScholarship}')" style="background:var(--maroon);color:white;border:none;border-radius:8px;padding:9px 18px;font-size:0.82rem;font-weight:600;cursor:pointer;font-family:inherit;flex:1;">Apply Now</button>`;
    } else {
      html += `<button onclick="closeModal()" style="background:var(--maroon);color:white;border:none;border-radius:8px;padding:9px 18px;font-size:0.82rem;font-weight:600;cursor:pointer;font-family:inherit;flex:1;">Done</button>`;
    }
    html += `</div>`;

    body.innerHTML = html;
  }

  // ── MODAL CONTROL ─────────────────────────────────────────────────────────────
  function openChecker(name) {
    focusScholarship = name;
    document.getElementById('modalTitle').textContent = name ? name : 'Eligibility Checker';
    document.getElementById('modalSubtitle').textContent = (name && FOCUS_CHECKS[name]) ? 'Checking eligibility for this scholarship' : 'Answer a few questions to find matching scholarships';
    openModal();
  }

  function openGlobalChecker() {
    focusScholarship = null;
    document.getElementById('modalTitle').textContent = 'Eligibility Checker';
    document.getElementById('modalSubtitle').textContent = 'Answer a few questions to find matching scholarships';
    openModal();
  }

  function openModal() {
    restartChecker();
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function restartChecker() {
    if (focusScholarship && FOCUS_CHECKS[focusScholarship]) {
      focusProfile = {};
      focusHistory = [];
      focusStepCount = 0;
      renderFocusNode('start');
      return;
    }
    profile = {};
    history = [];
    stepCount = 0;
    renderNode('start');
  }

  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  function closeModalOnOverlay(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  }

  // ── APPLY / TOAST ─────────────────────────────────────────────────────────────
  function applyNow(name) {
    closeModal();
    const sel = document.getElementById('applyScholarshipSelect');
    for (let i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === name || sel.options[i].text === name) { sel.selectedIndex = i; break; }
    }
    showPage('apply');
    showToast('📋 ' + name + ' selected');
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerHTML = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3200);
  }

  function submitApplication() {
    closeModal();
    showToast('✅ Application submitted! OSJPAR will contact you within 30 days.');
    setTimeout(() => showPage('home'), 500);
  }

  // ── ADDABLE TABLE ROWS (Application Form — sibling tables) ─────────────────────
  function addOsfRow(tableId, inputColCount) {
    const table = document.getElementById(tableId);
    if (!table) return;
    const tbody = table.querySelector('tbody');
    const tr = document.createElement('tr');
    for (let i = 0; i < inputColCount; i++) {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      td.appendChild(input);
      tr.appendChild(td);
    }
    const actionTd = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'osf-row-remove';
    removeBtn.textContent = '✕';
    removeBtn.onclick = function () { removeOsfRow(removeBtn); };
    actionTd.appendChild(removeBtn);
    tr.appendChild(actionTd);
    tbody.appendChild(tr);
  }

  function removeOsfRow(btn) {
    const tr = btn.closest('tr');
    const tbody = tr.parentElement;
    if (tbody.rows.length > 1) {
      tr.remove();
    } else {
      tr.querySelectorAll('input').forEach(input => input.value = '');
    }
  }