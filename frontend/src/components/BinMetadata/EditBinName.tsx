import { useState } from 'react';
import binService from '../../services/binService';

interface EditBinNameProps {
  binId: string;
  binName: string;
}

function EditBinName({ binId, binName }: EditBinNameProps) {
  const [previousBinName, setPreviousBinName] = useState(binName);
  const [currentBinName, setCurrentBinName] = useState(binName);
  const [editing, setEditing] = useState(false);

  const updateBinName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await binService.renameBin(binId, currentBinName);
    setPreviousBinName(currentBinName);
    setEditing(false);
  };

  const cancelEditBinName = () => {
    setCurrentBinName(previousBinName);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <form onSubmit={updateBinName} className="mt-6 sm:flex sm:items-end">
          <input
            id="bin_name"
            type="text"
            name="bin_name"
            value={currentBinName}
            placeholder="Bin Name"
            className="mt-2 block w-80 max-w-full appearance-none rounded-lg border-neutral-300 text-sm text-neutral-600 shadow-sm placeholder:text-neutral-400 focus:border-amber-600 focus:ring-amber-600"
            onChange={(e) => setCurrentBinName(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 ml-0 inline-block rounded-lg border border-amber-600 py-2 px-4 text-sm font-semibold uppercase tracking-wider text-amber-600 hover:bg-amber-50 sm:ml-4 sm:mt-0"
          >
            Update
          </button>
          <button
            type="button"
            className="mt-2 ml-0 inline-block rounded-lg border border-neutral-600 py-2 px-4 text-sm font-semibold uppercase tracking-wider text-neutral-600 hover:bg-neutral-50 sm:ml-4 sm:mt-0"
            onClick={cancelEditBinName}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          type="button"
          className="group mt-9 flex cursor-pointer items-center"
          onClick={() => setEditing(true)}
        >
          <h2 className="text-2xl font-semibold text-amber-600 group-hover:text-amber-500">
            {currentBinName}
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="ml-2 mt-1 h-5 w-5 text-neutral-400 group-hover:text-amber-500"
          >
            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default EditBinName;
