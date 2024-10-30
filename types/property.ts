export interface Property {
  _id: string;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  area: {
    value: number;
    unit: 'sqft' | 'acres' | 'hectares';
  };
  price: number;
  owner: string;
  documents: Array<{
    title: string;
    url: string;
    verified: boolean;
    verifiedBy?: string;
    verifiedAt?: Date;
  }>;
  status: 'available' | 'pending' | 'sold' | 'disputed';
  createdAt: Date;
  updatedAt: Date;
}