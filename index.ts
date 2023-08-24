import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';

import { movies } from './data';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8888;

app.use(bodyParser.json());

// const moviess = JSON.parse(
//     fs.readFileSync(`${__dirname}/data.ts`)
// );

// get

app.get("/movies", (req: Request, res: Response) => {

    res.json({
        message:"Success",
        movies,
    });
   
});



// create

app.post("/movies", (req: Request, res: Response) => {
    
    const insert = {
        id: movies.length + 1,
        title: req.body.title,
        description: req.body.description,
    };

    movies.push(insert);
    res.status(201).json({
        
        message:"Success",
        insert,
    });
});

// view by id

app.get("/movies/:id",(req: Request, res: Response) => {
    const spice = movies.filter((item:any) => {
        return item.id == req.params.id;
    });

    

    if (spice.length != 0) {
        res.json({
            message:"Success",
            spice,
        });   
    } else {
        res.status(404).json({
            message:"Failed",
        });   
    }

});


// updated

app.put('/movies/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const movIndex = movies.findIndex((p) => p.id === id);

    if (movIndex !== -1) {
        const updatedMov ={
            id,
            title: req.body.title,
            description: req.body.description,
        };
        movies[movIndex] = updatedMov;
        res.json({
            
            message:"Success",
            updatedMov,
        });

    } 
    
    else {
        res.status(404).json({ 
            message: 'Not Found' 
        });
    }
});


// delete

app.delete('/movies/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const movIndex = movies.findIndex((p) => p.id === id);

    if (movIndex !== -1) {
        const deletedmov = movies.splice(movIndex, 1)[0];
        res.json({
        
            message:"Success",
            deletedmov,
        });
    } 
    
    else {
        res.status(404).json({ 
            message: 'Your title is Not Found' 
        });
    }
});




app.listen(port, () => {
    console.log(`[server]: Server is running at http:localhost:${port}`);
});