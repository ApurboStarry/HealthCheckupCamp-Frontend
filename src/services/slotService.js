import httpService from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/employeeSlots";

export async function getAllocatedSlotsOfEmployee(venueId) {
  const { data } = await httpService.get(apiEndpoint + "/allAllocatedSlotsByAnEmployee/" + venueId);
  return data;
}

export async function allocateSlot(venueId, date) {
  const { data } = await httpService.post(apiEndpoint + "/allocateSlot", {
    checkupVenueId: venueId,
    scheduledAt: date,
    notes: "",
  });

  console.log(data);
  return data;
}

export async function cancelSlot(slotId) {
  const { data } = await httpService.delete(apiEndpoint + "/cancelSlot/" + slotId);
  return data;
}

export async function rescheduleSlot(slotId, date) {
  const { data } = await httpService.put(apiEndpoint + "/rescheduleSlot/" + slotId + "/" + date);
  return data;
}

export async function getAllAllocatedSlotsOfVenue(venueId) {
  const { data } = await httpService.get(apiEndpoint + "/allAllocatedSlots/" + venueId);
  return data;
}

export async function markSlotAsCompleted(slotId) {
  const { data } = await httpService.put(apiEndpoint + "/markAsCompleted/" + slotId);
  return data;
}

const slotService = {
  getAllocatedSlotsOfEmployee,
  allocateSlot,
  cancelSlot,
  rescheduleSlot,
  getAllAllocatedSlotsOfVenue,
  markSlotAsCompleted
};

export default slotService;