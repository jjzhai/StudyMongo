//连接数据库服务
dbService = connect("localhost:27017");

//选择插入集合
db = dbService.getSiblingDB("jike");

//清空集合文档
db.insert_test.drop();

//测试文档
var doc1 = 
	   {
		name:"xiaoli",
		age:20,
		address:
		{
		  province:"GuangDong",
		  city:"ShenZhen"	
		}
	   }

//执行插入操作
print("======使用insert函数来向集合中插入数据======");
var result = db.insert_test.insert(doc1);

//打印函数返回的结果
printjson(result);

//测试执行结果
var cursor = db.insert_test.find({});
printjson(cursor.toArray());
