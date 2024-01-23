export type PropertyType = {
  name: string;
  value: string;
};

export type PropertyTypeList = {
  propertyType: PropertyType[];
};

export type PropertyRegistrationRequest = {
  id: number | "";
  title: number | null;
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
  imageFiles: FileType[] | [];
  multipartFiles: File[];
  ownerId: number | null;
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
};
