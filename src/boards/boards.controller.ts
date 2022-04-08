import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { title } from 'process';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';

@Controller('board')
export class BoardsController {

    // boardsService : BoardsService;   // 생성자에 접근 제한자(private)을 선언해주면 생략 가능

    constructor(private boardsService : BoardsService) {}   // 생성자 끝
    // 생성자에 접근 제한자(private)을 선언하면 생략 가능.
        // this.boardsService = boardsService; 

    @Get() 
    getAllBoard(): Board[] {   // 목록 조회 | :Boards[] = return Type
        return this.boardsService.getAllBoards();
    }   // getAllBoard() 끝

    @Post()
    createBoard( 
        @Body() createBoardDTO: CreateBoardDTO): Board {   // 게시글 등록

            return this.boardsService.createBoards(createBoardDTO);

    }   // createBoard() 끝

    @Get(':id')
    getBoardById(@Param('id') id : string): Board {

        return this.boardsService.getBoardById(id);

    } // getBoardById(@Param('id') 끝
} // class 끝
