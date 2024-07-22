import React from 'react';
import {Education, Resume} from "../gen";

interface Props {
    resume: Resume;
    setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

const EducationForm: React.FC<Props> = ({ resume, setResume }) => {
    const addEducation = () => {
        const newEducation: Education = {
            degree: '',
            institution: '',
            graduation_year: new Date().getFullYear(),
        };
        setResume(prev => ({ ...prev, education: [...(prev.education || []), newEducation] }));
    };

    const updateEducation = (index: number, field: keyof Education, value: string | number) => {
        setResume(prev => ({
            ...prev,
            education: (prev.education || []).map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
            ),
        }));
    };

    const removeEducation = (index: number) => {
        setResume(prev => ({
            ...prev,
            education: (prev.education || []).filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            {(resume.education || []).map((edu, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        placeholder="Degree"
                        className="input mb-2"
                    />
                    <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        placeholder="Institution"
                        className="input mb-2"
                    />
                    <input
                        type="number"
                        value={edu.graduation_year}
                        onChange={(e) => updateEducation(index, 'graduation_year', parseInt(e.target.value))}
                        placeholder="Graduation Year"
                        className="input mb-2"
                    />
                    <button
                        onClick={() => removeEducation(index)}
                        className="btn bg-red-500 hover:bg-red-600 text-white mt-2"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                onClick={addEducation}
                className="btn w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
                Add Education
            </button>
        </div>
    );
};

export default EducationForm;