import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
// 설치법 : npm i uuid --save
import { v1 as uuid } from 'uuid'; // uuid의 version1을 쓰겠다.
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // In Memory 저장소(DB)를 이용하기 위한 배열 선언

  createBoards(createBoardDTO: CreateBoardDTO) {
    // 게시글 등록

    const { title, description } = createBoardDTO;

    const board: Board = {
      id: uuid(),
      title,
      description, // 아래 내용 간단히 표현
      // title : title,
      // descriptions : descriptions,
      status: BoardStatus.PUBLIC,
    }; // board 끝

    this.boards.push(board); // member 변수 boards에 board객체 내용을 넣어주는 것.

    return board;
  } // createBoards(title: string, descriptions: string) 끝

  getAllBoards(): Board[] {
    // 목록 조회 :Boards[] = return Type

    return this.boards;
  } // getAllBoards() 끝

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(
        `잘못된 검색 파라미터가 입력 되었습니다! 게시글 고유번호를 확인 해 주세요! : ${id}`,
      );
    } // if (!found) 끝

    return found;
  } // getBoardById(id : string) 끝

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id); // 수정하고자 하는 게시글을 찾아 온다.

    board.status = status; // 비밀글 여부 수정

    return board;
  } // updateBoardStatus(id : string, status : BoardStatus) 끝

  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    // filter()를 이용해서 id가 같지 않은것만 남기고, 같은거를 지워버리고 this.boards에 담는다.
    this.boards = this.boards.filter((board) => board.id !== found.id);
  } // deleteBoard(id : string) 끝
} // class 끝
