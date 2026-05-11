import { useState, useEffect, useRef, useMemo } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────

const ALL_PROJECTS = [
  {
    id: 1,
    cat: "Web Design",
    title: "Agency Landing Page",
    desc: "Bold, animated landing page for a creative agency with parallax hero and smooth transitions.",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    tags: ["Figma", "React", "CSS"],
    link: "https://example.com/agency",
    year: "2024",
  },
  {
    id: 2,
    cat: "Web Design",
    title: "E-Commerce Storefront",
    desc: "Minimal product-first storefront with custom cart, filters, and mobile-first layout.",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    tags: ["HTML/CSS", "JavaScript", "Responsive"],
    link: "https://example.com/ecommerce",
    year: "2024",
  },
  {
    id: 3,
    cat: "Web Design",
    title: "SaaS Dashboard",
    desc: "Data-rich analytics dashboard with dark mode, charts, and real-time updates.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    tags: ["React", "Recharts", "UI/UX"],
    link: "https://example.com/saas",
    year: "2023",
  },
  {
    id: 4,
    cat: "Photo Editing",
    title: "Portrait Retouching",
    desc: "Professional skin retouching, color grading, and studio-quality finishing for editorial shots.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    tags: ["Photoshop", "Retouching"],
    link: "https://example.com/portrait",
    year: "2024",
  },
  {
    id: 5,
    cat: "Photo Editing",
    title: "Landscape Color Grade",
    desc: "Cinematic color grading for landscape photography with custom LUTs and tone mapping.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    tags: ["Lightroom", "Color Grading"],
    link: "https://example.com/landscape",
    year: "2024",
  },
  {
    id: 6,
    cat: "Photo Editing",
    title: "Product Photography",
    desc: "Clean, high-end product compositing and retouching for commercial brand campaigns.",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    tags: ["Photoshop", "Compositing"],
    link: "https://example.com/product",
    year: "2023",
  },
  {
    id: 7,
    cat: "Built",
    title: "Senyas: Filipino Sign Language Translation for Two-Way Communication",
    desc: "App that enables two-way communication between deaf/mute individuals and hearing individuals. It allows for real-time translation of speech and text to empower inclusive communication.",
     img: new URL("./Pictures/logo/senyas.png", import.meta.url).href,
    tags: ["C++", "Python", "Edge-Impluse", "Kodular", "Arduino"],
    link: "https://github.com/ctrl-bers/Senyas",
    year: "2024",
  },
  {
    id: 8,
    cat: "Built",
    title: "A Proposed Computerized Application Supply Inventory System for the School Supplies of Samar National School",
    desc: "Focusing to borrowing and returning of school supplies.",
    img: new URL("./Pictures/built/Inventory.png", import.meta.url).href,
    tags: ["Vb.Net"],
    link: "https://github.com/ctrl-bers/SupplyInventorySystem",
    year: "2020",
  },
  {
    id: 9,
    cat: "Built",
    title: "SPACE - SMART PERSONAL AI for Calendar & Events",
    desc: "smart web-based scheduling platform powered by Umaru, your personal AI assistant.",
    img: new URL("./Pictures/built/SPACE.png", import.meta.url).href,
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Openrouter API"],
    link: "https://markberz.github.io/SPACE/",
    year: "2026",
  },
  {
    id: 10,
    cat: "Built",
    title: "Capstone Assistant Powered By AI (CAP.AI)",
    desc: "AI-powered web application that creates personalized capstone project ideas based on your selected industry and project type. With a single click, it returns a complete project title, description, estimated duration, difficulty level, and recommended tech stack to all generated in real time using AI.",
    img: new URL("./Pictures/built/CAP.AI.png", import.meta.url).href,
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Openrouter API"],
    link: "https://cap-ai-five.vercel.app/",
    year: "2025",
  },
  { 
    id: 11,
    cat: "Built",
    title: "GHProfileSearch",
    desc: "Smart web-based profile search application for GitHub users.",
    img: new URL("./Pictures/built/GHProfileSearch.png", import.meta.url).href,
    tags: ["HTML", "CSS", "JavaScript","Github API"],
    link: "https://ctrl-bers.github.io/GHProfileSearch/",
    year: "2025",
  },
  { 
    id: 12,
    cat: "Embedded",
    title: "Water Level Monitoring",
    desc: "When the tank is full, the LED will turn on. When the tank is empty, it will trigger an alarm, turn on the LED, and activate the water pump.",
    img: new URL("./Pictures/embedded/WaterLevelMonitoring.jpeg", import.meta.url).href,
    tags: ["C++", "Atmega328P-PU","Arduino IDE"],
    link: "https://github.com/ctrl-bers/WaterLevelMonitoring",
    year: "2024",
  },
  { 
    id: 13,
    cat: "Embedded",
    title: "GarbDetect: Automated Wet and Dry Garbage Detection with IoT-based User Notification",
    desc: "Detect Wet and Dry Garbage Using IR Sensor and Soil Moisture Sensor it will notify the user if garbage is full using ultrasonic sensor",
    img: new URL("./Pictures/embedded/GarbDetect.jpeg", import.meta.url).href,
    tags: ["C++", "Sim800L GSM Module","ESP32-CAM", "Teachable Machine","Arduino IDE"],
    link: "https://github.com/ctrl-bers/Mircoprocessor26",
    year: "2024",
  },
  { 
    id: 14,
    cat: "Embedded",
    title: "GSM-Based Prepaid Electricity Meter with Theft Detection using Arduino ATMEGA",
    desc: "It improves the electricity payment system. Users recharge like mobile load via SMS. Power is automatically cut when balance is low or zero. The system sends alerts for balance, cut-off, and recharge. It also detects meter tampering and theft.",
    img: new URL("./Pictures/embedded/GSM.jpeg", import.meta.url).href,
    tags: ["C++", "Sim800L GSM Module", "Arduino IDE"],
    link: "https://github.com/ctrl-bers/CpEElec2",
    year: "2024",
  },
  { 
    id: 15,
    cat: "Embedded",
    title: "Mechanical Arm Claw Controlled using a Joystick",
    desc: "The arm is typically mounted on a base and can be moved in different directions, while the gripper is attached to the end of the arm and is used to pick up and move objects. The joystick is a handheld device that the user can move in different directions to control the movements of the arm and gripper.",
    img: new URL("./Pictures/embedded/MechanicalArmClaw.jpeg", import.meta.url).href,
    tags: ["C++", "Arduino IDE"],
    link: "https://github.com/ctrl-bers/MechanicalArmClawControlledUsingJoystick",
    year: "2024",
  },
];

