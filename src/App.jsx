import RepoCard from './components/RepoCard';
import './App.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [searchKey, setSearchKey] = useState(null);
  const [page, setPage] = useState(1);

  const { status, error, data } = useQuery({
    queryKey: ['repoData', searchKey, page],
    queryFn: () =>
      fetch(
        import.meta.env.VITE_GITHUB_URL +
          `search/repositories?q=${searchKey}&per_page=10&page=${page}`,
      ).then((res) => res.json()),
    enabled: !!searchKey,
  });

  return (
    <>
      <div className="md:m-auto md:max-w-md">
        <div className="w-full bg-white sticky top-0">
          <input
            type="text"
            className="w-full bg-transparent placeholder:text-slate-500 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
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
        <div>
          {status === 'loading' && <p>Loading ...</p>}
          {status === 'error' && (
            <p className="text-red-500">Error: {error.message}</p>
          )}
          {status === 'success' && <RepoCard data={data} />}
        </div>
        <div className="relative bottom-0 inset-x-0 px-2 mb-1">
          <div className="max-w-md mx-auto flex justify-between">
            {/* Bouton Previous */}
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`text-slate-800 flex border border-slate-700 rounded-lg text-sm font-medium px-3 h-8 items-center justify-center gap-1
        ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
            >
              <svg
                className="w-5 h-5 text-slate-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            {/* Bouton Next */}
            <button
              onClick={() => setPage(page + 1)}
              className="text-slate-800 flex border border-slate-700 rounded-lg text-sm font-medium px-3 h-8 items-center justify-center gap-1 hover:bg-slate-100"
            >
              Next
              <svg
                className="w-5 h-5 text-slate-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
