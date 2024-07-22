import React from 'react';
import { Resume } from '../gen';

interface Props {
    resume: Resume;
    setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

const PersonalInfoForm: React.FC<Props> = ({ resume, setResume }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResume(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={resume.name}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={resume.title}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={resume.location}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium mb-1">LinkedIn URL</label>
                    <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={resume.linkedin}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={resume.email}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={resume.phone}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
            </div>
            <div className="mt-4">
                <label htmlFor="summary" className="block text-sm font-medium mb-1">Professional Summary</label>
                <textarea
                    id="summary"
                    name="summary"
                    value={resume.summary}
                    onChange={handleChange}
                    rows={4}
                    className="input"
                />
            </div>
        </div>
    );
};

export default PersonalInfoForm;