
import Modern from './Modern';
import Professional from './Professional';
import Creative from './Creative';
import Minimalist from './Minimalist';
import { ResumeData } from '@/lib/resumeData';

export interface ResumeTemplateProps {
  data: ResumeData;
}

export const getTemplateComponent = (templateId: string) => {
  switch (templateId) {
    case 'modern':
      return Modern;
    case 'professional':
      return Professional;
    case 'creative':
      return Creative;
    case 'minimalist':
      return Minimalist;
    default:
      return Modern;
  }
};

export { Modern, Professional, Creative, Minimalist };
