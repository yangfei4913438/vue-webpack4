## 项目说明
本项目直接用 vue2.6 和 webpack4, 创建了一个账本项目。
可以作为参考学习使用，也可以删掉账本代码，增加你的业务代码，直接使用于项目中。

> 本项目可以很好的避免 vue，webpack, babel 等核心组件升级带来的一系列依赖报错问题。
> 但是，如果你对 webpack 一脸懵逼，还是建议你去学习一下。毕竟这是前端必备技能 :)

### 操作步骤

#### 1. 下载

`git clone git@github.com:yangfei4913438/vue-webpack4.git 项目名称`

#### 2、初始化

```shell
cd 项目名称

# 删除git信息
rm -rf .git

# 初始化项目
yarn
```

#### 3、启动项目

`yarn run dev`

#### 4、打包项目

`yarn run build`

#### 5、NGINX 配置注意事项

> 部署需要配置 gizp 压缩支持
