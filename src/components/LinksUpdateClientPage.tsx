'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLinks, type Link as LinkType } from '../contexts/LinksContext';
import { ThemeToggle } from './ThemeToggle';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LinksUpdateClientPageProps {
  user: User;
}

export default function LinksUpdateClientPage({ user }: LinksUpdateClientPageProps) {
  const { links, addLink, updateLink, deleteLink } = useLinks();
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedLinkForPreview, setSelectedLinkForPreview] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.url) {
      alert('Please fill in the required fields (Title and URL)');
      return;
    }

    try {
      new URL(formData.url);
    } catch {
      alert('Please enter a valid URL');
      return;
    }

    if (editingId) {
      updateLink(editingId, formData.title, formData.url, formData.description);
      setEditingId(null);
    } else {
      addLink(formData.title, formData.url, formData.description);
    }

    setFormData({ title: '', url: '', description: '' });
    setShowForm(false);
  };

  const handleEdit = (link: LinkType) => {
    setFormData({
      title: link.title,
      url: link.url,
      description: link.description || '',
    });
    setEditingId(link.id);
    setShowForm(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteLink(id);
      if (selectedLinkForPreview === id) {
        setSelectedLinkForPreview(null);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', url: '', description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const selectedPreviewLink = selectedLinkForPreview ? links.find(link => link.id === selectedLinkForPreview) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/links" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Manage Links
              </h1>
              <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium">
                Admin: {user.name}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle size="sm" />
              <Link
                href="/links"
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                View Links
              </Link>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {showForm ? 'Cancel' : 'Add New Link'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form and Links List */}
          <div className="space-y-6">
            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">
                    {editingId ? 'Edit Link' : 'Add New Link'}
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      placeholder="Enter link title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      URL *
                    </label>
                    <input
                      type="url"
                      id="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      placeholder="https://example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      placeholder="Optional description"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-medium"
                    >
                      {editingId ? 'Update Link' : 'Add Link'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Links List */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    All Links ({links.length})
                  </h2>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Click to preview • Actions to manage
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {links.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">No links yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">Add your first link to get started</p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Add Link
                    </button>
                  </div>
                ) : (
                  links.map((link) => (
                    <div key={link.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => setSelectedLinkForPreview(link.id)}
                        >
                          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            {link.title}
                          </h3>
                          {link.description && (
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 line-clamp-2">{link.description}</p>
                          )}
                          <div className="flex items-center mt-2 space-x-4">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors truncate max-w-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {link.url}
                            </a>
                            <span className="text-xs text-slate-400">
                              {link.createdAt.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="ml-4 flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(link)}
                            className="p-2 text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                            title="Edit link"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(link.id, link.title)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete link"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <div className={`w-3 h-3 rounded-full ${
                            selectedLinkForPreview === link.id ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-600'
                          }`} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Iframe Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {selectedPreviewLink ? 'Link Preview' : 'Select a link to preview'}
                  </h3>
                  {selectedPreviewLink && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
                        {selectedPreviewLink.title}
                      </span>
                      <a
                        href={selectedPreviewLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        title="Open in new tab"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="aspect-video bg-slate-100 dark:bg-slate-700">
                {selectedPreviewLink ? (
                  <iframe
                    src={selectedPreviewLink.url}
                    className="w-full h-full border-0"
                    title={selectedPreviewLink.title}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-navigation"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">
                        Click on any link to see its live preview
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}