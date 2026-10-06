export const site = {
  name: 'Wiridlangit Jiwangga',
  tagline: 'Portfolio',
  url: 'https://wiridlangit.github.io/portfolio',
  locale: 'en_US',
  themeColor: '#080b0a',
};

export const contact = {
  email: 'wiridlangit@gmail.com',
  location: 'Jakarta, Indonesia',
  formEndpoint: 'https://formsubmit.co/wiridlangit@gmail.com',
};

export const resume = {
  path: '/assets/CV_Wiridlangit_Web_Version.pdf',
  fileName: 'Best_CV_in_the_world.pdf',
};

export const socials = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: '/in/wiridlangit',
    href: 'https://www.linkedin.com/in/wiridlangit',
    icon: 'ri-linkedin-fill',
    accent: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: '@wiridlangit',
    href: 'https://github.com/wiridlangit',
    icon: 'ri-github-fill',
  },
  {
    id: 'email',
    label: 'Email',
    handle: contact.email,
    href: `mailto:${contact.email}`,
    icon: 'ri-mail-send-line',
  },
];

export const navLinks = [
  { id: 'home', label: 'home', command: 'cd ~' },
  { id: 'about', label: 'about', command: 'cat about.md' },
  { id: 'experience', label: 'experience', command: 'git log --oneline' },
  { id: 'projects', label: 'projects', command: 'ls projects/' },
  { id: 'certificates', label: 'certificates', command: 'ls certificates/' },
  { id: 'contact', label: 'contact', command: './say-hello.sh' },
];
