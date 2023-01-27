import { Link } from 'react-router-dom';
import { BinType } from '../types';

interface MyBinsProps {
  bins: BinType[];
}

function MyBins({ bins }: MyBinsProps) {
  return (
    <div className="mb-28 mt-12 sm:mt-20">
      <h3 className="text-3xl font-medium text-neutral-500">My Bins</h3>
      {bins.length > 0 ? (
        bins.map((bin) => {
          const { bin_id: binId, name, requests } = bin;

          return (
            <Link key={binId} to={`/bin/${binId}`}>
              <div className="mt-4 flex items-start justify-between rounded-lg border border-neutral-200 bg-white px-6 py-3 animate-in fade-in slide-in-from-bottom-1 duration-700 hover:border-amber-500 hover:bg-amber-50 sm:items-center">
                <div>
                  <h4 className="text font-medium text-amber-600">{name}</h4>
                  <p className="mt-1 font-mono text-sm text-neutral-400">
                    {binId}
                  </p>
                </div>
                <span className="flex-shrink-0 text-neutral-500">
                  {requests.length}{' '}
                  {requests.length === 1 ? 'request' : 'requests'}
                </span>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="mt-3 text-neutral-500">No bins created yet</p>
      )}
    </div>
  );
}

export default MyBins;
