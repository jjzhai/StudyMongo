//连接数据库
dbService = connect("localhost:27017");

//选择数据库
db = dbService.getSiblingDB("jike");

//创建bulk对象用于批量插入
db.update_test.drop();
var bulk = db.update_test.initializeUnorderedBulkOp();

//调试数据
var doc1 = 
	{
	  _id:1,
	  name:"xiaoli",
	  age:20,
	  address:
	  {
	     province:"GuangDong",
	     city:"ShenZhen"
	  }
	}
bulk.insert(doc1);
var doc2 = 
	{
	  _id:2,
	  name:"xiaoli",
	  age:20,
	  address:
	  {
	     province:"GuangDong",
	     city:"ShenZhen"
	  }
	}
bulk.insert(doc2);

//插入操作
bulk.execute();

print("======update - $set操作符的使用");
/*
 { $set:{field1:value1,......} }
 set操作符用于修改一个字段的值，如果这个字段不存在的话，则会创建它。
 注意：使用$set操作符一次可以更新文档的多个字段
*/
var result = db.update_test.update(
		{name:"xiaoli"}, //更新条件
		{                //更新内容
		  $set:
		  {
		    "name":"xiaoli_update",
		    "age":28
		  }
		},
		{multi:true}
		);
printjson(result);

var cursor = db.update_test.find({});
printjson(cursor.toArray());
