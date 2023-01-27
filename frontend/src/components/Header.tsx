import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-neutral-200 pb-2">
      <Link to="/">
        <h1 className="bg-gradient-to-r from-rose-500 to-amber-400 bg-clip-text pb-1 text-4xl font-extrabold italic tracking-wider text-transparent">
          JaguarBin
        </h1>
      </Link>
      <div className="or flex items-center">
        <span className="peer order-last text-4xl hover:scale-110">🐆</span>
        <span className="invisible mr-1 rounded-full bg-amber-100 py-1 px-3 font-bold text-amber-700 peer-hover:visible">
          Roar!
        </span>
      </div>
    </header>
  );
}

export default Header;
