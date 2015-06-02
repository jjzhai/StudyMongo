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

print("======update - $pullAll��������ʹ��======");
/*
 * $pullAll һ�ο���ɾ�������ͬ��Ԫ��  field1�Ĳ�����һ������
 * {$pullAll:{<field1>:[<value1>,<value2>...],...}}
 */
var result = db.update_array_test.update(
			{name:"joe"},     //��������
			{
			  $pullAll:
			  {
			     scores:[60,61]
			  }
			}	
			);
printjson(result);

//
var cursor = db.update_array_test.find({name:"joe"});
printjson(cursor.toArray());
