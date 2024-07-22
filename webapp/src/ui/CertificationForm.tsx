import React from 'react';
import {Certification, Resume} from "../gen";

interface Props {
    resume: Resume;
    setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

const CertificationForm: React.FC<Props> = ({ resume, setResume }) => {
    const addCertification = () => {
        const newCertification: Certification = {
            name: '',
            issuer: '',
            year: new Date().getFullYear(),
        };
        setResume(prev => ({ ...prev, certifications: [...(prev.certifications || []), newCertification] }));
    };

    const updateCertification = (index: number, field: keyof Certification, value: string | number) => {
        setResume(prev => ({
            ...prev,
            certifications: (prev.certifications || []).map((cert, i) =>
                i === index ? { ...cert, [field]: value } : cert
            ),
        }));
    };

    const removeCertification = (index: number) => {
        setResume(prev => ({
            ...prev,
            certifications: (prev.certifications || []).filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
            {(resume.certifications || []).map((cert, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(index, 'name', e.target.value)}
                        placeholder="Certification Name"
                        className="input mb-2"
                    />
                    <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                        placeholder="Issuer"
                        className="input mb-2"
                    />
                    <input
                        type="number"
                        value={cert.year}
                        onChange={(e) => updateCertification(index, 'year', parseInt(e.target.value))}
                        placeholder="Year"
                        className="input mb-2"
                    />
                    <button
                        type="button"
                        onClick={() => removeCertification(index)}
                        className="btn bg-red-500 hover:bg-red-600 text-white mt-2"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addCertification}
                className="btn w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
                Add Certification
            </button>
        </div>
    );
};

export default CertificationForm;