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

print("======update - $pop��������ʹ��======");
/*
 * $pop ���ڴ�ɾ�������ͷ��(-1) ����β��(1) ɾ��һ��Ԫ��
 * {$pop:{<field>: <-1 | 1>, ...}}
 */
var result = db.update_array_test.update(
			{name:"joe"},     //��������
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
