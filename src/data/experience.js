// Timeline order: most recent first.
// kind: 'work' | 'organization' | 'education'

export const experience = [
  {
    id: 1,
    kind: 'work',
    role: 'Product Development Specialist',
    org: "The Brink's Company",
    period: 'October 2025 — Present',
    location: 'Jakarta, Indonesia',
    summary:
      'Automating staging workflows in Linux and developing cash management products alongside bank clients.',
    points: [
      'Developed Bash automation scripts in Linux environments to automate the staging workflows, including machine configuration and software setup.',
      'Conducted CDM product development with bank clients, including process flow design, SIT/UAT execution, troubleshooting, and technical documentation.',
      'Diagnosed and repaired 10+ STM32-based I/O boards, restoring board functionality and reducing the need for costly hardware replacement.',
    ],
    tags: ['Product Management', 'Linux', 'Automation', 'Bash', 'SIT/UAT'],
  },
  {
    id: 2,
    kind: 'work',
    role: 'System Development Intern',
    org: 'Bank Negara Indonesia',
    period: 'September 2024 — December 2024',
    location: 'Jakarta, Indonesia',
    summary:
      'Built internal digital tooling that put operational data and company policies in reach of employees.',
    points: [
      'Developed internal digital solutions, including a Streamlit dashboard and AI chatbot, to improve employee access to operational data and company policies.',
      'Analyzed user and business requirements and translated them into functional solutions in collaboration with stakeholders.',
    ],
    tags: ['Streamlit', 'AI Chatbot', 'Python', 'Digital Solutions'],
  },
  {
    id: 3,
    kind: 'work',
    role: 'Android Developer Intern',
    org: 'Jakarta Smart City',
    period: 'July 2024 — August 2024',
    location: 'Jakarta, Indonesia',
    summary:
      'Mapped how a city-services platform actually worked, then rebuilt it as a native Android app.',
    points: [
      'Analyzed the JAKI application workflow and designed system flowcharts to map user interactions, report submission, and internal processing.',
      'Developed an Android mobile application using Kotlin, transforming an existing web-based system into a mobile platform.',
    ],
    tags: ['Kotlin', 'Android', 'System Design', 'Smart City'],
  },
  {
    id: 4,
    kind: 'organization',
    role: 'Head of Media and Information',
    org: 'IT ITS Student Association (HMIT ITS)',
    period: 'March 2024 — February 2025',
    location: 'Surabaya, Indonesia',
    summary:
      'Ran the communications side of the student association - branding, content, and a team that delivered it.',
    points: [
      'Led a team in managing social media strategy and organizational branding through structured content planning and visual communication design.',
      'Ensured timely and accurate information delivery to internal and external stakeholders, improving communication effectiveness and engagement.',
    ],
    tags: ['Graphic Design','Branding', 'Social Media', 'Team Leadership', 'Content Strategy'],
  },
  {
    id: 5,
    kind: 'education',
    role: 'Bachelor of Information Technology',
    org: 'Institut Teknologi Sepuluh Nopember (ITS)',
    period: '2021 - 2025',
    location: 'Surabaya, Indonesia',
    summary: 'Graduated with a GPA of 3.74 / 4.00, with large interest in IoT and data-driven systems.',
    points: [
      'Coursework and capstone work centred on intelligent systems and embedded deployment.',
    ],
    tags: ['GPA 3.74', 'Information Technology'],
  },
];
