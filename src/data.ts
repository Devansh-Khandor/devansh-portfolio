export interface PersonalInfo {
  name: string;
  tagline: string;
  profileImage: string;
  subtitle: string;
  education: string;
  socialLinks: {
    github: string;
    linkedin: string;
    leetcode: string;
    email: string;
    whatsapp: string;
    resume: string;
  };
  about: string[];
  technologies: string;
}

export interface ResumeItem {
  text: string;
  link: string;
  title: string;
}

export interface Project {
  title: string;
  img: string;
  description: string[];
  techStack: string[];
  link: string;
}

export interface Experience {
  companyName: string;
  position: string;
  techStack: string[];
  duration: string;
  workDone: string[];
}

export interface AchievementNote {
  id: string;
  title: string;
  preview: string;
  image: string;
  achievementTitle: string;
  content: string[];
  date: string;
  link?: string;
}

export interface CertificateNote {
  id: string;
  title: string;          // left-list title
  preview: string;        // short preview under the title
  image?: string;         // absolute path recommended: "/images/certificates/<file>.png"
  achievementTitle: string; // big heading on the right (keep same key name)
  content: string[];      // paragraphs/bullets
  date: string;           // e.g., "Mar 2025"
  link?: string;          // optional external URL (Credly, etc.)
}

const personalInfo: PersonalInfo = {
  name: "Devansh Khandor",
  tagline: "I like to build software that solves real problems 🚀💻🎯",
  profileImage: "/images/profilePic.png",
  subtitle: "Software Developer",
  education: "B.Tech Computer Engineering",
  socialLinks: {
    github: "https://github.com/Devansh-Khandor",
    linkedin: "https://www.linkedin.com/in/devansh-khandor-163827261/",
    leetcode: "https://leetcode.com/u/DevanshKhandor/",
    email: "mailto:devanshkhandor1234@gmail.com",
    whatsapp: "https://wa.me/919326077565",
    resume:
      "https://drive.google.com/file/d/1jeum157cYFCYOXY35kOGQfsYFKJBBCzd/view?usp=sharing",
  },
  about: [
    "I'm a passionate software engineer.",
    "I love building innovative solutions that solve real-world problems and have a proven track record of delivering impactful projects.",
    "My experience spans across various technologies and I'm always eager to learn new technologies and tackle challenging problems.",
  ],
  technologies:
    "I work with a wide range of technologies including Java, Python, C, JavaScript, Node.js, PostgreSQL, and many more. I'm particularly interested in software development, AI/ML applications, and building scalable web applications.",
};

