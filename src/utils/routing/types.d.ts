
type Routes = Record<string, Promise<any>>;

interface Config {
  routes: Routes;
  options?: Options;
  init: Record<string, any>;
  view: (state: State) => any;
  node: Element;
  subscriptions?: (state: State) => any[];
}

interface Options {
  initialPath?: string;
  baseUrl?: string;
  loader?: (state: State) => any
  fastClicks?: boolean
}

interface OptionsState {

}

interface LocationState {
  route?: string;
  path: string;
  params: any;
  query: any;
}

type RouteStatus = 'iddle' | 'loading' | 'ready' | 'error';

interface RouteState {
  status: RouteStatus;
  initialized: Record<string, boolean>;
}

type RoutesState = Record<string, RouteState>

interface State {
  options: OptionsState;
  location: LocationState;
  routes: RoutesState;
}
