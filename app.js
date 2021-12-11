const Joi=require("joi");
const express=require("express");
const { json } = require("express/lib/response");

const app=express();
app.use(express.json())
const movies=[
   {name:"Sholay",
id:1,
cast:["Amitabh","Sanjeev kr","Dharmendra"]},
{name:"3-Idiots",
id:2,
cast:["Amir Khan","Farhan","Kareena"]}
]

app.get('/',function(req,res){
    res.send("<h1>HomePage</h1>")

});
app.get("/movies",function(req,res) {
    res.send(movies);
});
app.get("/movies/:id",function (req,res) {
  const movie=  movies.find(m=> m.id=== parseInt(req.params.id));
   if(!movie){
      res.status(404).send("No movies found") 
   } else{
      res.send(movie); 
   }
});
app.post("/movies",function (req,res) {
    const schema= Joi.object({
        name: Joi.string() .min(3) .required()
    });
    const validation = schema.validate(req.body);
    res.send(validation)
    
    if(validation.error){
        res.status(400).send(validation.error)
    }
    const movie={
        id:movies.length+1,
        name:req.body.name
    };
    movies.push(movie)
    res.send(movie)
});

app.put("/movies/:id",function(req,res){
    const movie=  movies.find(m=> m.id=== parseInt(req.params.id));
   if(!movie){
      res.status(404).send("No movies found") 
   }
   const schema= Joi.object({
    name: Joi.string() .min(3) .required()
});
const validation = schema.validate(req.body);
res.send(validation)
if(validation.error){
    res.status(400).send(validation.error)
}
movie.name=req.body.name;
res.send(movie);
});

app.delete("/movies/:id",function(req,res){
    const movie=  movies.find(m=> m.id=== parseInt(req.params.id));
   if(!movie){
      res.status(404).send("No movies found") 
   }

   const index= movies.indexOf(movie);
   movies.splice(index,1)
   res.send(movie);

});

app.listen(3000,function(){
    console.log("Server is running");
})