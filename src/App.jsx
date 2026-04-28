import { useState } from 'react';

function App() {
  const [domain, setDomain] = useState('');
  const [excludeDomains, setExcludeDomains] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const categories = [
    {
      name: 'Log Files',
      dork: 'ext:log',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      )
    },
    {
      name: 'Config Files',
      dork: 'ext:env OR ext:config OR ext:conf OR ext:yml OR ext:ini',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      )
    },
    {
      name: 'Admin Panels',
      dork: 'inurl:admin OR inurl:login OR inurl:dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
      )
    },
    {
      name: 'SQL Errors',
      dork: '"SQL syntax" OR "MySQL Error" OR "Warning: mysql_connect"',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
      )
    },
    {
      name: 'Exposed Docs',
      dork: 'ext:pdf OR ext:doc OR ext:docx OR ext:xls OR ext:xlsx OR ext:txt',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
      )
    },
    {
      name: 'SQL Injection Vulnerabilities',
      dork: 'inurl:"id=" intext:"warning: mysql_fetch"',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      )
    },
    {
      name: 'Exposed FTP Servers',
      dork: 'intitle:"index of" inurl:ftp',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
      )
    },
    {
      name: 'Open Webcams',
      dork: 'inurl:"/view/index.shtml" OR inurl:"/view/view.shtml"',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      )
    },
    {
      name: 'Directory Listing',
      dork: 'intitle:"index of /" -html -htm -php',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 00.707.293h5.586a2 2 0 012 2v2M4 10h18M4 10a2 2 0 00-2 2v4a2 2 0 002 2h18a2 2 0 002-2v-4a2 2 0 00-2-2h-2m-6 4h4" /></svg>
      )
    }
  ];

  const handleSearch = (dork, categoryName) => {
    if (!domain || domain.trim() === '') {
      setError('⚠️ Masukkan domain terlebih dahulu!');
      return;
    }
    if (!domain.includes('.')) {
      setError('⚠️ Format domain tidak valid! Contoh: example.com');
      return;
    }
    setError('');

    let finalQuery = `site:${domain} ${dork}`;

    if (excludeDomains.trim() !== '') {
      const excludes = excludeDomains.split(',').map(d => d.trim()).filter(d => d !== '');
      if (excludes.length > 0) {
        finalQuery += ' ' + excludes.map(d => `-site:${d}`).join(' ');
      }
    }

    const newHistoryItem = {
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      domain,
      categoryName,
      query: finalQuery
    };

    setHistory([newHistoryItem, ...history]);

    const url = `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReopen = (query) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-4xl flex flex-col items-center flex-grow">

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4 border border-blue-500/20">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 tracking-tight mb-3">
            Google Dorking Tool
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Alat bantu analisis keamanan untuk menemukan informasi spesifik pada sebuah domain menggunakan teknik Google Dorks.
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full max-w-md mb-12">
          <div className="flex flex-col gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <input
                type="text"
                id="domain"
                className="block w-full pl-11 pr-4 py-4 bg-gray-900 border border-gray-800 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-lg"
                placeholder="Masukkan domain (contoh: target.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    document.getElementById('exclude').focus();
                  }
                }}
              />
            </div>

            {/* Exclude Domain Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500 group-focus-within:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <input
                type="text"
                id="exclude"
                className="block w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition-all shadow-inner text-sm"
                placeholder="Kecualikan domain (contoh: github.com, stackoverflow.com)"
                value={excludeDomains}
                onChange={(e) => setExcludeDomains(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    document.getElementById('exclude').blur();
                  }
                }}
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-500 font-medium animate-pulse">{error}</p>
          )}
        </div>

        {/* Categories Grid */}
        <div className="w-full">
          <h2 className="text-lg font-semibold text-gray-300 mb-4 px-1">Kategori Pencarian</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => handleSearch(cat.dork, cat.name)}
                className="group relative px-6 py-5 bg-gray-900 border border-gray-800 hover:border-blue-500/50 rounded-2xl shadow-sm hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-colors duration-300" />
                <div className="p-2 bg-gray-800 rounded-lg text-blue-400 group-hover:text-blue-300 group-hover:bg-gray-700/50 transition-colors">
                  {cat.icon}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-gray-200 group-hover:text-white transition-colors">{cat.name}</span>
                  <span className="text-xs text-gray-500 truncate max-w-full mt-1 font-mono" title={cat.dork}>
                    {cat.dork}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tutorial Section */}
        <div className="w-full mt-16">
          <h2 className="text-xl font-bold text-gray-200 mb-6 flex items-center justify-center gap-2">
            <span>🛠️</span> Cara Menggunakan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Step 1 */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute -right-4 -top-6 text-8xl font-black text-blue-500/10 select-none">1</div>
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 z-10 border border-blue-500/20">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-200 mb-2 z-10">Masukkan Domain</h3>
              <p className="text-gray-400 text-sm z-10">
                Ketik nama domain target pada kolom pencarian di atas. Contoh: <code className="text-blue-300">example.com</code>
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute -right-4 -top-6 text-8xl font-black text-indigo-500/10 select-none">2</div>
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 z-10 border border-indigo-500/20">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-200 mb-2 z-10">Pilih Kategori</h3>
              <p className="text-gray-400 text-sm z-10">
                Klik salah satu kategori dorking sesuai informasi yang ingin kamu cari
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute -right-4 -top-6 text-8xl font-black text-purple-500/10 select-none">3</div>
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 z-10 border border-purple-500/20">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-200 mb-2 z-10">Analisis Hasil</h3>
              <p className="text-gray-400 text-sm z-10">
                Google akan menampilkan hasil pencarian spesifik. Gunakan hanya untuk keperluan edukasi dan ethical hacking
              </p>
            </div>

          </div>
        </div>

        {/* History Section */}
        <div className="w-full mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
              <span>📋</span> Riwayat Pencarian
            </h2>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors border border-red-500/20 flex items-center gap-1.5"
              >
                <span>🗑️</span> Hapus Riwayat
              </button>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            {history.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Belum ada riwayat pencarian
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-800/50 text-gray-400 border-b border-gray-800">
                    <tr>
                      <th className="px-6 py-4 font-medium">Waktu</th>
                      <th className="px-6 py-4 font-medium">Domain</th>
                      <th className="px-6 py-4 font-medium">Kategori</th>
                      <th className="px-6 py-4 font-medium text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {history.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4 text-gray-400 font-mono text-xs">{item.time}</td>
                        <td className="px-6 py-4 text-gray-200 font-medium">{item.domain}</td>
                        <td className="px-6 py-4 text-blue-400">{item.categoryName}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleReopen(item.query)}
                            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 rounded-lg transition-colors border border-blue-500/20"
                            title={item.query}
                          >
                            <span>🔍</span> Buka Lagi
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Footer Disclaimer */}
      <footer className="mt-16 w-full max-w-3xl">
        <div className="px-6 py-5 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl text-center">
          <h3 className="text-yellow-500/90 font-bold mb-2 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            DISCLAIMER
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Alat ini disediakan secara eksklusif untuk tujuan <strong className="text-gray-300">edukasi dan pengujian keamanan yang etis (ethical hacking)</strong>.
            Penggunaan alat ini untuk menyerang target tanpa persetujuan tertulis dari pemilik sistem adalah tindakan ilegal.
            Pengembang tidak bertanggung jawab atas penyalahgunaan atau kerusakan yang diakibatkan oleh penggunaan alat ini.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
