//连接数据库
dbService = connect("localhost:27017");

//选择数据库
db = dbService.getSiblingDB("jike");

//创建bulk对象用于批量插入
db.bulk_test.drop();

//1.初始化一个并行bulk
var bulk = db.bulk_test.initializeUnorderedBulkOp();

//2.向bulk中添加操作
/*Bulk支持的操作包括：
 * Bulk.insert()
 * Bulk.find.upsert()
 * Bulk.find.update()
 * Bulk.find.updateOne()
 * Bulk.find.replaceOne()
 * Bulk.find.remove()
 * Bulk.find.removeOne()
 */
bulk.insert({_id:1,name:"xiaoli",age:23,sex:"male"});
bulk.insert({_id:2,name:"xiaohong",age:22,sex:"female"});
bulk.insert({_id:3,name:"xiaoqiang",age:23,sex:"male"});

//3.调用execute函数来执行操作
var result = bulk.execute();

print("======Bulk的使用======");
printjson(result);

//测试一下执行结果
var cursor = db.bulk_test.find({});
printjson(cursor.toArray());
