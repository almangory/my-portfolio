/**
 * Osman Mohamed - Portfolio & Interactive Resume
 * Main JavaScript Engine with Image Preview, Social Links (YouTube & TikTok) & Protected Dashboards
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initProjectFilters();
  initCounters();
  initModals();
  initCopyButtons();
  initContactForm();
});

/* ============================================================
   1. Theme Management (Light / Dark Mode)
   ============================================================ */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  
  const savedTheme = localStorage.getItem('osman-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('osman-theme', isDark ? 'dark' : 'light');
  }
  
  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);
}

/* ============================================================
   2. Mobile Navigation Menu
   ============================================================ */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', !isHidden);
    });
    
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ============================================================
   3. Project Filter Tabs
   ============================================================ */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/20');
        b.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200', 'dark:bg-slate-800', 'dark:text-slate-300', 'dark:hover:bg-slate-700');
      });
      
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200', 'dark:bg-slate-800', 'dark:text-slate-300', 'dark:hover:bg-slate-700');
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'shadow-blue-500/20');
      
      const category = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory.includes(category)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ============================================================
   4. Animated Stat Counters on Scroll
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  let animated = false;
  
  function countUp() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = Math.ceil(target / 40);
      
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          counter.innerText = target;
          clearInterval(timer);
        } else {
          counter.innerText = count;
        }
      }, 35);
    });
  }
  
  const statsSection = document.getElementById('stats-section');
  if (!statsSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        countUp();
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(statsSection);
}

/* ============================================================
   5. Interactive Modals (Projects, Screenshots & Details)
   ============================================================ */
