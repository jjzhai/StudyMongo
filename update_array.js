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

print("======update - $ռλ����ʹ��======");
/*
 * $ռλ��  ���ڱ�ʾ��һ�� ����query������ ����Ԫ�� �������е�λ������
 * db.collection.update(
 *   {<array>:value ...},
 *   {<update operator>:{"<array>.$":value}}
 * )
 */
var result = db.update_array_test.update(
			{name:"joe",scores:60},     //��������
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
