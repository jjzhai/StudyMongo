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

print("======update - 不使用更新操作符");
/*
  如果update的第二个参数不使用更新操作符，后面的文档会替换掉query返回的文档。
*/
var result = db.update_test.update(
		  {_id:1},
		  {age:26}
		);
printjson(result);

var cursor = db.update_test.find({});
printjson(cursor.toArray());
