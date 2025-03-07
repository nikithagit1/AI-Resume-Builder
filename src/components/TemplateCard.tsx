
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TemplateOption } from '@/lib/resumeData';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  template: TemplateOption;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  isSelected, 
  onSelect 
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 h-full",
        isSelected ? "ring-2 ring-primary" : "border border-gray-200"
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={template.imageUrl}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-full p-2">
              <Check className="h-6 w-6 text-primary" />
            </div>
          </div>
        )}
      </div>
      
      <CardHeader className="py-4">
        <CardTitle className="text-lg">{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      
      <CardFooter className="pb-4">
        <Button 
          variant={isSelected ? "secondary" : "default"}
          className={cn(
            "w-full",
            isSelected ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
          )}
          onClick={() => onSelect(template.id)}
        >
          {isSelected ? "Selected" : "Select Template"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
