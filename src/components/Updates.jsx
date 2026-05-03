import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Lightbulb, ExternalLink, Filter, MapPin, RefreshCw, Home } from 'lucide-react';
import { updatesData } from '../data/updatesData';

const Updates = ({ setMode }) => {
  const [activeTab, setActiveTab] = useState('latest');
  const [regionFilter, setRegionFilter] = useState('All');
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiFailed, setApiFailed] = useState(false);

  const fetchNews = async () => {
    setIsLoading(true);
    setApiFailed(false);
    
    try {
      // Using a public CORS proxy (AllOrigins) to fetch Google News RSS, then parsing it.
      // This allows us to get real live news in the browser without a paid API key.
      const rssUrl = encodeURIComponent('https://news.google.com/rss/search?q=Indian+Elections&hl=en-IN&gl=IN&ceid=IN:en');
      const response = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
      // Parse RSS XML
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "text/xml");
      const items = Array.from(xml.querySelectorAll('item')).slice(0, 15); // Get top 15 news
      
      if (items.length === 0) throw new Error('No news items found');

      const parsedNews = items.map((item, index) => {
        // Google News title format: "Article Title - Source Name"
        const fullTitle = item.querySelector('title')?.textContent || '';
        const titleParts = fullTitle.split(' - ');
        const source = titleParts.length > 1 ? titleParts.pop() : 'News Source';
        const title = titleParts.join(' - ');
        
        return {
          id: `live_news_${index}`,
          title: title,
          source: source,
          date: item.querySelector('pubDate')?.textContent || new Date().toISOString(),
          summary: 'Click to read the full coverage from the source.', // RSS often has messy HTML in descriptions, keeping it clean
          url: item.querySelector('link')?.textContent || '#',
          category: 'News',
          isImportant: false,
          region: 'National' // Defaulting live news to national
        };
      });

      setNews(parsedNews);
    } catch (error) {
      console.error('Error fetching live news:', error);
      setApiFailed(true);
      setNews(updatesData.fallbackNews);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Get data based on active tab
  const getTabContent = () => {
    let content = [];
    if (activeTab === 'latest') content = news;
    if (activeTab === 'important') content = updatesData.important;
    if (activeTab === 'tips') content = updatesData.tips;

    // Apply region filter
    if (regionFilter !== 'All') {
      content = content.filter(item => item.region === 'National' || item.region === regionFilter);
    }

    return content;
  };

  const displayedContent = getTabContent();

  const regions = ['All', 'National', 'Maharashtra', 'Delhi', 'Karnataka'];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '2rem' }}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="btn" onClick={() => setMode('menu')} style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
            <Home size={24} />
          </button>
          <div>
            <h2 style={{ margin: 0, color: 'white', fontSize: '2rem' }}>Election Updates</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Real-time news, deadlines, and voter tips.</p>
          </div>
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2" style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <MapPin size={16} color="var(--text-muted)" />
          <select 
            value={regionFilter} 
            onChange={(e) => setRegionFilter(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            {regions.map(r => <option key={r} value={r} style={{background: '#1e293b'}}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <button 
          onClick={() => setActiveTab('latest')}
          className="flex items-center gap-2"
          style={{ padding: '0.5rem 1rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s', background: activeTab === 'latest' ? '#3b82f6' : 'transparent', color: activeTab === 'latest' ? 'white' : 'var(--text-muted)' }}
        >
          <Bell size={18} /> Live News
        </button>
        <button 
          onClick={() => setActiveTab('important')}
          className="flex items-center gap-2"
          style={{ padding: '0.5rem 1rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s', background: activeTab === 'important' ? '#e11d48' : 'transparent', color: activeTab === 'important' ? 'white' : 'var(--text-muted)' }}
        >
          <AlertTriangle size={18} /> Important
        </button>
        <button 
          onClick={() => setActiveTab('tips')}
          className="flex items-center gap-2"
          style={{ padding: '0.5rem 1rem', borderRadius: '2rem', border: 'none', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s', background: activeTab === 'tips' ? '#138808' : 'transparent', color: activeTab === 'tips' ? 'white' : 'var(--text-muted)' }}
        >
          <Lightbulb size={18} /> Voter Tips
        </button>

        {activeTab === 'latest' && (
           <button onClick={fetchNews} disabled={isLoading} className="btn" style={{ marginLeft: 'auto', padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', opacity: isLoading ? 0.5 : 1 }}>
             <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} color="white" />
           </button>
        )}
      </div>

      {/* API Fallback Warning */}
      {apiFailed && activeTab === 'latest' && (
        <div style={{ padding: '1rem', background: 'rgba(255, 153, 51, 0.1)', border: '1px solid #FF9933', borderRadius: '0.5rem', color: '#FF9933', marginBottom: '1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={18} />
          Could not connect to live news feed. Showing cached updates.
        </div>
      )}

      {/* Content Feed */}
      <div className="flex flex-col gap-4">
        {isLoading && activeTab === 'latest' ? (
          // Skeleton Loaders
          [1, 2, 3].map(i => (
            <div key={i} className="card animate-pulse" style={{ padding: '1.5rem' }}>
              <div style={{ height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', width: '70%', marginBottom: '1rem' }}></div>
              <div style={{ height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '40%', marginBottom: '1rem' }}></div>
              <div style={{ height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', width: '90%' }}></div>
            </div>
          ))
        ) : displayedContent.length === 0 ? (
          // Empty State
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <Filter size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <h3 className="text-white text-xl mb-2">No updates found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try changing your region filter to see more results.</p>
          </div>
        ) : (
          // Loaded Cards
          displayedContent.map(item => (
            <div key={item.id} className="card hover-glow" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: item.isImportant ? '4px solid #e11d48' : '1px solid var(--glass-border)' }}>
              
              {/* Card Header: Category & Region */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '1rem', background: item.isImportant ? 'rgba(225, 29, 72, 0.2)' : 'rgba(59, 130, 246, 0.2)', color: item.isImportant ? '#e11d48' : '#3b82f6' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <MapPin size={10} /> {item.region}
                  </span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatDate(item.date)}</span>
              </div>

              {/* Title & Summary */}
              <div>
                <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.summary}</p>
              </div>

              {/* Footer: Source & Link */}
              <div className="flex justify-between items-center mt-2 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Source: <span style={{color: '#a8b3cf'}}>{item.source}</span></div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#3b82f6', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
                  Read More <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Updates;
