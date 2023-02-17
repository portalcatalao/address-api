import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class IbgeService {
    private api: any;
    constructor() {
        this.api = axios.create({
            baseURL: 'https://brasilaberto.com/api/v1/',
            headers: {
                Authorization: `Bearer mlvOO2JhYUwE1RDf5XP89kkp7aloD6OJQSwXm6qI7GwoMAIFIuiIFVU49PsnalOX`
            }
        })
    }

    async searchStates() {
        try {
            const states = await this.api.get('states').then(res => res.data);
            return states.result;
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async searchCitiesByState(state: string) {
        try {
            const cities = await this.api.get(`cities/${state}`).then(res => res.data);
            return cities.result;
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async searchDistrictsByCity(cityId: number) {
        try {
            const districts = await this.api.get(`districts/${cityId}`).then(res => res.data);
            //console.log(districts);
            return districts.result;
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}