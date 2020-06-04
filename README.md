### 分支说明

master 分支更新 JDL 模型
config 分支更新设置变更
develop 分支具体代码修改

### Command

`jhipster import-jdl ./design/jhipster-jdl.jh --force`

删除数据库后台 session

`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='pet_planet' AND pid<>pg_backend_pid();`
