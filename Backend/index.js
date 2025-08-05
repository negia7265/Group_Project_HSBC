let express=require('express');
let mysql=require("mysql");
let app=express();
app.use(express.json());

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
    let query="SELECT * FROM profit";
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

app.listen(8888,()=>{
    console.log("Listening on port 8888!")

})
