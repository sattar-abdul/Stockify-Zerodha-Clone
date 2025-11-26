const FINNHUB_API_KEY = process.env.REACT_APP_FINNHUB_API_KEY || 'demo';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Cache to store stock prices and reduce API calls
const priceCache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

/**
 * Fetch real-time stock price from Finnhub API
 * @param {string} symbol - Stock symbol (e.g., 'AAPL', 'RELIANCE.NS')
 * @returns {Promise<number|null>} Current price or null if error
 */
export const getStockPrice = async (symbol) => {
    try {
        // Check cache first
        const cached = priceCache.get(symbol);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return cached.price;
        }

        // Fetch from API
        const response = await fetch(
            `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const price = data.c; // Current price

        if (price && price > 0) {
            // Update cache
            priceCache.set(symbol, {
                price,
                timestamp: Date.now()
            });
            return price;
        }

        return null;
    } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error);
        return null;
    }
};

/**
 * Fetch prices for multiple stocks
 * @param {string[]} symbols - Array of stock symbols
 * @returns {Promise<Object>} Object with symbol as key and price as value
 */
export const getBulkStockPrices = async (symbols) => {
    const prices = {};

    // Fetch all prices in parallel
    const promises = symbols.map(async (symbol) => {
        const price = await getStockPrice(symbol);
        prices[symbol] = price;
    });

    await Promise.all(promises);
    return prices;
};

/**
 * Convert Indian stock symbol to Finnhub format
 * @param {string} symbol - Stock symbol (e.g., 'RELIANCE')
 * @returns {string} Finnhub format symbol (e.g., 'RELIANCE.NS')
 */
export const toFinnhubSymbol = (symbol) => {
    // If already has suffix, return as is
    if (symbol.includes('.NS') || symbol.includes('.BO')) {
        return symbol;
    }

    // Default to NSE (.NS) for Indian stocks
    return `${symbol}.NS`;
};

/**
 * Clear the price cache
 */
export const clearCache = () => {
    priceCache.clear();
};
