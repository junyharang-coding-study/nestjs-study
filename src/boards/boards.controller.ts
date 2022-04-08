import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatus } from './board.status.enum';
import { BoardStatusValidationPipe } from '../common/pipes/boards/board-status-validation.pipe';

@Controller('board')
export class BoardsController {
  // boardsService : BoardsService;   // 생성자에 접근 제한자(private)을 선언해주면 생략 가능

  constructor(private boardsService: BoardsService) {} // 생성자 끝
  // 생성자에 접근 제한자(private)을 선언하면 생략 가능.
  // this.boardsService = boardsService;

  @UsePipes(ValidationPipe)
  @Post()
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<Board> {
    return this.boardsService.createBoard(createBoardDTO);
  } // reateBoard(@Body() createBoardDTO : CreateBoardDTO) 끝

  @Get() getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  } // getAllBoards() 끝

  @Get(':id') getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  } // getBoardById(@Param('id') id : number) 끝

  @Patch(':id/status') updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  } // updateBoardStatus(@Param('id') id : number, @Body('status') status : BoardStatus) 끝

  // ParseIntPipe는 매개변수로 들어오는 값이 숫자 인지 유효성 검사.
  @Delete(':id') deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoard(id);
  } // deleteBoard(@Param('id', ParseIntPipe) id) 끝

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDTO: CreateBoardDTO): Board {
  //   // 게시글 등록
  //
  //   return this.boardsService.createBoards(createBoardDTO);
  // } // createBoard() 끝
  //
  // @Get()
  // getAllBoard(): Board[] {
  //   // 목록 조회 | :Boards[] = return Type
  //
  //   return this.boardsService.getAllBoards();
  // } // getAllBoard() 끝
  //
  // @Get(':id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // } // getBoardById(@Param('id') 끝
  //
  // @Patch(':id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // } // updateBoardStatus(@Param('id') id : string, @Body('status') status : BoardStatus) 끝
  //
  // @Delete(':id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // } // deleteBoard(@Param('id') 끝
} // class 끝
