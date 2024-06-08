import { FC, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { Icons } from "../icons";
import { Context } from "../../additionals/Context";
import { Branch, GlobalState, BLOCK_TYPES } from "../../additionals/Types";
import { findBranchByKey, updateTree } from "../../utils/utils";
import classNames from "classnames";

export const Sidebar: FC = () => {
  const context = useContext<GlobalState>(Context);

  const updateTreeAndSelectNewBranch = (branchToUpdate: Branch, branchToSelect?: Branch) => {
    context.setTree(updateTree(context.tree, branchToUpdate));
    if (branchToSelect) context.setSelectedBranch(branchToSelect);
  };

  const addRow = () => {
    const updatedBranch = { ...context.tree };
    const newRow = {
      parentKey: context.tree.key,
      key: uuidv4(),
      type: 1,
    };
    updatedBranch.children = [...(updatedBranch.children as Branch[]), newRow];

    updateTreeAndSelectNewBranch(updatedBranch, newRow);
  };

  const addColumn = () => {
    if (context.selectedBranch && context.selectedBranch.type > BLOCK_TYPES.BASE) {
      const updatedBranch =
        context.selectedBranch.type === BLOCK_TYPES.ROW
          ? { ...context.selectedBranch }
          : findBranchByKey(context.tree, context.selectedBranch.parentKey as string);

      if (!updatedBranch) return;

      const newCol = {
        key: uuidv4(),
        type: 2,
        parentKey: updatedBranch.key,
      };

      updatedBranch.children = [...(updatedBranch.children ? updatedBranch.children : []), newCol];
      updateTreeAndSelectNewBranch(updatedBranch, newCol);
    }
  };

  const changeContentType = (contentType: string) => {
    if (context.selectedBranch && context.selectedBranch.type === BLOCK_TYPES.COLUMN) {
      const updatedBranch = { ...context.selectedBranch, contentType, value: "" };

      updateTreeAndSelectNewBranch(updatedBranch, updatedBranch);
    }
  };

  const changeContent = (event: React.ChangeEvent<any>) => {
    if (context.selectedBranch) {
      const updatedBranch = { ...context.selectedBranch, value: event.target.value };

      updateTreeAndSelectNewBranch(updatedBranch, updatedBranch);
    }
  };

  const changeAlign = (align: string) => {
    if (context.selectedBranch) {
      const updatedBranch = { ...context.selectedBranch, align };

      updateTreeAndSelectNewBranch(updatedBranch, updatedBranch);
    }
  };

  return (
    <div className="properties">
      <div className="section">
        <div className="section-header">Page</div>
        <div className="actions">
          <button className="action" onClick={() => addRow()}>
            Add row
          </button>
        </div>
      </div>

      {context.selectedBranch?.type && context.selectedBranch?.type > BLOCK_TYPES.BASE ? (
        <div className="section">
          <div className="section-header">Row</div>
          <div className="actions">
            <button className="action" onClick={() => addColumn()}>
              Add column
            </button>
          </div>
        </div>
      ) : null}

      {context.selectedBranch?.type && context.selectedBranch?.type > BLOCK_TYPES.ROW ? (
        <div className="section">
          <div className="section-header">Column</div>
          <div className="button-group-field">
            <label>Contents</label>
            <div className="button-group">
              <button
                className={classNames(context.selectedBranch?.contentType === "text" && "selected")}
                onClick={() => changeContentType("text")}
              >
                <Icons.Text />
              </button>
              <button
                className={classNames(context.selectedBranch?.contentType === "text" && "image")}
                onClick={() => changeContentType("image")}
              >
                <Icons.Image />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {context.selectedBranch?.type && context.selectedBranch?.contentType === "text" ? (
        <div className="section">
          <div className="section-header">Text</div>
          <div className="button-group-field">
            <label>Alignment</label>
            <div className="button-group">
              <button
                className={classNames(context.selectedBranch?.align === "left" && "selected")}
                onClick={() => changeAlign("left")}
              >
                <Icons.TextAlignLeft />
              </button>
              <button
                className={classNames(context.selectedBranch?.align === "center" && "selected")}
                onClick={() => changeAlign("center")}
              >
                <Icons.TextAlignCenter />
              </button>
              <button
                className={classNames(context.selectedBranch?.align === "right" && "selected")}
                onClick={() => changeAlign("right")}
              >
                <Icons.TextAlignRight />
              </button>
            </div>
          </div>
          <div className="textarea-field">
            <textarea
              rows={8}
              placeholder="Enter text"
              onChange={changeContent}
              defaultValue={context.selectedBranch?.value}
            ></textarea>
          </div>
        </div>
      ) : null}

      {context.selectedBranch?.type && context.selectedBranch?.contentType === "image" ? (
        <div className="section">
          <div className="section-header">Image</div>
          <div className="text-field">
            <label htmlFor="image-url">URL</label>
            <input id="image-url" type="text" onChange={changeContent} defaultValue={context.selectedBranch?.value} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
