//连接数据库
dbService = connect("localhost:27017");

//选择数据库
db = dbService.getSiblingDB("jike");

//清空测试集合
db.writeconcern_test.drop();

//测试数据
var doc1 = 
          {
            name:"xiaoli",
            age:20,
            address:
            {
              province:"GuangDong",
              city:"ShenZhen"
            }
          }

//执行插入操作
print("====writeConcern的使用-非确认式写入====");
var result = db.writeconcern_test.insert(doc1,{sriteConcern:{w:0}});
printjson(result);

print("====writeConcern的使用-确认式写入====");
var result = db.writeconcern_test.insert(doc1,{sriteConcern:{w:1}});
printjson(result);

print("====writeConcern的使用-确认式写入+journaled+wtimeout====");
var result = db.writeconcern_test.insert(doc1,{sriteConcern:{w:1,j:true,wtimeout:5}});
printjson(result);
