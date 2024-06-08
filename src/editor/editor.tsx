import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Builder } from "../components/builder";
import { Sidebar } from "../components/sidebar";
import { Context } from "../additionals/Context";
import { Branch, BLOCK_TYPES } from "../additionals/Types";

export const Editor: FC = () => {
  const [tree, setTree] = useState<Branch>(() => {
    const oldTree = localStorage.getItem("TREE");
    if (oldTree) {
      return JSON.parse(oldTree);
    } else {
      return { key: uuidv4(), type: BLOCK_TYPES.BASE, children: [], parentKey: null };
    }
  });
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  useEffect(() => {
    localStorage.setItem("TREE", JSON.stringify(tree));
  }, [tree]);

  return (
    <Context.Provider
      value={{
        tree,
        setTree,

        selectedBranch,
        setSelectedBranch,
      }}
    >
      <div className="editor">
        <Builder />
        <Sidebar />
      </div>
    </Context.Provider>
  );
};
