import { Body, Controller, Get, Post } from '@nestjs/common';
import { title } from 'process';
import { Boards } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('board')
export class BoardsController {

    // boardsService : BoardsService;   // 생성자에 접근 제한자(private)을 선언해주면 생략 가능

    constructor(private boardsService : BoardsService) {}   // 생성자 끝
    // 생성자에 접근 제한자(private)을 선언하면 생략 가능.
        // this.boardsService = boardsService; 

    @Get() 
    getAllBoard(): Boards[] {   // 목록 조회 | :Boards[] = return Type
        return this.boardsService.getAllBoards();
    }   // getAllBoard() 끝

    @Post()
    createBoard( 
        @Body('title') title: string,
        @Body('description') description : string ): Boards {   // 게시글 등록

            return this.boardsService.createBoards(title, description);

    }   // createBoard() 끝
} // class 끝
