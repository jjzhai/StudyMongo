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

print("======update - $push+$each��������ʹ��======");
var result = db.update_array_test.update(
			{name:"joe"},     //��������
			{
			  $push:
			  {
			     scores:
			     {
				$each:[90,92,85],
			 	$slice:-4  //�г����4��
				//$position:1   //ָ��Ԫ�صĲ���λ��
			     },
			  }
			}	
			);
printjson(result);

//
var cursor = db.update_array_test.find({name:"joe"});
printjson(cursor.toArray());
