import RepoCard from './components/RepoCard';
import './App.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [searchKey, setSearchKey] = useState(null);

  const { status, error, data } = useQuery({
    queryKey: ['repoData', searchKey],
    queryFn: () =>
      fetch(
        import.meta.env.VITE_GITHUB_URL +
          `search/repositories?q=${searchKey}&per_page=10`,
      ).then((res) => res.json()),
    enabled: !!searchKey,
  });

  return (
    <>
      <div className="md:m-auto md:max-w-md">
        <div className="w-full bg-white sticky top-0">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="ex: Java"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => setSearchKey(inputValue || null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          {status === 'loading' && <p>Loading ...</p>}
          {status === 'error' && (
            <p className="text-red-500">Error: {error.message}</p>
          )}
          {status === 'success' && <RepoCard data={data} />}
        </div>
      </div>
    </>
  );
}

export default App;
