
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, CheckCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <Navigation />
      
      <main className="flex-1 flex flex-col">
        <section className="container px-4 md:px-6 pt-32 pb-12 md:pt-40 md:pb-20 flex flex-col items-center justify-center text-center">
          <div className="space-y-4 max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter section-title">
              Create Professional Resumes in Minutes
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[700px] mx-auto">
              Build stunning, ATS-friendly resumes tailored to your career goals with our intuitive resume builder.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/build">
                <Button size="lg" className="button-shine h-12 px-8 text-base">
                  Start Building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="container px-4 md:px-6 py-12 md:py-24">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold section-title mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Create a professional resume in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center p-6 glass-card rounded-lg animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Details</h3>
              <p className="text-muted-foreground">
                Fill in your personal information, work experience, education, and skills
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 glass-card rounded-lg animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Template</h3>
              <p className="text-muted-foreground">
                Select from several professionally designed resume templates
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 glass-card rounded-lg animate-fade-up" style={{ animationDelay: '300ms' }}>
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Download Your Resume</h3>
              <p className="text-muted-foreground">
                Preview your resume and download it as a PDF ready for applications
              </p>
            </div>
          </div>
        </section>
        
        <section className="container px-4 md:px-6 py-12 md:py-24 mb-12">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold section-title mb-4">
              Resume Templates
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from professionally designed templates to showcase your skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group overflow-hidden rounded-lg border border-border shadow-sm transition-all hover:shadow-md animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop"
                  alt="Minimalist Template" 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Minimalist</h3>
                <p className="text-sm text-muted-foreground">Clean and simple design</p>
              </div>
            </div>
            
            <div className="group overflow-hidden rounded-lg border border-border shadow-sm transition-all hover:shadow-md animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=300&auto=format&fit=crop"
                  alt="Modern Template" 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Modern</h3>
                <p className="text-sm text-muted-foreground">Contemporary and professional</p>
              </div>
            </div>
            
            <div className="group overflow-hidden rounded-lg border border-border shadow-sm transition-all hover:shadow-md animate-fade-up" style={{ animationDelay: '300ms' }}>
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=300&auto=format&fit=crop"
                  alt="Professional Template" 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Professional</h3>
                <p className="text-sm text-muted-foreground">Traditional and elegant</p>
              </div>
            </div>
            
            <div className="group overflow-hidden rounded-lg border border-border shadow-sm transition-all hover:shadow-md animate-fade-up" style={{ animationDelay: '400ms' }}>
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=300&auto=format&fit=crop"
                  alt="Creative Template" 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Creative</h3>
                <p className="text-sm text-muted-foreground">Bold and unique design</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/build">
              <Button className="button-shine">
                Start Building Your Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border">
        <div className="container px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">ResumeBuildr</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ResumeBuildr. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