// ── CERTIFICATES ─────────────────────────────────────────────────────────────
// Replace the img URLs and title/issuer/year with your real certificate images

const CERTIFICATES = [
  {
    id: 1,
    title: "Data Analytics Essentials",
    issuer: "Cisco",
    year: "2025",
    img: new URL("./Pictures/certificates/Data Analytics.png", import.meta.url).href,
  },
  {
    id: 2,
    title: "Google IT Support Professional",
    issuer: "Google, Coursera",
    year: "2024",
    img: new URL("./Pictures/certificates/IT Support Certificate.png", import.meta.url).href,
  },
  {
    id: 3,
    title: "Data Fundamentals Training Course",
    issuer: "IBM SkillsBuild",
    year: "2024",
    img: new URL("./Pictures/certificates/Data Fundamentals.png", import.meta.url).href,
  },
  {
    id: 4,
    title: "Cisco Networking Academy: Introduction to Cybersecurity",
    issuer: "Cisco",
    year: "2024",
    img: new URL("./Pictures/certificates/Cisco.png", import.meta.url).href,
  },
  
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "CEO, Luminary Agency",
    avatar: "SM",
    text: "Absolutely incredible work. The website redesign exceeded every expectation — clean, fast, and stunningly beautiful. Our conversion rate jumped 40% in the first month.",
    rating: 5,
  },
  {
    id: 2,
    name: "James Reyes",
    role: "Photographer, Reyes Studio",
    avatar: "JR",
    text: "The photo editing work is on another level. My portraits came back looking like they belonged in Vogue. Attention to detail is unmatched — I won't go anywhere else.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anika Patel",
    role: "Founder, Bloom Goods",
    avatar: "AP",
    text: "From concept to launch in 3 weeks. The e-commerce site is exactly what I envisioned — fast, mobile-perfect, and my customers love it. Truly a professional.",
    rating: 5,
  },
  {
    id: 4,
    name: "Marcus Osei",
    role: "Creative Director, Nomad",
    avatar: "MO",
    text: "Hired for product photos and they came back looking like a luxury brand campaign. The color grading was chef's kiss. Highly recommend for any visual project.",
    rating: 5,
  },
];

const CATS = ["All", "Web Design", "Photo Editing", "Built", "Embedded"];
const SKILLS = [
  "C++",
  "Python",
  "React",
  "HTML",
  "CSS",
  "JavaScript",
  "Rust",
  "Node.js",
  "Figma",
  "Vercel",
  "Github",
  "Ai Prompting",
  "OpenAI API",
  "Canva",
  "Vb.net",
  "Data Encoding",
  "Computer Literacy",
];

// ── WORK EXPERIENCE ──────────────────────────────────────────────────────────

const WORK_EXPERIENCE = [
  {
    id: 1,
   
    logo: new URL("./Pictures/Work Experience/logo.jpeg", import.meta.url).href, 
    year: "May - July 2025",
    company: "Salenga Law Firm",
    position: "Programmer",
    description: "Improved systems and applications related to law. Also resolved issues with RustFL, including version compatibility between PyTorch and LibTorch. Developed a web scraping tool using Playwright that automatically searches a given name on Google Images, downloads three images, and verifies the images before sending them to the user for validation.",
  },
  {
    id: 2,
    logo: new URL("./Pictures/Work Experience/PhilHealth.jpg", import.meta.url).href, 
    year: "Feb - May 2024",
    company: "Philhealth Regional Office 8",
    position: "Technical Support",
    description: "I assist clients with computer troubleshooting, software updates, system maintenance, and data encoding.",
  },

];

// ── EDUCATION ────────────────────────────────────────────────────────────────

const EDUCATION = [
  {
    id: 1,
       logo: new URL("./Pictures/Education/Samar_State_University_Logo.png", import.meta.url).href, 

    year: "2020-2024",
    course: "Bachelor of Science in Computer Engineering (BSCpE)",
    institution: "Samar State University",
    description: "Focused on software development, algorithms, and computer systems. Completed capstone project on embedded systems integration.",
  },
  {
    id: 2,
    logo: new URL("./Pictures/Education/Samar_National_School_Logo.jpg", import.meta.url).href, // College logo placeholder
    year: "2018-2020",
    course: "Information Communication Technology (ICT) Strand",
    institution: "Samar National School",
    description: "Learned HTML, CSS, JavaScript, and responsive design principles. Developed multiple web projects using modern frameworks, and also built system applications using VB.NET.",
  },
 
];

// ── THEME TOKENS ─────────────────────────────────────────────────────────────

