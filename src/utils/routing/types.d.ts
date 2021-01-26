interface LocationState {
  path: string;
  params: any;
  query: any;
  route?: string;
}

type RoutesState = Record<string, {
  status: 'iddle' | 'loading' | 'loaded';
  initialized: boolean;
}>

interface State {
  location: Location;
  routes: RoutesState;
}
