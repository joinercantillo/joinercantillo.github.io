import { useEffect, useState } from 'react';
import { contact, education, experience, navigation, projects, skillGroups } from './data';
import { getTranslations, type Locale } from './translations';

type IconName = 'arrow' | 'github' | 'linkedin' | 'mail' | 'pin' | 'phone' | 'sun' | 'moon' | 'menu' | 'close' | 'check';

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" /></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.72 2.04Z" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
  };
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const [locale, setLocale] = useState<Locale>(() => window.localStorage.getItem('joiner-locale') === 'es' ? 'es' : 'en');
  const [profilePhotoFailed, setProfilePhotoFailed] = useState(false);
  const copy = getTranslations(locale);
  const profilePhotoUrl = profilePhotoFailed ? null : `${import.meta.env.BASE_URL}assets/images/profile.png`;

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('joiner-theme');
    if (storedTheme === 'light') setLightTheme(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = lightTheme ? 'light' : 'dark';
    window.localStorage.setItem('joiner-theme', lightTheme ? 'light' : 'dark');
  }, [lightTheme]);

  useEffect(() => {
    const languageCode = locale === 'en' ? 'en' : 'es';
    document.documentElement.lang = languageCode;
    document.title = copy.pageTitle;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', copy.pageDescription);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', copy.pageTitle);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', copy.openGraphDescription);
    document.querySelector<HTMLMetaElement>('meta[property="og:locale"]')?.setAttribute('content', locale === 'en' ? 'en_US' : 'es_CO');
    window.localStorage.setItem('joiner-locale', locale);
  }, [copy, locale]);

  useEffect(() => {
    const sections = navigation.map(({ href }) => document.querySelector(href)).filter((section): section is Element => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.1, 0.3, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function changeTheme() {
    setLightTheme((current) => !current);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function changeLanguage() {
    setLocale((current) => current === 'en' ? 'es' : 'en');
  }

  return (
    <>
      <a className="skip-link" href="#contenido">{copy.skipToContent}</a>
      <header className="site-header">
        <nav className="nav-shell container" aria-label={copy.navAria}>
          <a className="brand" href="#inicio" aria-label={copy.brandLabel} onClick={closeMenu}>
            JOINER<span>.DEV</span>
          </a>
          <div className={`nav-links${menuOpen ? ' is-open' : ''}`} id="primary-menu">
            {navigation.map(({ href }, index) => (
              <a key={href} href={href} className={activeSection === href.slice(1) ? 'active' : ''} onClick={closeMenu}>
                {copy.nav[index]}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button className="icon-button language-toggle" type="button" onClick={changeLanguage} aria-label={copy.changeLanguage} title={copy.changeLanguage}>
              {locale === 'en' ? 'ES' : 'EN'}
            </button>
            <button className="icon-button theme-toggle" type="button" onClick={changeTheme} aria-label={copy.changeTheme(lightTheme ? copy.themeDark : copy.themeLight)} title={copy.changeTheme(lightTheme ? copy.themeDark : copy.themeLight)}>
              <Icon name={lightTheme ? 'moon' : 'sun'} />
            </button>
            <button className="icon-button menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-menu" aria-label={menuOpen ? copy.menuClose : copy.menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </nav>
      </header>

      <main id="contenido">
        <section className="hero section-anchor" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> {copy.hero.eyebrow}</p>
              <h1>{copy.hero.greeting}<br /><span>Joiner Cantillo.</span></h1>
              <p className="hero-lead">{copy.hero.lead}</p>
              <p className="hero-description">{copy.hero.description}</p>
              <p className="availability"><span className="availability-dot" /> {copy.hero.availability}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#proyectos">{copy.hero.projects} <Icon name="arrow" size={16} /></a>
                <button className="button button-secondary" type="button" onClick={() => window.print()}>{copy.hero.cv} <span className="button-hint">{copy.hero.printHint}</span></button>
                <a className="button button-quiet" href="#contacto">{copy.hero.contact}</a>
              </div>
              <div className="hero-socials" aria-label={copy.hero.socials}>
                <a href={contact.github} target="_blank" rel="noreferrer"><Icon name="github" size={16} /> GitHub <Icon name="arrow" size={13} /></a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" size={16} /> LinkedIn <Icon name="arrow" size={13} /></a>
              </div>
            </div>
            <div className="hero-visual" aria-label={profilePhotoUrl ? copy.hero.portrait : copy.hero.portraitPlaceholder}>
              <div className="portrait-frame">
                <div className="portrait-topline"><span>{copy.hero.profile}</span><span>{copy.hero.location}</span></div>
                {profilePhotoUrl ? (
                  <img className="portrait-photo" src={profilePhotoUrl} alt={copy.hero.portraitAlt} onError={() => setProfilePhotoFailed(true)} />
                ) : (
                  <div className="portrait-placeholder">
                    <span className="portrait-initials">JC</span>
                    <span className="portrait-note">{copy.hero.portraitFallback[0]}<br />{copy.hero.portraitFallback[1]}</span>
                  </div>
                )}
                <div className="portrait-bottomline"><span>{copy.hero.portraitName}</span><span>2025—</span></div>
              </div>
              <div className="code-note note-top"><span>01</span> const <b>curiosity</b> = true;</div>
              <div className="code-note note-bottom"><span>&lt;/&gt;</span> {copy.hero.curiosity}</div>
              <span className="hero-coordinate">10° 58′ N / 74° 47′ W</span>
            </div>
          </div>
          <a className="scroll-cue" href="#sobre-mi"><span /> {copy.hero.scrollCue}</a>
        </section>

        <section className="about section-pad section-anchor" id="sobre-mi">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">{copy.about.eyebrow}</p>
              <h2>{copy.about.title[0]}<span>{copy.about.title[1]}</span></h2>
            </div>
            <div className="about-grid">
              <div className="about-art reveal">
                <img src={`${import.meta.env.BASE_URL}assets/images/about-development.svg`} alt={copy.about.imageAlt} loading="lazy" />
                <div className="art-caption"><span>{copy.about.artCaption}</span><span>Fig. 01</span></div>
              </div>
              <div className="about-content reveal">
                <p className="about-intro">{copy.about.intro}</p>
                {copy.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <div className="philosophy"><span className="philosophy-mark">“</span><p>{copy.about.philosophy}</p></div>
                <div className="strength-list" aria-label={copy.about.strengthsLabel}>
                  {copy.about.strengths.map((strength) => <span key={strength}><Icon name="check" size={14} /> {strength}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="skills section-pad section-anchor" id="tecnologias">
          <div className="container">
            <div className="section-heading section-heading-row reveal">
              <div><p className="eyebrow">{copy.skills.eyebrow}</p><h2>{copy.skills.title[0]}<span>{copy.skills.title[1]}</span></h2></div>
              <p className="section-aside">{copy.skills.aside}</p>
            </div>
            <div className="skill-groups">
              {skillGroups.map((group, groupIndex) => (
                <div className="skill-group reveal" key={group.title}>
                  <h3><span>0{groupIndex + 1}</span> {copy.skills.groups[groupIndex].title}</h3>
                  <div className="skill-grid">
                    {group.skills.map((skill, skillIndex) => {
                      const detail = copy.skills.groups[groupIndex].details[skillIndex];
                      return <a className="skill-card" href={skill.url} target="_blank" rel="noreferrer" aria-label={copy.skills.linkLabel(skill.name, detail)} key={skill.name}>
                        <span className="skill-mark"><img className={`skill-logo${skill.name === 'GitHub' ? ' skill-logo-github' : ''}`} src={`${import.meta.env.BASE_URL}assets/icons/${skill.icon}`} alt="" loading="lazy" /></span>
                        <span className="skill-copy"><b>{skill.name}</b><small>{detail}</small></span>
                        <span className="skill-card-arrow"><Icon name="arrow" size={14} /></span>
                      </a>
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="projects section-pad section-anchor" id="proyectos">
          <div className="container">
            <div className="section-heading section-heading-row reveal">
              <div><p className="eyebrow">{copy.projects.eyebrow}</p><h2>{copy.projects.title[0]}<span>{copy.projects.title[1]}</span></h2></div>
              <p className="section-aside">{copy.projects.aside}</p>
            </div>
            {projects.map((project, index) => (
              <article className="project-card reveal" key={project.title}>
                <div className="project-art">
                  <img src={`${import.meta.env.BASE_URL}${project.image}`} alt={copy.projects.imageAlt} loading="lazy" />
                  <span className="project-art-label">{copy.projects.category}</span>
                </div>
                <div className="project-info">
                  <div className="project-meta"><span>0{index + 1} — {locale === 'en' ? 'IN TRAINING' : 'EN FORMACIÓN'}</span><span>{copy.projects.period}</span></div>
                  <h3>{copy.projects.titleCard}</h3>
                  <p>{copy.projects.description}</p>
                  <div className="tag-list">{project.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-links">
                    {project.repository
                      ? <a href={project.repository} target="_blank" rel="noreferrer">{copy.projects.repository} <Icon name="arrow" size={15} /></a>
                      : <span>{copy.projects.repositoryPending}</span>}
                    {project.demo
                      ? <a href={project.demo} target="_blank" rel="noreferrer">{copy.projects.demo} <Icon name="arrow" size={15} /></a>
                      : <span>{copy.projects.noDemo}</span>}
                  </div>
                </div>
              </article>
            ))}
            <p className="project-footnote"><span className="small-dot" /> {copy.projects.footnote}</p>
          </div>
        </section>

        <section className="experience section-pad section-anchor" id="experiencia">
          <div className="container">
            <div className="section-heading section-heading-row reveal">
              <div><p className="eyebrow">{copy.experience.eyebrow}</p><h2>{copy.experience.title[0]}<span>{copy.experience.title[1]}</span></h2></div>
              <p className="section-aside">{copy.experience.aside}</p>
            </div>
            <div className="timeline">
              {experience.map((item, index) => (
                <article className="timeline-item reveal" key={item.company}>
                  <div className="timeline-index"><span>0{index + 1}</span><i /></div>
                  <div className="timeline-card">
                    <div className="timeline-heading"><div><h3>{copy.experience.roles[index].role}</h3><p>{item.company} <span>·</span> {item.place}</p></div><time>{copy.experience.roles[index].period}</time></div>
                    <ul>{copy.experience.roles[index].points.map((point) => <li key={point}>{point}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="education section-pad">
          <div className="container education-grid">
            <div className="section-heading reveal"><p className="eyebrow">{copy.education.eyebrow}</p><h2>{copy.education.title[0]}<span>{copy.education.title[1]}</span></h2><p className="section-aside">{copy.education.aside}</p></div>
            <div className="education-list">
              {education.map((item, index) => (
                <article className={`education-item reveal${item.current ? ' is-current' : ''}`} key={item.credential}>
                  <span className="education-year">0{index + 1}</span>
                  <div><h3>{copy.education.items[index].credential}</h3><p>{item.institution}</p><small>{copy.education.items[index].period}{copy.education.items[index].place && ` · ${copy.education.items[index].place}`}</small></div>
                  {item.current && <span className="current-label"><span className="status-dot" /> {copy.education.current}</span>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="personal section-pad">
          <div className="container personal-grid">
            <div className="section-heading reveal"><p className="eyebrow">{copy.personal.eyebrow}</p><h2>{copy.personal.title[0]}<span>{copy.personal.title[1]}</span></h2></div>
            <div className="personal-list">
              {copy.personal.skills.map(([title, detail], index) => (
                <article className="personal-item reveal" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{detail}</p></div><Icon name="arrow" size={15} /></article>
              ))}
            </div>
          </div>
        </section>

        <section className="languages section-pad">
          <div className="container language-row reveal">
            <div><p className="eyebrow">{copy.languages.eyebrow}</p><h2>{copy.languages.title[0]}<span>{copy.languages.title[1]}</span></h2></div>
            <div className="language-card"><span>ES</span><div><b>{copy.languages.spanish}</b><small>{copy.languages.native}</small></div><span className="language-level">{copy.languages.nativeLevel}</span></div>
            <div className="language-card"><span>EN</span><div><b>{copy.languages.english}</b><small>{copy.languages.basic}</small></div><span className="language-level">B1</span></div>
          </div>
        </section>

        <section className="contact section-pad section-anchor" id="contacto">
          <div className="container contact-grid">
            <div className="contact-copy reveal">
              <p className="eyebrow">{copy.contact.eyebrow}</p>
              <h2>{copy.contact.title[0]}<br /><span>{copy.contact.title[1]}</span></h2>
              <p>{copy.contact.description}</p>
              <a className="button button-primary" href={`mailto:${contact.email}?subject=${encodeURIComponent(copy.contact.emailSubject)}`}>{copy.contact.emailButton} <Icon name="arrow" size={16} /></a>
            </div>
            <div className="contact-details reveal">
              <div className="contact-detail"><span className="detail-icon"><Icon name="pin" /></span><div><small>{copy.contact.locationLabel}</small><p>{copy.contact.location}</p></div></div>
              <div className="contact-detail"><span className="detail-icon"><Icon name="mail" /></span><div><small>{copy.contact.emailLabel}</small><a href={`mailto:${contact.email}`}>{contact.email}</a></div></div>
              <div className="contact-detail"><span className="detail-icon"><Icon name="phone" /></span><div><small>{copy.contact.phoneLabel}</small><a href={`tel:${contact.phone}`}>+57 300 377 1370</a></div></div>
              <div className="contact-socials">
                <a href={contact.github} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub <Icon name="arrow" size={14} /></a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn <Icon name="arrow" size={14} /></a>
                <a href={`https://wa.me/${contact.phone.slice(1)}`} target="_blank" rel="noreferrer"><Icon name="phone" /> {copy.contact.whatsapp} <Icon name="arrow" size={14} /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div><a className="brand" href="#inicio">JOINER<span>.DEV</span></a><p>{copy.footer.tagline[0]}<br />{copy.footer.tagline[1]}</p></div>
          <div className="footer-links"><a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a><a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a><a href={`mailto:${contact.email}`} aria-label={copy.contact.emailLabel}><Icon name="mail" /></a></div>
          <a className="back-top" href="#inicio">{copy.footer.backToTop} <Icon name="arrow" size={14} /></a>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Joiner David Cantillo Camargo</span><span>Barranquilla, Colombia <i>·</i> {copy.footer.signoff}</span></div>
      </footer>
    </>
  );
}

export default App;
