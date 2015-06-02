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

print("======update - $pop操作符的使用======");
/*
 * $pop 用于从删除数组的头部(-1) 或者尾部(1) 删除一个元素
 * {$pop:{<field>: <-1 | 1>, ...}}
 */
var result = db.update_array_test.update(
			{name:"joe"},     //更新条件
			{
			  $pop:
			  {
			     scores:1
			  }
			}	
			);
printjson(result);

//
var cursor = db.update_array_test.find({name:"joe"});
printjson(cursor.toArray());
