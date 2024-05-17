import express from "express";

const app = express();

const jokes=[
    {name:"om"},
    {name:"megh"},
    {name:"axita"}
]

app.use(express.static());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/jokes",(req,res)=>{
    res.send(jokes)
})


const port =process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`serve ${port}`)
})