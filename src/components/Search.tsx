import React, { useState } from 'react';
import { Search as SearchIcon, Sparkles } from 'lucide-react';

export function Search() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-20" />
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What service are you looking for?"
            className="w-full px-8 py-6 text-lg rounded-2xl bg-white/10 backdrop-blur-xl 
                     border border-white/20 text-white placeholder-white/60
                     focus:outline-none focus:border-white/40 transition-all"
          />
          <button className="absolute right-4 flex items-center gap-2 px-4 py-2 rounded-xl 
                         bg-gradient-to-r from-primary to-secondary text-white font-medium
                         hover:opacity-90 transition-opacity">
            <SearchIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Search</span>
          </button>
          <Sparkles className={`absolute left-4 w-5 h-5 transition-opacity duration-300
                            ${query ? 'opacity-100 text-primary' : 'opacity-0'}`} />
        </div>
      </div>
      
      {query && (
        <div className="mt-4 p-4 glass-card">
          <p className="text-white/60 text-sm">
            Popular searches: Design, Development, Marketing...
          </p>
        </div>
      )}
    </div>
  );
}