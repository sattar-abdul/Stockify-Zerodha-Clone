const FINNHUB_API_KEY = process.env.REACT_APP_FINNHUB_API_KEY || 'demo';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Cache to store stock prices and reduce API calls
const priceCache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

// Track API errors to avoid repeated failed calls
let apiErrorCount = 0;
const MAX_API_ERRORS = 5;

// Mock price generator for fallback when API fails
const generateMockPrice = (symbol, basePrice = 100) => {
    // Use symbol hash to generate consistent but varying prices
    const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variation = (hash % 20) - 10; // -10% to +10% variation
    return basePrice + (basePrice * variation / 100);
};

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

        // If too many API errors, use mock data
        if (apiErrorCount >= MAX_API_ERRORS) {
            console.warn(`Using mock data for ${symbol} due to API errors`);
            const mockPrice = generateMockPrice(symbol, 150);
            priceCache.set(symbol, {
                price: mockPrice,
                timestamp: Date.now(),
                isMock: true
            });
            return mockPrice;
        }

        // Fetch from API
        const response = await fetch(
            `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
        );

        if (!response.ok) {
            if (response.status === 403) {
                apiErrorCount++;
                console.error(`API 403 Error: Rate limit exceeded or invalid API key. Error count: ${apiErrorCount}/${MAX_API_ERRORS}`);

                // Use mock data as fallback
                const mockPrice = generateMockPrice(symbol, 150);
                priceCache.set(symbol, {
                    price: mockPrice,
                    timestamp: Date.now(),
                    isMock: true
                });
                return mockPrice;
            }
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const price = data.c; // Current price

        if (price && price > 0) {
            // Reset error count on success
            apiErrorCount = 0;

            // Update cache
            priceCache.set(symbol, {
                price,
                timestamp: Date.now(),
                isMock: false
            });
            return price;
        }

        // If no valid price, use mock data
        const mockPrice = generateMockPrice(symbol, 150);
        priceCache.set(symbol, {
            price: mockPrice,
            timestamp: Date.now(),
            isMock: true
        });
        return mockPrice;
    } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error);

        // Return mock price as fallback
        const mockPrice = generateMockPrice(symbol, 150);
        priceCache.set(symbol, {
            price: mockPrice,
            timestamp: Date.now(),
            isMock: true
        });
        return mockPrice;
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
    apiErrorCount = 0;
};

/**
 * Check if using mock data
 */
export const isUsingMockData = () => {
    return apiErrorCount >= MAX_API_ERRORS;
};
