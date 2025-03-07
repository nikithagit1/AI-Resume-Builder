
import React from 'react';
import { ResumeData } from '@/lib/resumeData';

interface MinimalistTemplateProps {
  data: ResumeData;
}

const Minimalist: React.FC<MinimalistTemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills } = data;
  
  return (
    <div className="bg-white max-w-[800px] mx-auto p-10 font-sans">
      <header className="mb-10">
        <h1 className="text-3xl font-light mb-1 text-gray-900 tracking-tight">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-lg font-light text-gray-700 mb-4">{personalInfo.headline}</h2>
        
        <div className="text-sm text-gray-600 space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {(personalInfo.city || personalInfo.state) && (
            <div>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</div>
          )}
          
          <div className="flex space-x-4 mt-2">
            {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
            {personalInfo.github && <div>{personalInfo.github}</div>}
            {personalInfo.website && <div>{personalInfo.website}</div>}
          </div>
        </div>
      </header>
      
      {personalInfo.summary && (
        <section className="mb-10">
          <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-4">About</h3>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}
      
      {experience.length > 0 && (
        <section className="mb-10">
          <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Experience</h3>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-base font-medium text-gray-900">{exp.position}</h4>
                  <span className="text-sm text-gray-500">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {' — '}
                    {exp.isCurrentRole ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </span>
                </div>
                <h5 className="text-sm text-gray-700 mb-2">{exp.company}</h5>
                <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {education.length > 0 && (
        <section className="mb-10">
          <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Education</h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-base font-medium text-gray-900">{edu.institution}</h4>
                  <span className="text-sm text-gray-500">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {' — '}
                    {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </span>
                </div>
                <h5 className="text-sm text-gray-700 mb-2">{edu.degree} in {edu.fieldOfStudy}</h5>
                {edu.description && <p className="text-sm text-gray-600">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {skills.length > 0 && (
        <section>
          <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-gray-100 px-3 py-1 text-sm text-gray-800 rounded"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Minimalist;
