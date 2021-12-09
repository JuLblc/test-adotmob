import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

import { EventToMatched , PointOfInterest } from '../types'
import utils from '../utils'

const matchPointOfInterest = async (req: Request, res: Response, next: NextFunction) => {

  const body:PointOfInterest[] = req.body; 
  const events: EventToMatched[] = await utils.getEvents(); 

  console.log('body: ', body);
  console.log('events: ', events);

}

export default { matchPointOfInterest };