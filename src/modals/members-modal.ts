export interface MembersIF {
  id: number;
  name: string;
  username: string;
  email: string;
  photo: string;
  address: Address;
  phone: string;
  website: string;
  company: {
    name: string;
    location: string;
  };
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zip: string;
  geo: {
    lng: string;
    lat: string;
  };
}
