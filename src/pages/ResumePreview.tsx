
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeData, initialResumeData } from '@/lib/resumeData';
import { getTemplateComponent } from '@/components/ResumeTemplates';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { generatePDF } from '@/lib/pdfGenerator';
import { toast } from 'sonner';
import { ArrowLeft, Download, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

const ResumePreview = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load saved resume data from local storage
    const savedResumeData = localStorage.getItem('resumeData');
    if (savedResumeData) {
      const parsedData = JSON.parse(savedResumeData) as ResumeData;
      setResumeData(parsedData);
    } else {
      // If no data, redirect back to build page
      navigate('/build');
      toast.error('Please fill out your resume information first');
    }
  }, [navigate]);
  
  const SelectedTemplate = getTemplateComponent(resumeData.templateId);
  
  const handleGeneratePDF = async () => {
    if (!resumeRef.current) return;
    
    setIsGenerating(true);
    
    try {
      await generatePDF(
        resumeData, 
        'resume-preview',
        `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`
      );
      toast.success('Resume downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <Navigation />
      
      <main className="flex-1 container px-4 md:px-6 py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 section-title">
              Resume Preview
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Review your resume and download it as a PDF
            </p>
          </div>
          
          <div className="mb-8 animate-fade-up">
            <div 
              className="bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl mx-auto"
              style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <div
                id="resume-preview"
                ref={resumeRef}
                className="relative"
              >
                <SelectedTemplate data={resumeData} />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up">
            <Button 
              variant="outline" 
              onClick={() => navigate('/templates')}
              className="space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Change Template</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/build')}
              className="space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Content</span>
            </Button>
            
            <Button 
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className={cn(
                "space-x-2",
                isGenerating && "opacity-80"
              )}
            >
              <Download className="h-4 w-4" />
              <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumePreview;
