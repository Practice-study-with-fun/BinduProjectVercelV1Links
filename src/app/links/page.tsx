'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '../../components/ThemeToggle';
import { toast } from 'sonner';
import { getLinksAction, type LinkData } from '../../actions/links.actions';

export default function LinksPage() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [showIframe, setShowIframe] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  const selectedLinkData = selectedLink ? links.find(link => link.id === selectedLink) : null;

  // Fetch links on component mount
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const result = await getLinksAction();
      if (result.success && result.links) {
        setLinks(result.links);
      } else {
        toast.error(result.error || 'Failed to fetch links');
      }
    } catch {
      toast.error('Failed to fetch links');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Links Collection
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle size="sm" />
              <button
                onClick={() => setShowIframe(!showIframe)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{showIframe ? 'Hide' : 'Show'} Preview</span>
              </button>
              <Link
                href="/links-update"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Manage Links
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Loading Links</h3>
            <p className="text-slate-600 dark:text-slate-400">Please wait while we fetch your links...</p>
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">No Links Yet</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Start building your link collection by adding some links.</p>
              <Link
                href="/links-update"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
              >
                Add Your First Link
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Links List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">All Links ({links.length})</h2>
              <div className="space-y-3">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className={`group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-sm border-2 transition-all duration-200 hover:shadow-lg cursor-pointer ${
                      selectedLink === link.id
                        ? 'border-blue-500 dark:border-blue-400 shadow-lg ring-2 ring-blue-500/20 dark:ring-blue-400/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                    onClick={() => setSelectedLink(link.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {link.title}
                          </h3>
                          {link.description && (
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{link.description}</p>
                          )}
                          <div className="flex items-center mt-3 space-x-4">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Visit Link
                            </a>
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                              Added {link.createdAt.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <div className={`w-3 h-3 rounded-full transition-colors ${
                            selectedLink === link.id ? 'bg-blue-500 dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-600'
                          }`} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Iframe Preview */}
            {showIframe && (
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200 dark:border-slate-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        {selectedLinkData ? (
                          <span className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Live Preview</span>
                          </span>
                        ) : (
                          'Select a link to preview'
                        )}
                      </h3>
                      {selectedLinkData && (
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2 bg-white/50 dark:bg-slate-600/50 rounded-lg px-3 py-1">
                            <svg className="w-3 h-3 text-slate-400 dark:text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate max-w-xs">
                              {selectedLinkData.title}
                            </span>
                          </div>
                          <a
                            href={selectedLinkData.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
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
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 relative">
                    {selectedLinkData ? (
                      <div className="relative w-full h-full">
                        <iframe
                          src={selectedLinkData.url}
                          className="w-full h-full border-0 rounded-b-xl"
                          title={selectedLinkData.title}
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-navigation"
                        />
                        <div className="absolute inset-0 border-2 border-transparent rounded-b-xl pointer-events-none"></div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Preview Ready</h4>
                          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                            Click on any link card to see a live preview of the website here
                          </p>
                          <div className="flex items-center justify-center mt-4 space-x-1">
                            <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                            <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                            <div className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
