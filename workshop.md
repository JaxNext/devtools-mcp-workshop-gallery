# Workshop Cheet Sheet

## 本文链接

[https://github.com/JaxNext/devtools-mcp-workshop-gallery/blob/main/workshop.md](https://github.com/JaxNext/devtools-mcp-workshop-gallery/blob/main/workshop.md)

## 官方仓库

[https://github.com/ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)

## Gallery 链接

[https://jaxnext.github.io/devtools-mcp-workshop-gallery/](https://jaxnext.github.io/devtools-mcp-workshop-gallery/)

## 安装配置

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

## 测试指令

```
检查 https://developers.chrome.com/docs/devtools/mcp/ 的网页性能
```

## 热身文件

[https://github.com/JaxNext/chrome-devtools-ai-demos/blob/main/mcp.html](https://github.com/JaxNext/chrome-devtools-ai-demos/blob/main/mcp.html)

## 零代码网站

### 系统提示词 / 规则

```
 1. 能使用 DevTools MCP 工具的地方，都必须使用，包括但不限于调整网页样式、在网页上操作等场景。
 2. 如果在需要在网页上输入账号、密码、验证码等敏感信息，必须停下来问我。
 3. 在生成或调试页面代码时，要经常刷新网页，让我及时看到效果，不要让我等太久。
```

### 建站提示词模板

```
这个网站采用活动官网的模式，记录我这次参加的 Google DevFest Workshop。
这个 Workshop 以 Chrome DevTools MCP Server 为主题。

网站首页是总体信息展示，另外有三个子页面：
  - 一个子页面介绍 GDG 和 DevFest
  - 一个子页面介绍 DevTools MCP
  - 一个子页面介绍我自己

我希望网站的风格是 ${ 在这里描述风格 }，你可以参考 ${ 在这里提供一个参考网站 } 的风格。

我的名字是 ${ 在这里输入你的名字 }，我是一名 ${ 在这里输入你的职业 }， 我喜欢 ${ 在这里输入你的兴趣爱好 }，我的联系方式是 ${ 在这里输入你的联系方式 }。

如果你需要进一步的信息，可以随时停下来问我
```

## 部署指令

```
写一个 GitHub 工作流文件 deploy.yml，然后在我的 GitHub 上新建一个仓库，部署这个网站，只能使用 DevTools MCP 工具。

如果遇到登录或者验证问题，停下来问我。
```