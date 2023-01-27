import EndpointUrl from './EndpointUrl';
import EditName from './EditBinName';

interface BinMetadataProps {
  binId: string;
  binName: string;
}

function BinMetadata({ binId, binName }: BinMetadataProps) {
  return (
    <div className=" border-b border-neutral-200">
      <EditName binId={binId} binName={binName} />
      <EndpointUrl binId={binId} />
    </div>
  );
}

export default BinMetadata;
