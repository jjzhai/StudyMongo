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

print("======update - $min操作符的使用");
/*
 * {$min:{field1:value1,......}}
 * 如果$min操作符中value1的值小于使用query条件返回的文档中field1自攒对应值的话，就使用value1来替换原有文档的值；
 * 如果使用query条件返回的文档中field1字段的值不存在的话，就会用value1来创建该字段。
 * 注意：一次可以更新文档的多个字段
*/
var result = db.update_test.update(
		{_id:1}, //更新条件
		{                //更新内容
		  $min:
		  {
		    "age":16
		  }
		}
		);
printjson(result);

var cursor = db.update_test.find({});
printjson(cursor.toArray());
