/* ================================================================
   SAGAR CLASSES — MASTER SCRIPT v3.0
   Storage  : localStorage only (no SQL, no DOM storage)
   Icons    : Remix Icons (ri-*) — all updated
   Features : Admin CRUD, Attendance, Toppers, Staff, Notices,
              Archive / History, Export (Excel/PDF/CSV), Themes
   ================================================================ */

'use strict';

/* ──────────────────────────────────────────
   1. STORAGE HELPERS
────────────────────────────────────────── */
const LS = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch {}
  }
};

/* ──────────────────────────────────────────
   2. DATA KEYS
────────────────────────────────────────── */
const KEY = {
  students:        'sc_students',
  staff:           'sc_staff',
  attendance:      'sc_attendance',       // { "YYYY-MM-DD|studentId": "present"|"absent" }
  staffAttendance: 'sc_staff_attendance', // { "YYYY-MM-DD|staffId":   "present"|"absent" }
  toppers:         'sc_toppers',
  functions:       'sc_functions',
  notices:         'sc_notices',
  history:         'sc_history',          // archived month snapshots
  theme:           'sc_theme',
  adminPin:        'sc_admin_pin'
};

/* ──────────────────────────────────────────
   3. SEED DEFAULT DATA (first run only)
────────────────────────────────────────── */
function seedData() {
  if (!LS.get(KEY.students)) {
    LS.set(KEY.students, [
      { id: 'S001', name: 'Aarav Sharma',    class: '10', rollNo: '01', img: 'https://i.pravatar.cc/100?img=11', addedAt: Date.now() },
      { id: 'S002', name: 'Priya Mehta',     class: '10', rollNo: '02', img: 'https://i.pravatar.cc/100?img=47', addedAt: Date.now() },
      { id: 'S003', name: 'Rohan Patil',     class: '9',  rollNo: '01', img: 'https://i.pravatar.cc/100?img=15', addedAt: Date.now() },
      { id: 'S004', name: 'Sneha Joshi',     class: '12', rollNo: '01', img: 'https://i.pravatar.cc/100?img=48', addedAt: Date.now() },
      { id: 'S005', name: 'Aryan Gupta',     class: '8',  rollNo: '01', img: 'https://i.pravatar.cc/100?img=12', addedAt: Date.now() },
      { id: 'S006', name: 'Ishaan Verma',    class: '11', rollNo: '01', img: 'https://i.pravatar.cc/100?img=33', addedAt: Date.now() },
    ]);
  }
  if (!LS.get(KEY.staff)) {
    LS.set(KEY.staff, [
      { id: 'T001', name: 'Sagar Sir',       dept: 'Mathematics',  img: 'https://i.pravatar.cc/100?img=57', addedAt: Date.now() },
      { id: 'T002', name: 'Pooja Ma\'am',    dept: 'Science',      img: 'https://i.pravatar.cc/100?img=44', addedAt: Date.now() },
      { id: 'T003', name: 'Pratibha Ma\'am',    dept: 'Science',      img: 'https://i.pravatar.cc/100?img=44', addedAt: Date.now() },
      { id: 'T004', name: 'Pranjal Ma\'am',    dept: 'Science',      img: 'https://i.pravatar.cc/100?img=44', addedAt: Date.now() },
      { id: 'T005', name: 'Poorva Ma\'am',    dept: 'Science',      img: 'https://i.pravatar.cc/100?img=44', addedAt: Date.now() },
      { id: 'T006', name: 'Sanvi Ma\'am',    dept: 'Science',      img: 'https://i.pravatar.cc/100?img=44', addedAt: Date.now() },
      { id: 'T007', name: 'prachi Ma\'am',    dept: 'Science',      img: 'https://i.pravatar.cc/100?img=44', addedAt: Date.now() },
      { id: 'T008', name: 'Pooja Ma\'am',    dept: 'Science',      img: 'https://i.pravatar.cc/100?img=44', addedAt: Date.now() },

      { id: 'T009', name: 'Rahul Sir',       dept: 'English',      img: 'https://i.pravatar.cc/100?img=59', addedAt: Date.now() },
      { id: 'T0010', name: 'Anita Ma\'am',    dept: 'Social Science',img: 'https://i.pravatar.cc/100?img=49', addedAt: Date.now() },
    ]);
  }
  if (!LS.get(KEY.toppers)) {
    LS.set(KEY.toppers, [
      { id: 'TP001', name: 'Sneha Joshi',  class: '12', score: '97%', img: 'https://i.pravatar.cc/100?img=48', addedAt: Date.now() },
      { id: 'TP002', name: 'Aarav Sharma', class: '10', score: '95%', img: 'https://i.pravatar.cc/100?img=11', addedAt: Date.now() },
      { id: 'TP003', name: 'Priya Mehta',  class: '10', score: '93%', img: 'https://i.pravatar.cc/100?img=47', addedAt: Date.now() },
      { id: 'TP004', name: 'Ishaan Verma', class: '11', score: '91%', img: 'https://i.pravatar.cc/100?img=33', addedAt: Date.now() },
    ]);
  }
  if (!LS.get(KEY.functions)) {
    LS.set(KEY.functions, [
      { id: 'EV001', name: 'Annual Picnic 2025', category: 'Picnic',      desc: 'Annual student picnic with games and fun activities.', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80', addedAt: Date.now() },
      { id: 'EV002', name: 'Diwali Celebration', category: 'Festival',    desc: 'Colourful Diwali celebrations with rangoli and sweets.', img: 'https://images.unsplash.com/photo-1574004351234-de9fcd55f8a3?auto=format&fit=crop&w=600&q=80', addedAt: Date.now() },
      { id: 'EV003', name: 'Science Exhibition',  category: 'Academic',   desc: 'Students showcase innovative science projects.', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', addedAt: Date.now() },
    ]);
  }
  if (!LS.get(KEY.notices)) {
    LS.set(KEY.notices, [
      { id: 'N001', text: '🎓 Admissions open for 2026-27 academic year! Enroll now.', addedAt: Date.now() },
      { id: 'N002', text: '📝 Unit Test scheduled for Class 10 on 1st September 2026.', addedAt: Date.now() },
      { id: 'N003', text: '🏆 Congratulations to all Board toppers of 2025-26 batch!', addedAt: Date.now() },
      { id: 'N004', text: '📅 Parent-Teacher Meeting on 10th September 2026 at 10:00 AM.', addedAt: Date.now() },
    ]);
  }
  if (!LS.get(KEY.history)) LS.set(KEY.history, []);
  if (!LS.get(KEY.attendance)) LS.set(KEY.attendance, {});
  if (!LS.get(KEY.staffAttendance)) LS.set(KEY.staffAttendance, {});
}

/* ──────────────────────────────────────────
   4. UTILITY FUNCTIONS
────────────────────────────────────────── */
function uid(prefix = 'ID') {
  return prefix + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatMonthYear(dateStr) {
  const d = new Date(dateStr + '-01');
  return d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

function currentMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function el(id) { return document.getElementById(id); }

/* ──────────────────────────────────────────
   5. TOAST NOTIFICATIONS
────────────────────────────────────────── */
function toast(msg, type = 'success') {
  const container = el('toastContainer');
  if (!container) return;
  const icons = {
    success: '<i class="ri-checkbox-circle-fill" style="color:#34d399;font-size:1.1rem"></i>',
    error:   '<i class="ri-close-circle-fill" style="color:#f87171;font-size:1.1rem"></i>',
    info:    '<i class="ri-information-fill" style="color:#38bdf8;font-size:1.1rem"></i>',
    warn:    '<i class="ri-alert-fill" style="color:#fbbf24;font-size:1.1rem"></i>',
  };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `${icons[type] || icons.info} <span>${msg}</span>`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 320); }, 3000);
}

/* ──────────────────────────────────────────
   6. THEME TOGGLE
────────────────────────────────────────── */
function initTheme() {
  const saved = LS.get(KEY.theme, 'dark');
  applyTheme(saved);

  el('themeToggleBtn')?.addEventListener('click', () => toggleTheme());
  el('mobileThemeToggleBtn')?.addEventListener('click', () => toggleTheme());
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  LS.set(KEY.theme, theme);
  const isDark = theme === 'dark';
  // Sidebar toggle
  const icon = el('themeIcon');
  const text = el('themeText');
  const mIcon = el('mobileThemeIcon');
  if (icon) icon.className = isDark ? 'ri-sun-line' : 'ri-moon-line';
  if (text) text.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  if (mIcon) mIcon.className = isDark ? 'ri-sun-fill nav-icon-home' : 'ri-moon-fill nav-icon-home';
}

/* ──────────────────────────────────────────
   7. SIDEBAR / NAVIGATION
────────────────────────────────────────── */
function initNav() {
  const sidebar  = el('sidebar');
  const overlay  = el('sidebarOverlay');
  const toggleBtn = el('sidebarToggleBtn');

  toggleBtn?.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
  });
  overlay?.addEventListener('click', closeSidebar);

  // Section nav links
  document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(link.dataset.section);
      closeSidebar();
    });
  });

  // data-goto buttons
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-goto]');
    if (btn) navigateTo(btn.dataset.goto);
  });

  // Admin panel open
  el('openAdminBtn')?.addEventListener('click', e => {
    e.preventDefault();
    openAdminModal();
    closeSidebar();
  });
  el('mobileAdminBtn')?.addEventListener('click', () => openAdminModal());
}

function closeSidebar() {
  el('sidebar')?.classList.remove('mobile-open');
  el('sidebarOverlay')?.classList.remove('active');
}

