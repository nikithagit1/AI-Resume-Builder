
export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrentRole: boolean;
}

export interface Skill {
  name: string;
  proficiency: number; // 1-5
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  headline: string;
  summary: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  templateId: string;
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    headline: '',
    summary: '',
    website: '',
    linkedin: '',
    github: '',
  },
  education: [],
  experience: [],
  skills: [],
  templateId: 'modern',
};

export interface TemplateOption {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export const templates: TemplateOption[] = [
  {
    id: 'modern',
    name: 'Modern',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=300&auto=format&fit=crop',
    description: 'Clean and minimal design with a modern touch',
  },
  {
    id: 'professional',
    name: 'Professional',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=300&auto=format&fit=crop',
    description: 'Traditional and elegant design for corporate environments',
  },
  {
    id: 'creative',
    name: 'Creative',
    imageUrl: 'https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=300&auto=format&fit=crop',
    description: 'Bold design for creative professionals and designers',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300&auto=format&fit=crop',
    description: 'Simple and focused design that highlights your skills',
  },
];
