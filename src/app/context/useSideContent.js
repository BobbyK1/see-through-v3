// Used for changing the content of the column wrapper 
import { createContext, useContext, useState } from 'react';

const SideContentContext = createContext();

export const useSideContent = () => useContext(SideContentContext);

export const SideContentProvider = ({ children }) => {
    const [sideContent, setSideContent] = useState(null);
    const [title, setTitle] = useState(null);

    // Takes in component set from page component
    const updateContent = (newContent) => {
        setSideContent(newContent);
    };

    // Takes in title set from page component
    const updateTitle = (newTitle) => {
        setTitle(newTitle)
    }

    const clearSideContent = () => {
        setTitle(null);
        setSideContent(null);
    }

    return (
        <SideContentContext.Provider value={{ updateTitle, title, sideContent, updateContent, clearSideContent }}>
            {children}
        </SideContentContext.Provider>
    );
};
