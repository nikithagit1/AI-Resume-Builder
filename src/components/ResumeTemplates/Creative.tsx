
import React from 'react';
import { ResumeData } from '@/lib/resumeData';
import { Phone, Mail, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
}

const Creative: React.FC<CreativeTemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills } = data;
  
  return (
    <div className="bg-white overflow-hidden max-w-[800px] mx-auto font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="bg-accent col-span-1 p-6 text-white">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full bg-white/20 mb-4 flex items-center justify-center text-3xl font-bold">
              {personalInfo.firstName && personalInfo.firstName[0]}
              {personalInfo.lastName && personalInfo.lastName[0]}
            </div>
            <h1 className="text-xl font-bold text-center">{personalInfo.firstName} {personalInfo.lastName}</h1>
            <h2 className="text-sm opacity-90 text-center">{personalInfo.headline}</h2>
          </div>
          
          <div className="space-y-4 text-sm mb-8">
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
          </div>
          
          {skills.length > 0 && (
            <div>
              <h3 className="uppercase text-xs tracking-wider mb-4 font-bold border-b border-white/20 pb-1">Skills</h3>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{skill.name}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full" 
                        style={{ width: `${skill.proficiency * 20}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="col-span-2 p-8">
          {personalInfo.summary && (
            <div className="mb-8">
              <h3 className="text-accent text-lg font-bold relative">
                About Me
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-accent rounded-full"></span>
              </h3>
              <p className="mt-4 text-gray-700">{personalInfo.summary}</p>
            </div>
          )}
          
          {experience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-accent text-lg font-bold relative">
                Experience
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-accent rounded-full"></span>
              </h3>
              <div className="mt-4 space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-accent before:rounded-full">
                    <div className="flex flex-wrap justify-between items-baseline mb-1">
                      <h4 className="text-gray-800 font-semibold">{exp.position}</h4>
                      <span className="text-sm text-gray-500">
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        {' - '}
                        {exp.isCurrentRole ? 'Present' : exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-2">{exp.company}</div>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {education.length > 0 && (
            <div>
              <h3 className="text-accent text-lg font-bold relative">
                Education
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-accent rounded-full"></span>
              </h3>
              <div className="mt-4 space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-accent before:rounded-full">
                    <div className="flex flex-wrap justify-between items-baseline mb-1">
                      <h4 className="text-gray-800 font-semibold">{edu.degree} in {edu.fieldOfStudy}</h4>
                      <span className="text-sm text-gray-500">
                        {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        {' - '}
                        {edu.endDate && new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mb-2">{edu.institution}</div>
                    {edu.description && <p className="text-gray-600 text-sm">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Creative;
