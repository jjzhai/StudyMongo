//�������ݿ�
dbService = connect("localhost:27017");

//ѡ�����ݿ�
db = dbService.getSiblingDB("jike");

//����bulk����������������
db.update_test.drop();
var bulk = db.update_test.initializeUnorderedBulkOp();

//��������
var doc1 = 
	{
	  _id:1,
	  name:"xiaoli",
	  age:20,
	  address:
	  {
	     province:"GuangDong",
	     city:"ShenZhen"
	  }
	}
bulk.insert(doc1);
var doc2 = 
	{
	  _id:2,
	  name:"xiaoli",
	  age:20,
	  address:
	  {
	     province:"GuangDong",
	     city:"ShenZhen"
	  }
	}
bulk.insert(doc2);

//�������
bulk.execute();

print("======update - $currentDate��������ʹ��");
/*
 * {$currentDate:{<field1>:<typeSpecification1,...>}  }
 * surrrentDate ���������Խ�field1�ֶε�ֵ����Ϊ��ǰ������ʱ��
 * ��Ҫ���ڼ�¼������ʱ�䣬֧��Date��timestamp��������
 * Ĭ��ʱ����Date��������ʾ��Ҳ����ͨ��ʹ��$type����������ʽ��ָ�����ڸ�ʽ
 * ��ʽ�ģ�{$currrentDate:{field1:true}}  field1�ֶε�ֵ�ᱻ����ΪDate����ʱ��
 * ��ʾ�ģ�{$currentDate:{$type:"date"}}  ����
 * 	   {{$currentDate: {$type:"timestamp"}}}
 * ע�⣺1.ʹ��$currentDate��������һ�ο��Ը����ĵ��Ķ���ֶ�
 * 2.���fieldָ�����ֶβ����ڵĻ������Զ�����
 * 3.ʹ��$currentDate����������Ҫ������¼����ʱ��
*/
var result = db.update_test.update(
		{_id:1}, //��������
		{                //��������
		  $currentDate:
		  {
		    "optime_1":true,
		    "optime_2":{$type:"timestamp"}
		  }
		}
		);
printjson(result);

var cursor = db.update_test.find({});
printjson(cursor.toArray());
