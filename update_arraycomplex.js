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

print("======update - $push+$each+$sort+$slice操作符的使用======");
/*
 * {$push:{<field1>:<value1>,...}}
 * $push:{<field1>:{<modifier1>:<value1>,...},...}
 * $each:可以一次插入多个数组元素
 * $sort:对数组元素按照指定字段进行排序
 * $slice:取数组元素的子集
 * $push与上面三个操作符联合使用，可以实现向数组中添加TopN元素
 * 注意：
 * 1.三个修改器的执行顺序：sort->slice->store
 * 2.$sort和$slice必须要和$each结合使用
 *
 */
var result = db.update_array_test.update(
			{name:"jack"},     //更新条件
			{
			  $push:
			  {
			    scores:
			    {
			      $each:[
					{"subject":"chinese","score":80},
					{"subject":"math","score":95},
					{"subject":"english","score":70},
					{"subject":"polity","score":60},
					{"subject":"computer","score":85},
				    ],
			      $sort:{"score":-1},    //对数组进行降序排序
			      $slice:3               //Top 3
			    }
			  }
			}
			);
printjson(result);

//
var cursor = db.update_array_test.find({name:"jack"});
printjson(cursor.toArray());
