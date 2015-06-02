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

print("======update - $pull操作符的使用======");
/*
 * $pull 删除数组中指定的元素  field1的参数可以是一个元素或者关系运算符
 * {$pull:{<field1>:<value|query>,...}}
 */
var result = db.update_array_test.update(
			{name:"joe"},     //更新条件
			{
			  $pull:
			  {
			     scores:{$gte:61} //使用关系运算符，删除大于等于61的分数
			  }
			}	
			);
printjson(result);

//
var cursor = db.update_array_test.find({name:"joe"});
printjson(cursor.toArray());
