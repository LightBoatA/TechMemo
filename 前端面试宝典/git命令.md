- 初始化git：把文件目录变成git仓库 `git init`
- 暂存 `git add`
- 提交 `git commit -m '添加了一个按钮'`
- 提交历史: `git log`
- 提交历史所有分支: `git log --all`
- 提交历史所有分支并图形化: `git log --all --graph`
- 提交历史美化格式: `git log --pretty=oneline`
- 查看分支：`git branch`
- 修改分支名字:`git branch -m 旧名字 新名字`
- 保存：`:wq`
- 退出：`:q`

- 链接到远程仓库: `git remote add origin https://github.com/zss/test.git` 此处的Origin是远程仓库的昵称
- 查看远程仓库: `git remote`
- 修改远程仓库名字: `git remote rename origin newName`
- 推送到远端: `git push origin`
- 推送到远端第一次: `git push -u origin master`
- 拉代码：`git pull origin main`
- 之后推送: `git push`
- 


- 新建并切换分支：`git checkout -b feature2`
- 查看分支：`git branch --list`
- 切换分支：`git checkout feature`
- 合并分支，把别的分支合并到当前分支上来：`git merge feature1`


- 撤销提交：`git reset head~ --soft`

- 使用SSH连接Git仓库