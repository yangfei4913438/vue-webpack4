## 项目说明
本项目初始化之后，相当于直接用 vue2.6 和 webpack4, 创建一个新的vue项目。无需使用vue-cli来创建下载一大堆默认的包。

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
