const axios = require("axios");

// Environment variables or hardcoded values
const API_KEY = "3Y7J0I6BGT53GJPC"; // Replace with your actual API key
const STOCK_API_URL = "https://www.alphavantage.co/query"; // Alpha Vantage endpoint

// Fetch daily stock quotes for multiple symbols
async function getBulkStockQuotes(symbols) {
  const symbolList = symbols.split(","); // Split the comma-separated symbols
  const stockData = [];

  try {
    for (const symbol of symbolList) {
      const url = `${STOCK_API_URL}?function=TIME_SERIES_DAILY&symbol=${symbol.trim()}&apikey=${API_KEY}`;
      console.log(`Fetching data for: ${symbol}, URL: ${url}`);

      const response = await axios.get(url);

      // Parse the response
      const dailyData = response.data["Time Series (Daily)"];
      if (dailyData) {
        const latestDate = Object.keys(dailyData)[0]; // Get the most recent date
        const latestQuote = dailyData[latestDate];

        stockData.push({
          symbol: symbol.trim(),
          open: parseFloat(latestQuote["1. open"]),
          high: parseFloat(latestQuote["2. high"]),
          low: parseFloat(latestQuote["3. low"]),
          close: parseFloat(latestQuote["4. close"]),
          volume: parseInt(latestQuote["5. volume"]),
          updatedAt: new Date(latestDate).toLocaleString(),
        });
      } else {
        console.warn(`No data available for symbol: ${symbol}`);
      }
    }

    return stockData;
  } catch (error) {
    console.error("Error fetching stock quotes:", error.message);
    throw error;
  }
}

module.exports = { getBulkStockQuotes };
