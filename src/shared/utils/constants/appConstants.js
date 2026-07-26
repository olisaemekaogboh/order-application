export const APP_NAME = import.meta.env.VITE_APP_NAME || "Logistics Transport";

export const ORDER_STATUSES = {
  PENDING: "Pending",
  ASSIGNED: "Assigned",
  PICKED_UP: "Picked Up",
  IN_TRANSIT: "In Transit",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const PAYMENT_STATUSES = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

export const VEHICLE_TYPES = {
  MOTORCYCLE: "Motorcycle",
  MINI_VAN: "Mini Van",
  STANDARD: "Standard",
  TRUCK: "Truck",
};
