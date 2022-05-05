import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/checkupVenues";

export async function getAllVenues() {
  const { data } = await httpService.get(apiEndpoint);
  return data;
}

export async function getAllVenuesByOrganization(organizationId) {
  const { data } = await httpService.get(apiEndpoint + "/organization/" + organizationId);
  return data;
}

export async function getVenueById(venueId) {
  const { data } = await httpService.get(apiEndpoint + "/" + venueId);
  return data;
}

export async function createVenue(venue) {

}

export async function deleteVenue(venueId) {

}

const venueService = {
  getAllVenues,
  getAllVenuesByOrganization,
  getVenueById,
  createVenue,
  deleteVenue
}

export default venueService;