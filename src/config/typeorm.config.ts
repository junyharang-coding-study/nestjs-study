import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  // H2 Data Base 설정
  type: 'mysql',
  host: '211.37.173.118',
  port: 3306,
  username: 'chnops1',
  password: 'chnops1234',
  database: 'iomt_portal',

  //Entities to be loaded for this connection
  // Entity를 이용해서 DB Table 생성. 그러므로, Entity 파일이 어디있는지 설정 필요
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // true 값을 주면 application이 다시 실행 할 때, entity안에 수정된 컬럼의 길이 Type 변경 등을 읽어 해당 Table을 Drop 하고, 다시 생성
  synchronize: true,
};
