# 项目说明
下载好本项目之后，直接用vue2.6和webpack4，创建一个新的vue项目。无需使用vue-cli来创建下载一大堆默认的包。

# 操作步骤

#### 1. 下载

`git clone 项目url`

#### 2、初始化

```shell
cd vue-webpack4
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

    # 这里写项目的绝对路径【一定要改！！】
    root /vue-webpack4/dist;
    index index.html;

    # url 切换时始终返回index.html, 因为只有vue的js文件才知道怎么切换路由。
    try_files $uri /index.html;
}
```