function navigateTo(section) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = el(section);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('.nav-link[data-section]').forEach(l => {
    l.classList.toggle('active', l.dataset.section === section);
  });
  // Trigger section-specific renders
  if (section === 'academic')              renderStudentAttendanceSection();
  if (section === 'staffAttendancePortal') renderStaffPortalSection();
  if (section === 'toppers')               renderToppers();
  if (section === 'functions')             renderFunctions();
  if (section === 'home')                  renderHome();
  if (section === 'admin')                 renderAdminStats();
}

/* ──────────────────────────────────────────
   8. NOTICE TICKER
────────────────────────────────────────── */
function renderNoticeTicker() {
  const ticker = el('liveNoticeTicker');
  if (!ticker) return;
  const notices = LS.get(KEY.notices, []);
  ticker.textContent = notices.length
    ? notices.map(n => n.text).join('   ·   ')
    : 'No notices at the moment. Check back soon!';
}

/* ──────────────────────────────────────────
   9. HOME PAGE RENDER
────────────────────────────────────────── */
function renderHome() {
  renderHomeAchievers();
  renderBatches();
  renderNoticeTicker();
}

function renderHomeAchievers() {
  const strip = el('homeAchieversStrip');
  if (!strip) return;
  const toppers = LS.get(KEY.toppers, []).slice(0, 5);
  if (!toppers.length) { strip.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;padding:0.5rem">No toppers added yet.</p>'; return; }
  strip.innerHTML = toppers.map((t, i) => `
    <div class="achiever-chip animate-hover-up">
      <span class="achiever-rank">#${i + 1}</span>
      <img src="${t.img || 'https://i.pravatar.cc/100?img=1'}" alt="${t.name}" onerror="this.src='https://i.pravatar.cc/100?img=1'">
      <div>
        <strong>${t.name}</strong>
        <span>Class ${t.class} · ${t.score}</span>
      </div>
    </div>`).join('');

  const aboutStrip = el('aboutToppersStrip');
  if (aboutStrip) aboutStrip.innerHTML = strip.innerHTML;
}

function renderBatches() {
  const container = el('largeClassesContainer');
  if (!container) return;
  const batches = [
    { name: 'Class 10 — SSC Board Batch', desc: 'Comprehensive SSC board preparation with weekly tests and doubt sessions.', img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80', students: LS.get(KEY.students, []).filter(s => s.class === '10').length },
    { name: 'Class 12 — HSC Science Batch', desc: 'Focused HSC Science coaching covering Physics, Chemistry, Maths & Biology.', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', students: LS.get(KEY.students, []).filter(s => s.class === '12').length },
    { name: 'Foundation Batch (1st–8th)', desc: 'Strong foundational skill-building for primary and middle school students.', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80', students: LS.get(KEY.students, []).filter(s => Number(s.class) <= 8).length },
  ];
  container.innerHTML = batches.map(b => `
    <div class="class-card-large animate-hover-up">
      <div class="class-card-img-wrap"><img src="${b.img}" alt="${b.name}" onerror="this.src='https://placehold.co/600x300'"></div>
      <div class="class-card-body">
        <div>
          <span class="class-badge">Active Batch</span>
          <h3 class="batch-name">${b.name}</h3>
          <p class="batch-desc">${b.desc}</p>
        </div>
        <div class="class-stats">
          <span><i class="ri-user-fill" style="color:#818cf8"></i> ${b.students} Students</span>
          <button class="p-btn class-join-btn" data-goto="contact" style="padding:6px 14px;font-size:0.75rem;">Join Batch</button>
        </div>
      </div>
    </div>`).join('');
}

/* ──────────────────────────────────────────
   10. FUNCTIONS & EVENTS RENDER
────────────────────────────────────────── */
function renderFunctions() {
  const container = el('functionsDisplayContainer');
  if (!container) return;
  const events = LS.get(KEY.functions, []);
  if (!events.length) {
    container.innerHTML = `<div class="empty-state"><i class="ri-calendar-event-fill" style="color:#f97316;font-size:2.5rem;display:block;margin-bottom:0.5rem"></i><p>No events added yet.</p></div>`;
    return;
  }
  container.innerHTML = events.map(ev => `
    <div class="event-tile-card animate-hover-up">
      <div class="event-img-container">
        <img src="${ev.img || 'https://placehold.co/600x300'}" alt="${ev.name}" onerror="this.src='https://placehold.co/600x300'">
        <span class="event-floating-badge">${ev.category || 'Event'}</span>
      </div>
      <div class="event-content-body">
        <h3 class="event-title">${ev.name}</h3>
        <p class="event-desc">${ev.desc || ''}</p>
        <div class="event-footer-row">
          <span class="event-campus-tag"><i class="ri-calendar-event-fill" style="color:#f97316"></i> Sagar Classes Campus</span>
          <button class="p-btn event-more-btn" data-goto="contact" style="padding:4px 12px;font-size:0.75rem;">Know More</button>
        </div>
      </div>
    </div>`).join('');
}

/* ──────────────────────────────────────────
   11. TOPPERS RENDER
────────────────────────────────────────── */
function renderToppers() {
  const display = el('topperDisplay');
  const spotlight = el('topperOfMonth');
  if (!display) return;
  const toppers = LS.get(KEY.toppers, []);
  if (!toppers.length) {
    display.innerHTML = `<div class="empty-state"><i class="ri-trophy-fill" style="color:#fbbf24;font-size:2.5rem;display:block;margin-bottom:0.5rem"></i><p>No toppers added yet.</p></div>`;
    if (spotlight) spotlight.innerHTML = '';
    return;
  }
  // Spotlight
  if (spotlight && toppers[0]) {
    const t = toppers[0];
    spotlight.innerHTML = `
      <div class="topper-spotlight">
        <div class="topper-spotlight-glow"></div>
        <img class="topper-spotlight-photo" src="${t.img || 'https://i.pravatar.cc/100?img=1'}" alt="${t.name}" onerror="this.src='https://i.pravatar.cc/100?img=1'">
        <div class="topper-spotlight-body">
          <span class="topper-spotlight-tag"><i class="ri-vip-crown-2-fill" style="color:#fbbf24"></i> Topper of the Term</span>
          <h2>${t.name}</h2>
          <p class="topper-spotlight-standard">Class ${t.class}</p>
          <p class="topper-spotlight-score"><span>${t.score}</span> Score</p>
        </div>
      </div>`;
  }
  const rankBadges = ['🥇', '🥈', '🥉'];
  display.innerHTML = toppers.map((t, i) => `
    <div class="facility-card topper-card animate-hover-up">
      <span class="topper-rank-badge">${rankBadges[i] || `#${i + 1}`}</span>
      <img class="topper-photo" src="${t.img || 'https://i.pravatar.cc/100?img=1'}" alt="${t.name}" onerror="this.src='https://i.pravatar.cc/100?img=1'">
      <span class="notice-tag topper-standard-tag">Class ${t.class}</span>
      <h3>${t.name}</h3>
      <p class="topper-score">${t.score}</p>
    </div>`).join('');
}

/* ──────────────────────────────────────────
   12. STUDENT ATTENDANCE SECTION (Login-gated, mirrors Staff Portal)
────────────────────────────────────────── */
let _studentLoggedIn = null; // { id, name, class, rollNo, img }
let _studentCalMonth = null; // current viewed month "YYYY-MM"

function renderStudentAttendanceSection() {
  const display  = el('studentDisplay');
  const dateText = el('studentCurrentDateText');
  if (dateText) dateText.textContent = formatDate(todayStr());
  if (!display) return;

  if (_studentLoggedIn) {
    renderStudentPortal(display);
  } else {
    renderStudentLogin(display);
  }
}

function renderStudentLogin(container) {
  container.innerHTML = `
    <div class="student-login-card">
      <div class="student-login-head">
        <i class="ri-user-lock-fill" style="color:#6366f1;font-size:2.5rem;display:block"></i>
        <h3>Student Attendance Portal</h3>
        <p>Login securely with your Name and Standard.</p>
      </div>
      <div class="student-login-fields">
        <div>
          <label class="form-label"><i class="ri-account-circle-line"></i> Full Name</label>
          <input type="text" id="loginStudentName" class="pill-input" placeholder="e.g. Aarav Sharma">
        </div>
        <div>
          <label class="form-label"><i class="ri-book-open-line"></i> Standard / Class</label>
          <select id="loginStudentClass" class="pill-input">
            <option value="">Select Standard</option>
            ${[1,2,3,4,5,6,7,8,9,10,11,12].map(n => `<option value="${n}">Class ${n}</option>`).join('')}
          </select>
        </div>
        <button class="p-btn animate-hover-up" id="studentLoginBtn" style="width:100%;margin-top:0.5rem">
          <i class="ri-login-box-fill" style="color:#6366f1"></i> Login & View Calendar
        </button>
      </div>
    </div>`;

  el('studentLoginBtn')?.addEventListener('click', () => {
    const name = (el('loginStudentName')?.value || '').trim();
    const cls  = el('loginStudentClass')?.value || '';
    if (!name || !cls) { toast('Please enter your name and select your class.', 'warn'); return; }

    const students = LS.get(KEY.students, []);
    const found    = students.find(s => s.name.toLowerCase() === name.toLowerCase() && s.class === cls);
    if (!found) { toast('Student not found. Please check your name and class or contact admin.', 'error'); return; }

    _studentLoggedIn = found;
    _studentCalMonth = currentMonthKey();
    renderStudentAttendanceSection();
    toast(`Welcome, ${found.name}! 👋`, 'success');
  });
}

function renderStudentPortal(container) {
  const s        = _studentLoggedIn;
  const today    = todayStr();
  const attObj   = LS.get(KEY.attendance, {});
  const todayKey = `${today}|${s.id}`;
  const todayStatus = attObj[todayKey];

  const checkinArea = todayStatus
    ? `<div class="checkin-status-box">
         <span class="status-pill ${todayStatus === 'present' ? 'status-present' : 'status-absent'}">
           <i class="${todayStatus === 'present' ? 'ri-checkbox-circle-fill' : 'ri-close-circle-fill'}"></i>
           ${todayStatus === 'present' ? 'Present Today' : 'Absent Today'}
         </span>
       </div>`
    : `<div class="checkin-btn-row">
         <button class="main-btn animate-hover-up" id="studentMarkPresentBtn" style="padding:8px 18px;font-size:0.8rem">
           <i class="ri-check-fill" style="color:#a5b4fc"></i> Mark Present
         </button>
         <button class="a-btn animate-hover-up" id="studentMarkAbsentBtn" style="padding:8px 18px;font-size:0.8rem">
           <i class="ri-close-fill" style="color:#fca5a5"></i> Mark Absent
         </button>
       </div>`;

  container.innerHTML = `
    <div class="student-portal-card">
      <div class="student-portal-head">
        <div class="student-portal-id">
          <img src="${s.img || 'https://i.pravatar.cc/100?img=1'}" alt="${s.name}" onerror="this.src='https://i.pravatar.cc/100?img=1'">
          <div>
            <h3>${s.name}</h3>
            <p class="muted-small"><i class="ri-graduation-cap-fill" style="color:#818cf8"></i> Class ${s.class} · Roll No: ${s.rollNo || '—'}</p>
          </div>
        </div>
        <button class="a-btn" id="studentLogoutBtn"><i class="ri-logout-box-r-fill" style="color:#f87171"></i> Logout</button>
      </div>

      <div class="student-checkin-box">
        <p class="muted-small"><i class="ri-calendar-2-fill" style="color:#38bdf8"></i> Today: ${formatDate(today)}</p>
        ${checkinArea}
      </div>

      <div class="student-calendar-box">
        <div class="student-calendar-nav">
          <button class="p-btn calendar-nav-btn" id="studentCalPrevBtn"><i class="ri-arrow-left-s-line"></i> Prev</button>
          <h4 id="studentCalTitle">${formatMonthYear(_studentCalMonth)}</h4>
          <button class="p-btn calendar-nav-btn" id="studentCalNextBtn">Next <i class="ri-arrow-right-s-line"></i></button>
        </div>
        <div class="student-calendar-weekdays">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div id="studentCalGrid" class="student-calendar-grid"></div>
      </div>
    </div>`;

  renderStudentCalendar();

  el('studentLogoutBtn')?.addEventListener('click', () => {
    _studentLoggedIn = null;
    _studentCalMonth = null;
    renderStudentAttendanceSection();
    navigateTo('home');
    toast('Logged out successfully.', 'info');
  });

  el('studentMarkPresentBtn')?.addEventListener('click', () => studentMarkAttendance('present'));
  el('studentMarkAbsentBtn')?.addEventListener('click', ()  => studentMarkAttendance('absent'));

  el('studentCalPrevBtn')?.addEventListener('click', () => {
    const [y, m] = _studentCalMonth.split('-').map(Number);
    const d = new Date(y, m - 2, 1);
    _studentCalMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    el('studentCalTitle').textContent = formatMonthYear(_studentCalMonth);
    renderStudentCalendar();
  });
  el('studentCalNextBtn')?.addEventListener('click', () => {
    const [y, m] = _studentCalMonth.split('-').map(Number);
    const d = new Date(y, m, 1);
    _studentCalMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    el('studentCalTitle').textContent = formatMonthYear(_studentCalMonth);
    renderStudentCalendar();
  });
}

function studentMarkAttendance(status) {
  if (!_studentLoggedIn) return;
  const key    = `${todayStr()}|${_studentLoggedIn.id}`;
  const attObj = LS.get(KEY.attendance, {});
  attObj[key]  = status;
  LS.set(KEY.attendance, attObj);
  toast(`Marked ${status === 'present' ? 'Present ✓' : 'Absent ✗'} for today!`, status === 'present' ? 'success' : 'warn');
  renderStudentAttendanceSection();
}

function renderStudentCalendar() {
  const grid = el('studentCalGrid');
  if (!grid || !_studentCalMonth || !_studentLoggedIn) return;
  const attObj = LS.get(KEY.attendance, {});
  const [y, m] = _studentCalMonth.split('-').map(Number);
  const firstDay = new Date(y, m - 1, 1).getDay();
  const daysInMonth = new Date(y, m, 0).getDate();
  const today = todayStr();
  let html = '';
  for (let i = 0; i < firstDay; i++) html += '<div></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const key     = `${dateStr}|${_studentLoggedIn.id}`;
    const status  = attObj[key];
    const isToday = dateStr === today;
    const cls     = status === 'present' ? 'cal-present' : status === 'absent' ? 'cal-absent' : isToday ? 'cal-today' : '';
    html += `<div class="cal-day ${cls}" title="${dateStr}">${d}</div>`;
  }
  grid.innerHTML = html;
}

/* ──────────────────────────────────────────
   13. HOME ATTENDANCE SEARCH
────────────────────────────────────────── */
function initAttendanceSearch() {
  el('searchAttendanceBtn')?.addEventListener('click', searchStudentAttendance);
  el('homeSearchName')?.addEventListener('keydown', e => { if (e.key === 'Enter') searchStudentAttendance(); });
}

function searchStudentAttendance() {
  const name  = (el('homeSearchName')?.value || '').trim().toLowerCase();
  const cls   = (el('homeSearchClass')?.value || '').trim();
  const result = el('searchResultDisplay');
  if (!result) return;
  if (!name && !cls) { result.innerHTML = `<p style="color:var(--text-muted);font-size:0.85rem;padding:0.5rem"><i class="ri-information-fill" style="color:#38bdf8"></i> Enter name or class to search.</p>`; return; }

  const students   = LS.get(KEY.students, []);
  const attendance = LS.get(KEY.attendance, {});
  const found      = students.filter(s =>
    (!name || s.name.toLowerCase().includes(name)) &&
    (!cls  || s.class === cls)
  );

  if (!found.length) {
    result.innerHTML = `<p style="color:#f87171;font-size:0.85rem;padding:0.5rem"><i class="ri-user-unfollow-fill"></i> No student found.</p>`;
    return;
  }

  // Calculate per-student attendance summary
  result.innerHTML = found.map(s => {
    const allKeys   = Object.keys(attendance).filter(k => k.endsWith(`|${s.id}`));
    const present   = allKeys.filter(k => attendance[k] === 'present').length;
    const absent    = allKeys.filter(k => attendance[k] === 'absent').length;
    const total     = present + absent;
    const pct       = total ? Math.round((present / total) * 100) : 0;
    const todayKey  = `${todayStr()}|${s.id}`;
    const todayStatus = attendance[todayKey] || 'unmarked';

    const todayBadge = todayStatus === 'present'
      ? `<span class="status-pill status-present" style="font-size:0.72rem"><i class="ri-checkbox-circle-fill"></i> Today: Present</span>`
      : todayStatus === 'absent'
      ? `<span class="status-pill status-absent" style="font-size:0.72rem"><i class="ri-close-circle-fill"></i> Today: Absent</span>`
      : `<span class="status-pill" style="font-size:0.72rem;background:rgba(139,156,191,0.15);color:var(--text-muted);border:1px solid rgba(139,156,191,0.2)"><i class="ri-time-line"></i> Today: Unmarked</span>`;

    return `
      <div class="search-result-item" style="flex-wrap:wrap;gap:0.5rem">
        <div style="display:flex;align-items:center;gap:0.75rem;flex:1;min-width:0">
          <img src="${s.img || 'https://i.pravatar.cc/100?img=1'}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid var(--primary);flex-shrink:0" alt="${s.name}" onerror="this.src='https://i.pravatar.cc/100?img=1'">
          <div>
            <strong>${s.name}</strong>
            <span class="muted-small" style="display:block">Class ${s.class} · Roll No: ${s.rollNo || '—'}</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap">
          ${todayBadge}
          <span style="font-size:0.75rem;color:#38bdf8;font-weight:600"><i class="ri-bar-chart-2-fill"></i> ${pct}% (${present}/${total} days)</span>
        </div>
      </div>`;
  }).join('');
}

/* ──────────────────────────────────────────
   14. STAFF ATTENDANCE PORTAL (Public)
────────────────────────────────────────── */
let _staffLoggedIn = null; // { id, name, dept, img }
let _staffCalMonth = null;  // current viewed month as "YYYY-MM"

function renderStaffPortalSection() {
  const display = el('staffAttendanceDisplay');
  const dateText = el('staffCurrentDateText');
  if (dateText) dateText.textContent = formatDate(todayStr());
  if (!display) return;

  if (_staffLoggedIn) {
    renderStaffPortal(display);
  } else {
    renderStaffLogin(display);
  }
}

function renderStaffLogin(container) {
  const STAFF_DEPTS = [
    'Class 1 - 8',
    'Class 9 - 10',
    'Class 11 - 12 (Science)',
    'Class 11 - 12 (Commerce)',
  ];
  container.innerHTML = `
    <div class="student-login-card staff-login-card">
      <div class="student-login-head">
        <i class="ri-user-star-fill" style="color:#34d399;font-size:2.5rem;display:block"></i>
        <h3>Staff Attendance Login</h3>
        <p>Login with your registered name and department.</p>
      </div>
      <div class="student-login-fields">
        <div>
          <label class="form-label"><i class="ri-user-3-line"></i> Staff Full Name</label>
          <input type="text" id="loginStaffName" class="pill-input" placeholder="e.g. Sagar Sir">
        </div>
        <div>
          <label class="form-label"><i class="ri-team-fill"></i> Department</label>
          <select id="loginStaffDepartment" class="pill-input">
            <option value="">Select Department</option>
            ${STAFF_DEPTS.map(d => `<option value="${d}">${d}</option>`).join('')}
          </select>
        </div>
        <button class="p-btn animate-hover-up" id="staffLoginBtn" style="width:100%;margin-top:0.5rem">
          <i class="ri-login-box-fill" style="color:#34d399"></i> Login & View Calendar
        </button>
      </div>
    </div>`;

  el('staffLoginBtn')?.addEventListener('click', () => {
    const name = (el('loginStaffName')?.value || '').trim();
    const dept = el('loginStaffDepartment')?.value || '';
    if (!name || !dept) { toast('Please enter your name and select department.', 'warn'); return; }

    const staff = LS.get(KEY.staff, []);
    const found = staff.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (!found) { toast('Staff member not found. Contact admin.', 'error'); return; }

    // Store selected department from login form alongside other staff data
    _staffLoggedIn  = { ...found, loginDept: dept };
    _staffCalMonth  = currentMonthKey();
    renderStaffPortalSection();
    toast(`Welcome, ${found.name}! 👋`, 'success');
  });
}

function renderStaffPortal(container) {
  const s = _staffLoggedIn;
  const today  = todayStr();
  const attObj = LS.get(KEY.staffAttendance, {});
  const todayKey = `${today}|${s.id}`;
  const todayStatus = attObj[todayKey];

  const checkinArea = todayStatus
    ? `<div class="checkin-status-box">
         <span class="status-pill ${todayStatus === 'present' ? 'status-present' : 'status-absent'}">
           <i class="${todayStatus === 'present' ? 'ri-checkbox-circle-fill' : 'ri-close-circle-fill'}"></i>
           ${todayStatus === 'present' ? 'Present Today' : 'Absent Today'}
         </span>
       </div>`
    : `<div class="checkin-btn-row">
         <button class="main-btn animate-hover-up" id="staffMarkPresentBtn" style="padding:8px 18px;font-size:0.8rem">
           <i class="ri-check-fill" style="color:#a5b4fc"></i> Mark Present
         </button>
         <button class="a-btn animate-hover-up" id="staffMarkAbsentBtn" style="padding:8px 18px;font-size:0.8rem">
           <i class="ri-close-fill" style="color:#fca5a5"></i> Mark Absent
         </button>
       </div>`;

  container.innerHTML = `
    <div class="student-portal-card staff-portal-card">
      <div class="student-portal-head">
        <div class="student-portal-id">
          <img src="${s.img || 'https://i.pravatar.cc/100?img=1'}" alt="${s.name}" onerror="this.src='https://i.pravatar.cc/100?img=1'">
          <div>
            <h3>${s.name}</h3>
            <p class="muted-small"><i class="ri-team-fill" style="color:#34d399"></i> ${s.dept}</p>
          </div>
        </div>
        <button class="a-btn" id="staffLogoutBtn"><i class="ri-logout-box-r-fill" style="color:#f87171"></i> Logout</button>
      </div>

      <div class="student-checkin-box staff-checkin-box">
        <p class="muted-small"><i class="ri-calendar-2-fill" style="color:#38bdf8"></i> Today: ${formatDate(today)}</p>
        ${checkinArea}
      </div>

      <div class="student-calendar-box">
        <div class="student-calendar-nav">
          <button class="p-btn calendar-nav-btn" id="staffCalPrevBtn"><i class="ri-arrow-left-s-line"></i> Prev</button>
          <h4 id="staffCalTitle">${formatMonthYear(_staffCalMonth)}</h4>
          <button class="p-btn calendar-nav-btn" id="staffCalNextBtn">Next <i class="ri-arrow-right-s-line"></i></button>
        </div>
        <div class="student-calendar-weekdays">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div id="staffCalGrid" class="student-calendar-grid"></div>
      </div>
    </div>`;

  renderStaffCalendar();

  el('staffLogoutBtn')?.addEventListener('click', () => {
    _staffLoggedIn = null;
    _staffCalMonth = null;
    renderStaffPortalSection();
    navigateTo('home');
    toast('Logged out successfully.', 'info');
  });

  el('staffMarkPresentBtn')?.addEventListener('click', () => staffMarkAttendance('present'));
  el('staffMarkAbsentBtn')?.addEventListener('click', () => staffMarkAttendance('absent'));
  el('staffCalPrevBtn')?.addEventListener('click', () => {
    const [y, m] = _staffCalMonth.split('-').map(Number);
    const d = new Date(y, m - 2, 1);
    _staffCalMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    el('staffCalTitle').textContent = formatMonthYear(_staffCalMonth);
    renderStaffCalendar();
  });
  el('staffCalNextBtn')?.addEventListener('click', () => {
    const [y, m] = _staffCalMonth.split('-').map(Number);
    const d = new Date(y, m, 1);
    _staffCalMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    el('staffCalTitle').textContent = formatMonthYear(_staffCalMonth);
    renderStaffCalendar();
  });
}

function staffMarkAttendance(status) {
  if (!_staffLoggedIn) return;
  const key    = `${todayStr()}|${_staffLoggedIn.id}`;
  const attObj = LS.get(KEY.staffAttendance, {});
  attObj[key]  = status;
  LS.set(KEY.staffAttendance, attObj);
  toast(`Marked ${status === 'present' ? 'Present ✓' : 'Absent ✗'} for today!`, status === 'present' ? 'success' : 'warn');
  renderStaffPortalSection();
}

function renderStaffCalendar() {
  const grid = el('staffCalGrid');
  if (!grid || !_staffCalMonth) return;
  const attObj = LS.get(KEY.staffAttendance, {});
  const [y, m] = _staffCalMonth.split('-').map(Number);
  const firstDay = new Date(y, m - 1, 1).getDay();
  const daysInMonth = new Date(y, m, 0).getDate();
  const today = todayStr();
  let html = '';
  for (let i = 0; i < firstDay; i++) html += '<div></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const key = `${dateStr}|${_staffLoggedIn.id}`;
    const status = attObj[key];
    const isToday = dateStr === today;
    const cls = status === 'present' ? 'cal-present' : status === 'absent' ? 'cal-absent' : isToday ? 'cal-today' : '';
    html += `<div class="cal-day ${cls}" title="${dateStr}">${d}</div>`;
  }
  grid.innerHTML = html;
}

/* ──────────────────────────────────────────
   15. ADMIN — PIN / MODAL
────────────────────────────────────────── */
const ADMIN_PIN = '91206'; // default pin

function openAdminModal() {
  const modal = el('loginModal');
  if (modal) { modal.classList.add('active'); el('pinInput')?.focus(); }
}

function initAdminModal() {
  el('closeLoginModalBtn')?.addEventListener('click', () => el('loginModal')?.classList.remove('active'));
  el('modalBackBtn')?.addEventListener('click', () => el('loginModal')?.classList.remove('active'));
  el('unlockAdminBtn')?.addEventListener('click', () => {
    const pin = (el('pinInput')?.value || '').trim();
    const storedPin = LS.get(KEY.adminPin, ADMIN_PIN);
    if (pin === storedPin) {
      el('loginModal')?.classList.remove('active');
      el('pinInput').value = '';
      navigateTo('admin');
      toast('Admin Panel Unlocked! 🔓', 'success');
    } else {
      toast('Incorrect PIN. Try again.', 'error');
      el('pinInput')?.select();
    }
  });
  el('pinInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') el('unlockAdminBtn')?.click(); });
}

/* ──────────────────────────────────────────
   16. ADMIN DASHBOARD STATS
────────────────────────────────────────── */
function renderAdminStats() {
  const grid = el('adminStatsGrid');
  if (!grid) return;

  const students   = LS.get(KEY.students, []);
  const staff      = LS.get(KEY.staff, []);
  const toppers    = LS.get(KEY.toppers, []);
  const functions  = LS.get(KEY.functions, []);
  const notices    = LS.get(KEY.notices, []);
  const history    = LS.get(KEY.history, []);
  const attendance = LS.get(KEY.attendance, {});

  const todayAtt   = Object.entries(attendance).filter(([k, v]) => k.startsWith(todayStr()) && v === 'present').length;

  const stats = [
    { label: 'Total Students', value: students.length, icon: 'ri-user-heart-fill',       color: '#818cf8' },
    { label: 'Staff Members',  value: staff.length,     icon: 'ri-team-fill',             color: '#34d399' },
    { label: 'Present Today',  value: todayAtt,          icon: 'ri-user-follow-fill',     color: '#38bdf8' },
    { label: 'Toppers Listed', value: toppers.length,    icon: 'ri-vip-crown-2-fill',     color: '#fbbf24' },
    { label: 'Events Added',   value: functions.length,  icon: 'ri-calendar-event-fill',  color: '#f97316' },
    { label: 'Active Notices', value: notices.length,    icon: 'ri-notification-badge-fill', color: '#f87171' },
    { label: 'Archived Months',value: history.length,    icon: 'ri-archive-2-fill',       color: '#2dd4bf' },
  ];

  grid.innerHTML = stats.map(s => `
    <div class="admin-stat-card">
      <div class="admin-stat-icon" style="color:${s.color}"><i class="${s.icon}"></i></div>
      <div class="admin-stat-num">${s.value}</div>
      <div class="admin-stat-label">${s.label}</div>
    </div>`).join('');
}

/* ──────────────────────────────────────────
   17. ADMIN TABS & TABLE SYSTEM
────────────────────────────────────────── */
let _currentTab     = 'students';
let _selectedIds    = new Set();
let _searchQuery    = '';
let _sortMode       = 'default';

const TAB_CONFIG = {
  students: {
    label: 'Students',
    icon:  'ri-user-settings-fill',
    key:   KEY.students,
    cols:  ['Photo', 'Name', 'Class', 'Roll No', 'Added'],
    fields: ['img', 'name', 'class', 'rollNo', 'addedAt'],
    formTitle: 'Add / Edit Student',
    formSetup: () => {
      el('inpName').placeholder = 'Student Full Name';
      el('inpD1').placeholder   = 'Class (e.g. 10)';
      el('inpD2').placeholder   = 'Roll No';
      el('inpD2').style.display = '';
      el('adminMediaRow').style.display = '';
    },
    getRecord: () => ({ name: el('inpName').value.trim(), class: el('inpD1').value.trim(), rollNo: el('inpD2').value.trim(), img: el('tempImg').value }),
    validate: r => r.name && r.class,
    rowCells: r => [
      `<img src="${r.img || 'https://i.pravatar.cc/100?img=1'}" alt="${r.name}" onerror="this.src='https://i.pravatar.cc/100?img=1'">`,
      r.name, `Class ${r.class}`, r.rollNo || '—', formatDate(new Date(r.addedAt).toISOString().slice(0, 10))
    ],
  },
  staff: {
    label: 'Staff',
    icon:  'ri-team-fill',
    key:   KEY.staff,
    cols:  ['Photo', 'Name', 'Department', 'Added'],
    fields: ['img', 'name', 'dept', 'addedAt'],
    formTitle: 'Add / Edit Staff',
    formSetup: () => {
      el('inpName').placeholder = 'Staff Full Name';
      el('inpD1').placeholder   = 'Department';
      el('inpD2').placeholder   = '(Not used for staff)';
      el('inpD2').style.display = 'none';
      el('adminMediaRow').style.display = '';
    },
    getRecord: () => ({ name: el('inpName').value.trim(), dept: el('inpD1').value.trim(), img: el('tempImg').value }),
    validate: r => r.name && r.dept,
    rowCells: r => [
      `<img src="${r.img || 'https://i.pravatar.cc/100?img=1'}" alt="${r.name}" onerror="this.src='https://i.pravatar.cc/100?img=1'">`,
      r.name, r.dept, formatDate(new Date(r.addedAt).toISOString().slice(0, 10))
    ],
  },
  attendance: {
    label: 'Student Attendance',
    icon:  'ri-user-follow-fill',
    key:   KEY.attendance,
    cols:  ['Student Name', 'Std'],
    formTitle: 'Mark Student Attendance',
    formSetup: () => {
      el('inpName').placeholder = 'Student Name (search)';
      el('inpD1').placeholder   = 'Date (YYYY-MM-DD)';
      el('inpD2').placeholder   = 'Status: present / absent';
      el('inpD2').style.display = '';
      el('adminMediaRow').style.display = 'none';
    },
    getRecord: () => ({
      name:   el('inpName').value.trim(),
      date:   el('inpD1').value.trim() || todayStr(),
      status: el('inpD2').value.trim().toLowerCase(),
    }),
    validate: r => r.name && r.status,
  },
  staffAttendance: {
    label: 'Staff Attendance',
    icon:  'ri-calendar-check-fill',
    key:   KEY.staffAttendance,
    cols:  ['Date', 'Staff', 'Department', 'Status'],
    formTitle: 'Mark Staff Attendance',
    formSetup: () => {
      el('inpName').placeholder = 'Staff Name (search)';
      el('inpD1').placeholder   = 'Date (YYYY-MM-DD)';
      el('inpD2').placeholder   = 'Status: present / absent';
      el('inpD2').style.display = '';
      el('adminMediaRow').style.display = 'none';
    },
    getRecord: () => ({
      name:   el('inpName').value.trim(),
      date:   el('inpD1').value.trim() || todayStr(),
      status: el('inpD2').value.trim().toLowerCase(),
    }),
    validate: r => r.name && r.status,
  },
  toppers: {
    label: 'Toppers',
    icon:  'ri-award-fill',
    key:   KEY.toppers,
    cols:  ['Photo', 'Name', 'Class', 'Score', 'Added'],
    formTitle: 'Add / Edit Topper',
    formSetup: () => {
      el('inpName').placeholder = 'Student Full Name';
      el('inpD1').placeholder   = 'Class (e.g. 10)';
      el('inpD2').placeholder   = 'Score / Percentage';
      el('inpD2').style.display = '';
      el('adminMediaRow').style.display = '';
    },
    getRecord: () => ({ name: el('inpName').value.trim(), class: el('inpD1').value.trim(), score: el('inpD2').value.trim(), img: el('tempImg').value }),
    validate: r => r.name && r.class && r.score,
    rowCells: r => [
      `<img src="${r.img || 'https://i.pravatar.cc/100?img=1'}" alt="${r.name}" onerror="this.src='https://i.pravatar.cc/100?img=1'">`,
      r.name, `Class ${r.class}`, r.score, formatDate(new Date(r.addedAt).toISOString().slice(0, 10))
    ],
  },
  functions: {
    label: 'Functions',
    icon:  'ri-calendar-event-fill',
    key:   KEY.functions,
    cols:  ['Photo', 'Event Name', 'Category', 'Description', 'Added'],
    formTitle: 'Add / Edit Event',
    formSetup: () => {
      el('inpName').placeholder = 'Event Name';
      el('inpD1').placeholder   = 'Category (e.g. Picnic)';
      el('inpD2').placeholder   = 'Description';
      el('inpD2').style.display = '';
      el('adminMediaRow').style.display = '';
    },
    getRecord: () => ({ name: el('inpName').value.trim(), category: el('inpD1').value.trim(), desc: el('inpD2').value.trim(), img: el('tempImg').value }),
    validate: r => r.name,
    rowCells: r => [
      `<img src="${r.img || 'https://placehold.co/60x60'}" alt="${r.name}" onerror="this.src='https://placehold.co/60x60'">`,
      r.name, r.category || '—', (r.desc || '').slice(0, 40) + ((r.desc || '').length > 40 ? '…' : ''), formatDate(new Date(r.addedAt).toISOString().slice(0, 10))
    ],
  },
  notices: {
    label: 'Notices',
    icon:  'ri-notification-badge-fill',
    key:   KEY.notices,
    cols:  ['Notice Text', 'Added'],
    formTitle: 'Add / Edit Notice',
    formSetup: () => {
      el('inpName').placeholder = 'Notice Text (full)';
      el('inpD1').placeholder   = 'Priority (optional)';
      el('inpD2').placeholder   = 'Expiry Date (optional)';
      el('inpD2').style.display = '';
      el('adminMediaRow').style.display = 'none';
    },
    getRecord: () => ({ text: el('inpName').value.trim(), priority: el('inpD1').value.trim(), expiry: el('inpD2').value.trim() }),
    validate: r => r.text,
    rowCells: r => [
      (r.text || '').slice(0, 60) + ((r.text || '').length > 60 ? '…' : ''),
      formatDate(new Date(r.addedAt).toISOString().slice(0, 10))
    ],
  },
};

function initAdminTabs() {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _currentTab  = btn.dataset.tab;
      _selectedIds = new Set();
      _searchQuery = '';
      _sortMode    = 'default';
      if (el('adminSearchInput')) el('adminSearchInput').value = '';
      if (el('adminSortSelect'))  el('adminSortSelect').value  = 'default';
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.toggle('active', b === btn));
      if (_currentTab === 'history') {
        el('adminTableSection').style.display = 'none';
        el('adminForm').style.display         = 'none';
        el('adminToolbar') && (el('adminToolbar').style.display = 'none');
        el('historyPanel').style.display      = '';
        renderHistory();
      } else {
        el('adminTableSection').style.display = '';
        el('adminForm').style.display         = '';
        el('adminToolbar') && (el('adminToolbar').style.display = '');
        el('historyPanel').style.display      = 'none';
        setupAdminForm();
        renderAdminTable();
      }
      updateBulkDeleteBtn();
    });
  });
}

/* ──────────────────────────────────────────
   18. ADMIN FORM SETUP
────────────────────────────────────────── */
function setupAdminForm() {
  const cfg = TAB_CONFIG[_currentTab];
  if (!cfg) return;
  const titleEl = el('formTitle');
  if (titleEl) titleEl.innerHTML = `<i class="${cfg.icon}" style="color:#6366f1"></i> ${cfg.formTitle}`;
  cfg.formSetup?.();
  // Reset fields
  el('inpName').value = '';
  el('inpD1').value   = '';
  el('inpD2').value   = '';
  el('tempImg').value = '';
  el('editId').value  = '';
  const preview = el('imgPreview');
  if (preview) { preview.src = ''; preview.style.display = 'none'; }
}

function initAdminForm() {
  el('saveDataBtn')?.addEventListener('click', saveRecord);
  el('resetFormBtn')?.addEventListener('click', () => { setupAdminForm(); toast('Form cleared.', 'info'); });
  el('inpImg')?.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast('Image too large (max 2MB).', 'error'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      el('tempImg').value  = e.target.result;
      const preview        = el('imgPreview');
      if (preview) { preview.src = e.target.result; preview.style.display = 'block'; }
    };
    reader.readAsDataURL(file);
  });
}

function saveRecord() {
  const cfg = TAB_CONFIG[_currentTab];
  if (!cfg) return;

  if (_currentTab === 'attendance' || _currentTab === 'staffAttendance') {
    saveAttendanceRecord();
    return;
  }

  const rec   = cfg.getRecord();
  if (!cfg.validate(rec)) { toast('Please fill all required fields.', 'warn'); return; }

  const editId = el('editId').value.trim();
  const data   = LS.get(cfg.key, []);

  if (editId) {
    const idx = data.findIndex(r => r.id === editId);
    if (idx !== -1) {
      data[idx] = { ...data[idx], ...rec };
      toast('Record updated! ✏️', 'success');
    }
  } else {
    data.push({ ...rec, id: uid(cfg.label.slice(0, 2).toUpperCase()), addedAt: Date.now() });
    toast('Record saved! ✅', 'success');
  }

  LS.set(cfg.key, data);
  setupAdminForm();
  renderAdminTable();
  renderAdminStats();
  if (_currentTab === 'notices') renderNoticeTicker();
  if (_currentTab === 'toppers') renderToppers();
  if (_currentTab === 'functions') renderFunctions();
  renderHome();
}

function saveAttendanceRecord() {
  const isStaff = _currentTab === 'staffAttendance';
  const name    = el('inpName').value.trim();
  const date    = el('inpD1').value.trim() || todayStr();
  const status  = el('inpD2').value.trim().toLowerCase();

  if (!name || !status || !['present', 'absent'].includes(status)) {
    toast('Enter name, date & status (present/absent).', 'warn'); return;
  }

  const sourceList = LS.get(isStaff ? KEY.staff : KEY.students, []);
  const person     = sourceList.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!person) { toast(`${isStaff ? 'Staff' : 'Student'} not found!`, 'error'); return; }

  const attObj  = LS.get(isStaff ? KEY.staffAttendance : KEY.attendance, {});
  attObj[`${date}|${person.id}`] = status;
  LS.set(isStaff ? KEY.staffAttendance : KEY.attendance, attObj);

  setupAdminForm();
  renderAdminTable();
  renderAdminStats();
  toast(`${person.name} marked ${status} on ${formatDate(date)} ✅`, 'success');
}

/* ──────────────────────────────────────────
   19. ADMIN TABLE RENDER
────────────────────────────────────────── */
function renderAdminTable() {
  const cfg      = TAB_CONFIG[_currentTab];
  if (!cfg) return;

  const thead    = el('tableHead');
  const tbody    = el('tableBody');
  const empty    = el('adminEmptyState');
  if (!thead || !tbody) return;

  let data;

  if (_currentTab === 'attendance' || _currentTab === 'staffAttendance') {
    data = buildAttendanceRows(_currentTab === 'staffAttendance');
  } else {
    data = LS.get(cfg.key, []);
  }

  // Search filter
  if (_searchQuery) {
    data = data.filter(r =>
      Object.values(r).some(v =>
        typeof v === 'string' && v.toLowerCase().includes(_searchQuery)
      )
    );
  }

  // Sort
  if (_sortMode === 'az') data = [...data].sort((a, b) => (a.name || a.text || '').localeCompare(b.name || b.text || ''));
  if (_sortMode === 'za') data = [...data].sort((a, b) => (b.name || b.text || '').localeCompare(a.name || a.text || ''));
  if (_sortMode === 'newest') data = [...data].sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));

  // Header
  const cols = cfg.cols || [];
  thead.innerHTML = `<tr>
    <th><input type="checkbox" id="selectAllChk" title="Select All"></th>
    ${cols.map(c => `<th>${c}</th>`).join('')}
    <th>Actions</th>
  </tr>`;

  el('selectAllChk')?.addEventListener('change', function () {
    const isChecked = this.checked;
    _selectedIds = isChecked ? new Set(data.map(r => r.id)) : new Set();
    tbody.querySelectorAll('.row-chk').forEach(c => { c.checked = isChecked; });
    updateBulkDeleteBtn();
  });

  // Rows
  if (!data.length) {
    tbody.innerHTML = '';
    empty.style.display = '';
    return;
  }
  empty.style.display = 'none';

  tbody.innerHTML = data.map(r => {
    let cells;
    if (_currentTab === 'attendance') {
      // Restricted view: only Student Name and Std
      cells = [r.personName, r.extra];
    } else if (_currentTab === 'staffAttendance') {
      cells = [r.date, r.personName, r.extra, r.status];
    } else {
      cells = cfg.rowCells ? cfg.rowCells(r) : cols.map(c => r[c] || '—');
    }

    const statusCell = _currentTab === 'staffAttendance'
      ? cells.map((c, i) => i === 3
          ? `<td>${c === 'present'
              ? `<span class="status-pill status-present" style="font-size:0.72rem"><i class="ri-checkbox-circle-fill"></i> Present</span>`
              : `<span class="status-pill status-absent" style="font-size:0.72rem"><i class="ri-close-circle-fill"></i> Absent</span>`}</td>`
          : `<td>${c}</td>`).join('')
      : cells.map(c => `<td>${c}</td>`).join('');

    return `<tr>
      <td><input type="checkbox" class="row-chk" data-id="${r.id}" ${_selectedIds.has(r.id) ? 'checked' : ''}></td>
      ${statusCell}
      <td>
        <div style="display:flex;gap:0.35rem;flex-wrap:wrap">
          <button class="p-btn edit-btn" data-id="${r.id}" style="padding:4px 10px;font-size:0.74rem">
            <i class="ri-edit-2-fill" style="color:#818cf8"></i> Edit
          </button>
          <button class="a-btn del-btn" data-id="${r.id}" style="padding:4px 10px;font-size:0.74rem">
            <i class="ri-delete-bin-5-fill" style="color:#f87171"></i> Del
          </button>
        </div>
      </td>
    </tr>`;
  }).join('');

  // Row checkbox events
  tbody.querySelectorAll('.row-chk').forEach(chk => {
    chk.addEventListener('change', function () {
      this.checked ? _selectedIds.add(this.dataset.id) : _selectedIds.delete(this.dataset.id);
      updateBulkDeleteBtn();
    });
  });

  // Edit buttons — scroll to the admin form at the top
  tbody.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      editRecord(btn.dataset.id);
      const adminForm = el('adminForm');
      if (adminForm) adminForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Delete buttons
  tbody.querySelectorAll('.del-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteRecord(btn.dataset.id));
  });
}

function buildAttendanceRows(isStaff) {
  const attObj    = LS.get(isStaff ? KEY.staffAttendance : KEY.attendance, {});
  const people    = LS.get(isStaff ? KEY.staff : KEY.students, []);
  const peopleMap = {};
  people.forEach(p => { peopleMap[p.id] = p; });

  return Object.entries(attObj).map(([k, status]) => {
    const [date, pid] = k.split('|');
    const person      = peopleMap[pid] || {};
    return {
      id:         k,
      date:       date,
      personName: person.name || pid,
      extra:      isStaff ? (person.dept || '—') : (`Class ${person.class || '—'}`),
      status:     status,
      addedAt:    new Date(date).getTime(),
    };
  }).sort((a, b) => b.addedAt - a.addedAt);
}

function editRecord(id) {
  const cfg = TAB_CONFIG[_currentTab];
  if (!cfg || !cfg.key) return;

  if (_currentTab === 'attendance' || _currentTab === 'staffAttendance') {
    toast('To edit attendance, delete and re-mark.', 'info'); return;
  }

  const data = LS.get(cfg.key, []);
  const rec  = data.find(r => r.id === id);
  if (!rec) return;

  el('inpName').value  = rec.name || rec.text || '';
  el('inpD1').value    = rec.class || rec.dept || rec.category || rec.priority || '';
  el('inpD2').value    = rec.rollNo || rec.role || rec.score || rec.desc || rec.expiry || '';
  el('tempImg').value  = rec.img || '';
  el('editId').value   = id;

  const preview = el('imgPreview');
  if (preview && rec.img) { preview.src = rec.img; preview.style.display = 'block'; }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  toast('Record loaded for editing. ✏️', 'info');
}

function deleteRecord(id) {
  showConfirm('Delete this record?', 'This cannot be undone.', () => {
    const cfg = TAB_CONFIG[_currentTab];
    if (_currentTab === 'attendance' || _currentTab === 'staffAttendance') {
      const key = _currentTab === 'staffAttendance' ? KEY.staffAttendance : KEY.attendance;
      const attObj = LS.get(key, {});
      delete attObj[id];
      LS.set(key, attObj);
    } else {
      const data = LS.get(cfg.key, []);
      LS.set(cfg.key, data.filter(r => r.id !== id));
    }
    _selectedIds.delete(id);
    renderAdminTable();
    renderAdminStats();
    if (_currentTab === 'notices') renderNoticeTicker();
    if (_currentTab === 'toppers') renderToppers();
    if (_currentTab === 'functions') renderFunctions();
    renderHome();
    toast('Record deleted.', 'warn');
  });
}

/* ──────────────────────────────────────────
   20. BULK DELETE
────────────────────────────────────────── */
function updateBulkDeleteBtn() {
  const btn = el('bulkDeleteBtn');
  if (!btn) return;
  const count = _selectedIds.size;
  btn.disabled = count === 0;
  el('bulkSelectedCount').textContent = count;
}

function initBulkDelete() {
  el('bulkDeleteBtn')?.addEventListener('click', () => {
    if (!_selectedIds.size) return;
    showConfirm(`Delete ${_selectedIds.size} selected records?`, 'This cannot be undone.', () => {
      const cfg = TAB_CONFIG[_currentTab];
      if (_currentTab === 'attendance' || _currentTab === 'staffAttendance') {
        const key = _currentTab === 'staffAttendance' ? KEY.staffAttendance : KEY.attendance;
        const attObj = LS.get(key, {});
        _selectedIds.forEach(id => delete attObj[id]);
        LS.set(key, attObj);
      } else {
        const data = LS.get(cfg.key, []);
        LS.set(cfg.key, data.filter(r => !_selectedIds.has(r.id)));
      }
      toast(`${_selectedIds.size} records deleted.`, 'warn');
      _selectedIds = new Set();
      renderAdminTable();
      renderAdminStats();
      updateBulkDeleteBtn();
    });
  });
}

/* ──────────────────────────────────────────
   21. CONFIRM MODAL
────────────────────────────────────────── */
let _confirmCallback = null;

function showConfirm(title, text, callback) {
  _confirmCallback = callback;
  const modal = el('confirmModal');
  if (el('confirmModalTitle')) el('confirmModalTitle').textContent = title;
  if (el('confirmModalText'))  el('confirmModalText').textContent  = text;
  modal?.classList.add('active');
}

function initConfirmModal() {
  el('confirmModalYesBtn')?.addEventListener('click', () => {
    el('confirmModal')?.classList.remove('active');
    _confirmCallback?.();
    _confirmCallback = null;
  });
  el('confirmModalNoBtn')?.addEventListener('click', () => {
    el('confirmModal')?.classList.remove('active');
    _confirmCallback = null;
  });
}

/* ──────────────────────────────────────────
   22. SEARCH & SORT
────────────────────────────────────────── */
function initSearchSort() {
  el('adminSearchInput')?.addEventListener('input', function () {
    _searchQuery = this.value.trim().toLowerCase();
    renderAdminTable();
  });
  el('adminSortSelect')?.addEventListener('change', function () {
    _sortMode = this.value;
    renderAdminTable();
  });
}

/* ──────────────────────────────────────────
   23. EXPORT — EXCEL / PDF / CSV
────────────────────────────────────────── */
function initExport() {
  el('exportExcelBtn')?.addEventListener('click', exportExcel);
  el('exportPdfBtn')?.addEventListener('click', exportPDF);
  // CSV button removed per requirements
}

function getExportData() {
  const cfg = TAB_CONFIG[_currentTab];
  if (!cfg) return { headers: [], rows: [] };
  let data;
  if (_currentTab === 'attendance' || _currentTab === 'staffAttendance') {
    data = buildAttendanceRows(_currentTab === 'staffAttendance');
    return {
      headers: ['Date', 'Person', 'Class/Dept', 'Status'],
      rows: data.map(r => [r.date, r.personName, r.extra, r.status])
    };
  }
  data = LS.get(cfg.key, []);
  const headers = cfg.cols.filter(c => c !== 'Photo');
  const rows = data.map(r => cfg.rowCells ? cfg.rowCells(r).slice(1) : headers.map(h => r[h] || ''));
  return { headers, rows };
}

function exportCSV() {
  const { headers, rows } = getExportData();
  const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  downloadFile(`sagar_${_currentTab}_${todayStr()}.csv`, 'text/csv', csv);
  toast('CSV downloaded! 📄', 'success');
}

function exportExcel() {
  try {
    if (!window.XLSX) { toast('XLSX library not loaded.', 'error'); return; }
    const { headers, rows } = getExportData();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, _currentTab);
    XLSX.writeFile(wb, `sagar_${_currentTab}_${todayStr()}.xlsx`);
    toast('Excel downloaded! 📊', 'success');
  } catch (e) { toast('Export failed: ' + e.message, 'error'); }
}

function exportPDF() {
  try {
    if (!window.jspdf) { toast('jsPDF library not loaded.', 'error'); return; }
    const { jsPDF } = window.jspdf;
    const { headers, rows } = getExportData();
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Sagar Classes — ${TAB_CONFIG[_currentTab]?.label || _currentTab}`, 14, 14);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 14, 20);
    doc.autoTable({ head: [headers], body: rows, startY: 26, styles: { fontSize: 9 }, headStyles: { fillColor: [99, 102, 241] } });
    doc.save(`sagar_${_currentTab}_${todayStr()}.pdf`);
    toast('PDF downloaded! 📑', 'success');
  } catch (e) { toast('Export failed: ' + e.message, 'error'); }
}

function downloadFile(name, type, content) {
  const a  = document.createElement('a');
  a.href   = URL.createObjectURL(new Blob([content], { type }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ──────────────────────────────────────────
   24. HISTORY / ARCHIVE PANEL
────────────────────────────────────────── */
function initHistory() {
  el('archiveNowBtn')?.addEventListener('click', archiveCurrentMonth);
  el('historySearchInput')?.addEventListener('input', renderHistory);
  el('historyTypeFilter')?.addEventListener('change', renderHistory);
}

function archiveCurrentMonth() {
  const monthKey  = currentMonthKey();
  const history   = LS.get(KEY.history, []);

  if (history.find(h => h.monthKey === monthKey)) {
    showConfirm('Re-archive this month?', 'This will overwrite the existing snapshot.', () => {
      doArchive(monthKey);
    });
    return;
  }
  doArchive(monthKey);
}

function doArchive(monthKey) {
  const students       = LS.get(KEY.students, []);
  const staff          = LS.get(KEY.staff, []);
  const attendance     = LS.get(KEY.attendance, {});
  const staffAtt       = LS.get(KEY.staffAttendance, {});

  // Filter entries for this month
  const monthPrefix    = monthKey; // "YYYY-MM"
  const studentSnap    = {};
  const staffSnap      = {};

  Object.entries(attendance).forEach(([k, v]) => {
    if (k.startsWith(monthPrefix)) studentSnap[k] = v;
  });
  Object.entries(staffAtt).forEach(([k, v]) => {
    if (k.startsWith(monthPrefix)) staffSnap[k] = v;
  });

  // Calculate summary
  const studentSummary = summariseAttendance(students, studentSnap);
  const staffSummary   = summariseAttendance(staff, staffSnap);

  const record = {
    id:             uid('ARC'),
    monthKey,
    label:          formatMonthYear(monthKey),
    archivedAt:     Date.now(),
    studentCount:   students.length,
    staffCount:     staff.length,
    studentPresent: Object.values(studentSnap).filter(v => v === 'present').length,
    studentAbsent:  Object.values(studentSnap).filter(v => v === 'absent').length,
    staffPresent:   Object.values(staffSnap).filter(v => v === 'present').length,
    staffAbsent:    Object.values(staffSnap).filter(v => v === 'absent').length,
    studentData:    studentSummary,
    staffData:      staffSummary,
  };

  const history = LS.get(KEY.history, []).filter(h => h.monthKey !== monthKey);
  history.unshift(record);
  LS.set(KEY.history, history);

  toast(`📦 ${record.label} archived successfully!`, 'success');
  renderHistory();
  renderAdminStats();
}

function summariseAttendance(people, attObj) {
  return people.map(p => {
    const entries = Object.entries(attObj).filter(([k]) => k.endsWith(`|${p.id}`));
    const present = entries.filter(([, v]) => v === 'present').length;
    const absent  = entries.filter(([, v]) => v === 'absent').length;
    const total   = present + absent;
    return {
      id: p.id, name: p.name,
      dept: p.dept || `Class ${p.class || '—'}`,
      present, absent, total,
      pct: total ? Math.round((present / total) * 100) : 0
    };
  });
}

function renderHistory() {
  const grid       = el('historyCardsGrid');
  const emptyState = el('historyEmptyState');
  const lastBadge  = el('lastArchiveText');
  if (!grid) return;

  let history      = LS.get(KEY.history, []);
  const query      = (el('historySearchInput')?.value || '').trim().toLowerCase();
  const typeFilter = el('historyTypeFilter')?.value || 'all';

  if (lastBadge) {
    lastBadge.textContent = history.length
      ? `Last: ${history[0].label}`
      : 'No archive yet';
  }

  if (query) history = history.filter(h => h.label.toLowerCase().includes(query) || h.monthKey.includes(query));

  if (!history.length) {
    grid.innerHTML = '';
    emptyState.style.display = '';
    return;
  }
  emptyState.style.display = 'none';

  grid.innerHTML = history.map(h => {
    const sPct = h.studentPresent + h.studentAbsent > 0 ? Math.round((h.studentPresent / (h.studentPresent + h.studentAbsent)) * 100) : 0;
    const tPct = h.staffPresent + h.staffAbsent > 0     ? Math.round((h.staffPresent   / (h.staffPresent   + h.staffAbsent))   * 100) : 0;

    const showStudent = typeFilter !== 'staff';
    const showStaff   = typeFilter !== 'student';

    return `
    <div class="history-archive-card">
      <div class="history-card-top">
        <div class="history-month-badge">
          <div style="width:42px;height:42px;background:rgba(45,212,191,0.1);border:1px solid rgba(45,212,191,0.25);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">
            <i class="ri-calendar-2-fill" style="color:#2dd4bf"></i>
          </div>
          <div>
            <span class="history-month-label">${h.label}</span>
            <span style="font-size:0.72rem;color:var(--text-muted);display:block"><i class="ri-time-fill"></i> Archived ${formatDate(new Date(h.archivedAt).toISOString().slice(0, 10))}</span>
          </div>
        </div>
        <div class="history-card-actions">
          ${showStudent ? `
            <button class="history-excel-btn" onclick="exportHistoryExcel('${h.id}','student')" title="Students Data Excel">
              <i class="ri-file-excel-2-fill" style="color:#34d399"></i> Students Data
            </button>
            <button class="history-pdf-btn" onclick="exportHistoryPDF('${h.id}','student')" title="Students Data PDF">
              <i class="ri-file-pdf-2-fill" style="color:#f87171"></i> PDF
            </button>` : ''}
          ${showStaff ? `
            <button class="history-excel-btn" onclick="exportHistoryExcel('${h.id}','staff')" title="Staff Data Excel">
              <i class="ri-file-excel-2-fill" style="color:#a78bfa"></i> Staff Data
            </button>
            <button class="history-pdf-btn" onclick="exportHistoryPDF('${h.id}','staff')" title="Staff Data PDF">
              <i class="ri-file-pdf-2-fill" style="color:#f87171"></i> PDF
            </button>` : ''}
          <button class="history-delete-btn" onclick="deleteHistory('${h.id}')" title="Delete Archive">
            <i class="ri-delete-bin-5-fill" style="color:#f87171"></i>
          </button>
        </div>
      </div>

      <div class="history-stats-row">
        ${showStudent ? `<div class="history-stat-box history-stat-student">
          <div class="history-stat-box-top">
            <i class="ri-user-heart-fill" style="color:#818cf8"></i>
            <span class="history-pct-badge">${sPct}%</span>
          </div>
          <div class="history-stat-num">${h.studentCount}</div>
          <div class="history-stat-label-text">Students Data</div>
          <div class="history-mini-pills">
            <span class="history-mini-pill history-mini-pill-present"><i class="ri-check-fill"></i> ${h.studentPresent}</span>
            <span class="history-mini-pill history-mini-pill-absent"><i class="ri-close-fill"></i> ${h.studentAbsent}</span>
          </div>
        </div>` : ''}
        ${showStaff ? `<div class="history-stat-box history-stat-staff">
          <div class="history-stat-box-top">
            <i class="ri-team-fill" style="color:#34d399"></i>
            <span class="history-pct-badge">${tPct}%</span>
          </div>
          <div class="history-stat-num">${h.staffCount}</div>
          <div class="history-stat-label-text">Staff Data</div>
          <div class="history-mini-pills">
            <span class="history-mini-pill history-mini-pill-present"><i class="ri-check-fill"></i> ${h.staffPresent}</span>
            <span class="history-mini-pill history-mini-pill-absent"><i class="ri-close-fill"></i> ${h.staffAbsent}</span>
          </div>
        </div>` : ''}
      </div>

      <div class="history-preview-toggle">
        <span style="font-size:0.78rem;color:var(--text-muted)"><i class="ri-information-fill" style="color:#38bdf8"></i> ${h.monthKey}</span>
        <button class="history-preview-btn" onclick="toggleHistoryPreview(this,'${h.id}')">
          <i class="ri-eye-fill"></i> Preview Data
        </button>
      </div>
      <div class="history-preview-table" id="preview_${h.id}" style="display:none"></div>
    </div>`;
  }).join('');
}

window.toggleHistoryPreview = function (btn, id) {
  const panel  = el(`preview_${id}`);
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  if (isOpen) { panel.style.display = 'none'; btn.innerHTML = '<i class="ri-eye-fill"></i> Preview Data'; return; }

  const history = LS.get(KEY.history, []);
  const h       = history.find(x => x.id === id);
  if (!h) return;

  const makeTable = (data, title, color) => {
    if (!data || !data.length) return '';
    return `
      <div class="history-preview-section">
        <div class="history-preview-heading"><i class="ri-table-fill" style="color:${color}"></i> ${title}</div>
        <div class="table-responsive-wrapper" style="border-radius:8px;overflow:hidden">
          <table style="min-width:400px;font-size:0.8rem">
            <thead><tr><th>Name</th><th>Dept/Class</th><th>Present</th><th>Absent</th><th>Total</th><th>%</th></tr></thead>
            <tbody>${data.map(r => `
              <tr>
                <td>${r.name}</td><td>${r.dept}</td>
                <td style="color:#34d399;font-weight:600">${r.present}</td>
                <td style="color:#f87171;font-weight:600">${r.absent}</td>
                <td>${r.total}</td>
                <td><strong>${r.pct}%</strong></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  };

  panel.innerHTML = makeTable(h.studentData, 'Student Attendance', '#818cf8') + makeTable(h.staffData, 'Staff Attendance', '#34d399');
  panel.style.display = '';
  btn.innerHTML = '<i class="ri-eye-off-fill"></i> Hide Preview';
};

window.exportHistoryPDF = function (id, type) {
  try {
    if (!window.jspdf) { toast('jsPDF library not loaded.', 'error'); return; }
    const { jsPDF } = window.jspdf;
    const history = LS.get(KEY.history, []);
    const h       = history.find(x => x.id === id);
    if (!h) return;

    const data    = type === 'staff' ? h.staffData : h.studentData;
    const headers = ['Name', 'Dept / Class', 'Present', 'Absent', 'Total Days', '% Attendance'];
    const rows    = (data || []).map(r => [r.name, r.dept, r.present, r.absent, r.total, `${r.pct}%`]);
    const label   = type === 'staff' ? 'Staff Data' : 'Students Data';

    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Sagar Classes — ${h.label} — ${label}`, 14, 14);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 14, 20);
    doc.autoTable({ head: [headers], body: rows, startY: 26, styles: { fontSize: 9 }, headStyles: { fillColor: [99, 102, 241] } });
    doc.save(`${type}_attendance_${h.monthKey}.pdf`);
    toast(`${label} PDF downloaded! 📑`, 'success');
  } catch (e) { toast('PDF export failed: ' + e.message, 'error'); }
};

window.deleteHistory = function (id) {
  showConfirm('Delete this archive?', 'This snapshot will be permanently removed.', () => {
    const history = LS.get(KEY.history, []).filter(h => h.id !== id);
    LS.set(KEY.history, history);
    renderHistory();
    renderAdminStats();
    toast('Archive deleted.', 'warn');
  });
};

window.exportHistoryExcel = function (id, type) {
  if (!window.XLSX) { toast('XLSX library not loaded.', 'error'); return; }
  const history = LS.get(KEY.history, []);
  const h       = history.find(x => x.id === id);
  if (!h) return;

  const data    = type === 'staff' ? h.staffData : h.studentData;
  const headers = ['Name', 'Dept / Class', 'Present', 'Absent', 'Total Days', '% Attendance'];
  const rows    = (data || []).map(r => [r.name, r.dept, r.present, r.absent, r.total, `${r.pct}%`]);

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, h.label);
  XLSX.writeFile(wb, `${type}_attendance_${h.monthKey}.xlsx`);
  toast(`${type === 'staff' ? 'Staff' : 'Student'} Excel downloaded! 📊`, 'success');
};

/* ──────────────────────────────────────────
   25. AUTO ARCHIVE (new month detection)
────────────────────────────────────────── */
function checkAutoArchive() {
  const history    = LS.get(KEY.history, []);
  const lastKey    = LS.get('sc_last_active_month', null);
  const thisMonth  = currentMonthKey();

  if (lastKey && lastKey !== thisMonth) {
    // Month changed — auto-archive last month
    doArchive(lastKey);
    toast(`Auto-archived ${formatMonthYear(lastKey)} 📦`, 'info');
  }
  LS.set('sc_last_active_month', thisMonth);
}

/* ──────────────────────────────────────────
   26. CONTACT FORM
────────────────────────────────────────── */
function initContactForm() {
  const form = el('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    // Let Formspree handle it; show success msg after a delay
    setTimeout(() => {
      const msg = el('formSuccessMsg');
      if (msg) { msg.style.display = 'flex'; setTimeout(() => { msg.style.display = 'none'; }, 6000); }
    }, 1200);
  });
}

/* ──────────────────────────────────────────
   27. DATE DISPLAY
────────────────────────────────────────── */
function updateDateDisplays() {
  const today = formatDate(todayStr());
  const studentDate = el('studentCurrentDateText');
  const staffDate   = el('staffCurrentDateText');
  if (studentDate) studentDate.textContent = today;
  if (staffDate)   staffDate.textContent   = today;
}

/* ──────────────────────────────────────────
   28. ADMIN TOOLBAR — hide on history tab
────────────────────────────────────────── */
function assignToolbarId() {
  // Give toolbar a queryable id if not set
  const toolbar = document.querySelector('.admin-toolbar');
  if (toolbar && !toolbar.id) toolbar.id = 'adminToolbar';
}

/* ──────────────────────────────────────────
   29. INIT — ENTRY POINT
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  seedData();
  assignToolbarId();
  updateDateDisplays();
  checkAutoArchive();

  initTheme();
  initNav();
  initAdminModal();
  initConfirmModal();
  initAdminTabs();
  initAdminForm();
  initBulkDelete();
  initSearchSort();
  initExport();
  initHistory();
  initAttendanceSearch();
  initContactForm();

  // Initial page render
  renderHome();

  // Setup default admin form for students tab
  setupAdminForm();
  renderAdminTable();

  console.log('%c🎓 Sagar Classes Portal v3.0 — Ready!', 'color:#6366f1;font-weight:bold;font-size:14px');
});
