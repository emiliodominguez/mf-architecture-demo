import { IResponseInfo } from "./info";

export interface ILocation {
	id: number;
	name: string;
	type: string;
	dimension: string;
	residents: string[];
	url: string;
	created: string;
}

export interface ILocationEndpointResponse {
	info: IResponseInfo;
	results: ILocation[];
}
