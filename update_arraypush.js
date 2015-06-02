//
dbService = connect("localhost:27017");

//
db = dbService.getSiblingDB("jike");

//
db.update_array_test.drop();
var bulk = db.update_array_test.initializeUnorderedBulkOp();

//
var doc1 = {
	      name:"joe",
	      scores:[60,60,61,62]
	   }
bulk.insert(doc1);

var doc2 = {
	      name:"jack",
	      scores:[]
	   }
bulk.insert(doc2);

bulk.execute();

print("======update - $push+$each操作符的使用======");
/*
 * {$push:{<field1>:<value1>,...}}
 * $push:{<field1>:{<modifier1>:<value1>,...},...}
 * 注意：
 * 1.如果field1不存在的话，$push会自动为field1添加一个数组，并使用value1作为数组元素
 * 2.如果待操作文档的field1对应的字段值不是一个数组类型的值，执行失败，会抛出错误异常。
 * 3.如果value1是一个数组类型的值的话，push会将整个数组作为一个元素添加到field1对应的数组中。
 * 4.如果一次要添加多个元素的话，需要使用$push的$each修饰器。
 */
var result = db.update_array_test.update(
			{name:"joe"},     //更新条件
			{
			  $push:
			  {
			     scores:80
			  }
			}	
			);
printjson(result);

//
var cursor = db.update_array_test.find({name:"joe"});
printjson(cursor.toArray());
