export interface PlaceProps {
  address_name: 'string';
  category_group_code: 'string';
  category_group_name: 'string';
  category_name: 'string';
  distance: 'string';
  id: 'string';
  phone: 'string';
  place_name: 'string';
  place_url: 'string';
  road_address_name: 'string';
  x: number;
  y: number;
}

export type PlaceListProps = Array<PlaceProps>;

export interface FromInputs {
  title: string;
  description: string;
  image: FileList;
  searching: string;
  address: string;
  lat: number;
  lng: number;
}