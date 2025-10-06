'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Link {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface LinksContextType {
  links: Link[];
  addLink: (title: string, url: string, description?: string) => void;
  updateLink: (id: string, title: string, url: string, description?: string) => void;
  deleteLink: (id: string) => void;
  getLink: (id: string) => Link | undefined;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export const useLinks = () => {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error('useLinks must be used within a LinksProvider');
  }
  return context;
};

interface LinksProviderProps {
  children: ReactNode;
}

export const LinksProvider: React.FC<LinksProviderProps> = ({ children }) => {
  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'Google',
      url: 'https://www.google.com',
      description: 'Search engine',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'GitHub',
      url: 'https://github.com',
      description: 'Code repository platform',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Next.js Documentation',
      url: 'https://nextjs.org/docs',
      description: 'Official Next.js documentation',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const addLink = (title: string, url: string, description?: string) => {
    const newLink: Link = {
      id: Date.now().toString(),
      title,
      url,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLinks(prev => [...prev, newLink]);
  };

  const updateLink = (id: string, title: string, url: string, description?: string) => {
    setLinks(prev =>
      prev.map(link =>
        link.id === id
          ? { ...link, title, url, description, updatedAt: new Date() }
          : link
      )
    );
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const getLink = (id: string): Link | undefined => {
    return links.find(link => link.id === id);
  };

  return (
    <LinksContext.Provider value={{
      links,
      addLink,
      updateLink,
      deleteLink,
      getLink,
    }}>
      {children}
    </LinksContext.Provider>
  );
};