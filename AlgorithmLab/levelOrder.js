// 二叉树层序遍历，借助队列，保存一层的节点
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    
    if (!root) return [];

    const result = []; // 结果数组
    const queue = [root]; // 辅助队列，初始值是第一层：根节点

    // 每次循环，用来处理这一层的节点（直到这一层没有节点了）
    while (queue.length > 0) {
        // 记录初始队列值，也就是这一层的节点个数
        const levelSize = queue.length;
        const tempResult = []; // 临时存放这一层的节点值
        for (let i = 0; i < levelSize; i++) {
            // 自己出列，收集结果
            const node = queue.shift();
            tempResult.push(node.val);

            //下一层（儿子）入列
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(tempResult);
    }
    return result;
};