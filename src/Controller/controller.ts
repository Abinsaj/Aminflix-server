import axios from "axios";
import { Request, Response } from "express";
import dotenv from 'dotenv';
import IMovie from "../Interface/movieInterface";

dotenv.config();


export class Controller{
    private favouriteMovie: IMovie[] = []
    constructor(){

    }

    getMovies = async (req: Request, res: Response) => {
        try {
            const query = req.query.query as string;
            const apiKey = process.env.OMDB_API_KEY;
            if (!apiKey) {
                 res.status(500).json({ success: false, message: "Server misconfiguration: API key missing" });
            }
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)

            res.status(200).json({ success: true, data: response.data.Search });
        } catch (error) {
            console.error("Error fetching movies:", error);
            res.status(500).json({ success: false, message: "An unexpected error occurred" });
        }
    };

    addToFavourite = async(req: Request, res: Response)=>{
        try {
            const {data} = req.body

            const isAleardyAdded = this.favouriteMovie.some(movie => movie.imdbID == data.imdbID)

            if(isAleardyAdded){
                res.status(400).json({success: false, message: 'Movie is alreadyy added to the Favourite'})
            }else{
                this.favouriteMovie.push(data)
    
                res.status(200).json({success: true, message: 'Movie successfully added to the favourite'})
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message:'An unexpected error occurred'})
        }
    }

    getFavouriteMovie = async(req: Request, res: Response)=>{
        try {
            const data = this.favouriteMovie
            if(!data.length){
                res.status(400).json({success: false, message:'No movies in the favourite'})
            }else{
                res.status(200).json({success: true, data: data})
            }
        } catch (error) {
            res.status(500).json({success: false, message:'An unexpected error occurred'})
        }
    }

    removeFromFavorite = async(req: Request, res: Response)=>{
        try {
            const id = req.query.id
            this.favouriteMovie = this.favouriteMovie.filter(movie=>movie.imdbID !== id)
            res.status(200).json({ message: "Movie removed from favorites", favouriteMovie: this.favouriteMovie });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
}