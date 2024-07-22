import React from 'react';
import {Resume} from '../gen';
import PersonalInfoForm from './PersonalInfoForm';
import SkillsForm from './SkillsForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import CertificationForm from './CertificationForm';
import StyleForm from './StyleForm';

interface Props {
    resume: Resume;
    setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

const ResumeForm: React.FC<Props> = ({ resume, setResume}) => {
    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <PersonalInfoForm resume={resume} setResume={setResume}/>
                    <SkillsForm resume={resume} setResume={setResume}/>
                    <StyleForm resume={resume} setResume={setResume}/>
                </div>
                <div className="space-y-8">
                    <ExperienceForm resume={resume} setResume={setResume}/>
                    <EducationForm resume={resume} setResume={setResume}/>
                    <CertificationForm resume={resume} setResume={setResume}/>
                </div>
            </form>
        </div>
    );
};

export default ResumeForm;