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

//插入操作
bulk.execute();

print("======update - 更新整个内嵌文档======");
/*
  {$set:{field1:value1,......}} 
*/

var result = db.update_test.update(
		  {_id:1},
		  {
		    $set:
		    {
			"address":{province:"Beijing",city:"ChaoYang"}
		    }
		  }
		);
printjson(result);

var cursor = db.update_test.find({});
printjson(cursor.toArray());
