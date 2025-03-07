
import React from 'react';
import { ResumeData } from '@/lib/resumeData';
import { Phone, Mail, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

const Professional: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills } = data;
  
  return (
    <div className="bg-white shadow-lg max-w-[800px] mx-auto font-serif">
      <div className="text-center p-8 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold tracking-tight mb-1">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{personalInfo.headline}</h2>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4 text-primary" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4 text-primary" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {(personalInfo.city || personalInfo.state) && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-1">
              <Linkedin className="h-4 w-4 text-primary" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-8">
        {personalInfo.summary && (
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-4">Professional Summary</h3>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
        
        {experience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-4">Experience</h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex flex-col mb-2">
                    <h4 className="text-lg font-semibold">{exp.position}</h4>
                    <div className="flex justify-between">
                      <h5 className="text-gray-700 font-medium">{exp.company}</h5>
                      <span className="text-sm text-gray-600">
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        {' - '}
                        {exp.isCurrentRole ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-4">Education</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex flex-col mb-2">
                    <h4 className="text-lg font-semibold">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <div className="flex justify-between">
                      <h5 className="text-gray-700">{edu.institution}</h5>
                      <span className="text-sm text-gray-600">
                        {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        {' - '}
                        {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                  {edu.description && <p className="text-gray-600">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {skills.length > 0 && (
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="bg-gray-100 px-3 py-1 rounded text-gray-800">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Professional;
