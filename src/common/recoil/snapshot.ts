import type { Loadable, RecoilValue, Snapshot } from 'recoil';

export const getLoadable = <T>(snapshot: Snapshot, node: RecoilValue<T>): Loadable<T> => snapshot.getLoadable<T>(node);

export const getValue = <T>(snapshot: Snapshot, node: RecoilValue<T>): T => getLoadable(snapshot, node).getValue();
