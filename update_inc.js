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

print("======update - $inc操作符的使用");
/*
 * {$inc:{"文档的键":待增加的值,......}}
 * inc操作符用来增加（或者减少）已有键的值，如果这个字段不存在的话，则会自动创建。
 * 注意：1.$inc键的值必须为数字，只能用于整型、长整型或浮点数类型。
 * 2.$inc键的值为负数的时候，会减少已有键的值。
 * 3.一次可以更新文档的多个字段。
 * 
*/
var result = db.update_test.update(
		{_id:1}, //更新条件
		{                //更新内容
		  $inc:
		  {
		    "age":2
		  }
		}
		);
printjson(result);

var cursor = db.update_test.find({});
printjson(cursor.toArray());
