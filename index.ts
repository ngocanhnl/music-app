import express,{Express} from "express"
import * as database from "./config/database";
import dotenv from "dotenv"
import clientRoute from "./routes/client/index.route";

dotenv.config();
database.connect();


const app:Express = express();
const port: number|string = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

app.set("views",`${__dirname}/views`);
app.set('view engine','pug')

clientRoute(app);

app.listen(port,()=>{
    console.log(`App on listening on port ${port}`);
})
