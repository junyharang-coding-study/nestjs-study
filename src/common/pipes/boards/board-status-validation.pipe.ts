import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from 'src/boards/board.status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase(); // value로 들어온 값 모두 대문자로 변경한다.

    console.log('value :', value); // 처리가 된 매개 변수 값(Value)
    console.log('metadata', metadata); // 매개 변수에 대한 메타 Data 포함 객체

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} 형식에 맞지 않는 값 입니다!`);
    } // if (!this.isStatusValid(value)) 끝

    return value;
  } // transform(value: any, metadata: ArgumentMetadata) 끝
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);

    return index !== -1;
  } // isStatusValid(status: any) 끝
} // class 끝
