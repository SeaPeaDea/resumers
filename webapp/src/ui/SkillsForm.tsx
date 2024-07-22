import React, { useState } from 'react';
import { Resume } from '../gen';

interface Props {
    resume: Resume;
    setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

const SkillsForm: React.FC<Props> = ({ resume, setResume }) => {
    const [newSkill, setNewSkill] = useState('');

    const addSkill = () => {
        if (newSkill.trim()) {
            setResume(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
            setNewSkill('');
        }
    };

    const removeSkill = (index: number) => {
        setResume(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    className="input flex-grow"
                />
                <button
                    type="button"
                    onClick={addSkill}
                    className="btn bg-blue-500 hover:bg-blue-600 text-white"
                >
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {resume.skills.map((skill, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md">
                        <span>{skill}</span>
                        <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SkillsForm;