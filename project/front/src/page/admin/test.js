import { useState } from 'react';

export default function DynamicTabs() {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Tab 1', content: 'Content 1' },
    { id: 2, title: 'Tab 2', content: 'Content 2' }
  ]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const addTab = () => {
    const newTab = {
      id: tabs.length + 1,
      title: `Tab ${tabs.length + 1}`,
      content: `Content ${tabs.length + 1}`
    };
    setTabs([...tabs, newTab]);
  };

  const removeTab = (tabId) => {
    setTabs(tabs.filter(tab => tab.id !== tabId));
  };

  return (
    <div>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTabId(tab.id)}
          style={{ fontWeight: activeTabId === tab.id ? 'bold' : 'normal' }}
        >
          {tab.title}
        </button>
      ))}
      <button onClick={addTab}>Add Tab</button>
      
      {tabs.map(tab => (
        activeTabId === tab.id && <div key={tab.id}>
          {tab.content}
          <button onClick={()=>removeTab(tab.id)}>삭제</button>
        </div>
      ))}
    </div>
  );
}
