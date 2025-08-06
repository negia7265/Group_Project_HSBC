let express=require('express');
let mysql=require("mysql");
let cors=require("cors");
let app=express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"n3u3da!",
    database:"portfolio"
})
connection.connect((error)=>{
    if(error){
        console.log("MySQL connection failed "+error);
        console.log(error);
    }
    console.log("MySQL connection successful "+connection.threadId);
})
app.get("/user_details",(req,res)=>{
    let query="SELECT * FROM user_details";
    connection.query    
(query,(error,results)=>{
        if(error){
            console.log("Error fetching user details");
            console.log(error);
            res.status(500).send("Error fetching user details");
            return;
        }
        // res.json(results);
        res.json(JSON.parse(JSON.stringify(results)));
        // console.log(results);
    })
    // res.send("Here are your user details!");
})

app.get("/getassets",(req,res)=>{
    let query="SELECT * FROM assets";
    connection.query(query,(error,results)=>{
        if(error){
            console.log("Error fetching assets");
            console.log(error);
            res.status(500).send("Error fetching assets");
            return;
        }
        // res.json(results);
        res.json(JSON.parse(JSON.stringify(results)));
        // console.log(results);
    })

    // res.send("Here are your assets!");
})
app.get("/get_transactions",(req,res)=>{
    let query="SELECT * FROM transactions";
    connection.query(query,(error,results)=>{
        if(error){
            console.log("Error fetching transactions");
            console.log(error);
            res.status(500).send("Error fetching transactions");
            return;
        }
        // res.json(results);
        res.json(JSON.parse(JSON.stringify(results)));
        // console.log(results);
    })
    // res.send("Here are your transactions!");
})
app.get("/getasset/:asset", (req, res) => {
    const assetType = req.params.asset.toLowerCase(); // normalize input
    const validAssetTypes = ['stock', 'bond', 'crypto', 'gold', 'cash'];

    if (!validAssetTypes.includes(assetType)) {
        return res.status(400).json({ error: "Invalid asset type. Valid types: stock, bond, crypto, gold, cash" });
    }

    const query = "SELECT * FROM holdings WHERE asset_type = ?";
    connection.query(query, [assetType], (error, results) => {
        if (error) {
            console.error("Error fetching asset data:", error);
            return res.status(500).send("Error fetching asset data");
        }
        res.json(results);
    });
});
app.get("/total_investment",(req,res)=>{
    let query="SELECT  SUM(buy_price * quantity) AS total_investment FROM holdings";
    connection.query    (query,(error,results)=>{
        if(error){
            console.log("Error fetching total investment");
            console.log(error);
            res.status(500).send("Error fetching total investment");
            return;
        }
        // res.json(results);
        res.json(JSON.parse(JSON.stringify(results)));
        // console.log(results);
    })
    // res.send("Here is your total investment!");  
})
app.get("/get_profit",(req,res)=>{
    let query="SELECT  SUM((current_price - buy_price) * quantity) AS total_profit FROM holdings";
    connection.query(query,(error,results)=>{
        if(error){
            console.log("Error fetching profit");
            console.log(error);
            res.status(500).send("Error fetching profit");
            return;
        }
        // res.json(results);
        res.json(JSON.parse(JSON.stringify(results)));
        // console.log(results);
    })
    // res.send("Here is your profit!");
})
app.get("/get_all_profit",(req,res)=>{
    //ok the improvement that could be made is to add the latest profit to he profit table
    let query="SELECT * FROM profit ORDER BY profit_date DESC LIMIT 15";
    connection.query(query,(error,results)=>{
        if(error){
            console.log("Error fetching all profits");
            console.log(error);
            res.status(500).send("Error fetching all profits");
            return;
        }
        // res.json(results);
        res.json(JSON.parse(JSON.stringify(results)));
        // console.log(results);
    })
    // res.send("Here are all your profits!");
})
app.get("/get_profit_percent/stock", (req, res) => {
    let query="SELECT ROUND(((SUM(quantity * current_price) - SUM(quantity * buy_price)) / SUM(quantity * buy_price)) * 100, 2) AS profit_percent FROM holdings WHERE asset_type = 'stock'";
   
    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching asset data:", error);
            return res.status(500).send("Error fetching asset data");
        }
        console.log(results);

        res.json(JSON.parse(JSON.stringify(results)));
    });
})
app.get("/get_profit_percent/crypto", (req, res) => {
    let query="SELECT ROUND(((SUM(quantity * current_price) - SUM(quantity * buy_price)) / SUM(quantity * buy_price)) * 100, 2) AS profit_percent FROM holdings WHERE asset_type = 'crypto'";
    
    connection.query(query,(error, results) => {
        if (error) {
            console.error("Error fetching asset data:", error);
            return res.status(500).send("Error fetching asset data");
        }
        res.json(JSON.parse(JSON.stringify(results)));
    });
})
app.get("/get_profit_percent/gold", (req, res) => {
    let query="SELECT ROUND(((SUM(quantity * current_price) - SUM(quantity * buy_price)) / SUM(quantity * buy_price)) * 100, 2) AS profit_percent FROM holdings WHERE asset_type = 'gold'";
   
    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching asset data:", error);
            return res.status(500).send("Error fetching asset data");
        }
        res.json(JSON.parse(JSON.stringify(results)));
    });
})
app.get("/get_profit_percent/silver", (req, res) => {
    let query="SELECT ROUND(((SUM(quantity * current_price) - SUM(quantity * buy_price)) / SUM(quantity * buy_price)) * 100, 2) AS profit_percent FROM holdings WHERE asset_type = 'silver'";
    
    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching asset data:", error);
            return res.status(500).send("Error fetching asset data");
        }
        res.json(JSON.parse(JSON.stringify(results)));
    });
})
app.get("/get_asset_shares", (req, res) => {
    let query="SELECT asset_type, ROUND(SUM(quantity * current_price) / SUM(SUM(quantity * current_price)) OVER () * 100,2) AS percent_share FROM holdings GROUP BY asset_type";
    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching asset data:", error);
            return res.status(500).send("Error fetching asset data");
        }
        res.json(JSON.parse(JSON.stringify(results)));
    });
})  
app.get("/get_stock_overview", (req, res) => {
    let query=`
SELECT
    latest.asset_name,
    latest.asset_type,
    latest.ticker_symbol,
    latest.price_date AS latest_date,
    latest.current_price AS latest_price,
    previous.price_date AS previous_date,
    previous.current_price AS previous_price,
    ROUND(((latest.current_price - previous.current_price) / previous.current_price) * 100, 2) AS price_change_percent
FROM assets latest
JOIN assets previous
  ON latest.asset_name = previous.asset_name
WHERE latest.asset_type = 'stock'
  AND previous.asset_type = 'stock'
  AND latest.price_date = (
    SELECT MAX(price_date)
    FROM assets AS a
    WHERE a.asset_name = latest.asset_name
      AND a.asset_type = 'stock'
)
  AND previous.price_date = (
    SELECT MAX(price_date)
    FROM assets AS a
    WHERE a.asset_name = latest.asset_name
      AND a.asset_type = 'stock'
      AND a.price_date < (
          SELECT MAX(price_date)
          FROM assets AS b
          WHERE b.asset_name = latest.asset_name
            AND b.asset_type = 'stock'
      )
)
  AND EXISTS (
    SELECT 1 FROM holdings h 
    WHERE h.asset_name = latest.asset_name 
      AND h.asset_type = 'stock'
  );
`;
    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching stock overview:", error);
            return res.status(500).send("Error fetching stock overview");
        }
        res.json(JSON.parse(JSON.stringify(results)));
    });
})
app.get("/get_crypto_overview", (req, res) => {
    let query=`SELECT
    latest.asset_name,
    latest.asset_type,
    latest.ticker_symbol,
    latest.price_date AS latest_date,
    latest.current_price AS latest_price,
    previous.price_date AS previous_date,
    previous.current_price AS previous_price,
    ROUND(((latest.current_price - previous.current_price) / previous.current_price) * 100, 2) AS price_change_percent
FROM assets latest
JOIN assets previous
  ON latest.asset_name = previous.asset_name
WHERE latest.asset_type = 'crypto'
  AND previous.asset_type = 'crypto'
  AND latest.price_date = (
    SELECT MAX(price_date)
    FROM assets AS a
    WHERE a.asset_name = latest.asset_name
      AND a.asset_type = 'crypto'
)
  AND previous.price_date = (
    SELECT MAX(price_date)
    FROM assets AS a
    WHERE a.asset_name = latest.asset_name
      AND a.asset_type = 'crypto'
      AND a.price_date < (
          SELECT MAX(price_date)
          FROM assets AS b
          WHERE b.asset_name = latest.asset_name
            AND b.asset_type = 'crypto'
      )
)
  AND EXISTS (
    SELECT 1 FROM holdings h 
    WHERE h.asset_name = latest.asset_name 
      AND h.asset_type = 'crypto'
  );`;
    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching stock overview:", error);
            return res.status(500).send("Error fetching stock overview");
        }
        res.json(JSON.parse(JSON.stringify(results)));
    });
})
app.get("/get_gold_overview", (req, res) => {
    let query=`SELECT
    latest.asset_name,
    latest.asset_type,
    latest.ticker_symbol,
    latest.price_date AS latest_date,
    latest.current_price AS latest_price,
    previous.price_date AS previous_date,
    previous.current_price AS previous_price,
    ROUND(((latest.current_price - previous.current_price) / previous.current_price) * 100, 2) AS price_change_percent
FROM assets latest
JOIN assets previous
  ON latest.asset_name = previous.asset_name
WHERE latest.asset_type = 'gold'
  AND previous.asset_type = 'gold'
  AND latest.price_date = (
    SELECT MAX(price_date)
    FROM assets AS a
    WHERE a.asset_name = latest.asset_name
      AND a.asset_type = 'gold'
)
  AND previous.price_date = (
    SELECT MAX(price_date)
    FROM assets AS a
    WHERE a.asset_name = latest.asset_name
      AND a.asset_type = 'gold'
      AND a.price_date < (
          SELECT MAX(price_date)
          FROM assets AS b
          WHERE b.asset_name = latest.asset_name
            AND b.asset_type = 'gold'
      )
);`;
    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching stock overview:", error);
            return res.status(500).send("Error fetching stock overview");
        }
        res.json(JSON.parse(JSON.stringify(results)));
    });
})
app.get("/get_silver_overview", (req, res) => {
    let query=`SELECT
    latest.asset_name,
    latest.asset_type,
    latest.ticker_symbol,
    latest.price_date AS latest_date,
    latest.current_price AS latest_price,
    previous.price_date AS previous_date,
    previous.current_price AS previous_price,
    ROUND(((latest.current_price - previous.current_price) / previous.current_price) * 100, 2) AS price_change_percent
FROM assets latest
JOIN assets previous
  ON latest.asset_name = previous.asset_name
WHERE latest.asset_type = 'silver'
  AND previous.asset_type = 'silver'
  AND latest.price_date = (
    SELECT MAX(price_date)
    FROM assets AS a
    WHERE a.asset_name = latest.asset_name
      AND a.asset_type = 'silver'
)
  AND previous.price_date = (
    SELECT MAX(price_date)
    FROM assets AS a
    WHERE a.asset_name = latest.asset_name
      AND a.asset_type = 'silver'
      AND a.price_date < (
          SELECT MAX(price_date)
          FROM assets AS b
          WHERE b.asset_name = latest.asset_name
            AND b.asset_type = 'silver'
      )
)
  AND EXISTS (
    SELECT 1 FROM holdings h
    WHERE h.asset_name = latest.asset_name
      AND h.asset_type = 'silver'
  );
`;
    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching stock overview:", error);
            return res.status(500).send("Error fetching stock overview");
        }
        res.json(JSON.parse(JSON.stringify(results)));
    });
})
app.listen(8888,()=>{
    console.log("Listening on port 8888!")

})
