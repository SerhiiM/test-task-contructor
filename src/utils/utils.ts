import { Branch } from './../additionals/Types';

export const updateTree = (branch: Branch, updatedBranch: Branch ): Branch => {    
    if (branch.key === updatedBranch.key) {
        return updatedBranch;
    }
    
    if (branch?.children && branch.children.length > 0) {
        const updatedChildren = branch.children.map(child => updateTree(child, updatedBranch));
        return { ...branch, children: updatedChildren };
    }
    
    return branch;
}

export const findBranchByKey = (branch: Branch, key: string): Branch | null => {
    if (branch.key === key) {
        return branch;
    }
    
    if (branch.children && branch.children.length > 0) {
        for (let child of branch.children) {
            const foundBranch = findBranchByKey(child, key);
            if (foundBranch) {
                return foundBranch;
            }
        }
    }
    
    return null;
}