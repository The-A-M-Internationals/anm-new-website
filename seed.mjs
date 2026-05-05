import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCU-3TwZewBzWkZqDOWmDjLcHMFoqKNy80",
  authDomain: "aandm-a0fd5.firebaseapp.com",
  projectId: "aandm-a0fd5",
  storageBucket: "aandm-a0fd5.firebasestorage.app",
  messagingSenderId: "271638307872",
  appId: "1:271638307872:web:cf7a438f85edf3e2228845",
  measurementId: "G-C5P1362Z5B",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const job = {
    title: "UI/UX Designer",
    department: "Digital Creative Studio",
    location: "Remote",
    type: "Full-time",
    description: `### ROLE SUMMARY\nWe're looking for a UI/UX Designer to join our Digital Creative Studio at The A&M International. You'll design intuitive, elegant interfaces for client websites, web apps, and digital products across industries including hospitality, e-commerce, and enterprise solutions.\n\n### RESPONSIBILITIES\n- Design wireframes, prototypes, and high-fidelity mockups for client web and mobile projects\n- Collaborate with developers to ensure pixel-perfect implementation of designs\n- Conduct user research and translate insights into intuitive interface decisions\n- Maintain and evolve design systems across multiple client brands\n- Present design concepts to clients and iterate based on feedback\n- Stay current with design trends, tools, and best practices in UI/UX\n\n### REQUIRED QUALIFICATIONS\n- 1–3 years of experience in UI/UX design (portfolio required)\n- Proficiency in Figma; familiarity with Adobe Creative Suite is a plus\n- Strong understanding of responsive design, typography, and color theory\n- Experience designing for web and mobile platforms\n- Excellent communication skills in English\n- Bachelor's degree in Design, HCI, or related field (or equivalent practical experience)\n\n### NICE TO HAVE\n- Experience with motion design or micro-interactions\n- Basic understanding of HTML/CSS\n- Prior agency or client-facing experience\n\n### JOB DETAILS\n**Location:** Remote  \n**Job Type:** Full-time  \n**Experience Level:** Mid-level  \n**How to Apply:** Send your CV and portfolio to am@theaminternational.com`
};

async function seed() {
    try {
        await setDoc(doc(db, "jobs", "test"), job); // Using "test" as ID since user says "The 'Test' job listing... Replace with a real job description"
        console.log("Job seeded!");
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}

seed();
