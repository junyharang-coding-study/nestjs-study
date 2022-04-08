import { IsNotEmpty } from "class-validator";

export class CreateBoardDTO {

    // @IsNotEmpty() = 빈 값이 들어오면 Error 반환 (유효성 검사)
    @IsNotEmpty() title : string;
    @IsNotEmpty() description : string;

}   // class 끝