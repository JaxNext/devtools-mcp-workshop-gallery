# Chrome DevTools MCP Workshop 锦囊

## Workshop 步骤

### 一、安装

#### 1. 检查你的电脑是否满足运行条件

- 需要安装最新版 [Chrome 浏览器](https://www.google.com/chrome/)
- 需要安装 [Node.js](https://nodejs.org/)，版本不低于 v20.19（可在终端中输入 `node -v` 检查）
- 需要安装 [npm](https://www.npmjs.com/)（可在终端中输入 `npm -v` 检查）

#### 2. 安装一款智能代码编辑器（IDE）

你可以选择 Cursor、VS Code、或者其他你喜欢的智能 IDE。

在 [官方仓库](https://github.com/ChromeDevTools/chrome-devtools-mcp?tab=readme-ov-file#mcp-client-configuration) 中，你可以看到哪些 IDE 支持了 Chrome DevTools MCP。

#### 3. 在 IDE 中安装 Chrome DevTools MCP

- [在 Cursor 中安装 Chrome DevTools MCP](./docs/install_on_cursor.md)
- [在 VS Code 中安装 Chrome DevTools MCP](./docs/install_on_vscode.md)

#### 4. 首次运行 DevTools MCP

在 IDE 中打开 AI 对话界面，切换到 Agent 模式，然后发送如下指令：

```
用 DevTools MCP 工具检查 https://google.com 的网页性能
```

> 需要强调“用 DevTools MCP 工具”，以免 AI 自作主张选择使用其他工具。

如果看到一个浏览器窗口被自动打开并导航到 https://google.com，说明 DevTools MCP 已经成功安装。

### 二、牛刀小试，一句话修复故障

在这一部分，我们将会体会到自动化调试的强大。

我们来模拟一个 bug 现场，让 AI 使用 DevTools MCP 工具提供一条龙服务：发现问题、定位原因、修复问题、自测效果。

#### 1. 将下面的 html 文件下载到本地：

[https://github.com/JaxNext/chrome-devtools-ai-demos/blob/main/mcp.html](https://github.com/JaxNext/chrome-devtools-ai-demos/blob/main/mcp.html)

并在 IDE 中打开这个文件。

在这个网页文件中，我故意埋了一点 Bug，导致页面加载异常。

但是我们不需要亲自去检查有什么异常、是什么导致的，我们只需要这样告诉 AI：

```
用 DevTools MCP 工具检查这个网页是否有异常，如果有，找到原因并修复。
```

运行后，你会看到一个自动打开的浏览器窗口，展示的是故障页面。AI 会通过获取截图、快照等方式“看”页面哪里不对，然后搜集线索，并检查源码。当它找到原因后，会修复问题并刷新页面，让你看到页面恢复正常。

### 三、零代码建站

接下来，我们把野心放飞到更高的境界：挑战不写一行代码，从零开发一个网站，并发布上线。

#### 1. 初始化工程

在电脑上新建一个文件夹，比如 `devtools-mcp-website`。

在 IDE 中打开这个文件夹。

#### 2. 设置对话规则

进入 AI 对话界面，并启动 Agent 模式。

在 IDE 的这设置中，把 DevTools MCP 的所有工具都加入到白名单（Allowlist）中，免于每次调用工具都需要你手动点“允许”按钮。

发送[规则指令](./docs/rules.md)中的内容，规范 AI 的行为。

#### 3. 建站

复制[建站提示词](./docs/website_dev.md)中的内容，将其中带有花括号的部分替换为你的定制化信息，然后发送给 AI，让 AI 开始建站。

AI 生成初版网站后，找出你不满意的地方，让 AI 进行优化，并用 DevTools MCP 工具自测优化效果，直至你满意为止。

可选的进阶挑战：

- 进阶挑战一：让 AI 给网站适配移动端样式
- 进阶挑战二：让 AI 用 DevTools MCP 工具访问图片素材网站，为网站选择一些配图（这部分难度比较大，可酌情跳过）

#### 4. 部署网站

发送[部署网站的提示词](./docs/website_deploy.md)中的内容，让 AI 替你把网站部署到 GitHub Pages 上。

部署成功后，你将能够通过形如 `https://GitHub用户名.github.io/你的仓库名/` 的 URL 访问到你的网站

#### 5. 作品大合影

所有通过本次 Workshop 搭建的网站，都会被收录到 [DevTools MCP Workshop 作品集](https://jaxnext.github.io/devtools-mcp-workshop-gallery/) 中。

把你的网站链接发给我（微信：JaxNext），注明所属城市，我会将你的网站添加到作品集中，和全国各个城市所有的 DevTools MCP 探险家一起联动合影！

---

## 链接合集

### 本文链接

[https://github.com/JaxNext/devtools-mcp-workshop-gallery/blob/main/workshop.md](https://github.com/JaxNext/devtools-mcp-workshop-gallery/blob/main/workshop.md)

### DevTools MCP 官方仓库

[https://github.com/ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)

### Gallery 链接

[https://jaxnext.github.io/devtools-mcp-workshop-gallery/](https://jaxnext.github.io/devtools-mcp-workshop-gallery/)

### 一个有 Bug 的网页

[https://github.com/JaxNext/chrome-devtools-ai-demos/blob/main/mcp.html](https://github.com/JaxNext/chrome-devtools-ai-demos/blob/main/mcp.html)

### 闯关游戏

[https://jaxnext.github.io/devtools-mcp-game/](https://jaxnext.github.io/devtools-mcp-game/)

---

## 提示词合集

-  安装后首次运行 DevTools MCP 的提示词

    ```
    用 DevTools MCP 工具检查 https://google.com 的网页性能
    ```

- [闯关游戏的启动提示词](./docs/game.md)

- 零代码上线网站的提示词

  - [系统提示词 / 规则](./docs/rules.md)

  - [建站提示词模板](./docs/website_dev.md)
  - [部署网站的提示词](./docs/website_deploy.md)