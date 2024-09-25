import logo from './logo.svg';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <header className="text-center">
        <img src={logo} className="h-40 animate-spin-slow" alt="logo" />
        <p className="text-lg mt-4">
          Edit <code className="bg-gray-200 px-2 py-1 rounded">src/App.js</code> and save to reload.
        </p>
        <a
          className="text-blue-500 hover:text-blue-700 text-xl mt-4 inline-block"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hactivators
        </a>
      </header>
    </div>
  );
}

export default App;
