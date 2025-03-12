import { useState, useEffect } from 'react'
import './App.css'
import WebSearch from './components/WebSearch'
import DashboardSearch from './components/DashboardSearch'
import KeyboardShortcutsHint from './components/KeyboardShortcutsHint'
import FloatingAddButton from './components/FloatingAddButton'
import DashboardHeader from './components/DashboardHeader'
import DashboardContent from './components/DashboardContent'
import AddLinkForm from './components/AddLinkForm'
import AddCategoryModal from './components/AddCategoryModal'
import NotificationsManager, { NotificationItem } from './components/NotificationsManager'
import { LinkSection } from './types'
import { loadDarkMode, loadSections, saveDarkMode, saveSections } from './utils/storageUtils'

// Common emojis for quick selection
const commonEmojis = [
  "🔗", "📝", "📋", "📊", "📈", "📉", "📌", "📎", "🔍", "🔎", 
  "📁", "📂", "📄", "📑", "🔖", "📚", "📰", "🗞️", "📓", "📔", 
  "📕", "📗", "📘", "📙", "📒", "📃", "📜", "📯", "📮", "📫", 
  "📬", "📭", "📧", "📨", "📩", "📤", "📥", "📦", "📪", "📆", 
  "📅", "📇", "🗒️", "🗓️", "📈", "📉", "📊", "📋", "📌", "📍", 
  "📎", "🖇️", "📏", "📐", "✂️", "🔒", "🔓", "🔏", "🔐", "🔑", 
  "🗝️", "🔨", "🪓", "⛏️", "⚒️", "🛠️", "🗡️", "⚔️", "🔫", "🏹", 
  "🛡️", "🪚", "🔧", "🪛", "🔩", "⚙️", "🗜️", "⚖️", "🦯", "🔗", 
  "⛓️", "🧰", "🧲", "⚗️", "🧪", "🧫", "🧬", "🔬", "🔭", "📡", 
  "💉", "🩸", "💊", "🩹", "🩺", "🚪", "🛗", "🪞", "🪟", "🛏️", 
  "🛋️", "🪑", "🚽", "🪠", "🚿", "🛁", "🪤", "🪒", "🧴", "🧷", 
  "🧹", "🧺", "🧻", "🧼", "🧽", "🧯", "🛒", "🚬", "⚰️", "⚱️", 
  "🗿", "🪧", "🏧", "🚮", "🚰", "♿", "🚹", "🚺", "🚻", "🚼", 
  "🚾", "🛂", "🛃", "🛄", "🛅", "⚠️", "🚸", "⛔", "🚫", "🚳", 
  "🚭", "🚯", "🚱", "🚷", "📵", "🔞", "☢️", "☣️", "⬆️", "↗️", 
  "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️", "↕️", "↔️", "↩️", "↪️", 
  "⤴️", "⤵️", "🔃", "🔄", "🔙", "🔚", "🔛", "🔜", "🔝", "🛐", 
  "⚛️", "🕉️", "✡️", "☸️", "☯️", "✝️", "☦️", "☪️", "☮️", "🕎", 
  "🔯", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", 
  "♒", "♓", "⛎", "🔀", "🔁", "🔂", "▶️", "⏩", "⏭️", "⏯️", "◀️", 
  "⏪", "⏮️", "🔼", "⏫", "🔽", "⏬", "⏸️", "⏹️", "⏺️", "⏏️", "🎦", 
  "🔅", "🔆", "📶", "📳", "📴", "♀️", "♂️", "⚧️", "✖️", "➕", 
  "➖", "➗", "♾️", "‼️", "⁉️", "❓", "❔", "❕", "❗", "〰️", "💱", 
  "💲", "⚕️", "♻️", "⚜️", "🔱", "📛", "🔰", "⭕", "✅", "☑️", 
  "✔️", "❌", "❎", "➰", "➿", "〽️", "✳️", "✴️", "❇️", "©️", "®️", 
  "™️", "#️⃣", "*️⃣", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", 
  "7️⃣", "8️⃣", "9️⃣", "🔟", "🔠", "🔡", "🔢", "🔣", "🔤", "🅰️", 
  "🆎", "🅱️", "🆑", "🆒", "🆓", "ℹ️", "🆔", "Ⓜ️", "🆕", "🆖", 
  "🅾️", "🆗", "🅿️", "🆘", "🆙", "🆚", "🈁", "🈂️", "🈷️", "🈶", 
  "🈯", "🉐", "🈹", "🈚", "🈲", "🉑", "🈸", "🈴", "🈳", "㊗️", 
  "㊙️", "🈺", "🈵", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", 
  "⚫", "⚪", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫", "⬛", 
  "⬜", "◼️", "◻️", "◾", "◽", "▪️", "▫️", "🔶", "🔷", "🔸", "🔹", 
  "🔺", "🔻", "💠", "🔘", "🔳", "🔲"
];

// Common colors for quick selection
const commonColors = [
  "#FF6B6B", "#FF8E53", "#FFDA77", "#4ECDC4", "#1A535C", "#4361EE", 
  "#3A0CA3", "#7209B7", "#F72585", "#4CC9F0", "#06D6A0", "#118AB2", 
  "#EF476F", "#FFD166", "#073B4C", "#F15BB5", "#9B5DE5", "#00BBF9", 
  "#00F5D4", "#E63946", "#457B9D", "#1D3557", "#F4A261", "#E76F51",
  "#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51", "#577590",
  "#43AA8B", "#90BE6D", "#F9C74F", "#F8961E", "#F3722C", "#F94144"
];

