import { FC, useContext } from "react";
import { Column } from "../column";
import { Icons } from "../icons";
import { ImagePlaceholder } from "../image-placeholder";
import { Markdown } from "../markdown";
import { Row } from "../row";
import { Stage } from "../stage";
import { Context } from "../../additionals/Context";
import { Branch, BLOCK_TYPES } from "../../additionals/Types";

const map = {
  [BLOCK_TYPES.BASE]: Stage,
  [BLOCK_TYPES.ROW]: Row,
  [BLOCK_TYPES.COLUMN]: Column,
} as const;

export const Builder: FC = () => {
  const context = useContext(Context);

  const build = (branch: Branch) => {
    const Component = map[branch.type];
    const isLeaf = !Boolean(branch.children);

    const handleSelect = () => {
      context.setSelectedBranch(branch);
    };

    const selected = branch.key === context.selectedBranch?.key;

    return isLeaf ? (
      <Component key={branch.key} onSelect={handleSelect} selected={selected}>
        {branch.contentType === "text" ? (
          <Markdown className={`text-align-${branch.align || "center"}`}>{branch.value || ""}</Markdown>
        ) : (
          <img src={branch.value} />
        )}
      </Component>
    ) : (
      <Component key={branch.key} onSelect={handleSelect} selected={selected}>
        {branch.children?.map(build)}
      </Component>
    );
  };

  return build(context.tree);
};