const projects: Project[] = [
  {
    title: "International Cricket Network - ICN360",
    img: "icn_logo.png",
    description: [
      "Cricket media platform covering world, USA and Indian cricket with news, features and blogs.",
      "Includes live game broadcasting/analysis, player interviews, podcasts and video content.",
      "Structured archives with categories and tags for quick discovery.",
      "SEO-friendly article pages, share cards, and fast, responsive UX."
    ],
    techStack: ["WordPress", "Media Technologies"],
    link: "https://icn360.com/",
  },
  {
    title: "Navixar",
    img: "Navixar_logo.png", 
    description: [
      "A resale value predictor of laptops using machine learning models served with Flask.",
      "Captures brand, hardware specs, and condition signals (battery, scratches, heating, warranty) for better estimates.",
      "Deployed on Koyeb for fast, zero-ops hosting."
    ],
    techStack: ["Python", "Flask", "Pandas", "NumPy", "scikit-learn"],
    link: "https://navixar.koyeb.app/"
  },
  {
    title: "Online Reputation Management for K.J. Somaiya College of Engineering",
    img: "ORM.jpg", 
    description: [
      "A one-stop Online Reputation Management System adopted by the digital team of K.J.Somaiya College of Engineering to centralize monitoring of online comments and reviews across various platforms.",
      "Enabled the digital team to quickly identify negative feedback and respond proactively, while also spotlighting positive remarks to drive continuous improvement in college’s online presence.",
      "Automated data extraction, implemented sentiment analysis and delivered a reporting and visualization tool to analyze and manage online reputation."
    ],
    techStack: ["TypeScript", "Python", "Pandas", "NumPy", "JavaScript", "CSS", "Matplotlib"],
    link: ""
  },  
  {
    title: "Email Outreach Automation",
    img: "email.jpg", 
    description: [
      "Automates personalized email outreach at scale and handles responses end-to-end.",
      "Rotates sender accounts and adds randomized delays to lower spam risk.",
      "Monitors inbox via IMAP, parses replies (regex) to extract contacts, and updates an Excel dataset.",
      "Sends targeted follow-ups to engaged recipients."
    ],
    techStack: ["Python", "pandas", "OpenPyXL", "SMTP", "IMAP"],
    link: "https://github.com/Devansh-Khandor/Email-Outreach-Automation-Response-Handling-using-Python"
  },
  {
    title: "Somaiya Portal",
    img: "somaiya-portal.png", 
    description: [
      "A user-centric college portal to fully digitize campus operations, enabling streamlined payment and bookings for various facilities, including canteen, library, sports courts, etc.",
      "Integrated core modules for mock payments, bookings and user authentication- implemented secure session management, backend logic, and dynamic front-end forms to support facility reservations and online transactions.",
    ],
    techStack: ["PHP", "HTML", "CSS", "JavaScript"],
    link: "https://github.com/Devansh-Khandor/SomaiyaPortal_MiniProject"
  },
  {
    title: "Portfolio",
    img: "portfolio.png", 
    description: [
      "Interactive macOS-style portfolio with windows for Notes, Projects and a plain view.",
      "Integrated WakaTime, GitHub, LeetCode and Certificates sections; content is driven by TypeScript config.",
      "Built with React + TypeScript + Vite and CSS Modules; responsive & lazy loaded.",
      "Deployed on Vercel at devansh-khandor.in."
    ],
    techStack: ["TypeScript", "React", "Vite", "CSS Modules", "Vercel"],
    link: "https://www.devansh-khandor.in/"
  },        
  // {
  //   title: "ThreeDrive",
  //   img: "threedrive.jpeg",
  //   description: [
  //     "A decentralized Google Drive-like filesystem powered by the Walrus protocol.",
  //     "Provides intuitive nested folders, real-time collaboration, and SDK integration.",
  //     "🏅 Earned an Honorable Mention in the Walrus Protocol track at ETHIndia 2024.",
  //     "🏆 Won the Quadratic Voting prize pool share at ETHIndia 2024.",
  //   ],
  //   techStack: [
  //     "npm",
  //     "WebSockets",
  //     "Python",
  //     "Express.js",
  //     "FastAPI",
  //     "Node.js",
  //     "Next.js",
  //     "Walrus",
  //   ],
  //   link: "https://devfolio.co/projects/threedrive-0f13",
  // },
  // {
  //   title: "OpenFund",
  //   img: "openfund.png",
  //   description: [
  //     "Empowering open source innovation with crypto rewards—bridging contributions and incentives seamlessly through our AI driven GitHub bot.",
  //     "Built at Unfold 2024, it won “Best Agentic Project” from Nethermind plus 2 other prizes.",
  //     "Solves contributor burnout by incentivizing meaningful open source work via automated crypto rewards.",
  //   ],
  //   techStack: [
  //     "Express.js",
  //     "React.js",
  //     "Polygon (Matic)",
  //     "BASE",
  //     "okto",
  //     "BAML",
  //   ],
  //   link: "https://devfolio.co/projects/openfund-8ef2",
  // },
  // {
  //   title: "3-Transform",
  //   img: "3-transform.webp",
  //   description: [
  //     "This International hackathon winning project empowers beginners with hands-on learning for smart contract integration, and aids enterprises in efficient web3 adoption.",
  //     "This is the Winner project in EthIndia 2023, World's biggest Ethereum hackathon.",
  //     "It also won 3 track prizes in EthIndia 2023, namely Filecoin, Okto and Scroll.",
  //   ],
  //   techStack: ["React", "Solidity", "Firebase", "Polygon"],
  //   link: "https://devfolio.co/projects/transform-014b",
  // },
  // {
  //   title: "Dhanush",
  //   img: "dhanush.png",
  //   description: [
  //     "Developed a fund trail analysis tool for detecting cyber crime and won Kavach 2023 and the project is now going to be integrated into current systems by the government of India.",
  //     "This is Kavach national Government hackathon 2023 winner project.",
  //   ],
  //   techStack: ["React", "Django", "Express", "MongoDB"],
  //   link: "https://www.youtube.com/watch?v=PQmar1DG5eI",
  // },
  // {
  //   title: "Three Bricks",
  //   img: "threeBricks.png",
  //   description: [
  //     "Streamlined property transactions using Polygon and NFTs, enhancing transparency, security, and ownership transfers while leveraging blockchain technology and Polygon's scalability to reduce intermediaries and enable direct ownership through NFTs.",
  //   ],
  //   techStack: ["React", "Solidity", "Firebase", "Polygon"],
  //   link: "https://github.com/team-somehow/3-bricks",
  // },
  // {
  //   title: "Pointer Aid",
  //   img: "pointerAid.jpeg",
  //   description: [
  //     "Empowering students with efficient studying by estimating required marks for desired pointers, optimizing academic performance.",
  //     "Popular app with 10K+ views and 1.2K+ active users, enhancing student learning experience and addressing study needs effectively.",
  //   ],
  //   techStack: ["React"],
  //   link: "https://pointer-aid.pettiboy.com/",
  // },
  // {
  //   title: "Three Money",
  //   img: "threeMoney.jpeg",
  //   description: [
  //     "Building a fair credit score system for decentralized bank, reducing loan default risk and promoting financial inclusion, and creating a transparent and unbiased evaluation mechanism for fair loan access.",
  //   ],
  //   techStack: ["React", "Solidity", "Firebase", "Polygon"],
  //   link: "https://github.com/team-somehow/three-money",
  // },
  // {
  //   title: "Any Kode",
  //   img: "anyKode.png",
  //   description: [
  //     "Empowering developers with in-app code debugging and testing, and offering a diverse range of coding problems and a customizable keyboard for an enhanced coding experience",
  //   ],
  //   techStack: ["React Native"],
  //   link: "https://github.com/team-somehow/code-somehow",
  // },
  // {
  //   title: "Three Chain",
  //   img: "threeChain.jpeg",
  //   description: [
  //     "Ensures secure goods transfer, transparent logistics, and efficient inventory management through escrow service, ERC721 tokens, and Aadhar QR KYC verification.",
  //   ],
  //   techStack: ["Solidity", "React", "Firebase"],
  //   link: "https://github.com/team-somehow/three-chain",
  // },
  // {
  //   title: "Placement Predictor",
  //   img: "placementPredictor.jpeg",
  //   description: [
  //     "Developed an accurate placement prediction model and integrated it into a Flask app for seamless input and predictions.",
  //   ],
  //   techStack: ["Python", "Flask", "Scikit-learn"],
  //   link: "https://github.com/Arya-A-Nair/PlacementPredictor",
  // },
  // {
  //   title: "Mail Project",
  //   img: "mailProject.jpeg",
  //   description: [
  //     "Developed an internal mailing system with Django+React, providing comprehensive email management features for seamless communication",
  //   ],
  //   techStack: ["React", "Django"],
  //   link: "https://github.com/Arya-A-Nair/MAIL-PROJECT",
  // },
  // {
  //   title: "Team Manager",
  //   img: "teamManager.jpeg",
  //   description: [
  //     "Developed a full-stack team management app with unique team codes, facilitating seamless task assignment and prioritization for enhanced collaboration.",
  //   ],
  //   techStack: ["React", "Django"],
  //   link: "https://github.com/Arya-A-Nair/Team-Manager",
  // },
];