// Default sections if none are found in storage
const defaultSections: LinkSection[] = [
  {
    title: "Work",
    links: [
      { name: "Jira", url: "https://www.atlassian.com/software/jira", icon: "📋", color: "#0052CC" },
      { name: "Confluence", url: "https://www.atlassian.com/software/confluence", icon: "📝", color: "#0065FF" },
    ],
    collapsed: false
  },
  {
    title: "Fun",
    links: [
      { name: "Reddit", url: "https://www.reddit.com", icon: "🔍", color: "#FF4500" },
      { name: "YouTube", url: "https://www.youtube.com", icon: "▶️", color: "#FF0000" },
      { name: "Kleinanzeigen", url: "https://www.kleinanzeigen.de", icon: "🛒", color: "#86B817" },
    ],
    collapsed: false
  }
];

function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    // Use our utility function to load dark mode preference
    const savedMode = loadDarkMode();
    if (savedMode !== null) {
      return savedMode;
    }
    // Otherwise use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // State to control the visibility of the add link form
  const [showAddForm, setShowAddForm] = useState(false);
  
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // State for adding a new category
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // State for notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Update body class and localStorage when dark mode changes
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    saveDarkMode(darkMode);
  }, [darkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      if (loadDarkMode() === null) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Initial state with predefined links
  const [sections, setSections] = useState<LinkSection[]>(() => {
    return loadSections(defaultSections);
  });
  
  // Save sections to localStorage when they change
  useEffect(() => {
    const success = saveSections(sections);
    if (!success) {
      addNotification('Failed to save your links. Storage may be full.', 'error');
    }
  }, [sections]);

  // State for the new link form
  const [newLink, setNewLink] = useState<{
    section: string;
    name: string;
    url: string;
    icon: string;
    color: string;
  }>({
    section: sections[0]?.title || "Work",
    name: "",
    url: "",
    icon: "🔗",
    color: "#5b7db1"
  });

  // Function to add a notification
  const addNotification = (message: string, type: 'success' | 'error' | 'info', duration = 3000) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type, duration }]);
  };

  // Function to dismiss a notification
  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Function to add a new link
  const addNewLink = () => {
    if (!newLink.name || !newLink.url) return;
    
    setSections(prevSections => 
      prevSections.map(section => {
        if (section.title === newLink.section) {
          return {
            ...section,
            links: [...section.links, {
              name: newLink.name,
              url: newLink.url.startsWith('http') ? newLink.url : `https://${newLink.url}`,
              icon: newLink.icon,
              color: newLink.color || undefined
            }]
          };
        }
        return section;
      })
    );

    // Show success notification
    addNotification(`Added "${newLink.name}" to ${newLink.section}`, 'success');

    // Reset form
    setNewLink({
      section: newLink.section,
      name: "",
      url: "",
      icon: "🔗",
      color: "#5b7db1"
    });
    
    // Hide the form after adding
    setShowAddForm(false);
  };
  
  // Function to add a new category
  const addNewCategory = () => {
    if (!newCategoryName.trim()) return;
    
    setSections(prev => [
      ...prev,
      {
        title: newCategoryName,
        links: [],
        collapsed: false
      }
    ]);
    
    // Show success notification
    addNotification(`Added new category "${newCategoryName}"`, 'success');
    
    setNewCategoryName('');
    setShowAddCategory(false);
  };
  
  // Function to toggle section collapse
  const toggleSectionCollapse = (sectionTitle: string) => {
    setSections(prevSections => 
      prevSections.map(section => {
        if (section.title === sectionTitle) {
          return {
            ...section,
            collapsed: !section.collapsed
          };
        }
        return section;
      })
    );
  };
  
  // Function to delete a link
  const deleteLink = (sectionTitle: string, linkName: string) => {
    setSections(prevSections => 
      prevSections.map(section => {
        if (section.title === sectionTitle) {
          return {
            ...section,
            links: section.links.filter(link => link.name !== linkName)
          };
        }
        return section;
      })
    );
    
    // Show success notification
    addNotification(`Deleted "${linkName}" from ${sectionTitle}`, 'info');
  };
  
  // Function to delete a section
  const deleteSection = (sectionTitle: string) => {
    setSections(prevSections => 
      prevSections.filter(section => section.title !== sectionTitle)
    );
    
    // Show success notification
    addNotification(`Deleted category "${sectionTitle}"`, 'info');
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  
  // Handle form data changes
  const handleFormDataChange = (data: Partial<typeof newLink>) => {
    setNewLink(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="dashboard">
      <DashboardHeader 
        title="Browsly"
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Web Search Component */}
      <WebSearch onNotify={addNotification} />
      
      {/* Dashboard Search Component */}
      <DashboardSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />
      
      {showAddForm && (
        <AddLinkForm 
          sections={sections}
          formData={newLink}
          onFormDataChange={handleFormDataChange}
          onAddLink={addNewLink}
          onAddCategory={() => setShowAddCategory(true)}
          commonEmojis={commonEmojis}
          commonColors={commonColors}
        />
      )}
      
      {showAddCategory && (
        <AddCategoryModal 
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
          onAddCategory={addNewCategory}
          onCancel={() => setShowAddCategory(false)}
        />
      )}
      
      <DashboardContent 
        sections={sections}
        searchQuery={searchQuery}
        onToggleSectionCollapse={toggleSectionCollapse}
        onDeleteSection={deleteSection}
        onDeleteLink={deleteLink}
      />

      <FloatingAddButton showAddForm={showAddForm} setShowAddForm={setShowAddForm} />
      
      <KeyboardShortcutsHint />
      
      {/* Notifications */}
      <NotificationsManager 
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  )
}

export default App