const DARK = {
  bg: "#0d0d0d",
  bgAlt: "#0a0a0a",
  bgCard: "#111111",
  bgCard2: "#161616",
  text: "#f0f0f0",
  textMuted: "#888",
  textFaint: "#444",
  border: "rgba(255,255,255,0.07)",
  borderMid: "rgba(255,255,255,0.12)",
  accent: "#C8FF00",
  accentRgb: "200,255,0",
  accentText: "#000",
  navBg: "rgba(13,13,13,0.88)",
  inputBg: "#161616",
  inputBorder: "rgba(255,255,255,0.1)",
  skillBg: "#1a1a1a",
  tickerText: "#2e2e2e",
  shadow: "rgba(0,0,0,0.5)",
  toggleBg: "#1e1e1e",
  toggleFace: "#C8FF00",
  toggleEmoji: "🌙",
  overlayBg: "rgba(0,0,0,0.92)",
};

const LIGHT = {
  bg: "#f4f4ef",
  bgAlt: "#ebebE5",
  bgCard: "#ffffff",
  bgCard2: "#f8f8f3",
  text: "#0d0d0d",
  textMuted: "#777",
  textFaint: "#ccc",
  border: "rgba(0,0,0,0.04)",
  borderMid: "rgba(0,0,0,0.06)",
  accent: "#8aaf00",
  accentRgb: "138,175,0",
  accentText: "#ffffff",
  navBg: "rgba(244,244,239,0.95)",
  inputBg: "#ffffff",
  inputBorder: "rgba(0,0,0,0.08)",
  skillBg: "#f0f0eb",
  tickerText: "#ddd",
  shadow: "rgba(0,0,0,0.08)",
  toggleBg: "#e8e8e0",
  toggleFace: "#8aaf00",
  toggleEmoji: "☀️",
  overlayBg: "rgba(0,0,0,0.85)",
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeCat, setActiveCat] = useState("All");
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [zoomedCert, setZoomedCert] = useState(null); // for lightbox
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactProject, setContactProject] = useState("Web Design");
  const [contactMessage, setContactMessage] = useState("");

  const PROFILE_LINKS = [
    { label: "Github", href: "https://github.com/markberz" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mark-berio/" },
  ];

  const cursorRef = useRef(null);
  const c = dark ? DARK : LIGHT;

  // Typewriter
  const roles = useMemo(
    () => ["Web Designer", "Web Developer", "Technical Support", "Photo Editor", "Embedded System Developer"],
    [],
  );
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayRole, setDisplayRole] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let t;
    const cur = roles[roleIdx];
    if (!deleting) {
      if (displayRole.length < cur.length) {
        t = setTimeout(
          () => setDisplayRole(cur.slice(0, displayRole.length + 1)),
          80,
        );
      } else {
        t = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      t = setTimeout(() => {
        if (displayRole.length > 0) {
          setDisplayRole(displayRole.slice(0, -1));
        } else {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % roles.length);
        }
      }, 40);
    }
    return () => clearTimeout(t);
  }, [displayRole, deleting, roleIdx, roles]);

  // Cursor
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px,${e.clientY - 10}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const t = setInterval(
      () => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setZoomedCert(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Update page background on theme change
  useEffect(() => {
    const color = dark ? "#0d0d0d" : "#f4f4ef";
    document.documentElement.style.background = color;
    document.body.style.background = color;
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.style.background = color;
      rootEl.style.minHeight = "100vh";
      rootEl.style.width = "100%";
    }
  }, [dark]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id.charAt(0).toUpperCase() + id.slice(1));
    setMenuOpen(false);
  };

  const handleSendMessage = () => {
    const recipient = "your.email@example.com";
    const subject = encodeURIComponent(
      `Portfolio inquiry from ${contactName || contactEmail}`,
    );
    const body = encodeURIComponent(
      `Name: ${contactName}\nEmail: ${contactEmail}\nProject Type: ${contactProject}\n\n${contactMessage}`,
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  const filtered =
    activeCat === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.cat === activeCat);


  const sTitle = {
    fontFamily: "'Playfair Display',serif",
    fontSize: "clamp(32px,4vw,52px)",
    fontWeight: 700,
    letterSpacing: "-1px",
    color: c.text,
  };

  // ── HERO PROFILE PHOTO — replace this URL with your own photo ──
  

  return (
    <div
      style={{
        fontFamily: "'Space Grotesk',sans-serif",
        background: c.bg,
        color: c.text,
        minHeight: "100vh",
        overflowX: "hidden",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;cursor:none!important;}
        html, body, #root {background: var(--page-bg, #f4f4ef); min-height: 100%; width: 100%;}
        html{scroll-behavior:smooth;}
        body{margin:0;}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}}
        @keyframes scrollAnim{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(8px)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes zoomIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
        @keyframes certPop{from{opacity:0;transform:scale(0.9) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}}
        @keyframes scrollAnim{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(8px)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes zoomIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
        @keyframes certPop{from{opacity:0;transform:scale(0.9) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}

        .mobile-hamburger { display: none; }

        @media (max-width: 768px) {
          .mobile-hamburger {
            display: block !important;
          }
          nav {
            padding: 16px 20px !important;
          }
          nav > div:first-child {
            display: none !important; /* hide logo */
          }
          nav > div:nth-child(3) {
            display: none !important; /* hide nav links */
          }
          nav > div:nth-child(4) {
            position: absolute !important;
            right: 20px !important;
            top: 16px !important;
          }
          section[id="home"] {
            padding: 100px 20px 60px !important;
            minHeight: auto !important;
          }
          section[id="home"] > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          section[id="home"] > div > div:first-child {
            animation: none !important;
          }
          section[id="home"] > div > div:first-child h1 {
            font-size: clamp(36px, 4vw, 60px) !important;
          }
          section[id="home"] > div > div:first-child > p {
            font-size: 14px !important;
            line-height: 1.6 !important;
          }
          section[id="home"] > div > div:first-child > div:last-of-type {
            flex-direction: column !important;
            width: 100% !important;
          }
          section[id="home"] > div > div:first-child > div:last-of-type button {
            width: 100% !important;
            padding: 14px 24px !important;
          }
          section[id="home"] > div > div:nth-child(2) {
            display: flex !important;
            justify-content: center !important;
          }
          section[id="home"] > div > div:nth-child(2) > div {
            width: 100% !important;
            max-width: 300px !important;
          }
          section[id="home"] > div > div:nth-child(2) > div > div:nth-child(1) {
            width: 200px !important;
            height: 200px !important;
          }
          section[id="home"] > div > div:nth-child(2) > div > div:nth-child(2) {
            width: 160px !important;
            height: 160px !important;
          }
          section[id="home"] > div > div:nth-child(2) > div > div:nth-child(3) {
            width: 140px !important;
            height: 180px !important;
          }
          section[id="home"] > div > div:nth-child(2) > div > div:last-child {
            display: none !important;
          }
          section[id="home"] > div > div:nth-child(3) {
            display: none !important;
          }
          section[id="about"] {
            padding: 80px 20px !important;
          }
          section[id="about"] > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          section[id="about"] > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          section[id="about"] > div > div:nth-child(2) > div {
            padding: 16px !important;
            gap: 12px !important;
          }
          section[id="about"] > div > div:nth-child(2) > div > span {
            font-size: 20px !important;
          }
          section[id="about"] > div > div:nth-child(2) > div > div > p:first-child {
            font-size: 10px !important;
          }
          section[id="about"] > div > div:nth-child(2) > div > div > p:last-child {
            font-size: 13px !important;
          }
          section[id="experience"] {
            padding: 80px 20px !important;
          }
          section[id="experience"] > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          section[id="education"] {
            padding: 80px 20px !important;
          }
          section[id="education"] > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          section[id="projects"] {
            padding: 80px 20px !important;
          }
          section[id="projects"] > div > div:nth-child(2) {
            margin-bottom: 32px !important;
            gap: 6px !important;
          }
          section[id="projects"] > div > div:nth-child(2) button {
            padding: 8px 14px !important;
            font-size: 12px !important;
            flex: 1 1 calc(50% - 3px) !important;
            min-width: auto !important;
          }
          section[id="projects"] > div > div:nth-child(3) {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          section[id="projects"] > div > div:nth-child(3) a > div > div:first-child {
            height: 150px !important;
          }
          section[id="certificates"] {
            padding: 80px 20px !important;
          }
          section[id="certificates"] > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          section[id="testimonials"] {
            padding: 80px 20px !important;
          }
          section[id="testimonials"] > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          section[id="contact"] {
            padding: 80px 20px !important;
          }
          section[id="contact"] > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          section[id="contact"] > div > div:first-child > h3 {
            font-size: 24px !important;
            line-height: 1.1 !important;
            margin-bottom: 8px !important;
          }
          section[id="contact"] > div > div:first-child > h3 > br {
            display: none !important;
          }
          section[id="contact"] > div > div:first-child > p {
            font-size: 14px !important;
            line-height: 1.6 !important;
            margin-bottom: 24px !important;
          }
          section[id="contact"] > div > div:first-child > div {
            border-top: none !important;
            margin-top: 0 !important;
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }
          section[id="contact"] > div > div:first-child > div > a {
            padding: 12px 16px !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            border-radius: 8px !important;
            font-size: 13px !important;
            justify-content: center !important;
            background: rgba(255,255,255,0.05) !important;
            transition: all 0.2s !important;
          }
          section[id="contact"] > div > div:first-child > div > a:hover {
            background: rgba(200,255,0,0.1) !important;
            border-color: rgba(200,255,0,0.3) !important;
          }
          section[id="contact"] > div > div:last-child {
            gap: 16px !important;
          }
          section[id="contact"] > div > div:last-child > div > label {
            font-size: 12px !important;
            margin-bottom: 4px !important;
          }
          section[id="contact"] > div > div:last-child > div > input,
          section[id="contact"] > div > div:last-child > div > select,
          section[id="contact"] > div > div:last-child > div > textarea {
            padding: 16px !important;
            font-size: 16px !important;
            border-radius: 12px !important;
          }
          section[id="contact"] > div > div:last-child > button {
            padding: 18px 32px !important;
            font-size: 16px !important;
            font-weight: 700 !important;
            border-radius: 12px !important;
            margin-top: 8px !important;
            width: 100% !important;
            transition: all 0.2s !important;
          }
          section[id="contact"] > div > div:last-child > button:hover {
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 12px rgba(200,255,0,0.3) !important;
          }
          footer {
            padding: 20px !important;
          }
        }
      `}</style>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          background: c.accent,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transition: "transform 0.05s linear",
          willChange: "transform",
        }}
      />

      {/* ══════════════════════════════════════ CERTIFICATE LIGHTBOX */}
      {zoomedCert && (
        <div
          onClick={() => setZoomedCert(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 8000,
            background: c.overlayBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            animation: "zoomIn 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: 860,
              width: "100%",
              animation: "certPop 0.25s ease",
            }}
          >
            {/* Close btn */}
            <button
              onClick={() => setZoomedCert(null)}
              style={{
                position: "absolute",
                top: -16,
                right: -16,
                zIndex: 10,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: c.accent,
                border: "none",
                color: c.accentText,
                fontSize: 20,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "none",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
            {/* Certificate image */}
            <img
              src={zoomedCert.img}
              alt={zoomedCert.title}
              style={{
                width: "100%",
                borderRadius: 16,
                display: "block",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
              }}
            />
            {/* Caption bar */}
            <div
              style={{
                background: dark ? "#111" : "#fff",
                borderRadius: "0 0 16px 16px",
                padding: "16px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 700,
                    fontSize: 17,
                    color: c.text,
                  }}
                >
                  {zoomedCert.title}
                </p>
                <p style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>
                  {zoomedCert.issuer} · {zoomedCert.year}
                </p>
              </div>
              <span
                style={{
                  background: c.accent,
                  color: c.accentText,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: 20,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Certified
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════ NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 60px",
          background: c.navBg,
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${c.border}`,
          transition: "background 0.3s",
        }}
      >
        {/* Logo only — no text label */}
        <div
          onClick={() => scrollTo("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
        >
          <img
            src={new URL("./Pictures/logo/logo.png", import.meta.url).href}
            alt="Logo"
            style={{
              width: 40,
              height: 40,
            }}
          />
        </div>

        {/* Mobile hamburger */}
        <div className="mobile-hamburger" style={{ display: "none" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: dark ? c.text : "#000000",
              fontSize: 24,
              cursor: "none",
            }}
          >
            ☰
          </button>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 2 }}>
          {[
            "Home",
            "About",
            "Projects",
            "Certificates",
            "Testimonials",
            "Contact",
          ].map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              style={{
                background:
                  activeNav === link
                    ? dark
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(0,0,0,0.06)"
                    : "none",
                border: "none",
                color: dark ? (activeNav === link ? c.text : c.textMuted) : c.text,
                fontSize: 13,
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 500,
                padding: "8px 12px",
                borderRadius: 8,
                position: "relative",
                transition: "color 0.2s,background 0.2s",
                cursor: "none",
              }}
            >
              {link}
              {activeNav === link && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: c.accent,
                    display: "block",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Dark/light toggle */}
        <button
          onClick={() => setDark(!dark)}
          style={{
            background: c.toggleBg,
            border: `1px solid ${c.border}`,
            borderRadius: 20,
            width: 54,
            height: 30,
            position: "relative",
            cursor: "none",
            transition: "background 0.3s",
            padding: 0,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 4,
              left: dark ? 26 : 4,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: c.toggleFace,
              transition: "left 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
            }}
          >
            {c.toggleEmoji}
          </div>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 101,
            background: c.overlayBg,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            backdropFilter: "blur(14px)",
          }}
        >
          {[
            "Home",
            "About",
            "Projects",
            "Certificates",
            "Testimonials",
            "Contact",
          ].map((link) => (
            <button
              key={link}
              onClick={() => {
                scrollTo(link.toLowerCase());
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                color: dark ? c.text : "#ffffff",
                fontSize: 18,
                fontFamily: "'Space Grotesk',sans-serif",
                fontWeight: 500,
                padding: "10px 20px",
                cursor: "none",
              }}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "none",
              border: "none",
              color: dark ? c.text : "#ffffff",
              fontSize: 24,
              cursor: "none",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════ HERO */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          padding: "130px 60px 80px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: c.bg,
          transition: "background 0.3s ease",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left — text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              animation: "fadeUp 0.7s ease both",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: `rgba(${c.accentRgb},0.1)`,
                border: `1px solid rgba(${c.accentRgb},0.25)`,
                color: c.accent,
                fontSize: 13,
                fontWeight: 600,
                padding: "6px 16px",
                borderRadius: 20,
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c.accent,
                  animation: "blink 1.5s infinite",
                  display: "inline-block",
                }}
              />
              Available for work
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(44px,5.5vw,78px)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-2px",
                color: c.text,
              }}
            >
              MARK
              <br />
              <span style={{ color: c.accent }}>BERIO</span>
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 20,
                color: c.textMuted,
              }}
            >
              <span
                style={{ color: c.accent, animation: "blink 0.8s infinite" }}
              >
                _
              </span>
              <span style={{ color: c.text, fontWeight: 500 }}>
                {displayRole}
              </span>
              <span
                style={{ color: c.accent, animation: "blink 0.8s infinite" }}
              >
                |
              </span>
            </div>

            <p
              style={{
                color: c.textMuted,
                fontSize: 16,
                lineHeight: 1.8,
                maxWidth: 440,
              }}
            >
             I design and develop modern websites, create visual content through photo editing, and provide technical support for computer systems. I also build embedded system projects that combine hardware and software solutions.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <button
                onClick={() => scrollTo("projects")}
                style={{
                  background: c.accent,
                  color: c.accentText,
                  border: "none",
                  borderRadius: 10,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk',sans-serif",
                  cursor: "none",
                }}
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo("contact")}
                style={{
                  background: "transparent",
                  color: c.text,
                  border: `1px solid ${c.borderMid}`,
                  borderRadius: 10,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "'Space Grotesk',sans-serif",
                  cursor: "none",
                }}
              >
                Contact Me
              </button>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Mark_Berio_Resume.pdf';
                  link.download = 'Mark_Berio_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                style={{
                  background: "transparent",
                  color: c.text,
                  border: `1px solid ${c.borderMid}`,
                  borderRadius: 10,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "'Space Grotesk',sans-serif",
                  cursor: "none",
                }}
              >
                Resume
              </button>
            </div>
          </div>

          {/* Right — PROFILE PHOTO */}
          {/* To use your own photo, replace MY_PHOTO at the top with your image URL */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Photo frame */}
            <div
              style={{
                position: "relative",
                width: 400,
                height: 400,
                borderRadius: 28,
                overflow: "hidden",
                border: `3px solid rgba(${c.accentRgb},0.35)`,
                boxShadow: `0 32px 80px ${c.shadow},0 0 0 1px ${c.border}`,
                animation: "float 4.5s ease-in-out infinite",
              }}
            >
              <img
                src={new URL("./Pictures/self/Selfs.png", import.meta.url).href}
                alt="Profile photo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  display: "block",
                }}
              />
              {/* Bottom gradient */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "40%",
                  background: `linear-gradient(to top,${dark ? "#0d0d0d" : "#f4f4ef"} 0%,transparent 100%)`,
                }}
              />
            </div>

           
            
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 24,
              height: 38,
              border: `2px solid ${c.textFaint}`,
              borderRadius: 12,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: 4,
            }}
          >
            <div
              style={{
                width: 4,
                height: 8,
                background: c.accent,
                borderRadius: 2,
                animation: "scrollAnim 1.5s ease-in-out infinite",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 11,
              color: c.textFaint,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════ ABOUT */}
      <section
        id="about"
        style={{
          padding: "100px 60px",
          background: c.bgAlt,
          transition: "background 0.3s",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              textAlign: "center",
              alignItems: "baseline",
              gap: 16,
              marginBottom: 60,
            }}
          >
           
           <h2 style={{ ...sTitle, textAlign: "center" }}>About Me</h2>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ color: c.textMuted, fontSize: 16, lineHeight: 1.8 }}>
                I'm {" "}
                <span style={{ color: c.accent, fontWeight: 600 }}>
                  Mark D. Berio
                </span>{" "}
                  a web designer and developer who creates websites, produces visual content through photo editing, and provides technical support for computer systems. I also develop embedded system projects that integrate both hardware and software solutions. I am passionate about working at the intersection of creativity and technology, transforming ideas into practical digital experiences.              </p>
              <p style={{ color: c.textMuted, fontSize: 16, lineHeight: 1.8 }}>
                Every project is an opportunity to push creative boundaries and
                deliver work that not only looks stunning but achieves real
                results.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                {SKILLS.map((sk) => (
                  <span
                    key={sk}
                    style={{
                      background: c.skillBg,
                      border: `1px solid ${c.border}`,
                      borderRadius: 20,
                      padding: "6px 14px",
                      fontSize: 12,
                      color: c.textMuted,
                      fontWeight: 500,
                      transition: "background 0.3s",
                    }}
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                ["🎨", "", "Web Designing"],
                ["📸", "", "Picture Editing"],
                ["👨‍💻", "", "Coding"],
                ["🎧", "", "Technical Support"],
                ["⚙️", "", "Embedded Systems"],
                ["🤖", "", "Prompting"],
              ].map(([icon, label, val]) => (
                <div
                  key={label}
                  style={{
                    background: c.bgCard,
                    border: `1px solid ${c.border}`,
                    borderRadius: 16,
                    padding: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    transition: "background 0.3s",
                  }}
                >
                  <span style={{ fontSize: 26 }}>{icon}</span>
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        color: c.textFaint,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: 3,
                      }}
                    >
                      {label}
                    </p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: c.text }}>
                      {val}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ EXPERIENCE */}
      <section
        id="experience"
        style={{
          padding: "100px 60px",
          background: c.bgAlt,
          transition: "background 0.3s",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              textAlign: "center",
              alignItems: "baseline",
              gap: 16,
              marginBottom: 60,
            }}
          >
           
           <h2 style={{ ...sTitle, textAlign: "center" }}>Work Experience</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 30,
            }}
          >
            {WORK_EXPERIENCE.map((exp) => (
              <div
                key={exp.id}
                style={{
                  background: c.bgCard,
                  border: `1px solid ${c.border}`,
                  borderRadius: 16,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${c.shadow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    textAlign: "center",
                  }}
                >
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: 14,
                        color: c.textMuted,
                        margin: 0,
                      }}
                    >
                      {exp.year}
                    </p>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: c.text,
                        margin: 0,
                      }}
                    >
                      {exp.company}
                    </h3>
                  </div>
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: c.accent,
                      margin: 0,
                      marginBottom: 8,
                    }}
                  >
                    {exp.position}
                  </h4>
                  <p
                    style={{
                      fontSize: 14,
                      color: c.textMuted,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ EDUCATION */}
      <section
        id="education"
        style={{
          padding: "100px 60px",
          background: c.bgAlt,
          transition: "background 0.3s",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              textAlign: "center",
              alignItems: "baseline",
              gap: 16,
              marginBottom: 60,
            }}
          >
           
           <h2 style={{ ...sTitle, textAlign: "center" }}>Education</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 30,
            }}
          >
            {EDUCATION.map((edu) => (
              <div
                key={edu.id}
                style={{
                  background: c.bgCard,
                  border: `1px solid ${c.border}`,
                  borderRadius: 16,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${c.shadow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    textAlign: "center",
                  }}
                >
                  <img
                    src={edu.logo}
                    alt={`${edu.institution} logo`}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: 14,
                        color: c.textMuted,
                        margin: 0,
                      }}
                    >
                      {edu.year}
                    </p>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: c.text,
                        margin: 0,
                      }}
                    >
                      {edu.institution}
                    </h3>
                  </div>
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: c.accent,
                      margin: 0,
                      marginBottom: 8,
                    }}
                  >
                    {edu.course}
                  </h4>
                  <p
                    style={{
                      fontSize: 14,
                      color: c.textMuted,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ PROJECTS */}
      <section
        id="projects"
        style={{
          padding: "100px 60px",
          background: c.bg,
          transition: "background 0.3s",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              textAlign: "center",
              gap: 16,
              marginBottom: 40,
            }}
          >
         
            <h2 style={{ ...sTitle, textAlign: "center" }}>Projects</h2>
          </div>

          {/* Category Filter Tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 48,
              flexWrap: "wrap",
            }}
          >
            {CATS.map((cat) => {
              const count =
                cat === "All"
                  ? ALL_PROJECTS.length
                  : ALL_PROJECTS.filter((p) => p.cat === cat).length;
              const isActive = activeCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  style={{
                    background: isActive ? c.accent : c.bgCard2,
                    color: isActive ? c.accentText : c.textMuted,
                    border: `1.5px solid ${isActive ? c.accent : c.border}`,
                    borderRadius: 24,
                    padding: "10px 22px",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Space Grotesk',sans-serif",
                    cursor: "none",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                  <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.65 }}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Project Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
            }}
          >
            {filtered.map((proj) => (
              <a
                key={proj.id}
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <div
                  onMouseEnter={() => setHoveredProject(proj.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    background: c.bgCard,
                    border: `1.5px solid ${hoveredProject === proj.id ? c.accent + "66" : c.border}`,
                    borderRadius: 18,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    transform:
                      hoveredProject === proj.id
                        ? "translateY(-6px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredProject === proj.id
                        ? `0 20px 48px ${c.shadow}`
                        : "none",
                    cursor: "none",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      height: 190,
                    }}
                  >
                    <img
                      src={proj.img}
                      alt={proj.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                        transform:
                          hoveredProject === proj.id
                            ? "scale(1.09)"
                            : "scale(1)",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%)`,
                        opacity: hoveredProject === proj.id ? 1 : 0,
                        transition: "opacity 0.3s",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "14px 16px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#fff",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                        }}
                      >
                        View Project →
                      </span>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: c.accent,
                        color: c.accentText,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 20,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {proj.cat}
                    </div>
                  </div>
                  <div style={{ padding: "18px 20px 20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontSize: 17,
                          fontWeight: 700,
                          color: c.text,
                        }}
                      >
                        {proj.title}
                      </h3>
                      <span style={{ fontSize: 11, color: c.textFaint }}>
                        {proj.year}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: c.textMuted,
                        lineHeight: 1.65,
                        marginBottom: 14,
                      }}
                    >
                      {proj.desc}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "3px 9px",
                            borderRadius: 12,
                            border: `1px solid rgba(${c.accentRgb},0.35)`,
                            color: c.accent,
                            textTransform: "uppercase",
                            letterSpacing: "0.4px",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Ticker */}
        <div
          style={{
            overflow: "hidden",
            borderTop: `1px solid ${c.border}`,
            borderBottom: `1px solid ${c.border}`,
            padding: "16px 0",
            marginTop: 80,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              animation: "ticker 14s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {[...Array(3)].map((_, i) =>
              [
                "Web Design",
                "Web Developer",
                "Photo Editor",
                "Prompt Design",
                "Embedded Systems",
                "Technical Support",
                
              ].map((t, j) => (
                <span
                  key={`${i}-${j}`}
                  style={{
                    fontSize: 13,
                    color: dark ? "#ffffff" : "#000000",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginRight: 44,
                  }}
                >
                  {t} <span style={{ color: c.accent, fontSize: 10 }}>◆</span>
                </span>
              )),
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ CERTIFICATES */}
      <section
        id="certificates"
        style={{
          padding: "100px 60px",
          background: c.bgAlt,
          transition: "background 0.3s",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              textAlign: "center",
              alignItems: "baseline",
              
              gap: 16,
              marginBottom: 16,
            }}
          >
          
            <h2 style={sTitle}>Certificates</h2>
          </div>
        

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
            }}
          >
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setZoomedCert(cert)}
                style={{
                  background: c.bgCard,
                  border: `1.5px solid ${c.border}`,
                  borderRadius: 18,
                  overflow: "hidden",
                  cursor: "none",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = c.accent + "66";
                  e.currentTarget.style.boxShadow = `0 20px 48px ${c.shadow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = c.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Certificate preview image */}
                <div
                  style={{
                    position: "relative",
                    height: 180,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={cert.img}
                    alt={cert.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.5s",
                    }}
                  />
                  {/* Zoom hint overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.45)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = 1;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = 0;
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: c.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        marginBottom: 8,
                      }}
                    >
                      🔍
                    </div>
                    <span
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      Click to view
                    </span>
                  </div>
                  {/* Certified badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: c.accent,
                      color: c.accentText,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 20,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    ✓ Certified
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "16px 18px 18px" }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: c.text,
                      marginBottom: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {cert.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: c.textMuted,
                        fontWeight: 500,
                      }}
                    >
                      {cert.issuer}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: c.accent,
                        fontWeight: 700,
                        background: `rgba(${c.accentRgb},0.1)`,
                        padding: "3px 10px",
                        borderRadius: 12,
                      }}
                    >
                      {cert.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ TESTIMONIALS */}
      <section
        id="testimonials"
        style={{
          padding: "100px 60px",
          background: c.bg,
          transition: "background 0.3s",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              textAlign: "center",
              alignItems: "baseline",
              gap: 16,
              marginBottom: 60,
            }}
          >
           
            <h2 style={{ ...sTitle, textAlign: "center" }}>Testimonials</h2>
          </div>

          {/* Featured quote */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              background: c.bgCard,
              border: `1px solid ${c.border}`,
              borderRadius: 24,
              padding: "48px 56px",
              marginBottom: 32,
              position: "relative",
              overflow: "hidden",
              transition: "background 0.3s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 24,
                right: 40,
                fontFamily: "'Playfair Display',serif",
                fontSize: 130,
                color: c.accent,
                opacity: 0.07,
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              "
            </div>
            <div style={{ display: "flex", gap: 3, marginBottom: 22, justifyContent: "center" }}>
              {Array(TESTIMONIALS[testimonialIdx].rating)
                .fill(0)
                .map((_, i) => (
                  <span key={i} style={{ color: c.accent, fontSize: 18 }}>
                    ★
                  </span>
                ))}
            </div>
            <p
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(17px,2.2vw,24px)",
                fontWeight: 700,
                lineHeight: 1.55,
                color: c.text,
                textAlign: "center",
                margin: "0 auto 32px",
                maxWidth: 680,
              }}
            >
              "{TESTIMONIALS[testimonialIdx].text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: `rgba(${c.accentRgb},0.12)`,
                  border: `2px solid rgba(${c.accentRgb},0.3)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 14,
                  color: c.accent,
                }}
              >
                {TESTIMONIALS[testimonialIdx].avatar}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: c.text }}>
                  {TESTIMONIALS[testimonialIdx].name}
                </p>
                <p style={{ fontSize: 13, color: c.textMuted }}>
                  {TESTIMONIALS[testimonialIdx].role}
                </p>
              </div>
            </div>
          </div>

          {/* Dot nav */}
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              marginBottom: 36,
            }}
          >
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                style={{
                  width: i === testimonialIdx ? 26 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === testimonialIdx ? c.accent : c.border,
                  border: "none",
                  cursor: "none",
                  transition: "all 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Mini cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 14,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.id}
                onClick={() => setTestimonialIdx(i)}
                style={{
                  background: c.bgCard,
                  border: `1.5px solid ${i === testimonialIdx ? c.accent + "55" : c.border}`,
                  borderRadius: 16,
                  padding: "18px",
                  cursor: "none",
                  transition: "all 0.25s",
                  opacity: i === testimonialIdx ? 1 : 0.55,
                }}
              >
                <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                  {Array(t.rating)
                    .fill(0)
                    .map((_, j) => (
                      <span key={j} style={{ color: c.accent, fontSize: 12 }}>
                        ★
                      </span>
                    ))}
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: c.textMuted,
                    lineHeight: 1.6,
                    marginBottom: 14,
                  }}
                >
                  "{t.text.slice(0, 80)}…"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: `rgba(${c.accentRgb},0.12)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: c.accent,
                      flexShrink: 0,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: c.text }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: 10, color: c.textFaint }}>
                      {t.role.split(",")[0]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ CONTACT */}
      <section
        id="contact"
        style={{
          padding: "100px 60px",
          background: c.bgAlt,
          transition: "background 0.3s",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              textAlign: "center",
              alignItems: "baseline",
              gap: 16,
              marginBottom: 60,
            }}
          >
            
            <h2 style={{ ...sTitle, textAlign: "center" }}>Contact</h2>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(26px,3vw,40px)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-1px",
                  color: c.text,
                }}
              >
                Let's build something
                <br />
                <span style={{ color: c.accent }}>amazing together.</span>
              </h3>
              <p style={{ color: c.textMuted, fontSize: 15, lineHeight: 1.75 }}>
                Whether you need a stunning website, professional photo editing,
                or a fully built product. I'm ready to bring your vision to
                life.
              </p>
              <div style={{ borderTop: `1px solid ${c.border}`, marginTop: 8 }}>
                {PROFILE_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px 0",
                      borderBottom: `1px solid ${c.border}`,
                      color: c.textMuted,
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <span>{link.label}</span>
                    <span style={{ color: c.accent, fontSize: 16 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                ["Name", "Your name", "text", contactName, setContactName],
                ["Email", "your@email.com", "email", contactEmail, setContactEmail],
              ].map(([label, ph, type, value, setValue]) => (
                <div
                  key={label}
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <label
                    style={{
                      fontSize: 11,
                      color: dark ? c.textFaint : "#000000",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={ph}
                    style={{
                      background: c.inputBg,
                      border: `1px solid ${c.inputBorder}`,
                      borderRadius: 10,
                      padding: "12px 16px",
                      color: c.text,
                      fontSize: 14,
                      fontFamily: "'Space Grotesk',sans-serif",
                      outline: "none",
                      width: "100%",
                      transition: "background 0.3s,color 0.3s",
                    }}
                  />
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  style={{
                    fontSize: 11,
                    color: dark ? c.textFaint : "#000000",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  Project type
                </label>
                <select
                  value={contactProject}
                  onChange={(e) => setContactProject(e.target.value)}
                  style={{
                    background: c.inputBg,
                    border: `1px solid ${c.inputBorder}`,
                    borderRadius: 10,
                    padding: "12px 16px",
                    color: c.text,
                    fontSize: 14,
                    fontFamily: "'Space Grotesk',sans-serif",
                    outline: "none",
                    width: "100%",
                    transition: "background 0.3s,color 0.3s",
                  }}
                >
                  <option>Web Design</option>
                  <option>Photo Editing</option>
                  <option>Built Website</option>
                  <option>Embedded System</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  style={{
                    fontSize: 11,
                    color: dark ? c.textFaint : "#000000",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  Message
                </label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  style={{
                    background: c.inputBg,
                    border: `1px solid ${c.inputBorder}`,
                    borderRadius: 10,
                    padding: "12px 16px",
                    color: c.text,
                    fontSize: 14,
                    fontFamily: "'Space Grotesk',sans-serif",
                    outline: "none",
                    width: "100%",
                    height: 110,
                    resize: "vertical",
                    transition: "background 0.3s,color 0.3s",
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleSendMessage}
                style={{
                  background: c.accent,
                  color: c.accentText,
                  border: "none",
                  borderRadius: 10,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk',sans-serif",
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ FOOTER */}
      <footer
        style={{
          padding: "30px 60px",
          borderTop: `1px solid ${c.border}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
          background: c.bg,
          textAlign: "center",
          transition: "background 0.3s",
        }}
      >
        
        <span style={{ fontSize: 13, color: c.textFaint,  }}>
          © {new Date().getFullYear()} All rights reserved.
        </span>
      </footer>
    </div>
  );
}