const projectDetailsData = {
  'project-geogis': {
    title: 'المحول الشامل للخرائط الجغرافية | GeoGIS Pro',
    company: 'أداة هندسية متقدمة لمشاريع شركة المياه الوطنية (NWC)',
    period: 'تطبيق حي ومتاح أونلاين (PWA)',
    badge: 'تطبيق ويب حي ومباشر 🌐',
    liveUrl: 'https://map-tools-657.pages.dev/',
    image: null,
    description: 'تطبيق ويب هندسي وتطبيق PWA متكامل مخصص لمهندسي واستشاريي مشاريع المياه والخدمات البيئية. يتيح تحويل وتنسيق ملفات الخرائط المكانية (KML/KMZ/GeoJSON)، مع محاكاة بصرية متقدمة لاتجاهات السريان الهيدروليكي (Hydraulic Flow Direction) لشبكات الانحدار والمصبات والأسفلت.',
    challenges: 'صعوبة التحقق البصري السريع من مناسيب واتجاهات سريان خطوط الصرف الصحي في المخططات الكبيرة دون برمجيات مكتبية ثقيلة ومعقدة.',
    solution: 'تطوير تطبيق ويب فائق السرعة عبر تقنيات Leaflet و PWA يدعم ثيم شركة المياه الوطنية (NWC Theme)، ومحاكاة السريان المتحرك للخطوط وحساب الكميات وتحديد مواقع المناهل.',
    results: [
      'تطبيق حي منشور ومتاح للاستخدام الفوري على أجهزة الكمبيوتر والهواتف.',
      'محاكاة اتجاه السريان الهيدروليكي بسرعات متغيرة (Flow Velocity Simulation).',
      'دعم كامل لمعايير شركة المياه الوطنية NWC وحساب مساحات الأسفلت بدقة.'
    ],
    tech: ['Leaflet.js', 'GeoJSON & KML/KMZ', 'PWA Offline', 'Hydraulic Animation', 'Tailwind CSS']
  },
  'project-interactive-maps': {
    title: 'بوابة الخرائط التفاعلية لإدارة وتحليل شبكات المياه والصرف الصحي',
    company: 'نظام داخلي خاص بمشاريع شركة المياه الوطنية وقطاع الرياض',
    period: 'نظام تشغيلي متكامل (داخلي ومحمي)',
    badge: 'نظام داخلي خاص ومحمي 🔒',
    liveUrl: null,
    image: 'assets/images/interactive-maps-preview.png',
    description: 'بوابة إدارية وتحليلية جغرافية متكاملة خاصة بإدارة وتتبع عقود ومشاريع شبكات المياه والصرف الصحي بمدينة الرياض. تشتمل على لوحة تحكم ذكية لإدارة المشاريع (123+ مشروعاً)، البحث المتقدم والتصفية، إدارة صلاحيات الحسابات، سجل التغييرات، وتتبع الطبقات الجغرافية والميدانية بدقة متناهية.',
    challenges: 'الحاجة إلى منصة موحدة وآمنة لإدارة وتوزيع صلاحيات المهندسين ومتابعة حالة العقود (مسلم ابتدائي، جاري، معتمد) وربطها جغرافياً على خريطة الرياض في الوقت الفعلي.',
    solution: 'هندسة منصة داخلية متقدمة تضم خريطة تفاعلية شاملة، إدارة مفاتيح الخريطة، البحث الصوتي والنصي السريع، وإدراج مشاريع الخرائط الجديدة مع نظام صلاحيات متعدد المستويات (مدير النظام، مهندس موقع).',
    results: [
      'حصر وتتبع أكثر من 123 مشروعاً وعقداً تنفيذياً على خريطة تفاعلية واحدة.',
      'ربط بيانات العقود بحالة التنفيذ (صرف صحي / مياه) والمناطق (غرب الرياض، جنوب الرياض، إلخ).',
      'توفير بيئة عمل مؤمنة وسريعة لفرق الإشراف والمتابعة العليا.'
    ],
    tech: ['Interactive Mapping', 'Spatial Query Engine', 'Role-Based Access Control', 'PWA & Offline Mode', 'GIS Layering']
  },
  'project-3': {
    title: 'لوحة المتابعة التنفيذية وأتمتة الدورة المستندية لمشاريع شبكات المياه والصرف الصحي',
    company: 'مكتب الباردة للاستشارات الهندسية | شركة المياه الوطنية (عقد أحياء القدس والملك عبدالله)',
    period: '2023م - حتى الآن (لوحة قيادة ومتابعة حية بالمشروع)',
    badge: 'لوحة متابعة تنفيذية حية 📊',
    liveUrl: null,
    image: 'assets/images/edms-dashboard-preview.png',
    description: 'لوحة معلومات ومؤشرات أداء تنفيذية رقمية متقدمة تم تصميمها لمتابعة عقد تنفيذ شبكات الصرف الصحي بأجزاء من أحياء القدس والملك عبدالله بمدينة الرياض. تشتمل اللوحة على عرض دقيق وفوري لنسب الإنجاز الفعلي مقابل المخطط (66.3% مقابل 69.0%)، المدة المنقضية (86.4%)، معدل الإنجاز على مدار 6 أشهر، معدل تنفيذ أطوال الأنابيب التراكمية، ومؤشرات صرف المستخلصات المالية (85% بما يتجاوز 5.26 مليون ريال).',
    challenges: 'تشتت البيانات الفنية والتقارير الأسبوعية بين الاستشاري والمقاول وصعوبة توفير رؤية استراتيجية لحظية لمتخذي القرار ولجان المتابعة بشركة المياه الوطنية.',
    solution: 'هندسة لوحة قيادة مركزية ومؤتمتة تدمج بيانات الجدول الزمني، مؤشرات الحفر والتمديد، موقف الطاقم الفني للمقاول، التصاريح البيئية، موقف المحتوى المحلي (HCIS)، وجداول الكميات المعدلة في شاشة تنفيذية واحدة.',
    results: [
      'تتبع دقيق ومباشر لنسب الإنجاز الفعلي والمخطط وتحديد الفجوات الزمنية بدقة.',
      'رصد تراكمي لأطوال الأنابيب المنفذة شهرياً مع مقارنتها بالمستهدفات التعاقدية.',
      'إدارة وتتبع المستخلصات المالية الصادرة والمصروفة بنسبة دقة 100%.',
      'متابعة فورية للمخالفات البيئية وخطابات الحث والتحديات الميدانية مع المقاول.'
    ],
    tech: ['Executive Dashboard', 'KPI & S-Curve Tracking', 'MS 365 / Excel Engine', 'Contract Management', 'NWC Compliance']
  },
  'project-naqla': {
    title: 'منصة "نقلة" للمناهج الإلكترونية وتطوير التعليم بالسودان',
    company: 'مبادرة تقنية وتعليمية رائدة لخدمة التعليم الوطني',
    period: 'منصة حية ومتاحة أونلاين 🚀',
    badge: 'مشروع ومبادرة خاصة 🌟',
    liveUrl: 'https://sudan-interactive-curricula.vercel.app/',
    youtubeUrl: 'https://www.youtube.com/@naqla-educational',
    tiktokUrl: 'https://www.tiktok.com/@naqlasd',
    image: null,
    description: 'منصة تعليمية إلكترونية تفاعلية وتطبيق PWA هادف تم ابتكاره لتحسين جودة التعليم في السودان، وتحويل المناهج الدراسية إلى بيئة رقمية تفاعلية وسهلة الوصول تدعم العمل دون إنترنت لخدمة الطلاب والمعلمين في كافة المراحل، مدعومة بقناة يوتيوب وحساب تيك توك لتقديم الدروس والمحتوى التعليمي السريع.',
    challenges: 'انقطاع التعليم وصعوبة وصول الطلاب للكتب والمناهج الدراسية الورقية في ظل الظروف الراهنة في السودان وضعف الاتصال بالإنترنت.',
    solution: 'هندسة منصة تعليمية خفيفة الوزن تعتمد نهج (Offline-First) عبر Service Workers، تتيح للطلاب تصفح المناهج والدروس والتمارين التفاعلية دون استهلاك كبير للبيانات، مع نشر الشروحات عبر يوتيوب وتيك توك.',
    results: [
      'منصة حية منشورة تخدم آلاف الطلاب والمعلمين السودانيين.',
      'تجربة تفاعلية متكاملة تدعم التثبيت المباشر على الهواتف والأجهزة اللوحية.',
      'قناة يوتيوب تعليمية متخصصة ومصاحبة للمنصة: @naqla-educational.',
      'حساب تيك توك رسمي لنشر الدروس التفاعلية والمراجعات: @naqlasd.',
      'مساهمة وطنية ومجتمعية فعالة في دعم استمرارية التعليم وتطويره.'
    ],
    tech: ['EdTech Architecture', 'Offline-First (PWA)', 'Modern Web UI', 'Digital Curricula', 'Social Video Integration']
  },
  'project-1': {
    title: 'نظام إدارة طلبات العملاء وقواعد البيانات الميدانية',
    company: 'شركة المياه الوطنية / شركة فؤاد الصالح',
    period: '2015م - حتى الآن (قيد التشغيل)',
    badge: 'منجز ومطبق بنجاح',
    liveUrl: null,
    image: null,
    description: 'نظام تقني متكامل تم تصميمه وبناؤه بقواعد بيانات محلية مخصصة لإدارة طلبات توصيلات الصرف الصحي وحصر المباني السكنية والتجارية بالرياض.',
    challenges: 'صعوبة تتبع آلاف الطلبات الورقية والتوصيلات الميدانية وتضارب السجلات بين فرق الحصر وإدارات القطاع.',
    solution: 'بناء قاعدة بيانات ذات واجهة استعلام مخصصة، مع خوارزميات للتحقق من ازدواجية العقارات وأتمتة إصدار أرقام الحصر والتقارير المجمعة.',
    results: [
      'خدمة آلاف المعاملات على مدار أكثر من 8 سنوات من التشغيل المستقر.',
      'تقليص وقت البحث واستخراج بيانات التوصيلات من ساعات إلى ثوانٍ معدودة.',
      'دقة تامة 100% في ربط المعاملات مع مواقع العقارات السكنية والتجارية.'
    ],
    tech: ['Database Design', 'Data Validation Logic', 'Local Client-Server', 'Reporting Engine']
  },
  'project-2': {
    title: 'أداة المعالجة والأتمتة المكانية للمخططات الجغرافية',
    company: 'مشاريع شبكات المياه والخدمات البيئية بالرياض',
    period: '2017م - 2021م',
    badge: 'أداة برمجية هندسية',
    liveUrl: null,
    image: null,
    description: 'مجموعة أدوات وسكربتات برمجية مخصصة لتنظيم ومعالجة وتصنيف ملفات المخططات والشبكات الجغرافية وتطابقها مع جداول الحصر.',
    challenges: 'تشابك وضخامة آلاف ملفات المخططات (CAD/KML) وصعوبة فرزها يدوياً للتحقق من أطوال الخطوط ومواقع المناهل والتوصيلات.',
    solution: 'تطوير مسار معالجة مؤتمت يقرأ البيانات الوصفية من ملفات KML/KMZ ويطابقها مع جداول Excel وقواعد البيانات الجغرافية بدقة فائقة.',
    results: [
      'توفير مئات الساعات من الفرز والتدقيق اليدوي.',
      'استخراج تقارير حصر دقيقة ومطابقة بنسبة 100% بين المخططات والواقع.',
      'تنظيم وأرشفة آلاف الملفات المكانية وتسهيل استعراضها للمهندسين.'
    ],
    tech: ['GIS Layers', 'KML / KMZ Parsing', 'Spatial Scripting', 'AutoCAD Data Integration']
  }
};