const experience: Experience[] = [
  {
    companyName: "International Cricket Network - ICN360",
    position: "Co-founder, Chief Technical Officer",
    techStack: [
      "WordPress",
      "Media Technologies",
    ],
    duration: "Aug 2018 - Present",
    workDone: [
      "Developing and maintaining our website, with daily updates to boost content engagement, and social media handling for the company across multiple social media platforms",
      "Securing media rights for the India vs. West Indies cricket series in Florida in 2019",
      "Successful in interviewing some greats of the game like Alan Wilkins, Simon Katich, Luke Ronchi and Tino Best",
      "Built a strong online presence with over 27000 followers on Facebook and over 12000 followers on Instagram",
    ],
  },
  {
    companyName: "Animeta",
    position: "AI/ML Intern",
    techStack: ["Python", "RAG", "LLMs", "Elasticsearch", "Kibana"],
    duration: "Jan 2025 - Apr 2025",
    workDone: [
      "Engineered a sales email automation system, enabling targeted outreach to over 60000 creators, integrating response processing and data management",
      "Researched AI methodologies and developed an AI-powered pipeline to automate and optimize short-form social media content creation by integrating AI tools",
      "Designed and initiated the development of a Retrieval-Augmented Generation chatbot for Animeta Brandstar",
      "Explored sentiment classification of influencer Instagram comments using manually labeled datasets; evaluated emoji handling and slang interpretation",
    ],
  },
  {
    companyName: "Kinara Capital",
    position: "Technology Summer Intern",
    techStack: ["Gupshup", "JavaScript", "Node.js", "Postman"],
    duration: "May 2024 - Aug 2024",
    workDone: [
      "Developed and implemented chatbots to enhance user experience by automating responses on WhatsApp and the company's website, resulting in a 40% reduction in response time",
      "Created a chatbot dedicated to quickly assess customer eligibility for collateral-free business loans, providing results within a minute and improving lead conversion",
      "Built another chatbot to service existing customers, address their needs, and respond to new customer queries about company policies and other information, leading to an increase in customer satisfaction",
    ],
  },
];

