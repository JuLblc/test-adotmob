import { Request, Response, NextFunction } from "express";

import { EventToMatched, PointOfInterest, DistanceInfo , LooseObject} from '../types'
import utils from '../utils'

const matchPointOfInterest = async (req: Request, res: Response, next: NextFunction) => {

  const body: PointOfInterest[] = req.body;

  // Initialiaztion 
  body.map(pointOfInterest => {
    pointOfInterest.clicks = 0;
    pointOfInterest.impressions = 0;
  })

  const events: EventToMatched[] = await utils.getEvents();

  events.map(eventToMatched => {

    let distances: DistanceInfo[] = [];
    body.map((pointOfInterest, idx) => {

      let distanceInfo: DistanceInfo = {
        distance: utils.getDistance(
          pointOfInterest.lat,
          pointOfInterest.lon,
          eventToMatched.lat,
          eventToMatched.lon,
          'K'),
        name: pointOfInterest.name,
      }

      // Keep only the smallest distance
      if (distances.length === 0) {
        distances.push(distanceInfo)
      } else if (distanceInfo.distance < distances[0].distance) {
        distances.push(distanceInfo); //element ajouter à la fin du tableau
        distances.shift();            //supp 1er element du tableau
      }

      // When all distances has been calculated
      if (idx === body.length - 1) {
        
        // Find the index of the smallest distance
        let indexOf: number = body.findIndex(el => el.name === distances[0].name)

        // Incrementation according to eventType
        if (eventToMatched.eventType === 'imp') {
          body[indexOf].impressions++;
        } else if (eventToMatched.eventType === 'click') {
          body[indexOf].clicks++;
        }
      }
    })
  })

  // Building the response
  let response: LooseObject = {};

  body.map(pointOfInterest => {
    response[pointOfInterest.name] = pointOfInterest
  })

  res.status(200).json({ response })
}

export default { matchPointOfInterest };