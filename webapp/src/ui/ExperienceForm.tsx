import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {Experience, Resume} from '../gen';

interface Props {
    resume: Resume;
    setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

const ExperienceForm: React.FC<Props> = ({resume, setResume}) => {
    const addExperience = () => {
        const newExperience: Experience = {
            title: '',
            location: '',
            company: '',
            start_date: '',
            end_date: '',
            responsibilities: [],
        };
        setResume(prev => ({...prev, experience: [...prev.experience, newExperience]}));
    };

    const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.map((exp, i) =>
                i === index ? {...exp, [field]: value} : exp
            ),
        }));
    };

    const addResponsibility = (index: number) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.map((exp, i) =>
                i === index ? {...exp, responsibilities: [...exp.responsibilities, '']} : exp
            ),
        }));
    };

    const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.map((exp, i) =>
                i === expIndex ? {
                    ...exp,
                    responsibilities: exp.responsibilities.map((resp, j) => j === respIndex ? value : resp)
                } : exp
            ),
        }));
    };

    const removeResponsibility = (expIndex: number, respIndex: number) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.map((exp, i) =>
                i === expIndex ? {
                    ...exp,
                    responsibilities: exp.responsibilities.filter((_, j) => j !== respIndex)
                } : exp
            ),
        }));
    }

    const removeExperience = (index: number) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            {resume.experience.map((exp, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => updateExperience(index, 'title', e.target.value)}
                        placeholder="Job Title"
                        className="input mb-2"
                    />
                    <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        placeholder="Company"
                        className="input mb-2"
                    />
                    <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(index, 'location', e.target.value)}
                        placeholder="Location"
                        className="input mb-2"
                    />
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                            type="date"
                            value={exp.start_date}
                            onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                            className="input"
                        />
                        <input
                            type="date"
                            value={exp.end_date || ''}
                            onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                            className="input"
                        />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Responsibilities</h3>
                        {exp.responsibilities.map((resp, respIndex) => (
                            <div key={respIndex} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={resp}
                                    onChange={(e) => updateResponsibility(index, respIndex, e.target.value)}
                                    placeholder={`Responsibility ${respIndex + 1}`}
                                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeResponsibility(index, respIndex)}
                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    <XMarkIcon className="h-5 w-5"/>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addResponsibility(index)}
                            className="btn bg-blue-500 hover:bg-blue-600 text-white mt-2"
                        >
                            Add Responsibility
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="btn bg-red-500 hover:bg-red-600 text-white mt-4"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addExperience}
                className="btn w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
                Add Experience
            </button>
        </div>
    );
};

export default ExperienceForm;