const achievementNotes: AchievementNote[] = [
  {
    id: "achievement-1",
    title: "ETHIndia 2023 Winner",
    preview: "Winner of ETHIndia 2023 + 3 track prizes",
    image: "ethindia-2023.jpeg",
    achievementTitle: "ETHIndia 2023 - 3Transform",
    content: [
      "Empowers beginners with hands-on smart contract integration.",
      "Helps enterprises adopt Web3 efficiently.",
      "🏆 Winner of ETHIndia 2023, the world's biggest Ethereum hackathon.",
      "🏅 Won 3 track prizes - Filecoin, Okto, and Scroll.",
    ],
    date: "December 2023",
    link: "https://devfolio.co/projects/transform-014b",
  },
  {
    id: "achievement-2",
    title: "Kavach 2023 Winner",
    preview: "Government integration of crime detection tool",
    image: "kavach-2023.jpeg",
    achievementTitle: "Kavach 2023 - FundTrail",
    content: [
      "Developed a fund trail analysis tool to detect cybercrime.",
      "Winner of Kavach 2023, a national-level government hackathon.",
      "Project selected for integration into current government systems.",
    ],
    date: "August 2023",
    link: "https://www.youtube.com/watch?v=PQmar1DG5eI",
  },
  {
    id: "achievement-3",
    title: "ETHIndia 2024 Honoree",
    preview: "Quadratic prize winner + Honorable mention",
    image: "ethindia-2024.jpeg",
    achievementTitle: "ETHIndia 2024 - ThreeDrive",
    content: [
      "A decentralized Google Drive-like filesystem powered by the Walrus protocol.",
      "Provides intuitive nested folders, real-time collaboration, and SDK integration.",
      "🏅 Honorable Mention in Walrus Protocol track.",
      "🏆 Won share of Quadratic Voting prize pool.",
    ],
    date: "December 2024",
    link: "https://devfolio.co/projects/threedrive-0f13",
  },
  {
    id: "achievement-4",
    title: "Unfold 2024 - Best Agentic Project",
    preview: "Crypto-reward GitHub bot wins 3 prizes",
    image: "unfold-2024.jpeg",
    achievementTitle: "Unfold 2024 - OpenFund",
    content: [
      "Empowering open source innovation with crypto rewards.",
      "AI-driven GitHub bot bridges contributions and incentives.",
      "🏅 Won 'Best Agentic Project' from Nethermind and 2 other prizes.",
      "Tackles contributor burnout with automated crypto rewards.",
    ],
    date: "December 2024",
    link: "https://devfolio.co/projects/openfund-8ef2",
  },
  {
    id: "achievement-5",
    title: "Prakalp 2025 Winner",
    preview: "Best software project for Parity Protocol",
    image: "prakalp-2025.jpeg",
    achievementTitle: "Prakalp 2025 - Parity Protocol",
    content: [
      "National-level project presentation competition.",
      "Won best software project for presenting Parity Protocol - an open-source decentralized compute platform.",
    ],
    date: "April 2025",
  },
  {
    id: "achievement-6",
    title: "JPMC Secure Code Warrior - 2nd Place",
    preview: "Ranked 2nd among interns across India & Singapore",
    image: "jpmc-2024.png",
    achievementTitle: "Secure Code Warrior 2024",
    content: [
      "Internal CTF-style cybersecurity contest by JPMC.",
      "Involved solving real-world hacking challenges and quizzes.",
      "🏅 Secured 2nd place across all interns in India + Singapore.",
    ],
    date: "July 2024",
  },
  {
    id: "achievement-7",
    title: "Hackerstellar Blockchain 2023 Winner",
    preview: "Escrow + logistics dApp with KYC verification",
    image: "hackerstellar-2023.jpeg",
    achievementTitle: "Hackerstellar - ThreeChain",
    content: [
      "Secured goods transfer with ERC721 tokens and escrow service.",
      "Integrated logistics transparency and Aadhaar QR-based KYC.",
    ],
    date: "April 2023",
    link: "https://devfolio.co/projects/three-chain-97b3",
  },
  {
    id: "achievement-8",
    title: "BitnBuild 2023 Winner",
    preview: "Tokenized real estate using Polygon",
    image: "bitnbuild-2023.jpeg",
    achievementTitle: "BitnBuild - Bricks",
    content: [
      "Streamlined property transactions using NFTs on Polygon.",
      "Improved transparency and security with blockchain tech.",
    ],
    date: "January 2023",
    link: "https://devfolio.co/projects/bricks-731e",
  },
  {
    id: "achievement-9",
    title: "X-Tract Datathon - 3rd Place",
    preview: "Ranked 3rd in ML + data cleaning competition",
    image: "xtract-2022.jpeg",
    achievementTitle: "X-Tract 2022 Datathon",
    content: [
      "Solved end-to-end challenges using data cleaning & ML models.",
      "Ranked 3rd overall by solving full trail with accurate predictions.",
    ],
    date: "March 2022",
  },
  {
    id: "achievement-10",
    title: "Bid by Bit 2022 Champion",
    preview: "DSA-based gamified contest win",
    image: "",
    achievementTitle: "Bid by Bit 2022",
    content: [
      "State-level competitive programming contest.",
      "Used DSA to earn points and unlock new problem sets.",
    ],
    date: "November 2022",
  },
];

