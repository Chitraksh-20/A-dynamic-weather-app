import express from 'express';
import ejs from 'ejs'
import bodyParser from'body-parser'
import axios from 'axios'
const app = express();
const port = 4000;

// Define a route for the root URL
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.render('./index.ejs');
});

app.post('/submit',async (req,res)=>{
const dataa=req.body;
// console.log(data);
const send=dataa['city'];
const response=await axios.get(`http://api.weatherapi.com/v1/current.json?key=700db12eb63b403dae5173359240301&q=${send}`)
// console.log(response.data.current.temp_c);
const fi=response.data.current;
const final=response.data.current.condition.text;
// console.log(final)
res.render('./submit.ejs',{
  
  value:final,

  backgroundImage:find(final)
})

});
// Start the server

 function find(final){

  const set={
    'Partly cloudy':'Partly_cloudy.jpg',
    'Sunny':'sunny.jpg',
    'Heavy rain':'heavy rain.jpeg'
  
  
  
  
  }
  console.log(set[final]);
  if(set[final]==undefined){
    set[final]='360_F_497809944_FMo3DO6j7XSlb9rZKOlnqaaWoJhuZXBm.jpg'
  }
return set[final];
}
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

