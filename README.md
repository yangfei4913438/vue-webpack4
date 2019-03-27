# 项目说明
下载好本项目之后，直接用vue2.6和webpack4，创建一个新的vue项目。无需使用vue-cli来创建下载一大堆默认的包。

> 提示: 本项目不太适合对webpack完全不了解的人使用，使用本项目之前，请确认你对webpack有一定的了解。

# 操作步骤

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

# 上线nginx配置(精简版)
```shell
server {
    listen       8000;
    server_name  127.0.0.1;

    # 这里写项目的绝对路径
    root 打包好的dist目录的绝对路径;
    index index.html;

    # url 切换时始终返回index.html, 因为只有vue的js文件才知道怎么切换路由。
    try_files $uri /index.html;
}
```
