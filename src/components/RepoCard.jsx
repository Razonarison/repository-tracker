import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function RepoCard() {
  const [searchKey] = useState('java');

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData', searchKey],
    queryFn: () =>
      fetch(
        import.meta.env.VITE_GITHUB_URL +
          `search/repositories?q=${searchKey}&per_page=10`,
      ).then((res) => res.json()),
  });

  if (isPending) return <p>Loading ...</p>;

  if (error) return <p className="text-red-500">error {error.message}</p>;

  return (
    <>
      {data &&
        data.items &&
        data.items.map((item, idx) => (
          <div key={idx} className="p-2 m-2">
            <p className="font-bold">{item.full_name}</p>
            <p className="break-all m-1">{item.description}</p>
            <div className="flex">
              <img
                src={item.owner.avatar_url}
                className="mask-radial-at-center rounded-full w-10"
              />
              <div className="m-1 leading-3">
                <p>{item.owner.login}</p>
                <p className="text-gray-400 text-sm">
                  {item.owner.user_view_type}
                </p>
              </div>
            </div>

            <p>{item.language}</p>
          </div>
        ))}
    </>
  );
}

export default RepoCard;
