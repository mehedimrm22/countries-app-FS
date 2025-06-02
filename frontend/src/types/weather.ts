export interface WeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
}

export interface WeatherDescription {
  description: string;
  icon: string;
}

export interface WeatherWind {
  speed: number;
}

export interface WeatherData {
  main: WeatherMain;
  weather: WeatherDescription[];
  wind: WeatherWind;
}

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}