function initModals() {
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  
  if (!modal) return;
  
  function openProjectModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;
    
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-company').innerText = data.company;
    document.getElementById('modal-period').innerText = data.period;
    document.getElementById('modal-badge').innerText = data.badge;
    document.getElementById('modal-description').innerText = data.description;
    document.getElementById('modal-challenges').innerText = data.challenges;
    document.getElementById('modal-solution').innerText = data.solution;
    
    // Handle Screenshot Image in Modal
    const modalImageContainer = document.getElementById('modal-image-container');
    if (modalImageContainer) {
      if (data.image) {
        modalImageContainer.innerHTML = `
          <div class="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
            <img src="${data.image}" alt="${data.title}" class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" onclick="window.open('${data.image}', '_blank')">
            <div class="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-center text-[11px] text-slate-500 dark:text-slate-400">
              <i class="fa-solid fa-magnifying-glass-plus"></i> انقر على الصورة لفتحها بالحجم الكامل
            </div>
          </div>
        `;
        modalImageContainer.classList.remove('hidden');
      } else {
        modalImageContainer.innerHTML = '';
        modalImageContainer.classList.add('hidden');
      }
    }

    // Handle Live URL Action Button in Modal
    const liveLinkContainer = document.getElementById('modal-live-link');
    if (liveLinkContainer) {
      let buttonsHtml = '';
      if (data.liveUrl) {
        buttonsHtml += `
          <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition-all">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <span>زيارة الموقع الحي وتجربته</span>
          </a>
        `;
      }
      if (data.youtubeUrl) {
        buttonsHtml += `
          <a href="${data.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/25 transition-all">
            <i class="fa-brands fa-youtube"></i>
            <span>قناة اليوتيوب التعليمية</span>
          </a>
        `;
      }
      if (data.tiktokUrl) {
        buttonsHtml += `
          <a href="${data.tiktokUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 text-white hover:bg-black text-xs font-bold shadow-md transition-all">
            <i class="fa-brands fa-tiktok"></i>
            <span>صفحة تيك توك (@naqlasd)</span>
          </a>
        `;
      }
      if (!data.liveUrl && data.image) {
        buttonsHtml += `
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
            <i class="fa-solid fa-chart-line text-blue-500"></i>
            <span>لوحة معلومات تنفيذية خاصة بمشاريع شركة المياه الوطنية</span>
          </div>
        `;
      }
      
      if (buttonsHtml) {
        liveLinkContainer.innerHTML = `<div class="flex flex-wrap items-center gap-2">${buttonsHtml}</div>`;
        liveLinkContainer.classList.remove('hidden');
      } else {
        liveLinkContainer.innerHTML = '';
        liveLinkContainer.classList.add('hidden');
      }
    }

    const resultsContainer = document.getElementById('modal-results');
    resultsContainer.innerHTML = '';
    data.results.forEach(res => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2 text-slate-700 dark:text-slate-300';
      li.innerHTML = `<span class="text-emerald-500 font-bold mt-1">✓</span> <span>${res}</span>`;
      resultsContainer.appendChild(li);
    });
    
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
      span.innerText = t;
      techContainer.appendChild(span);
    });
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
  
  document.querySelectorAll('.open-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      openProjectModal(projectId);
    });
  });
  
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ============================================================
   6. Copy to Clipboard Functionality
   ============================================================ */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('تم النسخ إلى الحافظة بنجاح: ' + textToCopy);
      }).catch(err => {
        showToast('حدث خطأ أثناء النسخ', true);
      });
    });
  });
}

/* ============================================================
   7. Toast Notification System
   ============================================================ */
function showToast(message, isError = false) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 start-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-3 transition-all duration-300 transform opacity-0 translate-y-4';
    document.body.appendChild(toast);
  }
  
  toast.className = `fixed bottom-6 start-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-3 transition-all duration-300 transform ${
    isError 
      ? 'bg-rose-600 text-white shadow-rose-500/30' 
      : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-blue-500/20'
  }`;
  
  toast.innerHTML = `
    <svg class="w-5 h-5 ${isError ? 'text-white' : 'text-emerald-400 dark:text-emerald-600'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${isError ? 'M6 18L18 6M6 6l12 12' : 'M5 13l4 4L19 7'}"/>
    </svg>
    <span>${message}</span>
  `;
  
  setTimeout(() => {
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
  }, 3500);
}

/* ============================================================
   8. Interactive Contact Form Handler
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    
    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      showToast('يرجى تعبئة جميع الحقول المطلوبة', true);
      return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ms-1 me-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      جاري الإرسال...
    `;
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('شكراً لتواصلك يا ' + nameInput.value + '! تم استلام رسالتك بنجاح.');
    }, 1200);
  });
}
