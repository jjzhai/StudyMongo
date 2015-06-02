db = connect("localhost:27017");  //连接数据库
db = db.getSiblingDB("jike");     //选择数据库
cursor = db.update_test.find();   //查询集合

while( cursor.hasNext() )         //迭代输出结果
{
  printjson( cursor.next() );
}
