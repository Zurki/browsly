import React from 'react';
import LinkSection from './LinkSection';

interface DashboardLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}

interface LinkSectionData {
  title: string;
  links: DashboardLink[];
  collapsed?: boolean;
}

interface DashboardContentProps {
  sections: LinkSectionData[];
  searchQuery: string;
  onToggleSectionCollapse: (sectionTitle: string) => void;
  onDeleteSection: (sectionTitle: string) => void;
  onDeleteLink: (sectionTitle: string, linkName: string) => void;
  className?: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  sections,
  searchQuery,
  onToggleSectionCollapse,
  onDeleteSection,
  onDeleteLink,
  className = ''
}) => {
  // Filter links based on search query
  const filteredSections = searchQuery.trim() === '' 
    ? sections 
    : sections.map(section => ({
        ...section,
        links: section.links.filter(link => 
          link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.url.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.links.length > 0);

  return (
    <main className={className}>
      {filteredSections.length > 0 ? (
        filteredSections.map((section) => (
          <LinkSection 
            key={section.title}
            title={section.title}
            links={section.links}
            collapsed={section.collapsed}
            onToggleCollapse={() => onToggleSectionCollapse(section.title)}
            onDeleteSection={() => onDeleteSection(section.title)}
            onDeleteLink={(linkName) => onDeleteLink(section.title, linkName)}
          />
        ))
      ) : (
        <div className="no-results">
          <p>No links found matching "{searchQuery}"</p>
        </div>
      )}
    </main>
  );
};

export default DashboardContent; 