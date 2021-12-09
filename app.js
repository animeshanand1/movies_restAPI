const express=require("express");

const app=express();

const movies=[
    name="Sholay",
    id=1,
    cast=['amitabh','dharmendra','sanjeev kr']
]

app.get('/',function(req,res){
    res.send("<h1>HomePage</h1>")

});
app.get("/movies/:id",function(req,res) {
    res.send(movies);
});
app.post("/books/:new",function (req,res) {
    
});

app.listen(3000,function(){
    console.log("Server is running");
})