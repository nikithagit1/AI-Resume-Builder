
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeData, initialResumeData, templates, TemplateOption } from '@/lib/resumeData';
import TemplateCard from '@/components/TemplateCard';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TemplateSelection = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load saved resume data from local storage
    const savedResumeData = localStorage.getItem('resumeData');
    if (savedResumeData) {
      const parsedData = JSON.parse(savedResumeData) as ResumeData;
      setResumeData(parsedData);
      setSelectedTemplate(parsedData.templateId || 'modern');
    } else {
      // If no data, redirect back to build page
      navigate('/build');
      toast.error('Please fill out your resume information first');
    }
  }, [navigate]);
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };
  
  const handleContinue = () => {
    if (!selectedTemplate) {
      toast.error('Please select a template');
      return;
    }
    
    // Update the template selection
    const updatedResumeData = {
      ...resumeData,
      templateId: selectedTemplate
    };
    
    // Save updated resume data
    localStorage.setItem('resumeData', JSON.stringify(updatedResumeData));
    
    // Navigate to preview
    navigate('/preview');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <Navigation />
      
      <main className="flex-1 container px-4 md:px-6 py-24 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 section-title">
              Choose a Template
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the design that best showcases your professional profile
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-up">
            {templates.map((template: TemplateOption) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate === template.id}
                onSelect={handleSelectTemplate}
              />
            ))}
          </div>
          
          <div className="flex justify-between animate-fade-up">
            <Button 
              variant="outline" 
              onClick={() => navigate('/build')}
              className="space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Edit</span>
            </Button>
            
            <Button 
              onClick={handleContinue}
              className="space-x-2"
            >
              <span>Preview Resume</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateSelection;
