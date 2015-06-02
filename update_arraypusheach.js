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
var result = db.update_array_test.update(
			{name:"joe"},     //更新条件
			{
			  $push:
			  {
			     scores:
			     {
				$each:[90,92,85],
			 	$slice:-4  //列出最后4个
				//$position:1   //指定元素的插入位置
			     },
			  }
			}	
			);
printjson(result);

//
var cursor = db.update_array_test.find({name:"joe"});
printjson(cursor.toArray());
