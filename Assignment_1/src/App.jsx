import { useState, useEffect, useMemo } from 'react';

const MOCK_COINS = [
    { id: 1, name: 'Bitcoin', ticker: 'BTC', price: 64000 },
    { id: 2, name: 'Ethereum', ticker: 'ETH', price: 3500 },
    { id: 3, name: 'Solana', ticker: 'SOL', price: 150 },
    { id: 4, name: 'Cardano', ticker: 'ADA', price: 0.60 },
    { id: 5, name: 'Polkadot', ticker: 'DOT', price: 8.50 }
];

// ==========================================
// 1. CHILD COMPONENTS (PROPS PASSING)
// ==========================================

const Controls = ({ /* TODO: Destructure props here */
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  theme,
  setTheme
 }) => {
    return (
        <div className="controls">
            {/* TODO: Bind input value and onChange to searchTerm/setSearchTerm */
            }
            <input
                data-testid="search-input"
                placeholder="Search coins..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                
            />

            {/* TODO: Bind select value and onChange to sortBy/setSortBy */}
            <select 
                data-testid="sort-select"
                value={sortBy}
                onChange={(e)=> setSortBy(e.target.value)}  >
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
            </select>

            {/* TODO: Add onClick to toggle theme between 'light' and 'dark' */}
            <button 
                  data-testid="theme-toggle"
                  onClick= {() =>
                  setTheme(theme =='light' ? 'dark' : 'light')}>
                Current Theme: {theme}
            </button>
        </div>
    );
};

const CryptoList = ({coins }) => {
    // TODO: Use the passed 'coins' prop instead of an empty array

    return (
        <div data-testid="crypto-list">
            {coins.map(coin => (
                <div key={coin.id} data-testid={`coin-${coin.ticker}`}>
                    {coin.name} ({coin.ticker}) - ${coin.price}
                </div>
            ))}
        </div>
    );
};

// ==========================================
// 2. PARENT DASHBOARD COMPONENT
// ==========================================

export default function App() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('price-desc');
    const [theme, setTheme] = useState('light');

    // TODO: useEffect 1 - Fetch data after 500ms

    useEffect( () => {
      const timer = setTimeout(() => {
        setCoins(MOCK_COINS);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }, []);

    // TODO: useMemo - Filter and Sort the coins array.
    // IMPORTANT: Add this line inside your useMemo callback for grading:
    // window.memoExecutionCount = (window.memoExecutionCount || 0) + 1;
    const filteredAndSortedCoins = useMemo(( ) => {

    // TODO: useEffect 2 - Update document.title based on filteredAndSortedCoins.length

    window.memoExecutionCount  = (window.memoExecutionCount || 0) + 1;

        const filteredCoins = coins.filter((coin) => {
            const search = searchTerm.toLowerCase();

            return(
              coin.name.toLowerCase().includes(search) ||
              coin.name.toLowerCase().includes(search)
          );
        });
            
        const sortedCoins = [...filteredCoins] ;
        if(sortBy === 'price-asc'){
          sortedCoins.sort((a,b) => 
            a.price - b.price);
          }else if(sortBy === 'price-desc'){
          sortedCoins.sort((a,b) =>
            b.price - a.price);
          }

          return sortedCoins;
        } , [coins, searchTerm,sortBy]);
    


        useEffect(( ) => {
          document.title = `Tracker - ${filteredAndSortedCoins.length} coins`;

        },[filteredAndSortedCoins]);



    return (
        <div className={`app ${theme}`} data-testid="app-container">
            <h1>Crypto Tracker</h1>

            {/* TODO: Pass necessary props to Controls */}
            <Controls 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            theme={theme}
            setTheme={setTheme}
            />

            {loading ? (
                <p data-testid="loading-text">Fetching live data...</p>
            ) : (
                /* TODO: Pass filteredAndSortedCoins to CryptoList */
                <CryptoList
                coins={filteredAndSortedCoins} />
            )}
        </div>
    );
}