const certificateNotes: CertificateNote[] = [
  {
    id: "certificate-1",
    title: "Natural Language Processing with Classification and Vector Spaces",
    preview: "DeepLearning.AI",
    image: "/images/certificates/cert1.jpg",
    achievementTitle: "Natural Language Processing with Classification and Vector Spaces",
    content: [
      "Offered by: DeepLearning.AI",
    ],
    date: "Apr 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/53GSN11206AG",
  },
  {
    id: "certificate-2",
    title: "Natural Language Processing with Probabilistic Models",
    preview: "DeepLearning.AI",
    image: "/images/certificates/cert2.jpg",
    achievementTitle: "Natural Language Processing with Probabilistic Models",
    content: [
      "Offered by: DeepLearning.AI",
    ],
    date: "Apr 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/ER4E6QLBRAU4",
  },
  {
    id: "certificate-3",
    title: "Natural Language Processing with Sequence Models",
    preview: "DeepLearning.AI",
    image: "/images/certificates/cert3.jpg",
    achievementTitle: "Natural Language Processing with Sequence Models",
    content: [
      "Offered by: DeepLearning.AI",
    ],
    date: "Apr 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/BG78L8YIAYJL",
  },
  {
    id: "certificate-4",
    title: "Probability & Statistics for Machine Learning & Data Science",
    preview: "DeepLearning.AI",
    image: "/images/certificates/cert4.jpg",
    achievementTitle: "Probability & Statistics for Machine Learning & Data Science",
    content: [
      "Offered by: DeepLearning.AI",
    ],
    date: "Apr 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/GWDEORPHSGGB",
  },
  {
    id: "certificate-5",
    title: "Supervised Machine Learning: Regression and Classification",
    preview: "Stanford|Online & DeepLearning.AI",
    image: "/images/certificates/cert5.jpg",
    achievementTitle: "Supervised Machine Learning: Regression and Classification",
    content: [
      "Offered by: Stanford|Online & DeepLearning.AI",
    ],
    date: "Nov 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/OSDT9BITYN7T",
  },
  {
    id: "certificate-6",
    title: "Start the UX Design Process: Empathize, Define, and Ideate",
    preview: "Google",
    image: "/images/certificates/cert6.jpg",
    achievementTitle: "Start the UX Design Process: Empathize, Define, and Ideate",
    content: [
      "Google",
    ],
    date: "Oct 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/4ICC12YROBID",
  },
  {
    id: "certificate-7",
    title: "Advanced Data Structures in Java",
    preview: "UC San Diego",
    image: "/images/certificates/cert7.jpg",
    achievementTitle: "Advanced Data Structures in Java",
    content: [
      "UC San Diego",
    ],
    date: "Nov 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/RWFVCJDZWUS4",
  },
  {
    id: "certificate-8",
    title: "Inheritance and Data Structures in Java",
    preview: "University of Pennsylvania",
    image: "/images/certificates/cert8.jpg",
    achievementTitle: "Inheritance and Data Structures in Java",
    content: [
      "University of Pennsylvania",
    ],
    date: "Nov 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/8VSYQZ4XR9M3",
  },
  {
    id: "certificate-9",
    title: "Introduction to Python Programming",
    preview: "University of Pennsylvania",
    image: "/images/certificates/cert9.jpg",
    achievementTitle: "Introduction to Python Programming",
    content: [
      "University of Pennsylvania",
    ],
    date: "Nov 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/MXGMWS6BBDXY",
  },
  {
    id: "certificate-10",
    title: "Databases and SQL for Data Science with Python",
    preview: "IBM",
    image: "/images/certificates/cert10.jpg",
    achievementTitle: "Databases and SQL for Data Science with Python",
    content: [
      "IBM",
    ],
    date: "Apr 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/YKTL5F7LTNXF",
  },
  {
    id: "certificate-11",
    title: "Python for Data Science, AI & Development",
    preview: "IBM",
    image: "/images/certificates/cert11.jpg",
    achievementTitle: "Python for Data Science, AI & Development",
    content: [
      "IBM",
    ],
    date: "Apr 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/K4DYLJNUDGZM",
  },
  {
    id: "certificate-12",
    title: "Python Project for Data Science",
    preview: "IBM",
    image: "/images/certificates/cert12.jpg",
    achievementTitle: "Python Project for Data Science",
    content: [
      "IBM",
    ],
    date: "Apr 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/34W8CKXUV657",
  },
  {
    id: "certificate-13",
    title: "Applied Data Science Capstone",
    preview: "IBM",
    image: "/images/certificates/cert13.jpg",
    achievementTitle: "Applied Data Science Capstone",
    content: [
      "IBM",
    ],
    date: "Apr 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/Z7DLMRZDN2U4",
  },
  {
    id: "certificate-14",
    title: "Excel Basics for Data Analysis",
    preview: "IBM",
    image: "/images/certificates/cert14.jpg",
    achievementTitle: "Excel Basics for Data Analysis",
    content: [
      "IBM",
    ],
    date: "Oct 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/9ETPKB8M1VA8",
  },
  {
    id: "certificate-15",
    title: "Everyday Excel, Part 1",
    preview: "University of Colorado Boulder",
    image: "/images/certificates/cert15.jpg",
    achievementTitle: "Everyday Excel, Part 1",
    content: [
      "University of Colorado Boulder",
    ],
    date: "Oct 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/MJFRI5T8KCQC",
  },
  {
    id: "certificate-16",
    title: "Introduction to Blockchain Technologies",
    preview: "INSEAD",
    image: "/images/certificates/cert16.jpg",
    achievementTitle: "Introduction to Blockchain Technologies",
    content: [
      "INSEAD",
    ],
    date: "Oct 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/3YBYUALBWULK",
  },
  {
    id: "certificate-17",
    title: "Introduction to Blockchain for Global Commerce",
    preview: "INSEAD",
    image: "/images/certificates/cert17.jpg",
    achievementTitle: "Introduction to Blockchain for Global Commerce",
    content: [
      "INSEAD",
    ],
    date: "Oct 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/EKELRDRRRMB7",
  },
  {
    id: "certificate-18",
    title: "Web3 and Blockchain Transformations in Global Supply Chains",
    preview: "INSEAD",
    image: "/images/certificates/cert18.jpg",
    achievementTitle: "Web3 and Blockchain Transformations in Global Supply Chains",
    content: [
      "INSEAD",
    ],
    date: "Nov 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/XLRECK6U3NGY",
  },
  {
    id: "certificate-19",
    title: "Blockchain and Cryptocurrency Explained",
    preview: "University of Michigan",
    image: "/images/certificates/cert19.jpg",
    achievementTitle: "Blockchain and Cryptocurrency Explained",
    content: [
      "University of Michigan",
    ],
    date: "Nov 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/3EH7QDT3WGGW",
  },
  {
    id: "certificate-20",
    title: "Think Again I: How to Understand Arguments",
    preview: "Duke University",
    image: "/images/certificates/cert20.jpg",
    achievementTitle: "Think Again I: How to Understand Arguments",
    content: [
      "Duke University",
    ],
    date: "Apr 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/PJVGYAU4YBHT",
  },
  {
    id: "certificate-21",
    title: "Think Again II: How to Reason Deductively",
    preview: "Duke University",
    image: "/images/certificates/cert21.jpg",
    achievementTitle: "Think Again II: How to Reason Deductively",
    content: [
      "Duke University",
    ],
    date: "Apr 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/SX2APEV2QH54",
  },
  {
    id: "certificate-22",
    title: "Think Again III: How to Reason Inductively",
    preview: "Duke University",
    image: "/images/certificates/cert22.jpg",
    achievementTitle: "Think Again III: How to Reason Inductively",
    content: [
      "Duke University",
    ],
    date: "Apr 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/4WH9P6AST8MV",
  },
  {
    id: "certificate-23",
    title: "Plots Creation using Matplotlib Python",
    preview: "coursera project network",
    image: "/images/certificates/cert23.jpg",
    achievementTitle: "Plots Creation using Matplotlib Python",
    content: [
      "coursera project network",
    ],
    date: "Oct 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/9EREP58PSJNB",
  },
  {
    id: "certificate-24",
    title: "Use Canva to Create Desktop and Mobile-friendly Web Pages.",
    preview: "coursera project network",
    image: "/images/certificates/cert24.jpg",
    achievementTitle: "Use Canva to Create Desktop and Mobile-friendly Web Pages.",
    content: [
      "coursera project network",
    ],
    date: "Oct 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/5WYDA3T5G5W5",
  },
];



export { personalInfo, projects, experience, achievementNotes, certificateNotes };
