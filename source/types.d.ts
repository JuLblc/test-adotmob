export type EventToMatched = {
    lat: number,
    lon: number,
    eventType: string
}

export type PointOfInterest = {
    lat: number,
    lon: number,
    name: string,
    impressions:number,
    clicks:number
}

export type DistanceInfo = {
    distance: number,
    name: string,
}

export interface LooseObject {
    [key: string]: PointOfInterest
  }