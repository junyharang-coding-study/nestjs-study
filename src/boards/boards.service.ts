import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository.js';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatus } from './board.status.enum';

// 설치법 : npm i uuid --save

@Injectable()
export class BoardsService {
  // Repository DI
  constructor(
    // @InjectRepository = 이 Service에서 BoardRepository를 이용한다고 선언.
    // 접근제한자가 입력되면 boardRepository가 자동으로 프로퍼티(Member 변수)가 되어 이용할 수 있다.
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {} // 생성자 끝

  createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDTO);
  } // createBoard(createBoardDTO : CreateBoardDTO) 끝

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(
        `요청값에 해당하는 게시글이 존재하지 않습니다! ${id}`,
      );
    }

    return found;
  } // getBoardById(id: number) 끝

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  } // getAllBoards() 끝

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;

    await this.boardRepository.save(board);

    return board;
  } // updateBoardStatus(id : number, status : BoardStatus) 끝

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    // 존재하지 않는 게시물 삭제 요청 시 Error 반환 처리
    if (result.affected === 0) {
      throw new NotFoundException(
        `존재하지 않는 게시물 삭제 요청 입니다! : ${id}`,
      );
    } // if (result.affected === 0) 끝

    console.log('result 값 : ', result);
  } // deleteBoard(id : number) 끝

  /**
   * Local Memory 이용 한 Logic
   */
  // private boards: Board[] = []; // In Memory 저장소(DB)를 이용하기 위한 배열 선언
  //
  // createBoards(createBoardDTO: CreateBoardDTO) {
  //   // 게시글 등록
  //
  //   const { title, description } = createBoardDTO;
  //
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description, // 아래 내용 간단히 표현
  //     // title : title,
  //     // descriptions : descriptions,
  //     status: BoardStatus.PUBLIC,
  //   }; // board 끝
  //
  //   this.boards.push(board); // member 변수 boards에 board객체 내용을 넣어주는 것.
  //
  //   return board;
  // } // createBoards(title: string, descriptions: string) 끝
  //
  // getAllBoards(): Board[] {
  //   // 목록 조회 :Boards[] = return Type
  //
  //   return this.boards;
  // } // getAllBoards() 끝
  //
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //
  //   if (!found) {
  //     throw new NotFoundException(
  //       `잘못된 검색 파라미터가 입력 되었습니다! 게시글 고유번호를 확인 해 주세요! : ${id}`,
  //     );
  //   } // if (!found) 끝
  //
  //   return found;
  // } // getBoardById(id : string) 끝
  //
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id); // 수정하고자 하는 게시글을 찾아 온다.
  //
  //   board.status = status; // 비밀글 여부 수정
  //
  //   return board;
  // } // updateBoardStatus(id : string, status : BoardStatus) 끝
  //
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   // filter()를 이용해서 id가 같지 않은것만 남기고, 같은거를 지워버리고 this.boards에 담는다.
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // } // deleteBoard(id : string) 끝
} // class 끝
