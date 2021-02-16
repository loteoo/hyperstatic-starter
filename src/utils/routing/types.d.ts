
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

interface LocationState {
  route?: string;
  path: string;
  params: any;
  query: any;
}

type PathStatus = 'iddle' | 'loading' | 'fetching' | 'ready' | 'error';

interface State {
  location: LocationState;
  paths: Record<string, PathStatus>;
  fastClicks: boolean;
  [x: string]: any;
}
