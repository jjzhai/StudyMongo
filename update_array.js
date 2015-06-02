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

print("======update - $占位符的使用======");
/*
 * $占位符  用于表示第一个 满足query条件的 数组元素 在数组中的位置索引
 * db.collection.update(
 *   {<array>:value ...},
 *   {<update operator>:{"<array>.$":value}}
 * )
 */
var result = db.update_array_test.update(
			{name:"joe",scores:60},     //更新条件
			{
			  $set:
			  {
			     "scores.$":90
			  }
			}	
			);
printjson(result);

//
var cursor = db.update_array_test.find({name:"joe"});
printjson(cursor.toArray());
