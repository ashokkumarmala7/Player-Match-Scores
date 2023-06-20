const express=require("express");
const {open}=require("sqlite");
const sqlite3=require("sqlite3");
const path= require("path");
const dbPath=path.join(__dirname,"cricketMatchDetails.db");
const app=express();
app.use(express.json());
let db=null;
 const initializeDbAndServer=async () => {
     try{
         db=await open({
             filename:dbPath,
             driver:sqlite3.Database,
         });

         app.listen (3000,()=>
         console.log("Server Running at http://localhost:3000/")
         );
        
     }catch (error){

        console.log(`DB Error:${error.message}`;};
        process.exit(1);
     }
 };
 initializeDbAndServer();
 const convertPlayerDbObjectToResponseObject=(dbObject)=>{
     return{
         playerId:dbObject.player_id,
         playerName:dbObject.player_name,
     };
 };

 const convertMatchDetailsDbObjectToResponseObject=(dbObject)=>{
     return{
         matchId:dbObject.matchId,
         match:dbObject.match,
         year:dbObject.year,
     };
 };
 app.get ("/players/",async (request,response)=>{
     const getPlayerQuery=`SELECT * FROM player_details;`;
     const playersArray=await db.all (getPlayerQuery);
     response.send(playersArray.map((eachPlayer)=>
     convertPlayerDbObjectToResponseObject(eachPlayer)
     ));
 });