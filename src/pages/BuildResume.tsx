
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeData, initialResumeData } from '@/lib/resumeData';
import ResumeForm from '@/components/ResumeForm';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';

const BuildResume = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const navigate = useNavigate();
  
  const handleSaveResumeData = (data: ResumeData) => {
    // Save to local storage
    localStorage.setItem('resumeData', JSON.stringify(data));
    setResumeData(data);
    toast.success('Information saved successfully');
    
    // Navigate to template selection
    navigate('/templates');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <Navigation />
      
      <main className="flex-1 container px-4 md:px-6 py-24 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 section-title">
              Build Your Resume
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fill in your details to create a professional resume
            </p>
          </div>
          
          <ResumeForm 
            initialData={resumeData} 
            onSave={handleSaveResumeData}
          />
        </div>
      </main>
    </div>
  );
};

export default BuildResume;
