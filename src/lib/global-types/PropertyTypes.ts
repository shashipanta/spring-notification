export type PropertyType = {
  name: string;
  value: string;
};

export type PropertyTypeList = {
  propertyType: PropertyType[];
};

export type PropertyOwnershipRequest = {
  id: {
    ownerId: number | null;
    propertyId: number | null;
  }
  ownerId: number | null;
  userAccountId: number | null; // todo: either use one of ownerId or propertyId
  propertyId: number | null;
  ownershipType: string | null;
  ownershipPercentage: number | null;
  ownershipStartDate: Date | null;
  ownershipEndDate: Date | null;
  ownershipStatus?: string;
  ownershipDescription?: string;
  edited?: boolean;
};

export type PropertyRegistrationRequest = {
  id: number | "";
  propertyTitle: number | null;
  propertyType: string | null;
  allocatedPrice: number | null;
  pricePerUnit: number | null;
  occupied: boolean;
  totalRooms: number | null;
  addressType: string | null;
  wardNo: number | null;
  streetName: string | null;
  streetNameNp: string | null;
  googleLocation: string | null;
  totalBathRooms: number | null;
  totalBedRooms: number | null;
  totalLivingRooms: number | null;
  totalExternalBathRooms: number | null;
  rooms: RoomsInfo[];
  imageFiles: FileType[] | [];
  multipartFiles: File[];
  propertyOwnershipRequests: PropertyOwnershipRequest[];
  // propertyAddress: AddressRequest;
  description: string | null;
};

export type AddressRequest = {
  addressType: string | null;
  wardNo: number | null;
  streetName: string | null;
  streetNameNp: string | null;
  googleLocation: string | null;
};

export type RoomNumberInfo = {
  totalBathRooms: number | null;
  totalBedRooms: number | null;
  totalLivingRooms: number | null;
  totalExternalBathRooms: number | null;
};

export type FileType = {
  id: number;
  name: string;
  thumbnail: string;
  file: File;
  source: "remote" | "local";
};

export type RoomsInfo = {
  id: number | null;
  roomName: Roomtype;
  totalRooms: number | null;
}

export enum Roomtype {
  BED_ROOM = "BED_ROOM",
  BATH_ROOM = "BATH_ROOM",
  LIVING_ROOM = "LIVING_ROOM",
  EXTERNAL_BATHROOM = "EXTERNAL_BATHROOM",
  KITCHEN = "KITCHEN",
  DINING_ROOM = "DINING_ROOM",
  STUDY_ROOM = "STUDY_ROOM",
  GARAGE = "GARAGE",
  BALCONY = "BALCONY",
  OTHER = "OTHER"
}
