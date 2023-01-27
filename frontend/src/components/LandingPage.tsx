import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BinType } from '../types';

import MyBins from './MyBins';

import binService from '../services/binService';

function LandingPage() {
  const [binIdInput, setBinIdInput] = useState('');
  const [myBins, setMyBins] = useState<BinType[]>([]);
  const [retriveBinError, setRetrieveBinError] = useState('');

  const navigate = useNavigate();

  // Create empty bin and navigate to its page
  const handleCreateBin = async () => {
    const { binId }: { binId: string } = await binService.createBin();
    if (!binId) return;

    const binData: BinType = await binService.getBin(binId);
    localStorage.setItem('local_bins', JSON.stringify([...myBins, binData]));

    navigate(`/bin/${binId}`);
  };

  // Retrieve bin by ID
  const handleRetrieveBin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!binIdInput) {
      setRetrieveBinError(`Please enter an ID`);
      return;
    }

    const binData: BinType = await binService.getBin(binIdInput);
    if (!binData) {
      setRetrieveBinError(`Bin ${binIdInput} does not exist`);
      return;
    }

    navigate(`/bin/${binIdInput}`);
  };

  // Initial data fetch for the My Bins list
  useEffect(() => {
    const fetchLocalBins = async () => {
      const localBins: BinType[] = JSON.parse(
        localStorage.getItem('local_bins') || '[]'
      );

      if (localBins.length > 0) {
        const updatedLocalBins: BinType[] = await Promise.all(
          localBins.map((bin) => binService.getBin(bin.bin_id))
        );
        setMyBins(updatedLocalBins);
      }
    };

    fetchLocalBins();
  }, []);

  return (
    <div className="relative mx-auto mt-12 max-w-3xl px-2 sm:mt-20 sm:px-4">
      {/* Logo */}
      <div>
        <img
          src="/jaguar.png"
          alt="Jaguar"
          className="absolute top-0 -z-10 w-11/12"
        />
        <h1 className="bg-gradient-to-r from-rose-500 to-amber-400 bg-clip-text pt-20 pb-2 text-center text-5xl font-extrabold italic tracking-wider text-transparent sm:pb-3 sm:pt-40 sm:text-[104px]">
          JaguarBin
        </h1>
        <h2 className="text-md text-center font-medium italic text-neutral-500 sm:mt-2 sm:text-2xl">
          Collect, inspect, and debug HTTP requests and webhooks
        </h2>
      </div>

      {/* Create new bin */}
      <div className="mt-20 flex flex-col sm:mt-32 sm:flex-row sm:items-end sm:justify-between">
        <div className="sm:max-w-md md:max-w-lg">
          <h3 className="text-xl font-medium text-neutral-600">
            Create a new bin
          </h3>
          <p className="mt-3 text-neutral-500">
            Generate an endpoint URL that you can provide to 3rd party services.
            Requests to this URL can be inspected in the dashboard.
          </p>
        </div>
        <button
          type="button"
          className="mt-4 inline-block h-11 w-40 rounded-lg bg-amber-600 font-semibold uppercase tracking-wider text-white hover:bg-amber-500 sm:mt-0"
          onClick={handleCreateBin}
        >
          CREATE
        </button>
      </div>

      {/* Retrieve existing bin by ID */}
      <form className="mt-8 sm:mt-16" onSubmit={handleRetrieveBin}>
        <h3 className="text-xl font-medium text-neutral-600">
          Retrieve an existing bin by ID
        </h3>
        <div className="sm:flex sm:items-end sm:justify-between">
          <input
            id="bin_id"
            type="text"
            name="bin_id"
            value={binIdInput}
            placeholder="5ac74abf-aea1-4866-9942-fd9f3367b27e"
            className="mt-4 block w-96 max-w-full appearance-none rounded-lg border-neutral-300 font-mono text-sm text-neutral-600 shadow-sm placeholder:text-neutral-400 focus:border-amber-600 focus:ring-amber-600"
            onChange={(e) => setBinIdInput(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 inline-block h-11 w-40 rounded-lg bg-amber-600 font-semibold uppercase tracking-wider text-white hover:bg-amber-500 sm:mt-0"
          >
            RETRIEVE
          </button>
        </div>
        {retriveBinError && (
          <p className="mt-1 text-sm text-red-500">{retriveBinError}</p>
        )}
      </form>

      {/* Links to bins in localStorage */}
      <MyBins bins={myBins} />

      {/* Image attribution */}
      <p className="text-center">
        <a
          href="https://www.vecteezy.com/vector-art/6923588-panther-silhouette-vector-logo"
          target="_blank"
          rel="noreferrer"
          className="pb-12 text-center text-xs text-neutral-300"
        >
          Panther image from Vecteezy
        </a>
      </p>
    </div>
  );
}

export default LandingPage;
