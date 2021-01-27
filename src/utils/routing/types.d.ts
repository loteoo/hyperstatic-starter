interface LocationState {
  route?: string;
  path: string;
  params: any;
  query: any;
}

type RouteStatus = 'iddle' | 'loading' | 'ready' | 'error';

interface RouteState {
  status: RouteStatus;
  initialized: boolean;
}

type RoutesState = Record<string, RouteState>

interface State {
  location: LocationState;
  routes: RoutesState;
}
