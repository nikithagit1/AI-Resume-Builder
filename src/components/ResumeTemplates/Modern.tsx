
import React from 'react';
import { ResumeData } from '@/lib/resumeData';
import { Phone, Mail, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

const Modern: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills } = data;
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-[800px] mx-auto font-sans">
      <div className="bg-primary p-8 text-white">
        <h1 className="text-3xl font-bold mb-1">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <h2 className="text-xl opacity-90 mb-4">{personalInfo.headline}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {(personalInfo.city || personalInfo.state) && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-2">
              <Linkedin className="h-4 w-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center space-x-2">
              <Github className="h-4 w-4" />
              <span>{personalInfo.github}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-8">
        {personalInfo.summary && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary border-b border-gray-200 pb-1 mb-3">Professional Summary</h3>
            <p className="text-gray-600">{personalInfo.summary}</p>
          </div>
        )}
        
        {experience.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary border-b border-gray-200 pb-1 mb-3">Experience</h3>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-medium">{exp.position}</h4>
                      <h5 className="text-sm text-gray-700">{exp.company}</h5>
                    </div>
                    <div className="text-sm text-gray-500">
                      {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {' - '}
                      {exp.isCurrentRole ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {education.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary border-b border-gray-200 pb-1 mb-3">Education</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-medium">{edu.degree} in {edu.fieldOfStudy}</h4>
                      <h5 className="text-sm text-gray-700">{edu.institution}</h5>
                    </div>
                    <div className="text-sm text-gray-500">
                      {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      {' - '}
                      {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </div>
                  </div>
                  {edu.description && <p className="mt-2 text-sm text-gray-600">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-primary border-b border-gray-200 pb-1 mb-3">Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-1 text-gray-700">{skill.name}</div>
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-2 w-2 rounded-full ${i < skill.proficiency ? 'bg-primary' : 'bg-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modern;
