
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeData, Education, Experience, Skill, initialResumeData } from '@/lib/resumeData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { 
  User, Briefcase, GraduationCap, Award, 
  PlusCircle, Trash, ChevronRight, Save
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumeFormProps {
  initialData?: ResumeData;
  onSave: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ 
  initialData = initialResumeData,
  onSave 
}) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();
  
  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };
  
  const addEducation = () => {
    const newEducation: Education = {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation]
    });
  };
  
  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    
    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };
  
  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    
    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };
  
  const addExperience = () => {
    const newExperience: Experience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrentRole: false
    };
    
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience]
    });
  };
  
  const updateExperience = (index: number, field: string, value: any) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience
    });
  };
  
  const removeExperience = (index: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience
    });
  };
  
  const addSkill = () => {
    const newSkill: Skill = {
      name: '',
      proficiency: 3
    };
    
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill]
    });
  };
  
  const updateSkill = (index: number, field: string, value: any) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: field === 'proficiency' ? Number(value) : value
    };
    
    setResumeData({
      ...resumeData,
      skills: updatedSkills
    });
  };
  
  const removeSkill = (index: number) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    
    setResumeData({
      ...resumeData,
      skills: updatedSkills
    });
  };
  
  const handleSubmit = () => {
    onSave(resumeData);
    navigate('/templates');
  };
  
  const isTabComplete = (tab: string): boolean => {
    switch (tab) {
      case 'personal':
        const { firstName, lastName, email, phone } = resumeData.personalInfo;
        return !!(firstName && lastName && email && phone);
      case 'education':
        return resumeData.education.length > 0 && 
               resumeData.education.every(edu => edu.institution && edu.degree);
      case 'experience':
        return resumeData.experience.length > 0 && 
               resumeData.experience.every(exp => exp.company && exp.position);
      case 'skills':
        return resumeData.skills.length > 0 && 
               resumeData.skills.every(skill => skill.name);
      default:
        return false;
    }
  };
  
  const canProceed = isTabComplete(activeTab);
  
  const getNextTab = (): string => {
    const tabs = ['personal', 'education', 'experience', 'skills'];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (currentIndex < tabs.length - 1) {
      return tabs[currentIndex + 1];
    }
    
    return activeTab;
  };
  
  const handleNextTab = () => {
    if (canProceed) {
      const nextTab = getNextTab();
      setActiveTab(nextTab);
      
      // If we're on the last tab and all tabs are complete, submit
      if (activeTab === 'skills' && 
          isTabComplete('personal') && 
          isTabComplete('education') && 
          isTabComplete('experience') && 
          isTabComplete('skills')) {
        handleSubmit();
      }
    }
  };
  
  return (
    <div className="form-container animate-fade-in">
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger 
            value="personal"
            className={cn(
              "relative",
              isTabComplete('personal') && "after:content-['✓'] after:absolute after:top-1 after:right-1 after:text-xs after:text-green-500"
            )}
          >
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger 
            value="education"
            className={cn(
              "relative",
              isTabComplete('education') && "after:content-['✓'] after:absolute after:top-1 after:right-1 after:text-xs after:text-green-500"
            )}
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Education</span>
          </TabsTrigger>
          <TabsTrigger 
            value="experience"
            className={cn(
              "relative",
              isTabComplete('experience') && "after:content-['✓'] after:absolute after:top-1 after:right-1 after:text-xs after:text-green-500"
            )}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Experience</span>
          </TabsTrigger>
          <TabsTrigger 
            value="skills"
            className={cn(
              "relative",
              isTabComplete('skills') && "after:content-['✓'] after:absolute after:top-1 after:right-1 after:text-xs after:text-green-500"
            )}
          >
            <Award className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Skills</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6 animate-fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName"
                value={resumeData.personalInfo.firstName}
                onChange={e => updatePersonalInfo('firstName', e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName"
                value={resumeData.personalInfo.lastName}
                onChange={e => updatePersonalInfo('lastName', e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="headline">Professional Headline</Label>
            <Input 
              id="headline"
              value={resumeData.personalInfo.headline}
              onChange={e => updatePersonalInfo('headline', e.target.value)}
              placeholder="Senior Software Engineer"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea 
              id="summary"
              value={resumeData.personalInfo.summary}
              onChange={e => updatePersonalInfo('summary', e.target.value)}
              placeholder="A brief overview of your professional background and key strengths"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={e => updatePersonalInfo('email', e.target.value)}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone"
                type="tel"
                value={resumeData.personalInfo.phone}
                onChange={e => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city"
                value={resumeData.personalInfo.city}
                onChange={e => updatePersonalInfo('city', e.target.value)}
                placeholder="San Francisco"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input 
                id="state"
                value={resumeData.personalInfo.state}
                onChange={e => updatePersonalInfo('state', e.target.value)}
                placeholder="California"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn (optional)</Label>
              <Input 
                id="linkedin"
                value={resumeData.personalInfo.linkedin || ''}
                onChange={e => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub (optional)</Label>
              <Input 
                id="github"
                value={resumeData.personalInfo.github || ''}
                onChange={e => updatePersonalInfo('github', e.target.value)}
                placeholder="github.com/johndoe"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="education" className="space-y-6 animate-fade-up">
          {resumeData.education.map((edu, index) => (
            <Card key={index} className="relative overflow-hidden">
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={() => removeEducation(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input 
                    id={`institution-${index}`}
                    value={edu.institution}
                    onChange={e => updateEducation(index, 'institution', e.target.value)}
                    placeholder="University of California, Berkeley"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`}>Degree</Label>
                    <Input 
                      id={`degree-${index}`}
                      value={edu.degree}
                      onChange={e => updateEducation(index, 'degree', e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`field-${index}`}>Field of Study</Label>
                    <Input 
                      id={`field-${index}`}
                      value={edu.fieldOfStudy}
                      onChange={e => updateEducation(index, 'fieldOfStudy', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                    <Input 
                      id={`startDate-${index}`}
                      type="month"
                      value={edu.startDate}
                      onChange={e => updateEducation(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>
                    <Input 
                      id={`endDate-${index}`}
                      type="month"
                      value={edu.endDate}
                      onChange={e => updateEducation(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Textarea 
                    id={`description-${index}`}
                    value={edu.description}
                    onChange={e => updateEducation(index, 'description', e.target.value)}
                    placeholder="Relevant coursework, achievements, or activities"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={addEducation}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-6 animate-fade-up">
          {resumeData.experience.map((exp, index) => (
            <Card key={index} className="relative overflow-hidden">
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={() => removeExperience(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Experience #{index + 1}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${index}`}>Company</Label>
                    <Input 
                      id={`company-${index}`}
                      value={exp.company}
                      onChange={e => updateExperience(index, 'company', e.target.value)}
                      placeholder="Google"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`position-${index}`}>Position</Label>
                    <Input 
                      id={`position-${index}`}
                      value={exp.position}
                      onChange={e => updateExperience(index, 'position', e.target.value)}
                      placeholder="Senior Software Engineer"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`expStartDate-${index}`}>Start Date</Label>
                    <Input 
                      id={`expStartDate-${index}`}
                      type="month"
                      value={exp.startDate}
                      onChange={e => updateExperience(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`expEndDate-${index}`}>End Date</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id={`expEndDate-${index}`}
                        type="month"
                        value={exp.isCurrentRole ? '' : exp.endDate}
                        onChange={e => updateExperience(index, 'endDate', e.target.value)}
                        disabled={exp.isCurrentRole}
                      />
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox"
                          id={`currentRole-${index}`}
                          checked={exp.isCurrentRole}
                          onChange={e => updateExperience(index, 'isCurrentRole', e.target.checked)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor={`currentRole-${index}`} className="text-sm">Current</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`expDescription-${index}`}>Description</Label>
                  <Textarea 
                    id={`expDescription-${index}`}
                    value={exp.description}
                    onChange={e => updateExperience(index, 'description', e.target.value)}
                    placeholder="Describe your responsibilities, achievements, and the technologies you used"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={addExperience}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6 animate-fade-up">
          {resumeData.skills.map((skill, index) => (
            <Card key={index} className="relative overflow-hidden">
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8 bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={() => removeSkill(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
              
              <CardContent className="pt-6 pb-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`skillName-${index}`}>Skill</Label>
                  <Input 
                    id={`skillName-${index}`}
                    value={skill.name}
                    onChange={e => updateSkill(index, 'name', e.target.value)}
                    placeholder="JavaScript"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor={`proficiency-${index}`}>Proficiency</Label>
                    <span className="text-sm text-muted-foreground">
                      {['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'][skill.proficiency - 1]}
                    </span>
                  </div>
                  <Slider
                    id={`proficiency-${index}`}
                    min={1}
                    max={5}
                    step={1}
                    value={[skill.proficiency]}
                    onValueChange={(value) => updateSkill(index, 'proficiency', value[0])}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={addSkill}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            const tabs = ['personal', 'education', 'experience', 'skills'];
            const currentIndex = tabs.indexOf(activeTab);
            if (currentIndex > 0) {
              setActiveTab(tabs[currentIndex - 1]);
            }
          }}
          disabled={activeTab === 'personal'}
        >
          Back
        </Button>
        
        <Button
          onClick={handleNextTab}
          disabled={!canProceed}
          className="space-x-2"
        >
          {activeTab === 'skills' ? (
            <>
              <span>Choose Template</span>
              <ChevronRight className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Continue</span>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ResumeForm;
