#### User story

- 可新增含有日期﹑開始時間﹑結束時間的日程
- 可新增單純的待辦事項(可標註是否完成)
- 上述兩者可隨意互換
- 可以為上述兩者新增提醒鬧鐘
- 可決定是否開啟鬧鐘
- 可修改自己的個人資料

#### 環境建置與需求

- 使用框架 express
- 使用樣板引擎 express-handlebars
- 使用資料庫 MySQL
- 安裝
  - 下載專案
    ```
    https://github.com/lavender0822/todo-list.git
    ```
  - 安裝專案
    ```
    $ cd shopping-website
    $ npm install
    ```
  - 資料庫建置
    ```
    $ npx sequelize db:migrate:all
    $ npx sequelize db:seed:all
    ```
  - 執行程式
    ```
    $ npm run start
    $ npm run dev
    ```
  - 伺服器位置
    ```
    localhost:3000
    ```

#### env 檔案設定

```
PORT= 3000
SESSION_SECRET= 自行決定
JWT_SECRET= 自行決定
```

---

#### 預設使用者資料

- 使用者
  - 帳號：user1@example.com
  - 密碼：123456789
- 使用者
  - 帳號：user2@example.com
  - 密碼：123456789