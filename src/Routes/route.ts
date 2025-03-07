import { Router } from "express";
import { Controller } from "../Controller/controller";


const router = Router()
const controller = new Controller()

router.get('/movies',controller.getMovies)
router.post('/addfavourite',controller.addToFavourite)
router.get('/getfavourite',controller.getFavouriteMovie)
router.post('/remove',controller.removeFromFavorite)

export default router