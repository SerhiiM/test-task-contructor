export type Branch = {
    key: string;
    type: BLOCK_TYPES;
    parentKey: string | null;

    children?: Branch[];

    align?: string;
    value?: string;
    contentType?: string;
};

export type GlobalState = {
  tree: Branch;
  setTree: React.Dispatch<React.SetStateAction<Branch>>;

  selectedBranch: Branch | null;
  setSelectedBranch: React.Dispatch<React.SetStateAction<Branch | null>>;
};

export enum BLOCK_TYPES {
  'BASE' = 0,
  'ROW' = 1,
  'COLUMN' = 2
}