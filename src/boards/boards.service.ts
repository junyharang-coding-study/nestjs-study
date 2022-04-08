import { Injectable } from '@nestjs/common';
import { Boards, BoardStatus } from './boards.model';
// 설치법 : npm i uuid --save
import { v1 as uuid } from 'uuid';                      // uuid의 version1을 쓰겠다.
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Boards[] = [];    // In Memory 저장소(DB)를 이용하기 위한 배열 선언

    getAllBoards(): Boards[] {    // 목록 조회 :Boards[] = return Type
        
        return this.boards;

    }   // getAllBoards() 끝

    createBoards(createBoardDTO : CreateBoardDTO) { // 게시글 등록

        const { title, description } = createBoardDTO;

        const board: Boards = {

            id : uuid(),
            title, description,                // 아래 내용 간단히 표현
            // title : title,
            // descriptions : descriptions,
            status : BoardStatus.PUBLIC

        }   // board 끝

        this.boards.push(board);    // member 변수 boards에 board객체 내용을 넣어주는 것.

        return board;
    }   // createBoards(title: string, descriptions: string) 끝
}   // class 끝
