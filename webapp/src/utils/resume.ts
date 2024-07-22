import {OutputFormat, Resume} from '../gen';
import init, {generate_resume} from "../gen/resumers_lib";

let initialized = false;
async function ensureInitialized() {
    if (!initialized) {
        await init();
        initialized = true;
    }
}

export async function generateResume(resume: Resume, format: OutputFormat): Promise<string> {
    await ensureInitialized();
    return generate_resume(resume, format);
}

export {OutputFormat};

export type {Resume};

const defaultResume: Resume = {
    "name": "John Doe",
    "title": "Software Engineer",
    "location": "San Francisco, CA",
    "linkedin": "https://www.linkedin.com/in/johndoe",
    "email": "john.doe@email.com",
    "phone": "1234567890",
    "summary": "Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success. Well-versed in technology and writing code to create systems that are reliable and user-friendly.",
    "skills": [
        "Rust",
        "Python",
        "JavaScript",
        "React",
        "Node.js",
        "SQL",
        "Git",
        "Agile/Scrum",
        "Cloud Computing (AWS)",
        "Machine Learning"
    ],
    "experience": [
        {
            "title": "Senior Software Engineer",
            "company": "Tech Innovations Inc.",
            "location": "San Francisco, CA",
            "start_date": "2019-01-15",
            "responsibilities": [
                "Lead a team of 5 developers in the design and implementation of a new cloud-based software solution",
                "Spearheaded the migration of legacy systems to modern, scalable architectures",
                "Implemented automated testing procedures, reducing bug reports by 40%"
            ]
        },
        {
            "title": "Software Developer",
            "company": "DataCraft Solutions",
            "location": "San Jose, CA",
            "start_date": "2015-06-01",
            "end_date": "2018-12-31",
            "responsibilities": [
                "Developed and maintained web applications using React and Node.js",
                "Collaborated with the product team to implement new features",
                "Mentored junior developers, leading to improved team productivity"
            ]
        }
    ],
    "education": [
        {
            "degree": "Master of Science in Computer Science",
            "institution": "Stanford University",
            "graduation_year": 2015
        },
        {
            "degree": "Bachelor of Science in Computer Engineering",
            "institution": "University of California, Berkeley",
            "graduation_year": 2013
        }
    ],
    "certifications": [
        {
            "name": "AWS Certified Solutions Architect",
            "issuer": "Amazon Web Services",
            "year": 2020
        },
        {
            "name": "Certified Scrum Master",
            "issuer": "Scrum Alliance",
            "year": 2018
        }
    ],
    "made_with": "https://github.com/yourusername/resume-builder",
    "style": {
        "primary_color": "#0d47a1",
        "secondary_color": "#1976d2",
        "font_family": "Arial, sans-serif",
        "text_color": "#333333",
        "header_text_color": "#ffffff"
    }
};

export function loadDefaultResume(): void {
    const savedResumeNames = JSON.parse(localStorage.getItem('savedResumeNames') || '[]');

    if (!savedResumeNames.includes('John Doe')) {
        localStorage.setItem('resume_John Doe', JSON.stringify(defaultResume));
        savedResumeNames.push('John Doe');
        localStorage.setItem('savedResumeNames', JSON.stringify(savedResumeNames));
    }
}