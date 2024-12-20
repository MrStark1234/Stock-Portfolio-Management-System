# Stock Portfolio Management System

## Project Overview
This Stock Portfolio Management System provides functionality for users to track and manage their stock holdings, calculate portfolio values, and view transaction histories. It integrates with external APIs to fetch stock prices dynamically.

### Features:
1. **User Portfolio Management**:
   - Add and remove stock holdings.
   - Calculate total portfolio value.
   - View individual stock performance.
   - Record buy and sell transactions.

2. **Stock Data Management**:
   - Store current stock prices dynamically.
   - Provide basic stock information, such as symbol, current price, and daily change.

3. **Transaction Tracking**:
   - Record stock purchases and sales.
   - Calculate gains and losses.
   - Maintain a history of all transactions.

---

## Technologies Used
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **External API**: Alpha Vantage (for stock price data)

---

## API Endpoints

### User Portfolio Endpoints:
1. **Add Stock to Portfolio**:
   - **Endpoint**: `POST /api/portfolio/add`
   - **Body**:
     ```json
     {
       "stockSymbol": "AAPL",
       "quantity": 10,
       "averagePrice": 180
     }
     ```

2. **Remove Stock from Portfolio**:
   - **Endpoint**: `DELETE /api/portfolio/remove/:id`
  

3. **Get Current Portfolio Value**:
   - **Endpoint**: `GET /api/portfolio/value`

4. **List All Holdings**:
   - **Endpoint**: `GET /api/portfolio/holdings`

### Transaction Endpoints:
1. **Record Stock Purchase**:
   - **Endpoint**: `POST /api/transactions/buy`
   - **Body**:
     ```json
     {
       "stockSymbol": "AAPL",
       "quantity": 10,
       "price": 150
     }
     ```

2. **Record Stock Sale**:
   - **Endpoint**: `POST /api/transactions/sell`
   - **Body**:
     ```json
     {
       "stockSymbol": "AAPL",
       "quantity": 5,
       "price": 160
     }
     ```

3. **Retrieve Transaction History**:
   - **Endpoint**: `GET /api/transactions/history`

### Stock Data Endpoints:
1. **Get Current Stock Price**:
   - **Endpoint**: `GET /api/stocks/:symbol`
   - **Example**: `/api/stocks/AAPL`

2. **Get Stock Price History**:
   - **Endpoint**: `GET /api/stocks/history/:symbol`
   - **Example**: `/api/stocks/history/AAPL`

---

## Setup Instructions

### Prerequisites:
- Node.js installed.
- MongoDB installed and running locally or accessible remotely.
- An Alpha Vantage API Key for fetching stock data.

### Installation Steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo-name/stock-portfolio-management.git
   cd stock-portfolio-management
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory with the following:
          
    - I used MongoDB Atlas for Database Storage.
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/stock-portfolio
     JWT_SECRET=your_secret_key
     STOCK_API_URL=https://www.alphavantage.co/query
     STOCK_API_KEY=your_alpha_vantage_api_key
     ```

4. **Run the Server**:
   ```bash
   npm run dev 
                         OR //If Nodemon available
   nodemon server.js
   
   ```

5. **Test the APIs**:
   - Use Thunder Client, Postman, or any API testing tool to test the endpoints listed above.

