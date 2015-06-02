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

print("======update - $pull��������ʹ��======");
/*
 * $pull ɾ��������ָ����Ԫ��  field1�Ĳ���������һ��Ԫ�ػ��߹�ϵ�����
 * {$pull:{<field1>:<value|query>,...}}
 */
var result = db.update_array_test.update(
			{name:"joe"},     //��������
			{
			  $pull:
			  {
			     scores:{$gte:61} //ʹ�ù�ϵ�������ɾ�����ڵ���61�ķ���
			  }
			}	
			);
printjson(result);

//
var cursor = db.update_array_test.find({name:"joe"});
printjson(cursor.toArray());
