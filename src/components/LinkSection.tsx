import React from 'react';
import SectionHeader from './SectionHeader';
import LinkCard from './LinkCard';

interface DashboardLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}

interface LinkSectionProps {
  title: string;
  links: DashboardLink[];
  collapsed?: boolean;
  onToggleCollapse: () => void;
  onDeleteSection: () => void;
  onDeleteLink: (linkName: string) => void;
  className?: string;
}

const LinkSection: React.FC<LinkSectionProps> = ({
  title,
  links,
  collapsed = false,
  onToggleCollapse,
  onDeleteSection,
  onDeleteLink,
  className = ''
}) => {
  return (
    <div className={`section ${className}`}>
      <SectionHeader 
        title={title}
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
        onDelete={onDeleteSection}
      />
      
      {!collapsed && (
        <div className="links-grid">
          {links.map((link) => (
            <LinkCard 
              key={link.name}
              name={link.name}
              url={link.url}
              icon={link.icon}
              color={link.color}
              onDelete={() => onDeleteLink(link.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkSection; 