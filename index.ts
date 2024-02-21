import express,{Express} from "express"
import * as database from "./config/database";
import dotenv from "dotenv"
import clientRoute from "./routes/client/index.route";
import adminRoute from "./routes/admin/index.route";
import { systemConfig } from "./config/config";
import path from "path";
import methodOverride from "method-override"

dotenv.config();
database.connect();



const app:Express = express();
const port: number|string = process.env.PORT || 3000;


//body
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// //req.body
// app.use(bodyParser.urlencoded({extended: false}))

app.use(methodOverride('_method'));

app.set("views",`${__dirname}/views`);
app.set('view engine','pug')

app.use(express.static(`${__dirname}/public`));

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//ENd TinyMCE

//App locall variable
app.locals.prefixAdmin = systemConfig.prefix_admin;


clientRoute(app);
adminRoute(app);

app.listen(port,()=>{
    console.log(`App on listening on port ${port}`);
})
