import { feature } from 'topojson-client';
import { countries } from 'world-atlas/countries-110m.json';

// 将 TopoJSON 转换为 GeoJSON
export const worldGeoJSON = feature(countries, countries.objects.countries);

export default worldGeoJSON; 